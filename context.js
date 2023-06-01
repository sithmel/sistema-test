const { Context } = require("sistema");

const systemContext = new Context();
const requestContext = new Context();
module.exports = { systemContext, requestContext };
