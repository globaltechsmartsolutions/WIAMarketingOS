import type { Prisma } from "@/generated/prisma/client";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  CalendarCheck2,
  CheckCircle2,
  CircleDollarSign,
  ClipboardList,
  ExternalLink,
  FileClock,
  Mail,
  MessageSquareText,
  Phone,
  Search,
  ShieldCheck,
  Star,
  UsersRound,
} from "lucide-react";
import { requireAppSession } from "@/lib/demo-permissions";
import { getDb } from "@/lib/db";
import { formatDateTime, formatEuros } from "@/lib/format";
import { directionRoles } from "@/lib/permissions";
import { addAgencyLeadActivity, updateAgencyLeadPriority, updateAgencyLeadStatus } from "./actions";

export const dynamic = "force-dynamic";

const statusTabs = [
  { label: "Todos", value: "todos" },
  { label: "Nuevos", value: "nuevo" },
  { label: "Contactados", value: "contactado" },
  { label: "Demo agendada", value: "demo_agendada" },
  { label: "Piloto abierto", value: "piloto_abierto" },
  { label: "Ganados", value: "ganado" },
  { label: "Perdidos", value: "perdido" },
];

const statusLabels: Record<string, string> = {
  nuevo: "Nuevo",
  contactado: "Contactado",
  demo_agendada: "Demo agendada",
  piloto_abierto: "Piloto abierto",
  ganado: "Ganado",
  perdido: "Perdido",
};

const statusStyles: Record<string, string> = {
  nuevo: "bg-secondary-soft text-primary-strong",
  contactado: "bg-[#e8f1ff] text-[#24528f]",
  demo_agendada: "bg-[#fff4d8] text-[#8a5a12]",
  piloto_abierto: "bg-[#eef3ff] text-[#24477f]",
  ganado: "bg-[#eaf7ef] text-[#236b49]",
  perdido: "bg-[#fdecec] text-danger",
};

const priorityStyles: Record<string, string> = {
  alta: "bg-[#fdecec] text-danger",
  media: "bg-[#fff4d8] text-[#8a5a12]",
  normal: "bg-muted text-ink-soft",
};

const mainLeakLabels: Record<string, string> = {
  agenda: "Citas perdidas",
  presupuestos: "Presupuestos",
  pacientes_inactivos: "Pacientes dormidos",
  recepcion: "Recepción saturada",
  resenas: "Reseñas",
  no_lo_se: "Sin diagnosticar",
};

const noticeMessages: Record<string, string> = {
  activity_added: "Nota comercial registrada.",
  activity_missing: "Añade una nota o título antes de guardar actividad.",
  lost_reason_missing: "Indica un motivo antes de marcar una oportunidad como perdida.",
  priority_updated: "Prioridad actualizada.",
  status_updated: "Estado comercial actualizado.",
};

function cleanStatus(value: string | undefined) {
  return statusTabs.some((tab) => tab.value === value) ? value ?? "todos" : "todos";
}

function formatNumber(value: number | null) {
  return value === null ? "Sin dato" : new Intl.NumberFormat("es-ES").format(value);
}

function statusHref(status: string, q: string) {
  const params = new URLSearchParams();

  if (status !== "todos") {
    params.set("status", status);
  }

  if (q) {
    params.set("q", q);
  }

  const query = params.toString();
  return `/interno/ventas${query ? `?${query}` : ""}`;
}

function buildWhere(status: string, q: string): Prisma.AgencyLeadWhereInput {
  const where: Prisma.AgencyLeadWhereInput = {};

  if (status !== "todos") {
    where.status = status;
  }

  if (q) {
    where.OR = [
      { clinicName: { contains: q, mode: "insensitive" } },
      { contactName: { contains: q, mode: "insensitive" } },
      { email: { contains: q, mode: "insensitive" } },
      { phone: { contains: q, mode: "insensitive" } },
      { city: { contains: q, mode: "insensitive" } },
    ];
  }

  return where;
}

