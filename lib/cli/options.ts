const extend = require("lodash/object/extend");

// Shield options
const shield = ["deployment", "device", "BuildNumber", "var", "runType", "multidevice", "retry", "testTimeout", "excludedCases"];

// Nightwatch options. Should be kept up to date with new releases.
const nightwatchCommandlineOptions = {
    string: [
        "config",
        "output",
        "reporter",
        "env",
        "test",
        "testcase",
        "group",
        "skipgroup",
        "filter",
        "tag",
        "skiptags",
    ],
    boolean: ["verbose", "version"],
    alias: {
        "config": "c",
        "output": "o",
        "reporter": "r",
        "env": "e",
        "version": "v",
        "test": "t",
        "group": "g",
        "skipgroup": "s",
        "filter": "f",
        "tag": "a"
    }
};

// Nightwatch-only options-- these are not recommended to be used with Shield,
// but directly with Nightwatch only.
const reserved = {
    "config": true,
    "group": true,
    "test": true,
    "testcase": true,
    "version": true,
};

// Expose combined Shield & Nightwatch options for correct arg parsing.
module.exports = {
    shield: shield,
    nw: nightwatchCommandlineOptions,
    reserved: reserved,
    cli: {
        string: nightwatchCommandlineOptions.string,
        boolean: nightwatchCommandlineOptions.boolean,
        alias: extend({}, nightwatchCommandlineOptions.alias),
    }
};
