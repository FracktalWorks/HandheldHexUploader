const path = require("path");
const fs = require('fs');
const exec = require('child_process').exec;

const constants = require('./constants');

const update = {};

update.version = function() {
  let filePath = path.join(constants.hexDir, 'info.json');
  
  try {
    if (!fs.existsSync(filePath)) 
      return false;

    let rawData = fs.readFileSync(filePath);  
    let data = JSON.parse(rawData); 
    return data.version;
  } catch (e) {
    console.log('Err: update.version');
    console.log(e);
    return false;
  }
  
};

update.pullLatestHex = function(cb) {
  exec('git pull origin master', {
    cwd: constants.hexDir
  }, function(error, stdout, stderr) {
    if (error) 
      cb(stderr);
    else
      cb(stdout);
  });
};

module.exports = update;