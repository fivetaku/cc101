# 20. Cost Management & Saving Tips

> Learn how to use Claude Code smarter and cheaper.

---

## Cost Structure at a Glance

Claude Code has two main pricing models:

| Type | Model | Details |
|------|-------|---------|
| **Claude.ai Pro / Max** | Flat-rate subscription | Fixed monthly fee, no separate API costs |
| **Anthropic API** | Pay-as-you-go | Charges based on tokens consumed |

**Claude.ai Pro/Max subscribers** have Claude Code usage included in their subscription — no additional API charges. The number shown by `/cost` is intended for API users, so subscribers can treat it as informational only.

**API users** are charged based on usage. According to official documentation, the average cost is about $13 per developer per active day ($150–250/month), with 90% of users staying under $30 per day.

---

## What Is a Token?

A **token** is the unit Claude uses to process text.

- English: roughly 1 word = 1–2 tokens
- Korean: roughly 2–3 characters = 1 token
- A useful rule of thumb: **~4 characters (English) ≈ 1 token**

In practice, tokens are consumed every time Claude reads a file, receives your message, or sends a response. The longer your conversation context grows, the more tokens each message costs.

---

## When Costs Run High

### 1. Repeatedly Reading Large Files

Every time Claude reads a file, it consumes tokens. Reading a 10,000-line log file in full can cost tens of thousands of tokens in one shot.

### 2. Keeping Context Open Too Long

As a conversation grows, all prior content stays in context. Continuing unrelated tasks in the same session causes irrelevant information to accumulate, driving up costs unnecessarily.

### 3. Using High-Power Models for Simple Tasks

Opus is more capable than Sonnet, but it also costs more per token. Using Opus for routine tasks is inefficient.

### 4. Uncontrolled Automation (CI/CD)

When running Claude Code through GitHub Actions or similar pipelines without guardrails, large volumes of tokens can be consumed without anyone noticing.

---

## 8 Tips to Save Costs

### Tip 1: Compress Context with `/compact`

When a conversation grows long, run `/compact` to summarize prior content and reduce context size.

```
/compact Focus on code changes and test results
```

This preserves the important information while compressing unnecessary conversation history.

You can also set compaction behavior in advance in your CLAUDE.md (the snippet below tells Claude to keep test output and code changes when compacting):

```markdown
# Compact instructions

When you are using compact, please focus on test output and code changes
```

> **Also useful**: `/clear` resets context entirely. Great when switching to a completely different task.

---

### Tip 2: Avoid Unnecessary File References

Vague requests cause Claude to read far more files than needed.

| Inefficient | Efficient |
|-------------|-----------|
| "Improve this codebase" | "Add input validation to the login function in auth.ts" |
| "Find the bug" | "Check src/auth/ for a login failure that happens after session expiry" |

Specific requests mean Claude reads only what it needs — fewer tokens consumed.

---

### Tip 3: Use the Haiku Model for Simple Tasks

Not every task needs the most powerful model.

| Model | Best For | Cost |
|-------|----------|------|
| **Haiku** | Quick questions, summaries, simple tasks | Lowest |
| **Sonnet** | General coding tasks (recommended default) | Medium |
| **Opus** | Complex architecture, difficult reasoning | Highest |

Switch models during a session:

```
/model haiku
```

Or specify at startup:

```bash
claude --model haiku
```

**`opusplan` mode**: A hybrid that automatically uses Opus during planning and Sonnet during execution — best of both worlds.

```
/model opusplan
```

---

### Tip 4: Use Fast Mode Wisely

The `/fast` command enables Fast Mode, making Opus models (currently Opus 4.8) respond up to ~2.5x faster.

```
/fast
```

However, Fast Mode has **higher per-token pricing**. Use it when speed matters (rapid iteration, live debugging) and turn it off for long autonomous tasks where latency is less critical.

> **Note**: Fast Mode is billed as extra usage and is not included in your subscription's standard rate limits.

---

### Tip 5: Check Regularly with `/usage`

Check the current session's token usage and your plan limits (`/cost` and `/stats` are aliases that open the same view):

```
/usage
```

Example output (session block):
```
Total cost:            $0.55
Total duration (API):  6m 19.7s
Total duration (wall): 6h 33m 10.2s
Total code changes:    0 lines added, 0 lines removed
```

Subscribers should treat the session cost at the top as informational and read the **plan usage bars and activity stats** on the same screen instead. It also breaks down usage by skill, sub-agent, plugin, and MCP server.

Set up a status line and you can watch cost and context usage in real time, like this:

