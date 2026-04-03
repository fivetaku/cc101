# 12. Common Mistakes & How to Fix Them

> Ten problems beginners run into most often, in Q&A format — with clear solutions for each.

---

## Q1. "command not found: claude"

### Symptom

```bash
$ claude
zsh: command not found: claude
```

### Cause & Fix

Claude Code is installed, but your terminal doesn't know where to find it.

**Option 1: Use the native installer (most reliable)**

```bash
# macOS / Linux / WSL
curl -fsSL https://claude.ai/install.sh | bash
```

After installation, close your terminal completely and open a new one.

**Option 2: Check your PATH**

```bash
# Find where claude is installed
which claude

# See your current PATH
echo $PATH
```

If `~/.local/bin` is missing from PATH, add it to your shell config (`.zshrc` or `.bashrc`):

```bash
export PATH="$HOME/.local/bin:$PATH"
```

Then run `source ~/.zshrc` (or open a new terminal).

**Option 3: Run the health check**

```bash
claude doctor
```

This diagnoses common installation problems automatically.

---

## Q2. Login / Authentication Isn't Working

### Symptoms

- Browser doesn't open during login
- Authentication screen hangs
- Still getting auth errors after logging in

### Fixes

**Browser popup doesn't open**

When prompted during `claude` startup, press `c` to copy the OAuth URL to your clipboard, then paste it into your browser manually.

**Log out and re-authenticate**

```
# Inside Claude Code
> /logout

# Or delete the auth file directly
rm -rf ~/.config/claude-code/auth.json
claude
```

**Run the health check first**

```bash
# Inside Claude Code
> /doctor
```

**Full reset (last resort)**

```bash
# ⚠️ Only use this if the above methods don't resolve the issue
rm ~/.claude.json
rm -rf ~/.claude/
claude
```

> Warning: This erases all settings, session history, and plugin configurations. Always try `/doctor` first.

---

## Q3. Claude Code Is Too Slow

### Cause

As a session grows longer, Claude has more context to process on every message. This is expected behavior — performance degrades as the context window fills.

### Fixes

**Option 1: `/compact` — the most effective fix**

```
> /compact
```

This compresses conversation history and restores speed.

**Option 2: `/clear` — start fresh**

If you don't need to continue the current conversation:

```
> /clear
```

**Option 3: Switch to a faster model**

Haiku and Sonnet are significantly faster than Opus for most tasks.

```
> /model
```

Select a faster model from the picker.

**Option 4: Disable unused MCP servers**

Too many connected MCP servers add overhead even when idle.

```
> /mcp
```

Disable any servers you're not actively using.

---

## Q4. Claude Isn't Doing What I Asked

### Cause

The instruction was too vague, Claude doesn't have enough project context, or repeated corrections have created a confused conversation state.

### Fixes

**Option 1: Be more specific**

```
# Vague
> Improve the code

# Specific
> In the login function in auth.js, add email format validation
  using a regex. Insert it on line 42, right before the
  password check.
```

**Option 2: Add rules to CLAUDE.md**

For requirements that come up repeatedly, save them as permanent project rules.

```
> /memory
```

Or edit CLAUDE.md directly:

```markdown
# Code style rules
- All error messages must be in English
- Every function requires a JSDoc comment
- Never use var — use const or let only
```

**Option 3: Clear and start over after two failed corrections**

```
> /clear
```

Start fresh with a better-written prompt.

---

## Q5. Claude Modified the Wrong Files

### Fixes

**Option 1: Rewind inside Claude Code (fastest)**

```
Press Esc twice in a row
or:
> /rewind
```

This restores both the conversation and the code to the previous state.

**Option 2: Recover with git**

```bash
# See what changed
git diff

# Restore a single file
git checkout -- src/auth/login.js

# Discard all changes
git checkout .
```

**Option 3: Build the git commit habit (prevention)**

Before any significant Claude Code session:

```bash
git add .
git commit -m "checkpoint before Claude session $(date +%Y%m%d-%H%M)"
```

---

## Q6. My Bill Spiked Unexpectedly

### Causes

- Session context got very long (more context = more tokens per message)
- Asked Claude to read the entire codebase without a specific focus
- Left Opus running for simple tasks
- Used the agent teams feature

### Fixes

**Check current usage**

```
> /cost
```

This is for API key users. Subscription users should use `/stats`.

**How to reduce costs**

1. Use `/compact` regularly to keep context small
2. Switch to Sonnet or Haiku for routine tasks (`/model`)
3. Avoid asking Claude to read large directories with no specific goal
4. Run `/clear` between unrelated tasks

