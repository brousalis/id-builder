'use strict';

import log from 'loglevel';

import coffeescript from '../lib/coffeescript';
import { getWatcher } from '../lib/watch';
import { removePath } from '../lib/fileSystem'

const dependencies = [
  'watch'
]

const handleAdd = (options, path, stat) => {
  if (!coffeescript.sourceFilePathMatches(options, path)) {
    return;
  }

  const targetPath = path
    .replace(options.sourcePath, options.targetPath)
    .replace(`.${coffeescript.sourceExtension}`, `.${coffeescript.targetExtension}`);

  coffeescript.compileFile(options, path, targetPath, (e) => {
    if (e) {
      log.error(e);
    }
  });
};

const handleAddDir = (options, path, stat) => {
  if (!matches(path)) {
    return;
  }

  coffeescript.compileAllFiles({ sourcePath: path }, e => {
    if (e) {
      log.error(e);
    }
  });
};

const handleChange = (options, path, stat) => {
  if (!matches(path)) {
    return;
  }

  const targetPath = path
    .replace(options.sourcePath, options.targetPath)
    .replace(`.${coffeescript.sourceExtension}`, `.${coffeescript.targetExtension}`);

  coffeescript.compileFile(options, path, targetPath, (e) => {
    if (e) {
      log.error(e);
    }
  });
};

const handleUnlink = (options, path, stat) => {
  if (!matches(path)) {
    return;
  }

  removePath(path, e => {
    if (e) {
      log.error(e);
    }
  });
};

const handleUnlinkDir = (options, path, stat) => {
  if (!matches(path)) {
    return;
  }

  removePath(path, e => {
    if (e) {
      log.error(e);
    }
  });
};

const handleError = (options, e) => {
  if (!matches(path)) {
    return;
  }

  log.error(e);
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
