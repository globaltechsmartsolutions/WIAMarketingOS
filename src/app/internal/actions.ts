"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { requireAppSession } from "@/lib/demo-permissions";
import { getDb } from "@/lib/db";
import {
  addDays,
  campaignStatusOptions,
  cleanEnumValue,
  dealStageOptions,
  dealStageToProbability,
  dealStageToStatus,
  leadStatusOptions,
  leadStatusToDealStage,
  priorityOptions,
  slugify,
} from "@/lib/marketing-crm";
import { managementRoles } from "@/lib/permissions";

const campaignSchema = z.object({
  name: z.string().trim().min(3).max(120),
  vertical: z.string().trim().min(3).max(80),
  offer: z.string().trim().max(180).optional(),
  goal: z.string().trim().max(500).optional(),
  landingPath: z.string().trim().max(180).optional(),
  budgetEuros: z.preprocess(
    (value) => (value === "" || value === null ? null : Number(value)),
    z.number().int().min(0).max(1000000).nullable(),
  ),
  status: z.enum(campaignStatusOptions),
});

function safeReturnTo(value: FormDataEntryValue | null, fallback: string) {
  const returnTo = String(value ?? fallback);

  if (!returnTo.startsWith("/internal/")) {
    return fallback;
  }

  return returnTo;
}

function withNotice(path: string, notice: string, hash?: string) {
  const [pathnameAndQuery] = path.split("#");
  const separator = pathnameAndQuery.includes("?") ? "&" : "?";

  return `${pathnameAndQuery}${separator}notice=${notice}${hash ? `#${hash}` : ""}`;
}

function revalidateInternalCrm() {
  revalidatePath("/internal/campaigns");
  revalidatePath("/internal/leads");
  revalidatePath("/internal/deals");
}

export async function createCampaign(formData: FormData) {
  const session = await requireAppSession(managementRoles);
  const db = getDb();
  const parsed = campaignSchema.parse({
    name: formData.get("name"),
    vertical: formData.get("vertical"),
    offer: formData.get("offer"),
    goal: formData.get("goal"),
    landingPath: formData.get("landingPath"),
    budgetEuros: formData.get("budgetEuros"),
    status: cleanEnumValue(formData.get("status"), campaignStatusOptions, "draft"),
  });
  const baseSlug = slugify(parsed.name) || "campaign";
  let slug = baseSlug;
  let suffix = 2;

  while (await db.campaign.findUnique({ where: { slug } })) {
    slug = `${baseSlug}-${suffix}`;
    suffix += 1;
  }

  const campaign = await db.campaign.create({
    data: {
      name: parsed.name,
      slug,
      vertical: parsed.vertical,
      offer: parsed.offer || null,
      goal: parsed.goal || null,
      landingPath: parsed.landingPath || null,
      budgetCents: parsed.budgetEuros === null ? null : parsed.budgetEuros * 100,
      status: parsed.status,
      activities: {
        create: {
          type: "campaign_created",
          title: "Campaign created",
          notes: `Created by ${session.user.name}.`,
          createdBy: session.user.name,
        },
      },
    },
  });

  revalidateInternalCrm();
  redirect(withNotice("/internal/campaigns", "campaign_created", `campaign-${campaign.id}`));
}

