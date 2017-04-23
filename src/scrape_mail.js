const FAIL_MSG = 'Error: Fail get message:';

const {extract} = require('./extract/extract');
const scrapeResultStatus = {
  mailStatus: null,
  scrapeResult: {},
};

exports.scrapeMail = scrapeMail;


function scrapeMail(mailStore, extractTasks, options = {}) {
  mailStore.connect((err) => {
    if( err ) {
      handleCallback(options.callback, {}, err);
      return console.log('Error: Problem connecting to the mail server: ', err);
    }
    const inbox = mailStore.getInbox(1);
    inbox.fail((err) => {
      handleCallback(options.callback, {}, err);
      return console.info(FAIL_MSG, err);
    });
    inbox.done((status) => {
      console.info('End of inbox. Status: ', status);
      scrapeResultStatus.mailStatus = status;
      handleCallback(options.callback, scrapeResultStatus, err);
      if( !options.listenForever ) {
        process.exit();
      }
    });
    readAllMessages(inbox, extractTasks);
  });
}


function readAllMessages(inbox, extractTasks) {
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
        handleReceiveMessage(message, extractTasks);
        recursiveRcpt();
      }
    });
  }

}


function handleReceiveMessage(message, extractTasks) {
  Object.keys(extractTasks).map( ( taskName ) => {
    scrapeResultStatus.scrapeResult[ taskName ] = extract(message, extractTasks[ taskName ]) || [];
  } );
}


function handleCallback(cb, scrapeResultStatus, err) {
  if( cb ) {
    cb( { err, scrapeResultStatus } );
  }
}
