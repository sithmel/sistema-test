const { ResourceDependency } = require("sistema");
const express = require("express");

module.exports = new ResourceDependency("app").provides(async () => {
  const app = express();
  return app;
});
