import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";
import { createAgencyAuditLead } from "@/lib/agency-leads";

const localizedMessages = {
  ar: {
    consent: "الموافقة مطلوبة لإدارة طلب المراجعة.",
    failed: "لم نتمكن من تسجيل الطلب. يرجى مراجعة البيانات.",
    review: "يرجى مراجعة بيانات الطلب.",
  },
  en: {
    consent: "Consent to manage the review request is required.",
    failed: "We could not register the request. Review the details.",
    review: "Review the request details.",
  },
  es: {
    consent: "El consentimiento para gestionar la solicitud de revisión es obligatorio.",
    failed: "No hemos podido registrar la solicitud. Revisa los datos.",
    review: "Revisa los datos de la solicitud.",
  },
} as const;

type RequestLocale = keyof typeof localizedMessages;

function getLocaleFromPayload(payload: { landingPage?: unknown; locale?: unknown } | null): RequestLocale {
  const explicitLocale = String(payload?.locale ?? "").toLowerCase();

  if (explicitLocale === "ar" || explicitLocale === "en" || explicitLocale === "es") {
    return explicitLocale;
  }

  const landingPage = String(payload?.landingPage ?? "");

  if (landingPage.startsWith("/ar/")) {
    return "ar";
  }

  if (landingPage.startsWith("/en/")) {
    return "en";
  }

  return "es";
}

function getErrorMessage(error: unknown, locale: RequestLocale) {
  const messages = localizedMessages[locale];

  if (error instanceof ZodError) {
    return messages.review;
  }

  if (error instanceof Error) {
    if (error.message === "Consent to manage the request is required.") {
      return messages.consent;
    }

    if (error.message === "request_failed") {
      return messages.failed;
    }

    return locale === "en" ? error.message : messages.failed;
  }

  return messages.failed;
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

function getRedirectUrl(request: NextRequest, landingPage: unknown) {
  const requestedPath = String(landingPage ?? "/es/dental-leak-audit");
  const safePath =
    requestedPath.startsWith("/") && !requestedPath.startsWith("//")
      ? requestedPath
      : "/es/dental-leak-audit";
  const url = new URL(safePath, request.url);

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
        landingPage: String(body.landingPage ?? "/es/dental-leak-audit"),
        locale: String(body.locale ?? ""),
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
      landingPage: String(formData.get("landingPage") ?? "/es/dental-leak-audit"),
      locale: String(formData.get("locale") ?? ""),
      privacyConsent: getBoolean(formData.get("privacyConsent")),
      marketingConsent: getBoolean(formData.get("marketingConsent")),
    },
  };
}

export async function POST(request: NextRequest) {
  const wantsJson = request.headers.get("content-type")?.includes("application/json") ?? false;
  let payload: Awaited<ReturnType<typeof getPayload>>["payload"] | null = null;

  try {
    const parsedRequest = await getPayload(request);
    payload = parsedRequest.payload;

    if (parsedRequest.honeypot.trim()) {
      throw new Error("request_failed");
    }

    const lead = await createAgencyAuditLead(payload, getRequestClientMeta(request));

    if (wantsJson) {
      return NextResponse.json({ ok: true, id: lead.id });
    }

    const redirectUrl = getRedirectUrl(request, payload.landingPage);
    redirectUrl.searchParams.set("request", "received");

    return NextResponse.redirect(redirectUrl, { status: 303 });
  } catch (error) {
    const message = getErrorMessage(error, getLocaleFromPayload(payload));

    if (wantsJson) {
      return NextResponse.json({ ok: false, error: message }, { status: 400 });
    }

    const redirectUrl = getRedirectUrl(request, payload?.landingPage);
    redirectUrl.searchParams.set("error", message);

    return NextResponse.redirect(redirectUrl, { status: 303 });
  }
}
