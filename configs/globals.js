const test_settings = require('./test_settings');
const utils = require("../artifacts/build/lib/common/utils");
const log4js = require("log4js");

module.exports = {
  // this controls whether to abort the test execution when an assertion failed and skip the rest
  // it's being used in waitFor commands and expect assertions
  abortOnAssertionFailure: true,

  // this will overwrite the default polling interval (currently 500ms) for waitFor commands
  // and expect assertions that use retry
  waitForConditionPollInterval: 500,

  // default timeout value in milliseconds for waitFor commands and implicit waitFor value for
  // expect assertions
  waitForConditionTimeout: 5000,

  // this will cause waitFor commands on elements to throw an error if multiple
  // elements are found using the given locate strategy and selector
  throwOnMultipleElementsReturned: false,

  // controls the timeout value for async hooks. Expects the done() callback to be invoked within this time
  // or an error is thrown
  asyncHookTimeout: 10000,

  // controls the timeout value for when running async unit tests. Expects the done() callback to be invoked within this time
  // or an error is thrown
  unitTestsTimeout: 2000,

  // controls the timeout value for when executing the global async reporter. Expects the done() callback to be invoked within this time
  // or an error is thrown
  customReporterCallbackTimeout: 20000,

  // Automatically retrying failed assertions - You can tell Nightwatch to automatically retry failed assertions until a given timeout is reached, before the test runner gives up and fails the test.
  retryAssertionTimeout: 1000,

  test_settings: test_settings,

  before(cb) {
    const browser = this;
    console.log('GLOBAL BEFORE');
    cb();
  },

  beforeEach(browser, cb) {
    console.log('GLOBAL beforeEach');
    cb();
  },

  after(cb) {
    console.log('GLOBAL AFTER');
    cb();
  },

  afterEach(browser, cb) {
    const _this = this;
    browser.perform(function () {
      if (browser.globals.test_settings.shieldLogEnabled !== 'false') {
        const slashIndex = browser.currentTest.module.lastIndexOf('/') > browser.currentTest.module.lastIndexOf('\\') ? browser.currentTest.module.lastIndexOf('/') : browser.currentTest.module.lastIndexOf('\\');
        const moduleName = browser.currentTest.module.substring(0, slashIndex)
        const folderName = moduleName + '/seleniumAndBrowserLogs'
        seleniumAndBrowserLogPath = browser.globals.test_settings.folderlogPath + '/' + folderName
        utils.createDir(seleniumAndBrowserLogPath);
        // Based on retries or timestamp we have a new log file for every retry.
        const logOrder = new Date().getTime().toString()
        const executingTestCaseName = browser.currentTest.module.substring(slashIndex, browser.currentTest.module.length)
        // Getting logs.
        let testfailed = false

        // Only take screenshot if there was a error, failure or skipped.
        if (browser.currentTest.results.errors > 0 || browser.currentTest.results.failed > 0 || browser.currentTest.results.skipped > 0) {
          const screenshotPath = folderlogPath + '/' + moduleName + '/screenshot/' + executingTestCaseName + '_' + logOrder + '.png';
          browser.saveScreenshot(screenshotPath);
          testfailed = true;
        }
        _this.generateLogs(browser, seleniumAndBrowserLogPath, executingTestCaseName, logOrder, );

      }
    }).perform(function () {
      console.log('GLOBAL afterEach');
      cb();
    })
  },

  reporter(results, cb) {
    cb();
  },

  createDir(path) {
    fs.mkdirsSync(path, function (err) {
      if (err) {
        console.error(err);
      }
    })
  },

  configureLog4Js(logTypes, seleniumAndBrowserLogPath, executingTestCaseName, logOrder) {
    var appenders = {}
    var categories = {}
    logTypes.forEach(function (type) {
      var logPath = seleniumAndBrowserLogPath + '/' + executingTestCaseName + '-' + type + '-' + logOrder + '.log';
      appenders[type] = {
        type: 'file',
        filename: logPath,
        category: type,
        absolute: true,
        layout: {
          type: 'messagePassThrough'
        }
      };
      categories[type] = {
        appenders: [type],
        level: 'debug'
      }
    });
    categories['default'] = {
      appenders: logTypes,
      level: 'debug'
    };
    log4js.configure({
      appenders: appenders,
      categories: categories
    });
  },

  generateLogs(browser, seleniumAndBrowserLogPath, executingTestCaseName, logOrder) {
    const _this = this;
    browser.getLogTypes(function (typesArray) {
      if (typesArray instanceof Array) {
        _this.configureLog4Js(typesArray, seleniumAndBrowserLogPath, executingTestCaseName, logOrder)
        console.log(typesArray)
        typesArray.forEach(function (type) {
          browser.getLog(type, function (logs) {
            var logger = log4js.getLogger(type)
            if (logs) {
              if (logs instanceof Array) {
                if (logs.length > 0) {
                  logs.forEach(function (log) {
                    logger.info(new Date(log.timestamp).toISOString() + '[' + log.level + '] ' + ' : ' + log.message);
                  })
                } else {
                  logger.info('No logs were found for ' + type);
                }
              } else if (logs instanceof Object) {
                const logJson = JSON.stringify(logs);
                logger.info(logJson);
              } else {
                const logString = logs.toString();
                logger.info(logString);
              }
            } else {
              logger.info('No logs were found for ' + type);
            }
          })
        })
      }
    })
  }
}