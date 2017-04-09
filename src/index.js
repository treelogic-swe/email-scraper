'use strict';

const mailx = require('mailx');

const store = mailx.store('pop3', 'mail.kattare.com', 110, 'treelogic_admin', 'thundercl0uD1'); // @to-do: Pull this from salted database entry.

console.log(store);

store.connect(function(err) {
  if (err) {
    return console.log('err connect: ', err);
  }
  let inbox = store.getInbox(1);
  inbox.fail(function(err){
    console.log('fail get messages: ', err);
  });
  inbox.done(function(status){
    console.log('end of inbox');
  });
  (function recursiveRcpt() {
    inbox.getNextMessage(function(err, message) {
      if (err) {
        return console.log('fail get message: ', err);
      }
      if (message === null) {
        return console.log('no more message to read');
      }
      console.log(message.subject);
      recursiveRcpt();
    });
  })();
});
