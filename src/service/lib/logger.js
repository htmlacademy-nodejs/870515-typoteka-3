'use strict';

const pino = require(`pino`);
const {Env} = require(`../../constants`);

const LOG_FILE = `./logs/api.log`;
const isDevMode = process.env.NODE_ENV === Env.development;

const targets = [
  {
    level: `error`,
    target: `pino/file`,
    options: {destination: LOG_FILE}
  },
];

if (isDevMode) {
  targets.push({target: `pino-pretty`, level: process.env.LOG_LEVEL || `info`});
}

const logger = pino({
  name: `base-logger`,
  transport: {targets}
});

module.exports = {
  logger,
  getLogger(options = {}) {
    return logger.child(options);
  }
};
