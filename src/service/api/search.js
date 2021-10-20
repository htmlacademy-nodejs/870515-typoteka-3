'use strict';

const {Router} = require(`express`);
const {HttpStatus} = require(`../../constants`);

const route = new Router();

// TODO:
// [ ] - GET /api/search?query= — возвращает результаты поиска. Поиск публикаций выполняется по заголовку. Публикация соответствует поиску в случае наличия хотя бы одного вхождения искомой фразы.

module.exports = (app, service) => {
  app.use(`/search`, route);

  route.get(`/`, async ({ query }, res) => {
    res
      .status(HttpStatus.ok)
      .json(service.search(query.query ? query.query : ``));
  });
};
