# Sports Articles · Fullstack Test Assignment

Sports Articles is a full‑stack reference implementation for managing editorial content. The solution combines **Next.js**, **Apollo Client**, and **Tailwind CSS** on the frontend with an **Apollo Server v4**, **Prisma**, and **PostgreSQL** backend. The codebase is organized as a **pnpm workspace** with isolated apps for the server and client.

---

## Table of Contents
1. [Tech Stack](#tech-stack)
2. [Monorepo Layout](#monorepo-layout)
3. [Requirements](#requirements)
4. [Getting Started](#getting-started)
5. [Features](#features)
6. [GraphQL Operations](#graphql-operations)
7. [Scripts](#scripts)
8. [Implementation Notes](#implementation-notes)
9. [Evaluation Checklist](#evaluation-checklist)
10. [Author](#author)

---

## Tech Stack
### Backend
- Node.js · TypeScript
- Apollo Server v4 · GraphQL
- Prisma ORM · PostgreSQL

### Frontend
- Next.js (Pages Router) · TypeScript
- Apollo Client with SSR (getServerSideProps)
- Tailwind CSS

### Tooling
- pnpm Workspaces
- ESLint · Prettier
- Docker (PostgreSQL)

---

## Monorepo Layout
```
sports-articles/
├── apps/
│   ├── backend/
│   └── frontend/
├── package.json
├── pnpm-lock.yaml
├── pnpm-workspace.yaml
└── README.md
```

---

## Requirements
- Node.js **18+**
- pnpm **8+**
- Docker (local PostgreSQL instance)

---

## Getting Started

### 1. Install dependencies
```bash
pnpm install
```

### 2. Configure environment variables
This project does not require any environment variables to run.

### 3. Start PostgreSQL
```bash
cd apps/backend
docker compose up -d
```
The database will be available at `localhost:5433`.

### 4. Apply Prisma schema and seed data
```bash
pnpm prisma migrate dev
pnpm prisma db seed
```
This creates the schema and preloads sample articles.

### 5. Run the backend
```bash
pnpm --filter backend dev
```
GraphQL Playground: <http://localhost:4000/graphql>

### 6. Run the frontend
```bash
pnpm --filter frontend dev
```
Frontend: <http://localhost:3000> (SSR immediately renders seeded articles).

---

## Features
### Backend
- Typed GraphQL schema with CRUD resolvers
- Cursor-based pagination for article feeds
- Structured error handling with Apollo Server
- Prisma ORM integration with PostgreSQL

### Frontend
- Server-rendered landing and detail pages
- Infinite scroll powered by Apollo cache policies
- Create / edit / delete flows with optimistic UX
- Client-side validation and user-friendly error states
- Responsive UI composed with Tailwind CSS

---

## GraphQL Operations
### Queries
- `articles(limit, cursor)`
- `article(id)`

### Mutations
- `createArticle(input)`
- `updateArticle(id, input)`
- `deleteArticle(id)`

---

## Scripts
### Backend
```bash
pnpm --filter backend dev
pnpm --filter backend prisma migrate dev
pnpm --filter backend prisma db seed
```

### Frontend
```bash
pnpm --filter frontend dev
```

---

## Implementation Notes
- Pagination relies on cursor-based fetching plus custom Apollo cache merge policies.
- SSR is achieved via `getServerSideProps`; hydrated Apollo state is passed through `_app.tsx`.
- The architecture favors clear separation of concerns between UI, data hooks, and schema logic.

---

## Evaluation Checklist
- [x] pnpm workspace monorepo
- [x] Typed GraphQL schema & resolvers
- [x] SSR for listing and detail views
- [x] Infinite pagination
- [x] Full CRUD coverage
- [x] Clean, maintainable codebase
- [x] Turnkey local setup

---

## Author
Test assignment implementation by **Demion-L**.