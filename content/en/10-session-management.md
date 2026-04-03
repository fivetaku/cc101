# 10. Session & Context Management

> How to use Claude Code longer and more efficiently — compress long sessions, resume previous work, and add safety checks before complex tasks.

---

## What Is the Context Window?

Claude Code (like all AI) has a memory limit for how much it can hold at once. This is called the **context window**.

```
As conversations grow longer:
  Earlier content starts getting "pushed out"
  → Claude may forget work done earlier in the session
  → Response quality starts to drop
```

> **Analogy**: When your desk gets too full, old documents get pushed off. You need to tidy up occasionally.

Managing your context before it fills up keeps quality consistent.

---

## /compact — Compress the Conversation

```
/compact
```

Summarizes the current conversation to free up context space.

- Important content is preserved in the summary
- The session continues without interruption
- **When to use**: When the conversation feels long, or when answers start getting odd

---

## Resuming Sessions

### --continue — Resume the Last Session

```bash
claude --continue
```

Picks up exactly where you left off in the most recent session.

- When you close the terminal and come back
- When you want to continue work the next day

### --resume — Choose a Session to Resume

```bash
claude --resume
```

Shows a list of previous sessions to choose from.

- When working on multiple projects in parallel
- When you want to return to a specific session from days ago

---

## When to Start a New Session

| Situation | Recommendation |
|-----------|---------------|
| Completely different topic or project | New session |
| Claude starts forgetting earlier content | New session + re-provide context |
| Same error keeps repeating | New session (possible context contamination) |
| Long conversation, same task | /compact and continue |
| Resuming work the next day | --continue |

---

## Plan Mode Before Complex Tasks

When you're about to modify many files or make a large change, turn on Plan Mode first.

```
Shift + Tab  →  Toggle Plan Mode
```

In Plan Mode, Claude will:
1. Show only the execution plan (no files are changed)
2. Ask "Does this look right?" before doing anything
3. Execute only after you approve

**When to use**: Modifying multiple files at once, restructuring folders, changing database schemas, any operation that's hard to undo

---

## Parallel Sessions

You can open multiple terminal windows and work on different things simultaneously.

```
Terminal 1: claude (frontend work)
Terminal 2: claude (backend API work)
Terminal 3: claude (writing docs)
```

Each session runs independently.

> **Caution**: If two sessions modify the same file at the same time, conflicts can occur.

---

## Effective Conversation Strategies

### Don't ask for everything at once

The most common mistake beginners make is requesting everything in a single prompt.

```
# Not recommended — scope too broad, easy to go off track midway
> Build the login, dashboard, DB connection, API, tests, and deployment all at once
```

```
# Recommended — proceed step by step, checking as you go
> First, set up the project structure
(review)
> Now build the login feature
(review)
> Next, add the dashboard
```

Request one task per turn, review the result, then move on. It might feel roundabout, but it's actually faster and more accurate.

### When to split sessions vs. continue

| Situation | Recommendation |
|-----------|---------------|
| Continuing to refine the same feature | Continue (`--continue`) |
| Context getting long and slowing down | `/compact` then continue |
| Still getting odd responses after `/compact` | New session + re-provide key context |
| Completely different task | New session |
| Multiple independent tasks | Run parallel sessions |

### Track progress with CLAUDE.md

If a project spans multiple days, record the current state in CLAUDE.md.

```markdown
# Current Progress
- Login feature: complete
- Dashboard: layout done, needs data integration
- Next up: connect live data to dashboard
```

Even when starting a new session, Claude reads CLAUDE.md and immediately picks up the context.

---

## Common Situations & Fixes

### When Claude's Answers Suddenly Get Weird

1. Try `/compact` to compress the conversation
2. If still odd → start a new session
3. In the new session, re-provide only the key context: `"I'm working on [project], have done [summary] so far, and now need to [next task]."`

### When You Need to Stop Mid-Task

```
During work → Ctrl+C to interrupt
→ Close terminal
→ Next time: claude --continue
```

Claude remembers the state and can pick up from where it stopped.

---

> **Connected to cost savings**: Longer context means more tokens used. Using /compact regularly also reduces your bill. → Token costs are covered in detail in the Cost Management section.
