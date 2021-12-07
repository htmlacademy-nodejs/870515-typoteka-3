'use strict';

const {Router} = require(`express`);
const {HttpStatus} = require(`../../constants`);
const articleValidator = require(`../middleware/article-validator`);
const commentValidator = require(`../middleware/comment-validator`);
const articleExistValidator = require(`../middleware/article-exist-validator`);
const commentExistValidator = require(`../middleware/comment-exist-validator`);

module.exports = (app, articleService, commentService) => {
  const route = new Router();

  app.use(`/articles`, route);

  route.get(`/`, (req, res) => {
    return res
      .status(HttpStatus.ok)
      .json(articleService.findAll());
  });

  route.get(`/:articleId`, (req, res) => {
    const {articleId} = req.params;
    const article = articleService.findOne(articleId);

    if (!article) {
      return res
        .status(HttpStatus.notFound)
        .send(`Not found`);
    }

    return res
      .status(HttpStatus.ok)
      .json(article);
  });

  route.post(`/`, articleValidator, (req, res) => {
    const newArticle = articleService.create(req.body);

    return res
      .status(HttpStatus.created)
      .json(newArticle);
  });

  route.put(`/:articleId`, articleExistValidator(articleService), articleValidator, (req, res) => {
    const article = articleService.update(req.params.articleId, req.body);

    return res
      .status(HttpStatus.ok)
      .json(article);
  });

  route.delete(`/:articleId`, articleExistValidator(articleService), (req, res) => {
    articleService.drop(req.params.articleId);
    return res.status(HttpStatus.noContent).end();
  });

  route.get(`/:articleId/comments`, articleExistValidator(articleService), (req, res) => {
    const {article} = res.locals;

    return res
      .status(HttpStatus.ok)
      .json(article.comments);
  });

  route.post(`/:articleId/comments`, articleExistValidator(articleService), commentValidator, (req, res) => {
    const {article} = res.locals;
    const comment = commentService.create(article, req.body);

    return res
      .status(HttpStatus.created)
      .json(comment);
  });

  route.delete(`/:articleId/comments/:commentId`, commentExistValidator(articleService), (req, res) => {
    const {article} = res.locals;
    commentService.drop(article, req.params.commentId);

    return res.status(HttpStatus.noContent).end();
  });
};
