# 22. 다음 단계 & 리소스

> CC101을 마친 당신에게. 이제 진짜 시작입니다.

---

## 여기까지 오셨군요

Claude Code의 기초부터 고급 자동화까지 전 과정을 완주하셨습니다. 쉽지 않은 여정이었지만, 이제 당신은 AI 기반 자동화 도구를 실제 업무에 활용할 수 있는 기반을 갖췄습니다.

잠깐 돌아보면, 이런 것들을 배웠습니다:

- Claude Code가 무엇이고 어떻게 작동하는지
- 설치와 인증 설정
- CLAUDE.md로 프로젝트 맞춤 설정
- 기본 명령어와 워크플로우
- MCP로 외부 도구 연결
- Hooks와 Skills로 자동화
- 플러그인 생태계 탐색
- 비용 관리와 최적화
- Headless 모드와 CI/CD 연동

이 지식은 단순히 도구 하나를 배운 것이 아닙니다. AI와 협업하는 새로운 업무 방식을 익힌 것입니다.

---

## 다음 학습 경로

### 입문 완료 (지금 여기)

```
✅ Claude Code 설치 & 인증
✅ CLAUDE.md 작성
✅ 기본 명령어 (/help, /cost, /compact, /model)
✅ 파일 읽기, 내용 수정, 문서 생성
✅ 플러그인 기본 사용
```

---

### 중급: 실전 응용

CC101에서 배운 기초를 조합해 실제 업무에 적용해보세요.

**나만의 워크플로우 자동화**
- CLAUDE.md + Hooks + Skills를 조합해 반복 업무를 원커맨드로 줄이기
- 예: 매주 보고서 자동 생성, 코드 리뷰 자동화, 회의록 정리 파이프라인

**플러그인 파이프라인 — 아이디어에서 완성까지**

하나의 프로젝트를 플러그인 조합으로 처음부터 끝까지 진행할 수 있습니다:

```
1. 리서치    /deep-research → 시장 조사, 경쟁 분석, 기술 검토
2. 기획      /show-me-the-prd → 리서치 결과 기반으로 PRD, 데이터 모델, 프로젝트 스펙 자동 생성
3. 개발      /kkirikkiri → 에이전트 팀 구성해서 병렬 개발 (프론트/백엔드/테스트 동시 진행)
4. 검토      /kkirikkiri → 분석 팀 구성해서 코드 리뷰 + 품질 검증
5. 개선      /kkirikkiri → 피드백 기반으로 개선 팀 구성해서 보강
6. 스킬화    /skillers-suda → 반복되는 워크플로우를 스킬로 만들어서 재사용
```

- **docs-guide**를 중간중간 활용하면 공식 문서 기반으로 정확한 구현이 가능합니다
- **바선생**으로 자신의 AI 활용 패턴을 분석하고 프롬프트 품질을 점진적으로 개선할 수 있습니다

**멀티 세션 & 병렬 작업**
- 여러 터미널에서 Claude Code를 동시에 실행해 작업 분담
- **/kkirikkiri**로 에이전트 팀을 구성하면 팀원들이 자동으로 병렬 작업을 수행합니다
- **품앗이**로 Codex를 병렬 외주 개발자로 활용할 수도 있습니다 (Codex 없이 Claude만으로도 동작)

---

### 고급: CC101 너머의 세계

이 가이드에서 다루지 않은 심화 주제들입니다.

