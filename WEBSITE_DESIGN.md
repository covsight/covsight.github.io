# CovSight Overview Website — Content Design Document

**Purpose:** Design the content, structure, messaging, and diagrams for the
CovSight intro/overview website at covsight.github.io. This site serves as the
front door for new visitors and points them to more detailed documentation hosted
by individual projects (covsight, covsight-core, etc.).

---

## 1. Audience & Goals

### Primary Audiences

| Audience | Context | What They Need |
|---|---|---|
| Verification engineers | Open-source or mixed EDA flows | A tool that fills the gap left by closed commercial suites |
| DevOps / CI engineers | Setting up or improving verification CI pipelines | Lightweight, scriptable, zero-license-server |
| Engineering managers | Tracking project verification progress | Actionable metrics, testplan closure, trend data |
| Open-source contributors | Looking for a meaningful OSS EDA project | Welcoming architecture docs, clear contribution path |

### Goals of This Page

1. **Communicate the mission** in one sentence people can repeat to a colleague.
2. **Build credibility** — show this is a real, mature project with a clear
   technical foundation.
3. **Differentiate** from commercial alternatives (without being adversarial).
4. **Orient the visitor** — where to go next (covsight docs, covsight-core docs,
   GitHub, etc.).

---

## 2. Mission Statement & Tagline

### Proposed Tagline

> **Open coverage intelligence for every simulator, every workflow, every team.**

### Mission Statement (one paragraph, for the hero section)

> CovSight is an open-source coverage intelligence platform that treats coverage
> data as a first-class engineering asset. It ingests coverage from any simulator
> — VCS, Questa, Xcelium, Verilator, cocotb, and more — stores it efficiently,
> links it to a structured testplan, and delivers actionable insights through the
> terminal, VS Code, CI pipelines, and AI agents. No license server. No
> proprietary lock-in. Coverage that works the way engineers actually work.

---

## 3. Page Structure

```
┌─────────────────────────────────────────────────────────────┐
│  HERO                                                       │
│  Tagline + mission statement + CTA buttons                  │
│  [ Diagram: "Sources → CovSight → Consumers" flow ]         │
├─────────────────────────────────────────────────────────────┤
│  SECTION 1: THE PROBLEM                                     │
│  Why coverage tooling is broken today                       │
├─────────────────────────────────────────────────────────────┤
│  SECTION 2: FOUR PILLARS                                    │
│  (one card/panel per pillar, each with a diagram)           │
│   Pillar A — Universal Coverage Interchange                 │
│   Pillar B — Efficient Storage at Scale                     │
│   Pillar C — Structured Testplan as Code                    │
│   Pillar D — Coverage-Driven Verification                   │
├─────────────────────────────────────────────────────────────┤
│  SECTION 3: WORKS WHERE YOU WORK                            │
│  Interfaces: CLI · TUI · VS Code · CI · AI agents           │
├─────────────────────────────────────────────────────────────┤
│  SECTION 4: ECOSYSTEM MAP                                   │
│  Project overview: covsight-core, covsight, extensions,     │
│  format adapters — with links to their docs                 │
├─────────────────────────────────────────────────────────────┤
│  SECTION 5: GET STARTED                                     │
│  Quick install snippet, links to docs                       │
├─────────────────────────────────────────────────────────────┤
│  FOOTER                                                     │
│  GitHub links, license (Apache-2.0), community             │
└─────────────────────────────────────────────────────────────┘
```

---

## 4. Section Details

### 4.1 Hero Section

**Headline:** Open coverage intelligence for every simulator, every workflow, every team.

**Sub-headline:** CovSight bridges commercial and open-source EDA, bringing coverage
analytics to the terminal, IDE, CI pipeline, and AI — without proprietary lock-in or
license servers.

**CTA buttons:**
- [Get Started →] → links to Quick Start in covsight docs
- [Browse on GitHub →] → links to github.com/covsight

**Hero Diagram: The Coverage Data Flow**

```
     INPUT SOURCES                COVSIGHT CORE               CONSUMERS
  ┌──────────────────┐                                    ┌──────────────┐
  │  VCS / Verdi     │──┐                            ┌──▶│  Terminal /  │
  │  (UCIS XML)      │  │                            │   │  TUI         │
  └──────────────────┘  │   ┌─────────────────┐     │   └──────────────┘
  ┌──────────────────┐  ├──▶│   covsight-core  │─────┤   ┌──────────────┐
  │  Questa / Xcelium│  │   │   NCDB Storage   │     ├──▶│  VS Code     │
  │  (UCDB)          │  │   │   Merge Engine   │     │   │  Extension   │
  └──────────────────┘  │   │   Analysis Layer │     │   └──────────────┘
  ┌──────────────────┐  │   └─────────────────┘     │   ┌──────────────┐
  │  Verilator       │──┤                            ├──▶│  CI Pipeline │
  │  (.dat)          │  │                            │   │  (GitHub     │
  └──────────────────┘  │                            │   │   Actions)   │
  ┌──────────────────┐  │                            │   └──────────────┘
  │  cocotb          │──┘                            │   ┌──────────────┐
  │  (XML/YAML)      │                               └──▶│  AI Agents   │
  └──────────────────┘                                   │  (MCP)       │
                                                         └──────────────┘
```

