import { getDb } from "@/lib/db";

export const dentalCampaignSlug = "dental-revenue-leak-audit";

export const campaignStatusOptions = ["draft", "active", "paused", "archived"] as const;
export const leadStatusOptions = [
  "nuevo",
  "cualificado",
  "demo",
  "piloto",
  "ganado",
  "perdido",
] as const;
export const dealStageOptions = [
  "cualificacion",
  "demo",
  "propuesta",
  "piloto",
  "ganado",
  "perdido",
] as const;
export const priorityOptions = ["normal", "media", "alta"] as const;

export const campaignStatusLabels: Record<string, string> = {
  draft: "Draft",
  active: "Active",
  paused: "Paused",
  archived: "Archived",
};

export const leadStatusLabels: Record<string, string> = {
  nuevo: "New",
  cualificado: "Qualified",
  demo: "Demo",
  piloto: "Pilot",
  ganado: "Won",
  perdido: "Lost",
};

export const dealStageLabels: Record<string, string> = {
  cualificacion: "Qualification",
  demo: "Demo",
  propuesta: "Proposal",
  piloto: "Pilot",
  ganado: "Won",
  perdido: "Lost",
};

export const priorityLabels: Record<string, string> = {
  alta: "High",
  media: "Medium",
  normal: "Normal",
};

export const mainLeakLabels: Record<string, string> = {
  agenda: "Missed appointments",
  presupuestos: "Quotes without follow-up",
  pacientes_inactivos: "Inactive patients",
  recepcion: "Overloaded front desk",
  resenas: "Reviews and reputation",
  no_lo_se: "Not diagnosed yet",
};