**Agent SDK로 나만의 AI 앱 만들기**
- Anthropic의 [Agent SDK](https://docs.anthropic.com/en/docs/agents)를 사용하면 Claude를 엔진으로 한 독립 AI 애플리케이션을 개발할 수 있습니다
- Python/TypeScript로 커스텀 에이전트 구축 — Claude Code 없이도 동작하는 자동화 시스템

**Model Context Protocol (MCP) 서버 직접 만들기**
- CC101에서는 MCP 서버를 "사용"하는 법을 배웠지만, 직접 MCP 서버를 "만들"수도 있습니다
- 회사 내부 API, 사내 DB, 사내 위키를 MCP 서버로 감싸면 Claude Code가 바로 접근 가능
- [MCP 공식 스펙](https://modelcontextprotocol.io)

**Claude Code 플러그인 개발**
- 자신만의 플러그인을 만들어 커뮤니티에 공유하기
- Skills, Hooks, Agents, MCP 서버를 하나의 패키지로 묶는 구조
- **스킬러들의 수다** 플러그인으로 빠르게 프로토타이핑 가능

**팀 단위 도입 & 거버넌스**
- 팀 전체가 Claude Code를 사용할 때의 권한 관리, 비용 분배, 보안 정책
- Enterprise 플랜의 관리자 기능 (Admin Controls, Audit Logs)
- 사내 코딩 표준을 CLAUDE.md로 강제하는 방법

**프로덕션 자동화 파이프라인**
- GitHub Actions + Headless Claude Code로 PR 자동 리뷰, 자동 테스트 생성
- 야간 배치 작업: 매일 새벽에 데이터 처리, 보고서 생성, 코드 품질 검사
- 모니터링 + 알림 연동 (Slack, Discord)

---

## 공식 리소스

### 공식 문서

| 리소스 | URL |
|--------|-----|
| **공식 문서 (영어)** | [code.claude.com/docs](https://code.claude.com/docs) |
| **GitHub 저장소** | [github.com/anthropics/claude-code](https://github.com/anthropics/claude-code) |
| **공식 플러그인** | [github.com/anthropics/claude-plugins-official](https://github.com/anthropics/claude-plugins-official) |
| **Anthropic 콘솔** | [platform.claude.com](https://platform.claude.com) |

---

### CC101 & gptaku_plugins 커뮤니티

| 리소스 | URL | 설명 |
|--------|-----|------|
| **CC101 GitHub** | [github.com/fivetaku/cc101](https://github.com/fivetaku/cc101) | 이 가이드 저장소. 오타·내용 추가 기여 환영 |
| **gptaku_plugins** | [github.com/fivetaku/gptaku_plugins](https://github.com/fivetaku/gptaku_plugins) | 바이브코더를 위한 11개 플러그인 모음: 기획(show-me-the-prd), Git(깃선생), 멘토(바선생), 리서치(deep-research), 병렬개발(품앗이), 팀 구성(끼리끼리), 스킬 생성(스킬러들의 수다), 공식문서(docs-guide), Google Workspace(nopal), 우회검색(insane-search), 디자인분석(insane-design) |

이 가이드가 도움이 됐다면 **Star** 를 눌러주세요! 업데이트와 발전에 큰 힘이 됩니다.

---

## Claude Code를 잘 쓰는 법 & 피해야 할 패턴

도구를 배웠다면 이제 언제, 어떻게 써야 하는지가 중요합니다.

### 잘 맞는 작업 (마음껏 활용하세요)

| 작업 | 이유 |
|------|------|
| 반복적인 보일러플레이트 코드 생성 | 패턴이 명확해 실수 가능성 낮음 |
| 테스트 코드 작성 | 함수 시그니처 기반으로 정확하게 생성 |
| 코드 리팩토링 (범위 명확할 때) | 특정 파일/함수 지정 시 안전 |
| 에러 메시지 분석 및 수정 | 에러 로그 + 코드 맥락 결합에 탁월 |
| 문서화 / 주석 추가 | 기존 코드 기반이라 할루시네이션 적음 |
| 정규식, SQL 쿼리, 설정 파일 | 구문이 명확한 작업에 강함 |
| 익숙하지 않은 언어/프레임워크 탐색 | 빠른 온보딩에 매우 효과적 |
| 레거시 코드 이해 및 주석 추가 | 맥락 파악 + 설명 요청에 탁월 |

### 주의가 필요한 작업 (검토를 철저히 하세요)

| 작업 | 주의 이유 |
|------|----------|
| 인증/보안 관련 코드 | 미묘한 취약점이 생길 수 있음 |
| 결제/금융 로직 | 정확성이 절대적으로 중요 |
| 대규모 리팩토링 (여러 파일 동시) | 의도치 않은 사이드 이펙트 위험 |
| DB 스키마 변경 / 마이그레이션 | 데이터 손실 가능성 |
| 프로덕션 배포 스크립트 | 실수 시 영향 범위 큼 |
| 외부 API 연동 및 시크릿 처리 | 키 노출, 잘못된 엔드포인트 위험 |

### 항상 지키는 5가지 원칙

1. 작업 전 git commit → 언제든 롤백 가능한 상태 유지
2. 범위를 명확히 → "이 파일의 이 함수만" 처럼 구체적으로
3. 생성된 코드는 직접 읽어보기 → 이해 못 한 코드는 사용하지 않기
4. 보안/결제 코드는 반드시 별도 검토
5. 큰 작업은 Plan Mode로 계획 먼저 확인 (Shift+Tab)

---

## 첫 실전 프로젝트 추천

CC101을 마쳤다면 바로 실전에 뛰어들어 보세요. 코딩 여부와 관계없이 바로 시작할 수 있는 프로젝트들입니다.

### 1. 회의록 자동 정리 워크플로우

매주 반복되는 회의 정리 작업을 Claude Code에게 맡겨보세요.

```
"~/Downloads/meeting-250225.mp3 파일 있어.
 회의 내용 변환하고, 요약 + 담당자별 액션아이템 정리해서
 meeting-250225.md 로 저장해줘"
```

녹음 파일을 텍스트로 변환하는 도구 설치부터 정리까지 전부 알아서 합니다.

---

### 2. 내 업무용 Skills 만들기

매주 반복하는 작업을 `/커맨드` 하나로 줄여보세요.

```
"매주 월요일마다 지난 주 작업 내용 정리하는 Skills 만들어줘.
 GitHub 커밋 내역이랑 메모 파일 기반으로 주간 보고서 초안 생성하는 방식으로"
```

---

### 3. 경쟁사 분석 보고서

관심 있는 분야의 경쟁사를 분석해보세요.

```
"경쟁사 A, B, C 웹사이트 분석해서
 주요 기능, 가격, 타깃 고객, 차별화 포인트 비교표 만들어줘.
 competitor-analysis.md 로 저장해줘"
```

---

### 4. 포트폴리오 사이트 만들기 🖥️ 개발자

```
"HTML/CSS/JS로 포트폴리오 사이트를 만들어줘.
섹션: 소개, 기술 스택, 프로젝트, 연락처.
미니멀하고 다크 테마로 만들어줘."
```

---

### 5. 기존 코드 리팩토링 🖥️ 개발자

```
"이 파일의 코드를 리뷰하고 개선해줘.
가독성, 성능, 에러 처리에 집중해줘.
@src/utils/dataProcessor.js"
```

---

## 막히면 어떻게 하나요?

### 1단계: 공식 문서 확인

대부분의 답은 공식 문서에 있습니다.

```
https://code.claude.com/docs
```

Claude Code 안에서도 도움을 받을 수 있습니다:

```
/help
```

---

### 2단계: Claude Code에게 직접 물어보기

Claude Code 자체가 가장 강력한 도움말입니다.

```
"Claude Code에서 MCP 서버를 추가하는 방법을 알려줘"
"이 에러 메시지의 의미가 뭔지 설명해줘: [에러 내용]"
```

---

### 3단계: 커뮤니티

- **GitHub Issues**: [github.com/anthropics/claude-code/issues](https://github.com/anthropics/claude-code/issues)
- **CC101**: [github.com/fivetaku/cc101](https://github.com/fivetaku/cc101)

---

### 4단계: Anthropic 지원

계정이나 결제 관련 문제는 [Anthropic 콘솔](https://platform.claude.com)에서 지원을 요청하세요.

---

## 마지막으로

Claude Code는 빠르게 발전하는 도구입니다. 오늘 배운 것이 몇 달 후에는 달라져 있을 수 있습니다. 중요한 것은 기본 원리를 이해하는 것입니다.

<strong>AI와 함께하는 업무</strong>는 단순히 작업을 빠르게 처리하는 것이 아닙니다. AI의 강점(넓은 지식, 반복 작업, 패턴 인식)과 사람의 강점(판단력, 창의성, 도메인 지식)을 결합하는 새로운 협업 방식입니다.

CC101을 마친 여러분은 그 첫걸음을 내딛었습니다. 앞으로의 여정이 기대됩니다.

---

## 빠른 참조 카드

```
공식 문서:      https://code.claude.com/docs
GitHub:         https://github.com/anthropics/claude-code
플러그인:       https://github.com/anthropics/claude-plugins-official
gptaku_plugins: https://github.com/fivetaku/gptaku_plugins
CC101:          https://github.com/fivetaku/cc101
콘솔:           https://platform.claude.com
실전 강의:      https://fastcampus.co.kr/biz_online_claudecode

다음 목표:
  바이브코더 → gptaku_plugins 설치, show-me-the-prd로 기획, 바선생으로 성장
  중급 → MCP 설정 (Notion/Slack/GitHub), Hooks 커스터마이징, 플러그인 탐색
  고급 → 나만의 Skills 제작 (또는 스킬러들의 수다), 끼리끼리로 Agent Teams
  (개발자) → CI/CD 완전 자동화, 품앗이로 병렬 개발
```
