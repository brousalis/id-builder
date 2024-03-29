'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x2, _x3, _x4) { var _again = true; _function: while (_again) { var object = _x2, property = _x3, receiver = _x4; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x2 = parent; _x3 = property; _x4 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _fs = require('fs');

var _path = require('path');

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _loglevel = require('loglevel');

var _loglevel2 = _interopRequireDefault(_loglevel);

var _mkdirp = require('mkdirp');

var _mkdirp2 = _interopRequireDefault(_mkdirp);

var _async = require('async');

var _Compiler = require('./Compiler');

var _Compiler2 = _interopRequireDefault(_Compiler);

var _Task2 = require('./Task');

var _Task3 = _interopRequireDefault(_Task2);

var _libLogging = require('../lib/logging');

var _libLogging2 = _interopRequireDefault(_libLogging);

var _libGetFiles = require('../lib/getFiles');

var _libGetFiles2 = _interopRequireDefault(_libGetFiles);

/**
 * Compiles code from one language to another using a Compiler. May compile in
 * three ways:
 *  - Compiling a chunk (string) to another chunk.
 *  - Compiling a file from a source path to a target path.
 *  - Compiling a directory of files recursively from a source path to a target
 *    path, compiling all files that match.
 * @class CompileTask
 */

var CompileTask = (function (_Task) {
  _inherits(CompileTask, _Task);

  function CompileTask() {
    var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

    _classCallCheck(this, CompileTask);

    _get(Object.getPrototypeOf(CompileTask.prototype), 'constructor', this).call(this, options);

    this.sourceFileExtension = options.sourceFileExtension;
    this.targetFileExtension = options.targetFileExtension;
    this.sourceDirectoryPath = options.sourceDirectoryPath;
    this.targetDirectoryPath = options.targetDirectoryPath;

    this.setCompiler(_Compiler2['default']);
  }

  /**
   * Returns the expression used by the `sourceFilePathMatches` method.
   * @return {RegExp} The regular expression.
   */

  _createClass(CompileTask, [{
    key: 'sourceFilePathMatches',

    /**
     * Returns `true` when a file path matches.
     * @param {String} sourceFilePath The source file path.
     * @return {boolean}
     */
    value: function sourceFilePathMatches(sourceFilePath) {
      return !!sourceFilePath.match(this.sourceFilePathMatchExpression);
    }

    /**
     * Returns the expression used by the `getTargetPath` method.
     * @return {RegExp} The regular expression.
     */
  }, {
    key: 'getTargetPath',

    /**
     * Gets the target file path for a source file path.
     * TODO: Rename to getTargetFilePath, because it is the path of a file.
     * @param {String} sourceFilePath The source file path.
     * @return {String} The target file path.
     */
    value: function getTargetPath(sourceFilePath) {
      return sourceFilePath.replace(this.sourceDirectoryPath, this.targetDirectoryPath).replace(this.targetPathReplaceExpression, '.' + this.targetFileExtension);
    }

    /**
     * Sets the compiler used to compile chunks. Also adds the Compiler to the
     * Builder but ensures only one Compiler per instance is active in the
     * Builder.
     * TODO: Explain why it's a good thing to only have one compiler in the
     *       builder per compile task.
     * TODO: Refactor: Move this to the Builder class.
     * @param {Class} CompilerClass The compiler class used to compile chunks.
     * @returns CompileTask The instance.
     */
  }, {
    key: 'setCompiler',
    value: function setCompiler(CompilerClass) {
      // First remove the currently set compiler from the builder.
      if (this.compiler) {
        this.builder.removeCompiler(this.compiler);
      }

      // Then set the the new compiler
      this.compiler = new CompilerClass(this.options.compiler);

      // And add it to the builder
      this.builder.addCompiler(this.compiler);

      return this;
    }

    /**
     * Ensures that a directory is available to write a file to. Creates all
     * parent directories of the file path.
     * @param {String} targetFilePath The target file path.
     * @param {Function} cb The callback function.
     */
  }, {
    key: 'ensureFileDirectory',
    value: function ensureFileDirectory(targetFilePath, cb) {
      (0, _mkdirp2['default'])((0, _path.dirname)(targetFilePath), cb);
    }

    /**
     * Reads a file from the `sourceFilePath`, compiles it using the set compiler
     * and writes it to the `targetFilePath`.
     * @param {String} sourceFilePath The source file path.
     * @param {String} targetFilePath The target file path.
     * @param {Function} cb The callback function.
     */
  }, {
    key: 'compileFile',
    value: function compileFile(sourceFilePath, targetFilePath, cb) {
      var _this = this;

      (0, _fs.readFile)(sourceFilePath, function (e, fileContent) {
        if (e) {
          return cb(e);
        }

        if (!_this.compiler.compileChunk) {
          console.log(_this.compiler.constructor.name);

          console.trace();
        }

        _this.compiler.compileChunk(fileContent.toString(), sourceFilePath).then(function (compiledChunk) {
          _this.ensureFileDirectory(targetFilePath, function (e) {
            if (e) {
              return cb(e);
            }

            (0, _fs.writeFile)(targetFilePath, compiledChunk, function (e) {
              if (e) {
                return cb(e);
              }

              _libLogging2['default'].taskInfo(_this.constructor.name, sourceFilePath + ' => ' + targetFilePath);

              cb(null);
            });
          });
        })['catch'](function (e) {
          _libLogging2['default'].taskWarn(_this.constructor.name, sourceFilePath + ': ' + (e.stack || e.message || e));
          return cb();
        });
      });
    }

    /**
     * Compiles a directory of files recursively from a source path to a target
     * path, compiling all files that match.
     * @param {Function} cb The callback function.
     */
  }, {
    key: 'compileAllFiles',
    value: function compileAllFiles(cb) {
      var _this2 = this;

      (0, _libGetFiles2['default'])(this.sourceDirectoryPath, function (e, sourceFilePaths) {
        if (e) {
          return cb(e);
        }

        var paths = (0, _lodash2['default'])(sourceFilePaths).map(function (v) {
          return v.fullPath;
        }).filter(_this2.sourceFilePathMatches.bind(_this2)).value();

        (0, _async.each)(paths, function (currentSourceFilePath, cb) {
          _this2.compileFile(currentSourceFilePath, _this2.getTargetPath(currentSourceFilePath), cb);
        }, cb);
      });
    }
  }, {
    key: 'sourceFilePathMatchExpression',
    get: function get() {
      return new RegExp('^' + this.sourceDirectoryPath + '.+\\.' + this.sourceFileExtension + '$');
    }
  }, {
    key: 'targetPathReplaceExpression',
    get: function get() {
      return new RegExp('\\.' + this.sourceFileExtension + '$');
    }
  }]);

  return CompileTask;
})(_Task3['default']);

exports['default'] = CompileTask;
module.exports = exports['default'];