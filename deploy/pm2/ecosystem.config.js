module.exports = {
  apps: [
    {
      name: 'phezulu-api',
      script: 'index.js',
      cwd: '/var/www/phezulu/server',
      instances: 1,
      exec_mode: 'fork',
      env: {
        NODE_ENV: 'production',
        PORT: 5000
      }
    }
  ]
};
