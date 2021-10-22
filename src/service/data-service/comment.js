'use strict';

const {nanoid} = require(`nanoid`);
const {MAX_ID_LENGTH} = require(`../../constants`);

class ArticleService {
  constructor(articles) {
    this._articles = articles;
  }

  create(article, comment) {
    const newComment = {
      id: nanoid(MAX_ID_LENGTH),
      ...comment,
    };

    article.comments.push(newComment);

    return newComment;
  }

  drop(article, commentId) {
    const comment = article.comments.find((item) => item.id === commentId);

    if (!article) {
      return null;
    }

    article.comments = article.comments.filter((item) => item.id !== commentId);

    return comment;
  }
}

module.exports = ArticleService;
