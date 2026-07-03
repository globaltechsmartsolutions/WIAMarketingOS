import type { Prisma } from "@/generated/prisma/client";
import Link from "next/link";
import {
  ArrowRight,
  BarChart3,
  CalendarClock,
  CheckCircle2,
  Euro,
  Percent,
  Search,
  Trophy,
} from "lucide-react";
import { completeTask, updateDealStage } from "@/app/interno/actions";
import { formatDateOnly, formatDateTime, formatEuros } from "@/lib/format";
import {
  dealStageLabels,
  ensureMarketingCrmReady,
  priorityLabels,
} from "@/lib/marketing-crm";
import { getDb } from "@/lib/db";

export const dynamic = "force-dynamic";

const stageTabs = [
  { label: "Todas", value: "todas" },
  { label: "Cualificación", value: "cualificacion" },
  { label: "Demo", value: "demo" },
  { label: "Propuesta", value: "propuesta" },
  { label: "Piloto", value: "piloto" },
  { label: "Ganadas", value: "ganado" },
  { label: "Perdidas", value: "perdido" },
];

const noticeMessages: Record<string, string> = {
  deal_stage_updated: "Etapa de oportunidad actualizada.",
  lost_reason_missing: "Indica un motivo antes de marcar una oportunidad como perdida.",
  task_completed: "Tarea completada.",
};

const stageStyles: Record<string, string> = {
  cualificacion: "bg-secondary-soft text-primary-strong",
  demo: "bg-[#e8f1ff] text-[#24528f]",
  propuesta: "bg-[#fff4d8] text-[#8a5a12]",
  piloto: "bg-[#eef3ff] text-[#24477f]",
  ganado: "bg-[#eaf7ef] text-[#236b49]",
  perdido: "bg-[#fdecec] text-danger",
};

function cleanStage(value: string | undefined) {
  return stageTabs.some((tab) => tab.value === value) ? value ?? "todas" : "todas";
}

function buildReturnTo(stage: string, q: string, campaign: string) {
  const params = new URLSearchParams();

  if (stage !== "todas") {
    params.set("stage", stage);
  }

  if (q) {
    params.set("q", q);
  }

  if (campaign) {
    params.set("campaign", campaign);
  }

  const query = params.toString();
  return `/interno/deals${query ? `?${query}` : ""}`;
}

function stageHref(stage: string, q: string, campaign: string) {
  const params = new URLSearchParams();

  if (stage !== "todas") {
    params.set("stage", stage);
  }

  if (q) {
    params.set("q", q);
  }

  if (campaign) {
    params.set("campaign", campaign);
  }

  const query = params.toString();
  return `/interno/deals${query ? `?${query}` : ""}`;
}

function buildWhere(stage: string, q: string, campaignId: string): Prisma.DealWhereInput {
  const where: Prisma.DealWhereInput = {};

  if (stage !== "todas") {
    where.stage = stage;
  }

  if (campaignId) {
    where.campaignId = campaignId;
  }

  if (q) {
    where.OR = [
      { title: { contains: q, mode: "insensitive" } },
      { lostReason: { contains: q, mode: "insensitive" } },
      { company: { name: { contains: q, mode: "insensitive" } } },
      { company: { city: { contains: q, mode: "insensitive" } } },
      { contact: { name: { contains: q, mode: "insensitive" } } },
      { lead: { problem: { contains: q, mode: "insensitive" } } },
    ];
  }

  return where;
}

