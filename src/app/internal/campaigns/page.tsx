import Link from "next/link";
import {
  ArrowRight,
  CalendarClock,
  Euro,
  FilePlus2,
  Goal,
  Megaphone,
  Target,
  UsersRound,
} from "lucide-react";
import { createCampaign } from "@/app/internal/actions";
import { formatEuros } from "@/lib/format";
import {
  campaignStatusLabels,
  ensureMarketingCrmReady,
} from "@/lib/marketing-crm";
import { getDb } from "@/lib/db";

export const dynamic = "force-dynamic";

const noticeMessages: Record<string, string> = {
  campaign_created: "Campaign created successfully.",
};

const statusStyles: Record<string, string> = {
  active: "bg-secondary-soft text-primary-strong",
  draft: "bg-muted text-ink-soft",
  paused: "bg-[#fff4d8] text-[#8a5a12]",
  archived: "bg-[#eef3ff] text-[#24477f]",
};

function maybeEuros(value: number | null) {
  return value === null ? "No data" : formatEuros(value);
}

async function getCampaignsData() {
  await ensureMarketingCrmReady();
  const db = getDb();
  const campaigns = await db.campaign.findMany({
    orderBy: [{ status: "asc" }, { createdAt: "desc" }],
    include: {
      leads: {
        select: {
          id: true,
          status: true,
          priority: true,
          score: true,
        },
      },
      deals: {
        select: {
          id: true,
          status: true,
          valueCents: true,
        },
      },
      tasks: {
        where: { status: "open" },
        orderBy: [{ dueAt: "asc" }, { createdAt: "asc" }],
        select: {
          id: true,
          title: true,
          dueAt: true,
          priority: true,
        },
        take: 3,
      },
    },
  });

  const summary = campaigns.reduce(
    (total, campaign) => {
      total.campaigns += 1;
      total.active += campaign.status === "active" ? 1 : 0;
      total.leads += campaign.leads.length;
      total.openLeads += campaign.leads.filter((lead) => !["ganado", "perdido"].includes(lead.status)).length;
      total.pipeline += campaign.deals
        .filter((deal) => deal.status === "open")
        .reduce((sum, deal) => sum + (deal.valueCents ?? 0), 0);
      return total;
    },
    { active: 0, campaigns: 0, leads: 0, openLeads: 0, pipeline: 0 },
  );

  return { campaigns, summary };
}

