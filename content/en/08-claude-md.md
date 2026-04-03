# 08. Mastering CLAUDE.md

> CLAUDE.md is the most important file for giving Claude Code long-term memory. Let's master it.

---

## What Is CLAUDE.md?

Claude Code forgets everything when a session ends. Start a new session and it's back to square one — no memory of your project.

**CLAUDE.md** solves this problem.

Every time Claude Code starts, it automatically reads your CLAUDE.md file and begins work with full awareness of your project context and rules.

Think of CLAUDE.md as a **standing instruction sheet** you hand to Claude at the start of every session.

```
Instead of saying every time:
"This is a Next.js project, use TypeScript,
 use 2-space indentation, and write commit messages in English..."

→ Write it once in CLAUDE.md and Claude remembers it forever.
```

---

## Where Should You Create It?

The location of CLAUDE.md determines its scope.

| File Location | Scope | Shared with Team? |
|---------------|-------|-------------------|
| `./CLAUDE.md` | Current project | ✅ Committable to git |
| `./.claude/CLAUDE.md` | Current project (hidden folder) | ✅ Committable to git |
| `./CLAUDE.local.md` | Current project (you only) | ❌ Auto-added to .gitignore |
| `~/.claude/CLAUDE.md` | All your projects (global) | ❌ Personal only |

**Most common location**: `CLAUDE.md` at your project root.

```bash
# Create CLAUDE.md manually
touch CLAUDE.md

# Or let Claude Code generate one for you
/init
```

> Running `/init` makes Claude Code analyze your project and automatically draft a CLAUDE.md for you.

---

## What Should You Write?

There's no required format — CLAUDE.md is just Markdown. The following sections are especially effective.

### Essential Sections

#### 1. Project Description
Help Claude understand what this project is about.

```markdown
## Project Overview
This is an inventory management web app for small business owners.
Built with Next.js 14 + TypeScript + Supabase.
```

#### 2. Tech Stack
Specify what languages, frameworks, and libraries you use.

```markdown
## Tech Stack
- **Frontend**: Next.js 14 (App Router), TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes
- **Database**: Supabase (PostgreSQL)
- **Package Manager**: pnpm (never use npm)
```

#### 3. Coding Style and Rules
Specify code style, naming conventions, comment language, and so on.

```markdown
## Coding Rules
- Indentation: 2 spaces (no tabs)
- Quotes: single quotes ('')
- Component file names: PascalCase (e.g., UserCard.tsx)
- Function names: camelCase (e.g., getUserData)
- No `any` types — always use explicit types
- All comments in English
```

#### 4. What Never to Do
Explicitly listing forbidden actions prevents common mistakes.

```markdown
## Never Do This
- Do not leave `console.log` in production code
- Use `pnpm`, never `npm` or `yarn`
- Never hardcode secrets from `.env` into source code
- No `any` types allowed
- Do not use the `pages/` directory (App Router only)
```

#### 5. Common Commands
Save Claude (and yourself) the trouble of looking up commands every time.

```markdown
## Common Commands
- Start dev server: `pnpm dev`
- Build: `pnpm build`
- Run tests: `pnpm test`
- Lint: `pnpm lint`
- Type check: `pnpm type-check`
- DB migration: `pnpm db:migrate`
```

---

## Real Example: CLAUDE.md Template for Next.js + TypeScript

Here's a practical, ready-to-use template. Copy it and customize it for your project.

