import type { Metadata } from "next";
import Image from "next/image";
import {
  ArrowRight,
  CalendarCheck2,
  CheckCircle2,
  ClipboardCheck,
  FileClock,
  Headset,
  LineChart,
  MessageSquareText,
  ShieldCheck,
  Sparkles,
  Star,
  UsersRound,
} from "lucide-react";
import { LeakCalculator } from "./leak-calculator";

export const metadata: Metadata = {
  title: "Free Dental Revenue Leak Audit | WIADental",
  description:
    "Find the missed appointments, untracked quotes and inactive patients your dental clinic may already be losing.",
};

const leaks = [
  {
    icon: CalendarCheck2,
    label: "Schedule",
    text: "Unconfirmed appointments, last-minute changes and empty slots that are not recovered in time.",
    tone: "bg-[#fff6df] text-[#8a5a12]",
  },
  {
    icon: FileClock,
    label: "Quotes",
    text: "Treatment plans sent without follow-up, no objection recorded and no next action assigned.",
    tone: "bg-[#eef3ff] text-[#24477f]",
  },
  {
    icon: UsersRound,
    label: "Patients",
    text: "Dormant patients with pending recalls, hygiene visits or treatments that nobody reactivates.",
    tone: "bg-[#fdecec] text-danger",
  },
];

const systemBlocks = [
  {
    icon: Headset,
    title: "Assisted front desk",
    text: "We prioritize requests, pending calls, repeated questions and messages the team can review before sending.",
  },
  {
    icon: MessageSquareText,
    title: "Prepared follow-up",
    text: "We prepare messages by case: appointment confirmation, quote follow-up, financing, recall or review request.",
  },
  {
    icon: LineChart,
    title: "Recovery dashboard",
    text: "We measure recovered appointments, reactivated quotes, contacted patients and open commercial opportunities.",
  },
  {
    icon: ShieldCheck,
    title: "Human control",
    text: "AI proposes and prepares. The clinic reviews, approves and decides before contacting or automating.",
  },
];

const auditSteps = [
  "We review appointment flow, open quotes and inactive patient recovery.",
  "We identify where the clinic is leaking the most recoverable revenue each month.",
  "You receive a 30-day automation plan without replacing your CRM on day one.",
];

const mainLeakOptions = [
  ["agenda", "Missed or unconfirmed appointments"],
  ["presupuestos", "Quotes without follow-up"],
  ["pacientes_inactivos", "Patients who do not return"],
  ["recepcion", "Overloaded front desk"],
  ["resenas", "Reviews and reputation"],
  ["no_lo_se", "Not sure yet"],
];

const inputClass =
  "h-11 rounded-md border border-border bg-white px-3 text-sm outline-none focus:border-primary";
const textareaClass =
  "min-h-28 rounded-md border border-border bg-white px-3 py-3 text-sm outline-none focus:border-primary";

function FieldLabel({
  children,
  label,
}: {
  children: React.ReactNode;
  label: string;
}) {
  return (
    <label className="grid gap-2 text-sm font-semibold">
      {label}
      {children}
    </label>
  );
}