async function getDealsData(stage: string, q: string, campaignId: string) {
  await ensureMarketingCrmReady();
  const db = getDb();
  const where = buildWhere(stage, q, campaignId);
  const campaignWhere: Prisma.DealWhereInput = campaignId ? { campaignId } : {};

  const [deals, campaigns, counts, openPipeline, weightedPipeline, wonDeals] = await Promise.all([
    db.deal.findMany({
      where,
      orderBy: [{ status: "asc" }, { expectedCloseAt: "asc" }, { createdAt: "desc" }],
      include: {
        campaign: { select: { id: true, name: true } },
        company: { select: { id: true, name: true, city: true } },
        contact: { select: { id: true, name: true, role: true, email: true, phone: true } },
        lead: { select: { id: true, status: true, score: true, problem: true } },
        tasks: {
          where: { status: "open" },
          orderBy: [{ dueAt: "asc" }, { createdAt: "asc" }],
          select: { id: true, title: true, priority: true, dueAt: true },
          take: 2,
        },
        activities: {
          orderBy: { createdAt: "desc" },
          select: { id: true, title: true, notes: true, createdAt: true },
          take: 2,
        },
      },
    }),
    db.campaign.findMany({
      orderBy: { createdAt: "desc" },
      select: { id: true, name: true },
    }),
    db.deal.groupBy({
      by: ["stage"],
      where: campaignWhere,
      _count: { stage: true },
    }),
    db.deal.aggregate({
      where: {
        ...campaignWhere,
        status: "open",
      },
      _sum: { valueCents: true },
    }),
    db.deal.findMany({
      where: {
        ...campaignWhere,
        status: "open",
      },
      select: { valueCents: true, probability: true },
    }),
    db.deal.count({
      where: {
        ...campaignWhere,
        status: "won",
      },
    }),
  ]);

  const weighted = weightedPipeline.reduce(
    (total, deal) => total + Math.round(((deal.valueCents ?? 0) * deal.probability) / 100),
    0,
  );

  return {
    campaigns,
    counts: Object.fromEntries(counts.map((item) => [item.stage, item._count.stage])),
    deals,
    openPipeline: openPipeline._sum.valueCents ?? 0,
    weightedPipeline: weighted,
    wonDeals,
  };
}

