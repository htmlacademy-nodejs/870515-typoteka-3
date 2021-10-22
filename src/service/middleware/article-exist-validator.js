const {HttpStatus} = require(`../../constants`);

module.exports = (service) => (req, res, next) => {
  const article = service.findOne(req.params.articleId);

  if (!article) {
    res
      .status(HttpStatus.notFound)
      .send(`Not found`);
  }

  res.locals.article = article;
  next();
};
