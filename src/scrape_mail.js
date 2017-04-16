const FAIL_MSG = 'Error: Fail get message:';

exports.scrapeMail = scrapeMail;


function scrapeMail(mailStore, listenForever, callback) {
  mailStore.connect((err) => {
    if( err ) {
      handleCallback(callback, err);
      return console.log('Error: Problem connecting to the mail server: ', err);
    }
    const inbox = mailStore.getInbox(1);
    inbox.fail((err) => {
      handleCallback(callback, err);
      return console.info(FAIL_MSG, err);
    });
    inbox.done((status) => {
      console.info('End of inbox. Status: ', status);
      handleCallback(callback);
      if( !listenForever ) {
        process.exit();
      }
    });
    readAllMessages(inbox);
  });
}

// - - -


function readAllMessages(inbox) {
  recursiveRcpt();

  // - - -


  function recursiveRcpt() {
    inbox.getNextMessage((err, message) => {
      if( err ) {
        return console.error(FAIL_MSG, err);
      }
      if( message === null ) {
        return console.info('Info: There are no more email messages to read, so exiting.');
      } else {
        handleReceiveMessage(message);
        recursiveRcpt();
      }
    });
  }

}

function handleReceiveMessage(message) {
  console.log(message.text);
  console.log(message.subject);

  console.log(Object.keys(message));
}


function handleCallback(cb, err) {
  if( cb ) {
    cb( { err } );
  }
}
