'use strict';

const {Router} = require(`express`);
const {HttpStatus} = require(`../../constants`);

const route = new Router();

// TODO:
// [X] - GET /api/articles — ресурс возвращает список публикаций;
// [X] - GET /api/articles/:articleId — возвращает полную информацию о публикации;
// [X] - POST /api/articles — создаёт новую публикацию;
// [ ] - PUT /api/articles/:articleId — редактирует определённую публикацию;
// [ ] - DELETE /api/articles/:articleId — удаляет определённую публикацию;
// [ ] - GET /api/articles/:articleId/comments — возвращает список комментариев определённой публикации;
// [ ] - DELETE /api/articles/:articleId/comments/:commentId — удаляет из определённой публикации комментарий с идентификатором;
// [ ] - POST /api/articles/:articleId/comments — создаёт новый комментарий;

module.exports = (app, service) => {
  app.use(`/articles`, route);

  route.get(`/`, async (req, res) => {
    res
      .status(HttpStatus.ok)
      .json(service.findAll());
  });

  route.get(`/:articleId`, async (req, res) => {
    const {articleId} = req.params;
    const article = service.findOne(articleId);

    if (!article) {
      res
        .status(HttpStatus.notFound)
        .send(`Not found`)
    }

    res
      .status(HttpStatus.ok)
      .json(article);
  });

  route.post(`/`, async (req, res) => {
    const newArticle = service.create(req.body);

    res
      .status(HttpStatus.created)
      .json(service.create(newArticle));
  });
};
