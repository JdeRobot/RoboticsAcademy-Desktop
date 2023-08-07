# RoboticsAcademy-Desktop

# Project Template Name

It Runs the Image of the robotics-academy within electron

## Table of Contents

- [About](#about)
- [Getting Started](#getting-started)
- [Usage](#usage)

## About

It uses the docker image to create the Electron desktop app

## Getting Started

Pull the docker image of jderobot/robotics-academy using

```bash
docker pull jderobot/robotics-academy:latest
```

Run the docker container

```bash
docker run --rm -it -p 8000:8000 -p 2303:2303 -p 1905:1905 -p 8765:8765 -p 6080:6080 -p 1108:1108 -p 7163:7163 jderobot/robotics-academy
```

Setup electron

```bash
npm install
```

## Usage

Run Electron

```bash
npm run start
```

Pack Electron App

```bash
npm run make
```
