'use strict';

const {Router} = require(`express`);
const {HttpStatus} = require(`../../constants`);
const searchValidator = require(`../middleware/search-validator`);

const route = new Router();

module.exports = (app, service) => {
  app.use(`/search`, route);

  route.get(`/`, searchValidator, ({query}, res) => {
    const articles = service.search(query.query);

    if (articles.length === 0) {
      res
        .status(HttpStatus.notFound)
        .send(`Not found`);
    }

    res
      .status(HttpStatus.ok)
      .json(articles);
  });
};
