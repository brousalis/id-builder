"use strict";

var path = require("path");

var _ = require("lodash");
var sixToFive = require("6to5");

var fileSystem = require("./fileSystem");
var logging = require("./logging");

var sourceExtension = "js";
var targetExtension = "js";

var sourceFilePathMatches = function (options, sourceFilePath) {
  return sourceFilePath.match(new RegExp("^" + options.sourcePath + ".+." + sourceExtension + "$"));
};

var compileChunk = function (options, chunk, cb) {
  var sixToFiveOptions = {};

  try {
    var output = sixToFive.transform(chunk, sixToFiveOptions);

    cb(null, output.code);
  } catch (e) {
    return cb(e);
  }
};

var compileFile = fileSystem.compileFile(compileChunk);

var compileAllFiles = fileSystem.compileAllFiles(sourceFilePathMatches, compileFile, sourceExtension, targetExtension);

module.exports = {
  sourceExtension: sourceExtension,
  targetExtension: targetExtension,

  sourceFilePathMatches: sourceFilePathMatches,
  compileChunk: compileChunk,
  compileFile: compileFile,
  compileAllFiles: compileAllFiles
};
// filename:
// filenameRelative:
// blacklist:
// whitelist:
// loose:
// optional:
// modules:
// sourceMap:
// sourceMapName:
// sourceFileName:
// sourceRoot:
// moduleRoot:
// moduleIds:
// comments:
// keepModuleIdExtensions:
// runtime:
// code:
// ast:
// format: {
//   parenteses:
//   comments:
//   compact:
//   indent: {
//     adjustMultilineComment:
//     style:
//     base:
//   }
// }
// playground:
// experimental: