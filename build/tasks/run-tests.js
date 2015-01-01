// Generated by LiveScript 1.3.1
var async, idDebug, preludeLs, tests, debug, error, info, warning, each, map, dependencies, run, out$ = typeof exports != 'undefined' && exports || this;
async = require('async');
idDebug = require('id-debug');
preludeLs = require('prelude-ls');
tests = require("../lib/tests");
debug = idDebug.debug, error = idDebug.error, info = idDebug.info, warning = idDebug.warning;
each = preludeLs.each, map = preludeLs.map;
out$.dependencies = dependencies = ['compileBrowserify', 'compileCoffeescript', 'compileCopy', 'compileJade', 'compileLess', 'compileLivescript', 'compileStylus'];
out$.run = run = function(options, cb){
  tests.runTests(options, cb);
};