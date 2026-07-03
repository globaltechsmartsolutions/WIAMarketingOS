import type { Prisma } from "@/generated/prisma/client";
import Link from "next/link";
import {
  ArrowRight,
  CalendarClock,
  CheckCircle2,
  ClipboardList,
  Mail,
  Phone,
  Search,
  Star,
  Target,
  Timer,
  UsersRound,
} from "lucide-react";
import {
  addLeadActivity,
  completeTask,
  createLeadTask,
  updateLeadPriority,
  updateLeadStatus,
} from "@/app/internal/actions";
import { formatDateOnly, formatDateTime, formatEuros } from "@/lib/format";
import {
  ensureMarketingCrmReady,
  leadStatusLabels,
  priorityLabels,
} from "@/lib/marketing-crm";
import { getDb } from "@/lib/db";

export const dynamic = "force-dynamic";

const statusTabs = [
  { label: "All", value: "todos" },
  { label: "New", value: "nuevo" },
  { label: "Qualified", value: "cualificado" },
  { label: "Demo", value: "demo" },
  { label: "Pilot", value: "piloto" },
  { label: "Won", value: "ganado" },
  { label: "Lost", value: "perdido" },
];

const noticeMessages: Record<string, string> = {
  activity_added: "Activity recorded.",
  activity_missing: "Add a note or title before saving the activity.",
  lead_priority_updated: "Priority updated.",
  lead_status_updated: "Lead status updated.",
  task_completed: "Task completed.",
  task_created: "Task created.",
  task_missing: "Add a task before saving it.",
};

const statusStyles: Record<string, string> = {
  nuevo: "bg-secondary-soft text-primary-strong",
  cualificado: "bg-[#e8f1ff] text-[#24528f]",
  demo: "bg-[#fff4d8] text-[#8a5a12]",
  piloto: "bg-[#eef3ff] text-[#24477f]",
  ganado: "bg-[#eaf7ef] text-[#236b49]",
  perdido: "bg-[#fdecec] text-danger",
};

const priorityStyles: Record<string, string> = {
  alta: "bg-[#fdecec] text-danger",
  media: "bg-[#fff4d8] text-[#8a5a12]",
  normal: "bg-muted text-ink-soft",
};

function cleanStatus(value: string | undefined) {
  return statusTabs.some((tab) => tab.value === value) ? value ?? "todos" : "todos";
}

function buildReturnTo(status: string, q: string, campaign: string) {
  const params = new URLSearchParams();

  if (status !== "todos") {
    params.set("status", status);
  }

  if (q) {
    params.set("q", q);
  }

  if (campaign) {
    params.set("campaign", campaign);
  }

  const query = params.toString();
  return `/internal/leads${query ? `?${query}` : ""}`;
}

function statusHref(status: string, q: string, campaign: string) {
  const params = new URLSearchParams();

  if (status !== "todos") {
    params.set("status", status);
  }

  if (q) {
    params.set("q", q);
  }

  if (campaign) {
    params.set("campaign", campaign);
  }

  const query = params.toString();
  return `/internal/leads${query ? `?${query}` : ""}`;
}

function buildWhere(status: string, q: string, campaignId: string): Prisma.LeadWhereInput {
  const where: Prisma.LeadWhereInput = {};

  if (status !== "todos") {
    where.status = status;
  }

  if (campaignId) {
    where.campaignId = campaignId;
  }

  if (q) {
    where.OR = [
      { title: { contains: q, mode: "insensitive" } },
      { problem: { contains: q, mode: "insensitive" } },
      { company: { name: { contains: q, mode: "insensitive" } } },
      { company: { city: { contains: q, mode: "insensitive" } } },
      { contact: { name: { contains: q, mode: "insensitive" } } },
      { contact: { email: { contains: q, mode: "insensitive" } } },
      { contact: { phone: { contains: q, mode: "insensitive" } } },
    ];
  }

  return where;
}

