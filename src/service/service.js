'use strict';

const {Cli} = require(`./cli`);
const {getLogger} = require(`./lib/logger`);
const logger = getLogger({name: `console`});
const {
  DEFAULT_COMMAND,
  USER_ARGV_INDEX,
  ExitCode
} = require(`../constants`);
const chalk = require(`chalk`);

const userArguments = process.argv.slice(USER_ARGV_INDEX);
const [userCommand] = userArguments;

let commandToRun;
let commandArgs;

if (!userCommand || userArguments.length === 0 || !Cli[userCommand]) {
  commandToRun = DEFAULT_COMMAND;
  commandArgs = [];
} else {
  commandToRun = userCommand;
  commandArgs = userArguments.slice(1);
}

Cli[commandToRun].run(commandArgs)
  .catch((error) => {
    logger.error(chalk.red(error));
    process.exit(ExitCode.failure);
  });
