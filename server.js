const { SystemDependency } = require("sistema");
const controllers = require("./controllers");
const app = require("./app");
let server;

module.exports = new SystemDependency()
  .dependsOn(controllers, app)
  .provides((_ctrl, app) => {
    console.log("start server");
    server = app.listen(3000);
    return server;
  })
  .dispose(() => {
    console.log("stop server");
    return new Promise((res) => {
      server.close(res);
    });
  });
