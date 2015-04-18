var dialogs = require("ui/dialogs");
var el = require("../shared/models/el");
var frameModule = require("ui/frame");
var images = require("../shared/utils/images");
var pageData = require("../shared/models/userCredentials");
var viewModule = require("ui/core/view");


exports.load = function (args) {
    var page = args.object;
    page.bindingContext = pageData;
};

// Will add in Merchant list here!

/*
exports.toChat = function (args) {
    var topmost = frameModule.topmost();
    topmost.navigate("app/views/chat");
};
*/