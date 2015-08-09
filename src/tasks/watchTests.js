import logging from '../lib/logging';
import tests from '../lib/tests';
import watch from '../lib/watch';

const dependencies = [
  'runTests',
  'watch'
];

const handlePath = function(options, path, stat) {
  if (!tests.buildFilePathMatches(options, path)) {
    return;
  }

  tests.runTests(options, e => {
    if (e) {
      logging.taskError(e);
    }
  });
};

const handleAdd = function(options, path, stat) {
  handlePath(options, path, stat);
};

const handleAddDir = function(options, path, stat) {
  handlePath(options, path, stat);
};

const handleChange = function(options, path, stat) {
  handlePath(options, path, stat);
};

const handleUnlink = function(options, path, stat) {
  handlePath(options, path, stat);
};

const handleUnlinkDir = function(options, path, stat) {
  handlePath(options, path, stat);
};

const handleError = function(options, e) {
  logging.taskError(e);
};

const run = function(options, cb) {
  const watcher = watch.getWatcher();

  watcher.on('ready', () => {
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
