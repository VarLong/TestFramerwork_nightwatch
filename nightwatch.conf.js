const minimist = require('minimist');
const utils = require("./artifacts/build/lib/common/utils");
const deployments = utils.checkConfigPath("./configs/deployments.json5");
const options = require('./artifacts/build/lib/cli/options.js');
const args = minimist(process.argv.slice(2), options.cli);
const test_settings = require("./configs/test_settings");

if (!process.env.runId) {
    process.env.runId = process.env.buildStartTime ? new Date(process.env.buildStartTime).getTime().toString() + "0000" : function () {
        process.env.buildStartTime = new Date();
        return new Date(process.env.buildStartTime).getTime().toString() + "0000";
    }();
}

// Create shield log path.
const folderlogPath = "ShieldLog/" + process.env.runId;
utils.createDir(folderlogPath);

// Format console.log
const log = console.log;
console.log = function () {
    const args = [].slice.call(arguments);
    log.apply(console.log, [utils.formattedTimestamp()].concat(args));
};

module.exports = (function (settings) {
    if (args.env) {
        console.log(args.env);
        const i = args.env.indexOf('-');
        const dep = args.env.slice(0, i);
        const dev = args.env.slice(i + 1, args.env.length);
        args['device'] = dev;
        args['deployment'] = dep;
    }

    if (args.device) {
        console.log(`Run in device: ${args.device}`);
    }

    if (args.deployment && deployments[args.deployment]) {
        console.log(`Run in deployment: ${args.deployment}`);
        settings['test_settings'][args.env] = test_settings;
    } else {
        console.log(`Can not find deployment ${args.deployment}`);
    }
    settings['test_settings'][args.env]["folderlogPath"] = folderlogPath;
    return settings;
})(require('./configs/defaults.json'));