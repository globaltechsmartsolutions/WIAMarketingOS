import { getDb } from "@/lib/db";

export const dentalCampaignSlug = "clinica-dental-sin-fugas";

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
  draft: "Borrador",
  active: "Activa",
  paused: "Pausada",
  archived: "Archivada",
};

export const leadStatusLabels: Record<string, string> = {
  nuevo: "Nuevo",
  cualificado: "Cualificado",
  demo: "Demo",
  piloto: "Piloto",
  ganado: "Ganado",
  perdido: "Perdido",
};

export const dealStageLabels: Record<string, string> = {
  cualificacion: "Cualificación",
  demo: "Demo",
  propuesta: "Propuesta",
  piloto: "Piloto",
  ganado: "Ganado",
  perdido: "Perdido",
};

export const priorityLabels: Record<string, string> = {
  alta: "Alta",
  media: "Media",
  normal: "Normal",
};

export const mainLeakLabels: Record<string, string> = {
  agenda: "Citas perdidas",
  presupuestos: "Presupuestos sin seguimiento",
  pacientes_inactivos: "Pacientes inactivos",
  recepcion: "Recepción saturada",
  resenas: "Reseñas y reputación",
  no_lo_se: "Sin diagnosticar",
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
    return "Llamar en menos de 24 horas y confirmar encaje de piloto.";
  }

  if (agencyLead.status === "contactado") {
    return "Agendar demo con dirección y revisar fugas principales.";
  }

  if (agencyLead.status === "demo_agendada") {
    return "Preparar propuesta de piloto de 30 días.";
  }

  if (agencyLead.status === "piloto_abierto") {
    return "Medir avance del piloto y preparar cierre.";
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
      landingPath: "/auditoria-fugas-dental",
    },
    create: {
      name: "Clínica Dental Sin Fugas",
      slug: dentalCampaignSlug,
      vertical: "Clínicas dentales",
      offer: "Auditoría gratuita de fugas comerciales",
      status: "active",
      goal: "Detectar clínicas con pérdida de citas, presupuestos o pacientes inactivos y abrir piloto WIADental.",
      landingPath: "/auditoria-fugas-dental",
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
      company: "Clínica Alba Madrid",
      city: "Madrid",
      contact: "Laura Martín",
      role: "Gerencia",
      email: "laura.martin@example.com",
      phone: "+34610000001",
      priority: "alta",
      status: "demo",
      score: 86,
      valueCents: 420000,
      problem: "Presupuestos de ortodoncia sin seguimiento y recepción saturada por WhatsApp.",
      nextStep: "Enviar resumen de demo y propuesta de piloto.",
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
      problem: "Pacientes inactivos y revisiones vencidas sin reactivación.",
      nextStep: "Agendar demo con dirección.",
    },
    {
      company: "Clínica Miramar Málaga",
      city: "Málaga",
      contact: "Ana Ruiz",
      role: "Recepción",
      email: "ana.ruiz@example.com",
      phone: "+34610000003",
      priority: "normal",
      status: "nuevo",
      score: 42,
      valueCents: 180000,
      problem: "Citas no confirmadas y huecos de agenda que no se rellenan.",
      nextStep: "Llamar para cualificar volumen y software actual.",
    },
  ];

  for (const item of demos) {
    const company = await db.company.create({
      data: {
        name: item.company,
        sector: "Clínica dental",
        city: item.city,
        sizeLabel: "2-4 sillones",
        source: "demo_seed",
        notes: "Empresa demo para validar el CRM de marketing.",
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
        title: `Auditoría dental - ${item.company}`,
        status: item.status,
        priority: item.priority,
        source: "demo_seed",
        landingPage: "/auditoria-fugas-dental",
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
        title: `Piloto WIADental - ${item.company}`,
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
        title: "Lead demo preparado",
        notes: item.problem,
        createdBy: "Sistema",
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
        sector: "Clínica dental",
        city: agencyLead.city,
        sizeLabel: agencyLead.chairs ? `${agencyLead.chairs} sillones` : null,
        source: agencyLead.source || "landing",
        notes: agencyLead.currentSoftware ? `Software actual: ${agencyLead.currentSoftware}.` : null,
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
  const lead = await db.lead.upsert({
    where: { agencyLeadId: agencyLead.id },
    update: {
      campaignId: campaign.id,
      companyId: company.id,
      contactId: contact.id,
      title: `Auditoría dental - ${agencyLead.clinicName}`,
      status,
      priority: agencyLead.priority,
      source: agencyLead.source || "landing",
      landingPage: agencyLead.landingPage,
      problem: [
        mainLeakLabels[agencyLead.mainLeak] ?? agencyLead.mainLeak,
        agencyLead.message,
      ]
        .filter(Boolean)
        .join(" · "),
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
      title: `Auditoría dental - ${agencyLead.clinicName}`,
      status,
      priority: agencyLead.priority,
      source: agencyLead.source || "landing",
      landingPage: agencyLead.landingPage,
      problem: [
        mainLeakLabels[agencyLead.mainLeak] ?? agencyLead.mainLeak,
        agencyLead.message,
      ]
        .filter(Boolean)
        .join(" · "),
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
    title: `Piloto WIADental - ${agencyLead.clinicName}`,
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
        title: "Solicitud de auditoría sincronizada",
        notes: `Entrada desde ${agencyLead.landingPage ?? "landing"}. Score inicial: ${score}.`,
        createdBy: "Sistema",
      },
    });

    await db.task.create({
      data: {
        campaignId: campaign.id,
        companyId: company.id,
        contactId: contact.id,
        leadId: lead.id,
        dealId: deal.id,
        title: nextStep ?? "Revisar lead y definir siguiente paso.",
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
