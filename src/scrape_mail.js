const FAIL_MSG = 'Error: Fail get message:';

const hasha = require('hasha');
const every = require('lodash/every');

const {extract} = require('./extract/extract');
const constants = require('./constants');

const scrapeResultStatus = {
  mailStatus: null,
  scrapeResult: {}
};

module.exports = scrapeMail;

function scrapeMail(mailStore, extractTasks, options = {}) {
  if (mailStore.status > 3) { // Aready connected, so need to run processMailbox job directly.
    processMailbox(mailStore, extractTasks, options);
  } else {
    mailStore.connect((err) => {
      if (err) {
        handleCallback(options.callback, {}, err);
        return console.log('Error: Problem connecting to the mail server: ', err);
      }
      processMailbox(mailStore, extractTasks, options);
    });
  }
}

function processMailbox(mailStore, extractTasks, options) {
  const inbox = getInbox(mailStore, extractTasks, options);
  readAllMessages(inbox, extractTasks);
}

function getInbox(mailStore, extractTasks, options) {
  const startMessageNumber = options.startAt
    ? options.startAt + 1
    : 1;
  const inbox = mailStore.getInbox(startMessageNumber);
  inbox.fail((err) => {
    handleCallback(options.callback, {}, err);
    return console.info(FAIL_MSG, err);
  });
  inbox.done((status) => {
    console.info('End of inbox. Status: ', status);
    scrapeResultStatus.mailStatus = status;
    removeEmptyRecords(extractTasks);
    handleCallback(options.callback, scrapeResultStatus);
    if (!options.listenForever) {
      mailStore.close();
    }
  });

  return inbox;
}

function readAllMessages(inbox, extractTasks) {
  recursiveRcpt();

  // - - -

  function recursiveRcpt() {
    inbox.getNextMessage((err, message) => {
      if (err) {
        return console.error(FAIL_MSG, err);
      }
      if (message === null) {
        return console.info('Info: There are no more email messages to read, so exiting.');
      } else {
        handleReceiveMessage(message, extractTasks);
        recursiveRcpt();
      }
    });
  }
}

function handleReceiveMessage(message, extractTasks) {
  const sr = scrapeResultStatus.scrapeResult;
  addHash(message, sr, constants.HASH);
  Object
    .keys(extractTasks)
    .map((taskName) => {
      const extracted = extract(message, extractTasks[taskName]) || [''];
      if (!sr[taskName]) {
        sr[taskName] = extracted;
      } else {
        sr[taskName] = sr[taskName].concat(extracted);
      }
    });
}

function addHash(message, sr, key) {
  if (!sr[key]) {
    sr[key] = [];
  }
  sr[key].push(hasha(JSON.stringify(message))); // We use the whole message object in case some text fields are blank, such as the body.
}

function removeEmptyRecords(extractTasks) {
  const sr = scrapeResultStatus.scrapeResult;
  const listNames = Object.keys(sr);
  const extractListNames = Object.keys(extractTasks);
  if(!listNames.length) {
    return;
  }
  sr[constants.HASH].map((messageHash, index) => {
    if (noMatchesForMessage(sr, extractListNames, index)) {
      removeEmptyResult(sr, listNames, index);
    }
  });
}

function noMatchesForMessage(sr, extractListNames, index) {
  return every(extractListNames, (listName) => {
    return sr[listName][index] === '';
  });
}

function removeEmptyResult(sr, listNames, index) {
  listNames.map( (listName) => {
    sr[listName].splice(index, 1);
  } );
}

function handleCallback(cb, scrapeResultStatus, err) {
  if (cb) {
    cb({err, scrapeResultStatus});
  }
}
