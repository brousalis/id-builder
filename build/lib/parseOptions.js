"use strict";

let deepmerge = require("deepmerge");

module.exports = function(defaults, options) {
  return deepmerge(defaults, options);
};