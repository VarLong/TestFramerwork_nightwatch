///<reference path="../nightwatch/nightwatch.d.ts"/>

import { NightWatchBrowser, CallbackResult } from "../nightwatch/nightwatch";

export interface NightWatchCustomCommands {
    /**
     * Custom Command to allow push notifications
     * @returns {NightWatchBrowser}
     */
    allowNotifications: () => NightWatchBrowser;

    /**
     * Custom Command to click on a particular fee
     * @param feedName <b>feedName</b>[required] The particular feed text.
     * @returns {NightWatchBrowser}
     */
    clickHubFeed: (feedName: string) => NightWatchBrowser;

    /**
     * Disable or enable subnet check, usually used for test companion devices
     */
    disableSubnetCheck: (disabled: boolean) => NightWatchBrowser;

    /**
     * Get Libraries Pivot Categories
     *
     * This is a custom command to get libraries pivot categories
     *
     * @param showType <b>showType</b>[required] The showType for the library.
     * @param params <b>params</b>[required] The query parameters, usually contains $itemsPerRow, $top, $skip.
     * @param callback <b>callback</b>[required] The callback function.
     * @returns {NightWatchBrowser}
     */
    discoveryGetLibrariesPivotCategories: (showType: string, params: { $skip: number, $top: number, pivots: string[], $itemsPerRow: number }, callback: (list: Object[]) => void) => NightWatchBrowser;

    /**
     * Custom Command to get programs in a particular library
     * @param libraryId <b>libraryId</b>[required] The particular feed id.
     * @param skip <b>skip</b>[required] The query option to get programs after skipping a required number of programs.
     * @param top <b>top</b>[required] The query option to request number of programs.
     * @param orderBy <b>orderBy</b>[required] The query option to request programs in a particular order.
     * @param callback <b>callback</b>[required] The callback function.
     * @returns {NightWatchBrowser}
     */
    discoveryGetLibraryPrograms: (libraryId: string, params: any, callback: (list: any[]) => void) => NightWatchBrowser;

    /**
     * Custom Command to get program attributes
     * @param programId <b>programId</b>[required] The program id.
     * @param callback <b>callback</b>[required] The callback function.
     * @returns {NightWatchBrowser}
     */
    discoveryGetProgram: (programId: string, callback: (result: CallbackResult) => void) => NightWatchBrowser;

    /**
     * Custom Command to get search results
     * @param searchString <b>searchString</b>[required] The search string.
     * @param searchLive <b>searchLive</b>[required] If search results include live assets.
     * @param includePersons <b>includePersons</b>[required] If search results include person.
     * @param top <b>top</b>[required] return top results.
     * @param callback <b>callback</b>[required] The callback function.
     * @returns {NightWatchBrowser}
     */
    discoveryGetSearchResults: (searchString: string, searchLive: boolean, includePersons: boolean, top: number, callback: (result: CallbackResult) => void) => NightWatchBrowser;

    /**
     * Custom Command to dismiss the active Modal
     * @returns {NightWatchBrowser}
     */
    dismissModal: () => NightWatchBrowser;

    /**
     * Custom Command to verify if environment has feature or features
     * @param searchString <b>featureName</b>[required] The name of fegitature.
     * @param callback <b>callback</b>[required] The callback function.
     * @returns {NightWatchBrowser}
     */
    environmentHasFeature: (featureName: string | string[], callback: (result: boolean, resultItem?: any) => void) => NightWatchBrowser;

    /**
     * Custom Command to tap on a particular element
     * @param selector <b>selector</b>[required] The selector of html element.
     * @param selectorType <b>selectorType</b>[optional] The type of selector, it could be "xpath" or "css".
     * @param callback <b>callback</b>[required] The callback function.
     * @details <br/>
     * 1. It creates tap event for browser.
     * 2. It does not work for Safari.
     * @returns {NightWatchBrowser}
     */
    executeTap: (selector: string, selectorType: string, callback?: (...args: any[]) => void) => NightWatchBrowser;

