# CovSight Overview Website — Implementation Plan

**Companion to:** `WEBSITE_DESIGN.md`
**Goal:** Build and deploy the covsight.github.io overview site described in the
design doc. The end result is a static site served by GitHub Pages from this
repository.

---

## Technology Choices

### Static Site Generator: Astro

Astro is the right choice here because:
- **Island architecture** — ships zero JS by default; interactive elements opt-in.
- **Component model** — each section and diagram is an isolated `.astro` file,
  easy to edit independently.
- **Content Collections** — built-in Markdown/MDX authoring with typed frontmatter
  schemas; content lives in `.md` files separate from layout code.
- **Vite under the hood** — fast dev server, HMR, modern build pipeline.
- **Tailwind CSS integration** — first-class, official `@astrojs/tailwind` package.
- **GitHub Pages deployment** — `actions/deploy-pages` provides zero-config deployment.

### Styling: Tailwind CSS v3

- Utility-first, no runtime, purges to minimal CSS.
- Dark mode via `class` strategy (`dark:` variants) controlled by
  `prefers-color-scheme` media query + optional toggle.

### Content Authoring: Markdown + YAML data files

**The rule:** no prose or structured data lives inside `.astro` component files.

| Content type | Where it lives | Who edits it |
|---|---|---|
| Long-form prose (mission statement, section intros) | `src/content/*.md` (Markdown) | Anyone |
| Structured card data (pillars, interfaces, nav links) | `src/data/*.yaml` (YAML) | Anyone |
| SVG diagram visuals | `src/diagrams/*.astro` | Developer |
| Layout and styling | `src/components/*.astro` | Developer |

This means updating the tagline, a pillar description, or adding an interface card
requires only editing a `.md` or `.yaml` file — no HTML or Tailwind classes involved.

### Diagrams: Inline SVG with CSS variables

All diagrams are hand-authored SVG components in `src/diagrams/`. CSS custom
properties handle color theming so dark mode works automatically. No third-party
diagramming library dependency. Diagram labels that might change (format names,
layer names) are passed in as props from the data layer.

### Analytics: Plausible (self-hosted script via CDN)

`<script defer data-domain="covsight.github.io" src="https://plausible.io/js/script.js">`
— privacy-respecting, GDPR-compliant, no cookies.

---

## Repository Layout (target)

```
covsight.github.io/
├── astro.config.mjs            # Astro config: site URL, integrations, output
├── tailwind.config.mjs         # Tailwind: darkMode 'class', content paths
├── package.json                # npm dependencies
├── tsconfig.json               # TypeScript config (strict, Astro preset)
│
├── public/
│   ├── favicon.svg             # Derived from covsight-icon-v4.svg
│   ├── og-image.png            # 1200×630 Open Graph card
│   └── fonts/                  # Self-hosted web fonts
│
├── src/
│   │
│   ├── content/                # ── MARKDOWN PROSE ──────────────────────────
│   │   ├── config.ts           # Content collection schemas (typed frontmatter)
│   │   ├── intro.md            # Tagline, mission statement, CTA labels, badge row
│   │   ├── problem.md          # "The problem" heading, paragraph, comparison rows
│   │   ├── pillars.md          # Section heading + per-pillar heading/body/snippet
│   │   ├── interfaces.md       # Section heading + intro paragraph
│   │   ├── ecosystem.md        # Section heading + intro paragraph
│   │   └── get-started.md      # Section heading, code block, CTA labels
│   │
│   ├── data/                   # ── YAML STRUCTURED DATA ────────────────────
│   │   ├── pillars.yaml        # Array of 4 pillar objects (id, title, diagram)
│   │   ├── interfaces.yaml     # Array of 6 interface cards (name, icon, desc, href)
│   │   ├── ecosystem.yaml      # Project layers + per-project name, repo URL, desc
│   │   └── nav.yaml            # Nav links and footer links
│   │
│   ├── layouts/
│   │   └── Base.astro          # <html>, <head>, nav, footer, dark-mode init
│   │
│   ├── pages/
│   │   └── index.astro         # Imports content/data, composes sections in order
│   │
│   ├── components/             # ── LAYOUT SHELLS (no prose inside) ─────────
│   │   ├── Nav.astro           # Top nav bar; reads nav.yaml
│   │   ├── Intro.astro         # Above-the-fold section; receives intro.md props
│   │   ├── Problem.astro       # Problem section; receives problem.md props
│   │   ├── Pillars.astro       # Pillar band loop; iterates pillars.yaml
│   │   ├── PillarBand.astro    # Single pillar: number, heading, body, diagram slot
│   │   ├── Interfaces.astro    # Card grid; iterates interfaces.yaml
│   │   ├── InterfaceCard.astro # Single interface card
│   │   ├── Ecosystem.astro     # Ecosystem section; passes ecosystem.yaml to diagram
│   │   ├── GetStarted.astro    # Get started section; receives get-started.md props
│   │   └── Footer.astro        # Footer; reads nav.yaml footer links
│   │
│   ├── diagrams/               # ── SVG DIAGRAM COMPONENTS ───────────────────
│   │   ├── CoverageFlow.astro  # Above-the-fold: Sources → CovSight → Consumers
│   │   ├── FormatMatrix.astro  # Pillar A: format hub-and-spoke
│   │   ├── StorageSize.astro   # Pillar B: bar chart comparison
│   │   ├── TestplanFunnel.astro # Pillar C: format convergence funnel
│   │   ├── IntelligenceLoop.astro # Pillar D: verification feedback loop
│   │   └── EcosystemLayers.astro  # Ecosystem section: project layer diagram
│   │
│   └── styles/
│       └── global.css          # CSS custom properties for colors/theme
│
├── scripts/
│   └── gen-og.mjs              # Generates public/og-image.png at build time
│
├── WEBSITE_DESIGN.md
├── IMPLEMENTATION_PLAN.md
├── icons/                      # Existing icon assets (already present)
└── .github/
    └── workflows/
        └── deploy.yml          # Build + deploy to GitHub Pages
```

