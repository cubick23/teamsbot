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
    await fastify.listen({ port: 80 })
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}

start();

