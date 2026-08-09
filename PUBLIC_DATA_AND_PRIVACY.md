# Public Data and Privacy Policy

## Release status

This repository is intentionally safe for public portfolio use.

## What the project contains

- A newly authored product identity: **Hiring Capacity Lab**.
- An independently created 12-month synthetic dataset.
- Generic talent-operations language.
- Illustrative thresholds and recommendations.
- Public-facing code, documentation, tests, and image assets created for this
  release.

## What the project does not contain

- Employer names, logos, colors, or brand assets.
- Production recruiting, headcount, candidate, or employee records.
- Organizational structures or staffing assignments from any real company.
- Source-system exports, screenshots, identifiers, URLs, credentials, or
  workflow details.
- A transformed or lightly perturbed version of a private dataset.

## Synthetic-data method

The figures in `app/data.ts` were selected to create a coherent fictional
operating pattern:

1. A ten-month demand baseline averaging 14 requests.
2. A peak month of 31 requests, or 2.2 times the baseline.
3. Technical demand rising from a prior three-month average of 5.3 roles to 18
   roles, or approximately 3.4 times the average.
4. Peak output of 7 hires, resulting in 11 roles of net queue growth during the
   peak technical-demand month.

Those relationships are mathematically consistent but are not intended to
represent any real company, time period, or staffing model.

## Ongoing release rule

Future contributors should only add invented or clearly licensed public data.
Do not paste or adapt private operational data into this repository, including
for demos, screenshots, fixtures, commit messages, issues, or pull requests.
