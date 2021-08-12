const fs = require(`fs`);
const { resolve } = require(`path`);
const chalk = require('chalk');

const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};


const shuffle = (someArray) => {
  for (let i = someArray.length - 1; i > 0; i--) {
    const randomPosition = Math.floor(Math.random() * i);
    [someArray[i], someArray[randomPosition]] = [someArray[randomPosition], someArray[i]];
  }

  return someArray;
};

const getRandomDate = (range) => {
  const endTimestamp = Date.now();
  const startTimestamp = Date.now() - range;

  return new Date(getRandomInt(startTimestamp, endTimestamp));
};

const readMocks = async (filename) => {
  try {
    const mocks = await fs.promises.readFile(resolve(filename), 'utf8');
    return mocks
      .split('\n')
      .map((mock) => mock.trim())
      .filter((mock) => Boolean(mock));
  } catch (err) {
    console.error(chalk.red(err));
    return [];
  }
}


module.exports = {
  getRandomInt,
  shuffle,
  readMocks,
  getRandomDate,
};
