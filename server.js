const { ResourceDependency } = require("sistema");
const controllers = require("./controllers");
const app = require("./app");
let server;

module.exports = new ResourceDependency("server")
  .dependsOn(app, controllers)
  .provides((app, _ctrl) => {
    server = app.listen(3000);
    return server;
  })
  .disposes(() => {
    return new Promise((res) => {
      server.close(res);
    });
  });
