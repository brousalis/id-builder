require! <[
  id-debug
]>

livescript = require "../lib/livescript"
watch      = require "../lib/watch"

export dependencies = <[
  runTests
  watch
]>

handle-path = (options, path, stat) !-->
  return unless livescript.source-file-path-matches options, path

  target-path = path
    .replace options.source-path, options.target-path
    .replace //\.#{livescript.source-extension}$//, ".#{livescript.target-extension}"

  error <-! livescript.compile-file options, path, target-path
  id-debug.error error if error

handle-add = (options, path, stat) !-->
  handle-path options, path, stat

handle-add-dir = (options, path, stat) !-->

handle-change = (options, path, stat) !-->
  handle-path options, path, stat

handle-unlink = (options, path, stat) !-->

handle-unlink-dir = (options, path, stat) !-->

handle-error = (options, error) !-->

export run = (options, cb) !->
  watcher = watch.get-watcher!

  <-! watcher.on "ready"

  watcher.on "add",       handle-add        options
  watcher.on "addDir",    handle-add-dir    options
  watcher.on "change",    handle-change     options
  watcher.on "unlink",    handle-unlink     options
  watcher.on "unlinkDir", handle-unlink-dir options
  watcher.on "error",     handle-error      options