// const path = require("path");
// const fs = require('fs');
const exec = require('child_process').exec;

// // const constants = require('./constants');

const device = {};

device.shutdown = function(cb) {
  exec('sudo shutdown -h now', {}, function(error, stdout, stderr) {
    console.log("device.shutdown");
    console.log(error ? stdout : stderr);
    cb(error);
  });
};

device.setupWifi = function(ssid, password, cb) {
  if (!ssid)
    return cb("SSID is empty!");
    
  if (!password)
    return cb("Password is empty!");

  exec('sh wifi.sh ' + ssid + ' ' + password, {}, function(error, stdout, stderr) {
    console.log("device.setupWifi");
    console.log(error ? stdout : stderr);
    cb(error ? "Failed to save WiFi credentials!" : "WiFi credentials saved.");
  });
};

module.exports = device;