MSB: We don't need to be specific about the formats. Just communicate that
data import is possible from closed- and open-source tools.

This diagram should be rendered as a clean SVG with the CovSight logo/branding
in the center node. Color coding: inputs in one color, core in accent color,
consumers in a third color.

---

### 4.2 Section 1: The Problem

**Heading:** Coverage analysis shouldn't be locked behind a license server.
MSB: let's lean into "open" over "free" (license server). We want the freedom
to work with our data, without being locked in a closed-source proprietary walled garden.

Short paragraph (~60 words) covering:
- Commercial tools (VCS/URG, Questa/VIQ, Cadence/vManager) provide powerful
  coverage analytics but only within their own proprietary ecosystems
- Open-source EDA has no equivalent — coverage means reading HTML reports or
  writing ad-hoc scripts
- Teams using Verilator for CI and a commercial simulator for signoff have no
  way to unify their data
- Coverage lives in files, not in the hands of engineers who need it

**Supporting visual:** Simple comparison table or 2-column layout showing
"Today without CovSight" vs "With CovSight"

| Without CovSight | With CovSight |
|---|---|
| Coverage locked in simulator-specific formats | Any format, one command |
| Analysis requires proprietary GUI | Terminal, IDE, or CI — your choice |
| Testplans in spreadsheets or GUIs | Version-controlled YAML in your repo |
| Regressions are GBs of raw data | Compact NCDB artifacts — KBs not GBs |
| Coverage data expires; history lost | Persistent test history with trend analysis |

---

### 4.3 Section 2: Four Pillars

Present each pillar as a full-width card with a title, short description (~50 words),
and a supporting diagram.

---

#### Pillar A — Universal Coverage Interchange

**Title:** One tool, every simulator.

**Description:** CovSight reads coverage from VCS, Questa, Xcelium, Verilator,
cocotb, and any UCIS-compliant source. It writes to LCOV, Cobertura, JaCoCo, and
Clover for software CI integration. Conversion is lossless where formats allow,
with explicit warnings when fidelity is reduced.

MSB: We need to lean into our Accellera UCIS support. We're not just inventing
a new API: we're leveraging and building on top of an industry standard.

**Diagram: Format Compatibility Matrix**

A grid or hub-and-spoke diagram showing all supported input formats (left) and
output formats (right), with covsight-core at the hub. Labels for each format
bubble (UCIS XML, UCDB, Verilator .dat, cocotb XML, cocotb YAML, LCOV, Cobertura,
JaCoCo, Clover, NCDB).

Suggested visual treatment: each format as a small pill/badge, grouped by category
(EDA simulators, SW coverage, CovSight native). The arrows or connections pass
through the central NCDB storage node.

---

#### Pillar B — Efficient Storage at Scale

**Title:** 60× smaller. Version-control friendly.

**Description:** NCDB (the CovSight native binary format) achieves 60–73× size
reduction over SQLite through LEB128 variable-length integers, toggle-pair
compression, and schema-aware V2 encoding. A 150 MB UCIS XML database becomes
under 2 MB. NCDB files are plain ZIP archives — portable, diffable, and safe
to store as CI artifacts or in version control.

**Diagram: Storage Size Comparison**

A horizontal bar chart showing the same coverage dataset at multiple storage
representations:

```
  UCIS XML     ████████████████████████████████████████   150 MB
  SQLite       ███████████████████████                     85 MB
  NCDB (V1)    ██                                           4 MB
  NCDB (V2)    █                                          1.5 MB
```

MSB: Treat NCDB as unified -- only one version

Use the actual measured compression ratios from the architecture docs (60–73×).
The visual emphasis should be on the dramatic size difference for NCDB V2.

Additionally, a small callout box noting: "NCDB includes built-in test history
with time-bucketed storage, flake scoring (Welford-based), and CUSUM change
detection — covering the full regression lifecycle in one file."

---

#### Pillar C — Testplan as Code

**Title:** Your testplan belongs in your repository.

**Description:** CovSight defines a YAML-based superset testplan format that
imports from OpenTitan Hjson, Cadence VPF XML, Synopsys VC Planner, and Siemens
Questa Visualizer formats. Testplans live in the repo, are version-controlled,
support wildcard expansion, composable imports, and direct bindings to coverage
database paths for automated closure computation.

