const {HttpStatus} = require(`../../constants`);

const requiredKeys = [`title`, `announce`];

module.exports = (req, res, next) => {
  const newArticle = req.body;
  const keys = Object.keys(newArticle);
  const keysExists = requiredKeys.every((key) => keys.includes(key));

  if (!keysExists) {
    res
      .status(HttpStatus.badRequest)
      .send(`Bad request`);
  }

  next();
};
