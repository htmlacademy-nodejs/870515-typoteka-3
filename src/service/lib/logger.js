'use strict';

const pino = require(`pino`);
const {Env} = require(`../../constants`);

console.log(process.env.LOG_LEVEL);
const LOG_FILE = `./logs/api.log`;
const isDevMode = process.env.NODE_ENV === Env.development;
const defaultLogLevel = isDevMode ? `info` : `error`;

const logger = pino({
  name: `base-logger`,
  level: process.env.LOG_LEVEL || defaultLogLevel,
  transport: {target: `pino-pretty`},
}, isDevMode ? process.stdout : pino.destination(LOG_FILE));

module.exports = {
  logger,
  getLogger(options = {}) {
    return logger.child(options);
  }
};