**Diagram: Testplan Format Convergence**

A funnel or merge diagram showing existing industry formats flowing into the
CovSight superset format:

```
  OpenTitan Hjson   ──┐
  Cadence VPF XML   ──┤──▶  CovSight Testplan (YAML/JSON)
  Synopsys CSV/XML  ──┤         │
  Questa XML        ──┘         ├── version-controlled in repo
                                ├── coverage DB path binding
                                ├── wildcard test expansion
                                ├── composable imports
                                └── CI closure gate
```

Add a small code snippet showing a minimal CovSight testplan YAML to make it
concrete (3–5 lines, something like name, description, one testpoint with a
coverage binding).

**Key callout:** Testplan closure becomes a CI gate — a pull request fails if
coverage drops below the target.

---

#### Pillar D — Coverage-Driven Verification

**Title:** Coverage tells you what to build next.

**Description:** CovSight's analysis engine goes beyond static reports. The test
history layer tracks per-test coverage contributions over time, identifies flaky
tests using statistical scoring, and detects regressions with CUSUM change
detection. The MCP server surfaces this data to AI agents, enabling natural-language
queries like "which module has the most uncovered functional bins?" or "what tests
contributed coverage last week?"

**Diagram: The Coverage Intelligence Loop**

A circular or figure-eight flow diagram showing the verification feedback loop:

```
         ┌──────────────────────────────────────┐
         │                                      ▼
   [ Run Simulation ]                   [ Analyze Coverage ]
         │                                      │
         │                              [ Identify Gaps ]
         │                                      │
   [ Write Tests ] ◀────────────────── [ Prioritize Work ]
                                               │
                             [ AI Agent / Engineer reviews ]
                             [ CovSight testplan + data ]
```

The diagram should emphasize that CovSight provides input at the "Identify Gaps"
and "Prioritize Work" stages — this is where the tool changes the verification
workflow, not just reports on it.

---

### 4.4 Section 3: Works Where You Work

**Heading:** Coverage in the interface you're already using.

Present as a 4-column (or 2×2) grid of interface cards, each with an icon,
name, and one-sentence description and a link to the relevant docs.

| Interface | Icon | Description |
|---|---|---|
| **CLI** | Terminal icon | `covsight convert`, `merge`, `report`, `testplan` — scriptable, composable, CI-ready |
| **TUI** | Dashboard icon | Full interactive terminal UI with dashboard, hierarchy tree, coverage gaps, hotspots, and metrics views |
| **VS Code Extension** | VS Code icon | Coverage-explorer extension: hierarchy tree, source gutter decorations, dashboard webview — works directly on `.cdb` files |
| **GitHub Actions** | Octocat/workflow icon | NCDB artifacts, job summaries, PR delta comments, coverage check runs — first-class CI citizen |
| **AI Agents (MCP)** | Robot/AI icon | 17+ MCP tools expose coverage databases to LLM agents for natural-language analysis and next-step recommendations |
| **Python API** | Python icon | Full programmatic access to all coverage data, analysis, and format conversion via the `covsight` package |

A screenshot or terminal recording (animated GIF) in this section showing the
TUI or CLI in action would add credibility.

---

### 4.5 Section 4: Ecosystem Map

**Heading:** A modular ecosystem — use what you need.

Short intro (~40 words): CovSight is organized as a family of focused, independently
installable packages. Start with the CLI; add format adapters for your simulators;
extend with the VS Code extension or CI integration as your workflow matures.

**Diagram: Project Dependency Map**

A layered architecture diagram:

```
  ┌─────────────────────────────────────────────────────────────────┐
  │  APPLICATIONS / INTERFACES                                       │
  │  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────────┐   │
  │  │ covsight │  │covsight- │  │covsight- │  │  covsight-   │   │
  │  │  (CLI +  │  │   tui    │  │   mcp    │  │  vscode-ext  │   │
  │  │  server) │  │          │  │          │  │              │   │
  │  └────┬─────┘  └────┬─────┘  └────┬─────┘  └──────┬───────┘   │
  └───────┼──────────────┼─────────────┼────────────────┼───────────┘
          │              │             │                │
  ┌───────▼──────────────▼─────────────▼────────────────▼───────────┐
  │  FORMAT ADAPTERS                                                  │
  │  covsight-xml  covsight-verilator  covsight-cocotb  covsight-    │
  │  covsight-yaml covsight-lcov       covsight-avl     sqlite       │
  │  covsight-cobertura  covsight-jacoco  covsight-clover            │
  └───────────────────────────────┬─────────────────────────────────┘
                                  │
  ┌───────────────────────────────▼─────────────────────────────────┐
  │  covsight-core                                                    │
  │  UCIS data model · NCDB format · merge engine · testplan         │
  │  Python  ·  TypeScript  ·  C/C++                                 │
  └─────────────────────────────────────────────────────────────────┘
```

