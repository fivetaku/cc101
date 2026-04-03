# 09. 명령어 모음

> Claude Code를 쓸 때 알아야 할 명령어들을 한눈에 정리했습니다.

---

## 명령어 세 가지 종류

Claude Code의 명령어는 크게 세 가지로 나뉩니다.

| 종류 | 어디서 입력? | 예시 |
|------|-------------|------|
| **CLI 명령어** | 터미널 (Claude Code 밖) | `claude`, `claude --version` |
| **슬래시 명령어** | 대화 중 (Claude Code 안) | `/help`, `/compact` |
| **키보드 단축키** | 대화 중 | `Ctrl+C`, `Shift+Enter` |

---

## CLI 명령어 (터미널에서 입력)

Claude Code를 시작하거나 제어하는 명령어입니다. 터미널에서 입력합니다.

### 기본 실행 명령어

| 명령어 | 설명 | 예시 |
|--------|------|------|
| `claude` | 대화형 모드 시작 | `claude` |
| `claude "질문"` | 바로 질문하며 시작 | `claude "이 프로젝트 설명해줘"` |
| `claude -p "질문"` | 답변만 출력하고 종료 (자동화에 유용) | `claude -p "이 함수 설명해줘"` |
| `claude -c` | 가장 최근 대화 이어서 시작 | `claude -c` |
| `claude --version` 또는 `claude -v` | 설치된 버전 확인 | `claude -v` |
| `claude --help` | 도움말 보기 | `claude --help` |
| `claude update` | 최신 버전으로 업데이트 | `claude update` |

### 모델 지정 실행

```bash
# 특정 모델로 시작
claude --model claude-opus-4-6

# 또는 짧게
claude --model opus
claude --model sonnet
claude --model haiku
```

### 유용한 시작 옵션

```bash
# Plan Mode로 시작 (파일 수정 없이 계획만)
claude --permission-mode plan

# 세션 이름으로 이어서 시작
claude --resume 세션이름

# 이전 대화 목록에서 선택해서 이어서 시작
claude --resume
```

> **팁**: 처음엔 그냥 `claude`만 입력해서 시작하면 됩니다. 나머지는 필요할 때 배워도 늦지 않습니다.

---

## 슬래시 명령어 (대화 중 입력)

Claude Code와 대화하는 도중에 `/`로 시작하는 명령어를 입력하면 특별한 기능을 사용할 수 있습니다.

### 자주 쓰는 슬래시 명령어

| 명령어 | 설명 |
|--------|------|
| `/help` | 사용 가능한 명령어 전체 목록 보기 |
| `/compact` | 대화 내용 압축 (긴 세션에서 필수!) |
| `/clear` | 대화 초기화 (완전히 새로 시작) |
| `/cost` | 현재 세션에서 사용한 토큰 비용 확인 |
| `/model` | 사용 중인 AI 모델 변경 |
| `/permissions` | 권한 설정 확인 및 관리 |
| `/memory` | CLAUDE.md 메모리 파일 편집 |
| `/quit` 또는 `/exit` | Claude Code 종료 |
| `/plan` | Plan Mode 진입 |
| `/init` | 프로젝트에 CLAUDE.md 파일 생성 |
| `/doctor` | 설치 상태 점검 |
| `/stats` | 사용량 통계 보기 (구독 사용자용) |
| `/vim` | Vim 편집 모드 켜기/끄기 |
| `/theme` | 색상 테마 변경 |
| `/clone` | 현재 대화를 복제해 독립 분기 생성 (실험에 유용) |
| `/half-clone` | 압축 요약으로 새 대화 분기 (컨텍스트 절약) |
| `/context` | 컨텍스트 창 토큰 사용량 시각화 |
| `/rename [이름]` | 세션에 이름 붙이기 (`--resume 이름`으로 재개) |
| `/bug` | Anthropic에 버그 리포트 직접 전송 |
| `/login` | Anthropic 계정 로그인 |
| `/logout` | Anthropic 계정 로그아웃 |
| `/rewind` | 대화와 코드를 이전 시점으로 되돌리기 |

### 슬래시 명령어 사용법

