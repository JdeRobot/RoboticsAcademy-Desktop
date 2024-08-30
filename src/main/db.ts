import { app } from 'electron'
import { join, resolve } from 'path'
// const sqlite3 = require('sqlite3').verbose()
import sqlite3, { Database } from 'sqlite3'
import { AllCommandConfigureInterface, DatabaseFetching, ResponseStatus } from './interfaces'

// Data to be stored
const AllCommandConfigure = [
  {
    id: `1`,
    default: true,
    name: 'Basic Command',
    command: [`docker`, `run`, `--rm`, `-it`],
    django: {
      name: 'django',
      ports: [7164, 7164]
    },
    gazebo: {
      name: 'gazebo',
      ports: [6080, 6080]
    },
    consoles: {
      name: 'consoles',
      ports: [1108, 1108]
    },
    other: {
      name: 'other',
      ports: [7163, 7163]
    }
  },
  {
    id: `2`,
    default: true,
    name: 'GPU Acceleration Intel',
    command: [`docker`, `run`, `--rm`, `-it`, `--device`, `/dev/dri`],
    django: {
      name: 'django',
      ports: [7164, 7164]
    },
    gazebo: {
      name: 'gazebo',
      ports: [6080, 6080]
    },
    consoles: {
      name: 'consoles',
      ports: [1108, 1108]
    },
    other: {
      name: 'other',
      ports: [7163, 7163]
    }
  },
  {
    id: ` 3`,
    default: true,
    name: 'GPU Acceleration Nvidia',
    command: [`docker`, `run`, `--rm`, `-it`, `--gpus`, `all`, `--device`, `/dev/dri`],
    django: {
      name: 'django',
      ports: [7164, 7164]
    },
    gazebo: {
      name: 'gazebo',
      ports: [6080, 6080]
    },
    consoles: {
      name: 'consoles',
      ports: [1108, 1108]
    },
    other: {
      name: 'other',
      ports: [7163, 7163]
    }
  },
  {
    id: `4`,
    default: true,
    name: 'Multiple Gpus',
    command: [
      `docker`,
      `run`,
      `--rm`,
      `-it`,
      `--gpus`,
      `all`,
      `--device`,
      `/dev/dri`,
      `-e`,
      `DRI_NAME=card1`
    ],
    django: {
      name: 'django',
      ports: [7164, 7164]
    },
    gazebo: {
      name: 'gazebo',
      ports: [6080, 6080]
    },
    consoles: {
      name: 'consoles',
      ports: [1108, 1108]
    },
    other: {
      name: 'other',
      ports: [7163, 7163]
    }
  },
  {
    id: `5`,
    default: true,
    name: 'Only Ports',
    command: [],
    django: {
      name: 'django',
      ports: [7164, 7164]
    },
    gazebo: {
      name: 'gazebo',
      ports: [6080, 6080]
    },
    consoles: {
      name: 'consoles',
      ports: [1108, 1108]
    },
    other: {
      name: 'other',
      ports: [7163, 7163]
    }
  },
  {
    id: `77`,
    default: false,
    name: 'Multiple Gpus - 2',
    command: [`docker`, `run`, `--rm`, `-it`, `--gpus`, `all`],
    django: {
      name: 'django',
      ports: [7164, 7164]
    },
    gazebo: {
      name: 'gazebo',
      ports: [6080, 6080]
    },
    consoles: {
      name: 'consoles',
      ports: [1108, 1108]
    },
    other: {
      name: 'other',
      ports: [7163, 7163]
    }
  }
]
export const dbInit = (): Database => {
  const getDBPath = () => {
    let base = app.getAppPath()
    if (app.isPackaged) {
      base = base.replace('app.asar', '')
    }
    return resolve(base, `./roboticsacademy.db`)
  }

  const mainPathOfDB = getDBPath()
  console.log('mainPathOfDB ', mainPathOfDB)

  const db = new sqlite3.Database(mainPathOfDB, sqlite3.OPEN_READWRITE, (err) => {
    if (err) return console.error(err.message)

    console.log('db connect successfully')
  })

  return db
}

// if table data already exits
const isTableExit = async (db: Database, tableName: string): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    db.all(`SELECT * FROM ${tableName}`, [], (err, rows) => {
      if (err) {
        console.error(err)
        reject(false)
      }

      if (rows.length === 0) resolve(false)
      else resolve(true)
    })
  })
}

