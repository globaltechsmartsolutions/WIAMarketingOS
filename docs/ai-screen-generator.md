# AI Screen Generator

## Product Decision

The first version should not be a free-form Webflow-style editor.

The system should generate structured page schemas that our renderer can safely display.

```text
brief
-> AI structured output
-> validated page schema
-> preview
-> human review
-> publish
-> measure
```

## First Screen Types

Initial version:

- Audit landing page.
- Thank-you page.
- Demo request page.
- Use-case page.

Later:

- Comparison page.
- Pricing page.
- Interactive diagnostic page.

## Schema Direction

A `PageVersion.schema` should look like this:

```json
{
  "type": "landing",
  "goal": "capture_audit",
  "sections": [
    {
      "type": "hero",
      "headline": "Dental Revenue Leak Audit",
      "subheadline": "Find appointments, quotes and patients that are slipping away.",
      "cta": "Request free audit"
    },
    {
      "type": "problem_grid",
      "items": ["Appointments", "Quotes", "Inactive patients"]
    },
    {
      "type": "form",
      "formId": "dental_audit_request"
    }
  ]
}
```

## Generation Flow

1. User creates a campaign brief.
2. User selects vertical, offer, ICP, pain, promise and CTA.
3. AI generates a structured draft.
4. The draft is saved as a `PageVersion` with `draft` status.
5. The internal user previews the page.
6. The user edits constrained fields.
7. The user publishes a version.
8. The system starts measuring events and conversions.

## Why Structured Outputs

We need valid blocks, not arbitrary HTML.

Benefits:

- Safer rendering.
- Consistent design.
- Easier experimentation.
- Easier analytics.
- Easier reuse across campaigns.

## Future Visual Editing

Once the block generator works, add limited visual editing:

- Edit text.
- Reorder sections.
- Hide or show blocks.
- Create variants.
- Change CTA.

We do not need unrestricted drag-and-drop. We need to launch campaigns quickly and measure results.
