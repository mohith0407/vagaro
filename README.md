# Vagaro -- Full Stack Betting Platform

Vagaro is a modern, high-performance betting platform built using a
**Turborepo monorepo** with **Next.js 14**, reusable UI packages, and
secure authentication powered by **AWS Cognito + NextAuth**.\
It features a **dual-wallet system**, **live odds integration**, and a
scalable modular architecture designed for production.

---

## Tech Stack

| Layer | Technology |
|------|------------|
| Monorepo | Turborepo |
| Frontend | Next.js 14 (App Router) |
| Styling | Tailwind CSS |
| Database | PostgreSQL + Prisma ORM + Redis |
| Authentication | AWS Cognito + NextAuth.js |
| Live Data | The Odds API |
| Package Manager | npm |

---

## Monorepo Architecture

    |
    ├── apps/
    │   └── web/               → Main Next.js application (Frontend + API Routes)
    │
    ├── packages/
    │   ├── db/                → Prisma schema, client, migrations
    │   ├── ui/                → Reusable UI components (design system)
    │   ├── auth/              → AWS Cognito + NextAuth config
    │   └── tailwind-config/   → Shared Tailwind configuration + theme
    │
    └── turbo.json             → Turborepo config

---
## Getting Started

### 1. Prerequisites

-   Node.js v18+
-   PostgreSQL (Local or Cloud (I used aiven cloud))
-   AWS Cognito User Pool + App Client
-   API Key from The Odds API

## 2. Environment Setup

### apps/web/.env

    DATABASE_URL="postgres://user:password@host:port/dbname?sslmode=require"
    NEXTAUTH_SECRET="your_random_secret_string"
    NEXTAUTH_URL="http://localhost:3000"
    AWS_ACCESS_KEY_ID="AKIA..."
    AWS_SECRET_ACCESS_KEY="..."
    AWS_COGNITO_REGION="us-east-1"
    AWS_COGNITO_USER_POOL_ID="us-east-1_xxxxxxxx"
    AWS_COGNITO_CLIENT_ID="5aaaaaaaaaaaaaaaaaaaa"
    THE_ODDS_API_KEY="your_odds_api_key"
    RAZORPAY_KEY_ID="rzp_test_..."
    RAZORPAY_KEY_SECRET="..."

### packages/db/.env

    DATABASE_URL="postgres://user:password@host:port/dbname?sslmode=require"

## 3. Installation & Database Sync

    npm install
    npm run db:generate --workspace=@repo/db
    npm run db:push --workspace=@repo/db

## 4. Run the App

    npm run dev
---

## 🎲 Features

### 🔐 Authentication

-   AWS Cognito Signup
-   NextAuth.js Sessions
-   Auto User Sync to Postgres

### 💰 Dual-Wallet System

-   Paper Money (₹1000 default)
-   Real Money Wallet
-   Safe transactional balance updates

### 🏆 Betting Engine

-   Live odds data
-   Bet on Team A, B, or Draw
-   Admin settlement system

---

### 🐳 Docker Support

    docker-compose up --build
---

## 📜 Scripts

| Command               | Description                  |
| --------------------- | ---------------------------- |
| `npm run dev`         | Start all apps in watch mode |
| `npm run build`       | Build all apps and packages  |
| `npm run db:generate` | Generate Prisma client       |
| `npm run db:push`     | Sync DB schema               |
| `npm run db:studio`   | Launch Prisma Studio         |

---

## 🤝 Contributing

    git checkout -b feature/amazing-feature
    git commit -m "Add feature"
    git push origin feature/amazing-feature
---
## ⭐ Support

Star the repo if you like it!

