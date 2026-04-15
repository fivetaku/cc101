# 18. Sub-agents & Agent Teams

> Claude delegating to other Claudes — parallel processing for complex tasks

---

## What are Sub-agents?

**Sub-agents** are specialized Claude instances that the main Claude delegates specific tasks to. Each sub-agent runs in its own isolated context window, with a custom system prompt, restricted tool access, and independent permissions.

When a task is delegated, the sub-agent works independently and returns only a summary of results to the main conversation — keeping your main context clean.

---

## Architecture overview

```
Main Claude (Orchestrator)
    │
    ├──► Sub-agent A: Explore (read-only)
    │         └── File reading and code search only
    │
    ├──► Sub-agent B: general-purpose
    │         └── Read + write files
    │
    └──► Sub-agent C: custom test runner
              └── Bash execution only

Each sub-agent runs in an isolated context
→ Main context stays clean
→ Only result summaries return to main
```

---

## When sub-agents are useful

### Use sub-agents when

| Situation | Why it helps |
|-----------|-------------|
| Tasks that produce large output | Test logs and documentation fetches stay out of your main context |
| Multiple independent file modifications | Process them in parallel |
| Work requiring specific tool restrictions | Read-only reviewers, DB-query-only agents |
| Separating exploration from implementation | Exploration noise doesn't pollute your main conversation |

### Stick with the main conversation when

| Situation | Why |
|-----------|-----|
| Frequent back-and-forth is needed | Sub-agents run independently — mid-task intervention is limited |
| Quick, targeted changes | Sub-agent startup adds overhead |
| Phases share significant context | Tightly linked plan → implement → test flows work better in-line |

---

## Built-in sub-agents

Claude Code ships with three built-in sub-agents:

| Agent | Model | Allowed tools | Purpose |
|-------|-------|--------------|---------|
| **Explore** | Haiku (fast) | Read-only | File discovery, code search |
| **Plan** | Inherits from main | Read-only | Context gathering in plan mode |
| **general-purpose** | Inherits from main | All tools | Complex multi-step operations |

When Claude needs to search through a codebase, it automatically delegates to **Explore**. Thousands of lines of file content stay in Explore's context — only the relevant findings return to your conversation.

---

## Creating your own sub-agent

### Option 1: Interactive /agents menu (recommended)

```
/agents
```

1. Select **Create new agent**
2. Choose **User-level** (all projects) or **Project-level** (this project)
3. Select **Generate with Claude** and describe the agent's role
4. Select allowed tools
5. Choose a model (Haiku / Sonnet / Opus)
6. Save — available immediately, no restart needed

### Option 2: Write the file directly

`.claude/agents/code-reviewer.md`:

```yaml
---
name: code-reviewer
description: Reviews code for quality, security, and performance. Use proactively after code changes.
tools: Read, Grep, Glob, Bash
model: sonnet
---

You are a senior code reviewer focused on code quality and security.

When invoked:
1. Run `git diff` to see recent changes
2. Focus on modified files
3. Begin review immediately

Review checklist:
- Code clarity and naming conventions
- No duplicated logic
- Proper error handling
- Security vulnerabilities (exposed secrets, missing input validation)
- Test coverage

Format feedback by priority:
- 🔴 Critical (must fix)
- 🟡 Warning (should fix)
- 🔵 Suggestion (consider)
```

---

## Sub-agent configuration options

```yaml
---
name: my-agent              # Lowercase letters and hyphens (required)
description: When to use    # How Claude decides when to delegate (required)
tools: Read, Grep, Glob     # Allowed tools (inherits all if omitted)
disallowedTools: Write      # Tools to explicitly block
model: haiku                # haiku / sonnet / opus / inherit (default)
permissionMode: default     # default / acceptEdits / dontAsk / bypassPermissions
maxTurns: 20                # Maximum agentic turns before the agent stops
memory: user                # Persistent memory: user / project / local
background: false           # true = always run as a background task
isolation: worktree         # worktree = run in an isolated git worktree
---
```

---

## Where sub-agents are stored

| Location | Path | Priority |
|----------|------|----------|
| CLI flag | `--agents '{...}'` | 1 (highest) |
| Project | `.claude/agents/` | 2 |
| User | `~/.claude/agents/` | 3 |
| Plugin | `<plugin>/agents/` | 4 |

**Project agents** (`.claude/agents/`) are ideal for codebase-specific agents. Commit them to version control so your team can use and improve them collaboratively.

**User agents** (`~/.claude/agents/`) are personal agents available across all your projects.

---

## Practical examples

### Example 1: Parallel codebase exploration

```
"Research the authentication, database, and API modules in parallel using separate sub-agents"
```

