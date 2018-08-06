// const path = require("path");
// const fs = require('fs');
const exec = require('child_process').exec;

// // const constants = require('./constants');

const device = {};

device.shutdown = function(cb) {
  exec('sudo shutdown -h now', {}, function(error, stdout, stderr) {
    console.log("Shutdown");
    console.log(error ? stdout : stderr);
    cb(error);
  });
};

module.exports = device;