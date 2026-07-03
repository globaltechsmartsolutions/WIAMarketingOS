# Architecture

## Current Decision

Start as a modular monolith.

```text
WIAMarketingOS
├─ Next.js app
│  ├─ public routes
│  ├─ internal backoffice
│  ├─ campaign domain
│  ├─ lead and sales domain
│  ├─ page generation domain
│  └─ API routes
├─ PostgreSQL
├─ Prisma
└─ future workers
```

## Why Not Split Yet

Splitting now would add friction:

- More deployments.
- More environment variables.
- More auth between services.
- More database coordination.
- More maintenance cost.

We still need to validate the full flow. When the product matures, separation should happen around load or responsibility.

## Future Monorepo Shape

```text
apps/web
apps/worker
apps/tracker
packages/db
packages/ai
packages/ui
```

### apps/web

Internal panel, landing pages, screen generator and lightweight APIs.

### apps/worker

Background jobs:

- Score recalculation.
- Task creation.
- Follow-up scheduling.
- External integrations.

### apps/tracker

High-volume event ingestion:

- Page views.
- CTA clicks.
- Form starts.
- Form submissions.
- Variant exposure.

This should only be extracted when volume justifies it.

## Internal Domains

### Campaign

Manages campaigns, verticals, offers, messages and publication status.

### Page Generation

Manages screens, versions, blocks, variants and conversion goals.

### CRM

Manages leads, companies, contacts, opportunities, activities and tasks.

### Events

Receives events and connects them with campaign, landing page, variant and lead.

### Automation

Runs rules and workflows:

- Create tasks.
- Update scores.
- Prepare messages.
- Notify the team.

### AI

Generates structures, copy, diagnoses, messages, emails and scripts.

AI output must be validated before it is rendered or sent.

## Data Flow

```text
Visitor
-> Landing page
-> Event tracking
-> Form submission
-> Lead
-> Company and contact
-> Opportunity
-> Task
-> Sales action
-> Activity
-> Conversion metric
```

## Boundaries

- Public routes must never depend on clinical CRM modules.
- Events should be stored even before a lead exists.
- A lead can come from any campaign, not only dental.
- A published landing page version should be immutable.
- AI creates drafts; it does not publish without review.
- Every automation should leave an `AutomationRun`.
- Every important sales action should become an `Activity`.
