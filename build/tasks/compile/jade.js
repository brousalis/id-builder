// Generated by LiveScript 1.3.1
var fs, path, jade, mkdirp, async, lsr, ref$, map, filter, compileChunk, compileFile, compileAllFiles, out$ = typeof exports != 'undefined' && exports || this;
fs = require("fs");
path = require("path");
jade = require("jade");
mkdirp = require("mkdirp");
async = require("async");
lsr = require("lsr");
ref$ = require("prelude-ls"), map = ref$.map, filter = ref$.filter;
out$.compileChunk = compileChunk = function(chunk, cb){
  var error;
  try {
    cb(null, jade.compileClient(chunk, {
      compileDebug: false
    }));
  } catch (e$) {
    error = e$;
    return cb(error);
  }
};
out$.compileFile = compileFile = function(sourcePath, targetPath, cb){
  fs.readFile(sourcePath, function(error, chunk){
    if (error) {
      return cb(error);
    }
    compileChunk(chunk.toString(), function(error, compiledChunk){
      var targetPathDirectory;
      if (error) {
        return cb(error);
      }
      targetPathDirectory = path.dirname(targetPath);
      mkdirp(targetPathDirectory, function(error){
        if (error) {
          return cb(error);
        }
        fs.writeFile(targetPath, compiledChunk, function(error){
          if (error) {
            return cb(error);
          }
          cb(null);
        });
      });
    });
  });
};
out$.compileAllFiles = compileAllFiles = function(sourcePath, targetPath, cb){
  var this$ = this;
  lsr(sourcePath, function(error, nodes){
    var paths, iteratePath;
    if (error) {
      return cb(error);
    }
    paths = filter(function(it){
      return it.match(/\.jade/);
    })(
    map(function(it){
      return it.fullPath;
    }, nodes));
    iteratePath = function(currentSourcePath, cb){
      var currentTargetPath;
      currentTargetPath = currentSourcePath.replace(sourcePath, targetPath).replace(".jade", ".js");
      compileFile(currentSourcePath, currentTargetPath, cb);
    };
    async.each(paths, iteratePath, function(error){
      if (error) {
        return cb(error);
      }
      cb(null);
    });
  });
};