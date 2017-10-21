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
        console.log('chatterbox: Message sent by Seanzy', data);
      },
      error: function (data) {
        console.error('chatterbox: Failed to send message', data);
      }
    });
  },
  
};



//$(window).onready(function () {});

  
  
  
  
  
  
  /*
  A common practice (which we adopt here) is to prevent that by storing our API keys in a special file config.js (referenced in client/index.html) that we add to our .gitignore so that it's never committed to our repo. This means that after you clone down the repo, before running the app, you must re-create that special file and add your API keys to it or the app won't run.
  */