    /**
     * Custom Command to locate an asset in browse page. It will scroll the page until it finds the asset
     * @param browseViewId <b>browseViewId</b>[required] The particular browse view id, for instance: browsemovies, browsetv, liveGuideGrid, browsepackages.
     * @param programId <b>programId</b>[required] The asset id of what you are looking for.
     * @param isLive <b>isLive</b>[optional] It is false by default. Set it to true, only when the asset was Live TV.
     * @param {boolean} [loadMoreData=false] does it support more data to be loaded, default value is false
     * @details <br/>
     * 1. On chrome and IE, all the showcards in DOM html is also displayed in current view. But on 1ft ios emulator, only some of all the showcards in DOM html is visible. So client.element will find invisible showcard on 1ft ios emulator.
     * @returns {NightWatchBrowser}
     */
    findAsset: (browseViewId: string, programIdOrDataItemId: string, isLive?: boolean, loadMoreData?: boolean) => NightWatchBrowser;

    /**
     * Custom Command to locate an asset in browse page canvas. It does not scroll the page at present
     * @param programId <b>programId</b>[required] The asset id of what you are looking for.
     * @param callback callback function
     * @details <br/>
     * 1. On canvas ,all the showcards in Canvas is displayed in current view.
     * @returns {NightWatchBrowser}
     */
    findAssetByIdCanvas: (programId: string, callback?: (result: CallbackResult) => void) => NightWatchBrowser;

    /**
     * Custom Command to go to an asset in browse page canvas. It does not scroll the page at present
     * @param title <b>title</b>[required] The asset name of what you are looking for.
     * @param callback callback function
     * @details <br/>
     * 1. On canvas ,all the showcards in Canvas is displayed in current view.
     * @returns {NightWatchBrowser}
     */
    goToAssetByNameCanvas: (title: string, callback?: (result: CallbackResult) => void) => NightWatchBrowser;

    /**
     * Custom Command to go to a cell by position in browse page canvas.
     * @param col <b>column</b>[required] The column of the position.
     * @param row <b>row</b>[required] The row of the position.
     * @param callback callback function
     * @details <br/>
     * 1. It goes to a cell by position on browse canvas page.
     * @returns {NightWatchBrowser}
     */
    goToCell: (col: number, row: number, callback?: (result: CallbackResult) => void) => NightWatchBrowser;

    /**
     * Custom Command to locate a showcard of asset in filmstrip for 10 ft, it will press right button to focus the asset
     * @param titleId <b>titleId</b>[required] The title id of expected asset.
     * @returns {NightWatchBrowser}
     */
    findShowcardInFilmstrip10ft: (titleId: string) => NightWatchBrowser;

    /**
     * Custom Command to locate a showcard of asset in filmstrip
     * @param showcardselector <b>showcardselector</b>[required] The xPath selector of target showcard with the asset id.
     * @param leftSearch <b>leftSearch</b>[required] Go left to look for target showcard.
     * @returns {NightWatchBrowser}
     */
    findShowcardInFilmstrip: (showcardselector: string, clickLeftChevron?: boolean) => NightWatchBrowser;

    /**
    * Catch And Get ReachClient Exceptions.
    * This is a function to set catching and getting ReachClient exceptions.
    * @param set <b>set</b>[required] boolean value. Set it  true to start collecting exceptions.
    * @details <br/>
    * @returns {NightWatchBrowser}
    */
    getWebExceptions: (set?: boolean) => NightWatchBrowser;

    /**
    * This is a function to get the localized string for a specific string id.
    * @param stringId <b>stringId</b>[required] The particular stringId for which you are looking for a localized string .
    * @param callback <b>callback</b>[required] The particular callback function parameter
    * @returns {NightWatchBrowser}
    * @details <br/>
    * 1. get the localized string for a stringId and return the converted string .
    */
    getStrings: (stringId: string, callback: (result: CallbackResult) => void) => NightWatchBrowser;

