const { ResourceDependency } = require("sistema");

const app = require("./app");
const fast = require("./controllers/fast");
const slow = require("./controllers/slow");

const { requestContext } = require("./context");

module.exports = new ResourceDependency("controllers")
  .dependsOn(app)
  .provides((application) => {
    application.get("/fast", async (req, res) => {
      fast.run({ req, res }, requestContext);
    });

    application.get("/slow", async (req, res) => {
      slow.run({ req, res }, requestContext);
    });
    return application;
  });
