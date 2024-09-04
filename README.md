<a href="https://jderobot.github.io/"><img src="./resources/logo.gif" width="150" align="right" /></a>

# RoboticsAcademy Desktop: Learn Robotics, Artificial Intelligence and Computer Vision

### Table of Contents

- [About](#about)
- [Installation](#installation)
- [Development](#development)
- [Build](#build)
- [Contributing](#build)

## About

The Robotics-Academy Desktop Application is an application used for accessing the Robotics-Academy exercises on any platform, This has been built using Electron.js.
JdeRobot Academy is an open source platform that provides a collection of exercises for learning robotics in a practical way. RoboticsAcademy is completely ROS-based, and includes robotics standard tools like Gazebo and Rviz.

## Installation

### Prerequisites

- [Node.js](https://nodejs.org/en)
- [npm](https://www.npmjs.com/)

### Steps

1. Clone the repository:

```
git clone https://github.com/JdeRobot/RoboticsAcademy-Desktop.git
cd RoboticsAcademy-Desktop
```

2. Install dependencies

```
npm install
```

3. Run the application

```
npm run start
```

### Development

#### Getting Started

To start developing, follow the installation steps above, and then run the app in development mode:

1. Start the app in development mode:

```
npm run dev
```

### Build

- Linux (Ubuntu):
  After successfully installing the dependencies. Run the

  ```
  npm run build:linux
  ```

#### Build Package:

:round_pushpin: After successfully executing the build command, the target build package will be found in the :file_folder: **dist** folder.

:warning: You may need to install build dependencies for target package. [Learn more](https://www.electronjs.org/docs/latest/development/build-instructions-linux)

:black_nib: You can configure builder as your need. See [electron-builder.yml](./electron-builder.yml) file.

### Contributing

Take a look at the [contributing](./CONTRIBUTING.md) guide lines.
