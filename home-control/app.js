'use strict'

const fastify = require('fastify')({ pluginTimeout: 120000, logger: true })
const Swagger = require('@fastify/swagger')
const SwaggerUI = require('@fastify/swagger-ui')

async function main() {
  // Register Swagger (OpenAPI generation)
  await fastify.register(Swagger, {
    swagger: {
      info: {
        title: 'API Documentation',
        description: 'Fastify API with Swagger',
        version: '0.1.0',
      },
    },
  })

  // Register Swagger UI (the visible docs page)
  await fastify.register(SwaggerUI, {
    routePrefix: '/docs',
    uiConfig: {
      docExpansion: 'list',
      deepLinking: false,
    },
  })

  // Load plugins
  await fastify.register(require('./plugins/sqlite'))

  // Load routes
  await fastify.register(require('./routes/database'))

  await fastify.listen({ port: 3000, host: '0.0.0.0' }, err => {
    if (err) throw err
    console.log('Server running at http://localhost:3000')
  })
}

main().catch(err => {
  fastify.log.error(err)
  process.exit(1)
})
