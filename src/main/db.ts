import { app } from 'electron'
import { join, resolve } from 'path'
// const sqlite3 = require('sqlite3').verbose()
import sqlite3, { Database } from 'sqlite3'

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
