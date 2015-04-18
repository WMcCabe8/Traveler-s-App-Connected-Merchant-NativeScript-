var dialogs = require("ui/dialogs");
var el = require("../shared/models/el");
var frameModule = require("ui/frame");
var images = require("../shared/utils/images");
var pageData = require("../shared/models/userCredentials");
var viewModule = require("ui/core/view");
var scrollViewModule = require("ui/scroll-view");

exports.load = function (args) {
    var scrollView = new scrollViewModule.ScrollView();

    var page = args.object;
    var email = viewModule.getViewById(page, "email");
    var username = viewModule.getViewById(page, "username");
    var firstname = viewModule.getViewById(page, "firstname");
    var lastname = viewModule.getViewById(page, "lastname");

    pageData.set("email_address", "");
    pageData.set("username", "");
    pageData.set("password", "");
    pageData.set("logoSource", images.logo);
    pageData.set("firstName", "");
    pageData.set("lastName", "");

    page.bindingContext = pageData;
    // Turn off autocorrect and autocapitalization for iOS
    if (username.ios) {
        email.ios.autocapitalizationType =
            UITextAutocapitalizationType.UITextAutocapitalizationTypeNone;
        email.ios.autocorrectionType =
            UITextAutocorrectionType.UITextAutocorrectionTypeNo;
        username.ios.autocapitalizationType =
            UITextAutocapitalizationType.UITextAutocapitalizationTypeNone;
        username.ios.autocorrectionType =
            UITextAutocorrectionType.UITextAutocorrectionTypeNo;
    }
};
exports.register = function () {
    var currentLoc = "DEFAULT";
    
    //Adds username, password, Email, FirstName, LastName, and CurrentLocation
    el.Users.register(pageData.get("username"), pageData.get("password"), {
        Email: pageData.get("email_address"),
        FirstName: pageData.get("firstName"),
        LastName: pageData.get("lastName"),
        CurrentLocation: currentLoc
    }, function (response) {
        dialogs.alert("Your account was successfully created.").then(function () {
            frameModule.topmost().navigate("app/views/login");
        });
    }, function (error) {
        dialogs.alert({
            message: "Unfortunately we were unable to create your account.",
            okButtonText: "OK"
        });
    });
};