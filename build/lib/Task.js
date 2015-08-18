'use strict';

var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _import = require('lodash');

var _import2 = _interopRequireWildcard(_import);

var Task = (function () {
  function Task() {
    var options = arguments[0] === undefined ? {} : arguments[0];

    _classCallCheck(this, Task);

    this.options = options;

    this.builder = options.builder;

    this.dependencies = [];
  }

  _createClass(Task, [{
    key: 'addDependency',
    value: function addDependency(name) {
      this.dependencies.push(name);
      this.dependencies = _import2['default'].uniq(this.dependencies);
    }
  }, {
    key: 'addDependencies',
    value: function addDependencies(dependencies) {
      var _this = this;

      _import2['default'].each(dependencies, function (dependency) {
        _this.addDependency(dependency);
      });
    }
  }, {
    key: 'removeDependency',
    value: function removeDependency(name) {
      this.dependencies = _import2['default'].without(this.dependencies, name);
    }
  }, {
    key: 'start',
    value: function start(cb) {
      if (!this.run) {
        throw new Error('No run function set.');
      }

      // TODO: This is horrible!
      this.__proto__.run.call(this, cb);
    }
  }]);

  return Task;
})();

exports['default'] = Task;
module.exports = exports['default'];