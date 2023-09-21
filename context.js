const { defaultContext, Context, CONTEXT_EVENTS } = require("sistema");

const systemContext = new Context("System context")
  .on(
    CONTEXT_EVENTS.SUCCESS_RUN,
    ({ dependency, context, timeStart, timeEnd }) => {
      // example: 'User query run by main context in 14 ms'
      console.log(
        `${dependency.name} run by ${context.name} in ${timeEnd - timeStart} ms`
      );
    }
  )
  .on(
    CONTEXT_EVENTS.FAIL_RUN,
    ({ dependency, context, timeStart, timeEnd, error }) => {
      console.log(
        `${dependency.name} run with Error (${error.message}) by ${
          context.name
        } in ${timeEnd - timeStart} ms`
      );
    }
  )
  .on(
    CONTEXT_EVENTS.SUCCESS_SHUTDOWN,
    ({ dependency, context, timeStart, timeEnd }) => {
      console.log(
        `${dependency.name} shutdown by ${context.name} in ${
          timeEnd - timeStart
        } ms`
      );
    }
  )
  .on(
    CONTEXT_EVENTS.FAIL_SHUTDOWN,
    ({ dependency, context, timeStart, timeEnd, error }) => {
      console.log(
        `${dependency.name} shutdown with Error (${error.message}) by ${
          context.name
        } in ${timeEnd - timeStart} ms`
      );
    }
  );

defaultContext
  .on(
    CONTEXT_EVENTS.SUCCESS_RUN,
    ({ dependency, context, timeStart, timeEnd }) => {
      // example: 'User query run by main context in 14 ms'
      console.log(
        `${dependency.name} run by ${context.name} in ${timeEnd - timeStart} ms`
      );
    }
  )
  .on(
    CONTEXT_EVENTS.FAIL_RUN,
    ({ dependency, context, timeStart, timeEnd, error }) => {
      console.log(
        `${dependency.name} run with Error (${opts.error.message}) by ${
          context.name
        } in ${timeEnd - timeStart} ms`
      );
    }
  )
  .on(
    CONTEXT_EVENTS.SUCCESS_SHUTDOWN,
    ({ dependency, context, timeStart, timeEnd }) => {
      console.log(
        `${dependency.name} shutdown by ${context.name} in ${
          timeEnd - timeStart
        } ms`
      );
    }
  )
  .on(
    CONTEXT_EVENTS.FAIL_SHUTDOWN,
    ({ dependency, context, timeStart, timeEnd, error }) => {
      console.log(
        `${dependency.name} shutdown with Error (${error.message}) by ${
          context.name
        } in ${timeEnd - timeStart} ms`
      );
    }
  );

module.exports = { systemContext };
