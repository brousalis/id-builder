'use strict';

import log from 'loglevel';
import { buildFilePathMatches, runTests } from '../lib/tests';
import { getWatcher } from '../lib/watch';

const dependencies = [
  'runTests',
  'watch'
];

const handlePath = (options, path, stat) => {
  if (!buildFilePathMatches(options, path)) {
    return;
  }

  runTests(options, (e) => {
    if (e) {
      console.error(e);
    }
  });
};

const handleAdd = (options, path, stat) => {
  handlePath(options, path, stat);
};

const handleAddDir = (options, path, stat) => {
  handlePath(options, path, stat);
};

const handleChange = (options, path, stat) => {
  handlePath(options, path, stat);
};

const handleUnlink = (options, path, stat) => {
  handlePath(options, path, stat);
};

const handleUnlinkDir = (options, path, stat) => {
  handlePath(options, path, stat);
};

const handleError = (options, e) => {
  console.error(e);
};

const run = (options, cb) => {
  const watcher = getWatcher();

  watcher.on('ready', function() {
    watcher.on('add', (path, stat) => { handleAdd(options, path, stat) });
    watcher.on('addDir', (path, stat) => { handleAddDir(options, path, stat) });
    watcher.on('change', (path, stat) => { handleChange(options, path, stat) });
    watcher.on('unlink', (path, stat) => { handleUnlink(options, path, stat) });
    watcher.on('unlinkDir', (path, stat) => { handleUnlinkDir(options, path, stat) });
    watcher.on('error', (path, stat) => { handleError(options, path, stat) });
  });
};

export default {
  dependencies,
  run
};
