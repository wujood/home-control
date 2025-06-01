'use strict'

const fp = require('fastify-plugin')
const path = require('path')
const fs = require('fs')
const initSqlJs = require('sql.js')

module.exports = fp(async function (fastify, opts) {
  const dbPath = path.join(__dirname, '..', 'db.sqlite')
  const SQL = await initSqlJs()

  // Load or create database
  let db
  if (fs.existsSync(dbPath)) {
    const fileBuffer = fs.readFileSync(dbPath)
    db = new SQL.Database(fileBuffer)
  } else {
    db = new SQL.Database()
  }

  // Create table if not exists
  db.run(`
    CREATE TABLE IF NOT EXISTS messages (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      content TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `)

  // Save helper
  const saveDb = () => {
    const data = db.export()
    fs.writeFileSync(dbPath, Buffer.from(data))
  }

  // Decorate Fastify instance
  fastify.decorate('sqlite', {
    db,
    save: saveDb,
  })
})