async function getLeadsData(status: string, q: string, campaignId: string) {
  await ensureMarketingCrmReady();
  const db = getDb();
  const where = buildWhere(status, q, campaignId);
  const campaignWhere: Prisma.LeadWhereInput = campaignId ? { campaignId } : {};

  const [leads, campaigns, counts, openLeads, hotLeads, dueTasks] = await Promise.all([
    db.lead.findMany({
      where,
      orderBy: [{ score: "desc" }, { createdAt: "desc" }],
      include: {
        campaign: { select: { id: true, name: true, slug: true } },
        company: { select: { id: true, name: true, city: true, sector: true } },
        contact: { select: { id: true, name: true, role: true, email: true, phone: true } },
        deals: {
          orderBy: { createdAt: "desc" },
          select: { id: true, stage: true, status: true, valueCents: true, probability: true },
          take: 1,
        },
        activities: {
          orderBy: { createdAt: "desc" },
          select: { id: true, title: true, notes: true, createdAt: true, createdBy: true, type: true },
          take: 3,
        },
        tasks: {
          where: { status: "open" },
          orderBy: [{ dueAt: "asc" }, { createdAt: "asc" }],
          select: { id: true, title: true, priority: true, dueAt: true },
          take: 3,
        },
      },
    }),
    db.campaign.findMany({
      orderBy: { createdAt: "desc" },
      select: { id: true, name: true },
    }),
    db.lead.groupBy({
      by: ["status"],
      where: campaignWhere,
      _count: { status: true },
    }),
    db.lead.count({
      where: {
        ...campaignWhere,
        status: { notIn: ["ganado", "perdido"] },
      },
    }),
    db.lead.count({
      where: {
        ...campaignWhere,
        priority: "alta",
        status: { notIn: ["ganado", "perdido"] },
      },
    }),
    db.task.count({
      where: {
        status: "open",
        dueAt: { lte: new Date(Date.now() + 48 * 60 * 60 * 1000) },
        ...(campaignId ? { campaignId } : {}),
      },
    }),
  ]);

  const countsByStatus = Object.fromEntries(counts.map((item) => [item.status, item._count.status]));

  return {
    campaigns,
    counts: countsByStatus,
    dueTasks,
    hotLeads,
    leads,
    openLeads,
  };
}

