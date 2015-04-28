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


// Function that navigates to list of merchants (merchantList) when button is tapped
exports.toMerchantList = function (args) {
    var topmost = frameModule.topmost();
    topmost.navigate("app/views/merchantList");
};

// Adds merchant list here on button tap
exports.toChat = function (args) {
    var topmost = frameModule.topmost();
    topmost.navigate("app/views/chatPage");
};