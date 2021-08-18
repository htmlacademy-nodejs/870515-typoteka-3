const fs = require('fs');

class Logger {
  constructor({ path }) {
    this.config = {
      path: '.',
      logPrefix: 'error',
    };

    if (path) {
      this.config.path = path;
    }

    this.logDate = new Date();

    if (fs.existsSync(this.config.path) === false) {
      fs.mkdirSync(this.config.path);
    }
  }

  log(msg) {
    fs.appendFileSync(`${this.config.path}/${this.getLogFileName()}`, `${this.logDate.toISOString()}: ${msg}\n`);
  }

  getLogFileName() {
    return `${this.config.logPrefix}-${this.logDate.getDate()}-${this.logDate.getMonth() + 1}-${this.logDate.getFullYear()}.log`;
  }
}

module.exports = {
  Logger,
}
