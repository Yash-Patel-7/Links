#!/bin/sh

# Function to handle errors
handle_error() {
    echo "Error: $1"
    exit 1
}

# Get the directory where the script is located
SCRIPT_DIR=$(dirname $(readlink -f "$0"))

# Change the current working directory to the script directory
cd "$SCRIPT_DIR" > /dev/null 2>&1 || handle_error "Failed to change directory"

# Remove the node_modules directory of the backend
rm -rf backend/node_modules > /dev/null 2>&1 || handle_error "backend/node_modules"

# Remove the node_modules directory of the frontend
rm -rf frontend/node_modules > /dev/null 2>&1 || handle_error "frontend/node_modules"

# Remove the build directory of the frontend
rm -rf frontend/build > /dev/null 2>&1 || handle_error "frontend/build"

# Remove the Links.app
rm -rf Links.app > /dev/null 2>&1 || handle_error "Links.app"

# Kill any processes listening on port 3000
PID_LIST=$(lsof -t -i:3000)
if [ -n "$PID_LIST" ]; then
    kill $PID_LIST > /dev/null 2>&1 || handle_error "Port 3000"
fi

# Kill any processes listening on port 5000
PID_LIST=$(lsof -t -i:5000)
if [ -n "$PID_LIST" ]; then
	kill $PID_LIST > /dev/null 2>&1 || handle_error "Port 5000"
fi

# Log success
echo "Cleaned up the project!"
