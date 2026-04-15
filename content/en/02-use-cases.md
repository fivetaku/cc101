# 02. What You Can Do with Claude Code

> Despite the name "Code," Claude Code is not a coding-only tool. It's a **general-purpose AI agent** that runs on top of a terminal.

---

## First: How Is It Different from the Web UI (Claude.ai)?

| | Claude.ai (Web) | Claude Code (Terminal) |
|--|----------------|----------------------|
| File access | Attach files only | Read & modify entire folders |
| Work scope | One conversation | Dozens of files simultaneously |
| External execution | Not possible | Run terminal commands directly |
| Automation | Manual every time | Automate with Skills & Hooks |
| Memory | Within conversation only | Permanent memory via CLAUDE.md |

In short: **If Claude.ai is a conversation partner, Claude Code is an AI colleague working inside your computer.**

---

## In a Development Context

### Code Writing & Management
Code writing, bug fixing, refactoring, testing, code review — you can give natural language instructions for all the tasks developers are familiar with.

### Vibe Coding — Build Software Without Knowing Code

"Coding by vibe." **A method of building software by giving natural language instructions to AI instead of writing code yourself.** Named by Andrej Karpathy (former Tesla AI Director) in 2025.

| | Developer | Vibe Coder |
|--|----------|-----------|
| Code writing | Writes code directly | Instructs AI |
| Debugging | Analyzes error messages → fixes | "This is throwing an error, fix it" |
| Core role | Implementation | **Planning & review** |
| Key skill | Programming languages | **Clear requirement communication** |

The most important thing in vibe coding isn't coding skill — it's **"the ability to clearly explain what you want to build."**

**What you can really do**: Prototypes, MVPs, personal tools, websites, simple apps, data processing automation. **This very site (CC101) was built with vibe coding.**

**Honest limitations**: Large-scale production services still require expert developer review. For security, payments, and other sensitive logic, always get a professional review. Start with vibe coding, but as the service grows, collaborating with developers is the smart move.

### Tips for Better Vibe Coding

1. **Planning is half the battle** — "Build me an app" gives far worse results than "Build a web app that organizes photos by date." The show-me-the-prd plugin can auto-generate project requirement docs.
2. **Start small and build up** — Don't demand a finished product all at once. "Login screen first" → "Now the list page" — go incrementally.
3. **Check the results yourself** — Always run and verify what the AI has built.
4. **Don't fear mistakes** — With Git saves, you can always roll back.

---

## In a Non-Development Context

**Claude Code can do far more than vibe coding.** Regardless of coding, you can give natural language instructions for almost any task a computer can do.

### Research & Analysis
- Read multiple web pages simultaneously and organize into markdown
- Competitor analysis, market research, tech trend tracking
- Batch summarize dozens of PDFs and documents

> The **deep-research** plugin lets multi-agents investigate multiple sources in parallel and automatically generate comprehensive reports.

### Documents & Content Creation
- Blog posts, newsletters, social media content drafts
- Proposals, reports, presentation outlines
- Korean ↔ English translation saved directly to files

### Data Processing
- Analyze and convert CSV, Excel files — **no Python required**
- Batch process hundreds of files (rename, convert, organize)
- Parse and transform JSON, XML data

### Learning Assistant
- Structure and summarize lecture materials or books
- Auto-generate quizzes and flashcards
- Concepts + examples + practice problems

### Business Workflows
- Meeting transcripts → summary + decisions + action items per person
- Weekly/monthly report automation
- Email drafts, customer response templates

### Personal AI Workspace
Define roles and rules in CLAUDE.md, and you have **your own AI agent system** — not just a chat tool.
→ Covered in detail in the Designing Your Personal AI Workspace section

---

## Real Example: How CC101 Was Built

> **Not a single line of code was written by hand**

**Planning**
"I want to build a Korean Claude Code guide like Codex 101"
→ 3 AIs (Claude, Codex, Gemini) debated section structure, UX, and tech stack in an ideation workspace
→ 23-section structure decided

**Content**
57 official docs collected → Claude extracted key content → structured into Korean & English markdown

**Development**
Full Next.js site code → written by Claude Code
Dark/light mode, language toggle, mobile support → all through conversation

**Deployment**
Vercel deployment, Cloudflare DNS setup, domain connection → handled by Claude Code

**Operations & Refinement**
After the first draft, the user reviewed the content and kept improving it through conversation — "add this part", "rewrite this differently"
**This very conversation is a CC101 update session**

---

## Real Non-Developer Use Case

```
Situation: Need to write up meeting notes every week after team calls

Old way:
  Meeting ends → organize notes 30 min → write email 10 min → share

Claude Code way:
  Paste meeting transcript
  → "Summarize, list decisions, and sort action items by person"
  → Saved as markdown file + email draft generated automatically
  Total time: 3 minutes
```

---

> Claude Code is **not a coding tool — it's a general-purpose AI agent.** Coding is just one of the many things it can do.
