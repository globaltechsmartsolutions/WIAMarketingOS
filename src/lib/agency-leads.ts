import { z } from "zod";
import { getDb } from "@/lib/db";

const optionalText = (max: number) =>
  z
    .string()
    .trim()
    .max(max)
    .optional()
    .transform((value) => value || null);

const optionalInteger = (max: number) =>
  z.preprocess(
    (value) => {
      if (value === null || value === undefined || value === "") {
        return null;
      }

      return Number(value);
    },
    z.number().int().min(0).max(max).nullable(),
  );

const mainLeakValues = [
  "agenda",
  "presupuestos",
  "pacientes_inactivos",
  "recepcion",
  "resenas",
  "no_lo_se",
] as const;

export const agencyAuditLeadSchema = z.object({
  clinicName: z.string().trim().min(2, "Indica el nombre de la clínica.").max(140),
  contactName: z.string().trim().min(2, "Indica tu nombre.").max(120),
  role: optionalText(80),
  phone: z.string().trim().min(6, "Indica un teléfono válido.").max(30),
  email: z.string().trim().email("Indica un email válido.").max(160),
  city: optionalText(80),
  chairs: optionalInteger(60),
  currentSoftware: optionalText(120),
  mainLeak: z.enum(mainLeakValues, {
    error: "Selecciona dónde notas más fuga comercial.",
  }),
  monthlyFirstVisits: optionalInteger(10000),
  missedAppointments: optionalInteger(10000),
  openQuotes: optionalInteger(10000),
  averageTreatmentValue: optionalInteger(1000000),
  inactivePatients: optionalInteger(1000000),
  message: optionalText(1200),
  source: z.string().trim().max(80).optional().default("landing"),
  campaign: optionalText(120),
  landingPage: optionalText(240),
  privacyConsent: z.boolean(),
  marketingConsent: z.boolean(),
});

export type AgencyAuditLeadInput = z.infer<typeof agencyAuditLeadSchema>;

function normalizePhone(value: string) {
  let phone = value.trim().replace(/[^\d+]/g, "");
  phone = phone.replace(/(?!^)\+/g, "");

  if (phone.startsWith("00")) {
    phone = `+${phone.slice(2)}`;
  }

  if (!phone.startsWith("+")) {
    phone = phone.length === 9 ? `+34${phone}` : `+${phone}`;
  }

  return phone;
}

function toCents(euros: number | null) {
  return euros === null ? null : Math.round(euros * 100);
}

function calculateLeakEstimate(input: AgencyAuditLeadInput) {
  const ticketCents = toCents(input.averageTreatmentValue) ?? 65000;
  const missedAppointments = input.missedAppointments ?? 0;
  const openQuotes = input.openQuotes ?? 0;
  const inactivePatients = Math.min(input.inactivePatients ?? 0, 250);
  const monthlyFirstVisits = input.monthlyFirstVisits ?? 0;

  const appointmentLeak = missedAppointments * Math.round(ticketCents * 0.35);
  const quoteLeak = openQuotes * Math.round(ticketCents * 0.18);
  const inactiveLeak = inactivePatients * 4500;
  const acquisitionLeak = monthlyFirstVisits * Math.round(ticketCents * 0.04);
  const estimatedLeakMin = appointmentLeak + quoteLeak + inactiveLeak + acquisitionLeak;

  return {
    estimatedLeakMin,
    estimatedLeakMax: Math.round(estimatedLeakMin * 1.75),
  };
}

function getPriority(input: AgencyAuditLeadInput, estimatedLeakMin: number) {
  if (estimatedLeakMin >= 300000 || (input.chairs ?? 0) >= 4 || (input.openQuotes ?? 0) >= 15) {
    return "alta";
  }

  if (estimatedLeakMin >= 100000 || (input.chairs ?? 0) >= 2) {
    return "media";
  }

  return "normal";
}

export async function createAgencyAuditLead(
  input: unknown,
  requestMeta: { ipAddress: string | null; userAgent: string | null },
) {
  const parsed = agencyAuditLeadSchema.parse(input);

  if (!parsed.privacyConsent) {
    throw new Error("El consentimiento para gestionar la solicitud es obligatorio.");
  }

  const { estimatedLeakMin, estimatedLeakMax } = calculateLeakEstimate(parsed);
  const priority = getPriority(parsed, estimatedLeakMin);
  const phone = normalizePhone(parsed.phone);
  const db = getDb();

  return db.agencyLead.create({
    data: {
      clinicName: parsed.clinicName,
      contactName: parsed.contactName,
      role: parsed.role,
      phone,
      email: parsed.email.toLowerCase(),
      city: parsed.city,
      chairs: parsed.chairs,
      currentSoftware: parsed.currentSoftware,
      mainLeak: parsed.mainLeak,
      monthlyFirstVisits: parsed.monthlyFirstVisits,
      missedAppointments: parsed.missedAppointments,
      openQuotes: parsed.openQuotes,
      averageTreatmentValue: toCents(parsed.averageTreatmentValue),
      inactivePatients: parsed.inactivePatients,
      estimatedLeakMin,
      estimatedLeakMax,
      message: parsed.message,
      source: parsed.source || "landing",
      campaign: parsed.campaign,
      landingPage: parsed.landingPage,
      priority,
      privacyConsent: parsed.privacyConsent,
      marketingConsent: parsed.marketingConsent,
      ipAddress: requestMeta.ipAddress,
      userAgent: requestMeta.userAgent,
      activities: {
        create: {
          type: "formulario",
          title: "Solicitud de auditoría recibida",
          notes: `Fuga principal: ${parsed.mainLeak}. Estimación orientativa: ${estimatedLeakMin}-${estimatedLeakMax} céntimos.`,
        },
      },
    },
  });
}
