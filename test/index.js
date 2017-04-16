const {testConf} = require('../conf/test.conf');
const {mailServers} = require('../conf/mail_servers.conf');

const {getMailStore} = require('../src/get_mail_store');
const {scrapeMail} = require('../src/scrape_mail');

const mailStore = getMailStore( mailServers[ testConf.testServer ].access );
try {
  scrapeMail(mailStore, false, handleFinished);
} catch (err) {
  console.error('Test failed.');
  throw err;
}

function handleFinished(status) {
  if( status.err ) {
    console.error('Test failed with error: ');
    console.log(status.err);
    throw status.err;
  } else {
    console.error('Test passed.');
  }
}
