<div align="center">

<img src="https://readme-typing-svg.demolab.com?font=Fira+Code&weight=700&size=34&pause=1000&color=4F8FFF&center=true&vCenter=true&width=700&lines=Indian+Sign+Language+Platform;Real-Time+Speech+%E2%86%92+ISL+Interpreter;AI-Powered+Accessibility+Tool" alt="Typing SVG" />

<br/>

<!-- Animated Banner -->
<img src="https://readme-typing-svg.demolab.com?font=Fira+Code&weight=900&size=38&pause=800&color=4F8FFF&center=true&vCenter=true&width=900&lines=🤟+Indian+Sign+Language+Platform;Real-Time+Speech+→+ISL+Translator;AI-Powered+Accessibility+for+All;2%2C000%2B+Signs+•+30%2B+FPS+•+Sub-Second+Latency" alt="Animated header" />

<br/><br/>

<!-- Primary Badges -->
<a href="https://github.com/dreamybear66/Indian-Sign-Language-Educational-Platform/stargazers"><img src="https://img.shields.io/github/stars/dreamybear66/Indian-Sign-Language-Educational-Platform?style=for-the-badge&color=FFD700&labelColor=1a1a2e&logo=github" /></a>
<a href="https://github.com/dreamybear66/Indian-Sign-Language-Educational-Platform/network/members"><img src="https://img.shields.io/github/forks/dreamybear66/Indian-Sign-Language-Educational-Platform?style=for-the-badge&color=4F8FFF&labelColor=1a1a2e&logo=github" /></a>
<img src="https://img.shields.io/badge/Contributions-Welcome-brightgreen?style=for-the-badge&labelColor=1a1a2e" />
<img src="https://img.shields.io/badge/License-Academic-orange?style=for-the-badge&labelColor=1a1a2e" />

<br/><br/>

