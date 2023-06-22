const { Dependency } = require("sistema");

const delay = require("../delay");
const database = require("../database");

const slow = new Dependency("slow")
  .dependsOn(database, "req")
  .provides(async (db, req) => {
    await delay(3000);
    return "slow endpoint";
  });

module.exports = slow;