→ Three Explore sub-agents run simultaneously
→ Each returns a focused summary
→ Main Claude synthesizes all three findings

### Example 2: Chained review and fix

```
"Use the code-reviewer sub-agent to find performance issues, then use the optimizer sub-agent to fix them"
```

→ code-reviewer returns a list of issues
→ optimizer receives that list and applies fixes
→ Main context remains uncluttered throughout

### Example 3: Isolating verbose test output

```
"Use a sub-agent to run the full test suite and report only the failing tests with their error messages"
```

→ Thousands of lines of test logs stay in the sub-agent's context
→ Only failing test names and error messages return to you

### Example 4: Explicitly requesting a specific agent

```
"Use the code-reviewer sub-agent to review the authentication module"
"Have the debugger sub-agent fix the failing tests"
```

---

## Persistent memory across sessions

Set the `memory` field to give a sub-agent a persistent directory that survives across conversations:

```yaml
---
name: code-reviewer
description: Reviews code for quality and best practices
memory: user
---

As you review code, update your agent memory with codebase patterns,
conventions, and recurring issues you discover. In future sessions,
consult your memory before beginning a review.
```

| Scope | Location | When to use |
|-------|----------|-------------|
| `user` | `~/.claude/agent-memory/<name>/` | Build knowledge across all projects |
| `project` | `.claude/agent-memory/<name>/` | Project-specific learning, shareable via Git |
| `local` | `.claude/agent-memory-local/<name>/` | Project-specific, not committed |

---

## Foreground vs. background execution

- **Foreground**: blocks until complete; permission prompts are passed through to you
- **Background**: runs concurrently while you continue working

```
# Request background execution
"Run this in the background"

# Switch a running task to background
Ctrl+B
```

> **Note**: Background sub-agents cannot use MCP tools.

If a background sub-agent fails due to missing permissions, you can resume it in the foreground to retry with interactive prompts.

---

## What are Agent Teams?

**Agent Teams** take sub-agents a step further. Multiple agents run in fully independent sessions and coordinate with each other — each with its own complete context window.

| | Sub-agents | Agent Teams |
|---|---|---|
| **Execution unit** | Inside the main session | Fully independent sessions |
| **Context** | Shared with main | Fully isolated per agent |
| **Best for** | Single-session delegation | Long-running parallel work |
| **Communication** | Summary returned to main | Coordinated across sessions |

Consider Agent Teams when sub-agent results overflow your context window, or when work needs to span multiple sessions.

---

## ⚠️ Cost awareness

Each sub-agent is an independent Claude instance. **Every agent consumes tokens separately.**

- 3 parallel sub-agents = significantly higher token usage
- Results returning to main context consume additional tokens
- Unnecessary sub-agent spawning compounds costs quickly

**Cost-saving tips**:
- Use **Haiku** model sub-agents for read-only exploration
- Explicitly limit how much each sub-agent returns
- Handle simple tasks in the main conversation

---

## Getting Started Easily: kkirikkiri Plugin

If setting up Agent Teams manually feels overwhelming, the **kkirikkiri** plugin does it for you.

```
/kkirikkiri create a research team
```

With one natural language sentence:
1. **Intent detection** — matches to research/development/analysis/content
2. **Interview** — 2-3 questions to gather specific requirements
3. **Environment scan** — auto-detects installed CLIs (Codex, Gemini, etc.)
4. **Team proposal** — role-based agents + estimated cost/time
5. **Execution** — auto-creates and runs Agent Teams
6. **Quality verification** — auto-evaluates results, retries if insufficient

| Preset | Trigger examples | Default composition |
|--------|-----------------|-------------------|
| Research | "investigate", "find" | Lead (Opus) + 2 Researchers |
| Development | "build", "implement" | Lead (Opus) + 2 Developers |
| Analysis | "analyze", "review" | Lead (Opus) + 2 Explorers |
| Content | "write", "document" | Lead (Opus) + Writer + Reviewer |

> The lead always uses the most capable model (Opus) and only does planning/delegation/verification — never writes code directly.

Install kkirikkiri: see the Plugins section for gptaku_plugins

---

## Advice for beginners

> **You don't need sub-agents when you're starting out.**

Introduce sub-agents when you hit these specific problems:
1. Your main context keeps overflowing and compacting repeatedly
2. You're running the same exploration work over and over
3. You need a safe, tool-restricted reviewer that can't accidentally modify files

---

## One-line summary

> Sub-agents = Claude delegating work to other Claudes. Each runs in isolated context, keeping your main conversation clean while enabling parallelism. Token costs scale with the number of agents — use them when the problem calls for it.
