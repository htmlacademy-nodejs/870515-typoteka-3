'use strict';

const { ArticleService } = require(`../data-service`);
const article = require(`./article`);

const {getMockData} = require(`../lib/get-mock-data`);
const {Router} = require(`express`);

const app = new Router();

(async () => {
  const mockData = await getMockData();

  article(app, new ArticleService(mockData));
})();

module.exports = app;
