const {exit} = require('../util.js');
const getMailServerConf = require('./get_mail_server_conf');


function getAccessConf(clOpts, mailServers) {
  const mailServerConf = getMailServerConf(clOpts, mailServers);
  if (!mailServerConf.access) {
    console.error('The specified Mail Server entry does not have access info.');
    exit(1);
  }
  if (clOpts.username) {
    if (mailServerConf.access.username) {
      logAboutCmdLOverride('username');
      logAboutCmdLOptions();
    }
    mailServerConf.access.username = clOpts.username;
  }
  if (clOpts.password) {
    if (mailServerConf.access.pwd) {
      logAboutCmdLOverride('password');
      logAboutCmdLOptions();
    }
    mailServerConf.access.pwd = clOpts.password;
  }

  return mailServerConf.access;
}

function logAboutCmdLOverride(name) {
  console.info(`Overriding the specified ${name} with the ${name} supplied on the command line.`);
}

function logAboutCmdLOptions() {
  console.info('Command line option info, including default settings that may be applied, is in:' +
      ' ./src/command_line_option_definitions.js');
}

module.exports = getAccessConf;