export default async function DealsPage({
  searchParams,
}: {
  searchParams: Promise<{ campaign?: string; notice?: string; q?: string; stage?: string }>;
}) {
  const query = await searchParams;
  const selectedStage = cleanStage(query.stage);
  const q = (query.q ?? "").trim();
  const campaignId = (query.campaign ?? "").trim();
  const returnTo = buildReturnTo(selectedStage, q, campaignId);
  const noticeText = query.notice ? noticeMessages[query.notice] ?? null : null;
  const { campaigns, counts, deals, openPipeline, weightedPipeline, wonDeals } = await getDealsData(
    selectedStage,
    q,
    campaignId,
  );
  const totalDeals = Object.values(counts).reduce((total, value) => total + value, 0);
  const openDeals = deals.filter((deal) => deal.status === "open").length;
  const averageProbability =
    deals.length === 0
      ? 0
      : Math.round(deals.reduce((total, deal) => total + deal.probability, 0) / deals.length);

  return (
    <div className="grid gap-4">
      <header className="grid gap-3 lg:grid-cols-[1fr_auto] lg:items-end">
        <div>
          <p className="text-sm font-semibold text-primary">Pipeline comercial</p>
          <h1 className="mt-1 text-2xl font-semibold tracking-normal md:text-3xl">
            Oportunidades
          </h1>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-ink-soft">
            Deals conectados a campañas y leads. Sirven para ver qué se puede cerrar, dónde se
            atasca y qué tareas comerciales hay que ejecutar.
          </p>
        </div>
        <Link
          href="/interno/leads"
          className="inline-flex h-10 items-center justify-center gap-2 rounded-md bg-primary px-4 text-sm font-semibold text-white hover:bg-primary-strong"
        >
          Ver leads
          <ArrowRight size={16} aria-hidden />
        </Link>
      </header>

      {noticeText ? (
        <div className="rounded-lg border border-border bg-secondary-soft px-4 py-3 text-sm font-semibold text-primary-strong">
          {noticeText}
        </div>
      ) : null}

      <section className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <article className="rounded-lg border border-border bg-surface p-4">
          <p className="inline-flex items-center gap-2 text-sm font-semibold text-ink-soft">
            <Euro size={16} aria-hidden />
            Pipeline abierto
          </p>
          <p className="mt-2 text-3xl font-semibold">{formatEuros(openPipeline)}</p>
          <p className="mt-1 text-xs font-semibold text-primary">{openDeals} oportunidades abiertas</p>
        </article>
        <article className="rounded-lg border border-border bg-surface p-4">
          <p className="inline-flex items-center gap-2 text-sm font-semibold text-ink-soft">
            <Percent size={16} aria-hidden />
            Pipeline ponderado
          </p>
          <p className="mt-2 text-3xl font-semibold">{formatEuros(weightedPipeline)}</p>
          <p className="mt-1 text-xs font-semibold text-primary">{averageProbability}% probabilidad media</p>
        </article>
        <article className="rounded-lg border border-border bg-surface p-4">
          <p className="inline-flex items-center gap-2 text-sm font-semibold text-ink-soft">
            <Trophy size={16} aria-hidden />
            Ganadas
          </p>
          <p className="mt-2 text-3xl font-semibold">{wonDeals}</p>
          <p className="mt-1 text-xs font-semibold text-primary">{totalDeals} oportunidades totales</p>
        </article>
        <article className="rounded-lg border border-border bg-surface p-4">
          <p className="inline-flex items-center gap-2 text-sm font-semibold text-ink-soft">
            <BarChart3 size={16} aria-hidden />
            Vista actual
          </p>
          <p className="mt-2 text-3xl font-semibold">{deals.length}</p>
          <p className="mt-1 text-xs font-semibold text-primary">según filtros aplicados</p>
        </article>
      </section>

      <section className="grid gap-3 rounded-lg border border-border bg-surface p-4 xl:grid-cols-[1fr_auto] xl:items-end">
        <form action="/interno/deals" className="grid gap-3 md:grid-cols-[1fr_240px_auto]">
          {selectedStage !== "todas" ? <input name="stage" type="hidden" value={selectedStage} /> : null}
          <label className="flex h-10 min-w-0 items-center gap-2 rounded-md border border-border bg-white px-3 text-sm text-ink-soft">
            <Search size={16} aria-hidden />
            <input
              className="min-w-0 flex-1 bg-transparent outline-none placeholder:text-ink-soft"
              defaultValue={q}
              name="q"
              placeholder="Buscar oportunidad, empresa o motivo"
            />
          </label>
          <select
            className="h-10 rounded-md border border-border bg-white px-3 text-sm outline-none focus:border-primary"
            defaultValue={campaignId}
            name="campaign"
          >
            <option value="">Todas las campañas</option>
            {campaigns.map((campaign) => (
              <option key={campaign.id} value={campaign.id}>
                {campaign.name}
              </option>
            ))}
          </select>
          <button className="inline-flex h-10 items-center justify-center rounded-md border border-border px-4 text-sm font-semibold hover:bg-muted" type="submit">
            Buscar
          </button>
        </form>
        <Link
          href="/interno/campanas"
          className="inline-flex h-10 items-center justify-center rounded-md border border-border px-4 text-sm font-semibold hover:bg-muted"
        >
          Ver campañas
        </Link>
      </section>

      <nav className="flex gap-2 overflow-x-auto">
        {stageTabs.map((tab) => {
          const isActive = selectedStage === tab.value;
          const count =
            tab.value === "todas"
              ? Object.values(counts).reduce((total, value) => total + value, 0)
              : counts[tab.value] ?? 0;

          return (
            <Link
              key={tab.value}
              href={stageHref(tab.value, q, campaignId)}
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

      <section className="grid gap-3">
        {deals.length > 0 ? (
          deals.map((deal) => (
            <article id={`deal-${deal.id}`} key={deal.id} className="rounded-lg border border-border bg-surface p-4">
              <div className="grid gap-4 xl:grid-cols-[1fr_300px_280px]">
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <h2 className="text-lg font-semibold">{deal.title}</h2>
                    <span className={`rounded-md px-2 py-1 text-xs font-semibold ${stageStyles[deal.stage] ?? "bg-muted text-ink-soft"}`}>
                      {dealStageLabels[deal.stage] ?? deal.stage}
                    </span>
                    <span className="rounded-md bg-muted px-2 py-1 text-xs font-semibold text-ink-soft">
                      {deal.probability}%
                    </span>
                  </div>
                  <p className="mt-2 text-sm text-ink-soft">
                    {[deal.company?.name, deal.company?.city, deal.contact?.name, deal.contact?.role]
                      .filter(Boolean)
                      .join(" · ") || "Sin empresa asociada"}
                  </p>
                  {deal.lead?.problem ? (
                    <p className="mt-3 max-w-3xl text-sm leading-6">{deal.lead.problem}</p>
                  ) : null}
                  <div className="mt-4 flex flex-wrap gap-2 text-xs font-semibold text-ink-soft">
                    <span className="rounded-md bg-background px-2 py-1">
                      Valor: {formatEuros(deal.valueCents ?? 0)}
                    </span>
                    <span className="rounded-md bg-background px-2 py-1">
                      Cierre previsto: {deal.expectedCloseAt ? formatDateOnly(deal.expectedCloseAt) : "sin fecha"}
                    </span>
                    {deal.campaign ? (
                      <Link className="rounded-md bg-background px-2 py-1 hover:bg-muted" href={`/interno/campanas#campaign-${deal.campaign.id}`}>
                        {deal.campaign.name}
                      </Link>
                    ) : null}
                    {deal.lead ? (
                      <Link className="rounded-md bg-background px-2 py-1 hover:bg-muted" href={`/interno/leads#lead-${deal.lead.id}`}>
                        Lead score {deal.lead.score}
                      </Link>
                    ) : null}
                  </div>
                </div>

                <div className="grid content-start gap-3 rounded-md bg-background p-3 text-sm">
                  <p className="font-semibold">Mover oportunidad</p>
                  <form action={updateDealStage} className="grid gap-2">
                    <input name="dealId" type="hidden" value={deal.id} />
                    <input name="returnTo" type="hidden" value={returnTo} />
                    <select className="h-9 rounded-md border border-border bg-white px-3" defaultValue={deal.stage} name="stage">
                      <option value="cualificacion">Cualificación</option>
                      <option value="demo">Demo</option>
                      <option value="propuesta">Propuesta</option>
                      <option value="piloto">Piloto</option>
                      <option value="ganado">Ganada</option>
                      <option value="perdido">Perdida</option>
                    </select>
                    <input className="h-9 rounded-md border border-border bg-white px-3" name="lostReason" placeholder="Motivo si se pierde" />
                    <button className="inline-flex h-9 items-center justify-center gap-2 rounded-md border border-border px-3 font-semibold hover:bg-muted" type="submit">
                      <CheckCircle2 size={15} aria-hidden />
                      Guardar etapa
                    </button>
                  </form>
                  <div className="border-t border-border pt-3">
                    <p className="text-xs font-semibold text-ink-soft">Último movimiento</p>
                    {deal.activities.length > 0 ? (
                      <div className="mt-2 grid gap-2">
                        {deal.activities.map((activity) => (
                          <div key={activity.id}>
                            <p className="font-semibold">{activity.title}</p>
                            <p className="text-xs text-ink-soft">{formatDateTime(activity.createdAt)}</p>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="mt-2 text-ink-soft">Sin actividad todavía.</p>
                    )}
                  </div>
                </div>

                <div className="grid content-start gap-3 rounded-md border border-border p-3 text-sm">
                  <p className="inline-flex items-center gap-2 font-semibold">
                    <CalendarClock size={16} aria-hidden />
                    Tareas
                  </p>
                  {deal.tasks.length > 0 ? (
                    deal.tasks.map((task) => (
                      <div key={task.id} className="rounded-md bg-background p-2">
                        <div className="flex items-start justify-between gap-2">
                          <p className="leading-5">{task.title}</p>
                          <form action={completeTask}>
                            <input name="taskId" type="hidden" value={task.id} />
                            <input name="returnTo" type="hidden" value={returnTo} />
                            <button className="grid size-8 place-items-center rounded-md border border-border hover:bg-muted" title="Completar tarea" type="submit">
                              <CheckCircle2 size={15} aria-hidden />
                            </button>
                          </form>
                        </div>
                        <p className="mt-1 text-xs font-semibold text-ink-soft">
                          {task.dueAt ? `Vence ${formatDateOnly(task.dueAt)}` : "Sin fecha"} · {priorityLabels[task.priority] ?? task.priority}
                        </p>
                      </div>
                    ))
                  ) : (
                    <p className="text-ink-soft">Sin tareas abiertas.</p>
                  )}
                </div>
              </div>
            </article>
          ))
        ) : (
          <div className="rounded-lg border border-dashed border-border bg-surface p-8 text-center">
            <h2 className="font-semibold">No hay oportunidades en esta vista</h2>
            <p className="mt-2 text-sm text-ink-soft">
              Cambia el filtro o revisa los leads para crear nuevas oportunidades.
            </p>
            <Link
              href="/interno/leads"
              className="mt-5 inline-flex h-10 items-center gap-2 rounded-md bg-primary px-4 text-sm font-semibold text-white hover:bg-primary-strong"
            >
              Ver leads
              <ArrowRight size={16} aria-hidden />
            </Link>
          </div>
        )}
      </section>
    </div>
  );
}
