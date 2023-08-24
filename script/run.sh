#!/bin/bash

# Specify the full path to the Docker image .tar.xz file
image_file_path="./robotics-academy/robotics-academy.tar.xz"

# Specify the Docker image name with the repository
image_name="jderobot/robotics-academy"

# Check if the Docker image exists locally
if docker image inspect "$image_name" &> /dev/null; then
    echo "Image $image_name exists locally."
    # Run the Docker container using the existing image in the background
    nohup docker run --rm --name my_container --device /dev/dri -p 8000:8000 -p 2303:2303 -p 1905:1905 -p 8765:8765 -p 6080:6080 -p 1108:1108 -p 7163:7163 "$image_name" > /dev/null 2>&1 &
else
    echo "Image $image_name does not exist locally."
    # Load the Docker image from the .tar.xz file
    if docker load -i "$image_file_path"; then
        echo "Image $image_name loaded successfully."
        # Run the Docker container using the loaded image in the background
        nohup docker run --rm --name my_container --device /dev/dri -p 8000:8000 -p 2303:2303 -p 1905:1905 -p 8765:8765 -p 6080:6080 -p 1108:1108 -p 7163:7163 "$image_name" > /dev/null 2>&1 &
    else
        echo "Failed to load image $image_name."
        exit 1
    fi
fi

# Wait for the Docker container to start
sleep 5

# Run the Electron file in the background
./electron & # Replace "electron.js" with your actual Electron entry file name

# Optionally, you can add a delay here to let the Electron process start
sleep 2

# You can continue with other commands or actions if needed
