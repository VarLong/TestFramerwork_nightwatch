const chromedriver = require("chromedriver");
const minimist = require('minimist');
const fs = require("fs");
const path = require("path")
const JSON5 = require('json5');
const deployments = checkConfigPath("./configs/deployments.json5");
const capabilities = checkConfigPath("./configs/capabilities.json5");
const options = require('./artifacts/build/lib/cli/options.js');
const utils = require("./artifacts/build/lib/common/utils");
const merge = require("lodash/object/merge");
const args = minimist(process.argv.slice(2), options.cli);

// Load .js, .json, or .json5 file, or die trying.
function checkConfigPath(pathname) {
    try {
        return JSON5.parse(fs.readFileSync(pathname).toString());
    } catch (err) {
        console.error(`Error loading config ${pathname} ${err}`);
        process.exit(9);
    }
}

function mergeDeploymentAndCapabilitiesJson(settings, deployment) {
    settings['test_settings'][args.env] =  Object.assign(deployments[args.deployment], capabilities[args.device]); 
    const envConfigPath = "configs/TestConfigData/";
    const commonVal = checkConfigPath(path.resolve(envConfigPath + "common.json5"));
    const val = checkConfigPath(path.resolve(envConfigPath + deployment + '.json5'));
    settings['test_settings'][args.env]  = merge(settings['test_settings'][args.env], commonVal, val);  
    return settings;
}

if (!process.env.runId) {
    process.env.runId = process.env.buildStartTime ? new Date(process.env.buildStartTime).getTime().toString() + "0000" : function () {
        process.env.buildStartTime = new Date();
        return new Date(process.env.buildStartTime).getTime().toString() + "0000";
    }();
}

console.log(`runId: ${process.env.runId}`);
const folderlogPath = "ShieldLog/" + process.env.runId;
utils.createDir(folderlogPath);


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
        console.log(args.device);
        // const dev = args.device;
        // if (capabilities[dev]) {
        //     console.log(`Add device ${dev} to test run.`);
        //     for (const key in capabilities[dev]) {
        //         settings['test_settings']['desiredCapabilities'] = capabilities[dev][key];
        //     }
        // } else {
        //     console.log(`Not find device ${dev} in capabilities.`);
        // }
    }

    if (args.deployment && deployments[args.deployment]) {
        console.log(args.deployment);
        const deploment = deployments[args.deployment];
        settings = mergeDeploymentAndCapabilitiesJson(settings, args.deployment);
    }else{
        console.log(`Can not find deployment ${args.deployment}`);
    }

    return settings;
})(require('./configs/defaults.json'));