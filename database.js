const delay = require("./delay");
const { ResourceDependency } = require("sistema");

module.exports = new ResourceDependency("database")
  .provides(async () => {
    await delay(1000);
  })
  .disposes(async () => {
    await delay(1000);
  });
