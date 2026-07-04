module.exports = {
  apps: [
    {
      name: "pragyaos-api",
      script: "dist/server.js",
      instances: "max",
      exec_mode: "cluster",
      env_production: {
        NODE_ENV: "production",
        PORT: 3001,
      },
      log_date_format: "YYYY-MM-DD HH:mm:ss Z",
      error_file: "logs/err.log",
      out_file: "logs/out.log",
      merge_logs: true,
      max_restarts: 10,
      restart_delay: 2000,
    },
  ],
};
