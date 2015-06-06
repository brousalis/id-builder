'use strict';

var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };

var _fs = require('fs');

var _fs2 = _interopRequireWildcard(_fs);

var _log = require('loglevel');

var _log2 = _interopRequireWildcard(_log);

var _mkdirp = require('mkdirp');

var _mkdirp2 = _interopRequireWildcard(_mkdirp);

var _rimraf = require('rimraf');

var _rimraf2 = _interopRequireWildcard(_rimraf);

var _expect = require('chai');

var _fileSystem = require('../build/../../../lib/fileSystem');

var _fileSystem2 = _interopRequireWildcard(_fileSystem);

var _randomString = require('../build/../../../lib/tests');

var functionSource = 'const x = y => y * 2';

describe('fileSystem', function () {
  beforeEach(function (cb) {
    this.directoryPath = '.tmp/' + Math.random().toString(36).slice(7);

    _mkdirp2['default'](this.directoryPath, cb);
  });

  afterEach(function (cb) {
    _rimraf2['default'](this.directoryPath, cb);
  });

  describe('debug', function () {});

  describe('info', function () {});

  describe('warn', function () {});

  describe('error', function () {});

  describe('arrowCharacter', function () {});

  describe('taskInfo', function () {});

  describe('taskWarn', function () {});

  describe('taskError', function () {});

  describe('disabledTask', function () {});

  describe('startTask', function () {});

  describe('finishTask', function () {});
});