**Set a budget cap for automation**

```bash
claude -p --max-budget-usd 1.00 "your query here"
```

---

## Q7. I'm Getting Too Many Permission Prompts

### Situation

Claude asks for approval every time it tries to edit a file or run a command.

### Fixes

**Option 1: Allow frequently-used tools permanently**

```
> /permissions
```

In the permissions UI, set specific tools to Always Allow.

**Option 2: Enable Auto-Accept Edits for the session**

```
Press Shift+Tab to cycle to Auto-Accept Edit Mode
```

File edits are automatically approved for the duration of the session.

**Option 3: Understand the permission modes**

| Mode | Description | When to use |
|------|-------------|-------------|
| Default | Prompts on first use of each tool | Everyday use |
| Plan Mode | Read-only — no file edits | Safe exploration |
| Auto-Accept | File edits auto-approved | Trusted workflows |
| bypassPermissions | Skips all checks | Isolated containers only |

**About `--dangerously-skip-permissions`**

This flag disables every permission check. Only use it inside an isolated container or VM. On your main machine, it can allow accidental deletion or modification of system files.

---

## Q8. Garbled Text or Encoding Issues

### Cause

The terminal isn't using UTF-8 encoding.

### Fixes

**macOS / Linux**

Add these lines to your shell config (`.zshrc` or `.bashrc`):

```bash
export LANG=en_US.UTF-8
export LC_ALL=en_US.UTF-8
```

Then run `source ~/.zshrc` or open a new terminal.

**Check terminal app settings**

- **iTerm2**: Preferences → Profiles → Terminal → Character Encoding → UTF-8
- **macOS Terminal**: Preferences → Profiles → Advanced → Character Encoding → Unicode (UTF-8)
- **VS Code terminal**: Uses UTF-8 by default — usually not an issue

**Windows (WSL)**

```bash
sudo locale-gen en_US.UTF-8
```

---

## Q9. Claude Lost Context (Session Feels Reset)

### Situation

- Claude doesn't remember what it did earlier
- The session was interrupted
- You closed and reopened the terminal

### Fixes

**Option 1: Resume the previous session**

```bash
# Resume the most recent session
claude --continue

# Pick from a list of recent sessions
claude --resume

# Resume by name (if you named it earlier)
claude --resume auth-refactor
```

**Option 2: Name your sessions before they matter (prevention)**

At the start of important work:

```
> /rename login-feature-dev
```

**Option 3: Store critical context in CLAUDE.md**

Information that must survive a session restart belongs in CLAUDE.md:

```
> /memory
```

```markdown
# Current Work in Progress
- Goal: Implement OAuth2 authentication
- Done: Basic login / logout
- In progress: Social login (Google, GitHub)
- Stack: Next.js, Prisma, NextAuth.js
```

---

## Q10. Claude Changed Way More Than Expected

### Situation

You asked for a small fix and Claude rewrote unrelated files across the project.

### Fixes

**Option 1: Stop immediately**

If Claude is still working:

```
Ctrl+C
```

or press `Esc` to interrupt.

**Option 2: Rewind**

```
Press Esc twice
or:
> /rewind
```

**Option 3: Review and recover with git**

```bash
# See which files changed
git status

# Review the diff
git diff

# Restore a specific file
git checkout -- path/to/file

# Discard everything
git checkout .
```

**Option 4: Use Plan Mode before big tasks (prevention)**

```
Shift+Tab (twice to enter Plan Mode)
```

Or start a session in Plan Mode:

```bash
claude --permission-mode plan
```

Review Claude's plan before allowing it to make any changes.

**Option 5: Scope your instructions clearly**

```
# Clearly limit the scope
> Only modify the login function in auth.js — do not touch any other files

# Exclude certain actions explicitly
> Fix the bug only — don't refactor or clean up anything else
```

---

## Prevention Checklist

```
Before starting a session:
□ Did you navigate to the project folder? (cd my-project)
□ Did you run git commit for important changes?
□ Does CLAUDE.md have up-to-date project rules?

During the session:
□ Are your instructions specific enough?
□ Are you requesting one thing at a time?
□ Using /compact when the session gets long?
□ Pressing Ctrl+C immediately when something looks wrong?

After the session:
□ Did you review the changes? (git diff)
□ Do tests still pass?
□ Did you name the session if you might want to resume it? (/rename)
```

---

> If your problem isn't covered here, run `/doctor` inside Claude Code to check installation health, or type `/bug` to report the issue directly to Anthropic.
