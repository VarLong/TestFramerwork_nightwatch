/// <reference path='../../typings/tsd.d.ts' />

import { CallbackResult, NightWatchBrowser } from "../../typings/nightwatch/nightwatch";

const gitHubLogInPageCommands = {
    waitForPage: function () {
        this.api.useCss().waitForElementVisible(this.elements["loginButton"].selector);
        return this;
    }
};

module.exports = {
    commands: [gitHubLogInPageCommands],
    elements: {
        loginButton: {
            selector: "#router > #ChannelSubscribePage"
        }
    }
};