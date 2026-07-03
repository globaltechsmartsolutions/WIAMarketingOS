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
    title: "Landings",
    text: "Páginas de captación por nicho y campaña.",
    Icon: Globe2,
  },
  {
    title: "Leads",
    text: "Solicitudes entrantes con prioridad comercial.",
    Icon: ClipboardCheck,
  },
  {
    title: "Pipeline",
    text: "Estados, notas, llamadas y motivos de pérdida.",
    Icon: BarChart3,
  },
  {
    title: "Separación",
    text: "Campañas internas fuera del CRM del cliente.",
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
            Motor interno para lanzar campañas, captar leads cualificados y gestionar el
            seguimiento comercial sin mezclarlo con los CRM que vendemos a clientes.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              className="inline-flex h-12 items-center justify-center gap-2 rounded-md bg-primary px-5 font-semibold text-white hover:bg-primary-strong"
              href="/auditoria-fugas-dental"
            >
              Ver landing dental
              <ArrowRight size={18} aria-hidden />
            </Link>
            <Link
              className="inline-flex h-12 items-center justify-center gap-2 rounded-md border border-border bg-surface px-5 font-semibold hover:bg-muted"
              href="/interno/ventas"
            >
              Abrir backoffice
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
