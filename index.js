const { defaultContext } = require("sistema");
const server = require("./server");
const events = { SIGTERM: 0, SIGINT: 0, unhandledRejection: 1, error: 1 };
const { systemContext } = require("./context");

const database = require("./database");

async function start() {
  await server.run({}, systemContext);
  console.log("System has started. Press CTRL+C to stop");

  Object.keys(events).forEach((name) => {
    process.on(name, async (events) => {
      await systemContext.shutdown();
      console.log("systemContext has stopped");
      await defaultContext.shutdown();
      console.log("defaultContext has stopped");
      process.exit(events[name]);
    });
  });
}

start();
