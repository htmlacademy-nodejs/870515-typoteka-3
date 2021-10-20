'use strict';

module.exports = {
  DEFAULT_COMMAND: `--help`,
  USER_ARGV_INDEX: 2,
  ExitCode: {
    success: 0,
    failure: 1,
  },
  HttpStatus: {
    ok: 200,
    created: 201,
    notFound: 404,
  },
  MAX_ID_LENGTH: 6,
  MAX_COMMENTS: 4,
  API_PREFIX: `/api`,
};
