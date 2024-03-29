'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _chalk = require('chalk');

var _chalk2 = _interopRequireDefault(_chalk);

var _loglevel = require('loglevel');

var _loglevel2 = _interopRequireDefault(_loglevel);

var arrowCharacter = '→';
var okCharacter = '✓';
var warningCharacter = '✗';

function taskInfo(task, message) {
  _loglevel2['default'].info('  ' + task + ' ' + _chalk2['default'].grey(message));
}

function taskWarn(task, message) {
  _loglevel2['default'].warn(_chalk2['default'].yellow(arrowCharacter) + ' ' + task + ': ' + message);
}

function taskError(task, message) {
  _loglevel2['default'].error(_chalk2['default'].red(arrowCharacter) + ' ' + task + ': ' + message);
}

function disabledTask(name) {
  _loglevel2['default'].warn(_chalk2['default'].yellow(warningCharacter) + ' ' + name);
}

function startTask(name) {
  _loglevel2['default'].info(_chalk2['default'].grey(arrowCharacter) + ' ' + name);
}

function skipTask(name) {
  _loglevel2['default'].info(_chalk2['default'].grey(okCharacter) + ' ' + name);
}

function finishTask(name) {
  _loglevel2['default'].info(_chalk2['default'].green(okCharacter) + ' ' + _chalk2['default'].green(name));
}

exports['default'] = {
  arrowCharacter: arrowCharacter,
  okCharacter: okCharacter,
  warningCharacter: warningCharacter,

  taskInfo: taskInfo,
  taskWarn: taskWarn,
  taskError: taskError,
  disabledTask: disabledTask,
  startTask: startTask,
  skipTask: skipTask,
  finishTask: finishTask
};
module.exports = exports['default'];