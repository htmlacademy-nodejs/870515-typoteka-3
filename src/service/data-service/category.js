class CategoryService {
  constructor(articles) {
    this._articles = articles;
  }

  findAll() {
    // TODO: all categories
    return this._articles;
  }
}

module.exports = CategoryService;
