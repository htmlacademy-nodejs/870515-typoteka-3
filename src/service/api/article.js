'use strict';

const {Router} = require(`express`);
const {HttpStatus} = require(`../../constants`);

const route = new Router();

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
};
