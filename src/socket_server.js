const update = require('./update');
const uploader = require('./uploader');
const constants = require('./constants');

module.exports = function(io) {
  return function(socket) {
    // get current hex build version
    socket.on('getVersion', function(data){
      console.log('getVersion');

      io.emit('retVersion', update.version());
    });

    // update hex submodule
    socket.on('updateHex', function(data){
      console.log('updateHex');

      update.pullLatestHex(function(op) {
        io.emit('retVersion', update.version());
        setTimeout(function() { 
          io.emit('updateHexDone', op);
        }, 500);
      });
    });

    // refresh ports
    socket.on('refreshPorts', function(data){
      console.log('refreshPorts');

      uploader.getPorts(function(err, op) {
        var ret = {
          err: err,
          ports: op
        };

        setTimeout(function() { 
          io.emit('refreshPortsDone', ret);
        }, 1500);
      });
    });

    // upload hex
    socket.on('upload', function(data) {
      console.log('upload');

      
      uploader.uploadHex(data.port, data.optCode, function(err, op) {
        var ret = {
          err: err,
          data: op
        };

        setTimeout(function() { 
          io.emit('uploadDone', ret);
        }, 500);
      });
    });
  };
};