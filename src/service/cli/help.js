'use strict';

const chalk = require(`chalk`);

const message = `Программа запускает http-сервер и формирует файл с данными для API.

    Гайд:
    server <command>

    Команды:
    --version:            выводит номер версии
    --help:               печатает этот текст
    --generate <count>    формирует файл mocks.json`;

module.exports = {
  name: `--help`,
  async run() {
    console.info(chalk.gray(message));
  }
};
