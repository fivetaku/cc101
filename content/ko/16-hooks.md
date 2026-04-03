# 16. Hooks — 내 작업을 지키는 안전장치

> AI가 `rm -rf`를 실행하거나 `git push --force`로 히스토리를 날려버리면? Hooks를 설정하면 **그런 일이 절대 일어나지 않습니다.**

---

## 왜 Hooks가 필요한가?

Claude Code는 강력합니다. 파일을 만들고, 수정하고, 삭제하고, Git 명령어를 실행합니다. 그런데 바이브코딩 중에 이런 일이 실제로 일어납니다:

- `rm -rf` 한 방에 프로젝트 폴더가 사라짐
- `git reset --hard`로 커밋하지 않은 작업이 통째로 날아감
- `git push --force`로 팀원의 코드가 덮어씌워짐
- `DROP TABLE`로 데이터베이스가 날아감

**Hooks는 이런 위험한 명령어를 Claude가 실행하기 전에 자동으로 차단합니다.** LLM의 "판단"에 의존하는 게 아니라, 코드로 100% 확실하게 막는 겁니다.

---

## Hooks란?

<strong>Hooks</strong>는 Claude Code의 특정 이벤트가 발생할 때 자동으로 실행되는 셸 커맨드입니다.

| 이벤트 | 발생 시점 | 주요 용도 |
|--------|----------|----------|
| `PreToolUse` | 도구 실행 **직전** | 위험한 명령어 차단 |
| `PostToolUse` | 도구 실행 직후 | 자동 포매팅, 로그 기록 |
| `Stop` | Claude가 응답 완료 시 | 완료 알림 |
| `Notification` | Claude가 알림 보낼 때 | 데스크탑 알림 |
| `SessionStart` | 세션 시작/재개 시 | 컨텍스트 주입 |
| `UserPromptSubmit` | 프롬프트 제출 시 | 입력 전처리 |
| `PreCompact` | 컨텍스트 압축 전 | 중요 정보 보존 |

> 핵심: `exit 0` = 허용, `exit 2` = **차단** (stderr 메시지가 Claude에게 전달됨)

---

## 설정 위치

| 위치 | 범위 | 공유 가능 |
|------|------|----------|
| `~/.claude/settings.json` | 내 모든 프로젝트 | 아니오 |
| `.claude/settings.json` | 현재 프로젝트 | 예 (Git 커밋) |
| `.claude/settings.local.json` | 현재 프로젝트 | 아니오 |

> `/hooks` 커맨드로 인터랙티브하게 설정할 수도 있지만, 아래 예시를 복사-붙여넣기 하는 게 더 빠릅니다.

---

## 필수 Hook 1: Safety Hook — 위험한 명령어 자동 차단

**이 Hook 하나만 설정해도 대부분의 사고를 막을 수 있습니다.**

### Step 1: 스크립트 파일 생성

`~/.claude/hooks/block_dangerous.py` 파일을 만드세요:

```python
#!/usr/bin/env python3
"""위험한 명령어를 자동 차단하는 Safety Hook"""
import json, re, sys

BLOCKED_PATTERNS = [
    # 파일 삭제 차단 — rm 대신 trash 사용 (휴지통으로 이동, 복구 가능)
    (r"\brm\s+", "rm 대신 trash를 사용하세요 (brew install trash)"),
    (r"\bunlink\s+", "unlink 대신 trash를 사용하세요"),

    # Git 히스토리 파괴 차단
    (r"git\s+reset\s+--hard", "git reset --hard는 커밋하지 않은 작업을 삭제합니다"),
    (r"git\s+push\s+.*--force", "git push --force는 원격 히스토리를 덮어씁니다"),
    (r"git\s+push\s+.*-f\b", "git push -f는 원격 히스토리를 덮어씁니다"),
    (r"git\s+clean\s+-.*f", "git clean -f는 추적되지 않은 파일을 영구 삭제합니다"),
    (r"git\s+checkout\s+\.\s*$", "git checkout .은 모든 변경사항을 삭제합니다"),
    (r"git\s+stash\s+drop", "git stash drop은 스태시를 영구 삭제합니다"),
    (r"git\s+branch\s+-D", "git branch -D는 브랜치를 강제 삭제합니다"),

    # 데이터베이스 파괴 차단
    (r"DROP\s+(DATABASE|TABLE)", "DROP은 데이터를 영구 삭제합니다"),
    (r"TRUNCATE\s+TABLE", "TRUNCATE는 모든 데이터를 삭제합니다"),
]

data = json.load(sys.stdin)
if data.get("tool_name") != "Bash":
    sys.exit(0)

command = data.get("tool_input", {}).get("command", "")
for pattern, reason in BLOCKED_PATTERNS:
    if re.search(pattern, command, re.IGNORECASE):
        print(f"차단됨: {reason}", file=sys.stderr)
        sys.exit(2)

sys.exit(0)
```

### Step 2: 실행 권한 부여

터미널에서 실행하세요:

```bash
chmod +x ~/.claude/hooks/block_dangerous.py
```

### Step 3: Hook 등록

`~/.claude/settings.json`에 추가하세요:

```json
{
  "hooks": {
    "PreToolUse": [
      {
        "matcher": "Bash",
        "hooks": [
          {
            "type": "command",
            "command": "python3 ~/.claude/hooks/block_dangerous.py"
          }
        ]
      }
    ]
  }
}
```

### 동작 원리

Claude가 `rm -rf node_modules`를 실행하려고 하면:

