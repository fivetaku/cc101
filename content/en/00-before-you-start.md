# 00. Before You Start

> Answers to the 4 most common questions before starting Claude Code.

---

## Q1. What's the difference between Claude Code and Cowork?

In short, **Claude Code is a building tool** and **Cowork is a task-processing tool**.

| | Claude Code | Claude Cowork |
|---|---|---|
| **What it does** | Creates new things (apps, docs, automation) | Processes existing work (emails, document management) |
| **Analogy** | AI architect | AI assistant |
| **How it works** | Text commands in a terminal | Runs inside a sandbox (isolated environment) |
| **Best for** | Anyone open to using a terminal | People who have never touched a terminal |

### Cowork's Sandbox — Safe but Slow and Expensive

Cowork runs inside an **isolated virtual environment (local VM)** on your machine. This sandbox keeps things safe, but it comes with structural limitations.

**High token consumption.** When Cowork interacts with the screen, it takes screenshots and has the AI analyze them. What could be done with a single line of text gets processed as an image, consuming far more tokens. Claude Code reads and writes files as text, handling the same work with far fewer tokens.

**Slow operation.** Screen interaction requires a cycle of screenshot capture, AI analysis, click, and screen wait — repeated every time. Claude Code runs commands and returns text results, making it significantly faster.

**Limited access.** The isolated environment cannot directly access local files, and the software you can install is restricted. Claude Code has access to your entire machine, giving you much more freedom.

> **Why Cowork exists**: It's not about capability differences — it's about whether you can open a terminal. For those who've cleared that hurdle, Claude Code is overwhelmingly superior.

---

## Q2. There's a desktop app and VS Code extension — do I really need the terminal?

When the desktop app and VS Code extension first launched, they had limited features and lagged behind the terminal in updates. But as of April 2026, **most features are available across all platforms**, and since they share the same engine, MCP, Hooks, Skills, plugins, and more work nearly identically everywhere.

**That said, there are still reasons to prefer the terminal.**

### Multi-session — The Key to Productivity

To truly boost productivity with Claude Code, **running multiple sessions simultaneously** is essential.

For example, open 4 terminal windows:
- Window 1: Frontend work
- Window 2: Backend API development
- Window 3: Running tests
- Window 4: Writing documentation

This way, 4 instances of Claude Code **work on their own tasks at the same time**. When one finishes, you immediately give it the next instruction.

<video autoPlay loop muted playsInline style={{maxWidth:'100%',borderRadius:'8px'}}>
  <source src="/images/multisession.mp4" type="video/mp4" />
</video>
*Source: [@brxce.ai](https://www.threads.com/@brxce.ai)*

You can create multiple sessions in the desktop app or VS Code extension too, but **monitoring them all side-by-side on one screen is only possible in a terminal**. With a tool like tmux, you can split one screen into panels and see every session's progress at a glance.

### Things Only the Terminal Can Do

**Automation and extensibility.** The terminal isn't just "faster" — there are things that are **only** possible in the terminal:

- **Pipe scripting**: `cat error.log | claude -p "analyze the cause"` — feed output from other tools directly to Claude
- **CI/CD integration**: Automatically run code reviews every time a PR is opened on GitHub Actions
- **Scheduled automation**: Use cron to run dependency checks every morning
- **Remote execution**: SSH into a server and run `claude -p "analyze the logs"`
- **Background execution**: Sessions keep running even after you close the terminal
- **Community tools**: VibeProxy (connect other AI models), claude-esp (monitor internal behavior), and more from the terminal-based open-source ecosystem

These are structurally impossible in the GUI environments of the desktop app or VS Code.

### Stability

As of April 2026, features are nearly identical, but **stability still varies**:

| | Terminal (CLI) | Desktop App | VS Code Extension |
|---|---|---|---|
| **Hooks** | Fully functional | PostToolUse bug reports | Bug reports exist |
| **MCP servers** | Stable | Connectors UI supported, performance drops with many connections | Connection bug reports |
| **Experience** | Lightweight and responsive | Relatively heavy | Runs on top of the editor, can be heavy |

These gaps are closing fast, but at the current moment, the terminal remains the most stable environment.

### The Terminal Hurdle

Honestly, many people stop at **"the terminal looks intimidating, the desktop app should be enough."** They rationalize their reluctance to leave a familiar GUI as "this is good enough."

But in the age of AI, the terminal is no longer a developer-only tool. **The era of just speaking in natural language has arrived**, and Claude Code is proof. Opening the terminal — once you clear that single hurdle, the range of what you can do changes completely.

> I encourage you to break through that barrier.

---

## Q3. I installed Claude Code — what do I do first?

Before asking it to "do something," **figure out what you want to do** first.

### Start by exploring use cases

It's natural that you don't yet have a feel for what Claude Code can do. Everyone starts that way. So rather than trying to build something right away, **see how other people are using it** first.

- Search for "Claude Code use cases" on social media, YouTube, and blogs
- Browse what people have built in vibe coding communities
- When you find something that makes you think "I want to try that too," that's your starting point

### Then, define your project through conversation with Claude

Once you have a rough idea of what you want, don't jump straight to "build it." **Ask Claude first**:

```
"I want to do something like this — what can you do for me?"
"What do I need to build this kind of project?"
"Can you research this topic for me?"
```

Claude Code isn't just a tool that executes orders. **It's a partner that thinks with you, researches, and helps you find direction.** Through conversation, you can clarify what you want, and Claude will tell you what's possible and what isn't.

> Installation steps, basic commands, and CLAUDE.md setup are covered starting from **Section 1** of this guide. Once you know what you want to do, it's not too late to read those then.

---

## Q4. Is the Pro plan ($20) enough?

To be honest, **Claude Code is more expensive than most other AI tools**. And the Pro plan alone makes it difficult to use Claude Code to its full potential.

### The Reality of Pro ($20)

Pro's 5-hour usage limit runs out faster than you'd expect. When working intensively, **hitting the limit within 1 hour is common.** You end up stopping before you get the results you want, waiting for the limit to reset — over and over.

- The most powerful **Opus model is effectively unusable** on Pro. The limit fills up too quickly.
- The default Sonnet model works for simple tasks, but has limitations on complex projects.

### Try Max ($100) at Least Once

Claude Code's real productivity comes from **combining advanced features**:

- **Multi-session**: Running multiple Claude instances simultaneously for parallel work, which burns through tokens quickly
- **Agent Teams**: Multiple AIs collaborating with divided roles, consuming several times more tokens
- **Opus model**: Essential for complex architecture design and debugging, but virtually impossible on Pro

To use these features, you need at least **Max $100, which provides 5x the Pro usage limit**.

If you've been frustrated by hitting limits on Pro, try Max for just one month. Once you experience Claude Code running at full capacity without limits, you'll have a **"wait, it could do all this?"** moment. You can always decide whether to go back to Pro after that experience.

### Plan Selection Guide

| Situation | Recommended Plan |
|-----------|-----------------|
| "I just want to try Claude Code out" | Pro $20 for exploration |
| "I want to use it seriously for work/projects" | **Max $100 (strongly recommended)** |
| "I use it all day, every day" | Max $200 |

> **Think of Pro $20 as a "trial."** It's enough to see Claude Code's potential. But for real productivity, you'll need the Max plan.
