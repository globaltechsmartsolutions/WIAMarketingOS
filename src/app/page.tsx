import Link from "next/link";
import {
  ArrowRight,
  BarChart3,
  ClipboardCheck,
  Globe2,
  ShieldCheck,
  Sparkles,
  type LucideIcon,
} from "lucide-react";

const features: { title: string; text: string; Icon: LucideIcon }[] = [
  {
    title: "Landing Pages",
    text: "Lead-generation pages by niche, offer and campaign.",
    Icon: Globe2,
  },
  {
    title: "Leads",
    text: "Inbound requests with source, score and commercial priority.",
    Icon: ClipboardCheck,
  },
  {
    title: "Pipeline",
    text: "Stages, notes, calls, tasks and loss reasons in one place.",
    Icon: BarChart3,
  },
  {
    title: "Separation",
    text: "Internal campaigns stay separate from the CRM products sold to clients.",
    Icon: ShieldCheck,
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <section className="mx-auto grid min-h-screen max-w-6xl content-center gap-10 px-5 py-12">
        <div className="max-w-3xl">
          <div className="flex items-center gap-3">
            <span className="grid size-12 place-items-center rounded-lg bg-primary text-white">
              <Sparkles size={24} aria-hidden />
            </span>
            <div>
              <p className="text-sm font-semibold text-primary">GlobalTech Smart Solutions</p>
              <h1 className="text-4xl font-semibold tracking-normal md:text-6xl">
                WIAMarketingOS
              </h1>
            </div>
          </div>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-ink-soft">
            Internal operating system for launching campaigns, generating qualified leads and
            managing sales follow-up without mixing it with the CRM products we sell to clients.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              className="inline-flex h-12 items-center justify-center gap-2 rounded-md bg-primary px-5 font-semibold text-white hover:bg-primary-strong"
              href="/es/dental-leak-audit"
            >
              View dental landing page ES
              <ArrowRight size={18} aria-hidden />
            </Link>
            <Link
              className="inline-flex h-12 items-center justify-center gap-2 rounded-md border border-border bg-surface px-5 font-semibold hover:bg-muted"
              href="/internal/campaigns"
            >
              Open internal CRM
            </Link>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-4">
          {features.map(({ Icon, text, title }) => (
            <article key={title} className="rounded-lg border border-border bg-surface p-5">
              <span className="grid size-10 place-items-center rounded-md bg-secondary-soft text-primary">
                <Icon size={18} aria-hidden />
              </span>
              <h2 className="mt-4 font-semibold">{title}</h2>
              <p className="mt-2 text-sm leading-6 text-ink-soft">{text}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