export default async function DentalLeakAuditLanding({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; request?: string }>;
}) {
  const query = await searchParams;
  const success = query.request === "received";
  const error = query.error;

  return (
    <main className="min-h-screen overflow-x-hidden bg-background text-foreground">
      <section className="relative isolate overflow-hidden bg-foreground text-white">
        <Image
          alt="Modern dental treatment room ready for a first visit"
          className="object-cover"
          fill
          preload
          sizes="100vw"
          src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=1800&q=82"
        />
        <div className="absolute inset-0 bg-[#071d21]/75" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(7,29,33,0.96),rgba(7,29,33,0.78)_46%,rgba(7,29,33,0.34))]" />

        <div className="relative mx-auto flex max-w-6xl flex-col px-5 py-5 md:min-h-[76svh]">
          <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <a className="flex items-center gap-3" href="#top" aria-label="WIADental">
              <span className="grid size-10 place-items-center rounded-lg bg-white text-primary">
                <Sparkles size={20} aria-hidden />
              </span>
              <span>
                <span className="block font-semibold">WIADental</span>
                <span className="block text-xs text-white/72">Dental commercial automation</span>
              </span>
            </a>
            <nav className="hidden items-center gap-6 text-sm font-medium text-white/78 md:flex">
              <a className="hover:text-white" href="#calculator">
                Calculator
              </a>
              <a className="hover:text-white" href="#system">
                System
              </a>
              <a className="hover:text-white" href="#request-audit">
                Audit
              </a>
            </nav>
            <a
              className="inline-flex h-10 items-center justify-center gap-2 rounded-md bg-white px-4 text-sm font-semibold text-primary hover:bg-secondary-soft sm:w-auto"
              href="#request-audit"
            >
              Request audit
              <ArrowRight size={16} aria-hidden />
            </a>
          </header>

          <div id="top" className="flex flex-1 items-center py-14 md:py-18">
            <div className="max-w-3xl">
              <p className="text-sm font-semibold text-[#8be7d4]">Free audit for dental clinics</p>
              <h1 className="mt-4 text-4xl font-semibold leading-tight tracking-normal md:text-6xl">
                Dental Revenue Leak Audit
              </h1>
              <p className="mt-5 max-w-2xl text-lg leading-8 text-white/84">
                We find appointments, quotes and patients your clinic already has, but may be
                losing through weak follow-up, confirmation or reactivation.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-md bg-secondary px-5 font-semibold text-[#062327] hover:bg-[#5ed4bf]"
                  href="#request-audit"
                >
                  Request free audit
                  <ArrowRight size={18} aria-hidden />
                </a>
                <a
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-md border border-white/42 px-5 font-semibold text-white hover:bg-white/10"
                  href="#calculator"
                >
                  Estimate monthly leakage
                </a>
              </div>
              <div className="mt-9 grid gap-4 text-sm text-white/78 sm:grid-cols-3">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 text-[#8be7d4]" size={18} aria-hidden />
                  <span>No CRM replacement on day one</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 text-[#ffd27d]" size={18} aria-hidden />
                  <span>AI supervised by your team</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 text-[#9cc4ff]" size={18} aria-hidden />
                  <span>Focused on recoverable revenue</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-12">
        <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
          <div>
            <p className="text-sm font-semibold text-primary">The problem is not always more acquisition</p>
            <h2 className="mt-2 text-3xl font-semibold leading-tight md:text-4xl">
              Many clinics lose money inside their own patient base.
            </h2>
          </div>
          <p className="text-base leading-7 text-ink-soft">
            Most clinics already have a calendar, dental software, WhatsApp and a front desk. What
            is missing is a system that remembers, prioritizes and measures the opportunities left
            halfway.
          </p>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {leaks.map((item) => {
            const Icon = item.icon;

            return (
              <article key={item.label} className="rounded-lg border border-border bg-surface p-5">
                <span className={`grid size-11 place-items-center rounded-md ${item.tone}`}>
                  <Icon size={20} aria-hidden />
                </span>
                <h3 className="mt-5 text-lg font-semibold">{item.label}</h3>
                <p className="mt-3 text-sm leading-6 text-ink-soft">{item.text}</p>
              </article>
            );
          })}
        </div>
      </section>

      <LeakCalculator />

      <section id="system" className="mx-auto max-w-6xl px-5 py-12">
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <p className="text-sm font-semibold text-primary">What we sell after the audit</p>
            <h2 className="mt-2 text-3xl font-semibold leading-tight md:text-4xl">
              A recovery system, not a disconnected chatbot.
            </h2>
            <p className="mt-4 text-base leading-7 text-ink-soft">
              The 30-day pilot focuses on the points where the front desk loses the most time and
              management loses the most visibility: appointments, quotes, dormant patients and
              reviews.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {systemBlocks.map((item) => {
              const Icon = item.icon;

              return (
                <article key={item.title} className="rounded-lg border border-border bg-surface p-5">
                  <span className="grid size-10 place-items-center rounded-md bg-muted text-primary">
                    <Icon size={18} aria-hidden />
                  </span>
                  <h3 className="mt-4 font-semibold">{item.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-ink-soft">{item.text}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="border-y border-border bg-surface">
        <div className="mx-auto grid max-w-6xl gap-8 px-5 py-12 lg:grid-cols-[1fr_1fr]">
          <div>
            <p className="text-sm font-semibold text-primary">What the audit includes</p>
            <h2 className="mt-2 text-3xl font-semibold leading-tight md:text-4xl">
              A concrete review to know where to start.
            </h2>
          </div>
          <div className="grid gap-4">
            {auditSteps.map((step, index) => (
              <div key={step} className="flex gap-4 rounded-lg border border-border bg-background p-5">
                <span className="grid size-9 shrink-0 place-items-center rounded-md bg-primary font-mono text-sm font-semibold text-white">
                  {index + 1}
                </span>
                <p className="text-base leading-7">{step}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="request-audit" className="mx-auto grid max-w-6xl gap-8 px-5 py-12 lg:grid-cols-[0.78fr_1.22fr]">
        <aside className="lg:sticky lg:top-6 lg:self-start">
          <p className="text-sm font-semibold text-primary">Audit request</p>
          <h2 className="mt-2 text-3xl font-semibold leading-tight md:text-4xl">
            Tell us how your clinic works and we will tell you where to look first.
          </h2>
          <p className="mt-4 text-base leading-7 text-ink-soft">
            You do not need to share patient data. We only need operational context to prepare a
            useful first call.
          </p>
          <div className="mt-7 grid gap-3 text-sm">
            <div className="flex items-start gap-3">
              <ClipboardCheck className="mt-0.5 text-primary" size={18} aria-hidden />
              <span>Manual response reviewed by our team.</span>
            </div>
            <div className="flex items-start gap-3">
              <ShieldCheck className="mt-0.5 text-primary" size={18} aria-hidden />
              <span>No diagnosis, no health data and no hidden automations.</span>
            </div>
            <div className="flex items-start gap-3">
              <Star className="mt-0.5 text-warning" size={18} aria-hidden />
              <span>Goal: validate whether a 30-day pilot makes sense.</span>
            </div>
          </div>
        </aside>

        <form
          action="/api/agency/audits"
          className="grid gap-5 rounded-lg border border-border bg-surface p-5 shadow-[0_18px_55px_rgba(15,35,38,0.08)] md:p-6"
          method="post"
        >
          <input name="source" type="hidden" value="landing" />
          <input name="campaign" type="hidden" value="dental-revenue-leak-audit" />
          <input name="landingPage" type="hidden" value="/dental-leak-audit" />
          <input
            aria-hidden="true"
            autoComplete="off"
            className="hidden"
            name="website"
            tabIndex={-1}
            type="text"
          />

          {success ? (
            <div className="rounded-lg border border-[#bcece6] bg-secondary-soft px-4 py-3 text-sm text-primary-strong">
              <p className="font-semibold">Request received.</p>
              <p className="mt-1 leading-6">
                The audit has entered our internal campaign backoffice. Next, we review the clinic
                and prepare the call.
              </p>
            </div>
          ) : null}

          {error ? (
            <div className="rounded-lg border border-[#f4b8b8] bg-[#fff6f6] px-4 py-3 text-sm font-semibold text-danger">
              {error}
            </div>
          ) : null}

          <div className="grid gap-5 md:grid-cols-2">
            <FieldLabel label="Clinic name">
              <input className={inputClass} name="clinicName" placeholder="Bright Dental..." required />
            </FieldLabel>
            <FieldLabel label="City">
              <input className={inputClass} name="city" placeholder="Madrid, Valencia, Seville..." />
            </FieldLabel>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            <FieldLabel label="Contact person">
              <input autoComplete="name" className={inputClass} name="contactName" placeholder="First and last name" required />
            </FieldLabel>
            <FieldLabel label="Role">
              <input className={inputClass} name="role" placeholder="Owner, manager, front desk..." />
            </FieldLabel>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            <FieldLabel label="Phone">
              <input autoComplete="tel" className={inputClass} name="phone" placeholder="+34 600 000 000" required />
            </FieldLabel>
            <FieldLabel label="Email">
              <input autoComplete="email" className={inputClass} name="email" placeholder="name@clinic.com" required type="email" />
            </FieldLabel>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            <FieldLabel label="Chairs">
              <input className={inputClass} min="1" name="chairs" placeholder="3" type="number" />
            </FieldLabel>
            <FieldLabel label="Current software">
              <input className={inputClass} name="currentSoftware" placeholder="Dentidesk, Gesden, Excel..." />
            </FieldLabel>
            <FieldLabel label="Main leak">
              <select className={inputClass} defaultValue="no_lo_se" name="mainLeak">
                {mainLeakOptions.map(([value, label]) => (
                  <option key={value} value={value}>
                    {label}
                  </option>
                ))}
              </select>
            </FieldLabel>
          </div>

          <div className="border-y border-border py-4">
            <h3 className="font-semibold">Approximate numbers to guide the audit</h3>
            <div className="mt-4 grid gap-4 md:grid-cols-5">
              <FieldLabel label="First visits/month">
                <input className={inputClass} min="0" name="monthlyFirstVisits" placeholder="40" type="number" />
              </FieldLabel>
              <FieldLabel label="Missed appointments/month">
                <input className={inputClass} min="0" name="missedAppointments" placeholder="8" type="number" />
              </FieldLabel>
              <FieldLabel label="Open quotes">
                <input className={inputClass} min="0" name="openQuotes" placeholder="12" type="number" />
              </FieldLabel>
              <FieldLabel label="Average ticket (EUR)">
                <input className={inputClass} min="0" name="averageTreatmentValue" placeholder="750" type="number" />
              </FieldLabel>
              <FieldLabel label="Inactive patients">
                <input className={inputClass} min="0" name="inactivePatients" placeholder="180" type="number" />
              </FieldLabel>
            </div>
          </div>

          <FieldLabel label="What would you like to improve first?">
            <textarea
              className={textareaClass}
              name="message"
              placeholder="Example: many implant quotes have no follow-up, WhatsApp overloads the front desk, or we want to recover overdue recall visits."
            />
          </FieldLabel>

          <div className="grid gap-3 border-t border-border pt-4 text-sm">
            <label className="flex gap-3">
              <input className="mt-1 size-4 accent-primary" name="privacyConsent" required type="checkbox" />
              <span>I accept the processing of my data to manage this audit request.</span>
            </label>
            <label className="flex gap-3">
              <input className="mt-1 size-4 accent-primary" name="marketingConsent" type="checkbox" />
              <span>I agree to receive commercial communications related to dental automation.</span>
            </label>
          </div>

          <button
            className="inline-flex h-12 items-center justify-center gap-2 rounded-md bg-primary px-5 font-semibold text-white hover:bg-primary-strong"
            type="submit"
          >
            Request free audit
            <ArrowRight size={18} aria-hidden />
          </button>
        </form>
      </section>
    </main>
  );
}
