import { ArrowRight, LockKeyhole, ShieldCheck, Sparkles } from "lucide-react";
import { demoUsers, getSafeNextPath } from "@/lib/demo-auth";
import { loginDemo } from "./actions";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; next?: string }>;
}) {
  const query = await searchParams;
  const nextPath = getSafeNextPath(query.next ?? "/interno/ventas");
  const hasError = query.error === "1";

  return (
    <main className="min-h-screen bg-background text-foreground">
      <section className="mx-auto grid min-h-screen max-w-6xl items-center gap-10 px-5 py-10 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="grid gap-8">
          <div className="flex items-center gap-3">
            <span className="grid size-12 place-items-center rounded-lg bg-primary text-white">
              <Sparkles size={25} aria-hidden />
            </span>
            <div>
              <p className="text-sm font-semibold text-primary">WIAMarketingOS</p>
              <h1 className="text-3xl font-semibold tracking-normal md:text-4xl">
                Backoffice interno protegido
              </h1>
            </div>
          </div>

          <div className="grid gap-4 text-sm leading-6 text-ink-soft">
            <p>
              Accede a la zona interna de campañas y ventas de GlobalTech. Aquí gestionamos
              landings, auditorías, leads de clínicas y seguimiento comercial, separado de los
              CRM que vendemos a clientes.
            </p>
            <div className="rounded-lg border border-border bg-surface p-5">
              <div className="flex items-center gap-2 font-semibold text-primary">
                <ShieldCheck size={18} aria-hidden />
                Qué protege esta fase
              </div>
              <ul className="mt-3 grid gap-2">
                <li>Motor comercial separado de los productos finales.</li>
                <li>Acceso interno para revisar oportunidades y campañas.</li>
                <li>Leads de empresas, no pacientes ni datos sanitarios.</li>
              </ul>
            </div>
          </div>
        </div>

        <section className="rounded-lg border border-border bg-surface shadow-[0_18px_50px_rgba(15,35,38,0.08)]">
          <div className="border-b border-border px-6 py-5">
            <div className="flex items-center gap-3">
              <span className="grid size-10 place-items-center rounded-md bg-muted text-primary">
                <LockKeyhole size={20} aria-hidden />
              </span>
              <div>
                <h2 className="font-semibold">Entrar al backoffice</h2>
                <p className="text-sm text-ink-soft">Zona interna de campañas y ventas.</p>
              </div>
            </div>
          </div>

          {hasError ? (
            <div className="border-b border-border bg-rose-50 px-6 py-4 text-sm font-semibold text-rose-700">
              Credenciales incorrectas. Revisa usuario y clave.
            </div>
          ) : null}

          <form action={loginDemo} className="grid gap-5 px-6 py-6">
            <input name="next" type="hidden" value={nextPath} />

            <label className="grid gap-2 text-sm font-medium">
              Acceso local
              <select
                className="h-11 rounded-md border border-border bg-white px-3 outline-none focus:border-primary"
                name="email"
                required
              >
                {demoUsers.map((user) => (
                  <option key={user.email} value={user.email}>
                    {user.label} · {user.email}
                  </option>
                ))}
              </select>
            </label>

            <label className="grid gap-2 text-sm font-medium">
              Clave de acceso
              <input
                className="h-11 rounded-md border border-border bg-white px-3 outline-none focus:border-primary"
                name="password"
                placeholder="Introduce la clave"
                required
                type="password"
              />
            </label>

            <button
              className="inline-flex h-12 items-center justify-center gap-2 rounded-md bg-primary px-5 font-semibold text-white hover:bg-primary-strong"
              type="submit"
            >
              Entrar
              <ArrowRight size={18} aria-hidden />
            </button>
          </form>
        </section>
      </section>
    </main>
  );
}
