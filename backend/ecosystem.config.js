module.exports = {
  apps: [
    {
      name: "blog",
      script: "./.venv/bin/python",
      args: "-m gunicorn -w 4 -b 127.0.0.1:5000 wsgi:app",
      interpreter: "none",
      cwd: "/var/www/blog/backend"
    }
  ]
};
