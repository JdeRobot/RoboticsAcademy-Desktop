const { spawn } = require('child_process')

export const checkDocker = async (): Promise<{ status: boolean; msg: string }> => {
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
      if (code === 0) {
        resolve({ status: true, msg: `Docker is installed: ${output}` })
      } else {
        resolve({ status: true, msg: `Docker is not installed: ${errorOutput}` })
      }
    })

    docker.on('error', (err) => {
      reject({ status: false, msg: `Failed to start process: ${err.message}` })
    })
  })
}

export const checkDockerRADI = async (): Promise<{ status: boolean; msg: string }> => {
  return new Promise((resolve, reject) => {
    const docker = spawn('docker', ['images', '-q', 'xjderobot/robotics-academy'])

    let output = ''
    let errorOutput = ''

    docker.stdout.on('data', (data) => {
      output += data.toString()
    })

    docker.stderr.on('data', (data) => {
      errorOutput += data.toString()
    })

    docker.on('close', (code) => {
      if (code === 0) {
        resolve({ status: true, msg: `Robotics Academy Docker Image (RADI) founded: ${output}` })
      } else {
        resolve({
          status: true,
          msg: `Robotics Academy Docker Image (RADI) is not founded: ${errorOutput}`
        })
      }
    })

    docker.on('error', (err) => {
      reject({ status: false, msg: `Failed to start process: ${err.message}` })
    })
  })
}