```markdown
# Project Instructions

## Project Overview
[Write a 1–2 sentence description of your project here]

Example: An inventory management SaaS for small business owners.
Built on Next.js 14 App Router + TypeScript + Supabase.

---

## Tech Stack
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript (strict mode)
- **Styles**: Tailwind CSS
- **DB / Backend**: Supabase
- **Package Manager**: pnpm
- **Deployment**: Vercel

---

## Directory Structure
\`\`\`
src/
├── app/          # Next.js App Router pages
├── components/   # Reusable UI components
│   ├── ui/       # Base UI elements (Button, Input, etc.)
│   └── features/ # Feature-specific components
├── lib/          # Utilities, Supabase client, etc.
└── types/        # TypeScript type definitions
\`\`\`

---

## Coding Rules

### Style
- Indentation: 2 spaces
- Quotes: single quotes ('')
- Semicolons: always
- No trailing whitespace

### Naming
- Components: PascalCase (UserCard.tsx)
- Functions / variables: camelCase (getUserData)
- Constants: UPPER_SNAKE_CASE (MAX_RETRY_COUNT)
- Types / interfaces: PascalCase (UserProfile)

### TypeScript
- No `any` types
- Always annotate function return types explicitly
- Define Props using interfaces

---

## Common Commands
\`\`\`bash
pnpm dev          # Dev server (localhost:3000)
pnpm build        # Production build
pnpm test         # Run tests
pnpm lint         # ESLint check
pnpm type-check   # TypeScript type check
\`\`\`

---

## Never Do This
- Use `npm` or `yarn` (always use `pnpm`)
- Use `any` types
- Use the `pages/` directory (App Router only)
- Hardcode environment variables into source code
- Leave `console.log` in production code

---

## Git Commit Rules
- Format: `type: description`
- Types: feat, fix, docs, style, refactor, test, chore
- Example: `feat: add user login page`
- Keep messages concise and in the imperative mood
```

---

## Global Memory: Apply to All Projects

Create `~/.claude/CLAUDE.md` to set rules that apply across **all your projects**.

```bash
# Edit global CLAUDE.md
nano ~/.claude/CLAUDE.md
```

Good things to put in your global CLAUDE.md:

```markdown
# Global Settings (all projects)

## My Preferences
- Always explain what you're about to do before making changes
- Ask for confirmation before large or risky changes
- Keep explanations concise

## Universal Coding Style
- Keep functions short (under 20 lines where possible)
- Use meaningful variable names
- Prefer readable code over clever code
```

---

## Memory Priority

When multiple CLAUDE.md files exist, more specific files take priority.

```
Priority (high → low):
1. CLAUDE.local.md (your personal project overrides)
2. ./CLAUDE.md (project-level settings)
3. ~/.claude/CLAUDE.md (global settings)
4. Organization-managed CLAUDE.md (company-wide policy)
```

For example, if your global settings say "2-space indent" but your project's CLAUDE.md says "4-space indent," the project setting wins.

---

## Useful Tips

### Use the `/memory` Command
To edit CLAUDE.md during a session:

```shell
/memory
```

A file picker opens so you can edit your CLAUDE.md directly.

### File Imports
You can reference other files from within CLAUDE.md:

```markdown
# Project Instructions

For the project overview, see @README.md.
For available scripts, see @package.json.

## Additional Rules
- Git workflow: @docs/git-guide.md
```

### Start Every New Project with CLAUDE.md

When starting a new project, **create CLAUDE.md first**.

```shell
# Let Claude generate a CLAUDE.md for your project
/init
```

Or just ask Claude directly:

```
"I'm building a Next.js 14 + TypeScript + Tailwind project.
 I use pnpm as the package manager and want all comments
 and commit messages in English.
 Please create a CLAUDE.md file based on these preferences."
```

---

## Summary: CLAUDE.md at a Glance

| Item | Details |
|------|---------|
| **Role** | Claude's long-term memory / standing instruction sheet |
| **Location** | `CLAUDE.md` at project root |
| **Global settings** | `~/.claude/CLAUDE.md` |
| **Auto-generate** | Use the `/init` command |
| **Edit mid-session** | Use `/memory` or any text editor |
| **Format** | Free-form Markdown |

**One CLAUDE.md eliminates the need to re-explain your project every session. Make Claude Code feel like a real team member.**

---

## Next Steps

You've completed the core setup. Now let's see Claude Code in action with real-world examples!

→ **[07. Practical Examples](./07-practical-examples.md)** (coming soon)
