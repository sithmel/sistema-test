const { SystemDependency } = require("sistema");

const app = require("./app");
const fast = require("./controllers/fast");
const slow = require("./controllers/slow");

const { requestContext } = require("./context");

module.exports = new SystemDependency("controllers")
  .dependsOn(app)
  .provides((app) => {
    console.log("start controller");

    app.get("/fast", async (req, res) => {
      fast.run({ req, res }, requestContext);
    });

    app.get("/slow", async (req, res) => {
      slow.run({ req, res }, requestContext);
    });
    return app;
  });
