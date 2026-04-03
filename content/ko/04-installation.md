# 04. 설치 & 인증

> 터미널에서 명령어 하나로 설치, 브라우저에서 로그인하면 끝입니다.

---

> 💡 **터미널이 처음이신가요?** 아래 명령어를 그대로 **복사해서 붙여넣기(Cmd+V 또는 Ctrl+V)** 한 후 Enter만 누르면 됩니다. 명령어의 의미를 이해할 필요가 없습니다.
> - **macOS**: `Cmd+Space` → "terminal" 검색 → Enter
> - **Windows**: `Win+R` → "powershell" 입력 → Enter

---

## 설치 전 확인사항

### 지원 운영체제

| OS | 지원 버전 |
|---|---|
| **macOS** | 13.0 이상 |
| **Linux** | Ubuntu 20.04+, Debian 10+, Alpine Linux 3.19+ |
| **Windows** | Windows 10 (1809+) 또는 Windows Server 2019+ |

### 하드웨어 요구사항

- RAM: 4GB 이상
- 인터넷 연결 필수

### Node.js가 필요한가요?

**아닙니다.** Claude Code는 네이티브(Native) 설치 방식을 사용합니다. Node.js를 따로 설치할 필요가 없습니다.

> ⚠️ **npm 설치는 deprecated(구식)입니다.** 예전에는 `npm install -g @anthropic-ai/claude-code`로 설치했지만, 지금은 공식적으로 아래 방법을 권장합니다. npm 방식은 사용하지 마세요.

---

## 설치 방법

### macOS / Linux / WSL (Windows Subsystem for Linux)

터미널을 열고 아래 명령어를 붙여넣으세요:

```bash
curl -fsSL https://claude.ai/install.sh | bash
```

또는 Homebrew를 사용한다면:

```bash
brew install --cask claude-code
```

### Windows

**방법 1 — WSL 사용 (권장):**

WSL(Windows Subsystem for Linux)을 사용하면 모든 기능이 완전히 동작합니다.

```powershell
# 1. WSL 설치 (PowerShell 관리자 모드에서 실행)
wsl --install
```

재부팅 후 Ubuntu가 자동 설정됩니다. 이후 Ubuntu 터미널에서:

```bash
# 2. Claude Code 설치 (Linux와 동일)
curl -fsSL https://claude.ai/install.sh | bash
```

**방법 2 — PowerShell 직접 설치:**

WSL 없이 바로 사용할 수 있지만, 일부 기능이 제한될 수 있습니다.

```powershell
irm https://claude.ai/install.ps1 | iex
```

**방법 3 — WinGet 사용:**

```powershell
winget install Anthropic.ClaudeCode
```

> Windows에서 로컬 세션을 사용하려면 [Git for Windows](https://git-scm.com/downloads/win)가 설치되어 있어야 합니다.

### Alpine Linux 추가 패키지

```bash
apk add libgcc libstdc++ ripgrep
```

---

## 설치 후 인증 (로그인)

설치가 완료되면 터미널에서 아래 명령어를 실행하세요:

```bash
claude
```

처음 실행하면 <strong>브라우저가 자동으로 열리면서 OAuth 로그인 화면</strong>이 나타납니다. Claude.ai 계정(Pro 또는 Max 구독)으로 로그인하면 자동으로 인증이 완료됩니다.

### 인증 흐름 요약

```
터미널에서 claude 실행
       ↓
브라우저 자동 오픈 (OAuth 페이지)
       ↓
Claude.ai 계정으로 로그인
       ↓
터미널로 자동 복귀 → 인증 완료
```

### 자격 증명 보안

- macOS: API 키와 OAuth 토큰은 <strong>macOS Keychain(암호화 저장소)</strong>에 안전하게 저장됩니다.
- 재로그인이 필요한 경우: `claude` 실행 후 `/login` 입력

---

## 첫 실행 확인

설치와 인증이 완료되었는지 확인하려면:

```bash
claude --version
```

버전 번호가 출력되면 정상 설치된 것입니다. 또는 설치 진단을 위해:

```bash
claude doctor
```

이 명령어로 설치 타입, 버전, 환경 상태를 한 번에 확인할 수 있습니다.

---

## 자동 업데이트

Claude Code는 <strong>자동으로 최신 버전으로 업데이트</strong>됩니다. 시작 시 업데이트를 확인하고 백그라운드에서 다운로드합니다. 다음 실행 시 새 버전이 적용됩니다.

수동으로 업데이트하려면:

```bash
claude update
```

---

## 흔한 설치 문제 & 해결법

### 문제 1: `curl: command not found` (curl이 없다는 오류)

**원인**: curl이 설치되어 있지 않은 경우 (드물지만 일부 Linux 환경).

**해결법**:
```bash
# Ubuntu/Debian
sudo apt-get install curl

# Alpine
apk add curl
```

이후 설치 명령어 다시 실행.

---

### 문제 2: `claude: command not found` (설치 후에도 명령어를 못 찾는 경우)

**원인**: 설치 경로가 셸의 PATH에 등록되지 않은 경우.

**해결법**:
```bash
# 현재 셸 세션에 PATH 즉시 반영
source ~/.bashrc
# 또는 zsh 사용자라면
source ~/.zshrc
```

그래도 안 되면 터미널을 완전히 닫고 다시 열기.

---

### 문제 3: Windows에서 Git이 없다는 오류

**원인**: 로컬 세션 실행에 Git이 필요합니다.

**해결법**: [git-scm.com](https://git-scm.com/downloads/win)에서 Git for Windows 설치 후 재시도.

---

## 다음 단계

설치와 인증이 완료되었다면, 작업할 폴더로 이동해서 바로 시작해 보세요:

```bash
# 작업할 폴더로 이동 후 실행
claude
```

> **어떤 폴더든 괜찮습니다.** 코드 프로젝트뿐 아니라 문서 폴더, 리서치 폴더, 업무 자료 폴더 어디서나 Claude Code를 시작할 수 있습니다.

Claude Code가 폴더를 분석하고 무엇을 도와드릴지 기다립니다.
