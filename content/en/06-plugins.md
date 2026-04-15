# 06. Recommended Plugin Installation

> Extend Claude Code's capabilities by installing plugins.

---

## What Are Plugins?

Claude Code is already powerful out of the box, but **plugins** let you do even more.

Think of plugins like apps on your smartphone — you install what you need, and Claude Code gains new abilities.

A single plugin can include:

| Component | Description |
|-----------|-------------|
| **Skills** | Custom commands in the format `/plugin-name:command` |
| **Agents** | AI agents that handle specific roles or tasks |
| **Hooks** | Event handlers that run automatically on file saves or commands |
| **MCP Servers** | Connections to external services like GitHub, Figma, and more |

---

## Official Plugin Marketplace

Anthropic operates an official marketplace (`claude-plugins-official`) that is **automatically available** when you start Claude Code.

Type `/plugin` inside Claude Code and go to the **Discover tab** to browse official plugins immediately.

### Installing from the Official Marketplace

```shell
/plugin install plugin-name@claude-plugins-official
```

### Official Marketplace Categories

| Category | Notable Plugins | Description |
|----------|----------------|-------------|
| **External Integrations** | `notion`, `slack`, `github` | Connect Claude to Notion, Slack, GitHub, and more |
| **Output Styles** | `explanatory-output-style` | Customize how Claude responds (summary format, checklists, etc.) |
| **Dev Workflows** | `commit-commands`, `pr-review-toolkit` | Automate Git commits and PR reviews |

<details>
<summary>🖥️ Code Intelligence Plugins (for developers)</summary>

| Category | Notable Plugins | Description |
|----------|----------------|-------------|
| **Code Intelligence** | `typescript-lsp`, `pyright-lsp` | Real-time type error detection, code navigation |

```shell
/plugin install typescript-lsp@claude-plugins-official
/plugin install pyright-lsp@claude-plugins-official
```

</details>

---

## gptaku_plugins — A Plugin Pack for Beginners

