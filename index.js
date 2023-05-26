const server = require("./server");
const events = { SIGTERM: 0, SIGINT: 0, unhandledRejection: 1, error: 1 };
const { systemRunner, requestRunner } = require("./runners");

async function start() {
  await systemRunner.run(server);

  console.log("System has started. Press CTRL+C to stop");

  Object.keys(events).forEach((name) => {
    process.on(name, async () => {
      await systemRunner.shutdown();
      console.log("systemrunner has stopped");
      await requestRunner.shutdown();
      console.log("requestrunner has stopped");
      process.exit(events[name]);
    });
  });
}

start();
