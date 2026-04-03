# 20. Cost Management & Saving Tips

> Learn how to use Claude Code smarter and cheaper.

---

## Cost Structure at a Glance

Claude Code has two main pricing models:

| Type | Model | Details |
|------|-------|---------|
| **Claude.ai Pro / Max** | Flat-rate subscription | Fixed monthly fee, no separate API costs |
| **Anthropic API** | Pay-as-you-go | Charges based on tokens consumed |

**Claude.ai Pro/Max subscribers** have Claude Code usage included in their subscription — no additional API charges. The numbers shown by `/cost` are intended for API users, so subscribers can treat them as informational only.

**API users** are charged based on usage. According to official documentation, the average cost is approximately $6 per developer per day, with 90% of users staying under $12 per day.

---

## What Is a Token?

A **token** is the unit Claude uses to process text.

- English: roughly 1 word = 1–2 tokens
- A useful rule of thumb: **~4 characters ≈ 1 token**

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

## 5 Tips to Save Costs

### Tip 1: Compress Context with `/compact`

When a conversation grows long, run `/compact` to summarize prior content and reduce context size.

```
/compact Focus on code changes and test results
```

This preserves the important information while compressing unnecessary conversation history.

You can also set compaction behavior in advance in your CLAUDE.md:

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

The `/fast` command enables Fast Mode, making Opus 4.6 respond approximately 2.5x faster.

```
/fast
```

However, Fast Mode has **higher per-token pricing**. Use it when speed matters (rapid iteration, live debugging) and turn it off for long autonomous tasks where latency is less critical.

> **Note**: Fast Mode is billed as extra usage and is not included in your subscription's standard rate limits.

---

### Tip 5: Check Costs Regularly with `/cost`

API users can check token usage for the current session at any time:

```
/cost
```

Example output:
```
Total cost:            $0.55
Total duration (API):  6m 19.7s
Total duration (wall): 6h 33m 10.2s
Total code changes:    0 lines added, 0 lines removed
```

Subscribers can use `/stats` to view usage patterns instead.

You can also configure the status line to display context usage in real time.

---

## Model Cost Comparison (Summary)

| Model | Characteristics | Relative Cost |
|-------|----------------|---------------|
| Haiku | Fast and cheap, simple tasks | Lowest |
| Sonnet | Balanced performance, everyday coding | Medium |
| Opus | Maximum capability, complex reasoning | Highest |
| Opus (Fast Mode) | 2.5x faster Opus, higher per-token cost | Higher than Opus |

> For exact token pricing, see the [Anthropic pricing page](https://www.anthropic.com/pricing).

---

## The Advantage of Claude.ai Max

Claude.ai Pro and Max subscribers can use Claude Code **without pay-as-you-go API charges**.

- Claude Code usage is included in the monthly subscription
- No API key required
- Freedom to experiment without watching per-token costs
- Max plan includes higher usage limits

> **Note**: Fast Mode and context usage beyond 200K tokens (1M context window) may be billed as extra usage even on subscription plans.

---

## Team Cost Management

For teams using the API:

- **Set workspace spend limits**: Configure team-wide spending caps in the [Anthropic Console](https://platform.claude.com).
- **Usage dashboard**: View per-member cost and usage data in the Console.
- **Watch out for Agent Teams**: Running multiple Claude instances simultaneously (Agent Teams) uses approximately 7x more tokens than standard sessions.

---

## Summary: Cost-Saving Checklist

```
✅ Run /clear between unrelated tasks
✅ Start a new session when switching topics
✅ Specify exact file names and function names in prompts
✅ Use Haiku for simple tasks
✅ Enable Fast Mode only when speed is critical
✅ Check /cost or /stats regularly
✅ Set compact instructions in CLAUDE.md
```