export const insertCommandData = async (db: Database) => {
  db.run(
    `CREATE TABLE IF NOT EXISTS commands (
    id INTEGER PRIMARY KEY AUTOINCREMENT,  -- Auto-incrementing ID
    is_default BOOLEAN,
    name TEXT,
    command TEXT,
    django_ports TEXT,
    gazebo_ports TEXT,
    consoles_ports TEXT,
    other_ports TEXT
  )`,
    async (err) => {
      if (err) {
        console.error('Error creating table: ' + err.message)
      } else {
        console.log('commands Table created or already exists.')

        try {
          const checkTableExist = await isTableExit(db, `commands`)
          if (!checkTableExist) {
            // Insert data into the table
            let insertStmt = db.prepare(
              `INSERT INTO commands (
                is_default, name, command,django_ports,gazebo_ports,consoles_ports,other_ports) VALUES (?, ?, ?, ?, ?, ?, ?)`
            )

            AllCommandConfigure.forEach((entry) => {
              insertStmt.run(
                entry.default,
                entry.name,
                entry.command.join(','),
                entry.django.ports.join(':'),
                entry.gazebo.ports.join(':'),
                entry.consoles.ports.join(':'),
                entry.other.ports.join(':')
              )
            })

            insertStmt.finalize()

            console.log('Data inserted successfully.')
          }
        } catch (error) {
          console.error(error)
        }
      }
    }
  )
}

export const insertCommandUtilsData = async (db: Database) => {
  db.run(
    `CREATE TABLE IF NOT EXISTS commands_utils (
    id INTEGER,
    active_command_id TEXT,
    active_docker TEXT
  )`,
    async (err) => {
      if (err) {
        console.error('Error creating table: ' + err.message)
      } else {
        console.log('commands_utils Table created or already exists.')

        try {
          const checkTableExist = await isTableExit(db, `commands_utils`)
          if (!checkTableExist) {
            // Insert data into the table
            let insertStmt = db.prepare(
              `INSERT INTO commands_utils (
                id, active_command_id, active_docker
              ) VALUES (?, ?, ?)`
            )
            insertStmt.run(999, 1, `jderobotRoboticsAcademy`)
            insertStmt.finalize()

            console.log('Data inserted successfully.')
          }
        } catch (error) {
          console.error(error)
        }
      }
    }
  )
}

//! GET
// command table
interface CommandsTableRow {
  id: number
  is_default: boolean
  name: string
  command: string
  consoles_ports: string
  django_ports: string
  gazebo_ports: string
  other_ports: string
}
export const getAllCommandConfig = (
  db: Database
): Promise<DatabaseFetching<ResponseStatus, AllCommandConfigureInterface[] | null, string[]>> => {
  return new Promise((resolve, reject) => {
    db.all('SELECT * FROM commands', [], (err, rows: CommandsTableRow[]) => {
      if (err) {
        reject({
          status: ResponseStatus.ERROR,
          data: null,
          msg: [`error while data fetching from db`]
        })
      } else {
        let allCommands: AllCommandConfigureInterface[] = []
        rows.forEach((row: CommandsTableRow) => {
          let command: AllCommandConfigureInterface = {
            id: row.id,
            default: Boolean(row.is_default),
            name: row.name,
            command: row.command.split(','),
            django: {
              name: 'django',
              ports: row.django_ports.split(':').map(Number)
            },
            gazebo: {
              name: 'gazebo',
              ports: row.gazebo_ports.split(':').map(Number)
            },
            consoles: {
              name: 'consoles',
              ports: row.consoles_ports.split(':').map(Number)
            },
            other: {
              name: 'other',
              ports: row.other_ports.split(':').map(Number)
            }
          }
          allCommands.push(command)
        })
        resolve({
          status: ResponseStatus.SUCCESS,
          data: allCommands,
          msg: []
        })
      }
    })
  })
}

interface CommandsUtilsTableRow {
  id: number
  active_command_id: number
  active_docker: string
}
//* get active command
export const getCommandConfigId = (
  db: Database
): Promise<DatabaseFetching<ResponseStatus, number | null, string[]>> => {
  return new Promise((resolve, reject) => {
    db.all(
      `SELECT * FROM commands_utils WHERE id=999`,
      [],
      (err, rows: CommandsUtilsTableRow[]) => {
        if (err) {
          reject({
            status: ResponseStatus.ERROR,
            data: null,
            msg: [`error while data fetching from db`]
          })
        } else {
          resolve({
            status: ResponseStatus.SUCCESS,
            data: rows[0].active_command_id,
            msg: []
          })
        }
      }
    )
  })
}

//* get active command
export const getActiveDockerImage = (
  db: Database
): Promise<DatabaseFetching<ResponseStatus, string, string[]>> => {
  return new Promise((resolve, reject) => {
    db.all(
      `SELECT * FROM commands_utils WHERE id=999`,
      [],
      (err, rows: CommandsUtilsTableRow[]) => {
        if (err) {
          reject({
            status: ResponseStatus.ERROR,
            data: null,
            msg: [`error while data fetching from db`]
          })
        } else {
          // const
          resolve({
            status: ResponseStatus.SUCCESS,
            data: rows[0].active_docker,
            msg: []
          })
        }
      }
    )
  })
}

//! POST
//! UPDATE
//! DELETE
