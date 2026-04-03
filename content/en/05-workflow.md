# 05. Beginner Workflow

> A step-by-step guide to starting your first Claude Code session and working effectively from day one.

---

## Your First Session (Step-by-Step)

Follow these steps when starting out for the first time.

### Step 1. Navigate to Your Project Folder

```bash
cd ~/Desktop/my-project
```

Claude Code reads and edits files relative to the current directory. Always move into your project folder first.

> If the folder doesn't exist yet, create it with `mkdir ~/Desktop/my-project && cd ~/Desktop/my-project`.

### Step 2. Start Claude Code

```bash
claude
```

Type `claude` and press Enter. The interactive session will start.

### Step 3. Let Claude Learn Your Project (Highly Recommended)

At the beginning of a session, ask Claude to understand the project or generate a CLAUDE.md file.

```
> Read through this project and create a CLAUDE.md file for it
```

For an existing project:

```
> Give me an overview of this codebase
```

**Why CLAUDE.md matters**: This file stores your project's rules, tech stack, and important context. Claude reads it automatically at the start of every session, so you don't have to explain things from scratch each time. Commit it to git so your whole team benefits.

### Step 4. Give Instructions

Tell Claude what you need in plain language.

```
> Add a user login feature
> Find the bug in this code
> Write unit tests for the auth module
```

### Step 5. Review & Give Feedback

Claude shows you the changes it made. If something isn't right, give feedback immediately.

```
> Good, but show error messages in plain English instead
> That's not quite right — can you try [explanation] instead?
```

### Step 6. End the Session

```
> /quit
```

Or press `Ctrl+D`.

---

## How to Write Effective Prompts

### More Specific = Better Results

| Weak Prompt (vague) | Strong Prompt (specific) |
|--------------------|--------------------------|
| "Fix the code" | "Fix the TypeError on line 42 of login.js — `user` can be null" |
| "Add a feature" | "Add a forgot-password flow that sends a reset link to the user's email" |
| "Make it better" | "Improve the performance of this function — it currently takes 3s on 1000 records, target under 1s" |
| "Write tests" | "Write unit tests for the login function in auth.js — cover success, wrong password, and invalid email format" |

### One Request at a Time

Asking for too many things at once causes Claude to lose track.

```
# Not recommended
> Add login, signup, password reset, email verification,
  and social login all at once

# Recommended
> First, implement email/password login only
(after it's done)
> Now add the signup flow
```

### Specify the Output Format

```
> Explain this code          → Get a written explanation
> Save this to a file        → Claude writes the file
> Rewrite this in place      → Claude edits the file directly
> List the bugs as a table   → Get a formatted table
```

### Reference Files with @

```
> Find bugs in @src/auth/login.js
> Read @README.md and explain the project structure
```

---

## Common Use Cases with Example Prompts

### Adding a New Feature

```
> Add a user profile page with:
  - Display nickname, email, and join date
  - Profile photo upload
  - Nickname editing
```

### Fixing a Bug

```
> I get this error when I run npm test — please fix it:
  TypeError: Cannot read property 'id' of undefined
  at UserService.getUser (src/services/user.js:45)
```

### Code Review

```
> Review the code in @src/payment/ for security
  vulnerabilities and suggest improvements
```

### Code Explanation

```
> Explain what @src/utils/tokenizer.js does in simple terms
```

### Writing Tests

```
> Write tests for all functions in @src/services/auth.js.
  Follow the style in @tests/services/user.test.js
```

### Documentation

```
> Add JSDoc comments to all functions in @src/api/
```

---

## Using Plan Mode

**What is Plan Mode?** A mode where Claude analyzes code and proposes a plan without making any changes. Use it before risky or complex operations to review Claude's approach first.

### How to Enable Plan Mode

```
Press Shift+Tab twice
or type:
> /plan
```

### When to Use Plan Mode

- Before modifying many files at once
- Before database migrations or other hard-to-reverse operations
- When exploring an unfamiliar codebase before making changes
- For large architectural changes where you want to agree on direction first

### Plan Mode Example

```bash
# Start directly in Plan Mode
claude --permission-mode plan

# Or toggle during a session
> Shift+Tab (twice)

# Ask Claude to plan
> Create a detailed migration plan for moving our auth system from JWT to OAuth2

# Review the plan, then switch back to normal mode to execute
```

---

## Things You Should Never Do

### Never Paste Sensitive Information

```
# Never do this
> My AWS access key is AKIAXXXXXXXX and...
> The database password is mypassword123...
> Here's my private SSH key: -----BEGIN RSA...
```

Never type API keys, passwords, or private credentials directly into the chat. Store them in environment variables or `.env` files.

### Don't Blindly Approve Sudo or System-Level Requests

When Claude asks for `sudo` or wants to modify system files, ask why first.

```
> Why do you need sudo for this? Is there another way?
```

### Be Careful with `--dangerously-skip-permissions`

This flag bypasses all permission checks. Only use it in a fully isolated environment like a container or VM — never on your main machine.

### Always Backup Before Major Work

Before large-scale refactoring or database migrations, always run `git commit` or create a backup first.

---

## Session Management Tips

### Name Important Sessions

```
> /rename auth-refactor
```

Resume it later with:

```bash
claude --resume auth-refactor
```

### Compress When the Session Gets Long

When responses feel slow or incomplete:

```
> /compact
```

### Clear Between Unrelated Tasks

```
> /clear
```

Starting a fresh context prevents earlier context from confusing Claude on unrelated work.

---

## Summary

> Be specific → One request at a time → Review results → Give feedback → Repeat.

The next section covers common mistakes and how to fix them.