async function getSalesData(status: string, q: string) {
  const db = getDb();
  const where = buildWhere(status, q);
  const openWhere: Prisma.AgencyLeadWhereInput = {
    status: { in: ["nuevo", "contactado", "demo_agendada", "piloto_abierto"] },
  };

  const [leads, counts, totalOpen, highPriority, openEstimate] = await Promise.all([
    db.agencyLead.findMany({
      where,
      orderBy: [{ priority: "desc" }, { createdAt: "desc" }],
      include: {
        activities: {
          orderBy: { createdAt: "desc" },
          take: 4,
        },
      },
    }),
    db.agencyLead.groupBy({
      by: ["status"],
      _count: { status: true },
    }),
    db.agencyLead.count({ where: openWhere }),
    db.agencyLead.count({
      where: {
        priority: "alta",
        status: { in: ["nuevo", "contactado", "demo_agendada", "piloto_abierto"] },
      },
    }),
    db.agencyLead.aggregate({
      where: openWhere,
      _sum: { estimatedLeakMin: true },
    }),
  ]);

  return {
    counts: Object.fromEntries(counts.map((item) => [item.status, item._count.status])),
    highPriority,
    leads,
    openEstimate: openEstimate._sum.estimatedLeakMin ?? 0,
    totalOpen,
  };
}

function StatusButton({
  currentStatus,
  leadId,
  status,
}: {
  currentStatus: string;
  leadId: string;
  status: string;
}) {
  return (
    <form action={updateAgencyLeadStatus}>
      <input name="leadId" type="hidden" value={leadId} />
      <input name="status" type="hidden" value={status} />
      <input name="currentStatus" type="hidden" value={currentStatus} />
      <button
        className="inline-flex h-9 w-full items-center justify-center gap-2 rounded-md border border-border px-3 text-sm font-semibold hover:bg-muted"
        type="submit"
      >
        <CheckCircle2 size={15} aria-hidden />
        {statusLabels[status]}
      </button>
    </form>
  );
}

