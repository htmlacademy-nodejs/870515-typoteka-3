'use strict';

const express = require(`express`);
const {HttpStatus} = require(`../../constants`);
const {getMockData} = require(`../lib/get-mock-data`);

const DEFAULT_PORT = 3000;

module.exports = {
  name: `--server`,
  async run(args) {
    const [customPort] = args;
    const port = Number.parseInt(customPort, 10) || DEFAULT_PORT;
    const app = express();

    app.use(express.json({limit: `10kb`}));

    app.get(`/posts`, async (request, response) => {
      let posts;

      try {
        posts = await getMockData();

        response.send(posts);
      } catch (error) {
        response
          .status(HttpStatus.notFound)
          .send(`Not found`);
      }
    });

    app.use((req, res) => res
      .status(HttpStatus.notFound)
      .send(`Not found`));

    app.listen(port, () => {
      console.log(`Server was started http://localhost:${port}`);
    });
  }
};