---

## Content File Specifications

### src/content/intro.md

```markdown
---
tagline: "Open coverage intelligence for every simulator, every workflow, every team."
mission: >
  CovSight is an open-source coverage intelligence platform that treats coverage
  data as a first-class engineering asset. It ingests coverage from any simulator
  — VCS, Questa, Xcelium, Verilator, cocotb, and more — stores it efficiently,
  links it to a structured testplan, and delivers actionable insights through the
  terminal, VS Code, CI pipelines, and AI agents. No license server. No proprietary
  lock-in. Coverage that works the way engineers actually work.
cta_primary:
  label: "Get Started"
  href: "https://docs.covsight.io/quickstart"
cta_secondary:
  label: "Browse on GitHub"
  href: "https://github.com/covsight"
badges:
  - "Apache-2.0"
  - "Python"
  - "TypeScript"
  - "C/C++"
---
```

### src/content/pillars.md

One `---` frontmatter block per pillar (or a YAML list), plus an optional
fenced code block for the Pillar C testplan snippet. Example for one pillar:

```markdown
---
section_heading: "Four Pillars"
pillars:
  - id: universal-interchange
    title: "One tool, every simulator."
    body: >
      CovSight reads coverage from VCS, Questa, Xcelium, Verilator, cocotb, and
      any UCIS-compliant source. It writes to LCOV, Cobertura, JaCoCo, and Clover
      for software CI integration. Conversion is lossless where formats allow,
      with explicit warnings when fidelity is reduced.
    diagram: FormatMatrix

  - id: efficient-storage
    title: "60× smaller. Version-control friendly."
    body: >
      NCDB achieves 60–73× size reduction over SQLite through LEB128 variable-length
      integers, toggle-pair compression, and schema-aware V2 encoding. A 150 MB UCIS
      XML database becomes under 2 MB. NCDB files are plain ZIP archives — portable,
      diffable, and safe to store as CI artifacts or in version control.
    diagram: StorageSize
    callout: "Test history · Flake scoring · Change detection · ZIP-portable"

  - id: testplan-as-code
    title: "Your testplan belongs in your repository."
    body: >
      CovSight defines a YAML-based superset testplan format that imports from
      OpenTitan Hjson, Cadence VPF XML, Synopsys VC Planner, and Siemens Questa
      Visualizer formats. Testplans live in the repo, are version-controlled,
      support wildcard expansion, composable imports, and direct bindings to
      coverage database paths for automated closure computation.
    diagram: TestplanFunnel

  - id: coverage-driven
    title: "Coverage tells you what to build next."
    body: >
      CovSight's analysis engine tracks per-test coverage contributions over time,
      identifies flaky tests using statistical scoring, and detects regressions with
      CUSUM change detection. The MCP server surfaces this data to AI agents, enabling
      natural-language queries about coverage gaps, test contributions, and what to
      verify next.
    diagram: IntelligenceLoop
---
```

