# 07. Understanding Core Concepts

> Understanding how Claude Code works helps you use it far more effectively.

---

## How Does Claude Code Work?

Claude Code is not just a chatbot. When you give it a task, it acts as an **Agent** — it plans, reads files, edits code, and verifies results on its own.

This process is called the **Agentic Loop**.

```
Your instruction
     ↓
1. Gather Context
   - Read files, search code, understand current state
     ↓
2. Take Action
   - Edit files, run commands, search the web
     ↓
3. Verify Results
   - Run tests, check for errors, revise if needed
     ↓
Task complete (or loop back to step 1)
```

For example, if you say "fix the failing tests," Claude Code will:
1. Run the test suite to see what's failing
2. Find and read the relevant source files
3. Edit the code to fix the issue
4. Run the tests again to confirm they pass

All of this happens **automatically**.

---

## 5 Core Concepts

### 1. Context — Claude's Working Memory

**Context** is everything Claude Code is currently "holding in mind": conversation history, file contents it has read, command outputs, CLAUDE.md instructions, and more.

Context has a **token limit**. If a conversation gets very long or you load many large files, context can fill up. Claude Code handles this automatically by summarizing older content.

```
# See what's using context space
/context

# Compact the conversation (summarize older parts)
/compact

# Compact with a specific focus
/compact focus on the API changes
```

> **Tip**: Put important rules and project info in CLAUDE.md. Claude reads it at the start of every session without consuming your active context budget.

---

### 2. Tools — What Claude Can Actually Do

Claude Code doesn't just talk — it uses **tools** to take real actions.

| Tool Category | What Claude Can Do |
|---------------|-------------------|
| **File operations** | Read files, edit code, create files, rename and reorganize |
| **Search** | Find files by pattern, search content with regex, explore codebases |
| **Execution** | Run shell commands, start servers, run tests, use git |
| **Web** | Search the web, fetch documentation, look up error messages |
| **Code intelligence** | Detect type errors after edits, jump to definitions, find references |

---

### 3. Permissions — Control What Claude Is Allowed to Do

Claude Code is powerful, so you have full control over **what it's allowed to do**.

Reading files is allowed by default, but editing files or running shell commands requires your approval.

There are three permission rule types:

| Rule | Behavior |
|------|----------|
| **Allow** | Claude proceeds without asking |
| **Ask** | Claude asks for your approval before acting |
| **Deny** | Claude never performs this action |

```
# View and manage permissions
/permissions
```

> **Priority order**: Deny > Ask > Allow. Deny rules always win.

---

### 4. Memory — Remembering Projects with CLAUDE.md

Claude Code doesn't remember previous sessions. But if you create a **CLAUDE.md** file, Claude reads it automatically at the start of every session to maintain project context.

Think of CLAUDE.md as a **standing instruction sheet** for Claude.

| File Location | Scope |
|---------------|-------|
| `./CLAUDE.md` | Current project only (shareable with team via git) |
| `~/.claude/CLAUDE.md` | All your projects (global preferences) |
| `./CLAUDE.local.md` | Personal project-specific settings (not committed to git) |

> CLAUDE.md is covered in depth in **[06. Mastering CLAUDE.md](./06-claude-md.md)**.

---

### 5. Session — From Start to Finish

A **session** is one continuous Claude Code conversation from when you launch it to when you exit.

- Starting a new session clears previous conversation history (CLAUDE.md is always preserved)
- Everything done during a session is saved

```bash
# Resume the most recent session
claude --continue

# Choose from recent sessions to resume
claude --resume

# Fork a session to try a different approach
claude --continue --fork-session
```

---

## "Why Does Claude Sometimes Pause and Ask for Confirmation?"

When Claude Code stops and asks for your approval, that's an **intentional safety feature**.

Before modifying files or running commands, it checks that the action is what you intended — especially important for hard-to-reverse operations like deleting files or deploying code.

---

## 3 Permission Modes Every Beginner Should Know

Press `Shift+Tab` to cycle through permission modes.

| Mode | Behavior | Best For |
|------|----------|----------|
| **Default** | Asks before file edits and shell commands | When you're new or working on critical tasks |
| **Auto-Accept** | Automatically accepts file edits; still asks for shell commands | When you want to move faster on coding tasks |
| **Plan Mode** | Read-only — analyzes but never modifies anything | When you want to review the plan before committing |

### How to Switch Modes

```
# Press Shift+Tab in the terminal to cycle through modes:
# Default → Auto-Accept → Plan Mode → Default → ...

# Or enter Plan Mode directly
/plan
```

### Mode Comparison Example

```
"Delete all console.log statements from every JavaScript file"

Default mode:
  → Asks "Can I modify this file?" before each file edit

Auto-Accept mode:
  → Edits files automatically; still asks before running git commit

Plan mode:
  → Shows "I plan to remove line 42 in src/utils.js" — but makes no actual changes
```

> **Recommendation**: Start with **Default mode** to observe what Claude does. Switch to **Auto-Accept** once you're comfortable with how it works.

---

## Checkpoints: You Can Always Undo

Before editing any file, Claude Code **automatically takes a snapshot** of the current state.

If something goes wrong:
- Press `Esc` twice in a row to rewind to a previous state
- Or just tell Claude: "undo what you just did"

---

## Next Steps

Now let's master CLAUDE.md — Claude Code's long-term memory system.

→ **[06. Mastering CLAUDE.md](./06-claude-md.md)**
