const http = require(`http`);
const fs = require(`fs`);
const { HttpStatus } = require('../../constants');

const DEFAULT_PORT = 3000;
const HOST = 'localhost';
const SCHEME = 'http';

const getMocks = async () => {
  const posts = await fs.promises.readFile('./mocks.json', 'utf-8');
  return JSON.parse(posts);
}

const renderPosts = (posts) => {
  return `<ul>
    ${posts.map((post) => `<li>${post.title}</li>`).join('')}
 </ul>`
}

const renderPage = (content) => {
  return `<html lang="ru">
    <head>
      <title>My page</title>
    </head>
    <body>${content}</body>
  </html>
  `
}

module.exports = {
  name: `--server`,
  async run(args) {
    const [customPort] = args;
    const port = Number.parseInt(customPort, 10) || DEFAULT_PORT;

    const server = http.createServer(async (request, response) => {
      let posts;

      try {
        posts = await getMocks()
        const content = renderPosts(posts);

        response.writeHead(HttpStatus.success, {
          'Content-Type': `text/html; charset=UTF-8`,
        });

        response.end(renderPage(content));
      } catch (error) {
        response.writeHead(HttpStatus.notFound, {
          'Content-Type': `text/html; charset=UTF-8`,
        });
        response.end(`Not found`);
      }
    });

    server.listen(port, () => {
      console.info(`Принимаю подключения на ${SCHEME}://${HOST}:${port}`);
    });
  }
};
