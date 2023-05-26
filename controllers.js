const delay = require("./delay");
const app = require("./app");
const database = require("./database");
const { requestRunner } = require("./runners");

const { SystemDependency, Dependency } = require("sistema");

const fast = new Dependency("fast")
  .dependsOn(database, "req", "res")
  .provides(async (db, req, res) => {
    await delay(10);
    res.send("fast endpoint");
  });

const slow = new Dependency("slow")
  .dependsOn(database, "req", "res")
  .provides(async (db, req, res) => {
    await delay(3000);
    res.send("slow endpoint");
  });

module.exports = new SystemDependency("controllers")
  .dependsOn(app)
  .provides((app) => {
    console.log("start controller");

    app.get("/fast", async (req, res) => {
      requestRunner.run(fast, { req, res });
    });

    app.get("/slow", async (req, res) => {
      requestRunner.run(slow, { req, res });
    });
    return app;
  });
