'use strict';

var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj['default'] : obj; };

var _log = require('loglevel');

var log = _interopRequire(_log);

var _expect = require('chai');

var _mkdirp = require('mkdirp');

var mkdirp = _interopRequire(_mkdirp);

var _rimraf = require('rimraf');

var rimraf = _interopRequire(_rimraf);

var _import = require('../build/../../../lib/browserify');

var browserify = _interopRequireWildcard(_import);

var _randomString = require('../build/../../../lib/tests');

describe('browserify', function () {
  beforeEach(function (cb) {
    this.directoryPath = '.tmp/' + _randomString.randomString();

    mkdirp(this.directoryPath, cb);
  });

  afterEach(function (cb) {
    rimraf(this.directoryPath, cb);
  });

  describe('sourceExtension', function () {
    it('should be defined', function (cb) {
      _expect.expect(browserify.sourceExtension).to.be.a('string')['with'].length.above(0);

      cb();
    });
  });

  describe('targetExtension', function () {
    it('should be defined', function (cb) {
      _expect.expect(browserify.targetExtension).to.be.a('string')['with'].length.above(0);

      cb();
    });
  });

  describe('pathReloads(options, path)', function () {});

  describe('sourceFilePathMatches', function () {
    describe('when the `sourceFilePath` is the `targetPath`', function () {
      it('should return `false`', function (cb) {
        var options = {
          targetPath: 'x/y.js',
          sourceDirectory: 'x'
        };

        _expect.expect(browserify.sourceFilePathMatches(options, 'x/y.js')).to.equal(false);

        cb();
      });
    });

    describe('when the `sourceFilePath` is in the the `sourceDirectory`', function () {
      it('should return `true`', function (cb) {
        var options = {
          targetPath: 'x/y.js',
          sourceDirectory: 'x'
        };

        _expect.expect(browserify.sourceFilePathMatches(options, 'x/q.js')).to.equal(true);

        cb();
      });
    });

    describe('when the `sourceFilePath` is not in the the `sourceDirectory`', function () {
      it('should return `false`', function (cb) {
        var options = {
          targetPath: 'x/q.js',
          sourceDirectory: 'a'
        };

        _expect.expect(browserify.sourceFilePathMatches(options, 'x/q.js')).to.equal(false);

        cb();
      });
    });
  });

  describe('compileAllFiles', function () {});

  describe('watch', function () {});
});