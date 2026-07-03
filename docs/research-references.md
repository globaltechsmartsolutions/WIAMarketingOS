# Research and References

This research summarizes the patterns worth copying from existing platforms and the traps to avoid while building WIAMarketingOS.

## HubSpot

HubSpot connects lead scoring with segments, workflows and reports. The important lesson is that score should not live alone: it should trigger actions and help sales prioritize.

What to copy:

- Contact, company and deal structure.
- Lead scoring connected to sales priority.
- Marketing and pipeline connection.
- Campaign-level reporting.

What not to copy at the beginning:

- Too many configuration options before validating campaigns.
- A large marketplace or full CRM surface.

## Mautic

Mautic proves that a marketing automation system can be open, self-hostable and centered on contacts, campaigns, forms, scoring and nurturing.

What to copy:

- Campaigns as workflows.
- Forms as first-class assets.
- Score rules.
- Automatic actions.

What not to copy at the beginning:

- Complex visual workflow editing.
- Too many channels before the inbound flow is proven.

## Webflow, Unbounce and Instapage

These tools show that creating pages is not enough. A campaign platform must manage variants, goals, publishing and optimization.

What to copy:

- Block-based page construction.
- Conversion goals.
- Variant testing.
- Assisted generation.

What not to copy at the beginning:

- Full free-form design freedom.
- Advanced visitor personalization before having enough volume.

## Segment and RudderStack

These references come from CDP and event tracking. The key lesson is simple: if events are not captured cleanly from the start, attribution and optimization become painful later.

What to copy:

- Event naming discipline.
- UTM and campaign source tracking.
- Anonymous identity before the form.
- Known identity after the form.

What not to copy at the beginning:

- A full CDP.
- Too many destinations before the core data model is stable.

## Open-Source Inspiration

Useful references:

- Twenty for CRM-style ergonomics.
- PostHog for analytics, events and experiments.
- Matomo for privacy-conscious analytics.
- Mautic for open marketing automation.

Current decision:

Do not install everything now. Build the core first, then integrate only what clearly helps.

## Research Conclusion

WIAMarketingOS should combine five pieces:

1. Campaign CRM.
2. Landing and screen generator.
3. Lead and opportunity pipeline.
4. Event tracking and scoring.
5. AI assistance for copy, diagnosis and next steps.

The mistake would be building only one of these pieces. The advantage is in connecting them.
