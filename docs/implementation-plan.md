# Implementation Plan

This plan turns the roadmap into concrete work for the next iterations.

## Phase 1 - Central Marketing CRM

Status: implemented.

Objective:

Move from a single audit lead table to a database prepared for multiple campaigns.

Implemented work:

- `Campaign`
- `Company`
- `Contact`
- `Lead`
- `Deal`
- `Activity`
- `Task`
- Dental demo seed.
- Internal navigation.
- `/internal/campaigns`
- `/internal/leads`
- `/internal/deals`
- Legacy route aliases.

Expected result:

WIAMarketingOS is no longer just a dental audit panel. It is the central campaign CRM.

Acceptance criteria:

- Every incoming audit syncs with company, contact, lead, opportunity, activity and task.
- `/internal/campaigns` shows campaigns, metrics and basic campaign creation.
- `/internal/leads` allows filtering, prioritizing, moving status, logging activity and creating or completing tasks.
- `/internal/deals` allows reviewing pipeline and moving opportunities by stage.

## Phase 2 - Campaign Builder

Objective:

Create and manage campaigns from the UI.

Work:

- New campaign form.
- Campaign edit page.
- Status transitions.
- Duplicate campaign.
- Archive campaign.
- Metrics by campaign.
- Campaign brief fields:
  - vertical
  - offer
  - ICP
  - pain
  - promise
  - CTA
  - source
  - budget

Acceptance criteria:

- A new campaign can be created without touching code.
- Campaigns can be filtered by vertical and status.
- Leads and deals can be filtered by campaign.

## Phase 3 - Landing and Screen Engine

Objective:

Create dynamic block-based pages.

Work:

- Add `LandingPage`.
- Add `PageVersion`.
- Add `PageVariant`.
- Add `Form`.
- Build a block renderer.
- Add dynamic public route.
- Add internal preview.
- Add publish action.

Acceptance criteria:

- A campaign can have a landing page.
- A landing page can have draft and published versions.
- Published versions are immutable.
- Form submissions are linked to page and campaign.

## Phase 4 - AI Generation

Objective:

Generate campaign screens and copy safely.

Work:

- Add `AIGeneration`.
- Create structured output schemas.
- Create internal prompts.
- Add "Generate landing" screen.
- Save draft as `PageVersion`.
- Add manual review.

Acceptance criteria:

- AI output validates against schema.
- Invalid output is rejected.
- No generated page is published without review.

## Phase 5 - Tracking and Scoring

Objective:

Know what converts and what sales should call first.

Work:

- Add `Event`.
- Create `/api/events`.
- Add tracking script.
- Capture UTM data.
- Add anonymous visitor ID.
- Link visitor events to lead after form submission.
- Add `ScoreRule`.
- Recalculate score on events.

Acceptance criteria:

- Campaign dashboards show visits, leads and conversion.
- Leads have explainable scores.
- Sales can sort by priority.

## Phase 6 - Automation

Objective:

Create operational follow-up without relying on memory.

Work:

- Add `Automation`.
- Add `AutomationRun`.
- Create a simple rule engine.
- Add triggers and actions.
- Add automation logs.

Acceptance criteria:

- Hot leads create automatic tasks.
- Overdue tasks can trigger reminders.
- Every automation run is visible.

## Phase 7 - Experimentation

Objective:

Improve conversion with variants.

Work:

- Create variant goals.
- Split traffic by variant.
- Measure conversion by variant.
- Keep change history.

Acceptance criteria:

- Campaigns start learning from their results.

## Recommended Next Sprint

Build Phase 2 before the AI generator.

Reason:

The product needs a strong campaign and CRM base before page generation. If we generate screens without well-modeled campaigns, leads, companies and opportunities, we will only create more disconnected pages.

Suggested first sprint:

1. Campaign edit page.
2. Campaign duplication.
3. Campaign metrics by status and source.
4. Link landing requests to the campaign dashboard.
5. Prepare the schema for `LandingPage` and `PageVersion`.
