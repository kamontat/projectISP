/**
 * A brief explanation for "project.json":
 * Here is the content of project.json file, this is the global configuration for your game, you can modify it to customize some behavior.
 * The detail of each field is under it.
 {
    "project_type": "javascript",
    // "project_type" indicate the program language of your project, you can ignore this field

    "debugMode"     : 1,
    // "debugMode" possible values :
    //      0 - No message will be printed.
    //      1 - cc.error, cc.assert, cc.warn, cc.log will print in console.
    //      2 - cc.error, cc.assert, cc.warn will print in console.
    //      3 - cc.error, cc.assert will print in console.
    //      4 - cc.error, cc.assert, cc.warn, cc.log will print on canvas, available only on web.
    //      5 - cc.error, cc.assert, cc.warn will print on canvas, available only on web.
    //      6 - cc.error, cc.assert will print on canvas, available only on web.

    "showFPS"       : true,
    // Left bottom corner fps information will show when "showFPS" equals true, otherwise it will be hide.

    "frameRate"     : 60,
    // "frameRate" set the wanted frame rate for your game, but the real fps depends on your game implementation and the running environment.

    "noCache"       : false,
    // "noCache" set whether your resources will be loaded with a timestamp suffix in the url.
    // In this way, your resources will be force updated even if the browser holds a cache of it.
    // It's very useful for mobile browser debuging.

    "id"            : "gameCanvas",
    // "gameCanvas" sets the id of your canvas element on the web page, it's useful only on web.

    "renderMode"    : 0,
    // "renderMode" sets the renderer type, only useful on web :
    //      0 - Automatically chosen by engine
    //      1 - Forced to use canvas renderer
    //      2 - Forced to use WebGL renderer, but this will be ignored on mobile browsers

    "engineDir"     : "frameworks/cocos2d-html5/",
    // In debug mode, if you use the whole engine to develop your game, you should specify its relative path with "engineDir",
    // but if you are using a single engine file, you can ignore it.

    "modules"       : ["cocos2d"],
    // "modules" defines which modules you will need in your game, it's useful only on web,
    // using this can greatly reduce your game's resource size, and the cocos console tool can package your game with only the modules you set.
    // For details about modules definitions, you can refer to "../../frameworks/cocos2d-html5/modulesConfig.json".

    "jsList"        : [
    ]
    // "jsList" sets the list of js files in your game.
 }
 *
 */
var screenWidth = 800;
var screenHeight = 600;
var browser = '';

cc.game.onStart = function () {
    if (!cc.sys.isNative && document.getElementById("cocosLoading")) //If referenced loading.js, please remove it
        document.body.removeChild(document.getElementById("cocosLoading"));

    // Pass true to enable retina display, on Android disabled by default to improve performance
    cc.view.enableRetina(cc.sys.os === cc.sys.OS_IOS);
    // Adjust viewport meta
    cc.view.adjustViewPort(true);
    // Setup the resolution policy and design resolution size
    cc.view.setDesignResolutionSize(screenWidth, screenHeight, cc.ResolutionPolicy.SHOW_ALL);
    // Instead of set design resolution, you can also set the real pixel resolution size
    // Uncomment the following line and delete the previous line.
    // cc.view.setRealPixelResolution(960, 640, cc.ResolutionPolicy.SHOW_ALL);
    // The game will be resized when browser size change
    cc.view.resizeWithBrowserSize(true);
    //load resources
    // check safari can't play sound
    if (browser != 'Safari') {
        console.log("sound");
        cc.audioEngine.playMusic("res/music/Night.mp3", true); // may not support in safari
    }
    cc.LoaderScene.preload(g_resources, function () {
        cc.director.runScene(new TitleScene);
    }, this);
};

cc.game.run();

var checkBrowser = function () {
    console.log("Your OS: " + cc.sys.os);
    var nu = navigator.userAgent;
    if ((nu.indexOf("Opera") || nu.indexOf('OPR')) != -1) {
        browser = 'Opera';
        return true;
    } else if (nu.indexOf("Chrome") != -1) {
        browser = 'Chrome';
        return true;
    } else if (nu.indexOf("Safari") != -1) {
        browser = 'Safari';
        return false;
    } else if (nu.indexOf("Firefox") != -1) {
        browser = 'Firefox';
        return true;
    } else if ((nu.indexOf("MSIE") != -1 ) || (!!document.documentMode == true )) {
        browser = 'IE';
        return true;
    } else {
        browser = 'unknown';
        alert('unknown');
    }
};

var myIP = function (getText) {
    if (window.XMLHttpRequest) xmlhttp = new XMLHttpRequest();
    else xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");

    xmlhttp.open("GET", "//ip-api.com/json?callback=?", false);
    xmlhttp.send();

    var text = xmlhttp.responseText;
    text = text.slice(3, text.length - 3);

    hostipInfo = text.split(",");
    for (var i = 0; i < hostipInfo.length; i++) {
        while (hostipInfo[i].indexOf("\"") != -1) {
            hostipInfo[i] = hostipInfo[i].replace("\"", "");
        }
    }

    for (i = 0; hostipInfo.length >= i; i++) {
        ipAddress = hostipInfo[i].split(":");
        if (ipAddress[0] == getText) {
            return ipAddress[1].replace(" ", "");
        }
    }
    return false;
};