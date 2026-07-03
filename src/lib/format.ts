export function formatEuros(cents: number) {
  return new Intl.NumberFormat("es-ES", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(cents / 100);
}

export function formatTime(date: Date) {
  return new Intl.DateTimeFormat("es-ES", {
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
}

export function formatDateOnly(date: Date) {
  return new Intl.DateTimeFormat("es-ES", {
    day: "2-digit",
    month: "short",
  }).format(date);
}

export function formatDateTime(date: Date) {
  return new Intl.DateTimeFormat("es-ES", {
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
}

const statusLabels: Record<string, string> = {
  copia_registrada: "Copy registered",
  pendiente_email: "Email pending",
  pendiente_actualizacion: "Update pending",
  pendiente_firma: "Signature pending",
  requiere_actualizacion: "Requires update",
  no_aplica: "Not applicable",
  en_curso: "In progress",
  en_sala: "In room",
  en_seguimiento: "In follow-up",
  en_produccion: "In production",
  no_solicitada: "Not requested",
  whatsapp_preparado: "WhatsApp prepared",
  cita_agendada: "Appointment scheduled",
  created: "Created",
  updated: "Updated",
  activated: "Activated",
  deactivated: "Deactivated",
  status_updated: "Status updated",
  postponed: "Postponed",
  rescheduled: "Rescheduled",
  csv_downloaded_demo: "CSV downloaded",
  sent_demo: "Survey sent",
  clinical_note_signed_demo: "Clinical note signed",
  anamnesis_updated_demo: "Medical history updated",
  signed_from_public_qr_demo: "Consent signed from QR",
  document_signed_from_public_qr_demo: "Document signed from QR",
  quote_acceptance_signed_from_public_qr_demo: "Quote accepted from QR",
  seed_demo_leads_ready: "Initial requests prepared",
  seed_demo_quotes_ready: "Initial quotes prepared",
  commercial_demo_reset: "Commercial base prepared",
};

export function humanizeStatus(status: string) {
  if (statusLabels[status]) {
    return statusLabels[status];
  }

  return status
    .split("_")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}
