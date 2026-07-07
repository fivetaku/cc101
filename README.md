# CC101 — Claude Code 한국어 입문 가이드

> **Claude Code를 가장 쉽게 시작하는 한국어 가이드**

🌐 **사이트**: [cc101.axwith.com](https://cc101.axwith.com)
📦 **GitHub**: [github.com/fivetaku/cc101](https://github.com/fivetaku/cc101)

---

## 소개

CC101은 Claude Code를 처음 접하는 한국어 사용자를 위한 입문 가이드입니다.
공식 문서 기반으로 설치부터 CLAUDE.md, MCP, Skills, Hooks까지 단계별로 정리했습니다.

[Codex 101](https://swhan0329.github.io/codex-101/)에서 영감을 받아 Claude Code 버전으로 제작했습니다.

---

## 주요 기능

- 📖 **23개 섹션** — 설치부터 고급 활용까지 단계별 가이드
- 🌐 **한국어 / 영어 토글** — 언어 전환 지원
- 🌙 **다크 / 라이트 모드** — 테마 전환 지원
- 📱 **반응형 디자인** — 모바일 최적화
- ⚡ **빠른 로딩** — Next.js SSG 기반

---

## 기술 스택

| 기술 | 버전 |
|-----|------|
| Next.js | 16.x (App Router) |
| TypeScript | 5.x |
| Tailwind CSS | 4.x |
| next-mdx-remote | 최신 |

---

## 로컬 개발

```bash
# 의존성 설치
pnpm install

# 개발 서버 실행
pnpm dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000) 접속

---

## 콘텐츠 수정

섹션 콘텐츠는 `content/` 폴더에 Markdown으로 작성합니다:

```
content/
├── sections.json        # 섹션 목차 설정
├── ko/                  # 한국어 콘텐츠
│   ├── 01-intro.md
│   ├── 02-products.md
│   └── ...
└── en/                  # 영어 콘텐츠
    └── ...
```

---

## 기여하기

이 가이드는 **오픈소스**입니다. 잘못된 내용 수정, 새 섹션 추가, 번역 개선 모두 환영합니다!

### 기여 방법

1. 이 저장소를 Fork합니다
2. 브랜치를 생성합니다 (`git checkout -b fix/오류수정`)
3. 변경사항을 커밋합니다 (`git commit -m 'fix: 오류 수정'`)
4. 브랜치에 Push합니다 (`git push origin fix/오류수정`)
5. Pull Request를 생성합니다

### 기여 가능한 내용

- 오탈자 / 문법 오류 수정
- 공식 문서 업데이트 반영
- 영어 콘텐츠 보완
- 새로운 섹션 제안
- UI/UX 개선

---

## 라이선스

MIT License — 자유롭게 사용, 수정, 배포 가능합니다.

---

⭐ 이 가이드가 도움이 됐다면 **Star**를 눌러주세요!
Star 하나가 가이드를 계속 발전시키는 큰 힘이 됩니다.
