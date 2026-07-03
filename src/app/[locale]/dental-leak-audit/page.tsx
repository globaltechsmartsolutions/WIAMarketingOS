import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
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
import {
  dentalLandingLocaleOptions,
  getDentalLandingCopy,
  supportedDentalLandingLocales,
  type DentalLandingLocale,
} from "@/lib/i18n/dental-leak-audit";

const leakVisuals = {
  schedule: {
    icon: CalendarCheck2,
    tone: "bg-[#fff6df] text-[#8a5a12]",
  },
  quotes: {
    icon: FileClock,
    tone: "bg-[#eef3ff] text-[#24477f]",
  },
  patients: {
    icon: UsersRound,
    tone: "bg-[#fdecec] text-danger",
  },
} as const;

const systemIcons = {
  control: ShieldCheck,
  dashboard: LineChart,
  followUp: MessageSquareText,
  frontDesk: Headset,
} as const;

const inputClass =
  "h-11 rounded-md border border-border bg-white px-3 text-sm outline-none focus:border-primary";
const textareaClass =
  "min-h-28 rounded-md border border-border bg-white px-3 py-3 text-sm outline-none focus:border-primary";

function localizedPath(locale: DentalLandingLocale) {
  return `/${locale}/dental-leak-audit`;
}

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

export function generateStaticParams() {
  return supportedDentalLandingLocales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const copy = getDentalLandingCopy(locale);

  if (!copy) {
    return {};
  }

  return {
    title: copy.metadata.title,
    description: copy.metadata.description,
    alternates: {
      languages: {
        ar: localizedPath("ar"),
        en: localizedPath("en"),
        es: localizedPath("es"),
      },
    },
  };
}

