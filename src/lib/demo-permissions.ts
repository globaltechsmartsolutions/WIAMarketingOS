import "server-only";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import {
  demoRoleCookie,
  demoSessionCookie,
  demoSessionValue,
  demoUsers,
  type DemoRole,
} from "@/lib/demo-auth";
import { getAllowedRoles, type PermissionRequirement } from "@/lib/permissions";

export type AppSession = {
  id: string;
  user: {
    email: string;
    name: string;
    role: DemoRole;
  };
};

export async function getCurrentAppSession(): Promise<AppSession | null> {
  const cookieStore = await cookies();
  const sessionValue = cookieStore.get(demoSessionCookie)?.value;
  const role = cookieStore.get(demoRoleCookie)?.value as DemoRole | undefined;

  if (sessionValue !== demoSessionValue || role !== "direccion") {
    return null;
  }

  const user = demoUsers.find((item) => item.role === role);

  if (!user) {
    return null;
  }

  return {
    id: sessionValue,
    user: {
      email: user.email,
      name: user.name,
      role: user.role,
    },
  };
}

export async function requireAppSession(
  requirement: PermissionRequirement,
  nextPath = "/interno/ventas",
): Promise<AppSession> {
  const session = await getCurrentAppSession();

  if (!session) {
    redirect(`/login?next=${encodeURIComponent(nextPath)}`);
  }

  if (!getAllowedRoles(requirement).includes(session.user.role)) {
    redirect("/login?error=1");
  }

  return session;
}
