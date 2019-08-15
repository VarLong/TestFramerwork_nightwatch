const chromedriver = require("chromedriver");
const fs = require("fs");
const configs = checkConfigPath("./configs/defaults.json");
const deployments = checkConfigPath("./configs/deployments.json");
const capabilities = checkConfigPath("./configs/capabilities.json");

console.log('start nightwatch.config.js');
// Load .js, .json, or .json5 file, or die trying.
function checkConfigPath(pathname) {
    try {
        return JSON.parse(fs.readFileSync(pathname).toString());
    } catch (err) {
        console.error(`Error loading config ${pathname} ${err}`);
        process.exit(9);
    }
}

module.exports = (function (settings) {
    settings.test_workers = false;
    settings.webdriver.server_path = chromedriver.path;
    settings['TestPro'] = 'aaa';
    // settings['test_settings'] = configs;

    return settings;
})(require('./configs/nightwatch.json'));