const { SystemDependency } = require("sistema");
const controllers = require("./controllers");
const app = require("./app");
let server;

module.exports = new SystemDependency("server")
  .dependsOn(controllers, app)
  .provides((_ctrl, app) => {
    server = app.listen(3000);
    return server;
  })
  .dispose(() => {
    return new Promise((res) => {
      server.close(res);
    });
  });
