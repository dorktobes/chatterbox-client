// YOUR CODE HERE:
// debugger;
var app = {
  server: 'http://parse.sfm8.hackreactor.com/chatterbox/classes/messages',
  init: function() {
    $.ajax({
      url: 'http://parse.sfm8.hackreactor.com/chatterbox/classes/messages',
      type: 'GET',
      success: function (data) {
        var roomNames = [];
        var messages = data.results;
        console.log('run render message', data);
        
        for (var i = 0; i < messages.length; i++) {
          roomNames.push(messages[i].roomname);
          app.renderMessage(messages[i]);
          
        }
        //remove duplicate roomnames
        var uniqueRoomNames = _.uniq(roomNames);
        console.log(uniqueRoomNames);
        
        for (var i = 0; i < uniqueRoomNames.length; i++) {
          var $option = $(`<option value=${uniqueRoomNames[i]}>${uniqueRoomNames[i]}</option>`);
          // console.log(uniqueRoomNames[i]);
          $($option).appendTo('#roomSelect');
        }
        //for every roomname in unique list, create a dom object option and append to dropdown
        console.log('run render message', data);
      },  
    });
  },
  send: function (message) {
    $.ajax({
      url: 'http://parse.sfm8.hackreactor.com/chatterbox/classes/messages',
      type: 'POST',
      data: JSON.stringify(message),
      contentType: 'application/json',
      success: function (data) {
        console.log('chatterbox: Message sent by Seanzy');
      },
      error: function (data) {
        console.error('chatterbox: Failed to send message', data);
      }
    });
  }, 
  fetch: function () {
    $.ajax({
      url: 'http://parse.sfm8.hackreactor.com/chatterbox/classes/messages',
      type: 'GET',
      success: function (data) {
        var messages = data.results;
        
        console.log('run render message', data);
        for (var i = 0; i < messages.length; i++) {
          
          app.renderMessage(messages[i]);
          
        }
        console.log('run render message', data);
        
        
      },
      error: function (data) {
        console.error('chatterbox: Failed to send message', data);
      }
    });
  },
  clearMessages: function () {
    $('#chats').empty();
  },
  renderMessage: function (message) { //prepends a div to our chats div
    //input message object
    
    //create an empty div using jquery
    
    //build this message div 
    var $message = document.createElement("div");
    $($message).addClass("message");
    
    //build username div and append to message div
    var $user = $("<div>" + message.username + "</div>");
    // var $user = $(`<div> ${message.user} </div>`);
    $($user).addClass("user");
    if (message.text.slice(0, 8) === '<script>' ) {
      message.text = '';
    }
    //build text div and append to message div
    var $text = $("<div>" + message.text + "</div>");
    // var $text = $(`<div> ${message.text} </div>`);
    $($text).addClass("text");
    
    $($message).append($user);
    $($message).append($text);
    $('#chats').prepend($message);
    
    //prepend message div to chats div
    
    //output nothing
    
  },
  renderRoom: function (roomname) {
    app.clearMessages(); 
    $.ajax({
      url: 'http://parse.sfm8.hackreactor.com/chatterbox/classes/messages', //?where={"roomname":"' + roomname + '"}',
      contents: {'roomname': roomname},
      type: 'GET',
      success: function (data) {
        var messages = data.results; 
        
        for (var i = 0; i < messages.length; i++) {
          app.renderMessage(messages[i]);
        }
      },
    });
  },
  sendMessage: function () {
    var message = {};
    var text = $("input:text").val(); 
    var username = window.location.search.split('=')[1];
    username = username.split('%20').join(' ');
    message.text = text;
    message.username = username;
    app.send(message);
    
    
    
  },
  
  
};

$(document).ready(function () {
  app.init();
  
  $("#messageSubmit").on("click", function() { 
    app.sendMessage(); 
  }); 
  setTimeout(getMessages, 60000);
});

var getMessages = function() {
  
  app.fetch();
  
  setTimeout(getMessages, 60000);
};

  

  
  
  
  
  /*
  A common practice (which we adopt here) is to prevent that by storing our API keys in a special file config.js (referenced in client/index.html) that we add to our .gitignore so that it's never committed to our repo. This means that after you clone down the repo, before running the app, you must re-create that special file and add your API keys to it or the app won't run.
  */