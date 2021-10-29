'use strict';

const {HttpStatus} = require(`../../constants`);

module.exports = (req, res, next) => {
  if (Object.keys(req.query).indexOf(`query`) === -1) {
    return res
      .status(HttpStatus.badRequest)
      .send(`Bad request`);
  }

  return next();
};
