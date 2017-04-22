const {testConf} = require('../conf/test.conf');
const {mailServers} = require('../conf/mail_servers.conf');

const {getMailStore} = require('../src/get_mail_store');
const {scrapeMail} = require('../src/scrape_mail');

const chalk = require('chalk');

const passed = chalk.bgGreen.bold.white;
const failed = chalk.bgRed.bold.white;

const scrapeConf = mailServers[ testConf.testServer ];
const mailStore = getMailStore( scrapeConf.access );


try {
  scrapeMail( mailStore, scrapeConf.extractTasks, {listenForever: false, callback: handleFinished} );
} catch (err) {
  handleTestFailed(err, 'Code or syntax error.');
}

// - - -


function handleFinished(status) {
  if( status.err ) {
    handleTestFailed(status.err, 'Logic error.');
  } else { // Test Assertions go here:
    if( status.scrapeResultStatus.received === 1 ) {
     console.info(passed('Test passed.') + chalk.green.bold(' \u2713  '));
    } else {
      handleTestFailed(null, 'Unexpected result: ' + JSON.stringify(status.scrapeResultStatus) + '; expected received 1.');
    }
  }
}

function handleTestFailed(err, reason) {
  logFailed(reason);
  if(err) {
    console.info('The error message is:');
    console.log(err);
  }
  process.exit(1);
}

function logFailed(reason) {
  console.error(failed('Test failed.  Reason: ' + reason) + chalk.red.bold(' \u274c  '));
}