    /**
     * This is a function to get string resource file path particular to a locale and store it in a variable.
     * @param callback <b>callback</b>[required] The particular callback function parameter.
     * @param refresh <b>callback</b>[optional] If need refresh the cache to get resource.
     * @param language <b>callback</b>[optional] The specific language for safari.
     * @returns {NightWatchBrowser}
     * @details <br/>
     * 1. For  safari manually needs to specify locale.
     * 2. If skin folder path passed from cmd line parameter, then retrieve the string file path specifc to skin.
     */
    getResourceStringsFilePath: (callback: (result: string) => void, refresh?: boolean, language?: string) => NightWatchBrowser;

    /**
     * Custom Command to get the current hash
     * @param callback <b>callback</b>[required] The callback function.
     * @returns {NightWatchBrowser}
     */
    getCurrentHash: (callback: (result: string) => void) => NightWatchBrowser;

    /**
     * Custom Command to get the current locale, such as en-US or fr-CA
     * @param callback <b>callback</b>[required] The callback function.
     * @returns {NightWatchBrowser}
     */
    getCurrentLocale: (callback: (result: string) => void) => NightWatchBrowser;

    /**
     * Custom Command to get the current page location
     * @param callback <b>callback</b>[required] The callback function.
     * @returns {NightWatchBrowser}
     */
    getCurrentPageUrl: (callback: (result: Location) => void) => NightWatchBrowser;

    /**
     * Custom command to get default channel filter config setting
     * @param callback <b>callback</b>[required] The callback function.
     */
    getDefaultChannelFilter: (callback: (filter: string) => void) => NightWatchBrowser;

    /**
     * Custom command to get access code for device linking
     * @param accessToken <b>accessToken</b>[required] Access token for access code request.
     * @param device <b>device</b>[required] Device parameters for access code request.
     * @param callback <b>callback</b>[required] The callback function.
     */
    getDeviceAccessCode: (accessToken: string, device: { DeviceID: string, DeviceType: string }, callback: (accessCode: string) => void) => NightWatchBrowser;

    /**
     * Custom Command to get all feeds of a hub
     * @param hubId <b>hubId</b>[required] The id of particular hub.
     * @param callback <b>callback</b>[required] The callback function.
     * @returns {NightWatchBrowser}
     */
    getFeedsByHubId: (hubId: string, callback: (result: CallbackResult) => void, addLocale?: boolean) => NightWatchBrowser;

    /**
     * Custom Command to get all hash route map
     * @param callback <b>callback</b>[required] The callback function.
     * @returns {NightWatchBrowser}
     */
    getHashRouteMap: (callback: (result: string[]) => void) => NightWatchBrowser;

    /**
     * Custom Command to get the hub name of a particular feed
     * @param byKey <b>byType</b>[required] "id" | "name" | "source".
     * @param value <b>value</b>[required] The value.
     * @param callback <b>callback</b>[required] The callback function.
     * @returns {NightWatchBrowser}
     */
    getFeed: (byKey: string, value: string, callback: (result: CallbackResult) => void, isOnHubPage?: boolean) => NightWatchBrowser;

    /**
     * Custom Command to get the hub name of a particular feed
     * @param byKey <b>byType</b>[required] "id" | "name" | "source".
     * @param value <b>value</b>[required] The value.
     * @param callback <b>callback</b>[required] The callback function.
     * @returns {NightWatchBrowser}
     */
    getHubByFeed: (byKey: string, value: string, callback: any, isOnHubPage?: boolean) => NightWatchBrowser;

    /**
     * Custom Command to get the hub name of a particular feed for 10 ft, as well as the hubIndex, and feedIndex
     * @param hubId <b>feedId</b>[required] The id of particular feed.
     * @param callback <b>callback</b>[required] The callback function.
     * @returns {NightWatchBrowser}
     */
    getHub10ft: (feedId: string, callback: (result: CallbackResult) => void) => NightWatchBrowser;

    /**
     * Custom command to get the information of all hubs: id and Name or label
     * @param callback <b>callback</b>[required] The callback function.
     * @returns {NightWatchBrowser}
     */
    getHubs: (callback: (result: any) => void, isOnHubPage?: boolean) => NightWatchBrowser;

