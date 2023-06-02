const delay = require("./delay");
const { SystemDependency } = require("sistema");

module.exports = new SystemDependency("database")
  .provides(async () => {
    await delay(1000);
  })
  .dispose(async () => {
    await delay(1000);
  });