export default async function SalesPage({
  searchParams,
}: {
  searchParams: Promise<{ notice?: string; q?: string; status?: string }>;
}) {
  await requireAppSession(directionRoles, "/interno/ventas");
  const query = await searchParams;
  const selectedStatus = cleanStatus(query.status);
  const q = (query.q ?? "").trim();
  const noticeText = query.notice ? noticeMessages[query.notice] ?? null : null;
  const { counts, highPriority, leads, openEstimate, totalOpen } = await getSalesData(selectedStatus, q);
  const totalLeads = Object.values(counts).reduce((total, value) => total + value, 0);
  const wonCount = counts.ganado ?? 0;
  const pilotCount = counts.piloto_abierto ?? 0;

  return (
    <main className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border bg-surface">
        <div className="mx-auto flex max-w-[1440px] flex-col gap-3 px-4 py-3 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="grid size-11 place-items-center rounded-lg border border-border text-primary hover:bg-muted"
              title="Volver al inicio"
            >
              <ArrowLeft size={20} aria-hidden />
            </Link>
            <div>
              <p className="text-sm font-semibold text-primary">WIAMarketingOS · Backoffice comercial interno</p>
              <h1 className="mt-1 text-2xl font-semibold tracking-normal md:text-3xl">
                Ventas internas y auditorías
              </h1>
            </div>
          </div>
          <Link
            href="/auditoria-fugas-dental"
            className="inline-flex h-11 items-center justify-center gap-2 rounded-md bg-primary px-4 text-sm font-semibold text-white hover:bg-primary-strong"
          >
            Ver landing
            <ExternalLink size={17} aria-hidden />
          </Link>
        </div>
      </header>

      <section className="mx-auto grid max-w-[1440px] gap-5 px-4 py-4">
        {noticeText ? (
          <div className="rounded-lg border border-border bg-secondary-soft px-5 py-4 text-sm font-semibold text-primary-strong">
            {noticeText}
          </div>
        ) : null}

        <section className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          <article className="rounded-lg border border-border bg-surface p-4">
            <p className="text-sm font-semibold text-ink-soft">Oportunidades abiertas</p>
            <p className="mt-2 text-3xl font-semibold">{totalOpen}</p>
            <p className="mt-1 text-xs font-semibold text-primary">{totalLeads} leads totales</p>
          </article>
          <article className="rounded-lg border border-border bg-surface p-4">
            <p className="text-sm font-semibold text-ink-soft">Fuga estimada abierta</p>
            <p className="mt-2 text-3xl font-semibold">{formatEuros(openEstimate)}</p>
            <p className="mt-1 text-xs font-semibold text-primary">mínimo mensual orientativo</p>
          </article>
          <article className="rounded-lg border border-border bg-surface p-4">
            <p className="text-sm font-semibold text-ink-soft">Prioridad alta</p>
            <p className="mt-2 text-3xl font-semibold">{highPriority}</p>
            <p className="mt-1 text-xs font-semibold text-primary">para llamar primero</p>
          </article>
          <article className="rounded-lg border border-border bg-surface p-4">
            <p className="text-sm font-semibold text-ink-soft">Pilotos y cierres</p>
            <p className="mt-2 text-3xl font-semibold">{pilotCount} / {wonCount}</p>
            <p className="mt-1 text-xs font-semibold text-primary">pilotos abiertos / ganados</p>
          </article>
        </section>

        <section className="grid gap-4 rounded-lg border border-border bg-surface p-4 xl:grid-cols-[1fr_auto] xl:items-end">
          <div>
            <h2 className="font-semibold">Bandeja comercial de clínicas</h2>
            <p className="mt-1 text-sm leading-6 text-ink-soft">
              Aquí entran las solicitudes de auditoría desde la landing. Son clínicas objetivo,
              no pacientes ni datos sanitarios.
            </p>
          </div>
          <form action="/interno/ventas" className="flex min-w-0 flex-col gap-2 sm:flex-row">
            {selectedStatus !== "todos" ? <input name="status" type="hidden" value={selectedStatus} /> : null}
            <label className="flex h-10 min-w-0 items-center gap-2 rounded-md border border-border bg-white px-3 text-sm text-ink-soft sm:w-80">
              <Search size={16} aria-hidden />
              <input
                className="min-w-0 flex-1 bg-transparent outline-none placeholder:text-ink-soft"
                defaultValue={q}
                name="q"
                placeholder="Buscar clínica, ciudad o contacto"
              />
            </label>
            <button
              className="inline-flex h-10 items-center justify-center rounded-md border border-border px-4 text-sm font-semibold hover:bg-muted"
              type="submit"
            >
              Buscar
            </button>
          </form>
        </section>

        <nav className="flex flex-wrap gap-2">
          {statusTabs.map((tab) => {
            const isActive = selectedStatus === tab.value;
            const count =
              tab.value === "todos"
                ? Object.values(counts).reduce((total, value) => total + value, 0)
                : counts[tab.value] ?? 0;

            return (
              <Link
                key={tab.value}
                href={statusHref(tab.value, q)}
                className={`inline-flex h-10 shrink-0 items-center gap-2 rounded-md border px-3 text-sm font-semibold ${
                  isActive
                    ? "border-primary bg-primary text-white"
                    : "border-border bg-surface text-ink-soft hover:bg-muted hover:text-foreground"
                }`}
              >
                {tab.label}
                <span className={`rounded px-1.5 py-0.5 text-xs ${isActive ? "bg-white/20" : "bg-muted"}`}>
                  {count}
                </span>
              </Link>
            );
          })}
        </nav>

        <section className="grid gap-4">
          {leads.length > 0 ? (
            leads.map((lead) => {
              const estimate =
                lead.estimatedLeakMin && lead.estimatedLeakMax
                  ? `${formatEuros(lead.estimatedLeakMin)} - ${formatEuros(lead.estimatedLeakMax)}`
                  : "Sin estimación";
              const nextStatus =
                lead.status === "nuevo"
                  ? "contactado"
                  : lead.status === "contactado"
                    ? "demo_agendada"
                    : lead.status === "demo_agendada"
                      ? "piloto_abierto"
                      : lead.status === "piloto_abierto"
                        ? "ganado"
                        : null;
              const outreach = `Hola ${lead.contactName}, soy Alejandro de WIADental. Hemos recibido la solicitud de auditoría de ${lead.clinicName}. Por lo que indicáis, revisaría primero ${mainLeakLabels[lead.mainLeak]?.toLowerCase() ?? "las fugas comerciales"} y os enseñaría dónde podéis recuperar citas, presupuestos o pacientes dormidos sin cambiar de CRM de golpe.`;

              return (
                <article
                  id={`agency-lead-${lead.id}`}
                  key={lead.id}
                  className="rounded-lg border border-border bg-surface p-5 shadow-[0_1px_2px_rgba(15,35,38,0.04)]"
                >
                  <div className="grid gap-5 xl:grid-cols-[1.1fr_0.9fr_280px]">
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <h2 className="text-xl font-semibold">{lead.clinicName}</h2>
                        <span className={`rounded-md px-2 py-1 text-xs font-semibold ${statusStyles[lead.status] ?? "bg-muted text-ink-soft"}`}>
                          {statusLabels[lead.status] ?? lead.status}
                        </span>
                        <span className={`rounded-md px-2 py-1 text-xs font-semibold ${priorityStyles[lead.priority] ?? priorityStyles.normal}`}>
                          Prioridad {lead.priority}
                        </span>
                      </div>
                      <p className="mt-2 text-sm text-ink-soft">
                        {lead.contactName}{lead.role ? ` · ${lead.role}` : ""}{lead.city ? ` · ${lead.city}` : ""}
                      </p>
                      <p className="mt-4 max-w-3xl text-sm leading-6">
                        {lead.message || "Sin comentario adicional. Revisar datos del formulario y llamar para cualificar."}
                      </p>
                      <div className="mt-4 flex flex-wrap gap-2">
                        <a
                          className="inline-flex h-9 items-center gap-2 rounded-md border border-border px-3 text-sm font-semibold hover:bg-muted"
                          href={`tel:${lead.phone}`}
                        >
                          <Phone size={15} aria-hidden />
                          Llamar
                        </a>
                        <a
                          className="inline-flex h-9 items-center gap-2 rounded-md border border-border px-3 text-sm font-semibold hover:bg-muted"
                          href={`mailto:${lead.email}`}
                        >
                          <Mail size={15} aria-hidden />
                          Email
                        </a>
                        <Link
                          className="inline-flex h-9 items-center gap-2 rounded-md border border-border px-3 text-sm font-semibold hover:bg-muted"
                          href="/auditoria-fugas-dental"
                        >
                          <ExternalLink size={15} aria-hidden />
                          Landing
                        </Link>
                      </div>
                    </div>

                    <dl className="grid content-start gap-3 border-y border-border py-4 text-sm xl:border-x xl:border-y-0 xl:px-5 xl:py-0">
                      <div className="flex items-center justify-between gap-3">
                        <dt className="inline-flex items-center gap-2 font-semibold text-ink-soft">
                          <CircleDollarSign size={15} aria-hidden />
                          Fuga estimada
                        </dt>
                        <dd className="text-right font-semibold">{estimate}</dd>
                      </div>
                      <div className="flex items-center justify-between gap-3">
                        <dt className="inline-flex items-center gap-2 font-semibold text-ink-soft">
                          <ClipboardList size={15} aria-hidden />
                          Mayor fuga
                        </dt>
                        <dd className="text-right">{mainLeakLabels[lead.mainLeak] ?? lead.mainLeak}</dd>
                      </div>
                      <div className="flex items-center justify-between gap-3">
                        <dt className="inline-flex items-center gap-2 font-semibold text-ink-soft">
                          <UsersRound size={15} aria-hidden />
                          Sillones
                        </dt>
                        <dd>{formatNumber(lead.chairs)}</dd>
                      </div>
                      <div className="flex items-center justify-between gap-3">
                        <dt className="inline-flex items-center gap-2 font-semibold text-ink-soft">
                          <FileClock size={15} aria-hidden />
                          Presupuestos
                        </dt>
                        <dd>{formatNumber(lead.openQuotes)}</dd>
                      </div>
                      <div className="flex items-center justify-between gap-3">
                        <dt className="inline-flex items-center gap-2 font-semibold text-ink-soft">
                          <CalendarCheck2 size={15} aria-hidden />
                          Citas perdidas
                        </dt>
                        <dd>{formatNumber(lead.missedAppointments)}</dd>
                      </div>
                      <div className="flex items-center justify-between gap-3">
                        <dt className="inline-flex items-center gap-2 font-semibold text-ink-soft">
                          <ShieldCheck size={15} aria-hidden />
                          CRM actual
                        </dt>
                        <dd className="text-right">{lead.currentSoftware || "Sin dato"}</dd>
                      </div>
                    </dl>

                    <div className="grid content-start gap-2">
                      {nextStatus ? (
                        <StatusButton currentStatus={selectedStatus} leadId={lead.id} status={nextStatus} />
                      ) : null}
                      {lead.status !== "perdido" && lead.status !== "ganado" ? (
                        <form action={updateAgencyLeadStatus} className="grid gap-2">
                          <input name="leadId" type="hidden" value={lead.id} />
                          <input name="status" type="hidden" value="perdido" />
                          <input name="currentStatus" type="hidden" value={selectedStatus} />
                          <select
                            className="h-9 rounded-md border border-border bg-white px-3 text-sm"
                            name="note"
                            required
                          >
                            <option value="">Motivo de pérdida</option>
                            <option value="No responde tras varios intentos">No responde</option>
                            <option value="No tiene presupuesto ahora">Sin presupuesto ahora</option>
                            <option value="Ya usa otra solución">Ya usa otra solución</option>
                            <option value="No encaja con el piloto">No encaja con el piloto</option>
                          </select>
                          <button
                            className="inline-flex h-9 items-center justify-center rounded-md border border-danger px-3 text-sm font-semibold text-danger hover:bg-[#fdecec]"
                            type="submit"
                          >
                            Marcar perdido
                          </button>
                        </form>
                      ) : null}
                      <form action={updateAgencyLeadPriority} className="grid gap-2">
                        <input name="leadId" type="hidden" value={lead.id} />
                        <input name="currentStatus" type="hidden" value={selectedStatus} />
                        <select className="h-9 rounded-md border border-border bg-white px-3 text-sm" defaultValue={lead.priority} name="priority">
                          <option value="alta">Prioridad alta</option>
                          <option value="media">Prioridad media</option>
                          <option value="normal">Prioridad normal</option>
                        </select>
                        <button
                          className="inline-flex h-9 items-center justify-center rounded-md border border-border px-3 text-sm font-semibold hover:bg-muted"
                          type="submit"
                        >
                          Cambiar prioridad
                        </button>
                      </form>
                    </div>
                  </div>

                  <div className="mt-5 grid gap-5 border-t border-border pt-5 xl:grid-cols-[1fr_1fr]">
                    <div>
                      <h3 className="inline-flex items-center gap-2 text-sm font-semibold">
                        <MessageSquareText size={16} aria-hidden />
                        Mensaje inicial preparado
                      </h3>
                      <p className="mt-2 rounded-md bg-muted px-3 py-3 text-sm leading-6 text-ink-soft">
                        {outreach}
                      </p>
                    </div>
                    <div>
                      <h3 className="inline-flex items-center gap-2 text-sm font-semibold">
                        <Star size={16} aria-hidden />
                        Actividad comercial
                      </h3>
                      <div className="mt-2 grid gap-2 text-sm">
                        {lead.activities.length > 0 ? (
                          lead.activities.map((activity) => (
                            <div key={activity.id} className="border-b border-border pb-2 last:border-b-0">
                              <div className="flex flex-wrap items-center justify-between gap-2">
                                <p className="font-semibold">{activity.title}</p>
                                <p className="text-xs text-ink-soft">{formatDateTime(activity.createdAt)}</p>
                              </div>
                              {activity.notes ? (
                                <p className="mt-1 whitespace-pre-line text-xs leading-5 text-ink-soft">
                                  {activity.notes}
                                </p>
                              ) : null}
                            </div>
                          ))
                        ) : (
                          <p className="text-sm text-ink-soft">Sin actividad registrada todavía.</p>
                        )}
                      </div>
                      <form action={addAgencyLeadActivity} className="mt-3 grid gap-2">
                        <input name="leadId" type="hidden" value={lead.id} />
                        <input name="currentStatus" type="hidden" value={selectedStatus} />
                        <input
                          className="h-9 rounded-md border border-border bg-white px-3 text-sm"
                          name="title"
                          placeholder="Ejemplo: llamada realizada"
                        />
                        <textarea
                          className="min-h-20 rounded-md border border-border bg-white px-3 py-2 text-sm"
                          name="notes"
                          placeholder="Resultado, objeción, siguiente paso..."
                        />
                        <button
                          className="inline-flex h-9 items-center justify-center gap-2 rounded-md bg-primary px-3 text-sm font-semibold text-white hover:bg-primary-strong"
                          type="submit"
                        >
                          Añadir actividad
                          <ArrowRight size={15} aria-hidden />
                        </button>
                      </form>
                    </div>
                  </div>
                </article>
              );
            })
          ) : (
            <div className="rounded-lg border border-dashed border-border bg-surface p-8 text-center">
              <h2 className="font-semibold">No hay auditorías en esta vista</h2>
              <p className="mt-2 text-sm text-ink-soft">
                Cambia el filtro o revisa la landing para enviar una solicitud de prueba.
              </p>
              <Link
                href="/auditoria-fugas-dental"
                className="mt-5 inline-flex h-10 items-center gap-2 rounded-md bg-primary px-4 text-sm font-semibold text-white hover:bg-primary-strong"
              >
                Abrir landing
                <ExternalLink size={16} aria-hidden />
              </Link>
            </div>
          )}
        </section>
      </section>
    </main>
  );
}