    /**
     * Custom command to get the imageAspectRatios
     * @param callback <b>callback</b>[required] The callback function.
     * @returns {NightWatchBrowser}
     */
    getImageAspectRatios: (callback: (res: CallbackResult) => void) => NightWatchBrowser;

    /**
    * This is a function to fetch filter by  category details for movies .
    * @param callback <b>callback</b>[required] The particular callback function parameter.
    * @returns {NightWatchBrowser}
    * @details <br/>
    * 1. For all the browsers except safari,this function will fetch filter by category names. Safari will give timeout error while using  execute/executeAsync command,hence does not support this.
    */
    getLibraryPivots: (callback: (result: CallbackResult) => void) => NightWatchBrowser;

    /**
    * Fetch TV Shows Filter Category Names and Pricing details.
    * This is a function to fetch filter by  category details and pricing details (Free/Subscribed) for TV shows .
    * @param callback <b>callback</b>[required] The particular callback function parameter.
    * @returns {NightWatchBrowser}
    */
    getTVLibraryPivots: (callback: (result: CallbackResult) => void) => NightWatchBrowser

    /**
    * This is a function to fetch 16 top TV shows .
    * @param callback <b>callback</b>[required] The particular callback function parameter.
    * @returns {NightWatchBrowser}
    * @details <br/>
    * 1. For all the browsers except safari and MicrosoftEdge,this function will fetch filter by category names,pricing. Safari will give timeout error while using  execute/executeAsync command,hence does not support this.
    * 2. Used to ensure that the TV Show is initially filled with Maximum 16 most popular TV Shows.
    */
    getTopTVShowInFeed: (callback: any) => NightWatchBrowser;

    /**
    * Go to Filmstrip Edge of Feed
    * function to scroll by clicking on the left/right chevron to reach the left/right most part of the browse page.
    * @param
    * @returns {NightWatchBrowser}
    * @details <br/>
    * 1. If device is browser, will click left/right chevron;
    * 2. Currently not implement this test on phone and tablet, they need scroll, but have no scroll bar in feed, and touch event not work.
    */
    goToFilmstripEdgeInFeed: (direction: "up" | "down" | "left" | "right") => NightWatchBrowser;

    /**
     * Local storage clear
     *
     * This is a function to Clear of local storage
     */
    localStorageClear: () => NightWatchBrowser;

    /**
     * Terminate Mock
     * 
     * This is a function to terminate mock data.
     *
     * @param testName testName
     * @param callback callback
     */
    mockTerminate: (testName: string, callback: any) => NightWatchBrowser;

    /**
     * Mouse Down on Element
     *
     * This is a function to trigger mousedown on element. it is work around for mouseButtonDown method for firefox.
     *
     * @param button It is the button to press, e.g. left
     * @param selector It is string value for selector
     * @param selectorType It is string value for selectortype, e.g. css
     * @param clientXArg it is x argument of client
     * @param clientYArg it is y argument of client
     * @param callback callback function
     */
    mouseDownOnElement: (button: string, selector: string, selectorType: string, clientXArg: number, clientYArg: number, callback?: (...args: any[]) => void) => NightWatchBrowser;

    /**
     * Mouse Move on Element
     *
     * This is a function to move to element. it is work around for moveToElement method for firefox.
     *
     * @param selector It is string value for selector
     * @param selectorType It is string value for selectortype, e.g. css
     * @param clientXArg it is x argument of client
     * @param clientYArg it is y argument of client
     * @param callback callback function
     */
    mouseMoveOnElement: (selector: string, selectorType: string, clientXArg: number, clientYArg: number, callback?: (...args: any[]) => void) => NightWatchBrowser;

    /**
     * Mouse over on Element
     *
     * This is a function to mouse move over element.
     *
     * @param selector It is string value for selector
     * @param selectorType It is string value for selectortype, e.g. css
     * @param screenXArg it is x argument of screen
     * @param screenYArg it is y argument of screen
     * @param callback callback function
     */
    mouseOverOnElement: (selector: string, selectorType: string, screenXArg: number, screenYArg: number, callback?: (...args: any[]) => void) => NightWatchBrowser;

