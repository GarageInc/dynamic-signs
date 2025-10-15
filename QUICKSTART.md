# Quick Start Guide

## Prerequisites
- Docker
- Docker Compose

## Setup & Run

1. **Clone and setup**:
   ```bash
   chmod +x setup.sh
   ./setup.sh
   ```

2. **Edit `.env` file** and add your Dynamic.xyz Environment ID:
   ```env
   VITE_DYNAMIC_ENVIRONMENT_ID=your_dynamic_environment_id_here
   ```

3. **Start the application**:
   ```bash
   docker-compose up
   ```

4. **Access the application**:
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:3001

## Run Tests

**Recommended - Run locally:**
```bash
cd backend && bun run test
cd frontend && bun run test
```

## Stop Application

```bash
docker-compose down
```

## Without Docker

### Backend
```bash
cd backend
bun install
cp .env.example .env
bun run dev
```

### Frontend
```bash
cd frontend
bun install
cp .env.example .env
bun run dev
```

