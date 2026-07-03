# WIAMarketingOS

Internal campaign, lead generation, AI screen generation and sales operating system for GlobalTech Smart Solutions.

This repository is separate from the CRM products sold to clients. It owns campaigns, landing pages, forms, leads, companies, contacts, opportunities, events, automations and AI-assisted generation.

```text
CRMProDental     = product sold to dental clinics
WIAMarketingOS  = internal system to attract, qualify and sell products
```

## Documentation

The strategy and roadmap live in [`docs/`](./docs/README.md):

- [Product vision](./docs/product-vision.md)
- [Research and references](./docs/research-references.md)
- [Architecture](./docs/architecture.md)
- [Data model](./docs/data-model.md)
- [AI screen generator](./docs/ai-screen-generator.md)
- [Compliance](./docs/compliance.md)
- [Roadmap](./docs/roadmap.md)
- [Implementation plan](./docs/implementation-plan.md)

## Main Routes

- `/dental-leak-audit` - public acquisition landing page for dental clinics.
- `/internal/campaigns` - central campaign CRM.
- `/internal/leads` - leads, companies, contacts, activities and tasks.
- `/internal/deals` - opportunity pipeline.
- `/internal/sales` - alias that redirects to `/internal/leads`.
- `/api/agency/audits` - endpoint that receives audit requests.

Legacy Spanish routes are kept as redirects or compatibility aliases, but new work should use the English routes above.

## Local Development

```bash
npm install
npm run db:generate
npm run dev
```

The application expects a PostgreSQL `DATABASE_URL`.

```bash
npm run db:migrate
npm run build
npm run lint
```

## Current State

Phase 1 of the roadmap is implemented:

- Marketing CRM data models.
- Dental demo seed.
- Incoming audit synchronization into the central CRM.
- Internal campaign, lead and opportunity screens.
- English public and internal routes.

## Next Milestone

The recommended next milestone is Phase 2: a Campaign Builder that lets us create, edit, duplicate and measure campaigns from the UI without touching code.
