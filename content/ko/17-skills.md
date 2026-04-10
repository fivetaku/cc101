# 17. Skills & 플러그인 만들기

> 자주 하는 일을 레시피로 저장해두기 — `/커맨드` 하나로 꺼내 쓰고, 팀과도 공유할 수 있습니다

---

## Skills란?

<strong>Skills</strong>는 Claude Code에 새로운 능력을 추가하는 재사용 가능한 워크플로우입니다. `SKILL.md` 파일을 만들면 Claude가 그것을 도구로 인식하고, `/스킬이름` 커맨드로 직접 실행하거나 상황에 맞게 자동으로 활성화합니다.

쉽게 말하면: 자주 쓰는 작업 절차를 문서화해 두면, 다음부터는 한 마디로 실행됩니다.

> **참고**: 기존 `.claude/commands/` 폴더의 커스텀 슬래시 커맨드는 Skills로 통합되었습니다. 기존 파일은 그대로 작동합니다.

---

## Skills vs 일반 대화 차이점

| | 일반 대화 | Skills |
|---|---|---|
| **실행 방법** | 매번 설명 타이핑 | `/skill-name` 한 번 |
| **일관성** | 매번 다를 수 있음 | 항상 동일한 절차 |
| **팀 공유** | 불가 | Git 커밋으로 공유 |
| **인자 전달** | 설명 속에 포함 | `$ARGUMENTS`로 명확하게 |
| **도구 제한** | Claude 판단 | 명시적으로 허용된 도구만 |

---

## Skills로 없어지는 노가다

| 반복 작업 | Skills 설정 후 |
|----------|--------------|
| 회의 끝날 때마다 녹음 파일 정리 요청 | `/meeting 파일명` 한 번으로 |
| 주간 보고서 형식 매번 설명 | `/weekly-report` 실행 |
| 번역 요청할 때마다 언어/형식 명시 | `/translate ko en README.md` |
| 경쟁사 분석 요청할 때마다 형식 설명 | `/competitor-analysis 회사명` |
| SNS 게시물 요청할 때마다 브랜드 톤 설명 | `/sns-post 주제` |
| 이메일 작성할 때마다 회사 정보 입력 | `/email-draft 목적` |

---

## 내 Skills 만드는 방법

### Step 1: 디렉터리 생성

```bash
# 내 모든 프로젝트에서 사용할 경우 (개인용)
mkdir -p ~/.claude/skills/commit

# 현재 프로젝트에서만 사용할 경우
mkdir -p .claude/skills/commit
```

### Step 2: SKILL.md 작성

`.claude/skills/commit/SKILL.md`:

```yaml
---
name: commit
description: 변경사항을 분석해서 좋은 커밋 메시지를 작성하고 커밋합니다. 커밋할 때 사용.
disable-model-invocation: true
---

현재 staged 변경사항을 분석해서 Conventional Commits 형식으로 커밋하세요:

1. `git diff --staged` 실행해서 변경사항 확인
2. 변경 유형 파악 (feat/fix/docs/refactor/test/chore)
3. 50자 이내 제목 작성
4. 필요시 본문에 상세 설명 추가
5. `git commit -m "..."` 실행
```

### Step 3: 실행

```
# 직접 실행
/commit

# 또는 자연어로 → Claude가 자동 감지
"변경사항 커밋해줘"
```

---

## Skills 파일 구조

```
my-skill/
├── SKILL.md           # 메인 지시사항 (필수)
├── template.md        # Claude가 채울 템플릿 (선택)
├── examples/
│   └── sample.md      # 예시 출력 (선택)
└── scripts/
    └── validate.sh    # Claude가 실행할 스크립트 (선택)
```

> **팁**: `SKILL.md`는 500줄 이내로 유지하고, 상세 내용은 별도 파일로 분리하세요.

---

## 핵심 Frontmatter 옵션

```yaml
---
name: my-skill           # 스킬 이름 (디렉터리명 기본값)
description: 설명        # Claude가 언제 이 스킬을 쓸지 판단하는 기준 (필수)
disable-model-invocation: true  # true면 사용자만 실행 가능 (Claude 자동 실행 불가)
user-invocable: false    # false면 메뉴에 안 보임 (Claude만 자동 실행 가능)
allowed-tools: Read, Grep, Glob  # 이 스킬 실행 중 허용할 도구만 지정
context: fork            # 독립된 서브에이전트 컨텍스트에서 실행
model: sonnet            # 이 스킬에서 사용할 모델 지정
---
```

| Frontmatter | 사용자 실행 | Claude 자동 실행 | 언제 씀 |
|-------------|-----------|----------------|--------|
| (기본값) | 가능 | 가능 | 일반 워크플로우 |
| `disable-model-invocation: true` | 가능 | 불가 | 배포, 전송 등 부작용 있는 작업 |
| `user-invocable: false` | 불가 | 가능 | 배경 지식, 컨벤션 |

---

## 실용 예시 4가지

