'use strict';

const express = require(`express`);
const fs = require(`fs`);
const {HttpStatus} = require(`../../constants`);

const DEFAULT_PORT = 3000;

const getMocks = async () => {
  const posts = await fs.promises.readFile(`./mocks.json`, `utf-8`);
  return JSON.parse(posts);
};

module.exports = {
  name: `--server`,
  async run(args) {
    const [customPort] = args;
    const port = Number.parseInt(customPort, 10) || DEFAULT_PORT;
    const app = express();

    app.use(express.json());

    app.get(`/posts`, async (request, response) => {
      let posts;

      try {
        posts = await getMocks();

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