### src/data/interfaces.yaml

```yaml
- id: cli
  name: "CLI"
  icon: terminal
  description: >
    covsight convert, merge, report, testplan — scriptable, composable, CI-ready.
  href: "https://docs.covsight.io/cli"

- id: tui
  name: "TUI"
  icon: dashboard
  description: >
    Interactive terminal UI with dashboard, hierarchy tree, coverage gaps,
    hotspots, and metrics views.
  href: "https://docs.covsight.io/tui"

- id: vscode
  name: "VS Code Extension"
  icon: vscode
  description: >
    Hierarchy tree, source gutter decorations, and a dashboard webview —
    works directly on .cdb files.
  href: "https://marketplace.visualstudio.com/items?itemName=covsight.coverage-explorer"

- id: github-actions
  name: "GitHub Actions"
  icon: actions
  description: >
    NCDB artifacts, job summaries, PR delta comments, and coverage check
    runs — first-class CI citizen.
  href: "https://docs.covsight.io/ci/github-actions"

- id: ai-agents
  name: "AI Agents (MCP)"
  icon: ai
  description: >
    17+ MCP tools expose coverage databases to LLM agents for natural-language
    analysis and next-step recommendations.
  href: "https://docs.covsight.io/mcp"

- id: python-api
  name: "Python API"
  icon: python
  description: >
    Full programmatic access to all coverage data, analysis, and format
    conversion via the covsight package.
  href: "https://docs.covsight.io/api"
```

### src/data/ecosystem.yaml

```yaml
layers:
  - name: "Applications & Interfaces"
    projects:
      - id: covsight
        label: "covsight"
        sublabel: "CLI + analysis server"
        repo: "https://github.com/covsight/covsight"
      - id: covsight-tui
        label: "covsight-tui"
        sublabel: "Terminal UI"
        repo: "https://github.com/covsight/covsight-tui"
      - id: covsight-mcp
        label: "covsight-mcp"
        sublabel: "MCP server"
        repo: "https://github.com/covsight/covsight-mcp"
      - id: covsight-vscode
        label: "covsight-vscode-ext"
        sublabel: "VS Code extension"
        repo: "https://github.com/covsight/covsight-vscode-ext"

  - name: "Format Adapters"
    projects:
      - { id: xml,        label: "covsight-xml",        repo: "..." }
      - { id: yaml,       label: "covsight-yaml",       repo: "..." }
      - { id: verilator,  label: "covsight-verilator",  repo: "..." }
      - { id: cocotb,     label: "covsight-cocotb",     repo: "..." }
      - { id: avl,        label: "covsight-avl",        repo: "..." }
      - { id: sqlite,     label: "covsight-sqlite",     repo: "..." }
      - { id: lcov,       label: "covsight-lcov",       repo: "..." }
      - { id: cobertura,  label: "covsight-cobertura",  repo: "..." }
      - { id: jacoco,     label: "covsight-jacoco",     repo: "..." }
      - { id: clover,     label: "covsight-clover",     repo: "..." }

  - name: "covsight-core"
    description: >
      UCIS data model · NCDB format · merge engine · testplan
      Python  ·  TypeScript  ·  C/C++
    repo: "https://github.com/covsight/covsight-core"
    highlight: true
```

---

## Phase 1 — Project Scaffolding

### 1.1 Initialize Astro project

```bash
cd covsight.github.io
npm create astro@latest . -- --template minimal --typescript strict --no-install
npm install
npx astro add tailwind
```

Add the `js-yaml` package for loading YAML data files in Astro frontmatter:

```bash
npm install js-yaml
npm install --save-dev @types/js-yaml
```

This generates:
- `astro.config.mjs` with Tailwind integration
- `tailwind.config.mjs`
- `tsconfig.json`
- `src/pages/index.astro` (stub)
- `src/env.d.ts`

### 1.2 Configure Astro for GitHub Pages

Edit `astro.config.mjs`:

```js
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  site: 'https://covsight.github.io',
  integrations: [tailwind()],
  output: 'static',
});
```

### 1.3 Configure Tailwind

Edit `tailwind.config.mjs`:

