#!/bin/bash
# Watchdog: keeps the Next.js dev server alive.
cd /home/z/my-project
while true; do
  if ! pgrep -f "next-server" > /dev/null 2>&1; then
    echo "[$(date)] Starting dev server..." >> /home/z/my-project/watchdog.log
    nohup node node_modules/next/dist/bin/next dev -p 3000 </dev/null >>/home/z/my-project/dev.log 2>&1 &
    disown
    sleep 5
  else
    sleep 3
  fi
done
