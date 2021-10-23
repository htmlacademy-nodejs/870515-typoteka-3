'use strict';

const {Router} = require(`express`);
const {HttpStatus} = require(`../../constants`);

const route = new Router();

module.exports = (app, service) => {
  app.use(`/categories`, route);

  route.get(`/`, async (req, res) => {
    return res
      .status(HttpStatus.ok)
      .json(service.findAll());
  });
};