    /**
     * Mouse Up on Element
     *
     * This is a function to trigger mouseup on element. it is work around for mouseButtonUp method for firefox.
     *
     * @param button It is the button to press, e.g. left
     * @param selector It is string value for selector
     * @param selectorType It is string value for selectortype, e.g. css
     * @param clientXArg it is x argument of client
     * @param clientYArg it is y argument of client
     * @param callback callback function
     */
    mouseUpOnElement: (button: string, selector: string, selectorType: string, clientXArg: number, clientYArg: number, callback?: (...args: any[]) => void) => NightWatchBrowser;

    /**
     * Chooses device. Used for multi device and companion tests
     * @param {number} index
     * @param callback callback function
     * @returns {NightWatchBrowser}
     */
    pairedDevice: (index: number, callback?: (clbBrowser: NightWatchBrowser) => void) => NightWatchBrowser;

    /**
     * Play asset with play info
     * 
     * This is a function to play the asset for which play info is provided.
     *
     * @param playInfo it is the playinfo of the asset to be played
     * @param hideControlsOnStart it is a boolean value for hiding/unhiding the controls on start
     */
    playAssetWithPlayInfo: (playInfo: any, hideControlsOnStart: boolean, bypassPBRClientCheck?: boolean) => NightWatchBrowser;

    /**
     * Press channel Number
     * 
     * This is a function to press the channel number.
     *
     * @param chNum it is string value stating the channel number
     */
    pressChannelNumber: (chNum: string, delay?: number) => NightWatchBrowser;

    /**
     * Press Remote Button
     * 
     * This is a function to press the specified remote button.
     *
     * @param button it is string value for remote button to be pressed, e.g. up and and down keys
     * @param pauseTimesMs it is number value for the pause time
     * @param timesToMove how many times to repeat for the press button action. 
     * @param message it is string value for log printing after button pressed.
     * @param callback do callback after key press complete 
     */
    pressRemoteButton: (button: string, pauseTimesMs?: number, timesToMove?: number, message?: string, callback?: () => void) => NightWatchBrowser;

    /**
     * Screen Keyboard Input
     *
     * This is a function to do input using on screen keyboard.
     *
     * @param inputString it is string value for input
     * @param isNumKeyboard flag whether to use OnScreen numerical keyboard for PIN entry
     * @param callback do callback after input complete 
     */
    screenKeyboardInput: (inputString: string, isNumKeyboard?: boolean, callback?: () => void) => NightWatchBrowser;

    /**
     * Set Wan Profile
     * 
     * This is a function to Set Wan Profile.
     *
     * @param wanProfile it is number value.
     */
    setWanProfile: (wanProfile: number) => NightWatchBrowser;

    /**
     * Set Feature Toggle
     * 
     * This is a function to Set Feature Toggle
     * 
     * @param featureName it is string value.
     */
    setFeatureToggle: (featureName: string) => NightWatchBrowser;

    /**
     * Subscriber Get Series
     *
     * This is a function to get series from subscriber
     *
     * @param seriesId The specific series Id.
     * @param callback The particular callback function parameter
     */
    subscriberGetSeries: (seriesId: string, callback: (result: CallbackResult) => void) => NightWatchBrowser;

    /**
     * Subscriber Set Bookmark
     * 
     * This is a function to set subscriber bookmark
     *
     * @param titleIds it is array of title ids.
     * @param bookmarkType it is string value for bookmark type e.g.VOD
     * @param bookmark it is number value. e.g. 60 for setting the bookmark as 60 seconds
     */
    subscriberSetBookmark: (titleIds: string[], bookmarkType: string, bookmark: number) => NightWatchBrowser;

    /**
     * Purchase Offer
     * 
     * This is a function to purchase multiple offers.
     *
     * @param offerids it is array of offer ids to be purchased.
     */
    purchaseOffer: (offerids: string[]) => NightWatchBrowser;

