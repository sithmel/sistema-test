const { Dependency } = require("sistema");

const delay = require("../delay");
const database = require("../database");

const slow = new Dependency("slow")
  .dependsOn(database, "req", "res")
  .provides(async (db, req, res) => {
    await delay(3000);
    res.send("slow endpoint");
  });

module.exports = slow;
