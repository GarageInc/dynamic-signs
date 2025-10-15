#!/bin/bash

echo "🚀 Web3 Message Signer & Verifier - Setup Script"
echo "=================================================="
echo ""

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    echo "❌ Docker is not installed. Please install Docker first."
    exit 1
fi

# Check if Docker Compose is installed
if ! command -v docker-compose &> /dev/null; then
    echo "❌ Docker Compose is not installed. Please install Docker Compose first."
    exit 1
fi

echo "✅ Docker and Docker Compose are installed"
echo ""

# Check if .env file exists
if [ ! -f .env ]; then
    echo "📝 Creating .env file from .env.example..."
    cp .env.example .env
    echo "⚠️  Please edit .env and add your VITE_DYNAMIC_ENVIRONMENT_ID"
    echo ""
    read -p "Press Enter to continue after updating .env file..."
fi

echo "🔨 Building Docker containers..."
docker-compose build

echo ""
echo "✅ Setup complete!"
echo ""
echo "📋 Available commands:"
echo "  • Start application:     docker-compose up"
echo "  • Start in background:   docker-compose up -d"
echo "  • Run tests:             docker-compose -f docker-compose.test.yml up"
echo "  • Stop containers:       docker-compose down"
echo "  • View logs:             docker-compose logs -f"
echo ""
echo "🌐 Application URLs:"
echo "  • Frontend: http://localhost:5173"
echo "  • Backend:  http://localhost:3001"
echo "  • Health:   http://localhost:3001/health"
echo ""

