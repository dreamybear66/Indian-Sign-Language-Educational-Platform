<div align="center">

<img src="https://readme-typing-svg.demolab.com?font=Fira+Code&weight=700&size=34&pause=1000&color=4F8FFF&center=true&vCenter=true&width=700&lines=Indian+Sign+Language+Platform;Real-Time+Speech+%E2%86%92+ISL+Interpreter;AI-Powered+Accessibility+Tool" alt="Typing SVG" />

<br/>

[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![Fastify](https://img.shields.io/badge/Fastify-000000?style=for-the-badge&logo=fastify&logoColor=white)](https://www.fastify.io/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)](https://www.docker.com/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Prisma](https://img.shields.io/badge/Prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=white)](https://www.prisma.io/)

<br/>

> 🤟 **An AI-powered, full-stack platform converting live English speech into Indian Sign Language (ISL) — making classrooms inclusive, one gesture at a time.**

<br/>

</div>

---

## 📖 Overview

The **Indian Sign Language Educational Platform** bridges the communication gap for the Deaf and Hard-of-Hearing community by translating spoken English directly into ISL video sequences in real time.

It is built as a **monorepo** with two integrated modules:

| Module | Folder | Description |
|--------|--------|-------------|
| 🖥️ **Web Platform** | `web platform/` | Full-featured ISL learning web application with real-time interpreter |
| 🎙️ **Real-Time Interpreter** | `Real time interpreter/` | Standalone, high-performance interpreter module with Fastify backend |

---

## ✨ Key Features

- 🎙️ **Live Speech → ISL Translation** — Tap to speak, and watch your words transform into native sign language video sequences with sub-second latency
- 👁️ **Browser-Based Computer Vision** — Google MediaPipe runs directly in the browser for real-time camera and motion tracking at **30+ FPS**
- 📚 **2,000+ WLASL Sign Vocabulary** — Powered by the Word-Level ASL (WLASL) dataset with an in-memory vocabulary of over **1,500+ native signs**
- ⚡ **High-Performance Backend** — Built on Fastify for ultra-fast API response times, dramatically reducing payload overhead
- 🐳 **Containerized Database** — One-command PostgreSQL setup via Docker Compose for instant local development
- 📱 **Fully Responsive UI** — Mobile-first design powered by TailwindCSS v4

---

## 🏗️ Architecture

```
📦 Indian-Sign-Language-Educational-Platform
│
├── 🖥️ web platform/                    # Indian-SIgn-Language
│   ├── frontend/                        # React + TypeScript + TailwindCSS v3
│   │   └── src/
│   │       ├── app/                    # App router & layout
│   │       ├── modules/                # Feature modules (realtime, learning)
│   │       ├── ui/                     # Shared UI components (Sidebar, BottomNav)
│   │       └── shared/                 # Speech hooks, text-to-gloss utils
│   └── backend/                        # Fastify API + Prisma ORM
│       └── src/
│           ├── app.ts                  # Entry point
│           └── videoMapping.ts         # WLASL sign → video URL map
│
└── 🎙️ Real time interpreter/           # isl module 1
    ├── frontend/                        # React + TypeScript + TailwindCSS v4
    │   └── src/
    │       ├── modules/                # Interpreter video module
    │       │   └── interpreter-video/  # SentenceMatcher, SpeechInput, VideoSequence
    │       └── shared/                 # textToGloss, speech recognition hooks
    └── backend/
        ├── src/server.ts               # Fastify server (video streaming)
        └── prisma/                     # DB schema migrations
```

---

## 🔄 How It Works

```mermaid
sequenceDiagram
    participant User
    participant Browser
    participant MediaPipe
    participant SpeechAPI
    participant Backend
    participant DB

    User->>Browser: Tap Mic & Speak
    Browser->>SpeechAPI: Stream audio
    SpeechAPI-->>Browser: Transcript text
    Browser->>Browser: Convert to ISL Gloss (textToGloss)
    Browser->>Browser: Match Gloss → WLASL vocabulary (SentenceMatcher)
    Browser->>Backend: Request video for each sign word
    Backend->>DB: Lookup video metadata
    DB-->>Backend: Video paths
    Backend-->>Browser: Serve sign videos
    Browser->>User: ▶️ Play ISL video sequence
    Browser->>MediaPipe: Continuous camera feed
    MediaPipe-->>Browser: 30+ FPS hand/body tracking
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** `>=18`
- **Docker Desktop** (for PostgreSQL)
- **Git**

---

### 🖥️ Web Platform Setup

```bash
# 1. Navigate to the web platform
cd "web platform"

# 2. Install dependencies
npm install

# 3. Start the backend
cd backend && npm run dev

# 4. In a new terminal, start the frontend
cd frontend && npm run dev
```

---

### 🎙️ Real-Time Interpreter Setup

```bash
# 1. Navigate to the module
cd "Real time interpreter"

# 2. Start the PostgreSQL database
docker-compose up -d

# 3. Install dependencies
npm install

# 4. Run Prisma migrations
npx prisma migrate dev

# 5. Start the backend server
npm run dev

# 6. In a new terminal, start the frontend
cd frontend && npm run dev
```

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| **Frontend Framework** | React 18/19, TypeScript, Vite |
| **Styling** | TailwindCSS v3 & v4, PostCSS |
| **State Management** | Zustand |
| **Routing** | React Router DOM v6/v7 |
| **Computer Vision (CV)** | Google MediaPipe (Holistic, Camera Utils, Drawing Utils) |
| **Speech Recognition** | Native Web Speech API |
| **Backend Framework** | Fastify (Node.js) |
| **ORM** | Prisma |
| **Database** | PostgreSQL 15 |
| **Containerization** | Docker Compose |
| **Language** | TypeScript (Full-Stack) |

---

## 📊 Dataset

This project is powered by the **[WLASL (Word-Level American Sign Language) Dataset](https://github.com/dxli94/WLASL)**, one of the largest publicly available video-based sign language datasets:

- 📹 **2,000+ sign glosses** with corresponding video clips
- 🧠 In-memory vocabulary lookup for ultra-fast sign matching
- 🔍 Exact gloss matching with ISL Gloss normalization pipeline

---

## 📂 Project Highlights

| Metric | Value |
|--------|-------|
| Sign Vocabulary | **2,000+ WLASL signs** |
| Camera Tracking | **30+ FPS** via MediaPipe |
| API Latency | **Sub-second** rendering |
| Deployment | Docker Compose containerized |
| Environment Consistency | **95%+** across setups |

---

## 🤝 Contributing

Contributions are welcome! If you'd like to improve the platform:

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

---

## 📄 License

This project is for educational purposes. The WLASL dataset is used under its respective academic license.

---

<div align="center">

Made with 🤟 for inclusive education — *because everyone deserves to be heard and understood.*

⭐ **Star this repo if you found it helpful!**

</div>
