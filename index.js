const server = require("./server");
const events = { SIGTERM: 0, SIGINT: 0, unhandledRejection: 1, error: 1 };
const { systemContext, requestContext } = require("./context");

const database = require("./database");
// const { run } = require("sistema");

async function start() {
  await server.run({}, systemContext);
  // await database.run({}, systemContext);
  // await run([server, database], {}, systemContext);

  console.log("System has started. Press CTRL+C to stop");

  Object.keys(events).forEach((name) => {
    process.on(name, async (events) => {
      await systemContext.shutdown();
      console.log("systemContext has stopped");
      await requestContext.shutdown();
      console.log("requestContext has stopped");
      process.exit(events[name]);
    });
  });
}

start();
