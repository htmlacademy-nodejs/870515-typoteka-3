'use strict';

const express = require(`express`);
const {HttpStatus, API_PREFIX, ExitCode} = require(`../../constants`);
const {getLogger} = require(`../lib/logger`);
const routes = require(`../api`);

const logger = getLogger({name: `api`});
const DEFAULT_PORT = 3000;

module.exports = {
  name: `--server`,
  async run(args) {
    const [customPort] = args;
    const port = Number.parseInt(customPort, 10) || DEFAULT_PORT;
    const app = express();

    app.use(express.json({limit: `10kb`}));

    app.use((err, _req, _res, _next) => {
      logger.error(`An error occurred on processing request: ${err.message}`);
    });

    app.use((req, res, next) => {
      logger.info(`Request on route ${req.url}`);
      res.on(`finish`, () => {
        logger.info(`Response status code ${res.statusCode}`);
      });
      next();
    });


    app.use(API_PREFIX, routes);

    app.use((req, res) => {
      res
        .status(HttpStatus.notFound)
        .send(`Not found`);

      logger.error(`Route not found: ${req.url}`);
    });

    try {
      app.listen(port, (err) => {
        if (err) {
          return logger.error(`An error occurred on server creation: ${err.message}`);
        }

        return logger.info(`Listening to connections on http://localhost:${port}`);
      });
    } catch (err) {
      logger.error(`An error occurred: ${err.message}`);
      process.exit(ExitCode.failure);
    }
  }
};
