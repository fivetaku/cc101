# 15. MCP & 외부 도구 연결

> Notion, Slack, Google Sheets, GitHub, DB 등 외부 도구를 Claude가 직접 다룰 수 있게 해주는 표준 프로토콜

---

## MCP란?

<strong>MCP(Model Context Protocol)</strong>는 Claude가 외부 도구와 데이터 소스에 연결할 수 있게 해주는 오픈 표준입니다.

쉽게 말하면: Claude Code는 기본적으로 파일과 터미널만 다룹니다. MCP를 연결하면 Claude가 Notion 문서를 직접 읽고, Slack 메시지를 요약하고, Google Sheets를 업데이트하는 등 외부 도구와 상호작용할 수 있게 됩니다.

개발자라면 GitHub PR 리뷰, 데이터베이스 직접 쿼리, Sentry 에러 분석 등도 가능합니다.

> **비유**: MCP는 Claude에게 USB 포트를 달아주는 것과 같습니다. 어떤 도구든 꽂으면 사용할 수 있게 됩니다.

---

## MCP로 없어지는 노가다

MCP 없이는 이런 일들을 직접 해야 합니다:

**업무/리서치 사용자**

| 기존 노가다 | MCP 연결 후 |
|------------|------------|
| Notion 회의록 페이지를 복사해서 Claude에게 붙여넣기 | "오늘 회의 내용 Notion 페이지에 정리해줘" 한 마디로 끝 |
| Google Sheets에 데이터 일일이 수동 입력 | "이 데이터를 Sheets에 자동으로 정리해줘" |
| 웹사이트 방문해서 정보 복사-붙여넣기 | "이 웹사이트 5개 분석해서 비교표 만들어줘" |
| Slack 스레드 내용 복사해서 요약 요청 | "#마케팅 채널 오늘 논의 요약하고 공지 초안 써줘" |

<details>
<summary>🖥️ 개발자용 노가다 해소 예시</summary>

| 기존 노가다 | MCP 연결 후 |
|------------|------------|
| JIRA 티켓 내용을 복사해서 Claude에게 붙여넣기 | "ENG-4521 이슈 구현해줘" 한 마디로 끝 |
| Sentry 에러 스택트레이스를 수동으로 복사 | "지난 24시간 주요 에러 분석해줘" |
| DB 스키마를 Claude에게 설명하고 쿼리 요청 | "users 테이블에서 90일 미접속 유저 찾아줘" |
| PR 내용 복사해서 리뷰 요청 | "PR #456 리뷰해줘" 한 마디로 끝 |

</details>

---

## MCP로 할 수 있는 것들

### GitHub — PR/이슈 직접 조작

```bash
# GitHub MCP 서버 연결
claude mcp add --transport http github https://api.githubcopilot.com/mcp/

# 연결 후 이런 요청이 가능해집니다
> "PR #456 검토하고 개선점 제안해줘"
> "방금 발견한 버그 이슈 새로 만들어줘"
> "나에게 할당된 오픈 PR 목록 보여줘"
```

### Sentry — 프로덕션 에러 분석

```bash
# Sentry 연결
claude mcp add --transport http sentry https://mcp.sentry.dev/mcp

# /mcp 명령으로 인증 완료 후
> "지난 24시간 주요 에러가 뭐야?"
> "에러 ID abc123 스택트레이스 보여줘"
> "이 에러들이 어느 배포에서 생겼어?"
```

### PostgreSQL — DB 직접 쿼리

```bash
# DB 연결 (읽기 전용 추천)
claude mcp add --transport stdio db -- npx -y @bytebase/dbhub \
  --dsn "postgresql://readonly:pass@prod.db.com:5432/analytics"

# 연결 후
> "이번 달 총 매출 얼마야?"
> "orders 테이블 스키마 보여줘"
> "90일째 구매 안 한 고객 찾아줘"
```

### Slack — 메시지 읽고 보내기

Slack 연동을 통해 슬랙 채널의 맥락을 그대로 Claude에게 전달할 수 있습니다. 팀 대화에서 버그 리포트가 올라오면 Claude가 해당 스레드 맥락을 읽고 바로 코딩 작업을 시작할 수 있습니다.

