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

**Maximize Plugin Workflows**
- **show-me-the-prd** for planning → **kkirikkiri** for research team → Claude Code for implementation — idea to prototype in a day
- **deep-research** for market research → **docs-guide** for technical validation — AI-powered decision making
- Improve prompt quality over time using **vibe-sunsang** feedback

**Multi-session & Parallel Work**
- Run Claude Code in multiple terminals to divide and conquer
- Try parallel development with **pumasi** (works with Claude alone, no Codex needed)

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

### Advanced Goals

**Building Your Own Skills**

Package frequently used workflows as reusable Skills.

```markdown
# .claude/skills/fix-issue/SKILL.md
---
name: fix-issue
description: Analyze and fix a GitHub issue
---
Analyze and fix the following GitHub issue: $ARGUMENTS

1. Use gh issue view to get issue details
2. Search the codebase for relevant files
3. Implement the necessary changes
4. Write and run tests
5. Create a PR
```

> You can also quickly prototype skills using the **skillers-suda** plugin.

---

**Agent Teams**

Run multiple Claude instances simultaneously to handle complex tasks in parallel.

```bash
# Enable Agent Teams (requires environment variable)
CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1 claude
```

> Use with care — Agent Teams consume significantly more tokens than standard sessions.

---

**Full CI/CD Automation**

Apply what you learned in Section 15 to real projects.

```yaml
# Example: automatic code review on every PR
on:
  pull_request:
    types: [opened, synchronize]
```

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

## Recommended First Real Projects

Now that you've finished CC101, jump into practice. Here are beginner-friendly projects to get you started.

### 1. Build a Portfolio Site

One of the most motivating first projects. Describe what you want and let Claude Code build the whole thing.

```
"Build a developer portfolio site using HTML/CSS/JS.
Sections: intro, tech stack, projects, contact.
Keep it minimal with a dark theme."
```

---

### 2. Refactor Existing Code

Improve code you already have with Claude Code's help.

```
"Review and improve this file.
Focus on readability, performance, and error handling.
@src/utils/dataProcessor.js"
```

---

### 3. Auto-Generate Test Code

Adding tests to an untested project is something Claude Code does particularly well.

```
"Write unit tests for every function in auth.ts.
Use Jest and make sure to cover edge cases."
```

---

### 4. Migrate Legacy Code

Convert old code patterns to modern equivalents.

```
"Migrate these CommonJS modules to ES Modules.
Convert each file and verify with tests."
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
- **gptaku_plugins**: [github.com/fivetaku/gptaku_plugins](https://github.com/fivetaku/gptaku_plugins)

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
