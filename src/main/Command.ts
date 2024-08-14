import { ResponeInterface, ResponseStatus } from './interfaces'

const { spawn } = require('child_process')
const RADI_IMAGE = 'jderobot/robotics-academy'
const CONTAINER_NAME = 'robotics-academy'

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
        msg: ['Something went wrong!', `Failed to start process: ${err.message}`]
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
      console.log(typeof output)
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
          msg: ['Something Went wrong!', `RADI is not founded: ${errorOutput}`]
        })
      }
    })

    docker.on('error', (err) => {
      reject({
        status: ResponseStatus.ERROR,
        msg: ['Something Went wrong!', `Failed to start process: ${err.message}`]
      })
    })
  })
}

export const startDockerRADIContainer = async (): Promise<ResponeInterface> => {
  return new Promise((resolve, reject) => {
    const docker = spawn('docker', [
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
    ])

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
      reject({
        status: ResponseStatus.ERROR,
        msg: ['Something Went wrong!', `Failed to start process: ${err.message}`]
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
          msg: ['Something Went wrong!', `Error occurred: ${errorOutput}`]
        })
      }
    })

    docker.on('error', (err) => {
      reject({
        status: ResponseStatus.ERROR,
        msg: ['Something Went wrong!', `Failed to start process: ${err.message}`]
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
          msg: ['Something Went wrong!', `Error occurred: ${errorOutput}`]
        })
      }
    })

    docker.on('error', (err) => {
      reject({
        status: ResponseStatus.ERROR,
        msg: ['Something Went wrong!', `Failed to start process: ${err.message}`]
      })
    })
  })
}
