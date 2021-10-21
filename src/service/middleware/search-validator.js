const {HttpStatus} = require(`../../constants`);

module.exports = (req, res, next) => {
  if (Object.keys(req.query).indexOf(`query`) === -1) {
    res
      .status(HttpStatus.badRequest)
      .send(`Bad request`);
  }

  next();
};
