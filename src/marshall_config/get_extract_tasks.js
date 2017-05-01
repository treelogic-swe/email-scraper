const {exit} = require('../util.js');
const getMailServerConf = require('./get_mail_server_conf');


function getExtractTasks(clOpts, mailServers) {
  const mailServerConf = getMailServerConf(clOpts, mailServers);
  if( !mailServerConf.extractTasks ) {
    console.error('The specified Mail Server entry does not have any extract tasks.');
    exit(1);
  }

  return mailServerConf.extractTasks;
}

module.exports = getExtractTasks;
