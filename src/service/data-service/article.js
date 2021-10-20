'use strict';

const {nanoid} = require(`nanoid`);
const {MAX_ID_LENGTH} = require(`../../constants`);

class ArticleService {
  constructor(articles) {
    this._articles = articles;
  }

  create(article) {
    const newArticle = Object.assign({
      id: nanoid(MAX_ID_LENGTH),
      createdDate: new Date(),
      category: [],
      comments: [],
    }, article);

    this._articles.push(newArticle);

    return newArticle;
  }

  findAll() {
    return this._articles;
  }

  findOne(id) {
    return this._articles.find((article) => id === article.id);
  }
}

module.exports = ArticleService;