export async function updateLeadStatus(formData: FormData) {
  const session = await requireAppSession(managementRoles);
  const db = getDb();
  const leadId = String(formData.get("leadId") ?? "");
  const status = cleanEnumValue(formData.get("status"), leadStatusOptions, "nuevo");
  const returnTo = safeReturnTo(formData.get("returnTo"), "/internal/leads");

  if (!leadId) {
    throw new Error("Invalid lead.");
  }

  const lead = await db.lead.findUnique({
    where: { id: leadId },
    include: { deals: { select: { id: true }, take: 1 } },
  });

  if (!lead) {
    throw new Error("Lead not found.");
  }

  const stage = leadStatusToDealStage(status);
  const now = new Date();

  await db.$transaction([
    db.lead.update({
      where: { id: lead.id },
      data: { status },
    }),
    db.deal.updateMany({
      where: { leadId: lead.id },
      data: {
        stage,
        status: dealStageToStatus(stage),
        probability: dealStageToProbability(stage),
        wonAt: stage === "ganado" ? now : null,
        lostAt: stage === "perdido" ? now : null,
      },
    }),
    db.activity.create({
      data: {
        campaignId: lead.campaignId,
        companyId: lead.companyId,
        contactId: lead.contactId,
        leadId: lead.id,
        dealId: lead.deals[0]?.id,
        type: "lead_status",
        title: `Lead moved to ${status}`,
        notes: `Changed by ${session.user.name}. Previous status: ${lead.status}.`,
        createdBy: session.user.name,
      },
    }),
  ]);

  revalidateInternalCrm();
  redirect(withNotice(returnTo, "lead_status_updated", `lead-${lead.id}`));
}

export async function updateLeadPriority(formData: FormData) {
  const session = await requireAppSession(managementRoles);
  const db = getDb();
  const leadId = String(formData.get("leadId") ?? "");
  const priority = cleanEnumValue(formData.get("priority"), priorityOptions, "normal");
  const returnTo = safeReturnTo(formData.get("returnTo"), "/internal/leads");

  if (!leadId) {
    throw new Error("Invalid lead.");
  }

  const lead = await db.lead.findUnique({ where: { id: leadId } });

  if (!lead) {
    throw new Error("Lead not found.");
  }

  await db.$transaction([
    db.lead.update({
      where: { id: lead.id },
      data: { priority },
    }),
    db.activity.create({
      data: {
        campaignId: lead.campaignId,
        companyId: lead.companyId,
        contactId: lead.contactId,
        leadId: lead.id,
        type: "lead_priority",
        title: `Priority changed to ${priority}`,
        notes: `Changed by ${session.user.name}. Previous priority: ${lead.priority}.`,
        createdBy: session.user.name,
      },
    }),
  ]);

  revalidateInternalCrm();
  redirect(withNotice(returnTo, "lead_priority_updated", `lead-${lead.id}`));
}

export async function addLeadActivity(formData: FormData) {
  const session = await requireAppSession(managementRoles);
  const db = getDb();
  const leadId = String(formData.get("leadId") ?? "");
  const title = String(formData.get("title") ?? "").trim();
  const notes = String(formData.get("notes") ?? "").trim();
  const returnTo = safeReturnTo(formData.get("returnTo"), "/internal/leads");

  if (!leadId) {
    throw new Error("Invalid lead.");
  }

  if (title.length < 3 && notes.length < 3) {
    redirect(withNotice(returnTo, "activity_missing", `lead-${leadId}`));
  }

  const lead = await db.lead.findUnique({
    where: { id: leadId },
    include: { deals: { select: { id: true }, take: 1 } },
  });

  if (!lead) {
    throw new Error("Lead not found.");
  }

  await db.activity.create({
    data: {
      campaignId: lead.campaignId,
      companyId: lead.companyId,
      contactId: lead.contactId,
      leadId: lead.id,
      dealId: lead.deals[0]?.id,
      type: "note",
      title: title || "Commercial note",
      notes: notes || null,
      createdBy: session.user.name,
    },
  });

  revalidateInternalCrm();
  redirect(withNotice(returnTo, "activity_added", `lead-${lead.id}`));
}

