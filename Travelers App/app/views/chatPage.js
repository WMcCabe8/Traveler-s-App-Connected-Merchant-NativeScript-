var dialogs = require("ui/dialogs");
var el = require("../shared/models/el");
var frameModule = require("ui/frame");
var images = require("../shared/utils/images");
var pageData = require("../shared/models/userCredentials");
var viewModule = require("ui/core/view");
var webViewModule = require("ui/web-view");

//Create a webView to open a web page
var webView = new webViewModule.WebView();

exports.load = function (args) {
    var page = args.object;
    page.bindingContext = pageData;
};

//Opens up webpage: http://connectedmerchant-43363.onmodulus.net/traveler-chat
webView.on(webViewModule.knownEvents.finished, function (args) {
    var message;
    if (!args.error) {
        message = "WebView finished loading " + args.url;
    } else {
        message = "Error loading " + args.url + ": " + args.error;
    }
    console.log(message);
});
//webView.url = "https://httpbin.org/html";