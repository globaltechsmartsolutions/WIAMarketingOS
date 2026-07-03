export const demoSessionCookie = "wiamarketingos_session";
export const demoRoleCookie = "wiamarketingos_role";
export const demoSessionValue = "local-marketing-os-session";
export const demoSessionMaxAge = 60 * 60 * 8;
export const demoPassword = "demo2026";

export const demoUsers = [
  {
    email: "alejandro@globaltech.test",
    label: "Alejandro",
    name: "Alejandro",
    role: "management",
  },
] as const;

export type DemoRole = "management";

export function getDemoUserByEmail(email: string) {
  return demoUsers.find((item) => item.email === email.trim().toLowerCase());
}

export function getSafeNextPath(value: FormDataEntryValue | string | null) {
  const path = String(value ?? "/internal/campaigns");

  if (!path.startsWith("/") || path.startsWith("//")) {
    return "/internal/campaigns";
  }

  if (path.startsWith("/login") || path.startsWith("/api/")) {
    return "/internal/campaigns";
  }

  return path;
}
