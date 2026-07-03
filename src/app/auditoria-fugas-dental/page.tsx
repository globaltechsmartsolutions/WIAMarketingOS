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
import { FugasCalculator } from "./fugas-calculator";

export const metadata: Metadata = {
  title: "Auditoría gratuita de fugas para clínicas dentales | WIADental",
  description:
    "Detecta citas, presupuestos y pacientes que tu clínica dental puede estar perdiendo por falta de seguimiento.",
};

const leaks = [
  {
    icon: CalendarCheck2,
    label: "Agenda",
    text: "Citas sin confirmar, cambios de última hora y huecos que no se reutilizan a tiempo.",
    tone: "bg-[#fff6df] text-[#8a5a12]",
  },
  {
    icon: FileClock,
    label: "Presupuestos",
    text: "Propuestas enviadas que se quedan sin seguimiento, sin objeción registrada y sin próxima acción.",
    tone: "bg-[#eef3ff] text-[#24477f]",
  },
  {
    icon: UsersRound,
    label: "Pacientes",
    text: "Pacientes dormidos con revisiones, higienes o tratamientos pendientes que nadie reactiva.",
    tone: "bg-[#fdecec] text-danger",
  },
];

const systemBlocks = [
  {
    icon: Headset,
    title: "Recepción asistida",
    text: "Priorizamos solicitudes, llamadas pendientes, dudas repetidas y mensajes que recepción puede revisar antes de enviar.",
  },
  {
    icon: MessageSquareText,
    title: "Seguimiento preparado",
    text: "Creamos mensajes por caso: confirmación de cita, presupuesto, financiación, revisión pendiente o reseña.",
  },
  {
    icon: LineChart,
    title: "Panel de recuperación",
    text: "Medimos citas recuperadas, presupuestos reactivados, pacientes contactados y oportunidades abiertas.",
  },
  {
    icon: ShieldCheck,
    title: "Control humano",
    text: "La IA propone y prepara. La clínica decide, revisa y aprueba antes de contactar o automatizar.",
  },
];

const auditSteps = [
  "Revisamos agenda, presupuestos y pacientes inactivos.",
  "Detectamos dónde se escapa más dinero cada mes.",
  "Te damos un plan de automatización de 30 días, sin cambiar de CRM desde el primer día.",
];

