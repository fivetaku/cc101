# 17. Skills & Building Plugins

> Turn repetitive workflows into a single `/command` — reusable, shareable, and always consistent

---

## What are Skills?

**Skills** are reusable workflows that add new capabilities to Claude Code. Create a `SKILL.md` file and Claude recognizes it as a tool — invoke it directly with `/skill-name`, or let Claude activate it automatically when the context fits.

In short: document a procedure you use repeatedly, and from that point on you can execute it with a single word.

> **Note**: The older `.claude/commands/` custom slash commands have been merged into Skills. Existing files in `.claude/commands/` continue to work unchanged.

---

## Skills vs. regular conversation

| | Regular conversation | Skills |
|---|---|---|
| **How to run** | Type the full instructions every time | `/skill-name` once |
| **Consistency** | May vary each time | Same procedure every time |
| **Team sharing** | Not possible | Git commit to share |
| **Argument passing** | Embedded in prose | Explicit via `$ARGUMENTS` |
| **Tool restrictions** | Claude's judgment | Only explicitly allowed tools |

---

## Manual work Skills eliminate

| Repetitive task | With Skills configured |
|-----------------|------------------------|
| Explain commit message rules every time | `/commit` — done |
| Paste a review checklist with every request | `/review` — runs it |
| Re-describe PR summary format | `/pr-summary` — runs it |
| Specify language and format for every translation | `/translate ko en README.md` |
| Walk through the issue-handling process each time | `/fix-issue 123` |

---

## Creating your first skill

### Step 1: Create the directory

```bash
# Personal skill (available in all your projects)
mkdir -p ~/.claude/skills/commit

# Project skill (this project only)
mkdir -p .claude/skills/commit
```

### Step 2: Write SKILL.md

`.claude/skills/commit/SKILL.md`:

```yaml
---
name: commit
description: Analyzes staged changes and creates a well-formed commit. Use when committing code changes.
disable-model-invocation: true
---

Analyze the currently staged changes and create a commit using Conventional Commits format:

1. Run `git diff --staged` to review the changes
2. Identify the change type (feat/fix/docs/refactor/test/chore)
3. Write a title under 50 characters
4. Add a body with more detail if needed
5. Run `git commit -m "..."`
```

### Step 3: Run it

```
# Direct invocation
/commit

# Or natural language — Claude auto-detects
"commit the changes"
```

---

## Skill file structure

```
my-skill/
├── SKILL.md           # Main instructions (required)
├── template.md        # Template for Claude to fill in (optional)
├── examples/
│   └── sample.md      # Example output (optional)
└── scripts/
    └── validate.sh    # Script Claude can execute (optional)
```

> **Tip**: Keep `SKILL.md` under 500 lines. Move detailed reference material to separate files.

---

## Key frontmatter options

```yaml
---
name: my-skill                    # Skill name (directory name is the default)
description: What it does         # How Claude decides when to use this (recommended)
disable-model-invocation: true    # true = only you can run it, Claude won't auto-trigger
user-invocable: false             # false = hidden from / menu, Claude-only auto-trigger
allowed-tools: Read, Grep, Glob   # Restrict to only these tools while the skill runs
context: fork                     # Run in an isolated subagent context
model: sonnet                     # Model to use for this skill
---
```

| Frontmatter | User can run | Claude auto-runs | When to use |
|-------------|-------------|-----------------|-------------|
| (default) | Yes | Yes | General workflows |
| `disable-model-invocation: true` | Yes | No | Deploy, send, or other side-effect actions |
| `user-invocable: false` | No | Yes | Background conventions, style guides |

---

## Three practical examples

### Example 1: Automated code review

`.claude/skills/review/SKILL.md`:

```yaml
---
name: review
description: Reviews code for quality, security, and performance. Use when reviewing code changes or PRs.
---

Review the code in the following order:

1. Analyze `git diff HEAD~1` or the file specified in $ARGUMENTS
2. Check for:
   - Readability and naming conventions
   - Missing error handling
   - Security vulnerabilities (SQL injection, XSS, hardcoded secrets)
   - Duplicate code
   - Test coverage
3. Organize findings by priority:
   - 🔴 Critical (must fix)
   - 🟡 Warning (should fix)
   - 🔵 Suggestion (consider)
```

Run:
```
/review src/auth/login.ts
```

### Example 2: GitHub issue handler

`.claude/skills/fix-issue/SKILL.md`:

