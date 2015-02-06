// Generated by LiveScript 1.3.1
var async, preludeLs, tests, each, map, dependencies, run, out$ = typeof exports != 'undefined' && exports || this;
async = require('async');
preludeLs = require('prelude-ls');
tests = require("../lib/tests");
each = preludeLs.each, map = preludeLs.map;
out$.dependencies = dependencies = ['compileBrowserify', 'compileCoffeescript', 'compileCopy', 'compileJade', 'compileLess', 'compileLivescript', 'compileStylus'];
out$.run = run = function(options, cb){
  tests.runTests(options, cb);
};