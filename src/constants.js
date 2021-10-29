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
    noContent: 204,
    notFound: 404,
    badRequest: 400,
  },
  MAX_ID_LENGTH: 6,
  MAX_COMMENTS: 4,
  API_PREFIX: `/api`,
};
