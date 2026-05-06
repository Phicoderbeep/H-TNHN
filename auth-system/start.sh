#!/bin/bash

echo "=== Starting Auth System ==="

# Check if PostgreSQL is running
if ! pg_isready &>/dev/null; then
    echo "Warning: PostgreSQL may not be running"
fi

# Start backend
echo "Starting backend server..."
cd "$(dirname "$0")/backend"
if [ ! -f .env ]; then
    cp .env.example .env
    echo "Created .env from .env.example - please update DATABASE_URL and JWT secrets"
fi

npm install
npx prisma generate
npx prisma db push
npm run dev &
BACKEND_PID=$!

# Start frontend
echo "Starting frontend server..."
cd "$(dirname "$0")/frontend"
npm install
npm run dev &
FRONTEND_PID=$!

echo ""
echo "Backend running on http://localhost:4000"
echo "Frontend running on http://localhost:5173"
echo ""
echo "Press Ctrl+C to stop both servers"

# Handle cleanup
trap "kill $BACKEND_PID $FRONTEND_PID 2>/dev/null; exit" INT TERM
wait
