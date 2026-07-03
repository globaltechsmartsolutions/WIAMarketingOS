"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import {
  demoPassword,
  demoRoleCookie,
  demoSessionCookie,
  demoSessionMaxAge,
  demoSessionValue,
  getDemoUserByEmail,
  getSafeNextPath,
} from "@/lib/demo-auth";

export async function loginDemo(formData: FormData) {
  const email = String(formData.get("email") ?? "");
  const password = String(formData.get("password") ?? "");
  const nextPath = getSafeNextPath(formData.get("next"));
  const user = getDemoUserByEmail(email);
  const expectedPassword = process.env.INTERNAL_DEMO_PASSWORD ?? demoPassword;

  if (!user || password !== expectedPassword) {
    const loginUrl = new URL("/login", "http://localhost");
    loginUrl.searchParams.set("error", "1");
    loginUrl.searchParams.set("next", nextPath);
    redirect(`${loginUrl.pathname}${loginUrl.search}`);
  }

  const cookieStore = await cookies();
  const cookieOptions = {
    httpOnly: true,
    maxAge: demoSessionMaxAge,
    path: "/",
    sameSite: "lax" as const,
    secure: process.env.NODE_ENV === "production",
  };

  cookieStore.set(demoSessionCookie, demoSessionValue, cookieOptions);
  cookieStore.set(demoRoleCookie, user.role, cookieOptions);

  redirect(nextPath);
}

export async function logoutDemo() {
  const cookieStore = await cookies();

  cookieStore.delete(demoSessionCookie);
  cookieStore.delete(demoRoleCookie);

  redirect("/login");
}
