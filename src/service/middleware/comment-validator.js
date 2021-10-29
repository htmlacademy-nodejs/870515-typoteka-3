'use strict';

const {HttpStatus} = require(`../../constants`);

const requiredKeys = [`text`];

module.exports = (req, res, next) => {
  const newComment = req.body;
  const keys = Object.keys(newComment);
  const keysExists = requiredKeys.every((key) => keys.includes(key));

  if (!keysExists) {
    return res
      .status(HttpStatus.badRequest)
      .send(`Bad request`);
  }

  return next();
};
