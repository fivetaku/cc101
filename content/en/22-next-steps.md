# 22. Next Steps & Resources

> You've finished CC101. Now the real journey begins.

---

## You Made It

You've completed the full CC101 curriculum — from Claude Code basics all the way through advanced automation. That's no small thing. You now have the foundation to actually use AI-powered development tools in your daily work.

Here's a quick look at what you covered:

- What Claude Code is and how it works
- Installation and authentication setup
- Customizing projects with CLAUDE.md
- Core commands and workflows
- Connecting external tools with MCP
- Automating with Hooks and Skills
- Exploring the plugin ecosystem
- Managing and optimizing costs
- Headless mode and CI/CD integration

This isn't just learning a new tool. You've picked up a new way of developing software — one where you collaborate with AI.

---

## Learning Path

### Beginner Complete (You Are Here)

```
✅ Install & authenticate Claude Code
✅ Write a CLAUDE.md file
✅ Core commands (/help, /cost, /compact, /model)
✅ Read files, edit code, run tests
✅ Basic plugin usage
```

---

### Intermediate Goals

**Build Your Own Workflow Automation**
- Combine CLAUDE.md + Hooks + Skills to turn repetitive tasks into one command
- Example: auto-generate weekly reports, automate code reviews, meeting notes pipeline

**Plugin Pipeline — From Idea to Finished Product**

You can take a project from start to finish using plugin combinations:

```
1. Research    /deep-research → market research, competitor analysis, tech review
2. Planning    /show-me-the-prd → auto-generate PRD, data model, project spec from research
3. Development /kkirikkiri → build agent team for parallel dev (frontend/backend/tests)
4. Review      /kkirikkiri → build analysis team for code review + quality checks
5. Improve     /kkirikkiri → build improvement team based on feedback
6. Skill-ify   /skillers-suda → turn repeating workflows into reusable skills
```

- Use **docs-guide** throughout for accurate, official-docs-based implementation
- Use **vibe-sunsang** to analyze your AI usage patterns and improve prompt quality

**Multi-session & Parallel Work**
- Run Claude Code in multiple terminals to divide and conquer
- Use **/kkirikkiri** to build agent teams that automatically work in parallel
- Try **pumasi** to use Codex as a parallel developer (also works with Claude alone)

**MCP (Model Context Protocol) Setup**

Connect Claude Code to external services through MCP.

```bash
# Add an MCP server
claude mcp add
```

Recommended MCP integrations:
- **GitHub**: PRs, issues, code search
- **Slack**: Team notifications
- **Notion / Linear**: Project management
- **Figma**: Read design specs

---

**Customizing Hooks**

Automate actions that must happen every single time.

```json
{
  "hooks": {
    "PostToolUse": [{
      "matcher": "Edit",
      "hooks": [{
        "type": "command",
        "command": "npm run lint -- $FILE"
      }]
    }]
  }
}
```

This example runs lint automatically every time Claude edits a file.

---

**Exploring and Installing Plugins**

```bash
# Open the plugin manager
/plugin

# Install from the official marketplace
/plugin install commit-commands@claude-plugins-official
```

Recommended plugins:
- `commit-commands`: Git workflow automation
- `pr-review-toolkit`: Specialized PR review agents
- `pyright-lsp` / `typescript-lsp`: Code intelligence

---

### Advanced: Beyond CC101

These are deeper topics not covered in this guide.

**Build Your Own AI Apps with Agent SDK**
- Anthropic's [Agent SDK](https://docs.anthropic.com/en/docs/agents) lets you build standalone AI applications powered by Claude
- Build custom agents in Python/TypeScript — automation systems that run without Claude Code

