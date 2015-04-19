'use strict';

import { readFile, writeFile } from 'fs';

import _ from 'lodash';
import { each } from 'async';
import lsr from 'lsr';

import babel from './babel';
import browserify from './browserify';
import coffeescript from './coffeescript';
import fileSystem from './fileSystem';
import less from './less';
import livescript from './livescript';
import log from './log';
import stylus from './stylus';

const sourceFilePathMatches = function(options, sourceFilePath) {
  const globalOptions = global.options;

  let result;

  if (browserify.sourceFilePathMatches(globalOptions.tasks.compileBrowserify, sourceFilePath)) {
    result = false;
  } else if (coffeescript.sourceFilePathMatches(globalOptions.tasks.compileCoffeescript, sourceFilePath)) {
    result = false;
  //} else if (jade.sourceFilePathMatches(globalOptions.tasks.compileJade, sourceFilePath)) {
  //  result = false;
  } else if (less.sourceFilePathMatches(globalOptions.tasks.compileLess, sourceFilePath)) {
    result = false;
  } else if (livescript.sourceFilePathMatches(globalOptions.tasks.compileLivescript, sourceFilePath)) {
    result = false;
  } else if (babel.sourceFilePathMatches(globalOptions.tasks.compileBabel, sourceFilePath)) {
    result = false;
  } else if (stylus.sourceFilePathMatches(globalOptions.tasks.compileStylus, sourceFilePath)) {
    result = false;
  } else if (sourceFilePath && !!sourceFilePath.match(RegExp(`^${options.sourcePath}`))) {
    result = true;
  } else {
    result = false;
  }

  return result;
};

const copyFile = function(options, sourceFilePath, targetFilePath, cb) {
  log.debug('copy.copyFile', sourceFilePath, targetFilePath);

  readFile(sourceFilePath, function(e, readChunk){
    if (e) {
      return cb(e);
    }

    fileSystem.ensureFileDirectory(targetFilePath, function(e){
      if (e) {
        return cb(e);
      }

      writeFile(targetFilePath, readChunk, function(e){
        if (e) {
          return cb(e);
        }

        log.taskInfo(options.taskName, `${sourceFilePath} => ${targetFilePath}`);

        cb(null);
      });
    });
  });
};

const copyAllFiles = function(options, cb) {
  log.debug('copy.copyAllFiles', options.sourcePath);

  lsr(options.sourcePath, function(e, nodes){
    if (e) {
      return cb(e);
    }

    const paths = _(nodes)
      .filter(function(v) {
        return !v.isDirectory() && sourceFilePathMatches(options, v.fullPath);
      })
      .map(function(v) {
        return v.fullPath;
      })
      .value();

    const iteratePath = function(currentSourceDirectoryPath, cb){
      const currentTargetDirectoryPath = currentSourceDirectoryPath.replace(options.sourcePath, options.targetPath);

      copyFile(options, currentSourceDirectoryPath, currentTargetDirectoryPath, cb);
    };

    each(paths, iteratePath, function(e){
      if (e) {
        return cb(e);
      }

      cb(null);
    });
  });
};

export default {
  sourceFilePathMatches,
  copyFile,
  copyAllFiles
};