### Notion, Asana, Figma 등

MCP 레지스트리([api.anthropic.com/mcp-registry/docs](https://api.anthropic.com/mcp-registry/docs))에서 수백 가지 MCP 서버를 찾을 수 있습니다.

---

## MCP 서버 설치 방법

### 방법 1: 원격 HTTP 서버 (권장)

```bash
# 기본 문법
claude mcp add --transport http <이름> <URL>

# 예시: Notion 연결
claude mcp add --transport http notion https://mcp.notion.com/mcp

# 인증 헤더가 필요한 경우
claude mcp add --transport http secure-api https://api.example.com/mcp \
  --header "Authorization: Bearer your-token"
```

### 방법 2: 로컬 stdio 서버

내 컴퓨터에서 실행되는 서버입니다. 시스템 직접 접근이나 커스텀 스크립트에 적합합니다.

```bash
# 기본 문법
claude mcp add [옵션] <이름> -- <커맨드> [인자...]

# 예시: Airtable 연결
claude mcp add --transport stdio --env AIRTABLE_API_KEY=YOUR_KEY airtable \
  -- npx -y airtable-mcp-server
```

### MCP 서버 관리 명령어

```bash
# 설정된 서버 목록 보기
claude mcp list

# 특정 서버 상세 확인
claude mcp get github

# 서버 제거
claude mcp remove github

# Claude Code 내에서 상태 확인
/mcp
```

---

## 설정 파일 위치 (스코프)

MCP 서버 설정은 사용 범위에 따라 세 곳에 저장됩니다:

| 스코프 | 저장 위치 | 용도 |
|--------|----------|------|
| **로컬** (기본값) | `~/.claude.json` | 현재 프로젝트에만, 개인 설정 |
| **프로젝트** | `.mcp.json` (프로젝트 루트) | 팀 전체 공유, 버전 관리에 포함 |
| **유저** | `~/.claude.json` | 모든 프로젝트에서 사용 |

```bash
# 팀 공유용 프로젝트 스코프로 추가
claude mcp add --transport http paypal --scope project https://mcp.paypal.com/mcp

# 모든 프로젝트에서 쓸 유저 스코프로 추가
claude mcp add --transport http hubspot --scope user https://mcp.hubspot.com/anthropic
```

팀 프로젝트에서는 `.mcp.json`을 Git에 커밋해서 팀원 모두가 동일한 MCP 서버를 사용할 수 있습니다.

---

## 입문자 추천 MCP 3가지

실용성 기준으로 처음 써볼 만한 MCP 서버입니다:

### 1. Notion MCP

```bash
claude mcp add --transport http notion https://mcp.notion.com/mcp
```

**없어지는 노가다**: 회의록/리서치 결과 수동 복사, 페이지 내용 붙여넣기, 데이터베이스 일일이 업데이트

**활용 예시**:
- "Notion의 '회의록' DB에서 지난 7일 항목을 가져와서 결정사항·액션아이템만 모아 weekly.md로 만들어줘"
- "이 리서치 결과를 Notion '경쟁사 분석' 페이지에 추가해줘"

### 2. Slack MCP

claude.ai 계정 연결 후 [claude.ai/settings/connectors](https://claude.ai/settings/connectors)에서 바로 설정 가능

**없어지는 노가다**: 채널 스레드 수동 읽기, 요약 요청을 위한 복붙, 공지 초안 직접 작성

**활용 예시**:
- "#마케팅 채널의 오늘 스레드를 읽고, 쟁점 3개와 합의된 다음 액션을 정리해서 슬랙 공지 초안을 만들어줘"

### 3. Google Chrome (웹 리서치)

claude.ai 계정 연결 후 [claude.ai/settings/connectors](https://claude.ai/settings/connectors)에서 바로 설정 가능

**없어지는 노가다**: 웹사이트 방문해서 정보 수동 복사, 여러 사이트 비교를 위한 반복 탭 전환

**활용 예시**:
- "지정한 5개 경쟁사 사이트를 훑고, 오늘의 주요 변화·새 기능·가격 변경만 표로 정리해줘"

---

<details>
<summary>🖥️ 개발자 추천 MCP 3가지 (GitHub / PostgreSQL / Sentry)</summary>

### GitHub MCP

```bash
claude mcp add --transport http github https://api.githubcopilot.com/mcp/
```

**없어지는 노가다**: PR 내용 복붙, 이슈 수동 조회, 코드 리뷰 컨텍스트 전달

### PostgreSQL / DB MCP

```bash
claude mcp add --transport stdio db -- npx -y @bytebase/dbhub \
  --dsn "postgresql://user:pass@localhost:5432/mydb"
```

**없어지는 노가다**: 스키마 설명, 데이터 조회 결과 복붙, SQL 작성 후 직접 실행

### Sentry MCP

```bash
claude mcp add --transport http sentry https://mcp.sentry.dev/mcp
```

**없어지는 노가다**: 에러 스택트레이스 복붙, 에러 발생 시점 수동 조회

</details>

---

## Claude Code 공식 커넥터

Claude.ai 계정으로 Claude Code에 로그인한 경우, [claude.ai/settings/connectors](https://claude.ai/settings/connectors)에서 설정한 MCP 서버가 Claude Code에 자동으로 연결됩니다.

공식적으로 지원되는 커넥터:
- **Slack**: 채널 메시지 읽기/쓰기
- **Google Chrome**: 브라우저 자동화 (Playwright 기반)

---

## OAuth 인증이 필요한 서버 연결 방법

Sentry, GitHub 같은 클라우드 서버는 OAuth 인증이 필요합니다:

```bash
# 1단계: 서버 추가
claude mcp add --transport http sentry https://mcp.sentry.dev/mcp

# 2단계: Claude Code 내에서 인증
> /mcp

# 브라우저 열림 → 로그인 → 완료
```

인증 토큰은 자동으로 저장되고 갱신됩니다.

---

## MCP 프롬프트를 커맨드로 사용하기

MCP 서버가 프롬프트를 제공하는 경우, Claude Code에서 `/mcp__서버명__프롬프트명` 형식으로 직접 실행할 수 있습니다:

```
> /mcp__github__list_prs
> /mcp__github__pr_review 456
> /mcp__jira__create_issue "로그인 버그" high
```

---

## ⚠️ 주의사항

**신뢰할 수 없는 MCP 서버를 함부로 설치하지 마세요.**

- MCP 서버는 Claude를 통해 내 파일 시스템, DB, 외부 서비스에 접근할 수 있습니다
- 특히 <strong>외부 콘텐츠를 가져오는 MCP 서버</strong>는 프롬프트 인젝션 위험이 있습니다
- Anthropic이 직접 검증한 서버만 공식 MCP 레지스트리에 등록되어 있습니다
- 출처가 불명확한 서버는 설치 전 소스 코드를 반드시 확인하세요

```bash
# 프로젝트 스코프 서버는 팀원들에게 확인 요청이 표시됩니다
# (보안 검토를 위한 안전장치)
```

---

## GPTaku 플러그인과 MCP

여러분이 이미 설치한 GPTaku 플러그인들도 내부적으로 MCP를 활용합니다:

| 플러그인 | 사용하는 MCP | 역할 |
|---------|-------------|------|
| **docs-guide** | Context7 MCP | 공식 문서를 실시간으로 조회해 정확한 답변 제공 |
| **품앗이** | Codex MCP (선택) | Claude가 PM 역할, Codex가 있으면 병렬 개발 / 없으면 Claude만으로 동작 |
| **deep-research** | 웹 검색 MCP | 멀티에이전트가 여러 소스를 동시에 조사 |

> 💡 플러그인을 설치하면 MCP 설정이 자동으로 추가됩니다. 별도로 MCP를 설정할 필요 없이, 플러그인이 알아서 처리합니다.

---

## 한 줄 요약

> MCP = Claude에게 외부 세계를 연결하는 플러그인. GitHub, DB, Slack을 Claude가 직접 다루게 해서 "복사-붙여넣기" 노가다를 없앤다.

MCP가 "외부 세계와 연결"이라면, 다음 Hooks는 "Claude Code 자체 동작을 자동화"하는 것입니다.
