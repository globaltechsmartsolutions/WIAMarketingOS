import type { DemoRole } from "@/lib/demo-auth";

export type PermissionRequirement = DemoRole | readonly DemoRole[];

export const managementRoles = ["management"] as const satisfies readonly DemoRole[];

export function getAllowedRoles(requirement: PermissionRequirement) {
  return Array.isArray(requirement) ? [...requirement] : [requirement];
}
