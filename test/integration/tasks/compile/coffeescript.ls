fs = require "fs"

chai   = require "chai"
mkdirp = require "mkdirp"
rmrf   = require "rimraf"

coffeescript = require "../../../../src/tasks/compile/coffeescript"

{ expect } = chai
we         = it

random-string = ->
  Math
    .random!
    .toString 36
    .substring 7

describe "integrarion", !->
  describe "tasks", !->
    describe "coffeescript", !->
      before-each (cb) !->
        @directory-path = ".tmp/#{random-string!}"

        error <~! mkdirp @directory-path
        return cb error if error

        error <~! mkdirp "#{@directory-path}/src"
        return cb error if error

        error <~! mkdirp "#{@directory-path}/build"
        return cb error if error

        cb!

      after-each (cb) !->
        rmrf @directory-path, cb

      describe "When called on a directory with coffeescript files", !->
        we "should have compiled all coffeescript files", (cb) !->
          error <~! fs.write-file "#{@directory-path}/src/#{random-string!}.coffee", "-> console.log('123')"
          expect error .to.equal null

          error <~! fs.write-file "#{@directory-path}/src/#{random-string!}.coffee", "-> console.log('456')"
          expect error .to.equal null

          error <~! coffeescript.compile-all-files "#{@directory-path}/src", "#{@directory-path}/build"
          expect error .to.equal null

          error, nodes <~! fs.readdir "#{@directory-path}/build"
          expect error .to.equal null
          expect nodes .to.have.length 2
          expect nodes[0] .to.match /\.js$/
          expect nodes[1] .to.match /\.js$/

          cb!
