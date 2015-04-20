var merchantConfig = require("../shared/models/merchantConfig");
var merchantEl = require("../shared/models/merchantEl");
var httpModule = require("http");
var observableModule = require("data/observable");
var observableArray = require("data/observable-array");
var viewModule = require("ui/core/view");
var frameModule = require("ui/frame");

var dialogs = require("ui/dialogs"); // For alert of merchant id !!! TESTING !!!

var merchants = new observableArray.ObservableArray([]);
var pageData = new observableModule.Observable();
var page;

var merchantID = []; // This is where all of the ID's from the Merchants (displayed in list) will be stored.


exports.load = function (args) {
    page = args.object;
    //pageData.set("merchant", "");   // Event handler for an add button if neccessary
    pageData.set("merchants", merchants);
    page.bindingContext = pageData;

    // Empty the array for subsequent visits to the page
    while (merchants.length) {
        merchants.pop();
    }
    loadMerchants();
};

function loadMerchants() {
    merchantEl.Users.get().then(function (data) {
        data.result.forEach(function (merchant) {
            merchants.push({
                storename: merchant.StoreName
                //merchID: merchant.Id
            });
            merchantID.push(merchant.Id);
        });
    });
}

exports.toMerchant = function (args) {
    var itemIndex = args.index;
    var temp = merchantID[itemIndex];
/*
    dialogs.alert(temp).then(function () {
        console.log("Dialog closed!");
    });
*/
  
    // Navigate to the details page with context set to the data item for specified index
    frameModule.topmost().navigate({
        moduleName: "app/views/merchantPage",
        context: {
            passedValue: temp
        }
    });

    
}

/*
exports.add = function () {   // for an add button if necessary
    // Dismiss the keyboard before adding to the list
    viewModule.getViewById(page, "grocery").dismissSoftInput();

    addGrocery(pageData.get("grocery"));

    //Clear the text field
    pageData.set("grocery", "");
}    */


/*
function loadMerchants() {
    httpModule.getJSON({
        url: "http://api.everlive.com/v1/" + merchantConfig.apiKey + "/Users",
        method: "GET"
    }).then(function (result) {
        result.Result.forEach(function (merchant) {
            merchants.push({
                name: merchant.StoreName
            });
        });
    });
};


function addGrocery(grocery) {
    el.data("Groceries").create({
        Name: grocery
    }).then(function (result) {
        groceries.push({
            name: grocery
        });
    });
}
*/