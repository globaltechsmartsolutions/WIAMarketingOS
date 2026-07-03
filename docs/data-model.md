# Data Model

## Current Core

The first implemented CRM layer uses these models:

- `AgencyLead`
- `AgencyActivity`
- `Campaign`
- `Company`
- `Contact`
- `Lead`
- `Deal`
- `Activity`
- `Task`

## Campaign

Represents a commercial campaign.

Key fields:

- `name`
- `slug`
- `vertical`
- `offer`
- `status`
- `goal`
- `landingPath`
- `budgetCents`

Examples:

- `dental-revenue-leak-audit`
- `aesthetic-consultation-recovery`
- `physio-recurring-patients`

## Landing Page and Page Version

Future models should separate a public page from its immutable versions.

Suggested fields for `LandingPage`:

- `campaignId`
- `slug`
- `status`
- `publishedVersionId`

Suggested fields for `PageVersion`:

- `landingPageId`
- `schema`
- `status`
- `createdBy`
- `publishedAt`

## Lead

Represents an actionable commercial lead.

Key fields:

- `campaignId`
- `companyId`
- `contactId`
- `agencyLeadId`
- `status`
- `priority`
- `source`
- `landingPage`
- `problem`
- `estimatedValueMin`
- `estimatedValueMax`
- `score`
- `nextStep`

## Deal

Represents the sales opportunity created from a lead.

Key fields:

- `campaignId`
- `companyId`
- `contactId`
- `leadId`
- `stage`
- `status`
- `valueCents`
- `probability`
- `expectedCloseAt`
- `wonAt`
- `lostAt`

## Activity

Represents a relevant event in the commercial process:

- Form received.
- Call completed.
- Demo booked.
- Proposal sent.
- Pilot opened.
- Deal won.
- Deal lost.

## Task

Represents a pending action.

Examples:

- Call the lead.
- Prepare audit notes.
- Send demo recap.
- Follow up on proposal.

## Future Models

Recommended next additions:

- `Event`
- `Form`
- `PageVariant`
- `ConversionGoal`
- `ScoreRule`
- `Automation`
- `AutomationRun`
- `AIGeneration`

## Migration Strategy

Do not migrate everything at once. The practical path is:

1. Keep `AgencyLead` as the inbound form capture layer.
2. Sync incoming records into the central CRM models.
3. Add campaign-aware landing pages.
4. Add events and scoring.
5. Add structured AI generation.