1. `PreToolUse` 이벤트 발생 → `block_dangerous.py` 실행
2. 명령어가 `rm` 패턴에 매치됨
3. `exit 2`로 **차단** + "rm 대신 trash를 사용하세요" 메시지 전달
4. Claude가 메시지를 받고 `trash node_modules`로 대안 실행

> <strong>trash</strong>는 파일을 휴지통으로 보내서 실수해도 복구할 수 있습니다. `brew install trash` (macOS) 또는 `npm install -g trash-cli`로 설치하세요.

### 차단 패턴을 더 추가하고 싶다면

`BLOCKED_PATTERNS` 리스트에 원하는 패턴을 추가하면 됩니다:

```python
# 예: chmod 777 차단
(r"chmod\s+777", "chmod 777은 보안상 위험합니다"),

# 예: 프로덕션 서버 SSH 차단
(r"ssh\s+.*prod", "프로덕션 서버 접근이 차단되었습니다"),
```

---

## 필수 Hook 2: 완료 알림

Claude가 작업을 끝내면 소리로 알려줍니다. 바이브코딩 중 다른 창을 보고 있어도 놓치지 않습니다.

### macOS — 시스템 사운드

```json
{
  "hooks": {
    "Stop": [
      {
        "matcher": "",
        "hooks": [
          {
            "type": "command",
            "command": "afplay /System/Library/Sounds/Glass.aiff"
          }
        ]
      }
    ],
    "Notification": [
      {
        "matcher": "",
        "hooks": [
          {
            "type": "command",
            "command": "afplay /System/Library/Sounds/Frog.aiff"
          }
        ]
      }
    ]
  }
}
```

> `Stop`과 `Notification`에 <strong>다른 소리</strong>를 쓰면 "끝남" vs "확인 필요"를 소리만으로 구분할 수 있습니다.

사용 가능한 macOS 시스템 사운드 확인:

```bash
ls /System/Library/Sounds/
```

### macOS — 데스크탑 알림 팝업

소리 대신 (또는 함께) 화면에 알림 팝업을 띄울 수도 있습니다:

```json
{
  "type": "command",
  "command": "osascript -e 'display notification \"작업이 완료되었습니다\" with title \"Claude Code\"'"
}
```

### Linux

```json
{
  "type": "command",
  "command": "notify-send 'Claude Code' '작업이 완료되었습니다'"
}
```

---

## 두 Hook을 합쳐서 설정하기

Safety Hook + 완료 알림을 하나의 `settings.json`에 합치면 이렇습니다:

```json
{
  "hooks": {
    "PreToolUse": [
      {
        "matcher": "Bash",
        "hooks": [
          {
            "type": "command",
            "command": "python3 ~/.claude/hooks/block_dangerous.py"
          }
        ]
      }
    ],
    "Stop": [
      {
        "matcher": "",
        "hooks": [
          {
            "type": "command",
            "command": "afplay /System/Library/Sounds/Glass.aiff"
          }
        ]
      }
    ],
    "Notification": [
      {
        "matcher": "",
        "hooks": [
          {
            "type": "command",
            "command": "afplay /System/Library/Sounds/Frog.aiff"
          }
        ]
      }
    ]
  }
}
```

> 이미 `settings.json`에 다른 설정이 있다면, `hooks` 키만 추가하거나 병합하세요. `/hooks` 커맨드로 확인할 수 있습니다.

---

<details>
<summary>더 알아보기: 추가 Hook 활용 예시</summary>

### 민감 폴더 보호

`customers/`, `invoices/` 같은 폴더를 Claude가 수정하지 못하게 차단:

```json
{
  "hooks": {
    "PreToolUse": [
      {
        "matcher": "Edit|Write",
        "hooks": [
          {
            "type": "command",
            "command": "FILE=\"$(jq -r '.tool_input.file_path // empty')\"; if [[ \"$FILE\" == customers/* || \"$FILE\" == invoices/* ]]; then echo \"차단: 민감 폴더입니다\" >&2; exit 2; fi"
          }
        ]
      }
    ]
  }
}
```

### 세션 시작 시 업무 컨텍스트 자동 주입

```json
{
  "hooks": {
    "SessionStart": [
      {
        "matcher": "",
        "hooks": [
          {
            "type": "command",
            "command": "cat ~/업무규칙.txt"
          }
        ]
      }
    ]
  }
}
```

### 프롬프트 기반 Hook (고급)

판단이 필요한 상황에는 `type: "prompt"` Hook을 사용합니다:

```json
{
  "hooks": {
    "Stop": [
      {
        "hooks": [
          {
            "type": "prompt",
            "prompt": "모든 태스크가 완료되었는지 확인하세요. 미완료 항목이 있으면 계속 작업하세요."
          }
        ]
      }
    ]
  }
}
```

</details>

---

## 트러블슈팅

| 문제 | 해결책 |
|------|--------|
| Hook이 실행 안 됨 | `/hooks`에서 이벤트 확인, matcher 대소문자 확인 |
| 스크립트가 실행 안 됨 | `chmod +x` 로 실행 권한 부여 |
| JSON 파싱 오류 | `~/.zshrc`의 echo 구문을 인터랙티브 셸 조건부로 감싸기 |
| 모든 파일 수정이 차단됨 | `PreToolUse` Hook의 `exit 2` 조건 확인 |

디버그: `claude --debug` 또는 `Ctrl+O`로 Hook 실행 로그 확인

---

## 한 줄 요약

> **Safety Hook + 완료 알림** — 이 두 개만 설정하면 바이브코딩이 훨씬 안전하고 편해집니다. `rm` 한 방에 프로젝트 날리는 사고를 미리 막으세요.

다음 섹션에서는 반복 작업을 Skills로 자동화하는 방법을 배웁니다.