Each box should link to the corresponding GitHub repository or documentation site.

---

### 4.6 Section 5: Get Started

**Heading:** Up and running in one command.

```bash
pip install covsight

# Convert a Verilator coverage database to NCDB
covsight convert --input-format vltcov coverage.dat -o project.cdb

# Explore interactively
covsight show project.cdb

# Generate a coverage report
covsight report project.cdb
```

**CTA links:**
- [Full Documentation →]
- [Quickstart Guide →]
- [GitHub →]
- [VS Code Extension →] (links to VS Code Marketplace)

---

## 5. Diagram Design Principles

All diagrams on the site should follow these principles for visual consistency:

1. **Minimal and clean.** Use generous whitespace. Avoid grid lines or decorative
   chrome. Information density should be low enough to parse in 3 seconds.

2. **Color system:**
   - **Input sources / external formats:** slate/cool gray
   - **CovSight core:** primary brand color (e.g., deep blue or teal)
   - **Consumer / output:** warm neutral or lighter accent
   - **Highlights / callouts:** orange or amber accent

3. **SVG-first.** All diagrams should be SVG for crisp rendering at any DPI.
   Prefer inline SVG in the HTML so they can be styled with CSS and themed
   for dark/light mode.

4. **Accessible.** All color distinctions must also be distinguishable via shape
   or label (not color alone). Include `aria-label` on diagram containers.

5. **Responsive.** Diagrams should reflow or scale for mobile. The Coverage Data
   Flow hero diagram can collapse to a vertical stack on narrow viewports.

MSB: Note that you should match the look/feel of the icons in ./icons/

---

## 6. Tone and Voice

- **Precise, not breathless.** Avoid "revolutionary" or "game-changing." Let
  the technical specifics (60× compression, 17+ MCP tools) do the work.
- **Inclusive.** Address both EDA-expert readers and software engineers
  approaching from CI/coverage backgrounds.
- **Direct.** Short sentences. Active voice. No marketing fluff.
- **Show, don't just tell.** Every claim should be backed by a concrete example,
  number, or diagram.

---

## 7. Navigation / Header

The site header should include:

| Link | Destination |
|---|---|
| **CovSight** (logo) | / (home) |
| Docs | covsight project docs |
| Core Library | covsight-core docs |
| GitHub | github.com/covsight |
| VS Code Extension | VS Code Marketplace listing |

Keep the nav minimal — this is an overview site, not a documentation portal.
The docs link is the most important CTA after "GitHub".

---

## 8. Future Sections (not in v1)

These sections should be added as the corresponding projects mature:

- **GitHub App & Checks** — dedicated section once the GitHub App is published
- **Changelog / What's New** — feed from GitHub releases
- **Community** — Discord/Matrix link, contributing guide
- **Case Studies** — anonymized examples of projects using CovSight in CI
- **Roadmap** — public roadmap once the overall project structure stabilizes

---

## 9. Technical Implementation Notes

- **Static site.** Use a static site generator (e.g., Astro, Eleventy, or plain
  HTML + Tailwind CSS). The site has no dynamic data requirements.
- **Dark mode.** Support `prefers-color-scheme: dark`. The SVG diagrams should
  use CSS variables for colors to enable theming.
- **Open Graph / SEO.** Include `og:title`, `og:description`, `og:image` meta
  tags. The hero diagram or a clean CovSight logo card serves as the OG image.
- **Performance.** Inline critical CSS. Lazy-load below-the-fold SVGs. Target
  Lighthouse score ≥ 90 on mobile.
- **Analytics.** Use privacy-respecting analytics (Plausible or GoatCounter),
  not Google Analytics.

MSB: We're publishing this to Github Pages using Github Actions. Content should
be in a markdown (not HTML) format to enable easy editing.

---

## 10. Key Messages Checklist

The final page content should clearly communicate all of the following:

- [ ] CovSight is open source (Apache-2.0 license)
- [ ] Works with all major simulators, not just one ecosystem
- [ ] NCDB: compact binary format, 60–73× smaller than SQLite / XML
- [ ] Testplans are YAML in your repo, not a spreadsheet in a GUI
- [ ] CovSight superset testplan imports from OpenTitan, Cadence, Synopsys, Siemens formats
- [ ] CLI + TUI + VS Code extension + GitHub Actions + MCP server — all interfaces covered
- [ ] No license server, no per-seat fees
- [ ] AI-native: 17+ MCP tools for LLM agent integration
- [ ] Test history with flake scoring and change detection
- [ ] Modular: use only what you need (covsight-core is the foundation, adapters are optional)