```js
export default {
  content: ['./src/**/*.{astro,html,js,ts}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: {
          50:  '#f0fdfa',
          100: '#ccfbf1',
          500: '#14b8a6',   // teal-500 — primary accent
          600: '#0d9488',
          700: '#0f766e',
          900: '#134e4a',
        },
        navy: {
          900: '#0a1628',
          800: '#0f1f3a',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'ui-monospace', 'monospace'],
      },
    },
  },
};
```

### 1.4 CSS custom properties (global.css)

```css
:root {
  --color-bg:         #ffffff;
  --color-bg-subtle:  #f8fafc;
  --color-text:       #0f172a;
  --color-text-muted: #64748b;
  --color-brand:      #0d9488;
  --color-brand-dim:  #ccfbf1;
  --color-border:     #e2e8f0;

  /* Diagram palette */
  --diag-source:   #94a3b8;
  --diag-core:     #0d9488;
  --diag-consumer: #f59e0b;
  --diag-bg:       #f8fafc;
}

.dark {
  --color-bg:         #0a1628;
  --color-bg-subtle:  #0f1f3a;
  --color-text:       #f1f5f9;
  --color-text-muted: #94a3b8;
  --color-brand:      #14b8a6;
  --color-brand-dim:  #134e4a;
  --color-border:     #1e3a5f;

  --diag-source:   #475569;
  --diag-core:     #14b8a6;
  --diag-consumer: #d97706;
  --diag-bg:       #0f1f3a;
}
```

### 1.5 Content collection schema (src/content/config.ts)

```ts
import { defineCollection, z } from 'astro:content';

const sections = defineCollection({
  type: 'data',
  schema: z.object({}).passthrough(),   // loose schema; tighten per-collection
});

export const collections = { sections };
```

Frontmatter schemas are progressively tightened per content file as
the components consuming them are built.

### 1.6 Base layout (Base.astro)

Responsible for:
- `<html lang="en">` with `class="dark"` injected by inline `<script>` that
  checks `localStorage` and `prefers-color-scheme`
- `<head>` with meta tags (charset, viewport, OG, description, canonical URL)
- Self-hosted Inter font preloads
- Plausible analytics `<script>`
- `<Nav />` and `<Footer />` wrappers around `<slot />`

### 1.7 GitHub Actions deployment workflow

`.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: pages
  cancel-in-progress: true

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 22
          cache: npm
      - run: npm ci
      - run: npm run build
      - uses: actions/upload-pages-artifact@v3
        with:
          path: dist/

  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deploy.outputs.page_url }}
    steps:
      - id: deploy
        uses: actions/deploy-pages@v4
```

**Repository setting required:** GitHub Pages source must be set to
"GitHub Actions" (not branch-based) in Settings → Pages.

---

## Phase 2 — Navigation & Shell

### 2.1 Nav component

Data source: `src/data/nav.yaml`

```yaml
links:
  - label: "Docs"
    href: "https://docs.covsight.io"
  - label: "Core Library"
    href: "https://docs.covsight.io/core"
  - label: "GitHub"
    href: "https://github.com/covsight"
    external: true
```

`Nav.astro` reads this file; no link labels or URLs are hardcoded in the
component. Behavior: fixed top bar, blurs background on scroll
(`backdrop-blur-md`), logo (inline `covsight-icon-v4.svg` + wordmark),
dark/light toggle, mobile hamburger drawer at `md:` breakpoint.

### 2.2 Footer component

Data source: same `nav.yaml` under a `footer_links` key. Footer renders
copyright line, Apache-2.0 badge, and project repo links — all from the
YAML file.

---

## Phase 3 — Above-the-Fold Section

### 3.1 Content source

`src/content/intro.md` (see Content File Specifications above).

`Intro.astro` reads the frontmatter, binds each field to the correct
HTML element. The component contains no hardcoded strings.

### 3.2 Layout

Full-viewport-height section. Two columns on desktop (text left, diagram
right), stacks vertically on mobile.

Left column renders: `<h1>` tagline, mission paragraph, two CTA buttons,
badge row — all from `intro.md` frontmatter.

Right column renders: `<CoverageFlow />` diagram.

### 3.3 CoverageFlow.astro diagram

Inline SVG (~520×360px viewBox). Three columns:

**Left — Input Sources:** VCS/Verdi (UCIS XML), Questa/Xcelium (UCDB),
Verilator (.dat), cocotb (XML/YAML), [+ more…]

**Center — CovSight Core:** Rounded rect with CovSight icon, label
"covsight-core", sub-labels "NCDB Storage · Merge · Analyze"

