# 19. Designing Your Personal AI Workspace

> Now that you've learned CLAUDE.md, Skills, and Hooks — it's time to combine them. Here's how to build your own automated office, not just an AI tool.

---

## What Is a Workspace?

**Typical AI use**: "Question → Answer" (starting from scratch every time)

**Workspace**: A system where an AI with a defined role operates consistently using your own rules

Components:

```
CLAUDE.md     → AI role, rules, and knowledge (long-term memory)
Folder structure → A structure where work accumulates systematically
Skills        → Automation for repetitive tasks (/commands)
Hooks         → Automatic quality checks
```

---

## Core Design Philosophy

> "Don't put everything in CLAUDE.md. Distribute to Skills, enforce with Hooks."

- **CLAUDE.md**: Unchanging role and principles
- **Skills**: Recurring task workflows
- **Hooks**: Quality standards that must never be missed

---

## Workspace Examples by Use Case

### Research Workspace

```
CLAUDE.md essentials:
  - No claims without sources
  - Tag all information with source grade (A~E)
  - Auto-save research to /reports folder

Folder structure:
  inbox/      → Reference materials
  reports/    → Completed research
  sources/    → Source collection

Skills:
  /research [topic]  → Web search → organize → save
  /summary [file]    → Summarize document
```

### Content Creation Workspace

```
CLAUDE.md essentials:
  - Brand tone definition (e.g., friendly and practical, minimal jargon)
  - Target audience definition
  - Content format templates

Folder structure:
  drafts/     → Drafts
  published/  → Published content
  templates/  → Reusable formats

Skills:
  /blog [topic]       → Blog post draft
  /newsletter [content] → Newsletter format conversion
  /sns [content]      → Instagram/Twitter version
```

### Business Workflow

```
CLAUDE.md essentials:
  - Company/team info, current project status
  - Email style (formal/friendly level)
  - Report format templates

Skills:
  /meeting [transcript] → Summary + decisions + action items by person
  /report [topic]       → Weekly report draft
  /email [situation]    → Email draft
```

---

## Real Case Study: The Ideation Workspace

Here's the actual workspace where CC101 (this site) was built.

### Core CLAUDE.md Content

```markdown
# Ideation Workspace

## Role
AI partner for discovering, validating, and executing ideas

## Core Principles
- Korean only
- No claims without research (prevent hallucination)
- Source grades required on all information (A~E)
- No "probably will work" without validation
- All ideas must be documented (prevent loss)

## Validation Method
4-Persona Council:
- Visionary: potential and vision
- Pragmatist: feasibility and resources
- Critic: risks and weaknesses
- User Advocate: user value

## Folder Structure
10-inbox/      → Reference materials
20-sparks/     → Idea capture
30-research/   → Research results
40-foundry/    → Validation results
50-blueprints/ → MVP design
60-ventures/   → Active projects
70-playbook/   → Accumulated experience
90-shelf/      → On-hold ideas
```

### Skills in Use

```
/spark [idea]       → Capture idea + ICE score evaluation
/research [topic]   → 7-step deep research
/validate           → 4-persona Council validation
/insight [content]  → Save lesson to Playbook
```

### What Was Built in This Workspace

- CC101 idea capture and validation
- 3-AI section structure debate (agent-council)
- 57 official docs researched
- Next.js site developed and deployed
- Ongoing improvements through continued conversation

---

## Building Your Own Workspace — 4 Steps

### Step 1: Define Your Purpose

```
Ask yourself:
□ What tasks do I repeat regularly?
□ What role do I want the AI to play?
□ What rules do I want consistently enforced?
□ Where should the output accumulate?
```

### Step 2: Write Your CLAUDE.md

Minimum template (copy and start):

```markdown
# [Workspace Name]

## Role
[Role and purpose to assign to AI — 1-2 sentences]

## Core Rules
- [Must always do 1]
- [Must always do 2]
- [Must never do]

## Folder Structure
- [folder]/  → [purpose]
- [folder]/  → [purpose]

## Main Workflow
[Description of recurring workflow]
```

### Step 3: Set Up Folder Structure

Using number prefixes keeps folders in order:

```bash
mkdir -p 01-inbox 02-work 03-output 04-archive
```

### Step 4: Turn Repetitive Tasks into Skills

If you're doing the same task 3+ times, make it a Skill.
→ Creating Skills is covered in the Skills & Building Plugins section

---

## Combining with MCP

Connecting MCP to your workspace makes it dramatically more powerful:

| MCP | Use Case |
|-----|----------|
| Web Search | Automated research |
| GitHub | Code management automation |
| Slack | Team communication integration |
| Google Sheets | Automatic data aggregation |

→ MCP connections are covered in the MCP & Integrations section

---

> A workspace is never finished in one go. When something feels inconvenient, update CLAUDE.md. When you notice a repetitive task, add a Skill. Over time, it evolves to fit you perfectly.
