'use strict';

import { exists, createWriteStream, writeFile } from 'fs';
import { resolve } from 'path';

import browserify from 'browserify';
import watchify from 'watchify';

import { ensureFileDirectory } from './fileSystem';
import { taskInfo } from './logging';

export const sourceExtension = 'coffee';
export const targetExtension = 'js';

// TODO: Find a better way to match paths then just on all writes.. e.g. to
// discern wether a file is in a bundle so a recompile is needed.
export const sourceFilePathMatches = function(options, sourceFilePath) {
  const resolvedSourceDirectoryPath = resolve(options.sourceDirectory);
  const resolvedSourceFilePath = resolve(sourceFilePath);
  const resolvedTargetPath = resolve(options.targetPath);

  if (resolvedSourceFilePath === resolvedTargetPath) {
    return false;
  } else if (resolvedSourceFilePath.indexOf(resolvedSourceDirectoryPath) === 0) {
    return true;
  }  else {
    return false;
  }
};

export const compileAllFiles = function(options, cb) {
  exists(options.sourcePath, function(exists) {
    if (!exists) {
      taskInfo(options.taskName, `skipping ${options.sourcePath} (Does not exist)`);
      return cb();
    }

    ensureFileDirectory(options.targetPath, function(e) {
      if (e) {
        return cb(e);
      }

      const b = browserify({
        cache: {},
        debug: true,
        fullPaths: true,
        packageCache: {}
      });

      b.add(resolve(options.sourcePath));

      b.on('bundle', function(bundleStream) {
        let data = '';

        bundleStream.on('data', function(d) {
          data += d;
        });

        bundleStream.on('end', function(d) {
          writeFile(options.targetPath, data, function(e) {
            if (e) {
              return cb(e);
            }

            taskInfo(options.taskName, `${options.sourcePath} => ${options.targetPath}`);
            cb();
          });
        });
      });

      b.bundle();
    });
  });
};

export const watch = function(options, cb) {
  exists(options.sourcePath, function(exists) {
    if (!exists) {
      taskInfo(options.taskName, `skipping ${options.sourcePath} (Does not exist)`);
      return cb();
    }

    ensureFileDirectory(options.targetPath, function(e) {
      if (e) {
        return cb(e);
      }
      const b = browserify({
        cache: {},
        debug: true,
        fullPaths: true,
        packageCache: {}
      });

      b.add(resolve(options.sourcePath));

      b.on('bundle', function(bundleStream) {
        let data = '';

        bundleStream.on('data', function(d) {
          data += d;
        });

        bundleStream.on('end', function(d) {
          writeFile(options.targetPath, data, function(e) {
            if (e) {
              return cb(e);
            }

            taskInfo(options.taskName, `${options.sourcePath} => ${options.targetPath}`);
          });
        });
      });

      const w = watchify(b);

      w.on('update', function() {
        b.bundle()
      });

      b.bundle();
    });
  });
};
