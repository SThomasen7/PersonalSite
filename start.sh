#!/bin/bash

# Activate the virtual environment
source /var/www/PersonalSite/venv/bin/activate

cd /var/www/PersonalSite

exec gunicorn \
  -k uvicorn.workers.UvicornWorker \
  main:app \
  --chdir app \
  --bind unix:/tmp/uvicorn.sock \
  -w 1 \
  --timeout 30 \
  --graceful-timeout 20
  --access-logfile /var/log/personal-site/access.log \
  --error-logfile /var/log/personal-site/error.log
