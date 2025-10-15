# SynX Labs - Message Signer

Web3 message signing with Dynamic.xyz + React + Express.

## Quick Start

```bash
# 1. Get your Dynamic.xyz Environment ID from https://app.dynamic.xyz

# 2. Run setup
./setup.sh

# 3. Edit .env and add your DYNAMIC_ENVIRONMENT_ID

# 4. Start it
docker-compose up
```

**Done.** → http://localhost:5173

## Without Docker

```bash
# Backend
cd backend
bun install
bun run dev

# Frontend (new terminal)
cd frontend
bun install
bun run dev
```

## Tests

```bash
# Backend tests
cd backend && bun run test

# Frontend tests  
cd frontend && bun run test


## Stack

- Frontend: React 18 + Vite + Tailwind + Dynamic.xyz
- Backend: Express + TypeScript + ethers.js
- Runtime: Bun

## What It Does

1. Connect wallet (Dynamic.xyz headless)
2. Sign custom messages
3. Verify signatures (backend)
4. Store history (localStorage)

That's it.

