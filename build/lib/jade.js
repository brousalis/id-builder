// Generated by LiveScript 1.3.1
var jade, async, idDebug, debug, error, info, warning, fileSystem, logging, sourceExtension, targetExtension, sourceFilePathMatches, compileChunk, compileFile, compileAllFiles, out$ = typeof exports != 'undefined' && exports || this;
jade = require('jade');
async = require('async');
idDebug = require('id-debug');
debug = idDebug.debug, error = idDebug.error, info = idDebug.info, warning = idDebug.warning;
fileSystem = require("./file-system");
logging = require("./logging");
out$.sourceExtension = sourceExtension = "jade";
out$.targetExtension = targetExtension = "js";
out$.sourceFilePathMatches = sourceFilePathMatches = curry$(function(options, sourceFilePath){
  return sourceFilePath.match(RegExp('^' + options.sourcePath + '.+\\.' + sourceExtension + '$'));
});
out$.compileChunk = compileChunk = function(options, cb){
  var error;
  try {
    cb(null, jade.compileClient(chunk, {
      compileDebug: false,
      filename: sourceFilePath
    }));
  } catch (e$) {
    error = e$;
    return cb(error);
  }
};
out$.compileFile = compileFile = fileSystem.compileFile(compileChunk);
out$.compileAllFiles = compileAllFiles = fileSystem.compileAllFiles(sourceFilePathMatches, compileFile, sourceExtension, targetExtension);
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