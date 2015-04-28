var merchantConfig = require("./merchantConfig");
var Everlive = require("../../lib/everlive");
module.exports = new Everlive(merchantConfig.apiKey);
