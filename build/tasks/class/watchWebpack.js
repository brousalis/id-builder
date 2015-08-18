'use strict';

var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _webpack = require('../lib/webpack');

var _webpack2 = _interopRequireWildcard(_webpack);

var dependencies = ['runTests'];

var run = _webpack2['default'].watchAllFiles;

exports['default'] = {
  dependencies: dependencies,
  run: run
};
module.exports = exports['default'];