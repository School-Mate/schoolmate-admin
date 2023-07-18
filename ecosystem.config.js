module.exports = {
  apps: [
    {
      name: 'admin-schoolmate',
      script: 'node_modules/next/dist/bin/next',
      args: 'start --port 8000',
      instances: 1,
      autorestart: true
    }
  ]
};
