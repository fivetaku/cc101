# 14. Useful Features to Know

> A collection of features that make Claude Code more convenient to use.

---

## Easier Input

### Image Input

You can show Claude error screenshots, UI design mockups, and more directly.

- **Ctrl+V** — Paste an image from clipboard (Cmd+V also works in iTerm2; Alt+V on Windows/WSL) — an `[Image #1]` chip appears in the input box
- **Drag and drop** — Drag an image file into the terminal window
- **File path** — `"Analyze this image: /path/to/image.png"`
- **/dd plugin** — with gptaku's dd installed, one `/dd` command sends whatever is on your clipboard (text or image) without pasting
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
- Requires a Claude.ai account login (not available with API-key auth); not available over SSH

> Especially useful when you have a long explanation and don't feel like typing it out.

---

## Undo Mistakes

### Checkpoint & Rewind (Esc Esc, /rewind)

Claude automatically saves a snapshot before modifying files.

- Press **Esc twice** (with an empty input box) or type `/rewind` — both open the same **rewind menu**
- Pick a point to go back to, then choose to restore the code only, the conversation only, or both
- Works automatically with no setup required — the fastest way to undo changes, even if you don't know git

```
> /rewind
→ A list of restore points appears — select where you want to go back to
→ Choose the restore scope: code / conversation / both
```

> ⚠️ Rewind only undoes what Claude changed with its file-editing tools. Files changed or deleted by terminal commands (bash), or edited outside Claude Code, are not restored. Use Git for permanent backups.

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
- Adding "ultrathink" to your prompt nudges Claude to think more deeply for that turn

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

**Image Generation (/pumasi-image)** — With gptaku's pumasi plugin installed, generate images right from the terminal, e.g. `/pumasi-image make a thumbnail for my talk` (uses Codex image generation).