```yaml
---
name: fix-issue
description: Implements a GitHub issue end-to-end. Pass an issue number to analyze, implement, test, and commit.
disable-model-invocation: true
allowed-tools: Bash(gh *), Read, Edit, Write
---

Handle GitHub issue $ARGUMENTS:

1. Run `gh issue view $ARGUMENTS` to read the issue
2. Understand requirements and plan the implementation
3. Find relevant files and write the code
4. Write and run tests
5. Commit the changes and run `gh issue close $ARGUMENTS`
```

Run:
```
/fix-issue 123
```

### Example 3: Translation automation

`.claude/skills/translate/SKILL.md`:

```yaml
---
name: translate
description: Translates a file or text into the target language.
argument-hint: [file-path or text] [target-language]
---

Translate $ARGUMENTS[0] into $ARGUMENTS[1].

- Preserve technical terms as-is (code, commands, proper nouns)
- Keep Markdown structure intact
- Save the translated result with the language code appended to the original filename
```

Run:
```
/translate README.md ko
```

---

## Dynamic context injection (advanced)

Use the `` !`command` `` syntax to run a shell command before the skill content reaches Claude, injecting live data into the prompt:

```yaml
---
name: pr-summary
description: Writes a PR summary based on actual diff and comments.
context: fork
allowed-tools: Bash(gh *)
---

## PR context
- Diff: !`gh pr diff`
- Comments: !`gh pr view --comments`
- Changed files: !`gh pr diff --name-only`

Based on the above, write a clear and concise PR summary.
```

When this skill runs:
1. Each `` !`command` `` executes immediately, before Claude sees anything
2. The real output replaces the placeholder
3. Claude writes the summary with actual PR data in context

---

## Where skills are stored

| Location | Path | Scope |
|----------|------|-------|
| Enterprise | Managed settings | Entire organization |
| Personal | `~/.claude/skills/<name>/SKILL.md` | All your projects |
| Project | `.claude/skills/<name>/SKILL.md` | This project only |
| Plugin | `<plugin>/skills/<name>/SKILL.md` | When plugin is enabled |

When the same skill name exists in multiple locations, priority is: **enterprise > personal > project**.

---

## Packaging skills as a plugin

To distribute across teams or share with the community, package your skills as a plugin.

### Plugin structure

```
my-plugin/
├── .claude-plugin/
│   └── plugin.json        # Plugin metadata
├── skills/
│   ├── review/
│   │   └── SKILL.md
│   └── commit/
│       └── SKILL.md
└── hooks/
    └── hooks.json         # Plugin-scoped hooks
```

### plugin.json

```json
{
  "name": "my-plugin",
  "description": "Shared team workflows",
  "version": "1.0.0",
  "author": {
    "name": "Your Name"
  }
}
```

### Local testing

```bash
# Launch Claude Code with your plugin loaded
claude --plugin-dir ./my-plugin

# Run skills with the plugin namespace
/my-plugin:review
/my-plugin:commit
```

### Standalone vs. plugin — when to choose which

| Situation | Recommended approach |
|-----------|---------------------|
| Personal workflows, quick experiments | Standalone (`.claude/skills/`) |
| Share with your team, multiple projects | Plugin |
| Distribute to the community | Plugin + marketplace |

---

## How Claude auto-detects skills

Claude reads the `description` field to decide when a skill is appropriate:

```yaml
# Good description
description: Reviews code for quality, security, and performance. Use when reviewing PRs or analyzing code changes.

# Too vague
description: review tool
```

- The more clearly you describe **when** to use the skill, the better Claude's detection
- Add `disable-model-invocation: true` to prevent automatic activation entirely

---

## Passing arguments to skills

Both you and Claude can pass arguments when invoking a skill:

```yaml
---
name: migrate-component
description: Migrate a component from one framework to another
---

Migrate the $ARGUMENTS[0] component from $ARGUMENTS[1] to $ARGUMENTS[2].
Preserve all existing behavior and tests.
```

Run:
```
/migrate-component SearchBar React Vue
```

Shorthand: `$0`, `$1`, `$2` instead of `$ARGUMENTS[0]`, etc.

---

## Troubleshooting

| Problem | Fix |
|---------|-----|
| Skill doesn't trigger | Add phrases users naturally say to the description |
| Skill triggers too often | Make the description more specific |
| Claude can't see the skill | Run `/context` — check for context budget warnings |
| Want to prevent auto-trigger | Add `disable-model-invocation: true` |

---

## One-line summary

> Skills = turn what you do repeatedly into a `/command`. Package them as a plugin to share with your team.

Next section: use Sub-agents to handle complex work in parallel.
