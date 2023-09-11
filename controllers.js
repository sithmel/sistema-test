const { ResourceDependency, run, META_DEPENDENCY } = require("sistema");
const lens = require("sistema-lens");
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

function lensMiddleware(dependency) {
  return (req, res, next) => {
    if (req.query.debug === "true") {
      return res.send(
        lens(dependency.getAdjacencyList(), new Map([]), { title: "debug" })
      );
    }
    next();
  };
}

module.exports = new ResourceDependency("controllers")
  .dependsOn(app)
  .provides((application) => {
    application.get("/fast", lensMiddleware(fast), async (req, res) => {
      const [text, { timings }] = await run(
        [fast, META_DEPENDENCY],
        { req, res },
        requestContext
      );
      writeServerTiming(timings, res);
      res.send(text);
    });

    application.get("/slow", lensMiddleware(slow), async (req, res) => {
      const [text, { timings }] = await run(
        [slow, META_DEPENDENCY],
        { req, res },
        requestContext
      );
      writeServerTiming(timings, res);
      res.send(text);
    });
    return application;
  });
