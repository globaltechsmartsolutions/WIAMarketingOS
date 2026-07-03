"use client";

import { useMemo, useState } from "react";
import { CalendarX2, Calculator, FileClock, UsersRound } from "lucide-react";
import type { DentalLandingCopy } from "@/lib/i18n/dental-leak-audit";

function formatEuros(value: number, locale: string) {
  return new Intl.NumberFormat(locale, {
    currency: "EUR",
    maximumFractionDigits: 0,
    style: "currency",
  }).format(value);
}

function clamp(value: number, max: number) {
  if (!Number.isFinite(value) || value < 0) {
    return 0;
  }

  return Math.min(value, max);
}

export function LeakCalculator({
  copy,
}: {
  copy: DentalLandingCopy["calculator"];
}) {
  const [missedAppointments, setMissedAppointments] = useState(8);
  const [openQuotes, setOpenQuotes] = useState(12);
  const [inactivePatients, setInactivePatients] = useState(180);
  const [averageTreatment, setAverageTreatment] = useState(750);

  const estimate = useMemo(() => {
    const appointmentLeak = missedAppointments * averageTreatment * 0.35;
    const quoteLeak = openQuotes * averageTreatment * 0.18;
    const inactiveLeak = Math.min(inactivePatients, 250) * 45;
    const min = Math.round(appointmentLeak + quoteLeak + inactiveLeak);

    return {
      min,
      max: Math.round(min * 1.75),
    };
  }, [averageTreatment, inactivePatients, missedAppointments, openQuotes]);

  const fields = [
    {
      icon: CalendarX2,
      label: copy.fields.missedAppointments.label,
      max: 80,
      min: 0,
      onChange: setMissedAppointments,
      suffix: copy.fields.missedAppointments.suffix,
      value: missedAppointments,
    },
    {
      icon: FileClock,
      label: copy.fields.openQuotes.label,
      max: 120,
      min: 0,
      onChange: setOpenQuotes,
      suffix: copy.fields.openQuotes.suffix,
      value: openQuotes,
    },
    {
      icon: UsersRound,
      label: copy.fields.inactivePatients.label,
      max: 800,
      min: 0,
      onChange: setInactivePatients,
      suffix: copy.fields.inactivePatients.suffix,
      value: inactivePatients,
    },
    {
      icon: Calculator,
      label: copy.fields.averageTreatment.label,
      max: 5000,
      min: 80,
      onChange: setAverageTreatment,
      suffix: copy.fields.averageTreatment.suffix,
      value: averageTreatment,
    },
  ];

  return (
    <section id="calculator" className="border-y border-border bg-surface">
      <div className="mx-auto grid max-w-6xl gap-8 px-5 py-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
        <div>
          <p className="text-sm font-semibold text-primary">{copy.eyebrow}</p>
          <h2 className="mt-2 text-3xl font-semibold leading-tight md:text-4xl">
            {copy.title}
          </h2>
          <p className="mt-4 max-w-xl text-base leading-7 text-ink-soft">
            {copy.body}
          </p>
          <div className="mt-7 grid gap-4">
            {fields.map((field) => {
              const Icon = field.icon;

              return (
                <label key={field.label} className="grid gap-3 rounded-lg border border-border bg-background p-4">
                  <span className="flex items-start gap-3">
                    <span className="grid size-10 shrink-0 place-items-center rounded-md bg-secondary-soft text-primary">
                      <Icon size={19} aria-hidden />
                    </span>
                    <span className="min-w-0">
                      <span className="block text-sm font-semibold">{field.label}</span>
                      <span className="mt-1 block text-xs text-ink-soft">
                        {copy.currentValueLabel}: {field.value} {field.suffix}
                      </span>
                    </span>
                  </span>
                  <input
                    aria-label={field.label}
                    className="h-2 w-full accent-primary"
                    max={field.max}
                    min={field.min}
                    onChange={(event) => field.onChange(clamp(Number(event.target.value), field.max))}
                    type="range"
                    value={field.value}
                  />
                </label>
              );
            })}
          </div>
        </div>

        <div className="rounded-lg border border-primary bg-[#eef9f7] p-6 shadow-[0_18px_50px_rgba(15,107,122,0.12)]">
          <p className="text-sm font-semibold text-primary">{copy.possibleLeakLabel}</p>
          <p className="mt-3 text-4xl font-semibold leading-tight text-foreground md:text-5xl">
            {formatEuros(estimate.min, copy.locale)} - {formatEuros(estimate.max, copy.locale)}
          </p>
          <p className="mt-4 text-sm leading-6 text-ink-soft">
            {copy.possibleLeakDescription}
          </p>
          <dl className="mt-6 grid gap-3 text-sm">
            <div className="flex items-center justify-between gap-3 rounded-md bg-white px-4 py-3">
              <dt className="font-medium text-ink-soft">{copy.breakdown.appointments}</dt>
              <dd className="font-semibold">
                {formatEuros(Math.round(missedAppointments * averageTreatment * 0.35), copy.locale)}
              </dd>
            </div>
            <div className="flex items-center justify-between gap-3 rounded-md bg-white px-4 py-3">
              <dt className="font-medium text-ink-soft">{copy.breakdown.quotes}</dt>
              <dd className="font-semibold">
                {formatEuros(Math.round(openQuotes * averageTreatment * 0.18), copy.locale)}
              </dd>
            </div>
            <div className="flex items-center justify-between gap-3 rounded-md bg-white px-4 py-3">
              <dt className="font-medium text-ink-soft">{copy.breakdown.dormantPatients}</dt>
              <dd className="font-semibold">
                {formatEuros(Math.round(Math.min(inactivePatients, 250) * 45), copy.locale)}
              </dd>
            </div>
          </dl>
          <a
            className="mt-6 inline-flex h-12 w-full items-center justify-center rounded-md bg-primary px-5 font-semibold text-white hover:bg-primary-strong"
            href="#request-audit"
          >
            {copy.cta}
          </a>
        </div>
      </div>
    </section>
  );
}
