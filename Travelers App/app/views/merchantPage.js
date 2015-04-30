var merchantConfig = require("../shared/models/merchantConfig");
var merchantEl = require("../shared/models/merchantEl");
var httpModule = require("http");
var observableModule = require("data/observable");
var observableArray = require("data/observable-array");
var viewModule = require("ui/core/view");
var frameModule = require("ui/frame");
var textViewModule = require("ui/text-view");
var dialogs = require("ui/dialogs");

var phone = require("../node_modules/nativescript-phone/phone"); //adds phone


var merchants = new observableArray.ObservableArray([]);
var pageData = new observableModule.Observable();
var page;

var merchantID;


exports.load = function (args) {
    page = args.object;
    page.bindingContext = pageData;
    //dialogs.alert("Value passed [" + page.navigationContext.passedValue + "]");  // TESTING: Used to test if merchant Id was being passed

    pageData.set("storeName", "");
    pageData.set("storeType", "");
    pageData.set("description", "");
    pageData.set("street", "");
    pageData.set("city", "");
    pageData.set("state", "");
    pageData.set("zipCode", "");
    pageData.set("emailAddress", "");
    pageData.set("phone", "");
    pageData.set("hours", "");



    merchantEl.Users.get().then(function (data) {
        data.result.forEach(function (merchant) {
            if (merchant.Id == page.navigationContext.passedValue) {
                pageData.set("storeName", merchant.StoreName);
                pageData.set("storeType", merchant.StoreType);
                pageData.set("description", merchant.Description);
                pageData.set("street", merchant.Street);
                pageData.set("city", merchant.City);
                pageData.set("state", merchant.State);
                pageData.set("zipCode", merchant.ZipCode);
                pageData.set("emailAddress", merchant.Email);
                pageData.set("phone", merchant.Phone);
                pageData.set("hours", merchant.Hours);
            }
        });
    });

};
/*
exports.pageNavigatedTo = function (args) {
    var page = args.object;
    page.bindingContext = page.navigationContext;
}
*/

exports.callNumber = function (args) {
    var storeNumber = pageData.get("phone");
    phone.dial(storeNumber, true);
};


// go back
exports.toMerchantList = function (args) {
    var topmost = frameModule.topmost();
    topmost.navigate("app/views/merchantList");
};