export default async function LeadsPage({
  searchParams,
}: {
  searchParams: Promise<{ campaign?: string; notice?: string; q?: string; status?: string }>;
}) {
  const query = await searchParams;
  const selectedStatus = cleanStatus(query.status);
  const q = (query.q ?? "").trim();
  const campaignId = (query.campaign ?? "").trim();
  const returnTo = buildReturnTo(selectedStatus, q, campaignId);
  const noticeText = query.notice ? noticeMessages[query.notice] ?? null : null;
  const { campaigns, counts, dueTasks, hotLeads, leads, openLeads } = await getLeadsData(
    selectedStatus,
    q,
    campaignId,
  );
  const totalLeads = Object.values(counts).reduce((total, value) => total + value, 0);
  const avgScore =
    leads.length === 0 ? 0 : Math.round(leads.reduce((total, lead) => total + lead.score, 0) / leads.length);

  return (
    <div className="grid gap-4">
      <header className="grid gap-3 lg:grid-cols-[1fr_auto] lg:items-end">
        <div>
          <p className="text-sm font-semibold text-primary">Sales Inbox</p>
          <h1 className="mt-1 text-2xl font-semibold tracking-normal md:text-3xl">
            Marketing Leads
          </h1>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-ink-soft">
            Company and decision-maker leads connected to campaign, company, contact, opportunity,
            activity and next task.
          </p>
        </div>
        <Link
          href="/internal/deals"
          className="inline-flex h-10 items-center justify-center gap-2 rounded-md bg-primary px-4 text-sm font-semibold text-white hover:bg-primary-strong"
        >
          View opportunities
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
            <UsersRound size={16} aria-hidden />
            Open leads
          </p>
          <p className="mt-2 text-3xl font-semibold">{openLeads}</p>
          <p className="mt-1 text-xs font-semibold text-primary">{totalLeads} total leads</p>
        </article>
        <article className="rounded-lg border border-border bg-surface p-4">
          <p className="inline-flex items-center gap-2 text-sm font-semibold text-ink-soft">
            <Star size={16} aria-hidden />
            High priority
          </p>
          <p className="mt-2 text-3xl font-semibold">{hotLeads}</p>
          <p className="mt-1 text-xs font-semibold text-primary">to call first</p>
        </article>
        <article className="rounded-lg border border-border bg-surface p-4">
          <p className="inline-flex items-center gap-2 text-sm font-semibold text-ink-soft">
            <Target size={16} aria-hidden />
            Average score
          </p>
          <p className="mt-2 text-3xl font-semibold">{avgScore}</p>
          <p className="mt-1 text-xs font-semibold text-primary">in the current view</p>
        </article>
        <article className="rounded-lg border border-border bg-surface p-4">
          <p className="inline-flex items-center gap-2 text-sm font-semibold text-ink-soft">
            <Timer size={16} aria-hidden />
            Urgent tasks
          </p>
          <p className="mt-2 text-3xl font-semibold">{dueTasks}</p>
          <p className="mt-1 text-xs font-semibold text-primary">due in 48 hours</p>
        </article>
      </section>

      <section className="grid gap-3 rounded-lg border border-border bg-surface p-4 xl:grid-cols-[1fr_auto] xl:items-end">
        <form action="/internal/leads" className="grid gap-3 md:grid-cols-[1fr_240px_auto]">
          {selectedStatus !== "todos" ? <input name="status" type="hidden" value={selectedStatus} /> : null}
          <label className="flex h-10 min-w-0 items-center gap-2 rounded-md border border-border bg-white px-3 text-sm text-ink-soft">
            <Search size={16} aria-hidden />
            <input
              className="min-w-0 flex-1 bg-transparent outline-none placeholder:text-ink-soft"
              defaultValue={q}
              name="q"
              placeholder="Search clinic, contact, city or problem"
            />
          </label>
          <select
            className="h-10 rounded-md border border-border bg-white px-3 text-sm outline-none focus:border-primary"
            defaultValue={campaignId}
            name="campaign"
          >
            <option value="">All campaigns</option>
            {campaigns.map((campaign) => (
              <option key={campaign.id} value={campaign.id}>
                {campaign.name}
              </option>
            ))}
          </select>
          <button className="inline-flex h-10 items-center justify-center rounded-md border border-border px-4 text-sm font-semibold hover:bg-muted" type="submit">
            Search
          </button>
        </form>
        <Link
          href="/internal/campaigns"
          className="inline-flex h-10 items-center justify-center rounded-md border border-border px-4 text-sm font-semibold hover:bg-muted"
        >
          Manage campaigns
        </Link>
      </section>

      <nav className="flex gap-2 overflow-x-auto">
        {statusTabs.map((tab) => {
          const isActive = selectedStatus === tab.value;
          const count =
            tab.value === "todos"
              ? Object.values(counts).reduce((total, value) => total + value, 0)
              : counts[tab.value] ?? 0;

          return (
            <Link
              key={tab.value}
              href={statusHref(tab.value, q, campaignId)}
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
        {leads.length > 0 ? (
          leads.map((lead) => {
            const deal = lead.deals[0];
            const contactLine = [
              lead.contact?.name,
              lead.contact?.role,
              lead.company?.name,
              lead.company?.city,
            ]
              .filter(Boolean)
              .join(" - ");

            return (
              <article id={`lead-${lead.id}`} key={lead.id} className="rounded-lg border border-border bg-surface p-4">
                <div className="grid gap-4 xl:grid-cols-[1fr_300px_280px]">
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <h2 className="text-lg font-semibold">{lead.title}</h2>
                      <span className={`rounded-md px-2 py-1 text-xs font-semibold ${statusStyles[lead.status] ?? "bg-muted text-ink-soft"}`}>
                        {leadStatusLabels[lead.status] ?? lead.status}
                      </span>
                      <span className={`rounded-md px-2 py-1 text-xs font-semibold ${priorityStyles[lead.priority] ?? priorityStyles.normal}`}>
                        Priority {priorityLabels[lead.priority] ?? lead.priority}
                      </span>
                      <span className="rounded-md bg-muted px-2 py-1 text-xs font-semibold text-ink-soft">
                        Score {lead.score}
                      </span>
                    </div>
                    <p className="mt-2 text-sm text-ink-soft">{contactLine || "No associated company"}</p>
                    <p className="mt-3 max-w-3xl text-sm leading-6">
                      {lead.problem || "No diagnosis recorded yet."}
                    </p>
                    {lead.nextStep ? (
                      <p className="mt-3 inline-flex items-start gap-2 rounded-md bg-background px-3 py-2 text-sm font-medium">
                        <ClipboardList className="mt-0.5 text-primary" size={16} aria-hidden />
                        {lead.nextStep}
                      </p>
                    ) : null}
                    <div className="mt-4 flex flex-wrap gap-2">
                      {lead.contact?.phone ? (
                        <a className="inline-flex h-9 items-center gap-2 rounded-md border border-border px-3 text-sm font-semibold hover:bg-muted" href={`tel:${lead.contact.phone}`}>
                          <Phone size={15} aria-hidden />
                          Call
                        </a>
                      ) : null}
                      {lead.contact?.email ? (
                        <a className="inline-flex h-9 items-center gap-2 rounded-md border border-border px-3 text-sm font-semibold hover:bg-muted" href={`mailto:${lead.contact.email}`}>
                          <Mail size={15} aria-hidden />
                          Email
                        </a>
                      ) : null}
                      {lead.campaign ? (
                        <Link className="inline-flex h-9 items-center rounded-md border border-border px-3 text-sm font-semibold hover:bg-muted" href={`/internal/campaigns#campaign-${lead.campaign.id}`}>
                          {lead.campaign.name}
                        </Link>
                      ) : null}
                    </div>
                  </div>

                  <div className="grid content-start gap-3 rounded-md bg-background p-3 text-sm">
                    <div className="flex items-center justify-between gap-3">
                      <span className="font-semibold text-ink-soft">Opportunity</span>
                      <span className="font-semibold">{deal ? formatEuros(deal.valueCents ?? 0) : "No deal"}</span>
                    </div>
                    <div className="flex items-center justify-between gap-3">
                      <span className="font-semibold text-ink-soft">Probability</span>
                      <span>{deal ? `${deal.probability}%` : "No data"}</span>
                    </div>
                    <div className="flex items-center justify-between gap-3">
                      <span className="font-semibold text-ink-soft">Created</span>
                      <span>{formatDateOnly(lead.createdAt)}</span>
                    </div>
                    <form action={updateLeadStatus} className="grid gap-2 border-t border-border pt-3">
                      <input name="leadId" type="hidden" value={lead.id} />
                      <input name="returnTo" type="hidden" value={returnTo} />
                      <select className="h-9 rounded-md border border-border bg-white px-3" defaultValue={lead.status} name="status">
                        <option value="nuevo">New</option>
                        <option value="cualificado">Qualified</option>
                        <option value="demo">Demo</option>
                        <option value="piloto">Pilot</option>
                        <option value="ganado">Won</option>
                        <option value="perdido">Lost</option>
                      </select>
                      <button className="inline-flex h-9 items-center justify-center gap-2 rounded-md border border-border px-3 font-semibold hover:bg-muted" type="submit">
                        <CheckCircle2 size={15} aria-hidden />
                        Change status
                      </button>
                    </form>
                    <form action={updateLeadPriority} className="grid gap-2">
                      <input name="leadId" type="hidden" value={lead.id} />
                      <input name="returnTo" type="hidden" value={returnTo} />
                      <select className="h-9 rounded-md border border-border bg-white px-3" defaultValue={lead.priority} name="priority">
                        <option value="alta">High priority</option>
                        <option value="media">Medium priority</option>
                        <option value="normal">Normal priority</option>
                      </select>
                      <button className="inline-flex h-9 items-center justify-center rounded-md border border-border px-3 font-semibold hover:bg-muted" type="submit">
                        Change priority
                      </button>
                    </form>
                  </div>

                  <div className="grid content-start gap-3 text-sm">
                    <div className="rounded-md border border-border p-3">
                      <p className="inline-flex items-center gap-2 font-semibold">
                        <CalendarClock size={16} aria-hidden />
                        Open tasks
                      </p>
                      <div className="mt-2 grid gap-2">
                        {lead.tasks.length > 0 ? (
                          lead.tasks.map((task) => (
                            <div key={task.id} className="rounded-md bg-background p-2">
                              <div className="flex items-start justify-between gap-2">
                                <p className="leading-5">{task.title}</p>
                                <form action={completeTask}>
                                  <input name="taskId" type="hidden" value={task.id} />
                                  <input name="returnTo" type="hidden" value={returnTo} />
                                  <button className="grid size-8 place-items-center rounded-md border border-border hover:bg-muted" title="Complete task" type="submit">
                                    <CheckCircle2 size={15} aria-hidden />
                                  </button>
                                </form>
                              </div>
                              <p className="mt-1 text-xs font-semibold text-ink-soft">
                                {task.dueAt ? `Due ${formatDateOnly(task.dueAt)}` : "No date"} - {priorityLabels[task.priority] ?? task.priority}
                              </p>
                            </div>
                          ))
                        ) : (
                          <p className="text-ink-soft">No open tasks.</p>
                        )}
                      </div>
                      <form action={createLeadTask} className="mt-3 grid gap-2">
                        <input name="leadId" type="hidden" value={lead.id} />
                        <input name="returnTo" type="hidden" value={returnTo} />
                        <input className="h-9 rounded-md border border-border bg-white px-3" name="title" placeholder="New task" />
                        <select className="h-9 rounded-md border border-border bg-white px-3" defaultValue="1" name="dueDays">
                          <option value="0">Today</option>
                          <option value="1">Tomorrow</option>
                          <option value="3">In 3 days</option>
                          <option value="7">In 7 days</option>
                        </select>
                        <button className="inline-flex h-9 items-center justify-center rounded-md bg-primary px-3 font-semibold text-white hover:bg-primary-strong" type="submit">
                          Create task
                        </button>
                      </form>
                    </div>
                  </div>
                </div>

                <div className="mt-4 grid gap-4 border-t border-border pt-4 xl:grid-cols-[1fr_360px]">
                  <div>
                    <p className="inline-flex items-center gap-2 text-sm font-semibold">
                      <Star size={16} aria-hidden />
                      Latest activity
                    </p>
                    <div className="mt-2 grid gap-2 text-sm">
                      {lead.activities.length > 0 ? (
                        lead.activities.map((activity) => (
                          <div key={activity.id} className="border-b border-border pb-2 last:border-b-0">
                            <div className="flex flex-wrap justify-between gap-2">
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
                        <p className="text-ink-soft">No activity recorded yet.</p>
                      )}
                    </div>
                  </div>
                  <form action={addLeadActivity} className="grid gap-2 text-sm">
                    <input name="leadId" type="hidden" value={lead.id} />
                    <input name="returnTo" type="hidden" value={returnTo} />
                    <input className="h-9 rounded-md border border-border bg-white px-3" name="title" placeholder="Example: call completed" />
                    <textarea className="min-h-20 rounded-md border border-border bg-white px-3 py-2" name="notes" placeholder="Outcome, objection, next step..." />
                    <button className="inline-flex h-9 items-center justify-center gap-2 rounded-md border border-border px-3 font-semibold hover:bg-muted" type="submit">
                      Add activity
                      <ArrowRight size={15} aria-hidden />
                    </button>
                  </form>
                </div>
              </article>
            );
          })
        ) : (
          <div className="rounded-lg border border-dashed border-border bg-surface p-8 text-center">
            <h2 className="font-semibold">No leads in this view</h2>
            <p className="mt-2 text-sm text-ink-soft">
              Change the filter or send a request from the dental landing page.
            </p>
            <Link
              href="/es/dental-leak-audit"
              className="mt-5 inline-flex h-10 items-center gap-2 rounded-md bg-primary px-4 text-sm font-semibold text-white hover:bg-primary-strong"
            >
              Open landing page
              <ArrowRight size={16} aria-hidden />
            </Link>
          </div>
        )}
      </section>
    </div>
  );
}



