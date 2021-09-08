const { Router } = require('express');

const routes = new Router();

routes.get(`/add`, (req, res) => res.send(`/articles/add`));
routes.get(`/:id`, (req, res) => res.send(`/articles/${req.params.id}`));
routes.get(`/edit/:id`, (req, res) => res.send(`/articles/edit/${req.params.id}`));
routes.get(`/category/:id`, (req, res) => res.send(`/articles/category/${req.params.id}`));

module.exports = routes;
