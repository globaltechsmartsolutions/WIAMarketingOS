import { requireAppSession } from "@/lib/demo-permissions";
import { directionRoles } from "@/lib/permissions";
import { InternalNav } from "./internal-nav";

export default async function InternalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await requireAppSession(directionRoles, "/interno/leads");

  return (
    <main className="min-h-screen bg-background text-foreground">
      <InternalNav userName={session.user.name} />
      <section className="mx-auto max-w-[1480px] px-4 py-4">{children}</section>
    </main>
  );
}