<!-- Tech Stack Badges -->
[![React](https://img.shields.io/badge/React_18%2F19-20232A?style=flat-square&logo=react&logoColor=61DAFB)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat-square&logo=vite&logoColor=white)](https://vitejs.dev/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS_v4-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat-square&logo=node.js&logoColor=white)](https://nodejs.org/)
[![Fastify](https://img.shields.io/badge/Fastify-000000?style=flat-square&logo=fastify&logoColor=white)](https://www.fastify.io/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL_15-316192?style=flat-square&logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![Prisma](https://img.shields.io/badge/Prisma-2D3748?style=flat-square&logo=prisma&logoColor=white)](https://www.prisma.io/)
[![Docker](https://img.shields.io/badge/Docker_Compose-2496ED?style=flat-square&logo=docker&logoColor=white)](https://www.docker.com/)
[![Zustand](https://img.shields.io/badge/Zustand-FF6B35?style=flat-square&logo=react&logoColor=white)](https://zustand-demo.pmnd.rs/)
[![MediaPipe](https://img.shields.io/badge/Google_MediaPipe-FF6D00?style=flat-square&logo=google&logoColor=white)](https://mediapipe.dev/)

<br/><br/>

> ### 🌟 *An AI-powered, full-stack educational platform that converts live English speech into Indian Sign Language video sequences — making education accessible for the Deaf & Hard-of-Hearing community in real time.*

<br/>

---

## 📋 Table of Contents

| Section | Link |
|---------|------|
| 💡 Project Overview | [Read](#-project-overview) |
| ✨ Features | [Read](#-features) |
| 🗂️ Repository Structure | [Read](#️-repository-structure) |
| 🔄 System Architecture | [Read](#-system-architecture) |
| 🛠️ Tech Stack | [Read](#️-tech-stack-deep-dive) |
| 🚀 Getting Started | [Read](#-getting-started) |
| 📡 API Reference | [Read](#-api-reference) |
| 📊 Performance Metrics | [Read](#-performance-metrics) |
| 🤝 Contributing | [Read](#-contributing) |

---

</div>

## 💡 Project Overview

The **Indian Sign Language Educational Platform** is a full-stack web application addressing a critical accessibility gap — students and individuals who are Deaf or Hard-of-Hearing (DHH) often cannot participate fully in mainstream classrooms.

This platform solves that by:
1. **Listening** to continuous spoken English via the browser's native Speech API
2. **Converting** it to ISL Gloss notation using a custom NLP pipeline
3. **Matching** it against a **2,000+ word WLASL vocabulary** in memory
4. **Streaming** the corresponding sign language video clips instantly

The project is organized as a **monorepo** with two independent-yet-integrated modules:

| | 🖥️ Web Platform | 🎙️ Real-Time Interpreter |
|-|---|---|
| **Source** | `web platform/` | `Real time interpreter/` |
| **Purpose** | Full ISL learning suite (courses, lessons, progress, auth) | Optimized real-time speech-to-ISL pipeline |
| **Frontend** | React 18 + Zustand + TailwindCSS v3 | React 19 + TailwindCSS v4 |
| **Backend** | Fastify + Prisma + PostgreSQL | Fastify + Prisma + PostgreSQL |
| **Special Feature** | LRU Video Cache Manager | WLASL Dataset Importer |

---

## ✨ Features

### 🎙️ Real-Time Speech-to-ISL Translation
- Tap the microphone and speak naturally in English
- The Web Speech API captures and transcribes audio in real time
- A custom **Text-to-Gloss** NLP pipeline strips stopwords and maps words to ISL syntax
- Signs are matched against the in-memory WLASL vocabulary and played back as video sequences

### 👁️ In-Browser Computer Vision (30+ FPS)
- **Google MediaPipe Holistic** tracks full body, face, and hand landmarks simultaneously
- Runs 100% in-browser via WebAssembly — no GPU server needed
- Capable of processing continuous camera feeds at **30+ frames per second**

### 🧠 Intelligent LRU Video Cache
- A custom `CacheManager` class preloads sign videos before playback
- Uses a **Least Recently Used (LRU)** eviction strategy with a **50-slot cap**
- Prevents memory leaks and ensures smooth, uninterrupted ISL video sequences

### 📚 Learning Platform (Web Platform Module)
- **Courses & Lessons** — Structured learning paths for different ISL topics
- **User Progress Tracking** — Persistent progress stored in PostgreSQL via Prisma
- **Authentication Module** — Secure user login and session management
- **Multi-page experience** — Landing page, learning section, and real-time interpreter integrated into one app

### ⚡ High-Performance Backend (5 REST APIs)
- `/api/signs` — Serves sign video metadata and streaming paths
- `/api/courses` — CRUD for learning courses
- `/api/lessons` — Lesson content management
- `/api/progress` — User progress tracking
- `/api/supported-sentences` — Returns pre-validated sentence examples for the interpreter UI

### 🐳 One-Command Containerized Database
- Docker Compose spins up a fully configured **PostgreSQL 15** instance instantly
- Environment variable injection for database credentials
- No manual database setup needed for local development

---

## 🗂️ Repository Structure

```
📦 Indian-Sign-Language-Educational-Platform
│
├── 📄 README.md
│
├── 🖥️ web platform/                         ← Indian-SIgn-Language
│   ├── .gitignore
│   ├── README.md
│   ├── backend/                              ← Node.js + Fastify + Prisma
│   │   ├── src/
│   │   │   ├── app.ts                        ← Server entry point
│   │   │   └── videoMapping.ts              ← WLASL word → video URL map
│   │   ├── prisma/
│   │   │   └── schema.prisma                 ← Database schema
│   │   └── tsconfig.json
│   └── frontend/                             ← React 18 + Zustand + TailwindCSS v3
│       ├── index.html
│       ├── vite.config.ts
│       └── src/
│           ├── app/                          ← Router & App shell
│           ├── assets/                       ← Static assets
│           ├── components/                   ← Shared UI components
│           ├── modules/
│           │   ├── auth/                     ← Login / Register
│           │   ├── landing/                  ← Landing page
│           │   ├── learn/                    ← Course & Lesson viewer
│           │   ├── interpreter-video/        ← Video playback engine
│           │   └── realtime/                 ← 🎙️ Main real-time interpreter
│           │       ├── RealTime.tsx          ← Core component (mic → gloss → video)
│           │       ├── SentenceMatcher.ts    ← WLASL vocabulary matcher
│           │       ├── CacheManager.ts       ← LRU video cache (50 slots)
│           │       └── VideoSequence.tsx     ← Sequential video playback
│           ├── shared/
│           │   ├── speech.ts                 ← Web Speech API hook
│           │   └── textToGloss.ts            ← English → ISL Gloss converter
│           └── ui/
│               ├── Sidebar.tsx
│               └── BottomNav.tsx
│
└── 🎙️ Real time interpreter/                ← isl module 1
    ├── .gitignore
    ├── package.json
    ├── docker-compose.yml                    ← PostgreSQL container
    ├── backend/                              ← Node.js + Fastify + Prisma
    │   ├── src/
    │   │   ├── server.ts                     ← Fastify server (5 route groups)
    │   │   ├── routes/
    │   │   │   ├── courses.ts
    │   │   │   ├── lessons.ts
    │   │   │   ├── progress.ts
    │   │   │   ├── signs.ts                  ← Sign video streaming API
    │   │   │   └── supported-sentences.ts    ← Example sentence API
    │   │   ├── plugins/                      ← Fastify plugins
    │   │   ├── services/                     ← Business logic layer
    │   │   └── schemas/                      ← JSON schema validation
    │   ├── prisma/                           ← Database migrations
    │   └── scripts/
    │       └── import_wlasl.ts              ← 🔄 WLASL JSON → DB importer
    └── frontend/                             ← React 19 + TailwindCSS v4
        └── src/
            ├── modules/
            │   └── interpreter-video/
            │       ├── SentenceMatcher.ts    ← 2,000+ WLASL vocabulary Set
            │       ├── SpeechInput.tsx       ← Mic UI + speech trigger
            │       └── VideoSequence.tsx     ← Video playback sequencer
            └── shared/
                └── textToGloss.ts           ← NLP Gloss pipeline
```

---

## 🔄 System Architecture

### End-to-End Data Flow

```mermaid
flowchart TD
    A([🎙️ User Speaks]) --> B[Web Speech API]
    B -->|Raw transcript| C[textToGloss.ts\nNLP Pipeline]
    C -->|ISL Gloss string\nSTOPWORDS REMOVED| D[SentenceMatcher.ts\nWLASL Vocab Check]
    D -->|Matched word array| E{Cache\nLookup}
    E -->|Cache HIT| F([▶️ Play Video])
    E -->|Cache MISS| G[Fastify API\n/api/signs/:word/video]
    G --> H[(PostgreSQL DB\nSign Metadata)]
    H -->|Video path| G
    G -->|Video stream URL| I[CacheManager.ts\nLRU Cache 50 slots]
    I --> F
    F -->|Next sign| D

    J([📷 Camera Feed]) --> K[MediaPipe Holistic\n30+ FPS]
    K -->|Landmarks| L[Canvas Renderer\nDrawing Utils]
```

### Backend API Architecture

```mermaid
graph LR
    Client[⚛️ React Frontend] -->|HTTP| Server[⚡ Fastify Server\nPort 3000]

    Server --> R1[GET /api/signs\n Sign Vocabulary]
    Server --> R2[GET /api/courses\n Course List]
    Server --> R3[GET /api/lessons\n Lesson Content]
    Server --> R4[PUT /api/progress\n User Progress]
    Server --> R5[GET /api/supported-sentences\n Example Sentences]
    Server --> R6[GET /videos/*\n Static Video Files]

    R1 & R2 & R3 & R4 --> DB[(🐘 PostgreSQL 15\nvia Docker Compose)]
    DB -->|Prisma ORM| R1

    style Server fill:#000,color:#fff
    style Client fill:#20232a,color:#61dafb
    style DB fill:#316192,color:#fff
```

---

## 🛠️ Tech Stack Deep Dive

### Frontend
| Technology | Version | Purpose |
|-----------|---------|---------|
| React | 18 / 19 | UI component framework |
| TypeScript | 5.x | Type-safe development |
| Vite | 5 / 7 | Lightning fast build tooling |
| Zustand | ^4.5 | Lightweight global state management |
| TailwindCSS | v3 & **v4** | Utility-first styling |
| React Router DOM | v6 & v7 | Client-side routing |
| Lucide React | ^0.344 | Beautiful icon set |
| `clsx` + `tailwind-merge` | Latest | Conditional class utilities |

### Computer Vision & AI
| Technology | Purpose |
|-----------|---------|
| `@mediapipe/holistic` | Full-body + hand + face landmark detection |
| `@mediapipe/camera_utils` | Webcam stream management |
| `@mediapipe/drawing_utils` | Canvas skeleton rendering |
| Native Web Speech API | Browser-native real-time speech-to-text |
| Custom NLP Pipeline | English → ISL Gloss conversion (textToGloss.ts) |

### Backend & Infrastructure
| Technology | Version | Purpose |
|-----------|---------|---------|
| Node.js | ≥18 | JavaScript runtime |
| Fastify | v4 / v5 | High-performance HTTP framework |
| Prisma ORM | v5 / v7 | Type-safe database client |
| PostgreSQL | 15-alpine | Primary relational database |
| Docker Compose | 3.8 | Local database containerization |
| `tsx` | ^4.21 | TypeScript execution (no compile step) |
| `dotenv` | Latest | Environment variable management |

---

## 🚀 Getting Started

### ✅ Prerequisites

Ensure you have the following installed:
- **Node.js** `>=18` — [Download](https://nodejs.org/)
- **Docker Desktop** — [Download](https://www.docker.com/products/docker-desktop/)
- **Git** — [Download](https://git-scm.com/)

---

### 🖥️ Option 1: Web Platform

```bash
# 1. Clone the repository
git clone https://github.com/dreamybear66/Indian-Sign-Language-Educational-Platform.git
cd Indian-Sign-Language-Educational-Platform/"web platform"

# 2. Install & start the backend
cd backend
npm install
npm run dev
# ✅ Backend running at http://localhost:3000

# 3. In a new terminal — install & start the frontend
cd ../frontend
npm install
npm run dev
# ✅ Frontend running at http://localhost:5173
```

---

### 🎙️ Option 2: Real-Time Interpreter (Full Stack)

```bash
cd "Real time interpreter"

# 1. Start the database
docker-compose up -d
# ✅ PostgreSQL running on port 5432

# 2. Install root dependencies
npm install

# 3. Set up the database schema
npx prisma migrate dev

# 4. (Optional) Import WLASL dataset
npx tsx backend/scripts/import_wlasl.ts

# 5. Start the backend server
npm run dev
# ✅ API running at http://localhost:3000

# 6. In a new terminal — start the frontend
cd frontend
npm install
npm run dev
# ✅ App running at http://localhost:5173
```

---

### ⚙️ Environment Variables

Copy `.env.example` to `.env` in `Real time interpreter/` and fill in:

```env
DATABASE_URL="postgresql://user:password@localhost:5432/isl_db"
DB_USER=postgres
DB_PASSWORD=yourpassword
DB_NAME=isl_db
```

---

## 📡 API Reference

Base URL: `http://localhost:3000`

| Method | Endpoint | Description |
|--------|---------|-------------|
| `GET` | `/api/signs` | Returns all sign vocabulary entries |
| `GET` | `/api/signs/:word/video` | Streams video for a specific sign word |
| `GET` | `/api/courses` | Returns all learning courses |
| `GET` | `/api/lessons` | Returns lessons for a course |
| `GET/PUT` | `/api/progress` | Get or update user progress |
| `GET` | `/api/supported-sentences` | Returns example sentences for the interpreter |
| `GET` | `/videos/*` | Serves static WLASL video files |

---

## 📊 Performance Metrics

| Metric | Value | Details |
|--------|-------|---------|
| 🗣️ **Sign Vocabulary** | **2,000+ signs** | Full WLASL dataset vocabulary in memory |
| ⚡ **Translation Latency** | **< 500ms** | From speech end to video playback start |
| 📷 **Camera Tracking** | **30+ FPS** | MediaPipe Holistic in-browser processing |
| 💾 **Video Cache** | **50 slots (LRU)** | Pre-loaded sign videos for smooth playback |
| 🔗 **API Routes** | **5 route groups** | Courses, Lessons, Progress, Signs, Sentences |
| 🐳 **Environment Consistency** | **~95%** | Via Docker Compose containerization |
| 📦 **Zero Server AI** | **100% browser** | MediaPipe runs entirely client-side |

---

## 🤝 Contributing

We welcome contributions! Here's how to get started:

1. **Fork** the repository
2. **Clone** your fork: `git clone https://github.com/<your-username>/Indian-Sign-Language-Educational-Platform.git`
3. **Create** a feature branch: `git checkout -b feature/your-amazing-feature`
4. **Commit** your changes with a clear message: `git commit -m "feat: add amazing feature"`
5. **Push** to your branch: `git push origin feature/your-amazing-feature`
6. **Open** a Pull Request describing your changes

### Ideas for Contributions
- 🔊 Add text-to-speech for reverse translation (ISL → English)
- 📈 Improve the NLP gloss converter accuracy
- 🌐 Add support for more sign language datasets
- 📱 Build a React Native mobile version
- 🧪 Add unit and integration tests

---

## 📄 License

This project is built for educational and research purposes.  
The WLASL dataset is used under its respective **academic research license**.

---

<div align="center">

<br/>

**Built with ❤️ for an inclusive world**

*"Language is the road map of a culture. It tells you where its people come from and where they are going."*

<br/>

⭐ **If this project helped you or inspired you, please give it a star!** ⭐

<br/>

[![GitHub](https://img.shields.io/badge/GitHub-dreamybear66-181717?style=for-the-badge&logo=github)](https://github.com/dreamybear66)

</div>
