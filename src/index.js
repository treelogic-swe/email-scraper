const commandLineArgs = require('command-line-args')

const {mailServers} = require('../conf/mail_servers.conf');

const {commandLineOptionDefinitions} = require('./command_line_option_definitions');

const {getMailStore} = require('./get_mail_store');
const {scrapeMail} = require('./scrape_mail');

const clOpts = commandLineArgs(commandLineOptionDefinitions);


if( clOpts.help ) {
  console.info(
    `Run this program like this: \`node index.js --mailserver localTest\`, where 'localTest' is the specified mail server.
     \nSubstitute your choice of mailserver.  Note that the mailserver is configured in 'conf/mail_servers.conf.js'.
     \nOptionally supply '--keepListening true' to keep the server listening indefinitely for new mail messages.
     \nGet the list of mail servers like this: \`node index.js --list\`
     \nYou can also specify username and password (overrides any config).
     \nPrepend all long-form option names with '--'.  To reduce typing you can use the option aliases listed below in the command line option list.
     \nPrepend all aliases (the short-form option names) with '-'.
     \nHere are all command line options:
     \n\nCommand Line Option List
     \n------------------------
     `);
  console.log( commandLineOptionDefinitions );

  exit(0);
}
if( clOpts.list ) {
  console.info(
    `The list of configured mail servers is:
     \n(Beginning of list)
     \n${Object.keys(mailServers).join()}
     \n(End of list)
  `);

  exit(0);
}
const mailStore = getMailStore( getAccessConf() );

scrapeMail(mailStore, getExtractTasks(), {listenForever: clOpts.keepListening} );

// - - -


function getAccessConf() {
  const mailServerConf = getMailServerConf();
  if( !mailServerConf.access ) {
    console.error('The specified Mail Server entry does not have access info: ' + key);
    exit(1);
  }
  if( clOpts.username ) {
    if( mailServerConf.access.username ) {
      console.info('Overriding the specified username with the username supplied on the command line.')
    }
    mailServerConf.access.username = clOpts.username;
  }
  if( clOpts.password ) {
    if( mailServerConf.access.pwd ) {
      console.info('Overriding the specified password with the password supplied on the command line.')
    }
    mailServerConf.access.pwd = clOpts.password;
  }

  return mailServerConf.access;
}


function getExtractTasks() {
  const mailServerConf = getMailServerConf();
  if( !mailServerConf.extractTasks ) {
    console.error('The specified Mail Server entry does not have any extract tasks: ' + key);
    exit(1);
  }

  return mailServerConf.extractTasks;
}


function getMailServerConf() {
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

function exit(code) {
  process.exit(code);
}