export default async function CampaignsPage({
  searchParams,
}: {
  searchParams: Promise<{ notice?: string }>;
}) {
  const query = await searchParams;
  const noticeText = query.notice ? noticeMessages[query.notice] ?? null : null;
  const { campaigns, summary } = await getCampaignsData();

  return (
    <div className="grid gap-4">
      <header className="grid gap-3 lg:grid-cols-[1fr_auto] lg:items-end">
        <div>
          <p className="text-sm font-semibold text-primary">Phase 1 - Campaign CRM</p>
          <h1 className="mt-1 text-2xl font-semibold tracking-normal md:text-3xl">
            Commercial Campaigns
          </h1>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-ink-soft">
            Each campaign groups its landing page, leads, pipeline, tasks and metrics. This is the
            central layer before we build AI-generated pages.
          </p>
        </div>
        <Link
          href="/internal/leads"
          className="inline-flex h-10 items-center justify-center gap-2 rounded-md bg-primary px-4 text-sm font-semibold text-white hover:bg-primary-strong"
        >
          View leads
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
            <Megaphone size={16} aria-hidden />
            Active campaigns
          </p>
          <p className="mt-2 text-3xl font-semibold">{summary.active}</p>
          <p className="mt-1 text-xs font-semibold text-primary">{summary.campaigns} total campaigns</p>
        </article>
        <article className="rounded-lg border border-border bg-surface p-4">
          <p className="inline-flex items-center gap-2 text-sm font-semibold text-ink-soft">
            <UsersRound size={16} aria-hidden />
            Open leads
          </p>
          <p className="mt-2 text-3xl font-semibold">{summary.openLeads}</p>
          <p className="mt-1 text-xs font-semibold text-primary">{summary.leads} total leads</p>
        </article>
        <article className="rounded-lg border border-border bg-surface p-4">
          <p className="inline-flex items-center gap-2 text-sm font-semibold text-ink-soft">
            <Euro size={16} aria-hidden />
            Open pipeline
          </p>
          <p className="mt-2 text-3xl font-semibold">{formatEuros(summary.pipeline)}</p>
          <p className="mt-1 text-xs font-semibold text-primary">estimated potential value</p>
        </article>
        <article className="rounded-lg border border-border bg-surface p-4">
          <p className="inline-flex items-center gap-2 text-sm font-semibold text-ink-soft">
            <Target size={16} aria-hidden />
            Next focus
          </p>
          <p className="mt-2 text-xl font-semibold">Leads and tasks</p>
          <p className="mt-2 text-xs font-semibold text-primary">prioritize calls before automating</p>
        </article>
      </section>

      <section className="grid gap-4 xl:grid-cols-[1fr_420px]">
        <div className="grid gap-3">
          {campaigns.map((campaign) => {
            const openLeads = campaign.leads.filter((lead) => !["ganado", "perdido"].includes(lead.status));
            const highPriority = campaign.leads.filter((lead) => lead.priority === "alta").length;
            const avgScore =
              campaign.leads.length === 0
                ? 0
                : Math.round(campaign.leads.reduce((sum, lead) => sum + lead.score, 0) / campaign.leads.length);
            const pipeline = campaign.deals
              .filter((deal) => deal.status === "open")
              .reduce((sum, deal) => sum + (deal.valueCents ?? 0), 0);
            const wonDeals = campaign.deals.filter((deal) => deal.status === "won").length;

            return (
              <article
                id={`campaign-${campaign.id}`}
                key={campaign.id}
                className="rounded-lg border border-border bg-surface p-4"
              >
                <div className="grid gap-4 lg:grid-cols-[1fr_auto]">
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <h2 className="text-lg font-semibold">{campaign.name}</h2>
                      <span className={`rounded-md px-2 py-1 text-xs font-semibold ${statusStyles[campaign.status] ?? "bg-muted text-ink-soft"}`}>
                        {campaignStatusLabels[campaign.status] ?? campaign.status}
                      </span>
                      <span className="rounded-md bg-muted px-2 py-1 text-xs font-semibold text-ink-soft">
                        {campaign.vertical}
                      </span>
                    </div>
                    <p className="mt-2 text-sm leading-6 text-ink-soft">
                      {campaign.offer || "No offer defined yet."}
                    </p>
                    {campaign.goal ? (
                      <p className="mt-2 inline-flex items-start gap-2 text-sm leading-6">
                        <Goal className="mt-0.5 text-primary" size={16} aria-hidden />
                        {campaign.goal}
                      </p>
                    ) : null}
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-sm sm:grid-cols-4 lg:w-[460px]">
                    <div className="rounded-md bg-background p-3">
                      <p className="text-xs font-semibold text-ink-soft">Leads</p>
                      <p className="mt-1 text-lg font-semibold">{openLeads.length}</p>
                    </div>
                    <div className="rounded-md bg-background p-3">
                      <p className="text-xs font-semibold text-ink-soft">Avg. score</p>
                      <p className="mt-1 text-lg font-semibold">{avgScore}</p>
                    </div>
                    <div className="rounded-md bg-background p-3">
                      <p className="text-xs font-semibold text-ink-soft">High priority</p>
                      <p className="mt-1 text-lg font-semibold">{highPriority}</p>
                    </div>
                    <div className="rounded-md bg-background p-3">
                      <p className="text-xs font-semibold text-ink-soft">Won</p>
                      <p className="mt-1 text-lg font-semibold">{wonDeals}</p>
                    </div>
                  </div>
                </div>

                <div className="mt-4 grid gap-3 border-t border-border pt-4 lg:grid-cols-[1fr_auto] lg:items-center">
                  <div className="flex flex-wrap gap-2 text-xs font-semibold text-ink-soft">
                    <span className="rounded-md bg-background px-2 py-1">Slug: {campaign.slug}</span>
                    <span className="rounded-md bg-background px-2 py-1">Pipeline: {formatEuros(pipeline)}</span>
                    <span className="rounded-md bg-background px-2 py-1">Budget: {maybeEuros(campaign.budgetCents)}</span>
                    {campaign.landingPath ? (
                      <span className="rounded-md bg-background px-2 py-1">Landing: {campaign.landingPath}</span>
                    ) : null}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Link
                      href={`/internal/leads?campaign=${campaign.id}`}
                      className="inline-flex h-9 items-center justify-center rounded-md border border-border px-3 text-sm font-semibold hover:bg-muted"
                    >
                      Leads
                    </Link>
                    <Link
                      href={`/internal/deals?campaign=${campaign.id}`}
                      className="inline-flex h-9 items-center justify-center rounded-md border border-border px-3 text-sm font-semibold hover:bg-muted"
                    >
                      Opportunities
                    </Link>
                  </div>
                </div>

                {campaign.tasks.length > 0 ? (
                  <div className="mt-4 grid gap-2 rounded-md bg-background p-3 text-sm">
                    <p className="inline-flex items-center gap-2 font-semibold">
                      <CalendarClock size={16} aria-hidden />
                      Upcoming tasks
                    </p>
                    {campaign.tasks.map((task) => (
                      <div key={task.id} className="flex flex-wrap items-center justify-between gap-2 text-ink-soft">
                        <span>{task.title}</span>
                        <span className="text-xs font-semibold">{task.priority}</span>
                      </div>
                    ))}
                  </div>
                ) : null}
              </article>
            );
          })}
        </div>

        <aside className="rounded-lg border border-border bg-surface p-4 xl:sticky xl:top-4 xl:self-start">
          <div className="flex items-center gap-2">
            <span className="grid size-10 place-items-center rounded-md bg-muted text-primary">
              <FilePlus2 size={18} aria-hidden />
            </span>
            <div>
              <h2 className="font-semibold">New campaign</h2>
              <p className="text-sm text-ink-soft">Create the commercial container before the landing page.</p>
            </div>
          </div>

          <form action={createCampaign} className="mt-4 grid gap-3 text-sm">
            <label className="grid gap-1 font-semibold">
              Name
              <input className="h-10 rounded-md border border-border bg-white px-3 outline-none focus:border-primary" name="name" placeholder="Dental Revenue Leak Audit" required />
            </label>
            <label className="grid gap-1 font-semibold">
              Vertical
              <input className="h-10 rounded-md border border-border bg-white px-3 outline-none focus:border-primary" name="vertical" placeholder="Dental clinics" required />
            </label>
            <label className="grid gap-1 font-semibold">
              Offer
              <input className="h-10 rounded-md border border-border bg-white px-3 outline-none focus:border-primary" name="offer" placeholder="Free audit, demo, pilot..." />
            </label>
            <label className="grid gap-1 font-semibold">
              Landing path
              <input className="h-10 rounded-md border border-border bg-white px-3 outline-none focus:border-primary" name="landingPath" placeholder="/dental-leak-audit" />
            </label>
            <div className="grid gap-3 sm:grid-cols-2">
              <label className="grid gap-1 font-semibold">
                Status
                <select className="h-10 rounded-md border border-border bg-white px-3 outline-none focus:border-primary" name="status" defaultValue="draft">
                  <option value="draft">Draft</option>
                  <option value="active">Active</option>
                  <option value="paused">Paused</option>
                </select>
              </label>
              <label className="grid gap-1 font-semibold">
                Budget
                <input className="h-10 rounded-md border border-border bg-white px-3 outline-none focus:border-primary" min="0" name="budgetEuros" placeholder="500" type="number" />
              </label>
            </div>
            <label className="grid gap-1 font-semibold">
              Goal
              <textarea className="min-h-24 rounded-md border border-border bg-white px-3 py-2 outline-none focus:border-primary" name="goal" placeholder="What do we want to validate, sell or learn with this campaign?" />
            </label>
            <button className="inline-flex h-10 items-center justify-center gap-2 rounded-md bg-primary px-4 font-semibold text-white hover:bg-primary-strong" type="submit">
              Create campaign
              <ArrowRight size={16} aria-hidden />
            </button>
          </form>
        </aside>
      </section>
    </div>
  );
}
