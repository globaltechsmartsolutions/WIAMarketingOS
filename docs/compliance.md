# Compliance

This document is not legal advice. It is an internal product guide for reducing risk while designing WIAMarketingOS.

## Product Boundary

WIAMarketingOS should store commercial and operational context, not clinical records.

Practical rule:

```text
clinic operational context: yes
clinical data or identifiable patient data: no
```

## Lead Capture

The safest acquisition flow is inbound:

```text
visitor arrives
reads information
accepts policy
sends form
sales contacts the clinic to manage the request
```

Every lead should store:

- Campaign.
- Source.
- Landing page.
- UTM fields when available.
- Consent status.
- Timestamp.
- Reasonable technical metadata.

## Commercial Communications

Unsolicited electronic commercial communications have strong limits in Spain and the EU.

Reference: [BOE Law 34/2002, article 21](https://www.boe.es/buscar/act.php?id=BOE-A-2002-13758)

Product implication:

- Do not design mass outbound sending without consent.
- Prioritize messages prepared for human review.
- Store contact origin.
- Store consent and opt-out status.
- Support unsubscribe or objection flows before scaling outbound.

## Robinson List and Objection

Commercial campaigns should respect advertising exclusion and objection systems.

Product implication:

- Add `doNotContact` fields before scaled outbound.
- Avoid automatic tasks for blocked contacts.
- Add an internal procedure or integration before running outbound at scale.

## Cookies and Analytics

Measurement may require consent depending on the cookie or analytics tool.

Reference: [AEPD analytics cookies guide](https://www.aepd.es/guias/guia-cookies-analiticas-externas.pdf)

Product implication:

- Start with minimal first-party analytics.
- Separate technical events from marketing events.
- Document what is captured and why.

## Retention

Define retention policies for:

- Won leads.
- Lost leads.
- Contacts who objected.
- Anonymous events.
- AI generation logs.

## Security Minimums

- Authenticated internal access.
- Role-based access.
- Audit trail for important actions.
- No health data in prompts.
- No secrets in client-side code.
- Environment variables managed outside the repository.

## AI Data Use

AI should work with the minimum data required.

Allowed examples:

- Clinic size.
- Current software.
- Approximate volume.
- Operational pain.
- Desired business outcome.

Avoid:

- Patient names.
- Health details.
- Sensitive information.
- Irreversible automatic decisions.

## Launch Checklist

Before publishing a landing page:

- Policy link is present.
- Consent checkbox is clear.
- Form avoids patient health data.
- Campaign and source are stored.
- UTM tracking is supported.
- Opt-out or objection path exists if communications will follow.
