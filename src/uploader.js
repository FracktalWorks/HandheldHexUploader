const path = require("path");
const fs = require('fs');

const uploader = {};

const constants = require('./constants');

function getAvrgirl() {
  try {
    const name = 'avrgirl-arduino';
    return require(name);
  } catch(e){}
  return false;
}


/**
 * 
 * @param {*} cb(error, payload) 
 */
uploader.getPorts = function(cb) {
  const Avrgirl = getAvrgirl();

  if (Avrgirl) {
    Avrgirl.list(function(err, ports) {
      if (err) {
        cb(err, null);
      } else {
        console.log(ports);
        const op = ports.filter(function(port) {
          // console.log(port.comName);
          return port.comName.search(constants.RegexPorts) > -1;
        }).map(function(port) {
          return port.comName;
        });
        cb(false, op);
      }
    });
  } else {
    cb('Avrgirl-arduino not found', null);
  }
};

/**
 * 
 * @param {*} port full USB port name
 * @param {*} optCode build code 
 * @param {*} cb function(err, data) 
 */
uploader.uploadHex = function(port, optCode, cb) {
  if (!port)
    return cb('Wrong port parameter', null);

  if (optCode < 0 || optCode >= constants.shortVariants.length) 
    return cb('Wrong variant parameter', null);

  const Avrgirl = getAvrgirl();

  if (Avrgirl) {
    var avrgirl = new Avrgirl({
      board: 'mega',
      port: port
    });

    const file = constants.shortVariants[optCode] + "_mega.hex";
    const filePath = path.join(constants.hexDir, file);
    console.log(filePath);
  
    if (!fs.existsSync(filePath))
      return cb(file + ' not found.', null); 
    else {
      avrgirl.flash(filePath, function (error) {
        if (error)
          return cb(error, null);
        else
          return cb(false, 'Uploaded ' + file);
      });
    }
    
  } else {
    cb('Avrgirl-arduino not found', null);
  }
};

module.exports = uploader;