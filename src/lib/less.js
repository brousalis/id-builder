'use strict';

import less from 'less';

import log from './log';
import fileSystem from './fileSystem';

const sourceExtension = 'less';
const targetExtension = 'css';

const sourceFilePathMatches = (options, sourceFilePath) => {
  const result = !!sourceFilePath.match(new RegExp(`^${options.sourceDirectory}.+\.${sourceExtension}$`))

  return result;
};

const compileChunk = (options, chunk, cb) => {
  log.debug('less.compileChunk', options.sourcePath);

  const renderOptions = {
    filename: options.sourcePath
  };

  less.render(chunk, renderOptions, (e, result) => {
    if (e) {
      return cb(e);
    }

    return cb(null, result.css);
  });
};

const compileFile = fileSystem.compileFile(compileChunk);

const compileAllFiles = fileSystem.compileAllFiles(sourceFilePathMatches, compileFile, sourceExtension, targetExtension);

export default {
  sourceExtension,
  targetExtension,
  sourceFilePathMatches,
  compileChunk,
  compileFile,
  compileAllFiles
};
