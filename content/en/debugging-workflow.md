# Debugging — When You Hit an Error

> A 3-step workflow for resolving errors without panicking.

---

## Step 1: When an Error Occurs — Show It Immediately

When you get an error, **show it to Claude as-is**. You don't need to understand the error message.

### Method 1: Copy and paste the text

```
> I'm getting this error:
  TypeError: Cannot read property 'name' of undefined
  at UserList.render (src/components/UserList.js:23)
```

### Method 2: Paste a screenshot

Capture the error screen and paste it with `Ctrl+V` (Mac: `Cmd+V`) directly into the chat. Claude can read and analyze the image.

### Method 3: Just describe it in one sentence

```
> I just got an error, fix it
> I ran npm run dev and it won't start
> When I click the button the screen freezes
```

Claude reads the code in your current folder, finds the cause, and fixes it directly.

> **Tip for beginners**: Don't be intimidated by long error messages in English. Just copy-paste the whole thing. Claude will figure it out.

---

## Step 2: "It's Not Working and I Don't Know Why"

When nothing works and there's no error message — that's the most frustrating. Here are some approaches you can use.

### Rewind to find the cause

```
> /rewind
```

Goes back to a point where things were working. If "it worked before but not now," this is the fastest fix.

### Restore to the previous state with a checkpoint

Press `Esc` `Esc` (Esc key twice) to revert to the state right before Claude's last edit.

### Check what was changed

```
> Show me what you just changed
```

Claude shows you the diff of what changed. This can give you clues about where the problem started.

### Narrow it down step by step

```
> Undo changes one by one and find where it breaks
```

Claude will revert changes one at a time to locate the breaking point. This is especially useful when problems appear after editing multiple files at once.

---

## Step 3: "You Fixed It but the Same Problem Is Back"

When the same error keeps repeating, it's time to change your approach.

### Record the issue in CLAUDE.md

```
> Add to CLAUDE.md: "Always use dayjs for dates in this project"
```

If you note the cause of a problem you've already encountered in CLAUDE.md, Claude won't make the same mistake next time. You're building up a set of project rules over time.

### Ask Claude to compare with the previous error

```
> I had a similar error before — check if this is the same cause
```

The same symptoms can have different causes. Ask Claude for a comparative analysis.

### Start fresh in a new session

When a conversation gets long, Claude can get pulled by earlier context and keep trying the same approach.

```bash
# End current session
/quit

# Start a new session
claude
```

In the new session, provide only the key context:

```
> Read @CLAUDE.md, then fix the recurring token expiration error in src/auth/login.js
```

---

## Common Mistakes Non-Developers Make

### "Fix everything"

When the scope is too broad, even Claude gets lost. Narrow it down.

| Instead of this | Try this |
|----------------|----------|
| "Fix everything" | "Fix just the error that appears when I click the login button" |
| "Nothing works" | "Sign-up works fine, but login doesn't" |

### Ignoring errors and requesting the next feature

If you request a new feature while an error is still present, the new code gets stacked on top of broken code. **Fix errors first before moving on.**

```
# Not recommended
> (ignoring the error) Now build the payment feature

# Recommended
> Fix this error first
(after it's resolved)
> Now build the payment feature
```

### Repeating the same method for the same error

If Claude tries the same approach two or three times without success, ask it to change direction.

```
> This approach isn't working. Try a different method
> Try solving it with a completely different library
```

---

## One-Line Summary

> When you get an error: **show it** → if you don't know the cause: **rewind** → if it keeps repeating: **record it and start fresh.**
