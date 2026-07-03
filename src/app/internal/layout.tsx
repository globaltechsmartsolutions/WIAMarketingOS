import { requireAppSession } from "@/lib/demo-permissions";
import { managementRoles } from "@/lib/permissions";
import { InternalNav } from "./internal-nav";

export default async function InternalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await requireAppSession(managementRoles, "/internal/campaigns");

  return (
    <main className="min-h-screen bg-background text-foreground">
      <InternalNav userName={session.user.name} />
      <section className="mx-auto max-w-[1480px] px-4 py-4">{children}</section>
    </main>
  );
}