**Right — Consumers:** Terminal/TUI, VS Code Extension, CI Pipeline,
AI Agents (MCP), Python API

Arrows: animated dashed lines from inputs to center, solid lines from
center to consumers. CSS `stroke-dashoffset` keyframes; disabled for
`prefers-reduced-motion`. All colors via CSS custom properties.

---

## Phase 4 — The Problem Section

### 4.1 Content source

`src/content/problem.md`:

```markdown
---
heading: "Coverage analysis shouldn't be locked behind a license server."
intro: >
  Commercial EDA tools provide powerful coverage analytics but only within
  their own proprietary ecosystems. Open-source EDA has no equivalent — coverage
  means reading HTML reports or writing ad-hoc scripts. Teams using Verilator
  for CI and a commercial simulator for signoff have no way to unify their data.
comparison:
  - without: "Coverage locked in simulator-specific formats"
    with:    "Any format, one command"
  - without: "Analysis requires a proprietary GUI"
    with:    "Terminal, IDE, or CI — your choice"
  - without: "Testplans live in spreadsheets or vendor GUIs"
    with:    "Version-controlled YAML in your repo"
  - without: "Regressions produce GBs of raw data"
    with:    "Compact NCDB artifacts — KBs not GBs"
  - without: "Coverage history expires; trends are lost"
    with:    "Persistent test history with trend analysis"
---
```

### 4.2 Layout

`Problem.astro` renders heading + intro paragraph from frontmatter, then
iterates `comparison` rows into a two-column table. No prose in the
component file.

---

## Phase 5 — Four Pillars Section

### 5.1 Content source

`src/content/pillars.md` (see Content File Specifications above).

`Pillars.astro` reads the `pillars` array, iterates over it, and for each
entry renders a `<PillarBand>` with the heading and body text from the
YAML, plus the named diagram component resolved by the `diagram` key
(`FormatMatrix`, `StorageSize`, etc.).

### 5.2 PillarBand.astro

Accepts props: `number`, `title`, `body`, `callout?`. Renders pillar
number (large, faint, brand color), H3 title, body paragraph, optional
callout box, and a `<slot />` for the diagram. Alternates text/diagram
left–right on desktop.

### 5.3 FormatMatrix.astro (Pillar A)

Hub-and-spoke SVG. Input format nodes (left arc): UCIS XML, UCDB,
Verilator .dat, cocotb XML, cocotb YAML, AVL JSON. Output format nodes
(right arc): NCDB, LCOV, Cobertura, JaCoCo, Clover, UCIS XML. Bezier
curves through the central NCDB node. Nodes are rounded pills with a
category color band (EDA = slate, SW = purple, native = teal).

Format names are passed as props arrays so they can be updated from
`pillars.md` without touching the SVG math.

### 5.4 StorageSize.astro (Pillar B)

Horizontal bar chart SVG. Data rows (values drive bar widths as %):

| Label    | Relative | Absolute |
|----------|----------|----------|
| UCIS XML | 100%     | 150 MB   |
| SQLite   | 57%      | 85 MB    |
| NCDB V1  | 2.7%     | 4 MB     |
| NCDB V2  | 1.0%     | 1.5 MB   |

NCDB V2 bar is highlighted; annotation arrow: "60–73× smaller". Bar
widths animate in on scroll via `IntersectionObserver` + CSS transitions.
Data rows are passed as a prop array so numbers can be updated from
`pillars.md`.

### 5.5 TestplanFunnel.astro (Pillar C)

Convergence SVG: four input format nodes (OpenTitan Hjson, Cadence VPF
XML, Synopsys CSV/XML, Questa XML) converge to a central "CovSight
Testplan YAML" node, then branch to capability labels below. Below the
diagram: a syntax-highlighted YAML snippet (Shiki, from the `snippet`
field in `pillars.md`).

### 5.6 IntelligenceLoop.astro (Pillar D)

Circular flow SVG with 4 stages in a ring: Run Simulation → Collect
Coverage → Analyze Gaps → Prioritize & Write Tests → (back to start).
The two CovSight-owned stages (Collect, Analyze) use brand-teal fill.
A connector from Analyze Gaps points to a small "AI Agent / Engineer"
annotation node.

---

## Phase 6 — Works Where You Work Section

### 6.1 Content source

Section heading and intro from `src/content/interfaces.md` frontmatter.
Card data from `src/data/interfaces.yaml` (see Content File
Specifications above).

### 6.2 Layout

