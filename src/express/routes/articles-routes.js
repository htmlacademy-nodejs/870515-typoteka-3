const { Router } = require('express');

const routes = new Router();

routes.get(`/:id([0-9]+)`, (req, res) => res.send(`/articles/:id([0-9]+)`));
routes.get(`/edit/:id([0-9]+)`, (req, res) => res.send(`/articles/edit/:id([0-9]+)`));
routes.get(`/add`, (req, res) => res.send(`/articles/add`));
routes.get(`/category/:id([0-9]+)`, (req, res) => res.send(`/category/:id([0-9]+)`));

module.exports = routes;
