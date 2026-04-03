# Useful Features to Know

> A collection of features that make Claude Code more convenient to use.

---

## Easier Input

### Image Input

You can show Claude error screenshots, UI design mockups, and more directly.

- **Ctrl+V** — Paste an image from clipboard (on macOS, use Ctrl+V, not Cmd+V)
- **Drag and drop** — Drag an image file into the terminal window
- **File path** — `"Analyze this image: /path/to/image.png"`
- Supported formats: JPEG, PNG, GIF, WebP (max 5MB)

```
> Find the error in this screenshot [paste with Ctrl+V]
> @design-mockup.png Build this according to the mockup
```

### Voice Input (/voice)

You can give instructions by speaking instead of typing.

- Type `/voice`, then **hold the spacebar** and speak
- Supports 20 languages including Korean
- You can mix voice and typed input
- Beta feature (gradually expanding)

> Especially useful when you have a long explanation and don't feel like typing it out.

---

## Undo Mistakes

### Checkpoint (Esc Esc)

Claude automatically saves a snapshot before modifying files.

- Press **Esc twice** to revert to the previous state
- Works automatically with no setup required
- The fastest way to undo changes, even if you don't know git

### /rewind

Rewinds both the conversation and code to a previous point.

- Useful when you need to go back multiple steps
- If `Esc Esc` is a one-step undo, `/rewind` lets you go back to any point you choose

```
> /rewind
→ A list of checkpoints appears — select where you want to go back to
```

---

## When Sessions Get Long

### Auto-compact

When conversations grow long, Claude automatically tidies up older content.

- Works automatically with no setup required
- Rules written in CLAUDE.md are preserved and never deleted
- You can also trigger it manually with a specific focus:

```
> /compact Summarize focusing on API changes
```

### Auto Memory

Claude automatically remembers important information during work.

- Works independently of CLAUDE.md
- Retains context from previous sessions even after switching
- Use `/memory` to view and edit saved memories

### Extended Thinking (/effort)

Sets Claude to think more deeply on complex problems.

- Enabled by default (no setup needed)
- `/effort high` — Deep thinking for hard problems (slower but more accurate)
- `/effort low` — Quick responses for simple questions
- Adding "ultrathink" to your prompt activates maximum thinking depth for that turn only

---

## Staying Safe

### Permission Modes

Claude asks for confirmation before modifying files or running commands.

| Mode | Description |
|------|-------------|
| **Ask (default)** | Asks every time — safest for beginners |
| **Auto-accept** | Auto-approves trusted operations |
| **Plan** | Shows the plan before executing, then asks for approval |

- Switch modes with `/permissions`
- Start with the default (Ask) and get comfortable before changing

---

## More Things You Can Do

**Computer Use** — Claude can see your screen and directly control your mouse and keyboard. Useful for app testing and GUI automation. (Research Preview, macOS)

**Remote Control** — Continue work started in the terminal from your phone or another device. Connect by scanning a QR code.

**Chrome Integration** — Claude directly controls the Chrome browser. Useful for web testing, data extraction, and automated form filling.

**Scheduled Tasks (/loop)** — Run a specific prompt at set intervals. Useful for monitoring and regular checks.
