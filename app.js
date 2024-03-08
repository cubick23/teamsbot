const fastify = require('fastify')({
  logger: true
});

// Declare a route
fastify.get('/', async function handler (request, reply) {
  return { hello: 'world' }
})





const start = async () => {
  // Run the server!
  try {
    await fastify.listen({ port: 3000, host: '0.0.0.0' })
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}

start();

