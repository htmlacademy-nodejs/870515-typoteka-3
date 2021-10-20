'use strict';

const express = require(`express`);
const {HttpStatus, API_PREFIX} = require(`../../constants`);
const routes = require('../api');

const DEFAULT_PORT = 3000;

module.exports = {
  name: `--server`,
  async run(args) {
    const [customPort] = args;
    const port = Number.parseInt(customPort, 10) || DEFAULT_PORT;
    const app = express();

    app.use(express.json({limit: `10kb`}));
    app.use(API_PREFIX, routes)

    app.use((req, res) => res
      .status(HttpStatus.notFound)
      .send(`Not found`));

    app.listen(port, () => {
      console.log(`Server was started http://localhost:${port}`);
    });
  }
};
