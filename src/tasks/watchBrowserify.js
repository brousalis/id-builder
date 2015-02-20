'use strict';

const browserify = require('../lib/browserify');
const watch = require('../lib/watch');

const dependencies = [
  'watch'
];

const handlePath = function(options, path, stat) {
  if (!browserify.sourceFilePathMatches(options, path)) {
    return;
  }

  browserify.compileAllFiles(options, function(e) {
    if (e) {
      console.error(e);
    }
  })
};

const handleAdd = function(options, path, stat) {
  handlePath(options, path, stat);
};

const handleAddDir = function(options, path, stat) {
};

const handleChange = function(options, path, stat) {
  handlePath(options, path, stat);
};

const handleUnlink = function(options, path, stat) {
};

const handleUnlinkDir = function(options, path, stat) {
};

const handleError = function(options, e) {
  console.error(e);
};

const run = function(options, cb) {
  browserify.watch(options, cb);
};

export default {
  dependencies: dependencies,
  run: run
};
