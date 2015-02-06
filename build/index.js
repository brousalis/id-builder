// Generated by LiveScript 1.3.1
var async, preludeLs, moment, each, keys, fold1, defaultOptions, logging, parseOptions, logInfo, runTaskWithOptions;
async = require('async');
preludeLs = require('prelude-ls');
moment = require('moment');
each = preludeLs.each, keys = preludeLs.keys, fold1 = preludeLs.fold1;
defaultOptions = require("./lib/default-options");
logging = require("./lib/logging");
parseOptions = require("./lib/parse-options");
logInfo = function(message){
  return console.log(moment().format() + " " + message);
};
runTaskWithOptions = curry$(function(options, task, name, cb){
  var taskOptions;
  taskOptions = options != null ? options.tasks[name] : void 8;
  if (!taskOptions) {
    return cb("No options found for task `" + taskOptions + "`.");
  }
  if (!taskOptions.enabled) {
    logging.disabledTask(name);
    return cb();
  }
  taskOptions.taskName = name;
  logging.startTask(name);
  task.run(taskOptions, function(error){
    if (error) {
      return cb(error);
    }
    logging.finishTask(name);
    cb();
  });
});
module.exports = function(inputOptions, cb){
  var tasks, autoTasks, i$;
  inputOptions == null && (inputOptions = {});
  global.options = parseOptions(defaultOptions, inputOptions);
  tasks = require("./tasks");
  autoTasks = {};
  for (i$ in tasks) {
    (fn$.call(this, i$, tasks[i$]));
  }
  return async.auto(autoTasks, function(error, results){
    if (error) {
      return cb(error);
    }
  });
  function fn$(k, v){
    autoTasks[k] = v.dependencies.concat(runTaskWithOptions(global.options, v, k));
  }
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