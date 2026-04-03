# 11. Getting Started with GitHub

> Everything you build with Claude Code needs to be saved with Git and uploaded to GitHub. You don't need to memorize commands — start with natural language.

---

## Why Do You Need Git & GitHub?

When you work with Claude Code, files change constantly. Without Git:

- You can't tell why code that worked yesterday doesn't work today
- If Claude accidentally deletes something important, you can't recover it
- When collaborating, team members can overwrite each other's work

**Git**: Records every change and lets you revert to any previous state.
**GitHub**: Backs up those records in the cloud and lets you collaborate.

For Claude Code users, Git + GitHub is not optional.

---

## The One Key Difference from Google Drive

This is the most common source of confusion for first-time Git users.

| | Google Drive | Git |
|--|-------------|-----|
| After editing a file | Automatically synced | **You must save AND upload manually** |

**Remember just this one thing.**

Git always requires two steps:

1. Save (Commit) — record your changes locally
2. Upload (Push) — send your commits to GitHub

> **Why two steps?** You can save without internet, and you can choose exactly what to upload and when.

---

## Getting Started: 5-Minute Setup with git-teacher

You don't need to memorize any Git commands. The **git-teacher** plugin (바르다 깃선생) handles everything through natural language.

If you installed gptaku_plugins in Section 04, you're already ready. Otherwise:

```shell
/plugin marketplace add https://github.com/fivetaku/gptaku_plugins.git
/plugin install git-teacher
```

Fully restart Claude Code after installation.

### One-time Setup

```
"깃 시작해줘" (Start Git)
```

Git-teacher automatically handles:

1. Checking Git installation
2. Checking GitHub CLI (gh) installation
3. GitHub account login (opens browser)
4. Project folder setup
   - **New project** → create folder + GitHub repository
   - **Existing project** → clone from GitHub
   - **Current folder** → initialize as repository

Already completed steps are skipped automatically.

---

## Three Things You Do Every Day

### 1. Save Your Work (Commit)

```
"저장해줘" (Save this)
```

Shows you which files changed, then asks for a short description (commit message).

```
Example: "Updated login page design"
         "Fix: password validation error"
```

After saving, you'll always see this reminder:

```
✅ Saved! Still only on your computer.
Say "올려줘" to upload to GitHub.
```

### 2. Upload to GitHub (Push)

```
"올려줘" (Upload it)
```

Pushes your commits to GitHub and sends you the repository link.

Auto-handled: merge conflicts via rebase, SSH→HTTPS fallback.

### 3. Request Review (Pull Request)

When you want a teammate to review your changes:

```
"검토 요청해줘" (Request review)
```

Automatically: creates a branch, commits, pushes, creates a PR, provides the PR link, returns you to your original state.

---

## Natural Language Command Reference

```
What you want                  Say this
─────────────────────────────────────────────────
First-time setup               "깃 시작해줘"
Check current status           "지금 어떤 상태?"
Save (Commit)                  "저장해줘"
Upload to GitHub (Push)        "올려줘"
Request review (PR)            "검토 요청해줘"
Explain a term                 "commit이 뭐야?"
```

Slash commands also work:

| Natural language | Slash command |
|-----------------|--------------|
| "깃 시작해줘" | `/git-teacher 시작` |
| "지금 어떤 상태?" | `/git-teacher 상태` |
| "저장해줘" | `/git-teacher 저장` |
| "올려줘" | `/git-teacher 올리기` |
| "검토 요청해줘" | `/git-teacher 검토` |
| Terminology | `/git-teacher 도움말` |

---

## Git Terminology Quick Reference

| Git term | Plain English | Analogy |
|----------|--------------|---------|
| **Repository** | Project storage | A shared folder on GitHub |
| **Commit** | Save a snapshot | Packaging files with a label |
| **Push** | Upload | Shipping the package to GitHub |
| **Pull** | Download latest | Receiving a delivery |
| **Branch** | Workspace copy | A personal draft that doesn't touch the original |
| **Pull Request** | Review request | "Suggest edits" mode in Google Docs |
| **Merge** | Apply changes | Accepting the suggested edits |
| **Clone** | Copy & download | Downloading a shared folder |

---

## Daily Routine with Claude Code

```
Start of day:
  Launch claude → "깃 시작해줘" (first day only)

While working:
  Edit files → "저장해줘" → "올려줘"

End of session:
  "저장해줘" → "올려줘" (both steps, every time)

Team collaboration:
  Finish feature → "검토 요청해줘" → share PR link
```

---

## .gitignore — Keep API Keys Off GitHub

One of the most common beginner mistakes is accidentally pushing `.env` files containing API keys to GitHub.

git-teacher auto-detects your project type on first "저장해줘" and creates a `.gitignore` for you. If one already exists, it's skipped.

To create one manually:

```
# .gitignore example
.env
.env.local
node_modules/
.DS_Store
```

---

> **Prefer raw Git commands?** Just tell Claude Code directly — it can run `git commit` and `git push` for you. git-teacher adds beginner-friendly guidance, automatic error handling, and Korean-language status explanations on top. If Git is new to you, start with git-teacher.
