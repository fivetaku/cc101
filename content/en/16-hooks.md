# 16. Hooks — Protect Your Work

> What if AI runs `rm -rf` or `git push --force` and wipes your history? With Hooks configured, **that can never happen.**

---

## Why you need Hooks

Claude Code is powerful. It creates, edits, deletes files, and runs Git commands. During vibe coding, these things actually happen:

- `rm -rf` wipes your entire project folder
- `git reset --hard` destroys all uncommitted work
- `git push --force` overwrites your teammates' code
- `DROP TABLE` deletes your database

**Hooks automatically block dangerous commands before Claude executes them.** Not relying on the LLM's "judgment" — blocking with code, 100% guaranteed.

---

## What are Hooks?

**Hooks** are shell commands that execute automatically when specific events occur in Claude Code.

| Event | When it fires | Common use |
|-------|--------------|------------|
| `PreToolUse` | **Before** a tool executes | Block dangerous commands |
| `PostToolUse` | After a tool succeeds | Auto-format, log activity |
| `Stop` | When Claude finishes responding | Completion notification |
| `Notification` | When Claude sends a notification | Desktop alerts |
| `SessionStart` | When a session starts or resumes | Inject context |
| `UserPromptSubmit` | When you submit a prompt | Pre-process input |
| `PreCompact` | Before context compaction | Preserve critical info |

> Key: `exit 0` = allow, `exit 2` = **block** (stderr message is sent to Claude)

---

## Where to configure

| Location | Scope | Shareable |
|----------|-------|-----------|
| `~/.claude/settings.json` | All your projects | No |
| `.claude/settings.json` | Current project | Yes (commit to Git) |
| `.claude/settings.local.json` | Current project | No |

> You can also use the `/hooks` command for interactive setup, but copy-pasting the examples below is faster.

---

## Essential Hook 1: Safety Hook — Block Dangerous Commands

**This single hook prevents most disasters.**

### Step 1: Create the script

Create `~/.claude/hooks/block_dangerous.py`:

```python
#!/usr/bin/env python3
"""Safety Hook — automatically block dangerous commands"""
import json, re, sys

BLOCKED_PATTERNS = [
    # Block file deletion — use trash instead (recoverable)
    (r"\brm\s+", "Use trash instead of rm (brew install trash)"),
    (r"\bunlink\s+", "Use trash instead of unlink"),

    # Block Git history destruction
    (r"git\s+reset\s+--hard", "git reset --hard destroys uncommitted work"),
    (r"git\s+push\s+.*--force", "git push --force overwrites remote history"),
    (r"git\s+push\s+.*-f\b", "git push -f overwrites remote history"),
    (r"git\s+clean\s+-.*f", "git clean -f permanently deletes untracked files"),
    (r"git\s+checkout\s+\.\s*$", "git checkout . discards all changes"),
    (r"git\s+stash\s+drop", "git stash drop permanently deletes a stash"),
    (r"git\s+branch\s+-D", "git branch -D force-deletes a branch"),

    # Block database destruction
    (r"DROP\s+(DATABASE|TABLE)", "DROP permanently deletes data"),
    (r"TRUNCATE\s+TABLE", "TRUNCATE deletes all data"),
]

data = json.load(sys.stdin)
if data.get("tool_name") != "Bash":
    sys.exit(0)

command = data.get("tool_input", {}).get("command", "")
for pattern, reason in BLOCKED_PATTERNS:
    if re.search(pattern, command, re.IGNORECASE):
        print(f"Blocked: {reason}", file=sys.stderr)
        sys.exit(2)

sys.exit(0)
```

### Step 2: Make it executable

Run in your terminal:

```bash
chmod +x ~/.claude/hooks/block_dangerous.py
```

### Step 3: Register the hook

Add to `~/.claude/settings.json`:

```json
{
  "hooks": {
    "PreToolUse": [
      {
        "matcher": "Bash",
        "hooks": [
          {
            "type": "command",
            "command": "python3 ~/.claude/hooks/block_dangerous.py"
          }
        ]
      }
    ]
  }
}
```

### How it works

When Claude tries to run `rm -rf node_modules`:

1. `PreToolUse` event fires → `block_dangerous.py` runs
2. The command matches the `rm` pattern
3. Script exits with code `2` → **blocked** + "Use trash instead" message sent to Claude
4. Claude receives the message and runs `trash node_modules` instead

