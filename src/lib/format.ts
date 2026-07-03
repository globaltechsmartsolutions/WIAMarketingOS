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
  copia_registrada: "Copia registrada",
  pendiente_email: "Pendiente de email",
  pendiente_actualizacion: "Pendiente de actualización",
  pendiente_firma: "Pendiente de firma",
  requiere_actualizacion: "Requiere actualización",
  no_aplica: "No aplica",
  en_curso: "En curso",
  en_sala: "En sala",
  en_seguimiento: "En seguimiento",
  en_produccion: "En producción",
  no_solicitada: "Sin solicitar",
  whatsapp_preparado: "WhatsApp preparado",
  cita_agendada: "Cita agendada",
  created: "Creado",
  updated: "Actualizado",
  activated: "Activado",
  deactivated: "Desactivado",
  status_updated: "Estado actualizado",
  postponed: "Pospuesto",
  rescheduled: "Reprogramado",
  csv_downloaded_demo: "CSV descargado",
  sent_demo: "Encuesta enviada",
  clinical_note_signed_demo: "Nota clínica firmada",
  anamnesis_updated_demo: "Anamnesis actualizada",
  signed_from_public_qr_demo: "Consentimiento firmado desde QR",
  document_signed_from_public_qr_demo: "Documento firmado desde QR",
  quote_acceptance_signed_from_public_qr_demo: "Presupuesto aceptado desde QR",
  seed_demo_leads_ready: "Solicitudes iniciales preparadas",
  seed_demo_quotes_ready: "Presupuestos iniciales preparados",
  commercial_demo_reset: "Base comercial preparada",
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