> GitHub: [https://github.com/fivetaku/gptaku_plugins](https://github.com/fivetaku/gptaku_plugins)

**gptaku_plugins** is a plugin collection designed specifically for Claude Code beginners, non-developers, and vibe coders. It helps Claude guide you through unfamiliar concepts with extra patience and clarity.

### Included Plugins

| Plugin Name | Role | Example Usage |
|-------------|------|---------------|
| **docs-guide** | Answers questions based on official library documentation — no hallucinations, just accurate info | `/docs-guide:explain React hooks` |
| **git-teacher** | Git onboarding for non-developers. Guides you step by step from "what is a commit?" to real-world workflows | `/git-teacher:what-is-commit` |
| **vibe-sunsang** | Auto-collects Claude Code conversation logs, rates your prompt quality A~D, and generates growth reports. Coaches you on better AI usage patterns | `/vibe-sunsang start` |
| **deep-research** | Multi-agent 7-step research automation. Collects web/academic/technical sources in parallel → cross-validates → generates report | `/deep-research [topic]` |
| **pumasi** | Claude (PM) distributes tasks for parallel processing. Uses Codex if installed, otherwise works with Claude alone | `/pumasi [task description]` |
| **show-me-the-prd** | 5-6 interview questions automatically generate 4 design documents (PRD, data model, phase breakdown, project spec). No planning skills needed | `/show-me-the-prd I want to build a photo organizer app` |
| **kkirikkiri** | One sentence in natural language auto-configures and runs Claude Code Agent Teams. 4 presets: research, development, analysis, content | `/kkirikkiri create a research team` |
| **skillers-suda** | 4 experts (planner, user, specialist, reviewer) turn a vague idea into a working skill | `/skillers-suda create a translation skill` |
| **nopal** | Orchestrate 9 Google Workspace services (Gmail, Calendar, Drive, Sheets, Docs, etc.) with natural language | `/nopal schedule a meeting for tomorrow` |
| **insane-search** | Auto-bypasses blocked sites (X/Twitter, Reddit, YouTube, etc.) with platform-specific access strategies | Auto-detected |
| **insane-design** | Extracts real CSS-based design systems from any URL. Generates design.md + interactive HTML report | `/insane-design [URL]` |

---

## Installation

### Step 1: Register the Marketplace (One-Time)

Inside Claude Code, run:

```shell
/plugin marketplace add https://github.com/fivetaku/gptaku_plugins.git
```

### Step 2: Install Plugins

Once the marketplace is registered, install the plugins you want:

```shell
/plugin install
```

Select the plugin you want from the list, or specify it by name:

```shell
/plugin install show-me-the-prd
```

> **Note**: One plugin installs at a time. Repeat for multiple installations.

### Step 3: Verify Installation

```shell
/plugin list
```

Or type `/plugin` and navigate to the **Installed tab**.

### Step 4: Update

When new versions are available, update with:

```shell
/plugin update
```

> **Important**: Restart Claude Code after installation or update.

### Step 5: Try a Plugin

Once installed, plugins are ready to use immediately:

```shell
# Auto-generate project requirements
/show-me-the-prd I want to build a todo app

# Build an AI agent team
/kkirikkiri create a research team

# Auto-generate skills
/skillers-suda create a translation skill

# Git onboarding
/git-teacher:what-is-commit

# Official docs-based answers
/docs-guide:explain React hooks

# AI usage pattern analysis
/vibe-sunsang start
```

---

## Managing Plugins

| Command | Description |
|---------|-------------|
| `/plugin` | Open plugin manager (Discover / Installed / Marketplaces / Errors tabs) |
| `/plugin list` | List installed plugins |
| `/plugin disable plugin-name` | Temporarily disable a plugin |
| `/plugin enable plugin-name` | Re-enable a disabled plugin |
| `/plugin uninstall plugin-name` | Completely remove a plugin |

---

## Community Plugins

Beyond the official marketplace, you can install community-built plugins directly from GitHub. These offer diverse features — just check the code and confirm the repository is trustworthy before installing.

### oh-my-claudecode

The most widely used third-party plugin in the Claude Code community. It transforms Claude Code itself into an **orchestrator**.

Key features:
- **Autopilot**: Say "build this" and it auto-handles planning → implementation → verification
- **33 specialized agents**: Code review, security analysis, testing, documentation — role-based AI agents
- **External AI integration**: Collaborate with Codex (OpenAI) and Gemini (Google) for multi-perspective analysis
- **Skills system**: Save frequently-used workflows as reusable commands

Install: See the README at GitHub ([github.com/Yeachan-Heo/oh-my-claudecode](https://github.com/Yeachan-Heo/oh-my-claudecode))

<details>
<summary>🖥️ More Community Plugins (LSP / chrome-devtools)</summary>

### LSP Plugins (Code Intelligence)

Integrate Language Server Protocol for type error detection, go-to-definition, and find-references directly inside Claude Code.

```shell
/plugin install typescript-lsp@claude-plugins-official
/plugin install pyright-lsp@claude-plugins-official
```

### chrome-devtools MCP

Control Chrome DevTools from Claude Code. Read console logs, inspect DOM, analyze network requests — all with AI assistance for a dramatically improved frontend debugging workflow.

</details>

### supermemory

An MCP server that enhances Claude's long-term memory. Even when a new session starts, it automatically recalls previous work context, project decisions, and frequently-used patterns. The longer you work on the same project, the more effective it becomes.

> **Before installing**: Community plugins are not verified by Anthropic. Check the GitHub repository's code and README first, and confirm the repo is actively maintained.

---

## ⭐ Please Star CC101 on GitHub!

If this guide has been helpful, please give us a star on GitHub.

Your star helps keep this guide growing and improving.

**[→ Star CC101 on GitHub](https://github.com/fivetaku/cc101)**

> It's easy — just click the link and press the ⭐ Star button in the top right!

---

## Next Steps

Now that you have plugins installed, let's understand how Claude Code actually works under the hood.