const mainLeakOptions = [
  ["agenda", "Citas perdidas o no confirmadas"],
  ["presupuestos", "Presupuestos sin seguimiento"],
  ["pacientes_inactivos", "Pacientes que no vuelven"],
  ["recepcion", "Recepción saturada"],
  ["resenas", "Reseñas y reputación"],
  ["no_lo_se", "No lo tengo claro"],
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

export default async function AuditLanding({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; solicitud?: string }>;
}) {
  const query = await searchParams;
  const success = query.solicitud === "recibida";
  const error = query.error;

  return (
    <main className="min-h-screen overflow-x-hidden bg-background text-foreground">
      <section className="relative isolate overflow-hidden bg-foreground text-white">
        <Image
          alt="Gabinete dental moderno preparado para una primera visita"
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
            <a className="flex items-center gap-3" href="#inicio" aria-label="WIADental">
              <span className="grid size-10 place-items-center rounded-lg bg-white text-primary">
                <Sparkles size={20} aria-hidden />
              </span>
              <span>
                <span className="block font-semibold">WIADental</span>
                <span className="block text-xs text-white/72">Automatización comercial dental</span>
              </span>
            </a>
            <nav className="hidden items-center gap-6 text-sm font-medium text-white/78 md:flex">
              <a className="hover:text-white" href="#calculadora">
                Calculadora
              </a>
              <a className="hover:text-white" href="#sistema">
                Sistema
              </a>
              <a className="hover:text-white" href="#solicitar-auditoria">
                Auditoría
              </a>
            </nav>
            <a
              className="inline-flex h-10 items-center justify-center gap-2 rounded-md bg-white px-4 text-sm font-semibold text-primary hover:bg-secondary-soft sm:w-auto"
              href="#solicitar-auditoria"
            >
              Pedir auditoría
              <ArrowRight size={16} aria-hidden />
            </a>
          </header>

          <div id="inicio" className="flex flex-1 items-center py-14 md:py-18">
            <div className="max-w-3xl">
              <p className="text-sm font-semibold text-[#8be7d4]">Auditoría gratuita para clínicas dentales</p>
              <h1 className="mt-4 text-4xl font-semibold leading-tight tracking-normal md:text-6xl">
                Clínica Dental Sin Fugas
              </h1>
              <p className="mt-5 max-w-2xl text-lg leading-8 text-white/84">
                Detectamos citas, presupuestos y pacientes que tu clínica ya tiene, pero que
                pueden estar perdiéndose por falta de seguimiento, confirmación o reactivación.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-md bg-secondary px-5 font-semibold text-[#062327] hover:bg-[#5ed4bf]"
                  href="#solicitar-auditoria"
                >
                  Solicitar auditoría gratuita
                  <ArrowRight size={18} aria-hidden />
                </a>
                <a
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-md border border-white/42 px-5 font-semibold text-white hover:bg-white/10"
                  href="#calculadora"
                >
                  Calcular fuga aproximada
                </a>
              </div>
              <div className="mt-9 grid gap-4 text-sm text-white/78 sm:grid-cols-3">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 text-[#8be7d4]" size={18} aria-hidden />
                  <span>Sin cambiar de CRM desde el primer día</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 text-[#ffd27d]" size={18} aria-hidden />
                  <span>IA supervisada por el equipo</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 text-[#9cc4ff]" size={18} aria-hidden />
                  <span>Foco en ingresos recuperables</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-12">
        <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
          <div>
            <p className="text-sm font-semibold text-primary">El problema no suele ser captar más</p>
            <h2 className="mt-2 text-3xl font-semibold leading-tight md:text-4xl">
              Muchas clínicas pierden dinero dentro de su propia base de pacientes.
            </h2>
          </div>
          <p className="text-base leading-7 text-ink-soft">
            La mayoría ya tiene agenda, software, WhatsApp y recepción. Lo que falta es un sistema
            que recuerde, priorice y mida las oportunidades que se quedan a medias.
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

      <FugasCalculator />

      <section id="sistema" className="mx-auto max-w-6xl px-5 py-12">
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <p className="text-sm font-semibold text-primary">Qué venderemos después de la auditoría</p>
            <h2 className="mt-2 text-3xl font-semibold leading-tight md:text-4xl">
              Un sistema de recuperación, no un chatbot suelto.
            </h2>
            <p className="mt-4 text-base leading-7 text-ink-soft">
              El piloto de 30 días se centra en los puntos donde recepción pierde más tiempo y
              dirección pierde más visibilidad: agenda, presupuestos, pacientes dormidos y reseñas.
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
            <p className="text-sm font-semibold text-primary">Qué incluye la auditoría</p>
            <h2 className="mt-2 text-3xl font-semibold leading-tight md:text-4xl">
              Una revisión concreta para saber dónde empezar.
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

      <section id="solicitar-auditoria" className="mx-auto grid max-w-6xl gap-8 px-5 py-12 lg:grid-cols-[0.78fr_1.22fr]">
        <aside className="lg:sticky lg:top-6 lg:self-start">
          <p className="text-sm font-semibold text-primary">Solicitud de auditoría</p>
          <h2 className="mt-2 text-3xl font-semibold leading-tight md:text-4xl">
            Cuéntanos cómo trabaja tu clínica y te decimos dónde mirar primero.
          </h2>
          <p className="mt-4 text-base leading-7 text-ink-soft">
            No hace falta compartir datos de pacientes. Solo necesitamos contexto operativo para
            preparar una primera llamada útil.
          </p>
          <div className="mt-7 grid gap-3 text-sm">
            <div className="flex items-start gap-3">
              <ClipboardCheck className="mt-0.5 text-primary" size={18} aria-hidden />
              <span>Respuesta manual y revisada por nuestro equipo.</span>
            </div>
            <div className="flex items-start gap-3">
              <ShieldCheck className="mt-0.5 text-primary" size={18} aria-hidden />
              <span>Sin diagnóstico, sin datos sanitarios y sin automatizaciones ocultas.</span>
            </div>
            <div className="flex items-start gap-3">
              <Star className="mt-0.5 text-warning" size={18} aria-hidden />
              <span>Objetivo: validar si tiene sentido un piloto de 30 días.</span>
            </div>
          </div>
        </aside>

        <form
          action="/api/agency/audits"
          className="grid gap-5 rounded-lg border border-border bg-surface p-5 shadow-[0_18px_55px_rgba(15,35,38,0.08)] md:p-6"
          method="post"
        >
          <input name="source" type="hidden" value="landing" />
          <input name="campaign" type="hidden" value="clinica-dental-sin-fugas" />
          <input name="landingPage" type="hidden" value="/auditoria-fugas-dental" />
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
              <p className="font-semibold">Solicitud recibida.</p>
              <p className="mt-1 leading-6">
                La auditoría ha entrado en nuestro backoffice interno de campaña. El siguiente paso es revisar la clínica y preparar la llamada.
              </p>
            </div>
          ) : null}

          {error ? (
            <div className="rounded-lg border border-[#f4b8b8] bg-[#fff6f6] px-4 py-3 text-sm font-semibold text-danger">
              {error}
            </div>
          ) : null}

          <div className="grid gap-5 md:grid-cols-2">
            <FieldLabel label="Nombre de la clínica">
              <input className={inputClass} name="clinicName" placeholder="Clínica Dental..." required />
            </FieldLabel>
            <FieldLabel label="Ciudad">
              <input className={inputClass} name="city" placeholder="Madrid, Valencia, Sevilla..." />
            </FieldLabel>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            <FieldLabel label="Persona de contacto">
              <input autoComplete="name" className={inputClass} name="contactName" placeholder="Nombre y apellidos" required />
            </FieldLabel>
            <FieldLabel label="Cargo">
              <input className={inputClass} name="role" placeholder="Gerencia, dirección, recepción..." />
            </FieldLabel>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            <FieldLabel label="Teléfono">
              <input autoComplete="tel" className={inputClass} name="phone" placeholder="+34 600 000 000" required />
            </FieldLabel>
            <FieldLabel label="Email">
              <input autoComplete="email" className={inputClass} name="email" placeholder="nombre@clinica.com" required type="email" />
            </FieldLabel>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            <FieldLabel label="Sillones">
              <input className={inputClass} min="1" name="chairs" placeholder="3" type="number" />
            </FieldLabel>
            <FieldLabel label="Software actual">
              <input className={inputClass} name="currentSoftware" placeholder="Gesden, Dentidesk, Excel..." />
            </FieldLabel>
            <FieldLabel label="Mayor fuga">
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
            <h3 className="font-semibold">Datos aproximados para orientar la auditoría</h3>
            <div className="mt-4 grid gap-4 md:grid-cols-5">
              <FieldLabel label="Primeras visitas/mes">
                <input className={inputClass} min="0" name="monthlyFirstVisits" placeholder="40" type="number" />
              </FieldLabel>
              <FieldLabel label="Citas perdidas/mes">
                <input className={inputClass} min="0" name="missedAppointments" placeholder="8" type="number" />
              </FieldLabel>
              <FieldLabel label="Presupuestos abiertos">
                <input className={inputClass} min="0" name="openQuotes" placeholder="12" type="number" />
              </FieldLabel>
              <FieldLabel label="Ticket medio (€)">
                <input className={inputClass} min="0" name="averageTreatmentValue" placeholder="750" type="number" />
              </FieldLabel>
              <FieldLabel label="Pacientes inactivos">
                <input className={inputClass} min="0" name="inactivePatients" placeholder="180" type="number" />
              </FieldLabel>
            </div>
          </div>

          <FieldLabel label="Qué te gustaría mejorar primero">
            <textarea
              className={textareaClass}
              name="message"
              placeholder="Ejemplo: tenemos muchos presupuestos de implantes sin seguimiento, recepción va saturada por WhatsApp o queremos recuperar revisiones vencidas."
            />
          </FieldLabel>

          <div className="grid gap-3 border-t border-border pt-4 text-sm">
            <label className="flex gap-3">
              <input className="mt-1 size-4 accent-primary" name="privacyConsent" required type="checkbox" />
              <span>Acepto el tratamiento de mis datos para gestionar esta solicitud de auditoría.</span>
            </label>
            <label className="flex gap-3">
              <input className="mt-1 size-4 accent-primary" name="marketingConsent" type="checkbox" />
              <span>Acepto recibir comunicaciones comerciales relacionadas con automatización dental.</span>
            </label>
          </div>

          <button
            className="inline-flex h-12 items-center justify-center gap-2 rounded-md bg-primary px-5 font-semibold text-white hover:bg-primary-strong"
            type="submit"
          >
            Solicitar auditoría gratuita
            <ArrowRight size={18} aria-hidden />
          </button>
        </form>
      </section>
    </main>
  );
}
