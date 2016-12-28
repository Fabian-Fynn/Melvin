var $messages = $('.messages-content');

$(window).load(function() {
  $messages.mCustomScrollbar();
  $('.message-input').focus();
});

function updateScrollbar() {
  $messages.mCustomScrollbar("update").mCustomScrollbar('scrollTo', 'bottom', {
    scrollInertia: 10,
    timeout: 0
  });
}

function insertMessage() {
  msg = $('.message-input').val();
  if ($.trim(msg) == '') {
    return false;
  }
  $('<div class="message message-personal">' + msg + '</div>').appendTo($('.mCSB_container')).addClass('new');
  $('.message-input').val(null);
  updateScrollbar();
  //typing animation
  setTimeout(function(){
    $('<div class="message loading new"><span></span></div>').appendTo($('.mCSB_container'));
    updateScrollbar();
  }, 500);
  //send Message
  socket.emit('message', msg);
}

$('.message-submit').click(function() {
  insertMessage();
});

$(window).on('keydown', function(e) {
  if (e.which == 13) {
    insertMessage();
    return false;
  }
})

var socket = io();
socket.on('response', function(msg) {
  insertAnswer(msg);
});

function insertAnswer(msg) {
  //Insert Answer
  setTimeout(function(){
    $('.message.loading').remove();
    $('<div class="message new">' + msg + '</div>').appendTo($('.mCSB_container')).addClass('new');
    updateScrollbar();
  }, 1500);
}
