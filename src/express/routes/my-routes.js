'use strict';

const {Router} = require(`express`);

const routes = new Router();

routes.get(`/`, (req, res) => res.render(`my`));
routes.get(`/comments`, (req, res) => res.render(`comments`));

module.exports = routes;
