'use strict';

const fs = require('fs');
const {Cli} = require(`./cli`);
const {
  ERROR_LOG_FILENAME,
  DEFAULT_COMMAND,
  USER_ARGV_INDEX,
  ExitCode
} = require(`../constants`);
const chalk = require('chalk');


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

try {
  Cli[commandToRun].run(commandArgs);
} catch (error) {
  fs.appendFileSync(ERROR_LOG_FILENAME, `${(new Date()).toISOString()}: ${error.stack}\n`);
  console.log(chalk.red(`${error.message}\nlog file: ${ERROR_LOG_FILENAME}`));
  process.exit(ExitCode.failure);
}
