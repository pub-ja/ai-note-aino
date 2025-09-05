# Gemini Project Notes: AINO

This document summarizes the key technical details and modifications for the AINO project for future reference by the Gemini assistant.

## Project Overview

- **Purpose:** A study project to build a chatbot interface.
- **Technology Stack:** React, Vite, TypeScript, and **Tailwind CSS v4**.

## Summary of Major Refactoring

This project underwent a significant refactoring to fix a broken build configuration and to migrate from legacy CSS to modern Tailwind CSS practices.

### 1. Tailwind CSS v4 Configuration Fix

The initial problem was that Tailwind styles were not being applied. This was due to an incorrect project setup for Tailwind CSS v4. The following steps were taken to fix it:

- **Uninstalled `@tailwindcss/postcss`** and **installed the correct v4 package: `@tailwindcss/vite`**.
- **Updated `vite.config.ts`** to use the `@tailwindcss/vite` plugin.
- **Updated `src/index.css`** to use the correct v4 directive: `@import "tailwindcss";` (while keeping the custom font import).
- **Removed the `content` array** from `tailwind.config.js` as it's now auto-detected by the Vite plugin.
- **Deleted the unnecessary `postcss.config.js`** file.

### 2. Component Refactoring: `src/components/layout/AppContainer.tsx`

The main application component was refactored to use Tailwind CSS utility classes instead of legacy, BEM-style classes (e.g., `ka-chatbot__...`).

- **Layout:** The entire component layout, including the header, sidebar, and main content, is now controlled by Tailwind's flexbox and spacing utilities.
- **Styling:** All colors, fonts, borders, shadows, and hover states are applied directly in the JSX using Tailwind classes.

### 3. Key Logic and State Management

The following UI logic is managed within `AppContainer.tsx` using React's `useState` hook:

- `isChatOpen`: Controls the visibility of the main chat window. Defaults to `false`.
- `isFullScreen`: Toggles the fullscreen mode for the chat window.
- `isMenuOpen`: Toggles the visibility of the slide-out side menu.
- **Push/Overlay Menu:** The side menu correctly overlays the content in normal mode and "pushes" the content in fullscreen mode, as per the original design.

## Development Notes

- To run the project, use `npm run dev`.
- **Important:** If you make changes to configuration files like `vite.config.ts` or `tailwind.config.js`, you must **restart the dev server** for the changes to take effect.


Phase 1 (MVP) 구체화

1. "클립보드 즉시 요약/번역" 기능
    - 사용자가 웹서핑 중 텍스트를 복사(Ctrl+C)하면, 챗봇 창에서 "클립보드의 텍스트를 요약할까요?" 라는 버튼이 바로 나타납니다. 앱을 오갈 필요 없이 즉각적인
    사용성을 제공하여 앱의 가치를 초반에 각인시킬 수 있습니다.
2. "결과물 공유/내보내기" 기능
    - AI가 요약/번역한 결과를 단순 노트 저장뿐만 아니라, 마크다운(.md) 파일이나 텍스트(.txt) 파일로 바로 다운로드할 수 있는 기능을 제공합니다. 또는 "공유하기"
    버튼으로 다른 앱에 내용을 쉽게 붙여넣을 수 있게 합니다.

Phase 2 (고도화) 구체화

1. "AI 기반 노트 템플릿" 기능
    - 사용자가 "회의록 정리해줘"라고 하면, AI가 내용을 분석하여 [참석자], [핵심 결정사항], [Action Item] 과 같은 구조화된 템플릿에 맞춰 노트를 생성해줍니다.
    "독서 노트", "수업 필기" 등 다양한 템플릿을 제공하여 활용도를 높입니다.
2. "노트 간 연결 및 인사이트" 기능
    - 저장된 노트가 5~10개 이상 쌓이면, AI가 노트들을 분석하여 "최근 'React 성능 최적화'에 대한 노트를 여러 개 작성하셨네요. 핵심 내용을 브리핑해드릴까요?" 와
    같이 주제별 요약이나 노트 간의 연관성을 제시해줍니다. 단순한 노트 앱을 넘어 '개인화된 지식 관리 툴'로 발전시키는 핵심 기능입니다.
3. 페이지 및 컴포넌트 구조 제안

제시해주신 UI/UX 설명과 React/Tailwind 기술 스택에 맞춰, 기존의 main.html을 어떻게 체계적인 컴포넌트로 분리할 수 있을지 구조를 제안합니다.

이 구조는 재사용성을 높이고 유지보수를 쉽게 만들어 줄 것입니다.

 /src
 |
 ├── /components/          # 재사용 가능한 모든 컴포넌트
 │   |
 │   ├── /ui/              # 버튼, 카드 등 가장 작은 단위의 UI 컴포넌트
 │   │   ├── Button.tsx
 │   │   ├── Card.tsx
 │   │   ├── Input.tsx
 │   │   └── Spinner.tsx
 │   |
 │   ├── /layout/          # 앱의 전체적인 레이아웃 구조
 │   │   ├── AppContainer.tsx  # 플로팅/풀스크린/모바일 뷰 모드 관리
 │   │   ├── Header.tsx        # 제목, 로그인 버튼, 메뉴(모바일/플로팅)
 │   │   ├── Sidebar.tsx       # 풀스크린 모드의 얇은 사이드바
 │   │   └── ExpandedMenu.tsx  # 노트 목록, 설정 등이 표시될 확장 메뉴
 │   |
 │   ├── /chat/            # 채팅 기능 관련 컴포넌트
 │   │   ├── ChatView.tsx      # 채팅 관련 컴포넌트들을 조합하는 메인 뷰
 │   │   ├── MessageList.tsx   # 메시지 목록을 렌더링
 │   │   ├── Message.tsx       # 개별 메시지 버블 (텍스트, 리스트, 이미지 등 타입 분기)
 │   │   ├── ChatInput.tsx     # 메시지 입력창, 전송/파일첨부 버튼
 │   │   └── InitialScreen.tsx # 초기 화면 (앱 로고, 추천 질문 슬라이더)
 │   |
 │   └── /notes/           # 확장 메뉴 내부의 노트 관리 기능
 │       ├── NoteList.tsx
 │       ├── NoteDetail.tsx
 │       └── SearchBar.tsx
 |
 └── App.tsx               # 최상위 컴포넌트, 라우팅 및 전역 상태 관리

어떻게 진행될까요?

1. `App.tsx`가 시작점: 현재의 App.tsx가 이 모든 컴포넌트를 담는 최상위 컨테이너가 됩니다.
2. `AppContainer.tsx`의 역할: 사용자가 설명해주신 플로팅/풀스크린/모바일의 3가지 모드를 전환하는 핵심 로직을 이 컴포넌트가 담당하게 됩니다. 화면 크기와 상태에
따라 다른 레이아웃 컴포넌트를 보여주는 역할을 합니다.
3. 점진적인 전환: 기존 legacy-styles.css의 스타일들을 위 컴포넌트 구조에 맞춰 하나씩 Tailwind 유틸리티 클래스로 옮겨가며 개발을 진행하게 됩니다.