```
> /compact
→ 대화 내용을 요약해서 컨텍스트를 줄여줍니다

> /compact 코드 변경 사항 위주로 정리해줘
→ 압축 방향을 직접 지정할 수 있습니다

> /model
→ 모델 선택 화면이 나타납니다
```

> **팁**: 대화창에서 `/`만 입력하면 사용 가능한 명령어 목록이 자동완성으로 나타납니다.

---

## 대화 분기 & 실험 전략

대화 중간에 방향을 바꾸거나 위험한 실험을 안전하게 시도할 때 활용할 수 있는 기능들입니다.

### `/clone` — 원본 유지하며 실험하기

현재 대화 전체를 복제해서 독립된 분기를 만듭니다. 복잡한 리팩토링이나 구조적인 변경을 시도하기 전에 현재 상태를 복사해두면, 실패해도 원본으로 돌아올 수 있습니다.

```
> /clone
→ 현재 대화 상태 그대로 새 분기 시작
→ 원본 대화는 영향 없음
```

**이럴 때 써보세요**
- 여러 구현 방법 중 하나를 먼저 시험해보고 싶을 때
- "이렇게 고치면 어떨까" 싶은데 실패가 걱정될 때
- 같은 문제를 서로 다른 접근으로 비교해보고 싶을 때

### `/half-clone` — 더 가볍게 새 출발

현재 대화를 AI가 압축 요약한 뒤 새 대화를 시작합니다. `/compact`는 기존 대화 안에서 압축하는 반면, `/half-clone`은 압축본을 토대로 완전히 새 대화를 엽니다.

```
> /half-clone
→ 핵심 정보만 담은 요약으로 새 대화 시작
→ 토큰 사용량 대폭 감소
```

대화가 너무 길어져서 `/compact`로도 부족할 때 유용합니다.

### `/context` — 컨텍스트 사용량 확인

```
> /context
→ [■■■■■■■□□□] 70% (143,000 / 200,000 tokens)
```

현재 대화가 컨텍스트 창의 몇 %를 차지하는지 시각적으로 보여줍니다. 80% 이상 차면 `/compact`나 `/half-clone`을 고려하세요.

### `/rename` — 세션 이름 붙이기

중요한 작업 세션에 이름을 붙여두면 나중에 쉽게 재개할 수 있습니다.

```
> /rename 경쟁사-리서치-2월

# 나중에 터미널에서 이어서 시작
$ claude --resume 경쟁사-리서치-2월
```

---

## 키보드 단축키

대화 도중 손가락 몇 개로 빠르게 제어할 수 있습니다.

### 핵심 단축키

| 단축키 | 설명 |
|--------|------|
| `Ctrl+C` | 현재 작업 취소 (Claude가 뭔가 하는 도중에 멈추고 싶을 때) |
| `Ctrl+D` | Claude Code 종료 |
| `Ctrl+L` | 터미널 화면 지우기 (대화 내용은 유지됨) |
| `Ctrl+R` | 이전에 입력한 명령어 검색 |
| `Ctrl+G` | 현재 입력 중인 내용을 외부 텍스트 에디터에서 편집 |
| `Ctrl+T` | 작업 목록 보기/숨기기 |

### 입력 관련 단축키

