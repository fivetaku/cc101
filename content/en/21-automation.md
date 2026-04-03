# 21. Headless Mode & GitHub Actions Automation

> Learn how to run Claude Code automatically without human interaction.

---

## What Is Headless Mode?

Normally, Claude Code runs interactively in a terminal — you ask a question, Claude responds, you give feedback, and so on.

**Headless mode** lets you run Claude Code automatically, without a person in the loop. You can call it from scripts or CI/CD pipelines just like any other command-line tool.

> **Headless = automated execution without human interaction**

The feature was previously called "headless mode," but is now officially part of the **Agent SDK CLI**. The `-p` flag and all CLI options work exactly the same way.

---

## When Would You Use This?

| Situation | Example |
|-----------|---------|
| CI/CD pipelines | Automatically review code every time a PR is opened |
| Automation scripts | Generate a nightly code quality report |
| Batch processing | Migrate multiple files at once |
| Repetitive tasks | Attempt auto-fixes when tests fail |

---

## Basic Usage

Add the `-p` (or `--print`) flag to run Claude Code non-interactively.

### Simplest form

```bash
claude -p "What does this project do?"
```

### Allow tools

Let Claude read and edit files by specifying allowed tools:

```bash
claude -p "Find and fix the bug in auth.py" --allowedTools "Read,Edit,Bash"
```

### Get structured JSON output

For easy parsing in scripts, use JSON output format:

```bash
claude -p "Summarize this project" --output-format json
```

Output format options:
- `text` (default): plain text
- `json`: structured JSON with result, session ID, and metadata
- `stream-json`: real-time streaming JSON

### Practical example: automated commit

```bash
claude -p "Review my staged changes and create a commit with an appropriate message" \
  --allowedTools "Bash(git diff *),Bash(git log *),Bash(git status *),Bash(git commit *)"
```

### Continue a conversation

```bash
# First request
claude -p "Review this codebase for performance issues"

# Continue the previous conversation
claude -p "Now focus on the database queries" --continue
```

---

## GitHub Actions Integration

GitHub Actions automatically runs tasks in response to GitHub events — PR creation, code pushes, issue creation, and more. Integrating Claude Code here enables AI-powered automation in your development workflow.

### The Official Action

Anthropic provides an official GitHub Action:

- **Repository**: [github.com/anthropics/claude-code-action](https://github.com/anthropics/claude-code-action)
- **Version**: `anthropics/claude-code-action@v1`

### Quick Setup

Run this command inside Claude Code to be guided through setup automatically:

```
/install-github-app
```

> Repository admin access is required.

### Manual Setup

1. **Install the Claude GitHub App**: Visit [github.com/apps/claude](https://github.com/apps/claude) and install it on your repository.

2. **Add your API key**: Go to repository Settings → Secrets and add `ANTHROPIC_API_KEY`.

3. **Create a workflow file**: Add a YAML file inside `.github/workflows/`.

---

### Example 1: Automated PR Review via @claude Mention

Claude automatically responds when someone mentions `@claude` in a PR comment or issue.

```yaml
name: Claude Code
on:
  issue_comment:
    types: [created]
  pull_request_review_comment:
    types: [created]

jobs:
  claude:
    runs-on: ubuntu-latest
    steps:
      - uses: anthropics/claude-code-action@v1
        with:
          anthropic_api_key: ${{ secrets.ANTHROPIC_API_KEY }}
          # Responds to @claude mentions in comments
```

Usage in comments:
```
@claude review this PR for security vulnerabilities
@claude check if this function handles edge cases correctly
@claude implement a feature based on this issue description
```

---

### Example 2: Automatic Code Review on PR Open

```yaml
name: Code Review
on:
  pull_request:
    types: [opened, synchronize]

jobs:
  review:
    runs-on: ubuntu-latest
    steps:
      - uses: anthropics/claude-code-action@v1
        with:
          anthropic_api_key: ${{ secrets.ANTHROPIC_API_KEY }}
          prompt: "/review"
          claude_args: "--max-turns 5"
```

---

### Example 3: Scheduled Code Analysis

```yaml
name: Daily Report
on:
  schedule:
    - cron: "0 9 * * *"  # Every day at 9am

jobs:
  report:
    runs-on: ubuntu-latest
    steps:
      - uses: anthropics/claude-code-action@v1
        with:
          anthropic_api_key: ${{ secrets.ANTHROPIC_API_KEY }}
          prompt: "Generate a summary of yesterday's commits and open issues"
          claude_args: "--model sonnet"
```

---

### Workflow Parameters Reference

```yaml
- uses: anthropics/claude-code-action@v1
  with:
    anthropic_api_key: ${{ secrets.ANTHROPIC_API_KEY }}  # Required
    prompt: "Your instructions here"       # Optional
    claude_args: "--max-turns 10"          # Optional CLI arguments
```

| Parameter | Description | Required |
|-----------|-------------|----------|
| `anthropic_api_key` | Your Anthropic API key | Yes |
| `prompt` | Instructions for Claude | No |
| `claude_args` | Additional CLI arguments (`--max-turns`, `--model`, etc.) | No |
| `trigger_phrase` | Custom trigger phrase (default: `@claude`) | No |

---

## GitLab CI/CD Integration (Brief Overview)

If you use GitLab, you can add a Claude Code job to `.gitlab-ci.yml`.

> GitLab integration is currently in beta.

```yaml
stages:
  - ai

claude:
  stage: ai
  image: node:24-alpine3.21
  rules:
    - if: '$CI_PIPELINE_SOURCE == "web"'
  before_script:
    - apk add --no-cache git curl bash
    - curl -fsSL https://claude.ai/install.sh | bash
  script:
    - claude -p "${AI_FLOW_INPUT:-'Review changes and suggest improvements'}"
      --permission-mode acceptEdits
      --allowedTools "Bash Read Edit Write"
```

Don't forget to add `ANTHROPIC_API_KEY` as a masked CI/CD variable in your GitLab project settings.

---

## ⚠️ Cost Warning

Automation **consumes a large number of tokens**.

- CI/CD pipelines run without human oversight, so costs can accumulate faster than expected.
- Use `--max-turns` to cap the number of conversation turns.
- Set workflow-level timeouts to prevent runaway jobs.
- Avoid triggering workflows unnecessarily.

```yaml
claude_args: "--max-turns 5 --model sonnet"
```

**In addition to API token costs, you'll also incur GitHub Actions compute minutes** if you exceed your plan's free tier.

---

## Security Best Practices

- **Never put API keys directly in code.** Always use GitHub Secrets.

```yaml
# Correct
anthropic_api_key: ${{ secrets.ANTHROPIC_API_KEY }}

# Never do this
anthropic_api_key: "sk-ant-api03-..."
```

- Always review Claude's suggestions before merging.
- Grant only the minimum permissions your action needs.

---

## A Note for Beginners

> **You don't need this feature right now.**

Headless mode and GitHub Actions integration are best introduced after you're comfortable with Claude Code basics. Get familiar with interactive use, CLAUDE.md configuration, and MCP first — then consider automation.

For now, it's enough to know this capability exists and bookmark it for later.

---

## Quick Reference

```
Headless mode:    claude -p "task description" --output-format json
GitHub Actions:   anthropics/claude-code-action@v1
Trigger:          @claude mention or automatic prompt
Cost control:     --max-turns, timeout, model selection
Security:         Always use Secrets for API keys
```
