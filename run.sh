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

# Start the backend server
(cd backend && npm start) > /dev/null 2>&1 &

# Log success
echo "Links is running successfully!"

