.PHONY: setup build up down restart logs test clean help

help:
	@echo "Web3 Message Signer & Verifier - Docker Commands"
	@echo "=================================================="
	@echo ""
	@echo "Available commands:"
	@echo "  make setup     - Initial setup (create .env, build containers)"
	@echo "  make build     - Build Docker containers"
	@echo "  make up        - Start application"
	@echo "  make down      - Stop application"
	@echo "  make restart   - Restart application"
	@echo "  make logs      - View logs"
	@echo "  make test      - Run all tests"
	@echo "  make clean     - Remove containers and volumes"
	@echo ""

setup:
	@echo "🔧 Setting up project..."
	@if [ ! -f .env ]; then \
		cp .env.example .env; \
		echo "✅ Created .env file"; \
		echo "⚠️  Please edit .env and add your VITE_DYNAMIC_ENVIRONMENT_ID"; \
	else \
		echo "✅ .env file already exists"; \
	fi
	@echo "🔨 Building containers..."
	@docker-compose build
	@echo "✅ Setup complete!"

build:
	@echo "🔨 Building containers..."
	@docker-compose build

up:
	@echo "🚀 Starting application..."
	@docker-compose up

up-d:
	@echo "🚀 Starting application in background..."
	@docker-compose up -d
	@echo "✅ Application started!"
	@echo "🌐 Frontend: http://localhost:5173"
	@echo "🌐 Backend:  http://localhost:3001"

down:
	@echo "🛑 Stopping application..."
	@docker-compose down

restart:
	@echo "🔄 Restarting application..."
	@docker-compose restart

logs:
	@docker-compose logs -f

logs-backend:
	@docker-compose logs -f backend

logs-frontend:
	@docker-compose logs -f frontend

test:
	@echo "🧪 Running tests..."
	@docker-compose -f docker-compose.test.yml up --abort-on-container-exit

test-backend:
	@echo "🧪 Running backend tests..."
	@cd backend && bun test

test-frontend:
	@echo "🧪 Running frontend tests..."
	@cd frontend && bun test

clean:
	@echo "🧹 Cleaning up..."
	@docker-compose down -v
	@echo "✅ Cleanup complete!"

install-backend:
	@echo "📦 Installing backend dependencies..."
	@cd backend && bun install

install-frontend:
	@echo "📦 Installing frontend dependencies..."
	@cd frontend && bun install

dev-backend:
	@echo "🚀 Starting backend in dev mode..."
	@cd backend && bun run dev

dev-frontend:
	@echo "🚀 Starting frontend in dev mode..."
	@cd frontend && bun run dev

