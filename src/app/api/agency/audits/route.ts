import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";
import { createAgencyAuditLead } from "@/lib/agency-leads";

function getErrorMessage(error: unknown) {
  if (error instanceof ZodError) {
    return error.issues[0]?.message ?? "Revisa los datos de la solicitud.";
  }

  if (error instanceof Error) {
    return error.message;
  }

  return "No hemos podido registrar la solicitud. Revisa los datos.";
}

function getRequestClientMeta(request: NextRequest) {
  const forwardedFor = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();

  return {
    ipAddress:
      forwardedFor ||
      request.headers.get("x-real-ip") ||
      request.headers.get("cf-connecting-ip") ||
      request.headers.get("x-client-ip") ||
      "local",
    userAgent: request.headers.get("user-agent"),
  };
}

function getRedirectUrl(request: NextRequest) {
  const url = new URL("/auditoria-fugas-dental", request.url);

  if (url.hostname === "0.0.0.0") {
    url.hostname = "127.0.0.1";
  }

  return url;
}

function getBoolean(value: FormDataEntryValue | null) {
  return value === "on" || value === "true";
}

async function getPayload(request: NextRequest) {
  const contentType = request.headers.get("content-type") ?? "";

  if (contentType.includes("application/json")) {
    const body = await request.json();

    return {
      honeypot: String(body.website ?? body.company ?? ""),
      payload: {
        clinicName: String(body.clinicName ?? ""),
        contactName: String(body.contactName ?? ""),
        role: String(body.role ?? ""),
        phone: String(body.phone ?? ""),
        email: String(body.email ?? ""),
        city: String(body.city ?? ""),
        chairs: body.chairs ?? "",
        currentSoftware: String(body.currentSoftware ?? ""),
        mainLeak: String(body.mainLeak ?? "no_lo_se"),
        monthlyFirstVisits: body.monthlyFirstVisits ?? "",
        missedAppointments: body.missedAppointments ?? "",
        openQuotes: body.openQuotes ?? "",
        averageTreatmentValue: body.averageTreatmentValue ?? "",
        inactivePatients: body.inactivePatients ?? "",
        message: String(body.message ?? ""),
        source: String(body.source ?? "landing"),
        campaign: String(body.campaign ?? ""),
        landingPage: String(body.landingPage ?? "/auditoria-fugas-dental"),
        privacyConsent: body.privacyConsent === true,
        marketingConsent: body.marketingConsent === true,
      },
    };
  }

  const formData = await request.formData();

  return {
    honeypot: String(formData.get("website") ?? formData.get("company") ?? ""),
    payload: {
      clinicName: String(formData.get("clinicName") ?? ""),
      contactName: String(formData.get("contactName") ?? ""),
      role: String(formData.get("role") ?? ""),
      phone: String(formData.get("phone") ?? ""),
      email: String(formData.get("email") ?? ""),
      city: String(formData.get("city") ?? ""),
      chairs: formData.get("chairs") ?? "",
      currentSoftware: String(formData.get("currentSoftware") ?? ""),
      mainLeak: String(formData.get("mainLeak") ?? "no_lo_se"),
      monthlyFirstVisits: formData.get("monthlyFirstVisits") ?? "",
      missedAppointments: formData.get("missedAppointments") ?? "",
      openQuotes: formData.get("openQuotes") ?? "",
      averageTreatmentValue: formData.get("averageTreatmentValue") ?? "",
      inactivePatients: formData.get("inactivePatients") ?? "",
      message: String(formData.get("message") ?? ""),
      source: String(formData.get("source") ?? "landing"),
      campaign: String(formData.get("campaign") ?? ""),
      landingPage: String(formData.get("landingPage") ?? "/auditoria-fugas-dental"),
      privacyConsent: getBoolean(formData.get("privacyConsent")),
      marketingConsent: getBoolean(formData.get("marketingConsent")),
    },
  };
}

export async function POST(request: NextRequest) {
  const wantsJson = request.headers.get("content-type")?.includes("application/json") ?? false;

  try {
    const { honeypot, payload } = await getPayload(request);

    if (honeypot.trim()) {
      throw new Error("No hemos podido registrar la solicitud. Revisa los datos.");
    }

    const lead = await createAgencyAuditLead(payload, getRequestClientMeta(request));

    if (wantsJson) {
      return NextResponse.json({ ok: true, id: lead.id });
    }

    const redirectUrl = getRedirectUrl(request);
    redirectUrl.searchParams.set("solicitud", "recibida");

    return NextResponse.redirect(redirectUrl, { status: 303 });
  } catch (error) {
    const message = getErrorMessage(error);

    if (wantsJson) {
      return NextResponse.json({ ok: false, error: message }, { status: 400 });
    }

    const redirectUrl = getRedirectUrl(request);
    redirectUrl.searchParams.set("error", message);

    return NextResponse.redirect(redirectUrl, { status: 303 });
  }
}
