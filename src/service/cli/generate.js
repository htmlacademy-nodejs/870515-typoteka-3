const {getRandomInt, shuffle} = require(`../../utils`);
const {
  TITLES,
  ANNOUNCES,
  CATEGORIES,
} = require(`../../data`);
const fs = require(`fs`);

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
  announce: shuffle(ANNOUNCES).slice(0, getRandomInt(1, 5)),
  fullText: shuffle(ANNOUNCES).slice(0, getRandomInt(1, ANNOUNCES.length)),
  category: shuffle(CATEGORIES).slice(0, getRandomInt(1, CATEGORIES.length)),
});

const generatePosts = (count) => Array(count).fill({}).map(() => generatePost());

module.exports = {
  name: `--generate`,
  run(args) {
    const [count] = args;
    const postsCount = Number.parseInt(count, 10) || DEFAULT_COUNT;

    if (postsCount > MAX_COUNT) {
      throw new Error(`Не больше 1000 публикаций`);
    }

    const content = JSON.stringify(generatePosts(postsCount));

    fs.writeFile(FILE_NAME, content, (err) => {
      if (err) {
        throw new Error(`Can't write data to file...`);
      }

      return console.info(`Operation success. File created.`);
    });
  }
};
