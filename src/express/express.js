'use strict';

const express = require(`express`);
const path = require(`path`);
const myRoutes = require(`./routes/my-routes`);
const articlesRoutes = require(`./routes/articles-routes`);

const PUBLIC_DIR = `public`;
const DEFAULT_PORT = 8080;
const app = express();

app.use(express.static(path.resolve(__dirname, PUBLIC_DIR)));
app.set(`views`, path.resolve(__dirname, `templates`));
app.set(`view engine`, `pug`);

// routing
app.use(`/my`, myRoutes);
app.use(`/articles`, articlesRoutes);

app.get(`/`, (req, res) => res.render(`main`));
app.get(`/register`, (req, res) => res.send(`/register`));
app.get(`/login`, (req, res) => res.send(`/login`));
app.get(`/categories`, (req, res) => res.send(`/categories`));
app.get(`/search`, (req, res) => res.send(`/search`));

app.listen(DEFAULT_PORT, () => {
  console.log(`Server was started http://localhost:${DEFAULT_PORT}`);
});
