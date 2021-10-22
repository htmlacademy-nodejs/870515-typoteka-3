'use strict';

const {Router} = require(`express`);
const {HttpStatus} = require(`../../constants`);
const articleValidator = require(`../middleware/article-validator`);
const commentValidator = require(`../middleware/comment-validator`);
const articleExistValidator = require(`../middleware/article-exist-validator`);
const commentExistValidator = require(`../middleware/comment-exist-validator`);

const route = new Router();

// Вопросы по роутам:
// 1. Нельзя ли роуты с комментариями вынести в отдельный модуль ?
// Я попробовал, но express не позволяет использовать динамические параметры в
// блоке `use`. Например: app.use(`/articles/:articleId/comments`, route);

module.exports = (app, articleService, commentService) => {
  app.use(`/articles`, route);

  route.get(`/`, (req, res) => {
    res
      .status(HttpStatus.ok)
      .json(articleService.findAll());
  });

  route.get(`/:articleId`, (req, res) => {
    const {articleId} = req.params;
    const article = articleService.findOne(articleId);

    if (!article) {
      res
        .status(HttpStatus.notFound)
        .send(`Not found`);
    }

    res
      .status(HttpStatus.ok)
      .json(article);
  });

  route.post(`/`, articleValidator, (req, res) => {
    const newArticle = articleService.create(req.body);

    res
      .status(HttpStatus.created)
      .json(newArticle);
  });

  route.put(`/:articleId`, articleExistValidator(articleService), articleValidator, (req, res) => {
    const article = articleService.update(req.params.articleId, req.body);

    res
      .status(HttpStatus.ok)
      .json(article);
  });

  route.delete(`/:articleId`, articleExistValidator(articleService), (req, res) => {
    articleService.drop(req.params.articleId);
    res.status(HttpStatus.noContent).end();
  });

  route.get(`/:articleId/comments`, articleExistValidator(articleService), (req, res) => {
    const {article} = res.locals;

    res
      .status(HttpStatus.ok)
      .json(article.comments);
  });

  route.post(`/:articleId/comments`, articleExistValidator(articleService), commentValidator, (req, res) => {
    const {article} = res.locals;
    const comment = commentService.create(article, req.body);

    res
      .status(HttpStatus.created)
      .json(comment);
  });

  route.delete(`/:articleId/comments/:commentId`, commentExistValidator(articleService), (req, res) => {
    const {article} = res.locals;
    commentService.drop(article, req.params.commentId);

    res.status(HttpStatus.noContent).end();
  });
};
