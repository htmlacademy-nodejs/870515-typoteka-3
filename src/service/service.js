'use strict';

const {Cli} = require(`./cli`);
const {Logger} = require(`./logger`);
const {
  DEFAULT_COMMAND,
  USER_ARGV_INDEX,
  ExitCode
} = require(`../constants`);
const chalk = require(`chalk`);

const logger = new Logger({path: `./logs`});
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
    logger.log(error.stack);
    console.log(chalk.red(`${error.message}\nlog file: ${logger.getLogFileName()}`));
    process.exit(ExitCode.failure);
  });
