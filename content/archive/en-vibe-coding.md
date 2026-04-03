# 03. What is Vibe Coding?

> A new approach where non-developers create software by giving AI natural language instructions

---

## What is Vibe Coding?

"Coding by vibe." A concept coined in 2025 by Andrej Karpathy (former head of AI at Tesla), **vibe coding means creating software by giving AI natural language instructions rather than writing code yourself.**

Traditional coding: You memorize syntax, fix errors yourself, and learn libraries.
Vibe coding: "Build me a login feature" → AI generates the code → You review the result and give feedback.

**Claude Code is one of the best tools for vibe coding.** The AI handles everything from reading and editing files to running and testing them — all from the terminal.

---

## Vibe Coder vs. Developer

| | Developer | Vibe Coder |
|--|-----------|------------|
| Writing code | Does it themselves | Instructs AI |
| Debugging | Analyzes error messages → fixes them | "This is throwing an error, fix it" |
| Core role | Implementation | **Planning & review** |
| Key skill | Programming languages | **Communicating clear requirements** |

In vibe coding, the most important skill isn't programming ability — it's **"the ability to clearly describe what you want to build."**

---

## The Reality of Vibe Coding: Strengths and Limitations

### What you can genuinely do
- Build prototypes and MVPs quickly
- Create personal tools and automation scripts
- Build websites and simple apps
- Process data and automate documents
- **This site (CC101) was built with vibe coding**

### Honest limitations
- Large-scale production services require review by professional developers
- Sensitive logic like security and payments must be reviewed by experts
- Debugging is hard if you don't understand the code AI generates
- "Building it" and "maintaining it" are two different problems

> **Tip**: Start with vibe coding, but as your service grows, it's wise to collaborate with developers.

---

## How to Vibe Code Well

### 1. Planning is half the battle
"Make me an app" gives far worse results than "Make me a web app that organizes photos by date — drag and drop to upload, then auto-sort using EXIF data."

→ **show-me-the-prd** plugin: Automatically generates a product spec through 5–6 interview questions.

### 2. Start small, then grow
Don't ask for a finished product all at once. Build incrementally: "Login screen first" → "Then the list view" → "Now add search" — this approach is far more stable.

### 3. Always verify the results yourself
Run and check everything AI produces. Feedback like "Looks good" or "Do this part differently" is what raises the quality.

### 4. Don't be afraid to make mistakes
With Git, you can always revert. There's nothing to lose by trying and failing.

→ **바르다 깃선생** (Git Teacher) plugin: Even if you don't know Git, just say "save this" and version control is handled for you.

---

## GPTaku Plugins for Vibe Coders

Install these into Claude Code to make vibe coding much easier:

| Plugin | Role | One-line description |
|--------|------|----------------------|
| **show-me-the-prd** | Planning | "I want to build an app" → interview → auto-generates 4 types of planning docs |
| **바르다 깃선생** (Git Teacher) | Version control | No Git knowledge needed — just say "save" or "push" |
| **바선생** (Ba Teacher) | Growth | Analyzes your AI usage patterns and coaches you on getting better results |
| **docs-guide** | Accuracy | Answers based on official docs to prevent hallucinations |
| **deep-research** | Research | Multi-agent tech research and market analysis |
| **끼리끼리** (Team Builder) | Team setup | "Make me a research team" → AI team auto-assembled |
| **품앗이** (Parallel Dev) | Parallel development | Claude (PM) distributes tasks for parallel processing. Uses Codex if installed, otherwise works with Claude alone |
| **스킬러들의 수다** (Skill Creators) | Skill creation | "Make a translation skill" → designed and built by 4 specialists |

Installation is covered in the **Plugin Installation** section.

---

## Vibe Coding Workflow Example

### "I want to build a to-do app"

```
Step 1: Planning
/show-me-the-prd I want to build a to-do management app
→ 5 interview questions → PRD + data model + phase breakdown + project spec

Step 2: Implementation
"Build Phase 1"
→ Claude Code generates code, saves files, and runs it

Step 3: Review & feedback
"Show me the screen" → check in browser
"Change the button color", "Add date sorting" → refine through conversation

Step 4: Save
/git-teacher save this
→ Git commit auto-generated
```

---

## Summary

> Vibe coding = non-developers creating software by instructing AI. The key is "clearly describing what you want to build." Claude Code + GPTaku plugins help you through the whole process.
