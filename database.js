const delay = require("./delay");
const { ResourceDependency } = require("sistema");

const db = new ResourceDependency("database")
  .provides(async () => {
    await delay(1000);
  })
  .disposes(async () => {
    await delay(1000);
  });

db.run(); // this start the resource dependency immediately

module.exports = db;