export async function createLeadTask(formData: FormData) {
  const session = await requireAppSession(managementRoles);
  const db = getDb();
  const leadId = String(formData.get("leadId") ?? "");
  const title = String(formData.get("title") ?? "").trim();
  const dueDays = Number(formData.get("dueDays") ?? 1);
  const returnTo = safeReturnTo(formData.get("returnTo"), "/internal/leads");

  if (!leadId || title.length < 3) {
    redirect(withNotice(returnTo, "task_missing", leadId ? `lead-${leadId}` : undefined));
  }

  const lead = await db.lead.findUnique({
    where: { id: leadId },
    include: { deals: { select: { id: true }, take: 1 } },
  });

  if (!lead) {
    throw new Error("Lead not found.");
  }

  await db.task.create({
    data: {
      campaignId: lead.campaignId,
      companyId: lead.companyId,
      contactId: lead.contactId,
      leadId: lead.id,
      dealId: lead.deals[0]?.id,
      title,
      priority: lead.priority,
      dueAt: addDays(new Date(), Number.isFinite(dueDays) ? Math.max(0, dueDays) : 1),
      assignedTo: session.user.name,
    },
  });

  revalidateInternalCrm();
  redirect(withNotice(returnTo, "task_created", `lead-${lead.id}`));
}

export async function completeTask(formData: FormData) {
  const session = await requireAppSession(managementRoles);
  const db = getDb();
  const taskId = String(formData.get("taskId") ?? "");
  const returnTo = safeReturnTo(formData.get("returnTo"), "/internal/leads");

  if (!taskId) {
    throw new Error("Invalid task.");
  }

  const task = await db.task.findUnique({ where: { id: taskId } });

  if (!task) {
    throw new Error("Task not found.");
  }

  await db.$transaction([
    db.task.update({
      where: { id: task.id },
      data: { status: "done" },
    }),
    db.activity.create({
      data: {
        campaignId: task.campaignId,
        companyId: task.companyId,
        contactId: task.contactId,
        leadId: task.leadId,
        dealId: task.dealId,
        type: "task_done",
        title: "Task completed",
        notes: `${task.title}. Completed by ${session.user.name}.`,
        createdBy: session.user.name,
      },
    }),
  ]);

  revalidateInternalCrm();
  redirect(withNotice(returnTo, "task_completed"));
}

export async function updateDealStage(formData: FormData) {
  const session = await requireAppSession(managementRoles);
  const db = getDb();
  const dealId = String(formData.get("dealId") ?? "");
  const stage = cleanEnumValue(formData.get("stage"), dealStageOptions, "cualificacion");
  const lostReason = String(formData.get("lostReason") ?? "").trim();
  const returnTo = safeReturnTo(formData.get("returnTo"), "/internal/deals");

  if (!dealId) {
    throw new Error("Invalid opportunity.");
  }

  if (stage === "perdido" && lostReason.length < 3) {
    redirect(withNotice(returnTo, "lost_reason_missing", `deal-${dealId}`));
  }

  const deal = await db.deal.findUnique({ where: { id: dealId } });

  if (!deal) {
    throw new Error("Opportunity not found.");
  }

  const now = new Date();
  const nextLeadStatus =
    stage === "cualificacion"
      ? "cualificado"
      : stage === "propuesta"
        ? "demo"
        : stage === "piloto"
          ? "piloto"
          : stage === "ganado" || stage === "perdido"
            ? stage
            : "demo";

  await db.$transaction([
    db.deal.update({
      where: { id: deal.id },
      data: {
        stage,
        status: dealStageToStatus(stage),
        probability: dealStageToProbability(stage),
        lostReason: stage === "perdido" ? lostReason : null,
        wonAt: stage === "ganado" ? now : null,
        lostAt: stage === "perdido" ? now : null,
      },
    }),
    ...(deal.leadId
      ? [
          db.lead.update({
            where: { id: deal.leadId },
            data: { status: nextLeadStatus },
          }),
        ]
      : []),
    db.activity.create({
      data: {
        campaignId: deal.campaignId,
        companyId: deal.companyId,
        contactId: deal.contactId,
        leadId: deal.leadId,
        dealId: deal.id,
        type: "deal_stage",
        title: `Opportunity moved to ${stage}`,
        notes: [
          `Changed by ${session.user.name}. Previous stage: ${deal.stage}.`,
          lostReason || null,
        ]
          .filter(Boolean)
          .join("\n"),
        createdBy: session.user.name,
      },
    }),
  ]);

  revalidateInternalCrm();
  redirect(withNotice(returnTo, "deal_stage_updated", `deal-${deal.id}`));
}