`Interfaces.astro` renders the heading/intro from content, then iterates
`interfaces.yaml` into a `<InterfaceCard>` per entry.

`InterfaceCard.astro` accepts props: `name`, `icon`, `description`,
`href`. Renders a 32px SVG icon, name (H4), one-sentence description,
and a docs link. Subtle border, hover lift. The `icon` prop is a key
that resolves to one of the small inline SVG icons defined in the
component (CLI `>_`, TUI grid, VS Code, Actions octocat, AI circuit,
Python logo). New icons can be added by extending that lookup table.

### 6.3 Screenshot (optional for v1)

A static screenshot of the TUI in a terminal-chrome mockup (black
rounded rect, three colored dots), placed below the card grid.
`loading="lazy"`. Can be deferred to a later PR.

---

## Phase 7 — Ecosystem Map Section

### 7.1 Content source

Section heading and intro from `src/content/ecosystem.md`. Layer data
and project metadata from `src/data/ecosystem.yaml`.

### 7.2 EcosystemLayers.astro

Receives the `layers` array as a prop. Renders a three-layer SVG
architecture diagram:

- **Layer 1 (top):** Application boxes; each is a clickable `<a>` linking
  to `repo` from the YAML.
- **Layer 2 (middle):** Format adapter boxes; same clickable links.
- **Layer 3 (bottom, full width, brand-teal fill):** covsight-core; links
  to its repo.

Connecting lines from layer 1 → 2 → 3. Adding a new project only
requires adding an entry to `ecosystem.yaml`.

---

## Phase 8 — Get Started Section

### 8.1 Content source

`src/content/get-started.md`:

```markdown
---
heading: "Up and running in one command."
code_block: |
  # Install CovSight
  pip install covsight

  # Convert a Verilator coverage database to NCDB
  covsight convert --input-format vltcov coverage.dat -o project.cdb

  # Explore interactively
  covsight show project.cdb
ctas:
  - label: "Full Documentation"
    href:  "https://docs.covsight.io"
    style: primary
  - label: "Quickstart Guide"
    href:  "https://docs.covsight.io/quickstart"
    style: secondary
  - label: "GitHub Organization"
    href:  "https://github.com/covsight"
    style: link
  - label: "VS Code Extension"
    href:  "https://marketplace.visualstudio.com/items?itemName=covsight.coverage-explorer"
    style: link
---
```

`GetStarted.astro` renders heading, a Shiki-highlighted code block from
`code_block`, and iterates `ctas` into styled buttons/links. No URLs or
labels hardcoded in the component.

### 8.2 Version badges

PyPI and npm version badges as `<img>` elements (shields.io SVG URLs).
Badges are constructed from the package names defined in `nav.yaml`
(not hardcoded in the component).

---

## Phase 9 — Open Graph Image

`scripts/gen-og.mjs` runs as a build step (added to `package.json`
`build` script before `astro build`). Uses `sharp` to composite:
- Dark navy background (1200×630)
- CovSight icon (centered, upper third)
- Tagline text (rendered via SVG text → rasterized)
- Subtle teal gradient border

Output: `public/og-image.png` (committed or generated at build time).

---

## Phase 10 — Accessibility & Performance Hardening

### 10.1 Accessibility checklist

- All SVG diagrams have `role="img"` and `aria-label` on the `<svg>`
- All interactive SVG links (`<a>`) have `:focus-visible` ring styles
- Color is never the sole differentiator (shape/label always present)
- All images have descriptive `alt` attributes
- Code blocks have `aria-label="Code example"` on the `<pre>`
- Nav is keyboard-navigable; mobile menu toggles `aria-expanded`
- Skip-to-content link is the first focusable element
- Audit with `axe-core` browser extension before shipping

### 10.2 Performance targets

- Lighthouse mobile ≥ 90 across all four categories
- Total page weight ≤ 200 KB compressed (HTML + CSS + JS; images separate)
- Fonts: `font-display: swap`; preload Inter regular and semibold only
- Images: `loading="lazy"` on below-fold images; serve `.webp` + `.png`
- No render-blocking scripts; Plausible deferred; dark-mode toggle is
  a ~200-byte inline script only

### 10.3 SEO meta tags

