#!/bin/bash

echo "program start"

# Get the script's directory, regardless of where the script is executed from
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

# Change the current working directory to the script's directory
cd "$SCRIPT_DIR"

# app folder
cd ..

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
