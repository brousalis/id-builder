"use strict";

var stylus = require("stylus");
var async = require("async");
var fileSystem = require("./fileSystem");
var logging = require("./logging");

var sourceExtension = "styl";
var targetExtension = "css";

var sourceFilePathMatches = function (options, sourceFilePath) {
  return sourceFilePath.match(RegExp("^" + options.sourcePath + ".+." + sourceExtension + "$"));
};

var compileChunk = function (options, chunk, cb) {
  stylus.render(chunk, cb);
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