const fs = require(`fs`);
const chalk = require('chalk');

const {getRandomInt, shuffle, readMocks, getRandomDate} = require(`../../utils`);

const FILE_NAME = `mocks.json`;
const TITLE_MOCKS_PATH = `src/data/titles.txt`;
const SENTENCE_MOCKS_PATH = `src/data/sentences.txt`;
const CATEGORY_MOCKS_PATH = `src/data/categories.txt`;

const MAX_COUNT = 1000;
const DEFAULT_COUNT = 1;
const DATE_RANGE = 90 * 24 * 60 * 60 * 1000; // ~ 3 месяца

const generatePost = ({ titles, sentences, categories }) => ({
  title: titles[getRandomInt(0, titles.length - 1)],
  createdDate: getRandomDate(DATE_RANGE),
  announce: shuffle(sentences).slice(0, getRandomInt(1, 5)),
  fullText: shuffle(sentences).slice(0, getRandomInt(1, sentences.length)),
  category: shuffle(categories).slice(0, getRandomInt(1, categories.length)),
});

const generatePosts = (count, mocks) => Array(count).fill({}).map(() => generatePost(mocks));

module.exports = {
  name: `--generate`,
  async run(args) {
    const [count] = args;
    const postsCount = Number.parseInt(count, 10) || DEFAULT_COUNT;
    const titles = await readMocks(TITLE_MOCKS_PATH);
    const sentences = await readMocks(SENTENCE_MOCKS_PATH);
    const categories = await readMocks(CATEGORY_MOCKS_PATH);

    if (postsCount > MAX_COUNT) {
      throw new Error(`Не больше 1000 публикаций`);
    }

    const content = JSON.stringify(generatePosts(postsCount, { titles, sentences, categories }));

    try {
      await fs.promises.writeFile(FILE_NAME, content);
      console.log(chalk.green(`Operation success. File created.`));
    } catch (error) {
      console.log(chalk.red(`Can't write data to file...`));
      throw error;
    }
  }
};