<img src="/images/statusline-cost-tracking.png" alt="Session cost shown in the status line at the bottom of the terminal" style={{width:'100%', maxWidth:'640px', borderRadius:'8px', margin:'0.75rem 0'}} />

<img src="/images/statusline-context-window-usage.png" alt="Context usage percentage shown in the status line" style={{width:'100%', maxWidth:'640px', borderRadius:'8px', margin:'0.75rem 0'}} />

*Image source: [Claude Code official docs](https://code.claude.com/docs)*

---

### Tip 6: Put CLAUDE.md on a Diet

CLAUDE.md is read by Claude on **every response**. The longer it is, the more tokens it costs each time.

**Real impact**: trimming a bloated CLAUDE.md (~19,000 tokens) down to a core-only version (~9,000 tokens) can nearly halve the cost of the same task.

**What to cut**

```
Safe to delete:
- Long background explanations ("This project started in 2023...")
- Obvious repeated filler ("Always do your best")
- Multiple example code blocks (keep one or none)
- Vague rules ("Write good code")

Always keep:
- Prohibitions (what to never do)
- Project tech stack (1–3 line summary)
- Frequently referenced file paths
- Language/format rules (only the specific ones)
```

Most CLAUDE.md files can be cut by more than half.

---

### Tip 7: Block Unnecessary File Reads

Files Claude never needs to read — `node_modules`, build artifacts, large logs — can be blocked with **permission deny rules**. (There is no official `.claudeignore` file — you exclude files with deny rules in settings instead.)

Add this to your project's `.claude/settings.json`:

```json
{
  "permissions": {
    "deny": [
      "Read(./node_modules/**)",
      "Read(./dist/**)",
      "Read(./build/**)",
      "Read(./coverage/**)",
      "Read(**/*.log)"
    ]
  }
}
```

**When it helps most**
- Projects with many files, like monorepos
- When you frequently ask Claude to "analyze this whole project"
- When running Claude repeatedly via GitHub Actions or similar

---

### Tip 8: Tune Extended Thinking

Claude Code has **extended thinking** (thinking deeply before answering) on by default, and those thinking tokens are billed as output tokens. It helps on complex work, but it's a leading cause of higher costs on simple tasks.

- Use the `/effort` command to adjust thinking depth (low / medium / high, etc.)
- On days with lots of simple tasks, `/effort low` saves a significant number of tokens
- Only raise it to high or above for complex design and debugging

---

## Model Cost Comparison (Summary)

| Model | Characteristics | API Cost |
|-------|----------------|----------|
| Haiku | Fast and cheap, simple tasks | Lowest |
| Sonnet | Balanced performance, everyday coding | Medium |
| Opus | Maximum capability, complex reasoning | Expensive |
| Fable | Top-tier model, the hardest long-horizon work | Most expensive |
| Opus (Fast Mode) | Opus speed up to 2.5x, higher per-token cost | Higher than Opus |

> For exact token pricing, see the [Claude Platform pricing docs](https://platform.claude.com/docs/en/about-claude/pricing); for subscription plans, see [claude.com/pricing](https://claude.com/pricing).

---

## The Advantage of Claude.ai Max

Claude.ai Pro and Max subscribers can use Claude Code **without pay-as-you-go API charges**.

- Claude Code usage is included in the monthly subscription
- No API key required
- Freedom to experiment without watching per-token costs
- Max plan includes higher usage limits

> **Note**: Fast Mode and usage beyond the 1M-token context window may be billed as extra usage even on subscription plans.

---

## Team Cost Management

For teams using the API:

- **Set workspace spend limits**: Configure team-wide spending caps in the [Anthropic Console](https://platform.claude.com).
- **Usage dashboard**: View per-member cost and usage data in the Console.
- **Watch out for Agent Teams**: Agent Teams (running multiple Claude instances at once) is experimental and disabled by default (requires `CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1`); it uses roughly 7x more tokens than a standard session when teammates run in plan mode.

> 💡 The **kkirikkiri** plugin auto-composes an agent team to fit the task, and **pumasi** runs parallel development on a cheaper model when Codex is installed — or works with Claude alone when it isn't.

---

## Summary: Cost-Saving Checklist

```
✅ Run /clear between unrelated tasks
✅ Start a new session when switching topics
✅ Specify exact file names and function names in prompts
✅ Use Haiku for simple tasks
✅ Enable Fast Mode only when needed
✅ Check /usage regularly
✅ Set compact instructions in CLAUDE.md
✅ Trim CLAUDE.md to core rules and diet it periodically
✅ Block node_modules and build artifacts with permissions.deny rules
✅ Lower thinking depth with /effort low when doing lots of simple tasks
```
