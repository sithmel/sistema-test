const { ResourceDependency, run, DEPENDENCY_TIMINGS } = require("sistema");

const app = require("./app");
const fast = require("./controllers/fast");
const slow = require("./controllers/slow");

const { requestContext } = require("./context");

function writeServerTiming(timings, res) {
  const timingsString = timings
    .map(
      ({ dependency, timeStart, timeEnd }) =>
        `${dependency.name};dur=${(timeEnd - timeStart).toFixed(2)}`
    )
    .join(",");
  res.set("Server-Timing", timingsString);
}

module.exports = new ResourceDependency("controllers")
  .dependsOn(app)
  .provides((application) => {
    application.get("/fast", async (req, res) => {
      const [text, timings] = await run(
        [fast, DEPENDENCY_TIMINGS],
        { req, res },
        requestContext
      );
      writeServerTiming(timings, res);
      res.send(text);
    });

    application.get("/slow", async (req, res) => {
      const [text, timings] = await run(
        [slow, DEPENDENCY_TIMINGS],
        { req, res },
        requestContext
      );
      writeServerTiming(timings, res);
      res.send(text);
    });
    return application;
  });
