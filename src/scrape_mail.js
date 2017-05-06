const FAIL_MSG = 'Error: Fail get message:';

const {extract} = require('./extract/extract');
const scrapeResultStatus = {
  mailStatus: null,
  scrapeResult: {},
};

module.exports = scrapeMail;


function scrapeMail(mailStore, extractTasks, options = {}) {
  mailStore.connect((err) => {
    if( err ) {
      handleCallback(options.callback, {}, err);
      return console.log('Error: Problem connecting to the mail server: ', err);
    }
    const inbox = getInbox(mailStore, options);
    readAllMessages(inbox, extractTasks);
  });
}


function getInbox(mailStore, options) {
  const startMessageNumber = options.startAt ? options.startAt + 1 : 1;
  const inbox = mailStore.getInbox(startMessageNumber);
  inbox.fail((err) => {
    handleCallback(options.callback, {}, err);
    return console.info(FAIL_MSG, err);
  });
  inbox.done((status) => {
    console.info('End of inbox. Status: ', status);
    scrapeResultStatus.mailStatus = status;
    handleCallback(options.callback, scrapeResultStatus);
    if (!options.listenForever) {
      process.exit();
    }
  });

  return inbox;
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
    const sr = scrapeResultStatus.scrapeResult;
    const extracted = extract(message, extractTasks[ taskName ]) || [];
    if( !sr[ taskName ] ) {
      sr[ taskName ] = extracted;
    } else {
      sr[ taskName ] = sr[ taskName ].concat( extracted );
    }
  } );
}


function handleCallback(cb, scrapeResultStatus, err) {
  if( cb ) {
    cb( { err, scrapeResultStatus } );
  }
}
