/// <reference path="./Atom.ts"/>

/**
 *  Page object for #bingeBar page. Includes the following commands :
 */

import { CallbackResult } from "../../typings/nightwatch/nightwatch";
import { Atom } from "./Atom";
import { IFuncOneParam } from "../../typings/shield/common-definition";

/**
 * BingeBar card used in Reach Client, this page show with feature bingeBar.
 */

export class gitHubMainPage extends Atom {

    constructor(...args: any[]) {
        super();
    }

    public static elements = {
        binner: {
            selector: ".js-header-wrapper",
            locateStrategy: "css selector"
        },
        main: {
            selector: ".application-main ",
            locateStrategy: "css selector"
        },
    };
    public waitGitHubVisible() {
        this.api.useCss().waitForElementVisible(this.elements["binner"].selector);
        this.api.useCss().waitForElementVisible(this.elements["main"].selector);
    }
}

const v = new gitHubMainPage()["__proto__"];
module.exports = {
    commands: [v],
    elements: gitHubMainPage.elements
};