**Build Your Own MCP Servers**
- CC101 taught you how to "use" MCP servers, but you can also "build" them
- Wrap your company's internal API, database, or wiki as an MCP server so Claude Code can access them directly
- [MCP official spec](https://modelcontextprotocol.io)

**Claude Code Plugin Development**
- Create your own plugins and share them with the community
- Package Skills, Hooks, Agents, and MCP servers into a single plugin
- Use the **skillers-suda** plugin for rapid prototyping

**Team Adoption & Governance**
- Permission management, cost allocation, and security policies when your entire team uses Claude Code
- Enterprise plan admin features (Admin Controls, Audit Logs)
- Enforce coding standards via organization-managed CLAUDE.md

**Production Automation Pipelines**
- GitHub Actions + Headless Claude Code for auto PR reviews and test generation
- Nightly batch jobs: data processing, report generation, code quality checks
- Monitoring + alerting integrations (Slack, Discord)

---

## Official Resources

### Documentation & Repositories

| Resource | URL |
|----------|-----|
| **Official Docs** | [code.claude.com/docs](https://code.claude.com/docs) |
| **GitHub Repository** | [github.com/anthropics/claude-code](https://github.com/anthropics/claude-code) |
| **Official Plugins** | [github.com/anthropics/claude-plugins-official](https://github.com/anthropics/claude-plugins-official) |
| **Anthropic Console** | [platform.claude.com](https://platform.claude.com) |

---

### CC101 & gptaku_plugins Community

| Resource | URL | Description |
|----------|-----|-------------|
| **CC101 GitHub** | [github.com/fivetaku/cc101](https://github.com/fivetaku/cc101) | This guide's repository. Typo fixes and content contributions welcome |
| **gptaku_plugins** | [github.com/fivetaku/gptaku_plugins](https://github.com/fivetaku/gptaku_plugins) | 11 plugins for vibe coders: planning (show-me-the-prd), Git (git-teacher), mentor (vibe-sunsang), research (deep-research), parallel dev (pumasi), team setup (kkirikkiri), skill creation (skillers-suda), official docs (docs-guide), Google Workspace (nopal), bypass search (insane-search), design analysis (insane-design) |

If this has been helpful, please give it a **Star**. It helps the community grow.

---

## Using Claude Code Effectively & Anti-patterns

Now that you know the tool, understanding when and how to use it is key.

### Great Fit (use freely)

| Task | Why |
|------|-----|
| Repetitive boilerplate code | Clear patterns, low risk of mistakes |
| Test code generation | Accurately generated from function signatures |
| Code refactoring (well-scoped) | Safe when targeting specific files/functions |
| Error message analysis & fixes | Excellent at combining error logs + code context |
| Documentation / comments | Low hallucination when based on existing code |
| Regex, SQL queries, config files | Strong at tasks with clear syntax |
| Exploring unfamiliar languages/frameworks | Very effective for fast onboarding |
| Understanding legacy code | Excellent at context analysis + explanation |

### Requires Caution (review carefully)

| Task | Why |
|------|-----|
| Auth / security code | Subtle vulnerabilities can slip in |
| Payment / financial logic | Absolute accuracy is critical |
| Large-scale refactoring (multiple files) | Risk of unintended side effects |
| DB schema changes / migrations | Potential data loss |
| Production deployment scripts | Wide blast radius if wrong |
| External API integration & secrets | Key exposure, wrong endpoint risks |

### 5 Principles to Always Follow

1. Git commit before starting → always have a rollback point
2. Be specific about scope → "only this function in this file"
3. Read the generated code yourself → don't use code you don't understand
4. Always review security/payment code separately
5. Use Plan Mode for big tasks to confirm the approach first (Shift+Tab)

---

## Recommended First Real Projects

Now that you've finished CC101, jump into practice. These projects work whether you code or not.

### 1. Meeting Notes Automation

Hand off your weekly meeting note-taking to Claude Code.

```
"I have a file ~/Downloads/meeting-250225.mp3.
Transcribe it, then summarize + sort action items by person.
Save as meeting-250225.md"
```

It handles everything from installing transcription tools to organizing the output.

---

### 2. Build Your Own Skills

Turn your weekly repetitive tasks into a single `/command`.

```
"Create a Skill that generates a weekly report every Monday.
Based on GitHub commit history and my notes file,
draft a weekly summary."
```

---

### 3. Competitor Analysis Report

Analyze competitors in any field you're interested in.

```
"Analyze competitor websites A, B, C.
Compare features, pricing, target customers, differentiators.
Save as competitor-analysis.md"
```

---

### 4. Build a Portfolio Site (for developers)

```
"Build a developer portfolio site using HTML/CSS/JS.
Sections: intro, tech stack, projects, contact.
Keep it minimal with a dark theme."
```

---

### 5. Refactor Existing Code (for developers)

```
"Review and improve this file.
Focus on readability, performance, and error handling.
@src/utils/dataProcessor.js"
```

---

## What To Do When You're Stuck

### Step 1: Check the Official Docs

Most answers are in the official documentation.

```
https://code.claude.com/docs
```

You can also get help from within Claude Code itself:

```
/help
```

---

### Step 2: Ask Claude Code Directly

Claude Code itself is the most powerful help resource available.

```
"How do I add an MCP server in Claude Code?"
"What does this error message mean: [paste error]"
```

---

### Step 3: Community

- **GitHub Issues**: [github.com/anthropics/claude-code/issues](https://github.com/anthropics/claude-code/issues)
- **CC101**: [github.com/fivetaku/cc101](https://github.com/fivetaku/cc101)

---

### Step 4: Anthropic Support

For account or billing issues, contact support through the [Anthropic Console](https://platform.claude.com).

---

## One Last Thing

Claude Code is a fast-moving tool. What you learned today may look different in a few months. What matters most is understanding the underlying principles.

**Developing with AI** isn't just about writing code faster. It's a new kind of collaboration — combining AI's strengths (broad knowledge, pattern recognition, repetitive tasks) with yours (judgment, creativity, domain expertise).

By completing CC101, you've taken the first step. The rest is practice.

---

## Quick Reference Card

```
Official Docs:   https://code.claude.com/docs
GitHub:          https://github.com/anthropics/claude-code
Plugins:         https://github.com/anthropics/claude-plugins-official
gptaku_plugins:  https://github.com/fivetaku/gptaku_plugins
CC101:           https://github.com/fivetaku/cc101
Console:         https://platform.claude.com

Next targets:
  Vibe coders  → Install gptaku_plugins, plan with show-me-the-prd, grow with vibe-sunsang
  Intermediate → MCP setup (Notion/Slack/GitHub), custom Hooks, plugin exploration
  Advanced     → Build Skills (or use skillers-suda), Agent Teams with kkirikkiri
  (Developers) → Full CI/CD automation, parallel dev with pumasi
```
