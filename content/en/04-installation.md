# 04. Installation & Authentication

> One command in the terminal to install, then log in through your browser — that's it.

---

> 💡 **New to the terminal?** Just **copy and paste (Cmd+V or Ctrl+V)** the commands below, then press Enter. You don't need to understand what they mean.
> - **macOS**: `Cmd+Space` → search "terminal" → Enter
> - **Windows**: `Win+R` → type "powershell" → Enter

---

## Before You Install

### Supported Operating Systems

| OS | Supported Versions |
|---|---|
| **macOS** | 13.0 or later |
| **Linux** | Ubuntu 20.04+, Debian 10+, Alpine Linux 3.19+ |
| **Windows** | Windows 10 (1809+) or Windows Server 2019+ |

### Hardware Requirements

- RAM: 4 GB or more
- Active internet connection required

### Do I Need Node.js?

**No.** Claude Code uses a native installation. You do not need to install Node.js separately.

> ⚠️ **npm installation is deprecated.** Previously Claude Code was installed via `npm install -g @anthropic-ai/claude-code`, but that method is no longer recommended. Use the official installation commands below instead.

---

## Installation

### macOS / Linux / WSL (Windows Subsystem for Linux)

Open your terminal and paste the following command:

```bash
curl -fsSL https://claude.ai/install.sh | bash
```

Or, if you use Homebrew:

```bash
brew install --cask claude-code
```

### Windows

**Option 1 — WSL (recommended):**

Using WSL (Windows Subsystem for Linux) ensures all features work fully.

```powershell
# 1. Install WSL (run in PowerShell as Administrator)
wsl --install
```

After rebooting, Ubuntu will be set up automatically. Then in the Ubuntu terminal:

```bash
# 2. Install Claude Code (same as Linux)
curl -fsSL https://claude.ai/install.sh | bash
```

**Option 2 — PowerShell direct install:**

You can use this without WSL, but some features may be limited.

```powershell
irm https://claude.ai/install.ps1 | iex
```

**Option 3 — WinGet:**

```powershell
winget install Anthropic.ClaudeCode
```

> On Windows, [Git for Windows](https://git-scm.com/downloads/win) must be installed for local sessions to work.

### Alpine Linux Additional Packages

```bash
apk add libgcc libstdc++ ripgrep
```

---

## Authentication (Logging In)

Once installation is complete, run the following in your terminal:

```bash
claude
```

On first launch, **your browser opens automatically to an OAuth login page**. Log in with your Claude.ai account (Pro or Max subscription) and authentication completes automatically.

### Authentication Flow

```
Run claude in terminal
       ↓
Browser opens automatically (OAuth page)
       ↓
Log in with your Claude.ai account
       ↓
Returns to terminal → Authentication complete
```

### Credential Security

- **macOS**: API keys and OAuth tokens are stored securely in the **encrypted macOS Keychain**.
- To re-authenticate: run `claude` and type `/login`

---

## Verify Your Installation

To confirm installation and authentication succeeded:

```bash
claude --version
```

If a version number is printed, the installation is working correctly. To run a full environment check:

```bash
claude doctor
```

This command shows your installation type, version, and environment health in one step.

---

## Automatic Updates

Claude Code **updates itself automatically**. It checks for updates at startup, downloads in the background, and applies the new version the next time you launch it.

To update manually:

```bash
claude update
```

---

## Common Installation Problems & Fixes

### Problem 1: `curl: command not found`

**Cause**: curl is not installed (rare, mainly on minimal Linux environments).

**Fix**:
```bash
# Ubuntu/Debian
sudo apt-get install curl

# Alpine
apk add curl
```

Then re-run the installation command.

---

### Problem 2: `claude: command not found` after installation

**Cause**: The installation path is not registered in your shell's PATH.

**Fix**:
```bash
# Reload your shell config immediately
source ~/.bashrc
# Or for zsh users
source ~/.zshrc
```

If that does not work, close the terminal completely and reopen it.

---

### Problem 3: Git not found error on Windows

**Cause**: Local sessions require Git to be installed.

**Fix**: Download and install [Git for Windows](https://git-scm.com/downloads/win), then try again.

---

## Next Steps

Once installation and authentication are complete, navigate to any folder and start right away:

```bash
# Navigate to your working folder and run
claude
```

> **Any folder works.** You can start Claude Code in any directory — not just code projects, but also document folders, research folders, or work files.

Claude Code will analyze the folder and wait to help you.
