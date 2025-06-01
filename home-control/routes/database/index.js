'use strict'

const path = require('path')
const fs = require('fs')

module.exports = async function (fastify, opts) {
  const { db, save } = fastify.sqlite

  fastify.post('/message', {
    schema: {
      summary: 'Create a new message',
      description: 'Inserts a message into the SQLite database.',
      body: {
        type: 'object',
        required: ['content'],
        properties: {
          content: { type: 'string' },
        },
      },
      response: {
        200: {
          description: 'Message created successfully',
          type: 'object',
          properties: {
            id: { type: 'integer' },
            content: { type: 'string' },
          },
        },
        400: {
          description: 'Bad request',
          type: 'object',
          properties: {
            error: { type: 'string' },
          },
        },
      },
    },
    handler: async (request, reply) => {
      const { content } = request.body
      if (!content) {
        return reply.code(400).send({ error: 'Content is required' })
      }

      db.run('INSERT INTO messages (content) VALUES (?)', [content])

      // Get the inserted ID (sql.js doesn't support lastInsertRowId directly)
      const result = db.exec('SELECT last_insert_rowid() AS id')
      const id = result?.[0]?.values?.[0]?.[0]

      save()
      return { id, content }
    },
  })

  fastify.get('/messages', {
    schema: {
      summary: 'Get all messages',
      description: 'Returns a list of all messages from the database.',
      response: {
        200: {
          description: 'List of messages',
          type: 'array',
          items: {
            type: 'object',
            properties: {
              id: { type: 'integer' },
              content: { type: 'string' },
              created_at: { type: 'string', format: 'date-time' },
            },
          },
        },
      },
    },
    handler: async (request, reply) => {
      const res = db.exec('SELECT * FROM messages ORDER BY created_at DESC')
      const rows =
        res[0]?.values?.map(row => {
          const [id, content, created_at] = row
          return { id, content, created_at }
        }) || []
      return rows
    },
  })

  fastify.get('/', {
    schema: {
      summary: 'Health check',
      description: 'Returns a basic message to confirm the server is running.',
      response: {
        200: {
          type: 'string',
          description: 'this is an example',
        },
      },
    },
    handler: async (request, reply) => {
      return 'this is an example'
    },
  })
}
