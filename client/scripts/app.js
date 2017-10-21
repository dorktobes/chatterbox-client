// YOUR CODE HERE:
// debugger;
var app = {
  server: 'http://parse.sfm8.hackreactor.com/chatterbox/classes/messages',
  init: function() {},
  
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
  sendMessage: function () {
    console.log('I made a button');
  },
  
  
};

// $(window).ready(function() {
//     console.log( "ready!" );
// });

$(window).ready(function () {
  getMessages();
});

var getMessages = function() {
  
  app.fetch();
  
  setTimeout(getMessages, 60000);
};

  
  
  
  
  
  
  /*
  A common practice (which we adopt here) is to prevent that by storing our API keys in a special file config.js (referenced in client/index.html) that we add to our .gitignore so that it's never committed to our repo. This means that after you clone down the repo, before running the app, you must re-create that special file and add your API keys to it or the app won't run.
  */