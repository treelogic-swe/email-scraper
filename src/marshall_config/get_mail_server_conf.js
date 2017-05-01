const {exit} = require('../util.js');

function getMailServerConf(clOpts, mailServers) {
  if( !clOpts.mailserver ) {
    console.error('No Mail Server has been specified.');
    exit(1);
  }
  const key = clOpts.mailserver;
  if( !mailServers[ key ] ) {
    console.error('The specified Mail Server does not exist: ' + key);
    exit(1);
  }

  return mailServers[ key ];
}

module.exports = getMailServerConf;
