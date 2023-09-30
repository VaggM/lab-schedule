#!/bin/bash

echo "program start"

# app folder
cd ~/lab-schedule

check_wifi_connection() {
  #!/bin/bash

    echo -e "GET http://google.com HTTP/1.0\n\n" | nc google.com 80 > /dev/null 2>&1

    if [ $? -eq 0 ]; then
        return 0
    else
        return 1
    fi

}

# Check Wi-Fi connection
if check_wifi_connection; then
  echo "connected to Wi-Fi"
  git pull
else
  echo "not connected to Wi-Fi"
fi

echo "starting node app"
nohup node app.js > /dev/null 2>&1 &

# Wait 5 seconds to start the app
sleep 5

echo "about to open firefox"
firefox --kiosk http://localhost:8000/

echo "program fin"