```html
<title>CovSight — Open Coverage Intelligence</title>
<meta name="description"
  content="Open-source coverage intelligence for every simulator. NCDB compact
  storage, universal format support, testplan-as-code, CLI/TUI/VSCode/CI/AI
  interfaces. No license server.">
<meta property="og:title"   content="CovSight">
<meta property="og:image"   content="https://covsight.github.io/og-image.png">
<meta property="og:type"    content="website">
<link rel="canonical"       href="https://covsight.github.io/">
```

---

## Phase 11 — Content Review Gate (before merging to main)

**Content checklist (from design doc §10):**
- [ ] Open source / Apache-2.0 mentioned
- [ ] Simulator-agnostic claim with named examples
- [ ] NCDB: 60–73× compression figure with context
- [ ] Testplan as YAML in repo
- [ ] Superset format imports from OpenTitan, Cadence, Synopsys, Siemens
- [ ] All 6 interface types present (CLI, TUI, VS Code, GitHub Actions, MCP, Python)
- [ ] No license server / no per-seat fees
- [ ] AI-native / MCP / 17+ tools mentioned
- [ ] Test history + flake scoring + change detection mentioned
- [ ] Modular ecosystem described (covsight-core as foundation)

**Technical checklist:**
- [ ] `npm run build` passes with no errors or warnings
- [ ] Lighthouse ≥ 90/100/100/100 on mobile
- [ ] Dark mode correct in Chrome and Firefox
- [ ] All external links resolve (check with `lychee` or manual audit)
- [ ] Favicon appears in browser tab
- [ ] OG image renders correctly (test via opengraph.xyz)
- [ ] Mobile layout correct at 375px viewport (iPhone SE)
- [ ] No JS console errors in browser

---

## Work Order (recommended PR sequence)

| PR | Phases | Goal |
|---|---|---|
| #1 | 1 | Scaffold Astro + Tailwind + deploy workflow. Deploys a placeholder page to confirm pipeline works end-to-end. |
| #2 | 2 | Nav + Footer + Base layout. Create `nav.yaml`; verify links render correctly. |
| #3 | 3 | Above-the-fold section. Author `intro.md`; build `Intro.astro` + `CoverageFlow.astro`. |
| #4 | 4 | Problem section. Author `problem.md`; build `Problem.astro`. |
| #5 | 5 | Four Pillars. Author `pillars.md`; build all four diagram components. |
| #6 | 6 | Works Where You Work. Author `interfaces.md` + `interfaces.yaml`; build card grid. |
| #7 | 7 | Ecosystem Map. Author `ecosystem.md` + `ecosystem.yaml`; build `EcosystemLayers.astro`. |
| #8 | 8 + 9 | Get Started section. Author `get-started.md`; build section + OG image script. |
| #9 | 10 + 11 | Accessibility / performance hardening + full content review pass. |

---

## npm Dependencies

```json
{
  "dependencies": {
    "js-yaml": "^4.x"
  },
  "devDependencies": {
    "astro":             "^4.x",
    "@astrojs/tailwind": "^5.x",
    "tailwindcss":       "^3.x",
    "typescript":        "^5.x",
    "sharp":             "^0.33.x",
    "@types/js-yaml":    "^4.x"
  }
}
```

No runtime JS framework (React, Vue, etc.) required. Client-side JavaScript
is limited to three things:
1. ~200-byte inline dark-mode init script
2. ~500-byte `IntersectionObserver` for bar chart animation (Pillar B)
3. Plausible analytics (deferred, external)

---

## Open Questions / Decisions Needed

1. **Custom domain:** The site is at `covsight.github.io`. If `covsight.io` or
   `covsight.dev` is acquired, only `astro.config.mjs` `site` URL and a `CNAME`
   file in `public/` need to change.

2. **Docs URLs:** Several CTAs point to `docs.covsight.io`. Until that site is
   deployed, they should point to the GitHub repository READMEs.

3. **TUI screenshot:** A real screenshot of the TUI running against a sample
   database would significantly improve credibility. Requires a working
   `covsight` install and a sample `.cdb` file.

4. **VS Code Extension:** The Marketplace link needs a real URL once published.
   Until then, link to the `coverage-explorer` GitHub repo instead.

5. **Confirmed icon:** `covsight-icon-v4.svg` exists in `covsight-core/branding/`.
   Confirm v4 is the approved icon before using it as favicon and nav logo. A
   horizontal wordmark SVG (icon + "CovSight" text) will also need to be created
   for the nav bar.

6. **Font choice:** Inter is assumed. If a different typeface is preferred,
   update `tailwind.config.mjs` and the font preload links in `Base.astro`.