### 예시 1: 회의록 자동 정리

`.claude/skills/meeting/SKILL.md`:

```yaml
---
name: meeting
description: 회의 녹음 파일을 받아 텍스트로 변환하고 회의록과 액션아이템을 정리합니다. 회의 후 정리할 때 사용.
argument-hint: [녹음 파일 경로]
disable-model-invocation: true
---

$ARGUMENTS 파일을 처리해서 회의록을 만드세요:

1. 음성 변환 도구(whisper 등)가 없으면 설치
2. $ARGUMENTS 파일을 텍스트로 변환
3. 다음 형식으로 회의록 작성:
   - 날짜 / 참석자
   - 주요 논의 내용 (3~5줄 요약)
   - 결정된 사항
   - 담당자별 액션아이템 (이름: 할 일, 기한)
4. 원본 파일명과 같은 이름으로 .md 파일 저장
```

실행:
```
/meeting ~/Downloads/meeting-250225.mp3
```

파이썬이나 변환 도구를 몰라도 됩니다. Claude Code가 필요한 것을 알아서 준비합니다.

---

### 예시 2: SNS 콘텐츠 자동화

`.claude/skills/sns-post/SKILL.md`:

```yaml
---
name: sns-post
description: 주어진 내용을 SNS 게시물로 변환합니다. 블로그, 인스타그램, LinkedIn 포스팅이 필요할 때 사용.
argument-hint: [주제 또는 원고 내용]
---

$ARGUMENTS를 SNS 게시물로 변환하세요:

1. 인스타그램 버전 (해시태그 10개, 이모지 포함, 친근한 어조, 300자 이내)
2. LinkedIn 버전 (전문적 어조, 인사이트 강조, 500자 이내)
3. 트위터/X 버전 (140자 이내, 핵심만 간결하게)

각 버전을 구분선으로 나눠 출력하세요.
```

실행:
```
/sns-post 우리 팀이 새 제품 출시에 성공했습니다. 6개월의 개발 끝에...
```

---

<details>
<summary>🖥️ 개발자용 예시: 코드 리뷰 자동화</summary>

`.claude/skills/review/SKILL.md`:

```yaml
---
name: review
description: 코드를 리뷰합니다. 코드 품질, 보안, 성능 측면에서 검토가 필요할 때 사용.
---

다음 순서로 코드를 리뷰하세요:

1. `git diff HEAD~1` 또는 `$ARGUMENTS`로 지정된 파일 분석
2. 다음 항목 체크:
   - 코드 가독성 및 명명 규칙
   - 에러 처리 누락 여부
   - 보안 취약점 (SQL injection, XSS, 하드코딩된 시크릿)
   - 중복 코드
   - 테스트 커버리지
3. 우선순위별 정리:
   - 🔴 Critical (반드시 수정)
   - 🟡 Warning (수정 권장)
   - 🔵 Suggestion (고려 사항)
```

실행:
```
/review src/auth/login.ts
```

</details>

<details>
<summary>🖥️ 개발자용 예시: GitHub 이슈 처리</summary>

`.claude/skills/fix-issue/SKILL.md`:

```yaml
---
name: fix-issue
description: GitHub 이슈를 구현합니다. 이슈 번호를 전달하면 분석-구현-테스트-커밋까지 진행.
disable-model-invocation: true
allowed-tools: Bash(gh *), Read, Edit, Write
---

GitHub 이슈 $ARGUMENTS를 처리하세요:

1. `gh issue view $ARGUMENTS` 로 이슈 내용 확인
2. 요구사항 파악 후 구현 계획 수립
3. 관련 파일 찾고 코드 구현
4. 테스트 작성 및 실행
5. `gh issue close $ARGUMENTS` 후 커밋 생성
```

실행:
```
/fix-issue 123
```

</details>

### 예시 3: 번역 자동화

`.claude/skills/translate/SKILL.md`:

```yaml
---
name: translate
description: 파일이나 텍스트를 번역합니다.
argument-hint: [파일경로 또는 텍스트] [대상언어]
---

$ARGUMENTS[0]을 $ARGUMENTS[1]로 번역하세요.

- 기술 용어는 원문 유지 (코드, 명령어, 고유명사)
- 마크다운 구조 보존
- 번역 결과를 원본과 같은 파일명에 언어 코드 추가해서 저장
```

실행:
```
/translate README.md ko
```

---

## 동적 컨텍스트 주입 (고급)

`!` + 백틱 문법으로 스킬 실행 전에 셸 커맨드를 실행하고 결과를 컨텍스트에 주입할 수 있습니다:

```yaml
---
name: pr-summary
description: PR 요약을 작성합니다.
context: fork
allowed-tools: Bash(gh *)
---

## PR 컨텍스트
- 변경 내용: !`gh pr diff`
- PR 댓글: !`gh pr view --comments`
- 변경된 파일: !`gh pr diff --name-only`

위 내용을 바탕으로 명확한 PR 요약을 작성하세요.
```

