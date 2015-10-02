import { exists } from 'fs';
import log from 'loglevel';

import CompileTask from '../lib/CompileTask';
import logging from '../lib/logging';

import BrowserifyCompiler from '../compilers/BrowserifyCompiler';

class BrowserifyCompileTask extends CompileTask {
  constructor(options = {}) {
    super(options);

    this.sourceFilePath = options.sourceFilePath;
    this.targetFilePath = options.targetFilePath;

    this.setCompiler(BrowserifyCompiler);
  }

  sourceFilePathMatches(sourceFilePath) {
    log.debug(`BrowserifyCompileTask#sourceFilePathMatches`, sourceFilePath, this.compiler.bundle /*.pipeline.get('deps')*/);

    // Take a look in the browserify deps
    return !!sourceFilePath.match(this.sourceFilePathMatchExpression);
  }

  compileFile(sourceFilePath = this.sourceFilePath, targetFilePath = this.targetFilePath, cb) {
    exists(sourceFilePath, (doesExist) => {
      if (doesExist) {
        super.compileFile(sourceFilePath, targetFilePath, cb);
      } else {
        logging.taskInfo(this.constructor.name, `skipping ${sourceFilePath} (Does not exist)`);

        cb();
      }
    });
  }

  run(cb) {
    this.compileFile(this.sourceFilePath, this.targetFilePath, cb);
  }
}

export default BrowserifyCompileTask;

/*
function watch(options, cb) {
  log.debug('lib/browserify.watch');

  exists(options.sourceFilePath, exists => {
    if (!exists) {
      logging.taskInfo(options.taskName, `skipping ${options.sourceFilePath} (Does not exist)`);
      return cb();
    }

    fileSystem.ensureFileDirectory(options.targetFilePath, e => {
      if (e) {
        return cb(e);
      }

      const b = getBrowserifyBundle(options);

      b.add(resolve(options.sourceFilePath));

      b.on('bundle', bundleStream => {
        let data = '';

        bundleStream.on('data', d => {
          data += d;
        });

        bundleStream.on('end', () => {
          writeFile(options.targetFilePath, data, e => {
            if (e) {
              return cb(e);
            }

            logging.taskInfo(options.taskName, `${options.sourceFilePath} => ${options.targetFilePath}`);
          });
        });
      });

      const w = watchify(b);

      w.on('update', () => {
        b.bundle();
      });

      b.bundle();
    });
  });
}
*/