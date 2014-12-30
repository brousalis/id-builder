// Generated by LiveScript 1.3.1
var async, idDebug, preludeLs, stylus, debug, error, info, warning, each, map, dependencies, run, out$ = typeof exports != 'undefined' && exports || this;
async = require('async');
idDebug = require('id-debug');
preludeLs = require('prelude-ls');
stylus = require("../lib/stylus");
debug = idDebug.debug, error = idDebug.error, info = idDebug.info, warning = idDebug.warning;
each = preludeLs.each, map = preludeLs.map;
out$.dependencies = dependencies = ["clean"];
out$.run = run = function(options, cb){
  stylus.compileAllFiles(options, function(error){
    if (error) {
      return cb(error);
    }
    cb();
  });
};