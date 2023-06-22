const { Dependency } = require("sistema");

const delay = require("../delay");
const database = require("../database");

const fast = new Dependency("fast")
  .dependsOn(database, "req")
  .provides(async (db, req) => {
    await delay(10);
    return "fast endpoint";
  });

module.exports = fast;
