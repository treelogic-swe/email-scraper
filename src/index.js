const {mailServers} = require('../conf/mail_servers.conf');
const {getMailStore} = require('./get_mail_store');
const {scrapeMail} = require('./scrape_mail');

const firstArg = 2;

if( process.argv[firstArg] === '--help' ) {
  console.info(
    `Run this program like this: \`node index.js kattare\`, where 'kattare' is the specified mail server.
     \nOptionally add \`true\` as the second argument to keep the server listening indefinitely for new mail messages.
     \nGet the list of mail servers like this: \`node index.js --list\`
     `
     );
  exit();
}
if( process.argv[firstArg] === '--list' ) {
  console.info('The list of configured mail servers is: ');
  console.info('(Beginning of list)');
  console.info( Object.keys(mailServers).join() );
  console.info('(End of list)');
  exit();
}
const mailStore = getMailStore( getAccessConf() );
scrapeMail(mailStore, process.argv[ firstArg + 1 ]);

// - - -


function getAccessConf() {
  if( !process.argv.length || typeof process.argv[firstArg] === undefined ) {
    console.error('No Mail Server has been specified.');
    exit();
  }
  const key = process.argv[firstArg];
  if( !mailServers[ key ] ) {
    console.error('The specified Mail Server does not exist: ' + key);
    exit();
  }
  if( !mailServers[ key ].access ) {
    console.error('The specified Mail Server entry does not have access info: ' + key);
    exit();
  }

  return mailServers[ key ].access;
}


function exit() {
  process.exit();
}