> **trash** sends files to the system trash so you can recover from mistakes. Install with `brew install trash` (macOS) or `npm install -g trash-cli`.

### Adding more blocked patterns

Add entries to the `BLOCKED_PATTERNS` list:

```python
# Example: block chmod 777
(r"chmod\s+777", "chmod 777 is a security risk"),

# Example: block SSH to production
(r"ssh\s+.*prod", "Production server access blocked"),
```

---

## Essential Hook 2: Completion Notification

Get notified with a sound when Claude finishes. Never miss it while vibe coding in another window.

### macOS — System sounds

```json
{
  "hooks": {
    "Stop": [
      {
        "matcher": "",
        "hooks": [
          {
            "type": "command",
            "command": "afplay /System/Library/Sounds/Glass.aiff"
          }
        ]
      }
    ],
    "Notification": [
      {
        "matcher": "",
        "hooks": [
          {
            "type": "command",
            "command": "afplay /System/Library/Sounds/Frog.aiff"
          }
        ]
      }
    ]
  }
}
```

> Use **different sounds** for `Stop` vs `Notification` to tell "done" from "needs attention" by ear.

Browse available macOS system sounds:

```bash
ls /System/Library/Sounds/
```

### macOS — Desktop notification popup

Show a notification popup instead of (or in addition to) sound:

```json
{
  "type": "command",
  "command": "osascript -e 'display notification \"Task complete\" with title \"Claude Code\"'"
}
```

### Linux

```json
{
  "type": "command",
  "command": "notify-send 'Claude Code' 'Task complete'"
}
```

---

## Combined setup

Safety Hook + completion notification in one `settings.json`:

```json
{
  "hooks": {
    "PreToolUse": [
      {
        "matcher": "Bash",
        "hooks": [
          {
            "type": "command",
            "command": "python3 ~/.claude/hooks/block_dangerous.py"
          }
        ]
      }
    ],
    "Stop": [
      {
        "matcher": "",
        "hooks": [
          {
            "type": "command",
            "command": "afplay /System/Library/Sounds/Glass.aiff"
          }
        ]
      }
    ],
    "Notification": [
      {
        "matcher": "",
        "hooks": [
          {
            "type": "command",
            "command": "afplay /System/Library/Sounds/Frog.aiff"
          }
        ]
      }
    ]
  }
}
```

> If you already have a `settings.json`, just add or merge the `hooks` key. Use `/hooks` to verify.

---

<details>
<summary>More examples: Additional Hook use cases</summary>

### Protect sensitive folders

Block Claude from editing `customers/` or `invoices/` directories:

```json
{
  "hooks": {
    "PreToolUse": [
      {
        "matcher": "Edit|Write",
        "hooks": [
          {
            "type": "command",
            "command": "FILE=\"$(jq -r '.tool_input.file_path // empty')\"; if [[ \"$FILE\" == customers/* || \"$FILE\" == invoices/* ]]; then echo \"Blocked: sensitive folder\" >&2; exit 2; fi"
          }
        ]
      }
    ]
  }
}
```

### Auto-inject context on session start

```json
{
  "hooks": {
    "SessionStart": [
      {
        "matcher": "",
        "hooks": [
          {
            "type": "command",
            "command": "cat ~/work-rules.txt"
          }
        ]
      }
    ]
  }
}
```

### Prompt-based hooks (advanced)

For decisions requiring judgment, use `type: "prompt"`:

```json
{
  "hooks": {
    "Stop": [
      {
        "hooks": [
          {
            "type": "prompt",
            "prompt": "Check if all tasks are complete. If not, continue working."
          }
        ]
      }
    ]
  }
}
```

</details>

---

## Troubleshooting

| Problem | Fix |
|---------|-----|
| Hook not firing | Run `/hooks` to confirm it appears; check matcher casing |
| Script not executing | Run `chmod +x` to add execute permission |
| JSON parse error | Wrap `echo` in `~/.zshrc` with an interactive shell check |
| All file edits blocked | Check the `exit 2` condition in your `PreToolUse` hook |

Debug: `claude --debug` or `Ctrl+O` to see hook execution logs.

---

## One-line summary

> **Safety Hook + Completion Notification** — just these two make vibe coding dramatically safer and smoother. Prevent the `rm` disaster before it happens.

Next section: package repeatable workflows into Skills.
