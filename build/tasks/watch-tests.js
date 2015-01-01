// Generated by LiveScript 1.3.1
var idDebug, tests, watch, debug, dependencies, handlePath, handleAdd, handleAddDir, handleChange, handleUnlink, handleUnlinkDir, handleError, run, out$ = typeof exports != 'undefined' && exports || this;
idDebug = require('id-debug');
tests = require("../lib/tests");
watch = require("../lib/watch");
debug = idDebug.debug;
out$.dependencies = dependencies = ['runTests', 'watch'];
handlePath = curry$(function(options, path, stat){
  if (!tests.sourceFilePathMatches(options, path)) {
    return;
  }
  tests.runTests(options, function(error){
    if (error) {
      idDebug.error(error);
    }
  });
});
handleAdd = curry$(function(options, path, stat){
  handlePath(options, path, stat);
});
handleAddDir = curry$(function(options, path, stat){});
handleChange = curry$(function(options, path, stat){
  handlePath(options, path, stat);
});
handleUnlink = curry$(function(options, path, stat){});
handleUnlinkDir = curry$(function(options, path, stat){});
handleError = curry$(function(options, error){});
out$.run = run = function(options, cb){
  var watcher;
  watcher = watch.getWatcher();
  watcher.on("ready", function(){
    watcher.on("add", handleAdd(options));
    watcher.on("addDir", handleAddDir(options));
    watcher.on("change", handleChange(options));
    watcher.on("unlink", handleUnlink(options));
    watcher.on("unlinkDir", handleUnlinkDir(options));
    watcher.on("error", handleError(options));
  });
};
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