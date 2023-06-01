const { Dependency } = require("sistema");

const delay = require("../delay");
const database = require("../database");

const fast = new Dependency("fast")
  .dependsOn(database, "req", "res")
  .provides(async (db, req, res) => {
    await delay(10);
    res.send("fast endpoint");
  });

module.exports = fast;
