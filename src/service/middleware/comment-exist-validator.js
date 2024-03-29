'use strict';

const {HttpStatus} = require(`../../constants`);

module.exports = (service) => (req, res, next) => {
  // Не хочется завязываться на порядок вызова middleware, поэтому продублировал код из article-exist-validator
  const article = service.findOne(req.params.articleId);

  if (!article) {
    return res
      .status(HttpStatus.notFound)
      .send(`Not found`);
  }

  // TODO: когда пойдём в базу, эта проверка станет проще
  const comment = article.comments.find(({id}) => id === req.params.commentId);

  if (!comment) {
    return res
      .status(HttpStatus.notFound)
      .send(`Not found`);
  }

  res.locals.article = article;
  res.locals.comment = comment;
  return next();
};
