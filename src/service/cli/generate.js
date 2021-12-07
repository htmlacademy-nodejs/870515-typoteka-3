'use strict';

const fs = require(`fs`);
const chalk = require(`chalk`);
const {nanoid} = require(`nanoid`);

const {getRandomInt, shuffle, readMocks, getRandomDate} = require(`../../utils`);
const {MAX_ID_LENGTH, MAX_COMMENTS, ExitCode} = require(`../../constants`);
const {getLogger} = require(`../lib/logger`);
const logger = getLogger({name: `console`});

const FILE_NAME = `mocks.json`;
const TITLE_MOCKS_PATH = `src/data/titles.txt`;
const SENTENCE_MOCKS_PATH = `src/data/sentences.txt`;
const CATEGORY_MOCKS_PATH = `src/data/categories.txt`;
const COMMENTS_MOCKS_PATH = `src/data/comments.txt`;

const MAX_COUNT = 1000;
const DEFAULT_COUNT = 1;
const DATE_RANGE = 90 * 24 * 60 * 60 * 1000; // ~ 3 месяца

const generateComments = (count, comments) => (
  Array(count).fill({}).map(() => ({
    id: nanoid(MAX_ID_LENGTH),
    text: shuffle(comments)
      .slice(0, getRandomInt(1, 3))
      .join(` `),
  }))
);

const generatePost = ({titles, sentences, categories, comments}) => ({
  id: nanoid(MAX_ID_LENGTH),
  title: titles[getRandomInt(0, titles.length - 1)],
  createdDate: getRandomDate(DATE_RANGE),
  announce: shuffle(sentences).slice(0, getRandomInt(1, 5)).join(``),
  fullText: shuffle(sentences).slice(0, getRandomInt(1, sentences.length)).join(``),
  category: shuffle(categories).slice(0, getRandomInt(1, categories.length)),
  comments: generateComments(getRandomInt(1, MAX_COMMENTS), comments),
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
    const comments = await readMocks(COMMENTS_MOCKS_PATH);

    if (postsCount > MAX_COUNT) {
      throw new Error(`Не больше 1000 публикаций`);
    }

    const content = JSON.stringify(generatePosts(postsCount, {titles, sentences, categories, comments}));

    try {
      await fs.promises.writeFile(FILE_NAME, content);
      logger.info(chalk.green(`Operation success. File created.`));
    } catch (error) {
      logger.error(chalk.red(`Can't write data to file...`));
      process.exit(ExitCode.failure)
    }
  }
};
