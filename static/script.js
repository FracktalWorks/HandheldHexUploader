var socket = io.connect('http://localhost:3000');

function showWaitDialog(content) {
  $('#waitDialogText').html(content);
  $('#waitDialog').modal({backdrop: 'static', keyboard: false});
}

function showOutputDialog(content) {
  $('#outputDialogText').html(content);
  $('#outputDialog').modal({backdrop: 'static', keyboard: false});
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
    hideDialogs();
  });

  $('#optionsDialog').modal({backdrop: 'static', keyboard: false});
}

function hideDialogs() {
  $('#waitDialog').modal('hide');
  $('#waitDialogText').html('');

  $('#outputDialog').modal('hide');
  $('#outputDialogText').html('');

  $('#optionsDialog').modal('hide');
  $('#optionsDialogOpts').html('');
}


/** Socket event callbacks **/

socket.on('connect', function(data) {
  socket.emit('getVersion', '');
  socket.emit('refreshPorts', '');
});

socket.on('retVersion', function(data) {
  console.log('retVersion: ' + data);
  $('#version').val(data);
});

socket.on('updateHexDone', function(data) {
  console.log('updateHexDone: ' + data);
  hideDialogs();
  showOutputDialog(data);
});

socket.on('refreshPortsDone', function(data) {
  console.log('refreshPortsDone');
  console.info(data);
  
  var comPort = $("#comPort");
  comPort.empty();

  hideDialogs();
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

  hideDialogs();

  if (!op)
    showOutputDialog("No data received.");
  else {
    if (op.err)
      showOutputDialog("Upload failed. Check browser log");
    else
      showOutputDialog(op.data);
  }
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
  showWaitDialog("Updating hex files..");
  socket.emit('updateHex', '');
});

$('#upload').click(function() {
  if ($('#comPort').val() && $('#variant').val()) {
    var data = {
      port: $("#comPort").val(),
      optCode: $('#variant').val()
    };

    showWaitDialog("Uploading hex..");
    socket.emit('upload', data);
  }
});