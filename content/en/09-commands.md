# 09. Command Reference

> A complete quick-reference for every command you need when using Claude Code.

---

## Three Types of Commands

Claude Code commands fall into three categories.

| Type | Where to type | Example |
|------|--------------|---------|
| **CLI commands** | Terminal (outside Claude Code) | `claude`, `claude --version` |
| **Slash commands** | Inside a session | `/help`, `/compact` |
| **Keyboard shortcuts** | Inside a session | `Ctrl+C`, `Shift+Enter` |

---

## CLI Commands (Typed in the Terminal)

These commands launch or control Claude Code from your terminal prompt.

### Basic Launch Commands

| Command | Description | Example |
|---------|-------------|---------|
| `claude` | Start interactive mode | `claude` |
| `claude "question"` | Start with an initial prompt | `claude "explain this project"` |
| `claude -p "question"` | Print response and exit (good for scripting) | `claude -p "explain this function"` |
| `claude -c` | Continue the most recent conversation | `claude -c` |
| `claude --version` or `claude -v` | Show installed version | `claude -v` |
| `claude --help` | Show help | `claude --help` |
| `claude update` | Update to the latest version | `claude update` |

### Specifying a Model

```bash
# Start with a model alias (aliases always resolve to the latest version)
claude --model opus
claude --model sonnet
claude --model haiku
claude --model fable   # highest-tier model (availability depends on your plan)
```

### Useful Startup Options

```bash
# Start in Plan Mode (read-only — Claude plans but doesn't edit files)
claude --permission-mode plan

# Resume a named session
claude --resume my-session-name

# Pick a session from an interactive list
claude --resume
```

> **Tip**: Just type `claude` to get started. Learn the other flags as you need them.

---

## Slash Commands (Typed During a Session)

Type `/` at the prompt inside Claude Code to access built-in commands.

### Most Useful Slash Commands

| Command | Description |
|---------|-------------|
| `/help` | Show all available commands |
| `/compact` | Compress the conversation (essential for long sessions!) |
| `/clear` | Clear conversation history and start fresh |
| `/usage` | Check session cost + plan usage + activity stats (`/cost` and `/stats` are aliases of this command) |
| `/model` | Change the AI model |
| `/permissions` | View and manage tool permissions |
| `/memory` | Edit CLAUDE.md memory files |
| `/quit` or `/exit` | Exit Claude Code |
| `/plan` | Enter Plan Mode |
| `/init` | Generate a CLAUDE.md file for the project |
| `/doctor` | Check installation health |
| `/theme` | Change the color theme |
| `/branch [name]` | Clone the current conversation into an independent branch — the original stays available via `/resume` (great for experiments) |
| `/fork <directive>` | Hand a separate task to a background subagent that inherits the whole conversation |
| `/context` | Visualize context-window token usage |
| `/rename [name]` | Name the current session (resume with `--resume name`) |
| `/feedback` | Send feedback / a bug report to Anthropic (`/bug` is the same command) |
| `/login` | Log in to Anthropic account |
| `/logout` | Log out of Anthropic account |
| `/rewind` | Restore conversation and code to a previous state |

### How to Use Slash Commands

```
> /compact
→ Compresses the conversation to free up context

> /compact focus on code changes only
→ You can give compaction instructions

> /model
→ Opens the model picker
```

> **Tip**: Type `/` alone to see an autocomplete list of all available commands.

---

## Conversation Branching & Experiment Strategy

Use these features when you want to change direction mid-conversation or try a risky experiment safely.

### `/branch` — Experiment While Keeping the Original

Switches to a branch that clones the current conversation. Create a branch before attempting a complex refactor or structural change, and if it fails you can return to the original conversation with `/resume`.

```
> /branch experiment
→ Switches to a branch with the current conversation state intact
→ The original conversation is preserved (return with /resume)
```

**Use it when**
- You want to try one of several implementation approaches first
- You're tempted to try "what if I fixed it this way" but worried about failing
- You want to compare different approaches to the same problem

### `/fork` — A Background Helper That Inherits the Conversation

Spins up a **background subagent** that inherits the entire conversation so far and hands it a separate task. You keep working, and the result comes back to your conversation when it's done.

```
> /fork Write up everything we've discussed so far as a document
→ Runs separately in the background while you keep working
→ The result arrives in your conversation when complete
```

`/branch` switches you onto a branch yourself; `/fork` hands a branch off to another worker.

### `/context` — Check Context Usage

```
> /context
→ [■■■■■■■□□□] 70% used
```

Visually shows what percentage of the context window your current conversation is using. When it's over 80%, consider `/compact` (compress) or `/clear` (reset).

### `/rename` — Name a Session

Name an important work session so you can easily resume it later.

```
> /rename competitor-research-feb

# Later, resume from the terminal
$ claude --resume competitor-research-feb
```

---

## Keyboard Shortcuts

Control Claude Code quickly without leaving the keyboard.

### Essential Shortcuts