| 단축키 | 설명 |
|--------|------|
| `Shift+Enter` | 줄바꿈 (긴 지시사항 여러 줄로 입력할 때) |
| `Option+Enter` (macOS) | 줄바꿈 (macOS 기본) |
| `\` + `Enter` | 줄바꿈 (모든 터미널에서 작동) |
| `↑` / `↓` 화살표 | 이전/다음 명령어 탐색 |
| `Esc` + `Esc` (두 번) | 대화 되감기 (이전 상태로 복원) |

### 모드 전환 단축키

| 단축키 | 설명 |
|--------|------|
| `Shift+Tab` | Plan Mode ↔ 일반 모드 전환 |
| `Option+P` (macOS) / `Alt+P` | 모델 변경 |
| `Option+T` (macOS) / `Alt+T` | 확장 사고 모드 켜기/끄기 |
| `Ctrl+B` | 현재 작업 백그라운드 유지, 새 대화 창 열기 |

---

## 초보자가 자주 쓰는 명령어 TOP 5

막 시작했다면 이 다섯 개만 외워도 충분합니다.

### 1. `/compact` — 가장 중요한 명령어

```
> /compact
```

대화가 길어지면 Claude가 느려지거나 오래된 내용을 잊어버립니다. 이럴 때 `/compact`를 입력하면 대화를 압축해서 속도를 회복합니다. **긴 작업 중간중간에 습관적으로 사용하세요.**

### 2. `Ctrl+C` — 멈추고 싶을 때

Claude가 엉뚱한 방향으로 가고 있을 때, 또는 실수로 위험한 명령을 허가했을 때 즉시 멈춥니다.

### 3. `/clear` — 새로 시작할 때

```
> /clear
```

완전히 다른 주제로 넘어갈 때 사용합니다. 이전 대화 내용이 모두 지워집니다.

### 4. `Shift+Enter` — 긴 지시사항 입력

한 줄로 다 쓰기 어려운 긴 요청은 `Shift+Enter`로 줄바꿈하면서 입력하세요.

```
(Shift+Enter로 여러 줄 입력 예시)
로그인 페이지를 만들어줘.
- 이메일과 비밀번호 필드
- 비밀번호 보기/숨기기 버튼
- 로그인 버튼 (로딩 상태 포함)
```

### 5. `/cost` — 비용 확인

```
> /cost
```

현재 세션에서 얼마나 썼는지 확인합니다. (API 키 사용자용, 구독 사용자는 `/stats` 사용)

---

<details>
<summary>🖥️ 개발자용: 터미널 Alias 설정 (단축 명령어)</summary>

매번 긴 명령어를 입력하는 대신, 짧은 alias를 등록해두면 훨씬 편합니다.

### macOS / Linux (zsh)

`~/.zshrc` 파일에 추가:

```bash
alias cc='claude'
alias ccd='claude --dangerously-skip-permissions'
alias ccr='claude --resume --dangerously-skip-permissions'
```

추가 후 적용:

```bash
source ~/.zshrc
```

### Windows (PowerShell)

`$PROFILE` 파일에 추가:

```powershell
function cc { claude @args }
function ccd { claude --dangerously-skip-permissions @args }
function ccr { claude --resume --dangerously-skip-permissions @args }
```

PowerShell을 재시작하면 적용됩니다.

### 각 Alias 설명

| 명령어 | 의미 | 사용 시점 |
|--------|------|----------|
| `cc` | 기본 실행 | 항상 |
| `ccd` | 권한 확인 자동 승인 | 신뢰하는 프로젝트, 빠른 작업 |
| `ccr` | 이전 세션 재개 + 권한 자동 승인 | 어제 하던 작업 이어서 |

> ⚠️ **주의**: `--dangerously-skip-permissions`는 파일 수정, 명령어 실행 등 모든 권한 확인을 자동으로 승인합니다. 본인이 만든 프로젝트, 신뢰하는 환경에서만 사용하세요.

</details>

---

## 빠른 참고표

```
터미널 입력:
  claude                    → 시작
  claude -v                 → 버전 확인
  claude --help             → 도움말
  claude -c                 → 마지막 세션 이어서
  claude --resume [이름]    → 이름 붙인 세션 재개
  claude --add-dir [경로]   → 추가 디렉토리 포함

Alias (설정 후):
  cc                        → claude (기본)
  ccd                       → 권한 자동 승인
  ccr                       → 이전 세션 재개 + 권한 자동 승인

대화 중 입력:
  /help               → 전체 명령어 목록
  /compact            → 대화 압축 (자주 쓰기!)
  /clear              → 대화 초기화
  /clone              → 대화 분기 생성
  /half-clone         → 압축 요약으로 새 분기
  /context            → 컨텍스트 사용량 확인
  /cost               → 비용 확인
  /model              → 모델 변경
  /rename [이름]       → 세션 이름 붙이기
  /bug                → 버그 리포트 전송
  /quit               → 종료

키보드 단축키:
  Ctrl+C              → 작업 취소
  Ctrl+D              → 종료
  Ctrl+B              → 백그라운드 전환, 새 창 열기
  Shift+Enter         → 줄바꿈
  ↑↓ 화살표           → 이전 명령어 탐색
  Esc Esc             → 이전 상태로 되감기
```
