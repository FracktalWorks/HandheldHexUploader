const path = require("path");

const constants = {};

constants.hexDir = path.join(__dirname, '../', 'Julia2018MarlinHex');

// constants.variants = [
// 	"Basic",
// 	"Intermediate",
// 	"Advanced",
// 	"Extended",
// 	"Pro Single",
// 	"Pro Dual",
// 	"Pro Single ABL",
// 	"Pro Dual ABL"
// ];

constants.shortVariants = [
	"J18GX",
	"J18GB",
	"J18RX",
	"J18RE",
	"J18PS",
	"J18PD",
	"J18PT",
	"J18PE"
];

// constants.RegexExcludedPorts = /tty(S|AMA)\d+/g;

constants.RegexPorts = /(\/dev\/ttyUSB|COM)\d+/g;

module.exports = constants;