    /**
     * Resize InnerWindow
     *
     * This is a function to resize innerWindow.
     *
     * @param width the width of browser innerWindow width.
     * @param height the width of browser innerWindow height.
     */
    resizeInnerWindow: (width: number, height: number) => NightWatchBrowser;

    /**
     * save User Objects In Local Storage
     *
     * This is a function to save user object in local storage.
     *
     * @param userObjects it is array of user objects to save.
     */
    saveUserObjectsInLocalStorage: (userObjects: { userObject: string, value: boolean }[], callback?: () => void) => NightWatchBrowser;

    /**
     * Tap and wait for events
     * 
     * This is a function to tap a selector and wait for the specified events in order on the target browser.
     *
     * @param selectorName it is string value for selector to be tapped.
     * @param eventNames it is Array of event names to wait for.
     * @param selectorType it is a string value for selectorType, e.g. css selector or xPath
     */
    tapAndWaitForEvents: (selectorName: string, eventNames: string[], selectorType: string) => NightWatchBrowser;

    /**
     * Tap and wait for events
     *
     * This is a function to click on a button and wait for the specified events in order on the target browser.
     *
     * @param index it is the index of the action button.
     * @param button it is the button string.
     * @param eventNames it is Array of event names to wait for.
     */
    tapButtonAndWaitForEvent: (index: number, button: string, eventNames: string[]) => NightWatchBrowser;

    /**
     * Trigger tap
     * 
     * This is a custom Nightwatch command to trigger tap to a selector
     *
     * @param selector It is string value for selector
     * @param selectorType It is string value for selectortype, e.g. css
     * @param callback callback function
     */
    triggerTap: (selector: string, selectorType: string, callback?: (...args: any[]) => void) => NightWatchBrowser;

    /**
     * Trigger Voice Action
     *
     * This is a custom Nightwatch command to trigger voice actions
     *
     * @param mockdata The action to be performed e.g. Search, Show or Channel change
     * @param executionDelay Amount of time the voice serch result is delayed on the target platform
     * @param callback callback function
     */
    triggerVoiceAction: (mockdata: any, callback?: (...args: any[]) => void) => NightWatchBrowser;

    /**
     * Update pcon models or collections in reachclient
     *
     * This is a custom Nightwatch command to update pcon models or collections in reachclient
     *
     * @param modelsOrCollections it's array of pcon model or collection to update
     * @param callback callback function
     */
    updatePconModelsOrCollection: (modelsOrCollections: { modelOrCollection: string, attribute: string, value: any, iscollection: boolean }[], callback?: () => void) => NightWatchBrowser;

    /**
     * Wait and click
     * 
     * This is a custom Nightwatch command to trigger tap to a selector
     *
     * @param selector It is string value for selector
     * @param callback callback function
     * @param waitTime It is time to wait for element to be visible before clicking. Default is 1000
     */
    waitAndClick: (selector: string, waitTime: number, callback?: (result: CallbackResult) => void) => NightWatchBrowser;

    /**
     * wait for
     * 
     * This is a function to tap a selector and wait for the specified events in order on the target browser.
     *
     * @param eventName it is event name to wait for.
     * @param timeout it is timeout value to be waited for
     */
    waitFor: (eventName: string, timeout?: number) => NightWatchBrowser;

    /**
    *  Keep The Sauce Labs Alive For A Timeout Value.
    *  function to keep the sauce labs watchdog alive.
    * @param ms <b>ms</b>[required] The required time in milliseconds for which the browser has to be kept alive.
    * @returns {NightWatchBrowser}
    * @details <br/>
    * 1. Use it like browser.keepAlive((4.5 + 0.66) * 60 * 1000), if the timeout required is 4 minutes by taking extra .5 minutes to be safe margin.
    */
    keepAlive: (ms: number) => NightWatchBrowser;

    /**
     * Wait for Javascript
     * 
     * This is a custom Nightwatch command which calls executeAsync periodically with the javascript expression provided until the result
     * of the async JS is true or the timeout specifies with 'ms' variable expires.
     * @param javascriptExpression Javascript expression to be executed
     * @param args list of arguments
     * @param message message
     * @param ms timeout value
     * @param manualVerifyCallback callback function
     */
    waitForJavascript: (javascriptExpression: (...args: any[]) => void, args: any[], message: string, ms?: number, manualVerifyCallback?: (result: boolean, message: string) => void) => NightWatchBrowser;

