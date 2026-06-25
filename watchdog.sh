#!/bin/bash
# Persistent watchdog daemon: restarts the dev server if it dies.
# Double-forked to reparent to init (PID 1) for maximum survival.
cd /home/z/my-project

while true; do
  if ! pgrep -f "next-server" > /dev/null 2>&1; then
    echo "[$(date)] Restarting dev server..." >> /home/z/my-project/watchdog.log
    ( exec node node_modules/next/dist/bin/next dev -p 3000 -H 0.0.0.0 >>/home/z/my-project/dev.log 2>&1 ) &
    sleep 8
  else
    sleep 10
  fi
done
