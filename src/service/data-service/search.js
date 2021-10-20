'use strict';

class SearchService {
  constructor(articles) {
    this._articles = articles;
  }

  search(query) {
    // TODO: search
    console.log(query);
    return this._articles;
  }
}

module.exports = SearchService;
