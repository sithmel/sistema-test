const { Context } = require("sistema");

const systemContext = new Context("System context")
  .onSuccessRun((dep, ctx, opts) => {
    // example: 'User query run by main context in 14 ms'
    console.log(
      `${dep.name} run by ${ctx.name} in ${
        performance.now() - opts.startedOn
      } ms`
    );
  })
  .onFailRun((dep, ctx, opts) => {
    console.log(
      `${dep.name} run with Error (${opts.error.message}) by ${ctx.name} in ${
        performance.now() - opts.startedOn
      } ms`
    );
  })
  .onSuccessShutdown((dep, ctx, opts) => {
    console.log(
      `${dep.name} shutdown by ${ctx.name} in ${
        performance.now() - opts.startedOn
      } ms`
    );
  })
  .onFailShutdown((dep, ctx, opts) => {
    console.log(
      `${dep.name} shutdown with Error (${opts.error.message}) by ${
        ctx.name
      } in ${performance.now() - opts.startedOn} ms`
    );
  });

const requestContext = new Context("Request context")
  .onSuccessRun((dep, ctx, opts) => {
    // example: 'User query run by main context in 14 ms'
    console.log(
      `${dep.name} run by ${ctx.name} in ${
        performance.now() - opts.startedOn
      }ms`
    );
  })
  .onFailRun((dep, ctx, opts) => {
    console.log(
      `${dep.name} run with Error (${opts.error.message}) by ${ctx.name} in ${
        performance.now() - opts.startedOn
      } ms`
    );
  })
  .onSuccessShutdown((dep, ctx, opts) => {
    console.log(
      `${dep.name} shutdown by ${ctx.name} in ${
        performance.now() - opts.startedOn
      } ms`
    );
  })
  .onFailShutdown((dep, ctx, opts) => {
    console.log(
      `${dep.name} shutdown with Error (${opts.error.message}) by ${
        ctx.name
      } in ${(performance.now() - opts.startedOn) / 1000}ms`
    );
  });
module.exports = { systemContext, requestContext };