export default async function LocalizedDentalLeakAuditLanding({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ error?: string; request?: string }>;
}) {
  const [{ locale }, query] = await Promise.all([params, searchParams]);
  const copy = getDentalLandingCopy(locale);

  if (!copy) {
    notFound();
  }

  const typedLocale = locale as DentalLandingLocale;
  const success = query.request === "received";
  const error = query.error;
  const isRtl = copy.direction === "rtl";
  const textDirectionClass = isRtl ? "font-arabic text-right" : "";

  return (
    <main
      lang={typedLocale}
      dir={copy.direction}
      className={`min-h-screen overflow-x-hidden bg-background text-foreground ${textDirectionClass}`}
    >
      <section className="relative isolate overflow-hidden bg-foreground text-white">
        <Image
          alt={copy.metadata.title}
          className="object-cover"
          fill
          preload
          sizes="100vw"
          src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=1800&q=82"
        />
        <div className="absolute inset-0 bg-[#071d21]/75" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(7,29,33,0.96),rgba(7,29,33,0.78)_46%,rgba(7,29,33,0.34))]" />

        <div className="relative mx-auto flex max-w-6xl flex-col px-5 py-5 md:min-h-[76svh]">
          <header className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <a className="flex items-center gap-3" href="#top" aria-label="WIADental">
              <span className="grid size-10 place-items-center rounded-lg bg-white text-primary">
                <Sparkles size={20} aria-hidden />
              </span>
              <span>
                <span className="block font-semibold">{copy.brand.label}</span>
                <span className="block text-xs text-white/72">{copy.brand.sublabel}</span>
              </span>
            </a>

            <div className="flex flex-col gap-3 md:flex-row md:items-center">
              <nav className="hidden items-center gap-6 text-sm font-medium text-white/78 md:flex">
                <a className="hover:text-white" href="#automations">
                  {copy.nav.automations}
                </a>
                <a className="hover:text-white" href="#system">
                  {copy.nav.system}
                </a>
                <a className="hover:text-white" href="#request-audit">
                  {copy.nav.audit}
                </a>
              </nav>

              <div className="flex items-center gap-2 rounded-md border border-white/24 bg-white/10 p-1 text-xs font-semibold text-white">
                {dentalLandingLocaleOptions.map((option) => (
                  <Link
                    key={option.locale}
                    aria-current={option.locale === typedLocale ? "page" : undefined}
                    className={`rounded px-2.5 py-1.5 transition ${
                      option.locale === typedLocale ? "bg-white text-primary" : "hover:bg-white/14"
                    }`}
                    href={option.href}
                    lang={option.locale}
                  >
                    {option.label}
                  </Link>
                ))}
              </div>

              <a
                className="inline-flex h-10 items-center justify-center gap-2 rounded-md bg-white px-4 text-sm font-semibold text-primary hover:bg-secondary-soft"
              href="#request-audit"
            >
              {copy.nav.cta}
              <ArrowRight className={isRtl ? "rotate-180" : undefined} size={16} aria-hidden />
            </a>
            </div>
          </header>

          <div id="top" className="flex flex-1 items-center py-14 md:py-18">
            <div className="max-w-3xl">
              <p className="text-sm font-semibold text-[#8be7d4]">{copy.hero.eyebrow}</p>
              <h1 className="mt-4 text-4xl font-semibold leading-tight tracking-normal md:text-6xl">
                {copy.hero.title}
              </h1>
              <p className="mt-5 max-w-2xl text-lg leading-8 text-white/84">{copy.hero.body}</p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-md bg-secondary px-5 font-semibold text-[#062327] hover:bg-[#5ed4bf]"
                  href="#request-audit"
                >
                  {copy.hero.primaryCta}
                  <ArrowRight className={isRtl ? "rotate-180" : undefined} size={18} aria-hidden />
                </a>
                <a
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-md border border-white/42 px-5 font-semibold text-white hover:bg-white/10"
                  href="#automations"
                >
                  {copy.hero.secondaryCta}
                </a>
              </div>
              <div className="mt-9 grid gap-4 text-sm text-white/78 sm:grid-cols-3">
                {copy.hero.trust.map((item, index) => (
                  <div className="flex items-start gap-3" key={item}>
                    <CheckCircle2
                      className={`mt-0.5 ${index === 0 ? "text-[#8be7d4]" : index === 1 ? "text-[#ffd27d]" : "text-[#9cc4ff]"}`}
                      size={18}
                      aria-hidden
                    />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-12">
        <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
          <div>
            <p className="text-sm font-semibold text-primary">{copy.problem.eyebrow}</p>
            <h2 className="mt-2 text-3xl font-semibold leading-tight md:text-4xl">
              {copy.problem.title}
            </h2>
          </div>
          <p className="text-base leading-7 text-ink-soft">{copy.problem.body}</p>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {copy.leaks.map((item) => {
            const visual = leakVisuals[item.key];
            const Icon = visual.icon;

            return (
              <article key={item.label} className="rounded-lg border border-border bg-surface p-5">
                <span className={`grid size-11 place-items-center rounded-md ${visual.tone}`}>
                  <Icon size={20} aria-hidden />
                </span>
                <h3 className="mt-5 text-lg font-semibold">{item.label}</h3>
                <p className="mt-3 text-sm leading-6 text-ink-soft">{item.text}</p>
              </article>
            );
          })}
        </div>
      </section>

      <section id="automations" className="border-y border-border bg-surface">
        <div className="mx-auto grid max-w-6xl gap-8 px-5 py-12 lg:grid-cols-[0.82fr_1.18fr] lg:items-start">
          <div>
            <p className="text-sm font-semibold text-primary">{copy.automations.eyebrow}</p>
            <h2 className="mt-2 text-3xl font-semibold leading-tight md:text-4xl">
              {copy.automations.title}
            </h2>
            <p className="mt-4 text-base leading-7 text-ink-soft">{copy.automations.body}</p>
            <a
              className="mt-7 inline-flex h-11 items-center justify-center gap-2 rounded-md bg-primary px-4 text-sm font-semibold text-white hover:bg-primary-strong"
              href="#request-audit"
            >
              {copy.automations.cta}
              <ArrowRight className={isRtl ? "rotate-180" : undefined} size={16} aria-hidden />
            </a>
          </div>

          <div className="grid gap-4">
            {copy.automations.items.map((item) => {
              const visual = leakVisuals[item.key];
              const Icon = visual.icon;

              return (
                <article key={item.title} className="rounded-lg border border-border bg-background p-5">
                  <div className="flex gap-4">
                    <span className={`grid size-11 shrink-0 place-items-center rounded-md ${visual.tone}`}>
                      <Icon size={20} aria-hidden />
                    </span>
                    <div>
                      <h3 className="font-semibold">{item.title}</h3>
                      <p className="mt-2 text-sm leading-6 text-ink-soft">{item.text}</p>
                    </div>
                  </div>
                </article>
              );
            })}

            <div className="rounded-lg border border-[#bcece6] bg-secondary-soft p-5 text-sm font-semibold leading-6 text-primary-strong">
              {copy.automations.closing}
            </div>
          </div>
        </div>
      </section>

      <section id="system" className="mx-auto max-w-6xl px-5 py-12">
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <p className="text-sm font-semibold text-primary">{copy.system.eyebrow}</p>
            <h2 className="mt-2 text-3xl font-semibold leading-tight md:text-4xl">
              {copy.system.title}
            </h2>
            <p className="mt-4 text-base leading-7 text-ink-soft">{copy.system.body}</p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {copy.system.blocks.map((item) => {
              const Icon = systemIcons[item.key];

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
            <p className="text-sm font-semibold text-primary">{copy.audit.eyebrow}</p>
            <h2 className="mt-2 text-3xl font-semibold leading-tight md:text-4xl">
              {copy.audit.title}
            </h2>
          </div>
          <div className="grid gap-4">
            {copy.audit.steps.map((step, index) => (
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
          <p className="text-sm font-semibold text-primary">{copy.formIntro.eyebrow}</p>
          <h2 className="mt-2 text-3xl font-semibold leading-tight md:text-4xl">
            {copy.formIntro.title}
          </h2>
          <p className="mt-4 text-base leading-7 text-ink-soft">{copy.formIntro.body}</p>
          <div className="mt-7 grid gap-3 text-sm">
            {copy.formIntro.bullets.map((bullet, index) => {
              const Icon = index === 0 ? ClipboardCheck : index === 1 ? ShieldCheck : Star;

              return (
                <div className="flex items-start gap-3" key={bullet}>
                  <Icon className={`mt-0.5 ${index === 2 ? "text-warning" : "text-primary"}`} size={18} aria-hidden />
                  <span>{bullet}</span>
                </div>
              );
            })}
          </div>
        </aside>

        <form
          action="/api/agency/audits"
          className="grid gap-5 rounded-lg border border-border bg-surface p-5 shadow-[0_18px_55px_rgba(15,35,38,0.08)] md:p-6"
          method="post"
        >
          <input name="source" type="hidden" value="landing" />
          <input name="campaign" type="hidden" value="dental-revenue-leak-audit" />
          <input name="landingPage" type="hidden" value={localizedPath(typedLocale)} />
          <input name="locale" type="hidden" value={typedLocale} />
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
              <p className="font-semibold">{copy.form.successTitle}</p>
              <p className="mt-1 leading-6">{copy.form.successBody}</p>
            </div>
          ) : null}

          {error ? (
            <div className="rounded-lg border border-[#f4b8b8] bg-[#fff6f6] px-4 py-3 text-sm font-semibold text-danger">
              {error}
            </div>
          ) : null}

          <div className="grid gap-5 md:grid-cols-2">
            <FieldLabel label={copy.form.clinicName}>
              <input className={inputClass} name="clinicName" placeholder={copy.form.clinicNamePlaceholder} required />
            </FieldLabel>
            <FieldLabel label={copy.form.city}>
              <input className={inputClass} name="city" placeholder={copy.form.cityPlaceholder} />
            </FieldLabel>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            <FieldLabel label={copy.form.contactName}>
              <input autoComplete="name" className={inputClass} name="contactName" placeholder={copy.form.contactNamePlaceholder} required />
            </FieldLabel>
            <FieldLabel label={copy.form.role}>
              <input className={inputClass} name="role" placeholder={copy.form.rolePlaceholder} />
            </FieldLabel>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            <FieldLabel label={copy.form.phone}>
              <input autoComplete="tel" className={inputClass} name="phone" placeholder={copy.form.phonePlaceholder} required />
            </FieldLabel>
            <FieldLabel label={copy.form.email}>
              <input autoComplete="email" className={inputClass} name="email" placeholder={copy.form.emailPlaceholder} required type="email" />
            </FieldLabel>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            <FieldLabel label={copy.form.chairs}>
              <input className={inputClass} min="1" name="chairs" placeholder={copy.form.chairsPlaceholder} type="number" />
            </FieldLabel>
            <FieldLabel label={copy.form.currentSoftware}>
              <input className={inputClass} name="currentSoftware" placeholder={copy.form.currentSoftwarePlaceholder} />
            </FieldLabel>
            <FieldLabel label={copy.form.mainLeak}>
              <select className={inputClass} defaultValue="no_lo_se" name="mainLeak">
                {copy.form.mainLeakOptions.map(([value, label]) => (
                  <option key={value} value={value}>
                    {label}
                  </option>
                ))}
              </select>
            </FieldLabel>
          </div>

          <div className="border-y border-border py-4">
            <h3 className="font-semibold">{copy.form.numbersTitle}</h3>
            <div className="mt-4 grid gap-4 md:grid-cols-5">
              <FieldLabel label={copy.form.monthlyFirstVisits}>
                <input className={inputClass} min="0" name="monthlyFirstVisits" placeholder={copy.form.monthlyFirstVisitsPlaceholder} type="number" />
              </FieldLabel>
              <FieldLabel label={copy.form.missedAppointments}>
                <input className={inputClass} min="0" name="missedAppointments" placeholder={copy.form.missedAppointmentsPlaceholder} type="number" />
              </FieldLabel>
              <FieldLabel label={copy.form.openQuotes}>
                <input className={inputClass} min="0" name="openQuotes" placeholder={copy.form.openQuotesPlaceholder} type="number" />
              </FieldLabel>
              <FieldLabel label={copy.form.averageTreatmentValue}>
                <input className={inputClass} min="0" name="averageTreatmentValue" placeholder={copy.form.averageTreatmentValuePlaceholder} type="number" />
              </FieldLabel>
              <FieldLabel label={copy.form.inactivePatients}>
                <input className={inputClass} min="0" name="inactivePatients" placeholder={copy.form.inactivePatientsPlaceholder} type="number" />
              </FieldLabel>
            </div>
          </div>

          <FieldLabel label={copy.form.message}>
            <textarea className={textareaClass} name="message" placeholder={copy.form.messagePlaceholder} />
          </FieldLabel>

          <div className="grid gap-3 border-t border-border pt-4 text-sm">
            <label className="flex gap-3">
              <input className="mt-1 size-4 accent-primary" name="privacyConsent" required type="checkbox" />
              <span>{copy.form.privacyConsent}</span>
            </label>
            <label className="flex gap-3">
              <input className="mt-1 size-4 accent-primary" name="marketingConsent" type="checkbox" />
              <span>{copy.form.marketingConsent}</span>
            </label>
          </div>

          <button
            className="inline-flex h-12 items-center justify-center gap-2 rounded-md bg-primary px-5 font-semibold text-white hover:bg-primary-strong"
            type="submit"
          >
            {copy.form.submit}
            <ArrowRight className={isRtl ? "rotate-180" : undefined} size={18} aria-hidden />
          </button>
        </form>
      </section>
    </main>
  );
}
