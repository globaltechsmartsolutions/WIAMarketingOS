# WIAMarketingOS Documentation

WIAMarketingOS is GlobalTech Smart Solutions' internal engine for campaigns, acquisition and sales.

```text
CRMProDental     = product sold to dental clinics
WIAMarketingOS  = internal system to attract, qualify and sell products
```

This repository must not become a clinical CRM and must not store health data. It manages campaigns, landing pages, forms, leads, companies, contacts, opportunities, automations, events and AI-assisted generation.

## Index

- [Product vision](./product-vision.md)
- [Research and references](./research-references.md)
- [Architecture](./architecture.md)
- [Data model](./data-model.md)
- [AI screen generator](./ai-screen-generator.md)
- [Compliance](./compliance.md)
- [Roadmap](./roadmap.md)
- [Implementation plan](./implementation-plan.md)

## Main Decision

During the initial phase, WIAMarketingOS should remain one modular monolith. Splitting it into multiple repositories or services too early would slow down validation.

Later, if event volume, automation volume or AI generation grows, the natural evolution can be a monorepo:

```text
apps/web          internal panel, landing pages and generator
apps/worker       automation jobs and scheduled tasks
apps/tracker      event ingestion
packages/db       shared schema and queries
packages/ai       structured generation
packages/ui       shared UI system
```

Right now the priority is speed, one database and clear internal domain boundaries.
