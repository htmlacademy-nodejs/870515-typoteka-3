'use strict';

const {ArticleService, CategoryService, SearchService, CommentService} = require(`../data-service`);
const article = require(`./article`);
const category = require(`./category`);
const search = require(`./search`);

const {getMockData} = require(`../lib/get-mock-data`);
const {Router} = require(`express`);

const app = new Router();

(async () => {
  const mockData = await getMockData();

  article(app, new ArticleService(mockData), new CommentService(mockData));
  category(app, new CategoryService(mockData));
  search(app, new SearchService(mockData));
})();

module.exports = app;
