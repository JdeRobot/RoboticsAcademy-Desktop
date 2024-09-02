import { spawn } from 'child_process'
import { db } from './index'
import { getActiveDockerImage, getAllCommandConfig, getCommandConfigId } from './db'
import {
  AllCommandConfigureInterface,
  DatabaseFetching,
  ResponeInterface,
  ResponseStatus
} from './interfaces'

export const AllDockersImages = {
  noDockerImage: 'Run Without Docker Image',
  jderobotRoboticsAcademy: 'jderobot/robotics-academy',
  jderobotRoboticsBackend: 'jderobot/robotics-backend'
}

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
        msg: [`Failed to start process: ${err.message}`]
      })
    })
  })
}

export const checkDockerRADIAvailability = async (): Promise<ResponeInterface> => {
  try {
    const activeDockerImageRes: DatabaseFetching<ResponseStatus, string | null, string[]> =
      await getActiveDockerImage(db)

    if (
      activeDockerImageRes.status != ResponseStatus.SUCCESS ||
      activeDockerImageRes.data === null
    ) {
      return {
        status: ResponseStatus.ERROR,
        msg: [`Failed to start process: ${activeDockerImageRes.msg[0]}`]
      }
    }
    return new Promise((resolve, reject) => {
      const docker = spawn('docker', [
        'images',
        '-q',
        `${AllDockersImages[activeDockerImageRes.data ?? `jderobotRoboticsAcademy`]}`
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
  } catch (error) {
    return {
      status: ResponseStatus.ERROR,
      msg: [`Failed to start process: ${String(error)}`]
    }
  }
}

export const startDockerRADIContainer = async (): Promise<ResponeInterface> => {
  const commandConfigIdRes: DatabaseFetching<ResponseStatus, number | null, string[]> =
    await getCommandConfigId(db)
  const allCommandConfig: DatabaseFetching<
    ResponseStatus,
    AllCommandConfigureInterface[] | null,
    string[]
  > = await getAllCommandConfig(db)
  const activeDockerImage: DatabaseFetching<ResponseStatus, string | null, string[]> =
    await getActiveDockerImage(db)
  if (
    commandConfigIdRes.status != ResponseStatus.SUCCESS ||
    allCommandConfig.status != ResponseStatus.SUCCESS ||
    activeDockerImage.status != ResponseStatus.SUCCESS ||
    !activeDockerImage.data ||
    !allCommandConfig.data ||
    !commandConfigIdRes.data
  ) {
    return {
      status: ResponseStatus.ERROR,
      msg: [`Failed to start process: command not found!`]
    }
  }

  const commandConfigure: AllCommandConfigureInterface | null =
    allCommandConfig.data.find((command) => command.id === commandConfigIdRes.data) || null

  if (!commandConfigure) {
    return {
      status: ResponseStatus.ERROR,
      msg: [`Failed to start process: command not found!`]
    }
  }
  const { command, django, gazebo, consoles, other } = commandConfigure

  let commands: string[] = command
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
  commands.push(AllDockersImages[activeDockerImage.data])
  //

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
