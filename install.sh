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

# Set execute permission for the scripts
chmod +x clean.sh install.sh run.sh > /dev/null 2>&1 || handle_error "Failed to set execute permission"

# Execute the clean script
./clean.sh > /dev/null 2>&1 || handle_error "Failed to clean the project"

# Install Node.js
if ! command -v node > /dev/null; then
	handle_error "Install Node.js from https://nodejs.org/en/download/"
fi

# Install npm
if ! command -v npm > /dev/null; then
	handle_error "Update Node.js to get npm"
fi

# Install node_modules for backend
(cd backend && npm ci) > /dev/null 2>&1 || handle_error "backend/node_modules"

# Install node_modules for frontend
(cd frontend && npm ci) > /dev/null 2>&1 || handle_error "frontend/node_modules"

# Build the frontend
(cd frontend && npm run build) > /dev/null 2>&1 || handle_error "frontend/build"

# Compile AppleScript into Links.app
osacompile -o "Links.app" <<EOF > /dev/null 2>&1 || handle_error "Failed to compile AppleScript"
on run
	-- Execute the run script
    do shell script "export PATH=$PATH && cd $SCRIPT_DIR && ./run.sh"

	-- If successful, open Links in the default browser
    if the result = "Links is running successfully!" then        
        open location "file://$SCRIPT_DIR/frontend/build/index.html"
    else
        display dialog "Links failed to open:" & return & return & the result buttons {"OK"} default button "OK"
    end if
end run
EOF

# Log success
echo "Links.app created successfully!"
