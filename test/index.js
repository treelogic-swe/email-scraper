const {testConf} = require('../conf/test.conf');
const {mailServers} = require('../conf/mail_servers.conf');

const {getMailStore} = require('../src/get_mail_store');
const scrapeMail = require('../src/scrape_mail');

const chalk = require('chalk');

const passed = chalk.bgGreen.bold.white;
const failed = chalk.bgRed.bold.white;

const scrapeConf = mailServers[testConf.testServer];

runTestSuite();

function runTestSuite() {
  try {
    let mailStore = setUp();
    scrapeMail(mailStore, scrapeConf.extractTasks, {
      listenForever: false,
      callback: (status) => {                           // @to-do: Use async/await; need to use Promise in scraper.
        handleFinished(status, handleReadAllTest);
        mailStore = setUp();
        scrapeMail(mailStore, scrapeConf.extractTasks, {
          listenForever: false,
          startAt: 1,
          callback: (status) => {
            handleFinished(status, handleReadFromSecondMailMessageTest);
          }
        });
      }
    });
  } catch (err) {
    handleTestFailed(err, 'Code or syntax error.');
  }
}

// - - - Assertions

function handleReadAllTest(status) {
  processTestResult(status, '100,100');
}

function handleReadFromSecondMailMessageTest(status) {
  processTestResult(status, '100');
}

// - - - Utilities

function setUp() {

  return getMailStore(scrapeConf.access);
}

function tearDown(status) {
  if (status && status.scrapeResultStatus) {
    status.scrapeResultStatus.mailStatus = null;
    status.scrapeResultStatus.scrapeResult = {};
  }
}

function handleFinished(status, handleTestResult) {
  if (status.err) {
    handleTestFailed(status.err, 'Logic error.');
  } else { // Test Assertions go here:
    handleTestResult(status);
  }
  tearDown(status);
}

function processTestResult(status, expected) {
  if (status.scrapeResultStatus.scrapeResult.billing.join() === expected) {
    console.info(passed('Test passed.') + chalk.green.bold(' \u2713  '));
  } else {
    handleTestFailed(null, 'Unexpected result: Expected this result: ' + expected);
  }
}

function handleTestFailed(err, reason) {
  logFailed(reason);
  if (err) {
    console.info('The error message is:');
    console.log(err);
  }
  process.exit(1);
}

function logFailed(reason) {
  console.error(failed('Test failed.  Reason: ' + reason) + chalk.red.bold(' \u274c  '));
}
