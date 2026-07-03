"use client";

import { useMemo, useState } from "react";
import { CalendarX2, Calculator, FileClock, UsersRound } from "lucide-react";

function formatEuros(value: number) {
  return new Intl.NumberFormat("en-IE", {
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

export function LeakCalculator() {
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
      label: "Missed or unconfirmed appointments per month",
      max: 80,
      min: 0,
      onChange: setMissedAppointments,
      suffix: "appointments",
      value: missedAppointments,
    },
    {
      icon: FileClock,
      label: "Treatment quotes sent without follow-up",
      max: 120,
      min: 0,
      onChange: setOpenQuotes,
      suffix: "quotes",
      value: openQuotes,
    },
    {
      icon: UsersRound,
      label: "Patients overdue for recall or hygiene",
      max: 800,
      min: 0,
      onChange: setInactivePatients,
      suffix: "patients",
      value: inactivePatients,
    },
    {
      icon: Calculator,
      label: "Approximate average treatment value",
      max: 5000,
      min: 80,
      onChange: setAverageTreatment,
      suffix: "EUR",
      value: averageTreatment,
    },
  ];

  return (
    <section id="calculator" className="border-y border-border bg-surface">
      <div className="mx-auto grid max-w-6xl gap-8 px-5 py-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
        <div>
          <p className="text-sm font-semibold text-primary">Directional calculator</p>
          <h2 className="mt-2 text-3xl font-semibold leading-tight md:text-4xl">
            Put a number on revenue leaks before buying another tool.
          </h2>
          <p className="mt-4 max-w-xl text-base leading-7 text-ink-soft">
            This does not promise automatic results. It helps start a data-backed conversation
            about appointments, quotes and patients that already exist inside the clinic.
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
                        Current value: {field.value} {field.suffix}
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
          <p className="text-sm font-semibold text-primary">Possible monthly revenue leak</p>
          <p className="mt-3 text-4xl font-semibold leading-tight text-foreground md:text-5xl">
            {formatEuros(estimate.min)} - {formatEuros(estimate.max)}
          </p>
          <p className="mt-4 text-sm leading-6 text-ink-soft">
            Conservative estimate based on unused appointments, quotes without follow-up and
            inactive patients. The audit reviews the real case before proposing automations.
          </p>
          <dl className="mt-6 grid gap-3 text-sm">
            <div className="flex items-center justify-between gap-3 rounded-md bg-white px-4 py-3">
              <dt className="font-medium text-ink-soft">Appointments</dt>
              <dd className="font-semibold">{formatEuros(Math.round(missedAppointments * averageTreatment * 0.35))}</dd>
            </div>
            <div className="flex items-center justify-between gap-3 rounded-md bg-white px-4 py-3">
              <dt className="font-medium text-ink-soft">Quotes</dt>
              <dd className="font-semibold">{formatEuros(Math.round(openQuotes * averageTreatment * 0.18))}</dd>
            </div>
            <div className="flex items-center justify-between gap-3 rounded-md bg-white px-4 py-3">
              <dt className="font-medium text-ink-soft">Dormant patients</dt>
              <dd className="font-semibold">{formatEuros(Math.round(Math.min(inactivePatients, 250) * 45))}</dd>
            </div>
          </dl>
          <a
            className="mt-6 inline-flex h-12 w-full items-center justify-center rounded-md bg-primary px-5 font-semibold text-white hover:bg-primary-strong"
            href="#request-audit"
          >
            Request a free audit
          </a>
        </div>
      </div>
    </section>
  );
}
