#!/bin/bash
# Daemon launcher: double-forks to fully detach from the controlling session.
# The exec replaces the intermediate shell with node, making node the session leader.
cd /home/z/my-project

# Kill any existing server
pkill -9 -f "next-server" 2>/dev/null
pkill -9 -f "next dev" 2>/dev/null
sleep 1

# Double-fork: parent exits, child becomes orphan reparented to init
( exec node node_modules/next/dist/bin/next dev -p 3000 -H 0.0.0.0 >>/home/z/my-project/dev.log 2>&1 ) &

echo "Server launched, PID $!"
# Give it time to start
sleep 8
# Verify
if curl -s -o /dev/null --max-time 5 http://127.0.0.1:3000/; then
  echo "SERVER_OK"
else
  echo "SERVER_FAILED"
fi
