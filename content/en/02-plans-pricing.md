# 03. Pricing Guide

> You need a paid subscription to use Claude Code. For serious use, we recommend Max $100.

---

## Pro vs Max Plan Comparison

> Check the latest pricing at [claude.com/pricing](https://claude.com/pricing). The table below is for reference only.

| | **Pro** | **Max (5x)** | **Max (20x)** |
|---|---|---|---|
| **Monthly price** | $20 | $100 | $200 |
| **Usage limit** | Standard | 5x Pro | 20x Pro |
| **Claude Code included** | Yes | Yes | Yes |
| **Claude.ai web included** | Yes | Yes | Yes |
| **Best for** | Exploration, light use | Regular Claude Code users | Heavy users, large projects |

### Recommended for Beginners: Max $100

If you plan to use Claude Code seriously, the **Max $100 plan** is the recommended starting point.

- The Pro ($20) usage limit fills up quickly, making focused work difficult.
- The most powerful Opus model is effectively unusable on Pro.
- Productivity features like multi-session and agent teams burn through tokens quickly.
- Max $100 is sufficient for most individual users.

---

## How Billing Works

```
Pay monthly → Use freely within your usage limit
If limit is reached → Responses are throttled (no extra charge)
```

- No need to track token counts
- Usage limit resets after a period
- Use the `/cost` command to check your current session usage

---

## Tips to Reduce Costs

| Method | Description |
|--------|-------------|
| Run `/clear` between tasks | Clears conversation context to save tokens |
| Use Sonnet model first | Cheaper than Opus and sufficient for most tasks |
| Write specific requests | Specify the exact file or function instead of "improve the entire codebase" |
| Minimize MCP servers | Disable connections you are not actively using |

---

## Which Plan Should You Start With?

| Situation | Recommended Plan |
|-----------|-----------------|
| "I just want to try Claude Code out" | Pro $20 for exploration |
| "I want to use it seriously for work/projects" | **Max $100 (strongly recommended)** |
| "I use it all day, every day" | Max $200 |

---

For the latest pricing and plan comparison: [https://claude.com/pricing](https://claude.com/pricing)
