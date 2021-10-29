'use strict';

class SearchService {
  constructor(articles) {
    this._articles = articles;
  }

  search(query) {
    return this._articles.filter((article) => article.title.indexOf(query) !== -1);
  }
}

module.exports = SearchService;
