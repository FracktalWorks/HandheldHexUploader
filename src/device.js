// const path = require("path");
// const fs = require('fs');
const exec = require('child_process').exec;

// // const constants = require('./constants');

const device = {};

device.shutdown = function(cb) {
  exec('sudo shutdown -h now', {}, function(error, stdout, stderr) {
    console.log("device.shutdown");
    if (stdout)
      console.log(stdout);
    if (stderr)
      console.log(stderr);
    cb(error ? "Failed to shut down!" : false);
  });
};

device.setupWifi = function(ssid, password, cb) {
  if (!ssid)
    return cb("SSID is empty!");
    
  if (!password)
    return cb("Password is empty!");

  exec('sh wifi.sh "' + ssid + '" "' + password + '"', {}, function(error, stdout, stderr) {
    console.log("device.setupWifi");
    console.log(error ? stdout : stderr);
    cb(error ? "Failed to save WiFi credentials!" : "WiFi credentials saved.");
  });
};

module.exports = device;