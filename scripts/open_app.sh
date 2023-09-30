#!/bin/bash

echo "program start"

# app folder
cd ~/lab-schedule

# check_wifi_connection() {
#   # Use 'nmcli' to check if there's an active Wi-Fi connection
#   if nmcli -t -f GENERAL.STATE connection show --active | grep -q ":GENERAL.STATE:100"; then
#     return 0
#   else
#     return 1
#   fi
# }

# # Check Wi-Fi connection
# if check_wifi_connection; then
#   echo "connected to Wi-Fi"
#   git pull
# else
#   echo "not connected to Wi-Fi"
# fi

echo "starting node app"
nohup node app.js > /dev/null 2>&1 &

echo "about to open firefox"
firefox --kiosk http://localhost:8000/

echo "program fin"
