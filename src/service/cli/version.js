const packageJsonFile = require(`../../../package.json`);
const chalk = require('chalk');

module.exports = {
  name: `--version`,
  async run() {
    const version = packageJsonFile.version;
    console.info(chalk.blue(version));
  }
};
