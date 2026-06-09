module.exports = {
  apps: [{
    name: 'beauty-app',
    script: 'dist/server.js',
    cwd: '/home/agent/projects/beauty-app/backend',
    env: {
      NODE_ENV: 'production',
      PORT: 3001,
      DATABASE_PATH: '/home/agent/projects/beauty-app/data/beauty.db',
      FRONTEND_URL: 'https://your-domain.com'
    },
    restart_delay: 3000,
    max_restarts: 10
  }]
}
