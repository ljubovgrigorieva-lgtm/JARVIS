#!/usr/bin/env bash
set -e

echo "→ Building frontend..."
cd frontend && npm run build && cd ..

echo "→ Building backend..."
cd backend && npm run build && cd ..

echo "→ Uploading to VPS..."
rsync -avz --exclude='node_modules' --exclude='data' --exclude='.git' . root@217.26.30.176:/home/agent/projects/beauty-app/

echo "→ Installing deps on VPS..."
ssh root@217.26.30.176 "cd /home/agent/projects/beauty-app/backend && npm install --omit=dev"

echo "→ Running seed (first deploy only)..."
ssh root@217.26.30.176 "cd /home/agent/projects/beauty-app/backend && node dist/db/seed.js 2>/dev/null || true"

echo "→ Restarting PM2..."
ssh root@217.26.30.176 "pm2 restart beauty-app 2>/dev/null || pm2 start /home/agent/projects/beauty-app/backend/ecosystem.config.js"
ssh root@217.26.30.176 "pm2 save"

echo "✅ Deployed!"
