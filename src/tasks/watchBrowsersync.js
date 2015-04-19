'use strict';

import { sourceFilePathMatches, reload } from '../lib/browsersync';
import log from 'loglevel';
import { getWatcher } from '../lib/watch';
import { removePath } from '../lib/fileSystem'

const dependencies = [
  'watch'
];

const handleAdd = function(options, path, stat) {
  if (path.match(/\.js$/) && global.options.tasks.watchBrowserify.targetPath !== path) {
    // Only reload if it's the bundle when the file is a JavaScript file.
    return;
  } else if (!sourceFilePathMatches(options, path)) {
    // Only reload when needed if it isn't a js file.
    return;
  }

  reload(options, path, function(e) {
    if (e) {
      log.error(e);
    }
  });
};

const handleAddDir = function(options, path, stat) {
  if (path.match(/\.js$/) && global.options.tasks.watchBrowserify.targetPath !== path) {
    // Only reload if it's the bundle when the file is a JavaScript file.
    return;
  } else if (!sourceFilePathMatches(options, path)) {
    // Only reload when needed if it isn't a js file.
    return;
  }

  // TODO: Something?
};

const handleChange = function(options, path, stat) {
  log.debug('watchBrowserSync.handleChange', path, options, stat);

  if (path.match(/\.js$/) && global.options.tasks.watchBrowserify.targetPath !== path) {
    // Only reload if it's the bundle when the file is a JavaScript file.
    return;
  } else if (!sourceFilePathMatches(options, path)) {
    // Only reload when needed if it isn't a js file.
    return;
  }

  log.debug('watchBrowserSync.handleChange MATCH!!!', path, options, stat);

  reload(options, path, function(e) {
    log.debug('watchBrowserSync.handleChange RELOADED', path, options, stat);

    if (e) {
      log.error(e);
    }
  });
};

const handleUnlink = function(options, path, stat) {
  if (path.match(/\.js$/) && global.options.tasks.watchBrowserify.targetPath !== path) {
    // Only reload if it's the bundle when the file is a JavaScript file.
    return;
  } else if (!sourceFilePathMatches(options, path)) {
    // Only reload when needed if it isn't a js file.
    return;
  }

  removePath(path, e => {
    if (e) {
      log.error(e);
    }
  });
};

const handleUnlinkDir = function(options, path, stat) {
  if (path.match(/\.js$/) && global.options.tasks.watchBrowserify.targetPath !== path) {
    // Only reload if it's the bundle when the file is a JavaScript file.
    return;
  } else if (!sourceFilePathMatches(options, path)) {
    // Only reload when needed if it isn't a js file.
    return;
  }

  removePath(path, e => {
    if (e) {
      log.error(e);
    }
  });
};

const handleError = function(options, e) {
  log.error(e);
};

const run = function(options, cb) {
  log.debug('watchBrowsersync.run', options);

  const watcher = getWatcher();

  watcher.on('all', function(...args) {
    log.debug('watchBrowsersync all: ', ...args);
  });

  watcher.on('ready', function() {
    watcher.on('add', function(path, stat) { handleAdd(options, path, stat); });
    watcher.on('addDir', function(path, stat) { handleAddDir(options, path, stat); });
    watcher.on('change', function(path, stat) { handleChange(options, path, stat); });
    watcher.on('unlink', function(path, stat) { handleUnlink(options, path, stat); });
    watcher.on('unlinkDir', function(path, stat) { handleUnlinkDir(options, path, stat); });
    watcher.on('error', function(path, stat) { handleError(options, path, stat); });
  });
};

export default {
  dependencies,
  run
};