Claude가 이 스킬을 실행하면:
1. 백틱 안의 명령어가 먼저 실행됨
2. 실제 데이터가 프롬프트에 삽입됨
3. Claude가 실제 PR 내용을 보고 요약 작성

---

## Skills가 저장되는 위치

| 위치 | 경로 | 적용 범위 |
|------|------|----------|
| 엔터프라이즈 | 관리형 설정 | 조직 전체 |
| 개인 | `~/.claude/skills/<이름>/SKILL.md` | 내 모든 프로젝트 |
| 프로젝트 | `.claude/skills/<이름>/SKILL.md` | 이 프로젝트만 |
| 플러그인 | `<플러그인>/skills/<이름>/SKILL.md` | 플러그인 활성화 시 |

같은 이름의 스킬이 여러 위치에 있으면 **엔터프라이즈 > 개인 > 프로젝트** 순으로 우선순위가 적용됩니다.

---

## 스킬 만들기가 어렵다면: 스킬러들의 수다

직접 SKILL.md를 작성하는 게 막막하다면, **스킬러들의 수다(skillers-suda)** 플러그인이 대신 만들어줍니다.

```
/skillers-suda 번역 스킬 만들어줘
```

4명의 전문가(기획자/사용자/전문가/검수자)가 내부적으로 논의한 뒤:

1. **인터뷰** — 3~5개 질문으로 핵심 정보 수집
2. **워크플로우 설계** — 6가지 단계 타입(프롬프트/스크립트/API·MCP/RAG/검토/생성)을 조합
3. **파일 생성** — `SKILL.md` + `scripts/` + `references/` 전체 구조 자동 생성
4. **테스트 + 고도화** — 만든 스킬을 바로 테스트하고, 대화로 계속 개선

코드를 몰라도 "번역 스킬 만들어줘", "회의록 정리 스킬 만들어줘"처럼 말하면 전문가급 스킬이 생성됩니다.

스킬러들의 수다 설치: 플러그인 설치 섹션의 gptaku_plugins 참조

> 스킬 만들기에 대해 궁금하다면 [클로드코드 뽀개기 (패스트캠퍼스)](https://fastcampus.co.kr/biz_online_claudecode)를 참고하세요.

---

## 플러그인으로 패키징하기

팀 전체에 배포하거나 커뮤니티와 공유하려면 플러그인으로 패키징합니다.

### 플러그인 구조

```
my-plugin/
├── .claude-plugin/
│   └── plugin.json        # 플러그인 메타데이터
├── skills/
│   ├── review/
│   │   └── SKILL.md
│   └── commit/
│       └── SKILL.md
└── hooks/
    └── hooks.json         # 플러그인 전용 Hooks
```

### plugin.json

```json
{
  "name": "my-plugin",
  "description": "팀 공통 워크플로우 모음",
  "version": "1.0.0",
  "author": {
    "name": "Your Name"
  }
}
```

### 로컬 테스트

```bash
# 플러그인 디렉터리로 실행
claude --plugin-dir ./my-plugin

# 스킬 실행 (플러그인 네임스페이스 포함)
/my-plugin:review
/my-plugin:commit
```

### Standalone vs 플러그인 선택 기준

| 상황 | 권장 방식 |
|------|----------|
| 개인 워크플로우, 빠른 실험 | Standalone (`.claude/skills/`) |
| 팀과 공유, 여러 프로젝트 | 플러그인 |
| 커뮤니티 배포 | 플러그인 + 마켓플레이스 |

---

## Skills 자동 감지 원리

Claude는 `description` 필드를 보고 어떤 상황에서 스킬을 써야 할지 판단합니다:

```yaml
# 잘 쓴 description 예시
description: 코드를 리뷰합니다. PR 리뷰, 코드 품질 검토, 보안 분석이 필요할 때 사용.

# 아쉬운 description 예시
description: review tool
```

- "어떤 상황에서 쓰는지"를 명확히 기술할수록 Claude가 더 잘 감지합니다
- `disable-model-invocation: true`를 설정하면 Claude가 자동으로 실행하지 않습니다

---

## 트러블슈팅

| 문제 | 해결책 |
|------|--------|
| 스킬이 트리거 안 됨 | description에 사용자가 실제로 쓸 표현 포함 |
| 스킬이 너무 자주 실행됨 | description을 더 구체적으로 수정 |
| Claude가 스킬을 못 봄 | `/context`에서 컨텍스트 한도 초과 여부 확인 |
| 자동 실행 막고 싶음 | `disable-model-invocation: true` 추가 |

---

## 한 줄 요약

> Skills = 내가 자주 하는 작업을 `/커맨드` 하나로 만들어두는 것. 팀에 배포하려면 플러그인으로 패키징하면 된다.

Skills를 만들어뒀다면, Sub-agents로 그 Skills를 여러 Claude가 동시에 실행하게 할 수 있습니다.
