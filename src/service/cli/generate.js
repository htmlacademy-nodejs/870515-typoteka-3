const {getRandomInt, shuffle} = require(`../../utils`);
const { TITLES } = require(`../../data//titles`);
const { CATEGORIES } = require(`../../data/categories`);
const { SENTENCES } = require(`../../data/sentences`);
const fs = require(`fs`);
const chalk = require('chalk');

const MAX_COUNT = 1000;
const DEFAULT_COUNT = 1;
const FILE_NAME = `mocks.json`;
const DATE_RANGE = 90 * 24 * 60 * 60 * 1000; // ~ 3 месяца

const getRandomDate = (range) => {
  const endTimestamp = Date.now();
  const startTimestamp = Date.now() - range;

  return new Date(getRandomInt(startTimestamp, endTimestamp));
};

const generatePost = () => ({
  title: TITLES[getRandomInt(0, TITLES.length)],
  createdDate: getRandomDate(DATE_RANGE),
  announce: shuffle(SENTENCES).slice(0, getRandomInt(1, 5)),
  fullText: shuffle(SENTENCES).slice(0, getRandomInt(1, SENTENCES.length)),
  category: shuffle(CATEGORIES).slice(0, getRandomInt(1, CATEGORIES.length)),
});

const generatePosts = (count) => Array(count).fill({}).map(() => generatePost());

module.exports = {
  name: `--generate`,
  async run(args) {
    const [count] = args;
    const postsCount = Number.parseInt(count, 10) || DEFAULT_COUNT;

    if (postsCount > MAX_COUNT) {
      throw new Error(`Не больше 1000 публикаций`);
    }

    const content = JSON.stringify(generatePosts(postsCount));

    await fs.writeFile(FILE_NAME, content, (err) => {
      if (err) {
        throw new Error(`Can't write data to file...`);
      }

      return console.info(chalk.green(`Operation success. File created.`));
    });
  }
};
