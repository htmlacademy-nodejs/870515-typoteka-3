'use strict';

const {Router} = require(`express`);

const routes = new Router();

routes.get(`/add`, (req, res) => res.render(`post`));
routes.get(`/:id`, (req, res) => res.render(`post-detail`));
routes.get(`/edit/:id`, (req, res) => res.render(`post`));
routes.get(`/category/:id`, (req, res) => res.render(`articles-by-category`));

module.exports = routes;
