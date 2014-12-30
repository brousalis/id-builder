// Generated by LiveScript 1.3.1
var async, fs, idDebug, lsr, mkdirp, path, preludeLs, logging, map, reject, filter, debug, info, warning, error, getFiles, getDirectories, getTargetPath, readFile, writeFile, ensureFileDirectory, compileFile, compileAllFiles, out$ = typeof exports != 'undefined' && exports || this;
async = require('async');
fs = require('fs');
idDebug = require('id-debug');
lsr = require('lsr');
mkdirp = require('mkdirp');
path = require('path');
preludeLs = require('prelude-ls');
logging = require("./logging");
map = preludeLs.map, reject = preludeLs.reject, filter = preludeLs.filter;
debug = idDebug.debug, info = idDebug.info, warning = idDebug.warning, error = idDebug.error;
out$.getFiles = getFiles = function(path, cb){
  lsr(path, function(error, nodes){
    var paths;
    if (error) {
      return cb(error);
    }
    paths = map(function(it){
      return it.fullPath;
    })(
    filter(function(it){
      return it.isFile();
    })(
    nodes));
    cb(null, paths);
  });
};
out$.getDirectories = getDirectories = function(path, cb){
  lsr(path, function(error, nodes){
    if (error) {
      return cb(error);
    }
    map(function(it){
      return it.fullPath;
    })(
    filter(function(it){
      return it.isDirectory();
    })(
    cb(null, nodes)));
  });
};
out$.getTargetPath = getTargetPath = curry$(function(sourceDirectory, targetDirectory, sourceExtension, targetExtension, sourcePath){
  return sourcePath.replace(sourceDirectory, targetDirectory).replace(RegExp('\\.' + sourceExtension + '$'), "." + targetExtension);
});
out$.readFile = readFile = function(path, cb){
  fs.readFile(path, function(error, chunk){
    if (error) {
      return cb(error);
    }
    cb(null, chunk.toString());
  });
};
out$.writeFile = writeFile = function(path, string, cb){
  fs.writeFile(path, string, cb);
};
out$.ensureFileDirectory = ensureFileDirectory = curry$(function(targetFilePath, cb){
  mkdirp(path.dirname(targetFilePath), cb);
});
out$.compileFile = compileFile = curry$(function(compileChunk, options, sourceFilePath, targetFilePath, cb){
  readFile(sourceFilePath, function(error, fileContent){
    if (error) {
      return cb(error);
    }
    compileChunk(options, fileContent, function(error, compiledChunk){
      if (error) {
        return cb(error);
      }
      ensureFileDirectory(targetFilePath, function(error){
        if (error) {
          return cb(error);
        }
        writeFile(targetFilePath, compiledChunk, function(error){
          if (error) {
            return cb(error);
          }
          logging.taskInfo(options.taskName, "`" + sourceFilePath + "` => `" + targetFilePath + "`");
          cb(null);
        });
      });
    });
  });
});
out$.compileAllFiles = compileAllFiles = curry$(function(sourceFilePathMatches, compileFile, sourceExtension, targetExtension, options, cb){
  var this$ = this;
  getFiles(options.sourcePath, function(error, sourceFilePaths){
    var paths, iteratePath;
    if (error) {
      return cb();
    }
    paths = filter(sourceFilePathMatches(options), sourceFilePaths);
    iteratePath = function(currentSourceFilePath, cb){
      var currentTargetFilePath;
      currentTargetFilePath = getTargetPath(options.sourcePath, options.targetPath, sourceExtension, targetExtension, currentSourceFilePath);
      compileFile(options, currentSourceFilePath, currentTargetFilePath, cb);
    };
    async.each(paths, iteratePath, cb);
  });
});
function curry$(f, bound){
  var context,
  _curry = function(args) {
    return f.length > 1 ? function(){
      var params = args ? args.concat() : [];
      context = bound ? context || this : this;
      return params.push.apply(params, arguments) <
          f.length && arguments.length ?
        _curry.call(context, params) : f.apply(context, params);
    } : f;
  };
  return _curry();
}