'use strict';

import { start } from '../lib/watch';

export const dependencies = [ 'runTests' ];

export const run = function(options, cb) {
  start(options);
  cb();
};
