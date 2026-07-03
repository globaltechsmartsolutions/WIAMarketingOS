"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireAppSession } from "@/lib/demo-permissions";
import { directionRoles } from "@/lib/permissions";
import { getDb } from "@/lib/db";

const allowedStatuses = new Set([
  "nuevo",
  "contactado",
  "demo_agendada",
  "piloto_abierto",
  "ganado",
  "perdido",
]);

const allowedPriorities = new Set(["normal", "media", "alta"]);

const statusLabels: Record<string, string> = {
  nuevo: "nuevo",
  contactado: "contactado",
  demo_agendada: "demo agendada",
  piloto_abierto: "piloto abierto",
  ganado: "ganado",
  perdido: "perdido",
};

function ventasHref(status: string, leadId: string, notice: string) {
  const params = new URLSearchParams({ notice });

  if (status && status !== "todos") {
    params.set("status", status);
  }

  return `/interno/ventas?${params.toString()}#agency-lead-${leadId}`;
}

function cleanCurrentStatus(value: FormDataEntryValue | null) {
  const status = String(value ?? "todos");
  return status === "todos" || allowedStatuses.has(status) ? status : "todos";
}

export async function updateAgencyLeadStatus(formData: FormData) {
  const session = await requireAppSession(directionRoles);
  const db = getDb();
  const leadId = String(formData.get("leadId") ?? "");
  const status = String(formData.get("status") ?? "");
  const currentStatus = cleanCurrentStatus(formData.get("currentStatus"));
  const note = String(formData.get("note") ?? "").trim();

  if (!leadId || !allowedStatuses.has(status)) {
    throw new Error("Estado comercial no válido.");
  }

  const lead = await db.agencyLead.findUnique({
    where: { id: leadId },
    select: { id: true, status: true },
  });

  if (!lead) {
    throw new Error("Solicitud comercial no encontrada.");
  }

  if (status === "perdido" && note.length < 3) {
    redirect(ventasHref(currentStatus, lead.id, "lost_reason_missing"));
  }

  await db.$transaction([
    db.agencyLead.update({
      where: { id: lead.id },
      data: { status },
    }),
    db.agencyActivity.create({
      data: {
        leadId: lead.id,
        type: "estado",
        title: `Estado cambiado a ${statusLabels[status]}`,
        notes: [
          `Cambio realizado por ${session.user.name}.`,
          lead.status !== status ? `Estado anterior: ${statusLabels[lead.status] ?? lead.status}.` : null,
          note || null,
        ]
          .filter(Boolean)
          .join("\n"),
      },
    }),
  ]);

  revalidatePath("/interno/ventas");
  redirect(ventasHref(status, lead.id, "status_updated"));
}

export async function updateAgencyLeadPriority(formData: FormData) {
  const session = await requireAppSession(directionRoles);
  const db = getDb();
  const leadId = String(formData.get("leadId") ?? "");
  const priority = String(formData.get("priority") ?? "");
  const currentStatus = cleanCurrentStatus(formData.get("currentStatus"));

  if (!leadId || !allowedPriorities.has(priority)) {
    throw new Error("Prioridad comercial no válida.");
  }

  const lead = await db.agencyLead.findUnique({
    where: { id: leadId },
    select: { id: true, priority: true },
  });

  if (!lead) {
    throw new Error("Solicitud comercial no encontrada.");
  }

  await db.$transaction([
    db.agencyLead.update({
      where: { id: lead.id },
      data: { priority },
    }),
    db.agencyActivity.create({
      data: {
        leadId: lead.id,
        type: "prioridad",
        title: `Prioridad cambiada a ${priority}`,
        notes: `Cambio realizado por ${session.user.name}. Prioridad anterior: ${lead.priority}.`,
      },
    }),
  ]);

  revalidatePath("/interno/ventas");
  redirect(ventasHref(currentStatus, lead.id, "priority_updated"));
}

export async function addAgencyLeadActivity(formData: FormData) {
  const session = await requireAppSession(directionRoles);
  const db = getDb();
  const leadId = String(formData.get("leadId") ?? "");
  const currentStatus = cleanCurrentStatus(formData.get("currentStatus"));
  const title = String(formData.get("title") ?? "").trim();
  const notes = String(formData.get("notes") ?? "").trim();

  if (!leadId) {
    throw new Error("Solicitud comercial no válida.");
  }

  if (title.length < 3 && notes.length < 3) {
    redirect(ventasHref(currentStatus, leadId, "activity_missing"));
  }

  const lead = await db.agencyLead.findUnique({
    where: { id: leadId },
    select: { id: true },
  });

  if (!lead) {
    throw new Error("Solicitud comercial no encontrada.");
  }

  await db.agencyActivity.create({
    data: {
      leadId: lead.id,
      type: "nota",
      title: title || "Nota comercial",
      notes: [`Registrado por ${session.user.name}.`, notes || null].filter(Boolean).join("\n"),
    },
  });

  revalidatePath("/interno/ventas");
  redirect(ventasHref(currentStatus, lead.id, "activity_added"));
}
