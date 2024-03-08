const fastify = require('fastify')({
  logger: true
});

// Declare a route
fastify.get('/', async function handler (request, reply) {
  console.log("test");
  return { hello: 'world adri updat test' }
})


fastify.get('/posts/:id?', function (request, reply) {
  const { id } = request.params;
  console.log(id + " response from api");
  return {response: id + " response form api"};
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

