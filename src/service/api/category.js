'use strict';

const {Router} = require(`express`);
const {HttpStatus} = require(`../../constants`);

module.exports = (app, service) => {
  const route = new Router();

  app.use(`/categories`, route);

  route.get(`/`, async (req, res) => {
    return res
      .status(HttpStatus.ok)
      .json(service.findAll());
  });
};
