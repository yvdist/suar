# Rules for Suar

Suar is a directory of affordable mental health services in Indonesia.
Its users are often in a difficult condition. Clarity and accuracy
matter more than feature completeness.

## Visual — forbidden

- Floating cards, box-shadow, gradient, glassmorphism
- Card grids for entry lists (use a list with hairline dividers)
- Excessive rounded corners (max 8px, 12px for cards)
- Emoji as icons
- Raw hex colors in components — always go through tokens
- Animations other than simple fades
- Large hero with centered text

## Visual — required

- Left-aligned, not centered
- Entry lists: list with hairline dividers
- Sentence case throughout the interface
- Minimum WCAG AA contrast
- Minimum 44x44px touch targets

## Data

- Every entry must have last_verified and verified_by
- Entries missing either must fail the build
- Expired entries are FLAGGED, never hidden and never deleted
- Never create sample entry data that looks real — if a
  placeholder is needed, give it a clearly fictional name

## Technical

- Astro with static output. Preact island for the filter only.
- Core pages must be browsable without JavaScript
- Fonts from Fontsource, no requests to third-party CDNs
- No analytics, no cookies, no accounts

## Copy

- Do not promise outcomes ("heal", "better", "recover")
- Do not imply the user is unwell
- Descriptive and calm, not cheerleading
- Name services the way people name them, not system terms

## Git

- Write everything in English: branch names, commit messages, PR titles.
- Branch names use a conventional prefix plus a short kebab-case
  context: `<type>/<short-context>`.
- Allowed branch prefixes: `feat/`, `fix/`, `refactor/`, `chore/`,
  `docs/`, `style/`, `test/`.
- Examples: `feat/filter-sidebar`, `fix/skip-link-focus`,
  `chore/update-deps`, `docs/reverification-policy`.
- One branch per context. Do not bundle unrelated changes.
- Commit messages follow Conventional Commits:
  `<type>: <short description in English>`.
- Allowed commit types: `feat`, `fix`, `refactor`, `chore`, `docs`,
  `style`, `test`.
- Commit per context, not per phase. Never write phase-scoped
  commits such as `fase 00: ...` or `phase 1: ...`.
- Split work into small reviewable commits, e.g. `chore: add design
  tokens to global.css`, `feat: add Base layout shell`,
  `feat: add dev-only token test page`.
- Keep each commit buildable. Build must pass after every commit.
- Execute all commits for a given phase autonomously in sequence without stopping or waiting for user confirmation between commits.