export function slugify(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

export function addDays(date: Date, days: number) {
  const nextDate = new Date(date);
  nextDate.setDate(nextDate.getDate() + days);
  return nextDate;
}

export function cleanEnumValue<T extends readonly string[]>(
  value: FormDataEntryValue | null,
  allowedValues: T,
  fallback: T[number],
) {
  const currentValue = String(value ?? fallback);
  return allowedValues.includes(currentValue) ? currentValue : fallback;
}

type AgencyLeadSnapshot = {
  id: string;
  clinicName: string;
  contactName: string;
  role: string | null;
  phone: string;
  email: string;
  city: string | null;
  chairs: number | null;
  currentSoftware: string | null;
  mainLeak: string;
  estimatedLeakMin: number | null;
  estimatedLeakMax: number | null;
  message: string | null;
  source: string;
  campaign: string | null;
  landingPage: string | null;
  status: string;
  priority: string;
  privacyConsent: boolean;
  marketingConsent: boolean;
  createdAt: Date;
};

function mapAgencyStatus(status: string) {
  if (status === "contactado") {
    return "cualificado";
  }

  if (status === "demo_agendada") {
    return "demo";
  }

  if (status === "piloto_abierto") {
    return "piloto";
  }

  if (status === "ganado" || status === "perdido") {
    return status;
  }

  return "nuevo";
}

export function leadStatusToDealStage(status: string) {
  if (status === "demo") {
    return "demo";
  }

  if (status === "piloto") {
    return "piloto";
  }

  if (status === "ganado") {
    return "ganado";
  }

  if (status === "perdido") {
    return "perdido";
  }

  return "cualificacion";
}

export function dealStageToStatus(stage: string) {
  if (stage === "ganado") {
    return "won";
  }

  if (stage === "perdido") {
    return "lost";
  }

  return "open";
}

export function dealStageToProbability(stage: string) {
  const probabilities: Record<string, number> = {
    cualificacion: 20,
    demo: 35,
    propuesta: 55,
    piloto: 75,
    ganado: 100,
    perdido: 0,
  };

  return probabilities[stage] ?? 20;
}

function getLeadScore(agencyLead: AgencyLeadSnapshot) {
  let score = 10;

  if (agencyLead.priority === "alta") {
    score += 35;
  } else if (agencyLead.priority === "media") {
    score += 20;
  }

  if ((agencyLead.estimatedLeakMin ?? 0) >= 300000) {
    score += 25;
  } else if ((agencyLead.estimatedLeakMin ?? 0) >= 100000) {
    score += 15;
  }

  if ((agencyLead.chairs ?? 0) >= 4) {
    score += 15;
  } else if ((agencyLead.chairs ?? 0) >= 2) {
    score += 8;
  }

  if (agencyLead.marketingConsent) {
    score += 5;
  }

  return Math.min(score, 100);
}

function getNextStep(agencyLead: AgencyLeadSnapshot) {
  if (agencyLead.status === "nuevo") {
    return "Call within 24 hours and confirm pilot fit.";
  }

  if (agencyLead.status === "contactado") {
    return "Schedule a demo with management and review the main revenue leaks.";
  }

  if (agencyLead.status === "demo_agendada") {
    return "Prepare a 30-day pilot proposal.";
  }

  if (agencyLead.status === "piloto_abierto") {
    return "Measure pilot progress and prepare the close.";
  }

  return null;
}

function getDealValue(agencyLead: AgencyLeadSnapshot) {
  const leakReference = agencyLead.estimatedLeakMin ?? 0;

  if (leakReference > 0) {
    return Math.max(150000, Math.min(leakReference, 600000));
  }

  return 150000;
}

async function getDentalCampaign() {
  const db = getDb();

  return db.campaign.upsert({
    where: { slug: dentalCampaignSlug },
    update: {
      status: "active",
      landingPath: "/es/dental-leak-audit",
    },
    create: {
      name: "Dental Revenue Leak Audit",
      slug: dentalCampaignSlug,
      vertical: "Dental clinics",
      offer: "Free revenue leak audit",
      status: "active",
      goal: "Find clinics losing appointments, quotes or inactive patients and open a WIADental pilot.",
      landingPath: "/es/dental-leak-audit",
    },
  });
}

async function seedDemoMarketingCrm(campaignId: string) {
  const db = getDb();
  const demoLeadCount = await db.lead.count({
    where: { campaignId, source: "demo_seed" },
  });

  if (demoLeadCount > 0) {
    return;
  }

  const demos = [
    {
      company: "Alba Dental Madrid",
      city: "Madrid",
      contact: "Laura Martin",
      role: "Management",
      email: "laura.martin@example.com",
      phone: "+34610000001",
      priority: "alta",
      status: "demo",
      score: 86,
      valueCents: 420000,
      problem: "Orthodontic quotes without follow-up and a front desk overloaded by WhatsApp.",
      nextStep: "Send demo recap and pilot proposal.",
    },
    {
      company: "Dental Sierra Valencia",
      city: "Valencia",
      contact: "Javier Soler",
      role: "Director",
      email: "javier.soler@example.com",
      phone: "+34610000002",
      priority: "media",
      status: "cualificado",
      score: 62,
      valueCents: 260000,
      problem: "Inactive patients and overdue checkups without reactivation.",
      nextStep: "Schedule a demo with management.",
    },
    {
      company: "Miramar Dental Malaga",
      city: "Malaga",
      contact: "Ana Ruiz",
      role: "Front desk",
      email: "ana.ruiz@example.com",
      phone: "+34610000003",
      priority: "normal",
      status: "nuevo",
      score: 42,
      valueCents: 180000,
      problem: "Unconfirmed appointments and empty calendar slots that are not refilled.",
      nextStep: "Call to qualify volume and current software.",
    },
  ];

  for (const item of demos) {
    const company = await db.company.create({
      data: {
        name: item.company,
        sector: "Dental clinic",
        city: item.city,
        sizeLabel: "2-4 chairs",
        source: "demo_seed",
        notes: "Demo company for validating the marketing CRM.",
      },
    });
    const contact = await db.contact.create({
      data: {
        companyId: company.id,
        name: item.contact,
        role: item.role,
        email: item.email,
        phone: item.phone,
        source: "demo_seed",
        privacyConsent: true,
        marketingConsent: true,
      },
    });
    const lead = await db.lead.create({
      data: {
        campaignId,
        companyId: company.id,
        contactId: contact.id,
        title: `Dental audit - ${item.company}`,
        status: item.status,
        priority: item.priority,
        source: "demo_seed",
        landingPage: "/es/dental-leak-audit",
        problem: item.problem,
        estimatedValueMin: item.valueCents,
        estimatedValueMax: Math.round(item.valueCents * 1.75),
        score: item.score,
        nextStep: item.nextStep,
      },
    });
    const stage = leadStatusToDealStage(item.status);
    const deal = await db.deal.create({
      data: {
        campaignId,
        companyId: company.id,
        contactId: contact.id,
        leadId: lead.id,
        title: `WIADental pilot - ${item.company}`,
        stage,
        status: dealStageToStatus(stage),
        valueCents: item.valueCents,
        probability: dealStageToProbability(stage),
        expectedCloseAt: addDays(new Date(), item.priority === "alta" ? 14 : 30),
      },
    });

    await db.activity.create({
      data: {
        campaignId,
        companyId: company.id,
        contactId: contact.id,
        leadId: lead.id,
        dealId: deal.id,
        type: "seed",
        title: "Demo lead prepared",
        notes: item.problem,
        createdBy: "System",
      },
    });

    await db.task.create({
      data: {
        campaignId,
        companyId: company.id,
        contactId: contact.id,
        leadId: lead.id,
        dealId: deal.id,
        title: item.nextStep,
        status: "open",
        priority: item.priority,
        dueAt: addDays(new Date(), item.priority === "alta" ? 1 : 3),
        assignedTo: "Alejandro",
      },
    });
  }
}

export async function syncAgencyAuditLeadToMarketingCrmById(agencyLeadId: string) {
  const db = getDb();
  const agencyLead = await db.agencyLead.findUnique({
    where: { id: agencyLeadId },
  });

  if (!agencyLead) {
    return null;
  }

  return syncAgencyAuditLeadToMarketingCrm(agencyLead);
}

export async function syncAgencyAuditLeadToMarketingCrm(agencyLead: AgencyLeadSnapshot) {
  const db = getDb();
  const campaign = await getDentalCampaign();
  const status = mapAgencyStatus(agencyLead.status);
  const stage = leadStatusToDealStage(status);
  const score = getLeadScore(agencyLead);
  const nextStep = getNextStep(agencyLead);
  const company =
    (await db.company.findFirst({
      where: { name: agencyLead.clinicName },
    })) ??
    (await db.company.create({
      data: {
        name: agencyLead.clinicName,
        sector: "Dental clinic",
        city: agencyLead.city,
        sizeLabel: agencyLead.chairs ? `${agencyLead.chairs} chairs` : null,
        source: agencyLead.source || "landing",
        notes: agencyLead.currentSoftware ? `Current software: ${agencyLead.currentSoftware}.` : null,
      },
    }));

  const contactWhere = agencyLead.email
    ? { email: agencyLead.email }
    : { phone: agencyLead.phone };
  const contact =
    (await db.contact.findFirst({
      where: contactWhere,
    })) ??
    (await db.contact.create({
      data: {
        companyId: company.id,
        name: agencyLead.contactName,
        role: agencyLead.role,
        email: agencyLead.email,
        phone: agencyLead.phone,
        source: agencyLead.source || "landing",
        privacyConsent: agencyLead.privacyConsent,
        marketingConsent: agencyLead.marketingConsent,
      },
    }));

  const existingLead = await db.lead.findUnique({
    where: { agencyLeadId: agencyLead.id },
    select: { id: true },
  });
  const problem = [mainLeakLabels[agencyLead.mainLeak] ?? agencyLead.mainLeak, agencyLead.message]
    .filter(Boolean)
    .join(" - ");
  const lead = await db.lead.upsert({
    where: { agencyLeadId: agencyLead.id },
    update: {
      campaignId: campaign.id,
      companyId: company.id,
      contactId: contact.id,
      title: `Dental audit - ${agencyLead.clinicName}`,
      status,
      priority: agencyLead.priority,
      source: agencyLead.source || "landing",
      landingPage: agencyLead.landingPage,
      problem,
      estimatedValueMin: agencyLead.estimatedLeakMin,
      estimatedValueMax: agencyLead.estimatedLeakMax,
      score,
      nextStep,
    },
    create: {
      campaignId: campaign.id,
      companyId: company.id,
      contactId: contact.id,
      agencyLeadId: agencyLead.id,
      title: `Dental audit - ${agencyLead.clinicName}`,
      status,
      priority: agencyLead.priority,
      source: agencyLead.source || "landing",
      landingPage: agencyLead.landingPage,
      problem,
      estimatedValueMin: agencyLead.estimatedLeakMin,
      estimatedValueMax: agencyLead.estimatedLeakMax,
      score,
      nextStep,
      createdAt: agencyLead.createdAt,
    },
  });

  const existingDeal = await db.deal.findFirst({
    where: { leadId: lead.id },
    select: { id: true },
  });
  const dealData = {
    campaignId: campaign.id,
    companyId: company.id,
    contactId: contact.id,
    leadId: lead.id,
    title: `WIADental pilot - ${agencyLead.clinicName}`,
    stage,
    status: dealStageToStatus(stage),
    valueCents: getDealValue(agencyLead),
    probability: dealStageToProbability(stage),
    expectedCloseAt: addDays(new Date(), agencyLead.priority === "alta" ? 14 : 30),
    wonAt: stage === "ganado" ? new Date() : null,
    lostAt: stage === "perdido" ? new Date() : null,
  };
  const deal = existingDeal
    ? await db.deal.update({
        where: { id: existingDeal.id },
        data: dealData,
      })
    : await db.deal.create({ data: dealData });

  if (!existingLead) {
    await db.activity.create({
      data: {
        campaignId: campaign.id,
        companyId: company.id,
        contactId: contact.id,
        leadId: lead.id,
        dealId: deal.id,
        type: "formulario",
        title: "Audit request synced",
        notes: `Entry from ${agencyLead.landingPage ?? "landing"}. Initial score: ${score}.`,
        createdBy: "System",
      },
    });

    await db.task.create({
      data: {
        campaignId: campaign.id,
        companyId: company.id,
        contactId: contact.id,
        leadId: lead.id,
        dealId: deal.id,
        title: nextStep ?? "Review lead and define the next step.",
        status: "open",
        priority: agencyLead.priority,
        dueAt: addDays(new Date(), agencyLead.priority === "alta" ? 1 : 3),
        assignedTo: "Alejandro",
      },
    });
  }

  return lead;
}

async function syncPendingAgencyLeads() {
  const db = getDb();
  const pendingAgencyLeads = await db.agencyLead.findMany({
    where: { marketingLead: null },
    orderBy: { createdAt: "asc" },
    take: 50,
  });

  for (const agencyLead of pendingAgencyLeads) {
    await syncAgencyAuditLeadToMarketingCrm(agencyLead);
  }
}

export async function ensureMarketingCrmReady() {
  const campaign = await getDentalCampaign();

  await seedDemoMarketingCrm(campaign.id);
  await syncPendingAgencyLeads();

  return campaign;
}
