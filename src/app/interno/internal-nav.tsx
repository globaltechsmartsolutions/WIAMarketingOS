"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BarChart3,
  ClipboardList,
  ExternalLink,
  Megaphone,
  Sparkles,
  UsersRound,
} from "lucide-react";

const navItems = [
  { href: "/interno/campanas", label: "Campañas", Icon: Megaphone },
  { href: "/interno/leads", label: "Leads", Icon: UsersRound },
  { href: "/interno/deals", label: "Oportunidades", Icon: BarChart3 },
];

export function InternalNav({ userName }: { userName: string }) {
  const pathname = usePathname();

  return (
    <header className="border-b border-border bg-surface">
      <div className="mx-auto grid max-w-[1480px] gap-3 px-4 py-3 lg:grid-cols-[auto_1fr_auto] lg:items-center">
        <Link href="/" className="flex min-w-0 items-center gap-3" aria-label="WIAMarketingOS">
          <span className="grid size-10 shrink-0 place-items-center rounded-lg bg-primary text-white">
            <Sparkles size={20} aria-hidden />
          </span>
          <span className="min-w-0">
            <span className="block text-sm font-semibold text-primary">WIAMarketingOS</span>
            <span className="block truncate text-lg font-semibold">CRM central de marketing</span>
          </span>
        </Link>

        <nav className="flex min-w-0 gap-2 overflow-x-auto lg:justify-center">
          {navItems.map(({ Icon, href, label }) => {
            const isActive = pathname === href || pathname.startsWith(`${href}/`);

            return (
              <Link
                key={href}
                href={href}
                className={`inline-flex h-10 shrink-0 items-center gap-2 rounded-md border px-3 text-sm font-semibold ${
                  isActive
                    ? "border-primary bg-primary text-white"
                    : "border-border bg-background text-ink-soft hover:bg-muted hover:text-foreground"
                }`}
              >
                <Icon size={16} aria-hidden />
                {label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center justify-between gap-2 lg:justify-end">
          <div className="hidden text-right text-xs text-ink-soft sm:block">
            <span className="block font-semibold text-foreground">{userName}</span>
            <span>Dirección comercial</span>
          </div>
          <Link
            href="/auditoria-fugas-dental"
            className="inline-flex h-10 shrink-0 items-center gap-2 rounded-md border border-border bg-background px-3 text-sm font-semibold hover:bg-muted"
          >
            Landing
            <ExternalLink size={15} aria-hidden />
          </Link>
          <Link
            href="/interno/ventas"
            className="inline-flex h-10 shrink-0 items-center gap-2 rounded-md border border-border bg-background px-3 text-sm font-semibold hover:bg-muted"
            title="Alias antiguo"
          >
            <ClipboardList size={15} aria-hidden />
            Ventas
          </Link>
        </div>
      </div>
    </header>
  );
}
