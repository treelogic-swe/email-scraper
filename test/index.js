const {testConf} = require('../conf/test.conf');
const {mailServers} = require('../conf/mail_servers.conf');

const {getMailStore} = require('../src/get_mail_store');
const {scrapeMail} = require('../src/scrape_mail');

const mailStore = getMailStore( mailServers[ testConf.testServer ].access );

try {
  scrapeMail(mailStore, false, handleFinished);
} catch (err) {
  handleTestFailed(err);
}

// - - -


function handleFinished(status) {
  if( status.err ) {
    handleTestFailed(status.err);
  } else {
    console.info('Test passed.');
  }
}

function handleTestFailed(err) {
  console.error('Test failed.');
  if(err) {
    console.info('The error message is:');
    console.log(err);
  }
  process.exit(1);
}
