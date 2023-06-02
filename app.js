const { SystemDependency } = require("sistema");
const express = require("express");

module.exports = new SystemDependency("app").provides(async () => {
  const app = express();
  return app;
});
