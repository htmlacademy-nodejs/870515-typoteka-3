'use strict';

const fs = require(`fs`).promises;
const FILENAME = `mocks.json`;
const {getLogger} = require(`../lib/logger`);
const chalk = require(`chalk`);
const logger = getLogger({name: `console`});

let data = [];

const getMockData = async () => {
  if (data.length > 0) {
    return data;
  }

  try {
    const fileContent = await fs.readFile(FILENAME);
    data = JSON.parse(fileContent);
  } catch (err) {
    logger.error(chalk.red(err));
    return (err);
  }

  return data;
};

module.exports = {
  getMockData,
};
