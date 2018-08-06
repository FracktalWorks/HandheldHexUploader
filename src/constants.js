const path = require("path");

const constants = {};

constants.hexDir = path.join(__dirname, '../', 'Julia2018MarlinHex');

constants.shortVariants = ["J18GX", "J18GB", "J18RX", "J18RE", "J18PS", "J18PD"];

constants.RegexExcludedPorts = /tty(S|AMA)\d+/g;

module.exports = constants;