    /**
     * Wait for Router Navigation
     * 
     * A custom Nightwatch command which makes the test wait until the mstv.router.isNavigating is false, 
     * which commands keyboard and navigation events are allowed.
     * @param ms wait time value
     */
    waitForRouterNavigation: (ms?: number) => NightWatchBrowser;

    /**
     * Wait for TV First
     * 
     * This is a custom Nightwatch command which makes the test wait until the TV First has finished initialization
     * @param timeoutMs timeout value
     */
    waitForTvFirst: (timeoutMs?: number) => NightWatchBrowser;

    /**
     * Wait for Element count number
     *
     * This is a custom Nightwatch command which makes the test wait until the element count to the expected number
     * @param selector
     * @param count
     * @param timeoutInMilliseconds timeout value
     */
    waitForElementCount: (selector: string, count: number, timeoutInMilliseconds?: number) => NightWatchBrowser;

    /**
     * Custom Command to send keys with a wait for each character to the active element using .keys and pause methods
     * @param sendKeys: keys to be typed
     * @param timeToWaitForEachKeySend: Optional time in ms required for each keystroke
     * @returns {NightWatchBrowser}
     */
    sendKeysWithWait: (sendKeys: string | string[], timeToWaitForEachKeySend?: number, targetElementSelector?: string) => NightWatchBrowser;

﻿   /**
    * Custom Command to set timeout for how long the player UI can stay on playback page
    * @param overlayTimeout It is integer value for overlay Timeout
    */
    setPlayerControlsTimeout: (overlayTimeout: number) => NightWatchBrowser;
    /**
     * Custom Command to get all the IDs of client, including: accountId, deviceId, clientId, sessionId.
     * @returns {NightWatchBrowser}
     */
    getClientIds: (callback: (result: any) => void) => NightWatchBrowser;

    /**
    * Returns all the Live programs based on the show type 
    * @param <b> liveSchedule </b> [required] to fetch the Live TV / Movie 
    * @param callback <b>callback</b>[required] The callback function.
    */
    getLivePrograms: (callback: (result: any) => void) => NightWatchBrowser;

    sendDuplexMessage: (type: string, payload: any) => NightWatchBrowser;

    /**
     * Set PCON timeout
     *
     * This is a function to set timeout for FailedAttemptsInterval, LockoutInterval, inactivityInterval, failedPinAttemptsLimit
     *
     * @param failedPinAttemptsInterval It is integer value for failed Pin Attempts Interval
     * @param failedPinLockoutInterval It is integer value for failed Pin Lockout Interval
     * @param inactivityInterval It is integer value for overlay inactivity Interval
     * @param failedPinAttemptsLimit It is integer value for overlay failed Pin Attempts Limit
     *
     */
    setPCONTimeouts: (failedPinAttemptsInterval: number, failedPinLockoutInterval: number, inactivityInterval: number, failedPinAttemptsLimit: number) => NightWatchBrowser;

    /**
     * Set Default PCON configurations 
     *
     * This is a function to set default PCON values for new device/2ft users
     *
     * @param defaultRestrictedAge It is integer value for setting the age restriction 
     * @param shouldEnablePurchasePin It is boolean value for enabling purchase pin
     * @param displayAdultStore It is boolean value for displaying adult store
     * @param requirePinForAdultStore It is boolean value for enabling pin for adult store purchase
     * @param useParentalControlPin It is boolean value for seting parental control pin
     * @param enableAdultMasking It is boolean value for seting parental enabling adult mask
     */

    setDefaultPCONConfiguration: (defaultRestrictedAge: number, shouldEnablePurchasePin: boolean, displayAdultStore: boolean, requirePinForAdultStore: boolean, useParentalControlPin: boolean, enableAdultMasking?: boolean) => NightWatchBrowser;

}
