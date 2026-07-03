# Roadmap

## Phase 0 - Separation

Goal:

Keep WIAMarketingOS separate from client CRMs.

Done:

- Separate repository.
- Public dental acquisition landing page.
- Audit request API.
- Basic internal backoffice.

Success criteria:

- Campaign work does not enter CRMProDental.
- Sales and acquisition live in WIAMarketingOS.

## Phase 1 - Central Marketing CRM

Goal:

Turn the backoffice into a real internal commercial CRM.

Done:

- Marketing CRM Prisma models.
- Idempotent dental campaign seed.
- Sync from `AgencyLead` into campaign, company, contact, lead, deal, activity and task.
- Internal routes for campaigns, leads and deals.
- English primary routes under `/internal`.

Success criteria:

- A lead can be linked to campaign, company, contact and opportunity.
- Sales knows what to work today.
- Management can see pipeline by campaign.

## Phase 2 - Campaign Builder

Goal:

Create campaigns from a brief, not from code.

Scope:

- New campaign form.
- Campaign editing.
- Campaign states.
- Campaign duplication.
- Campaign library.
- Basic campaign metrics:
  - visits
  - leads
  - qualified leads
  - opportunities
  - won deals

Success criteria:

- We can create a dental, aesthetics or physiotherapy campaign without touching code.
- Leads and metrics are grouped by campaign.

## Phase 3 - Landing and Screen Engine

Goal:

Generate and manage campaign screens.

Scope:

- `LandingPage`
- `PageVersion`
- `PageVariant`
- `Form`
- Block renderer.
- Public dynamic route.
- Internal preview.
- Version publishing.

Success criteria:

- A landing page can be created from a JSON schema.
- A published version is immutable.
- Leads are captured against the correct page and campaign.

## Phase 4 - AI Generation

Goal:

Use AI to accelerate campaigns without losing control.

Scope:

- Structured generation.
- Internal prompts.
- AI generation history.
- Human review before publish.
- Copy, diagnosis, email and script generation.

Success criteria:

- AI creates valid drafts.
- Humans approve before publishing or sending.
- Every generation is recorded.

## Phase 5 - Tracking, Scoring and Attribution

Goal:

Measure behavior and prioritize opportunities.

Scope:

- `Event`
- `/api/events`
- Tracking script.
- UTM storage.
- Anonymous visitor ID.
- Link anonymous events to known leads after form submission.
- `ScoreRule`

Success criteria:

- We know which source created each lead.
- We know which landing page and variant converted.
- Sales sees the highest-priority lead first.

## Phase 6 - Automation

Goal:

Create tasks and follow-up without depending on memory.

Scope:

- `Automation`
- `AutomationRun`
- Simple rule engine.
- Triggers:
  - lead created
  - lead score changed
  - deal stage changed
  - task overdue
- Actions:
  - create task
  - prepare message
  - notify internal user
  - update score

Success criteria:

- Hot leads automatically create a task and next step.
- Every automation leaves a trace.

## Phase 7 - Experimentation and Optimization

Goal:

Compare variants and improve conversion.

Scope:

- Variant goals.
- Traffic distribution.
- Conversion measurement.
- Change history.

Success criteria:

- A campaign can have two landing variants.
- The system measures which one converts better.

## Phase 8 - Integrations

Goal:

Connect external tools once the core is validated.

Possible integrations:

- Email provider.
- WhatsApp provider.
- Calendar.
- Analytics.
- CRM export.

Rule:

Integrations should extend the core, not replace it. WIAMarketingOS remains the source of campaign and lead truth.

## Important Sequence

Do not invert Phase 4 and Phase 3. First we need a renderer and block schema; then AI can generate against that schema.
