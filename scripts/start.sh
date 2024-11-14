if nmap -P 8888 localhost
then
    echo "The server is running..."
else 
    echo "The server is currently unreachable"
    node ../server/app.js
fi

curl http://localhost:8888/refresh_token
curl http://localhost:8888/control/play