import logging from '../lib/logging';
import copy from '../lib/copy';
import watch from '../lib/watch';

const dependencies = [
  'watch'
];

function handlePath(options, path) {
  if (!copy.sourceFilePathMatches(options, path)) {
    return;
  }

  const targetPath = path
    .replace(options.sourceDirectoryPath, options.targetDirectoryPath);

  copy.copyFile(options, path, targetPath, e => {
    if (e) {
      logging.taskError(e);
    }
  });
}

function handleAdd(options, path) {
  handlePath(options, path);
}

// function handleAddDir(options, path) {
// }

function handleChange(options, path) {
  handlePath(options, path);
}

function run(options) {
  const watcher = watch.getWatcher();

  watcher.on('ready', () => {
    watcher.on('add', (path) => { handleAdd(options, path); });
    // watcher.on('addDir', (path) => { handleAddDir(options, path); });
    watcher.on('change', (path) => { handleChange(options, path); });
  });
}

export default {
  dependencies,
  run
};