# GEMINI Project Context: MERN Blog

## 프로젝트 개요 (Project Overview)
이 프로젝트는 **MERN 스택**(MongoDB, Express, React, Node.js)을 기반으로 한 블로그 애플리케이션입니다. 사용자 인증, 포스트 작성/수정/삭제, 관리자 권한 관리 및 다크 모드와 같은 풍부한 기능을 갖춘 현대적인 웹 애플리케이션입니다.

### 주요 기술 스택 (Main Technology Stack)
- **Frontend**: React (Vite), Tailwind CSS, Flowbite React, Redux Toolkit, Redux Persist, React Router DOM, React Quill (에디터).
- **Backend**: Node.js, Express, MongoDB (Mongoose).
- **인증 (Auth)**: JSON Web Token (JWT), Firebase Google OAuth.
- **기타**: Cookie-parser, Bcryptjs (비밀번호 암호화).

## 프로젝트 구조 (Project Architecture)
```text
mern-blog/
├── api/                # 백엔드 (Express/Node.js)
│   ├── controllers/    # 비즈니스 로직 제어
│   ├── models/         # MongoDB 스키마 및 모델
│   ├── routes/         # API 엔드포인트 라우팅
│   ├── utils/          # 유틸리티 (에러 핸들러, 인증 미들웨어 등)
│   └── index.js        # 서버 진입점
├── client/             # 프론트엔드 (React/Vite)
│   ├── src/
│   │   ├── components/ # 재사용 가능한 컴포넌트
│   │   ├── pages/      # 라우트별 페이지 컴포넌트
│   │   ├── redux/      # Redux 상태 관리 (Slice 및 Store)
│   │   ├── firebase.js # Firebase 설정
│   │   ├── App.jsx     # 메인 라우팅 및 앱 구조
│   │   └── main.jsx    # 클라이언트 진입점
│   └── vite.config.js  # Vite 및 프록시 설정
├── package.json        # 백엔드 의존성 및 스크립트
└── README.md           # 프로젝트 구축 단계별 상세 기록
```

## 실행 및 개발 가이드 (Building and Running)

### 1. 사전 준비 (Prerequisites)
- Node.js 및 npm 설치
- MongoDB 계정 및 클러스터 생성
- Firebase 프로젝트 생성 (Google OAuth용)
- 루트 디렉토리에 `.env` 파일 생성:
  ```env
  MONGO=your_mongodb_connection_string
  JWT_SECRET=your_jwt_secret_key
  ```
- `client/` 디렉토리에 `.env` 파일 생성:
  ```env
  VITE_FIREBASE_API_KEY=your_firebase_api_key
  ```

### 2. 백엔드 실행 (Backend)
루트 디렉토리에서 다음 명령어를 실행합니다:
```bash
npm install     # 의존성 설치
npm run dev     # 개발 모드 실행 (nodemon)
```
서버는 기본적으로 `http://localhost:3000`에서 실행됩니다.

### 3. 프론트엔드 실행 (Frontend)
`client/` 디렉토리로 이동하여 다음 명령어를 실행합니다:
```bash
cd client
npm install     # 의존성 설치
npm run dev     # 개발 모드 실행 (Vite)
```
프론트엔드는 기본적으로 `http://localhost:5173`에서 실행되며, `/api` 요청은 백엔드 서버(`:3000`)로 프록시됩니다.

## 개발 규칙 및 관례 (Development Conventions)
- **에러 핸들링**: 백엔드에서는 `api/utils/error.js`의 `errorHandler`를 사용하여 일관된 에러 응답을 반환합니다.
- **보안**: 민감한 정보는 `.env` 파일에 보관하며, 사용자 인증은 `verifyToken` 미들웨어를 통해 처리합니다.
- **상태 관리**: 글로벌 상태(사용자 정보, 테마 등)는 Redux Toolkit을 사용하며, 페이지 새로고침 시에도 유지되도록 Redux Persist를 적용했습니다.
- **스타일링**: Tailwind CSS와 Flowbite React 컴포넌트를 사용하여 현대적이고 일관된 UI를 유지합니다.

---
*참고: 상세한 프로젝트 구축 과정은 루트의 `README.md` 파일을 참조하십시오.*

# Gemini Added Memories
- "please answer in korean if possible"
  "한국어로 답변 가능하면 가능한 한국어로 답변해줘"
- "if you need to refer to folders in computer, just refer to pg folder"
  "코딩을 할때 항상 pg 폴더만을 참고하고 이 폴더내에 화일들을 관리해줘"
- "when coding, use the latest version of packages, modules, etc. so refers to context7 mcp"
  "코딩 시 가장 최신 버전 패지, 모듈 등을 사용하도록 하고 되도록 context7 mcp를 활용하도록 해"
- "at the last end of your answer, add 'Roger' always"
  "답변의 맨 끝에는 'Roger(로저)'라고 붙여줘"