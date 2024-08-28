import { AllCommandConfigureInterface, ResponeInterface, ResponseStatus } from './interfaces'

const { spawn } = require('child_process')
const RADI_IMAGE = 'jderobot/robotics-academy'
const CONTAINER_NAME = 'xrobotics-academy'

export const checkDockerAvailability = async (): Promise<ResponeInterface> => {
  return new Promise((resolve, reject) => {
    const docker = spawn('docker', ['--version'])

    let output = ''
    let errorOutput = ''

    docker.stdout.on('data', (data) => {
      output += data.toString()
    })

    docker.stderr.on('data', (data) => {
      errorOutput += data.toString()
    })

    docker.on('close', (code) => {
      if (code === 0 && output.length > 0) {
        resolve({ status: ResponseStatus.SUCCESS, msg: [`Docker is installed: ${output}`] })
      } else {
        resolve({
          status: ResponseStatus.ERROR,
          msg: ['Docker is not installed', `${errorOutput}`]
        })
      }
    })

    docker.on('error', (err) => {
      reject({
        status: ResponseStatus.ERROR,
        msg: [`Failed to start process: ${err.message}`]
      })
    })
  })
}

export const checkDockerRADIAvailability = async (): Promise<ResponeInterface> => {
  return new Promise((resolve, reject) => {
    const docker = spawn('docker', ['images', '-q', `${RADI_IMAGE}`])

    let output = ''
    let errorOutput = ''

    docker.stdout.on('data', (data) => {
      output += data.toString()
    })

    docker.stderr.on('data', (data) => {
      errorOutput += data.toString()
    })

    docker.on('close', (code) => {
      if (code === 0 && output.length > 0) {
        resolve({ status: ResponseStatus.SUCCESS, msg: [`RADI founded: ${output}`] })
      } else if (code === 0 && output.length === 0) {
        resolve({
          status: ResponseStatus.ERROR,
          msg: [
            'RADI is not installed!',
            `Robotics Academy Docker Image (RADI) is not found on your system`
          ]
        })
      } else {
        resolve({
          status: ResponseStatus.ERROR,
          msg: [`RADI is not founded: ${errorOutput}`]
        })
      }
    })

    docker.on('error', (err) => {
      reject({
        status: ResponseStatus.ERROR,
        msg: [`Failed to start process: ${err.message}`]
      })
    })
  })
}

export const startDockerRADIContainer = async (
  commandConfigure: AllCommandConfigureInterface | null,
  dockerImage: string | null
): Promise<ResponeInterface> => {
  if (commandConfigure === null || dockerImage === null) {
    return {
      status: ResponseStatus.ERROR,
      msg: [`Failed to start process: command not found!`]
    }
  }

  const { django, gazebo, consoles, other } = commandConfigure

  let commands: string[] = commandConfigure.command
  commands.shift()

  // detach mode
  commands.push(...[`-d`, '--name', `${CONTAINER_NAME}`])
  // django
  commands.push(...['-p', `${django.ports[0]}:${django.ports[1]}`])
  // gazebo
  commands.push(...['-p', `${gazebo.ports[0]}:${gazebo.ports[1]}`])
  // console
  commands.push(...['-p', `${consoles.ports[0]}:${consoles.ports[1]}`])
  // other
  commands.push(...['-p', `${other.ports[0]}:${other.ports[1]}`])
  // docker image
  commands.push(dockerImage)
  //

  console.log('====================================')
  console.log('commands ', commands)
  console.log('====================================')

  const hardCommands = [
    'run',
    '--rm',
    '-d',
    '--name',
    `${CONTAINER_NAME}`,
    '-it',
    '-p',
    '7164:7164',
    '-p',
    '6080:6080',
    '-p',
    '1108:1108',
    '-p',
    '7163:7163',
    `${RADI_IMAGE}`
  ]
  return new Promise((resolve, reject) => {
    const docker = spawn('docker', commands)

    let output = ''
    let errorOutput = ''

    docker.stdout.on('data', (data) => {
      output += data.toString()
    })

    docker.stderr.on('data', (data) => {
      errorOutput += data.toString()
    })

    docker.on('close', (code) => {
      console.log(output)
      if (code === 0) {
        resolve({ status: ResponseStatus.SUCCESS, msg: [`RADI Start Successfully.`] })
      } else {
        resolve({
          status: ResponseStatus.ERROR,
          msg: [
            'RADI is not running!',
            `Robotics Academy Docker Image (RADI) is not running`,
            'Docker Code 125',
            'Maybe Insufficient Permissions',
            'Maybe Port Conflicts',
            'Maybe File System Errors'
          ]
        })
      }
    })

    docker.on('error', (err) => {
      console.error(err)

      reject({
        status: ResponseStatus.ERROR,
        msg: [`Failed to start process: ${err.message}`]
      })
    })
  })
}

export const checkRADIContainerRunning = async (): Promise<ResponeInterface> => {
  return new Promise((resolve, reject) => {
    const docker = spawn('docker', ['inspect', '--format={{.State.Running}}', `${CONTAINER_NAME}`])

    let output = ''
    let errorOutput = ''

    docker.stdout.on('data', (data) => {
      output += data.toString().trim()
    })

    docker.stderr.on('data', (data) => {
      errorOutput += data.toString()
    })

    docker.on('close', (code) => {
      if (code === 0) {
        resolve({
          status: ResponseStatus.SUCCESS,
          msg: output === 'true' ? ['Container is running'] : ['Container is not running']
        })
      } else {
        reject({
          status: ResponseStatus.ERROR,
          msg: [`Error occurred: ${errorOutput}`]
        })
      }
    })

    docker.on('error', (err) => {
      reject({
        status: ResponseStatus.ERROR,
        msg: [`Failed to start process: ${err.message}`]
      })
    })
  })
}

export const stopDockerRADIContainer = async (): Promise<ResponeInterface> => {
  return new Promise((resolve, reject) => {
    const docker = spawn('docker', ['stop', `${CONTAINER_NAME}`])

    let output = ''
    let errorOutput = ''

    docker.stdout.on('data', (data) => {
      output += data.toString().trim()
    })

    docker.stderr.on('data', (data) => {
      errorOutput += data.toString()
    })

    docker.on('close', (code) => {
      if (code === 0) {
        resolve({
          status: ResponseStatus.SUCCESS,
          msg: output === 'true' ? ['Container is running'] : ['Container is not running']
        })
      } else {
        reject({
          status: ResponseStatus.ERROR,
          msg: [`Error occurred: ${errorOutput}`]
        })
      }
    })

    docker.on('error', (err) => {
      reject({
        status: ResponseStatus.ERROR,
        msg: [`Failed to start process: ${err.message}`]
      })
    })
  })
}
