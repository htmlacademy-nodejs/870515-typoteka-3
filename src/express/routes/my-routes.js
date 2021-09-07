const { Router } = require('express');

const routes = new Router();

routes.get(`/`, (req, res) => res.send(`/my`));
routes.get(`/comments`, (req, res) => res.send(`/my/comments`));

module.exports = routes;
