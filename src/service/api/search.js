'use strict';

const {Router} = require(`express`);
const {HttpStatus} = require(`../../constants`);
const searchValidator = require(`../middleware/search-validator`);

module.exports = (app, service) => {
  const route = new Router();

  app.use(`/search`, route);

  route.get(`/`, searchValidator, ({query}, res) => {
    const articles = service.search(query.query);

    if (articles.length === 0) {
      return res
        .status(HttpStatus.notFound)
        .send(`Not found`);
    }

    return res
      .status(HttpStatus.ok)
      .json(articles);
  });
};