| Shortcut | Description |
|----------|-------------|
| `Ctrl+C` | Cancel the current operation (stop Claude mid-task) |
| `Ctrl+D` | Exit Claude Code |
| `Ctrl+L` | Clear the terminal screen (conversation history is kept) |
| `Ctrl+R` | Search through command history |
| `Ctrl+G` | Open current input in your default text editor |
| `Ctrl+T` | Toggle the task list |

### Input Shortcuts

| Shortcut | Description |
|----------|-------------|
| `Shift+Enter` | Insert a newline (for multi-line prompts) |
| `Option+Enter` (macOS) | Insert a newline (macOS default) |
| `\` + `Enter` | Insert a newline (works in all terminals) |
| `↑` / `↓` arrow keys | Navigate command history |
| `Esc` + `Esc` (double) | Opens the rewind menu — pick a point to restore conversation/code (when the input box is empty) |

### Mode Switching Shortcuts

| Shortcut | Description |
|----------|-------------|
| `Shift+Tab` | Cycles permission modes (default → auto-accept → plan → default …) |
| `Option+P` (macOS) / `Alt+P` | Switch model |
| `Option+T` (macOS) / `Alt+T` | Toggle extended thinking |
| `Ctrl+B` | Move a running task to the background |

> **macOS note**: Option-combo shortcuts like `Option+P` only work if your terminal is set to treat the Option key as Meta (in iTerm2: Settings → Profiles → Keys → set Option key to "Esc+"). `Option+T` works without any setup in recent versions.

---

## Top 5 Commands for Beginners

If you're just starting out, memorize these five first.

### 1. `/compact` — The Most Important Command

```
> /compact
```

As a session grows longer, Claude slows down and may forget earlier context. `/compact` compresses the conversation and restores performance. **Use it regularly during long work sessions.**

### 2. `Ctrl+C` — Stop Immediately

Press this whenever Claude is heading in the wrong direction or you realize you made a mistake in your prompt. It stops Claude immediately.

### 3. `/clear` — Start Fresh

```
> /clear
```

Use this when switching to a completely different task. All previous conversation history is erased.

### 4. `Shift+Enter` — Write Multi-Line Prompts

For detailed instructions that don't fit on one line, use `Shift+Enter` to add new lines.

```
(Example of multi-line input with Shift+Enter)
Create a login page with:
- Email and password fields
- Show/hide password toggle
- Login button with loading state
- Form validation with error messages
```

### 5. `/usage` — Check Your Usage

```
> /usage
```

Shows session cost, plan usage limits, and activity stats in one screen. Typing `/cost` or `/stats` opens the same screen. For subscription users, the session cost at the top (shown in dollars) is just a reference — look at the plan usage bar instead.

---

## Terminal Aliases (Shortcut Commands)

Instead of typing long commands every time, add short aliases to save time.

### macOS / Linux (zsh)

Add to `~/.zshrc`:

```bash
alias cc='claude'
alias ccd='claude --dangerously-skip-permissions'
alias ccr='claude --resume --dangerously-skip-permissions'
```

Then apply:

```bash
source ~/.zshrc
```

### Windows (PowerShell)

Add to `$PROFILE`:

```powershell
function cc { claude @args }
function ccd { claude --dangerously-skip-permissions @args }
function ccr { claude --resume --dangerously-skip-permissions @args }
```

Restart PowerShell to apply.

### What Each Alias Does

| Alias | Meaning | When to Use |
|-------|---------|-------------|
| `cc` | Basic start | Always |
| `ccd` | Auto-approve all permissions | Trusted projects, fast iteration |
| `ccr` | Resume last session + auto-approve | Picking up where you left off |

> ⚠️ **Warning**: `--dangerously-skip-permissions` auto-approves all file edits, command execution, and other actions without asking. Only use it in projects you trust and environments you control.

---

## Quick Reference Card

```
Terminal (before starting):
  claude                 → Start
  claude -v              → Check version
  claude --help          → Help
  claude -c              → Continue last conversation
  claude --resume [name] → Resume a named session
  claude --add-dir [path]→ Include an extra directory

Aliases (after setup):
  cc                  → claude (basic)
  ccd                 → auto-approve all permissions
  ccr                 → resume last session + auto-approve

Inside a session:
  /help               → All commands
  /compact            → Compress conversation (use often!)
  /clear              → Reset conversation
  /branch [name]      → Create a conversation branch (original preserved)
  /fork <directive>   → Background branch task
  /context            → Check context usage
  /usage              → Check cost & usage (/cost, /stats same)
  /model              → Change model
  /rename [name]      → Name the session
  /feedback           → Send feedback / bug report
  /quit               → Exit

Keyboard shortcuts:
  Ctrl+C              → Cancel current action
  Ctrl+D              → Exit
  Ctrl+B              → Move running task to background
  Shift+Enter         → New line in prompt
  ↑↓ arrows           → Navigate history
  Esc Esc             → Rewind menu (when input box is empty)
```
