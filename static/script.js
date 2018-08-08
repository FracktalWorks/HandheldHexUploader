var socket = io.connect(':3000');

function showWaitDialog(content) {
  $('#waitDialogText').html(content);
  $('#waitDialog').modal({backdrop: 'static', keyboard: false});
}

function showOutputDialog(content) {
  $('#outputDialogText').html(content);
  // $('#outputDialog').modal({backdrop: 'static', keyboard: false});
  $('#outputDialog').modal();
}

function showOptionsDialog(target) {
  if (target.children.length == 0) return;

  $("#optionsDialogOpts").html("");

  $(target.children).each(function() {
    var el = "<div class='radio'><label>";
    el += "<input type='radio' name='" + target.id + "' " + (this.selected ? "checked" : "")+ " class='optButton' value='" + this.value + "'>";
    el += this.text + "</label></div>";
    $("#optionsDialogOpts").append(el);
  });

  $('.optButton').click(function() {
    // console.log($(this).val());
    $(target).val($(this).val());
    hideAllDialogs();
  });

  $('#optionsDialog').modal({backdrop: 'static', keyboard: false});
}

function showWifiDialog() {
  $('#confirm-wifi').off();
  $('#wifiDialog').modal({
    backdrop: 'static', keyboard: false
  }).one('click', '#confirm-wifi', function(e) {
    var data = {
      ssid: $("#ssid").val(),
      password: $("#password").val()
    };
  
    hideAllDialogs();
    showWaitDialog("Saving WiFi credentials and restarting..");
    socket.emit('wifi', data);
  });;
}

function showShutdownDialog() {
  $('#confirm-shutdown').off();
  $('#shutdownDialog').modal({
    backdrop: 'static', keyboard: false
  }).one('click', '#confirm-shutdown', function(e) {
    socket.emit('shutdown', '');
  });
}

function hideDialog(id, dataId = null) {
  $('#' + id).modal('hide');
  $('#' + id).data('bs.modal', null);
  if (!dataId)
  $('#' + dataId).html('');
}

function hideAllDialogs() {
  hideDialog('waitDialog', 'waitDialogText');
  hideDialog('outputDialog', 'outputDialogText');
  hideDialog('optionsDialog', 'optionsDialogText');
  hideDialog('wifiDialog');
  hideDialog('shutdownDialog');
}

/** Socket event callbacks **/

socket.on('connect', function(data) {
  socket.emit('getVersion', '');
  socket.emit('refreshPorts', '');
});

socket.on('retVersion', function(data) {
  console.log('retVersion: ' + data);
  if (!data) {
    $('#version').val("Error");
    $('#upload').prop("disabled", true);
  } else
    $('#version').val(data);
});

socket.on('updateHexDone', function(data) {
  console.log('updateHexDone: ' + data);
  hideAllDialogs();
  showOutputDialog(data);
});

socket.on('refreshPortsDone', function(data) {
  console.log('refreshPortsDone');
  console.info(data);
  
  var comPort = $("#comPort");
  comPort.empty();

  hideAllDialogs();
  $('#upload').prop("disabled", true);

  if (!data)
    showOutputDialog("No data received.");
  else {
    if (data.err)
      showOutputDialog(data.err);
    else {
      if (data.ports.length == 0 ) {
        return showOutputDialog("No devices found!");
      }

      $.each(data.ports, function(key, value) {
        comPort.append($("<option></option>").attr("value", value).text(value));
      });

      $('#upload').prop("disabled", false);
    }
  }

  // $('#waitDialog').modal('hide');
});

socket.on('uploadDone', function(op) {
  console.log('uploadDone');
  console.info(op);

  hideAllDialogs();

  if (!op)
    showOutputDialog("No data received.");
  else {
    if (op.err)
      showOutputDialog("Upload failed. Check browser log");
    else
      showOutputDialog(op.data);
  }
});

socket.on('shutdownDone', function(op) {
  console.log('shutdownDone');
  console.info(op);

  hideAllDialogs();

  if (op)
    showOutputDialog(op);
  else
    showWaitDialog("Shutting down..");
});

socket.on('wifiDone', function(op) {
  console.log('wifiDone');
  console.info(op);

  hideAllDialogs();

  showOutputDialog(op);

});


/** DOM event listeners **/
$('select.no-select').on('mousedown', function(e) {
  e.preventDefault();
  this.blur();
  window.focus();
  // console.log(e.target.children);
  showOptionsDialog(e.target);
});


$('#refreshPorts').click(function() {
  showWaitDialog("Refreshing ports..");
  socket.emit('refreshPorts', '');
});

$('#update').click(function() {
  showWaitDialog("Downloading latest firmware files...");
  socket.emit('updateHex', '');
});

$('#wifi').click(function() {
  showWifiDialog();
});

/*
$('#confirm-wifi').click(function(e) {
  var data = {
    ssid: $("#ssid").val(),
    password: $("#password").val()
  };

  hideAllDialogs();
  showWaitDialog("Saving WiFi credentials and restarting..");
  socket.emit('wifi', data);
});
*/

$('#upload').click(function() {
  if ($('#comPort').val() && $('#variant').val()) {
    var data = {
      port: $("#comPort").val(),
      optCode: $('#variant').val()
    };

    var selText = $("#variant").children("option").filter(":selected").text();

    showWaitDialog("Uploading firmware for <b>" + selText + "</b>...");
    socket.emit('upload', data);
  }
});

$('#shutdown').click(function() {
  showShutdownDialog();
});