const commandLineArgs = require('command-line-args');

const {mailServers} = require('../conf/mail_servers.conf');

const {commandLineOptionDefinitions} = require('./command_line_option_definitions');

const {getMailStore} = require('./get_mail_store');
const {scrapeMail} = require('./scrape_mail');

const getAccessConf = require('./marshall_config/get_access_conf');
const getExtractTasks = require('./marshall_config/get_extract_tasks');

const {exit} = require('./util.js');

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

console.log('\n\u2600 Running with these options:');
console.log(clOpts);

const accessConfig = getAccessConf(clOpts, mailServers);
console.log('\n\u2600 Running with this mailserver access configuration:');
console.log(accessConfig);

const mailStore = getMailStore( accessConfig, clOpts );

scrapeMail(mailStore, getExtractTasks(clOpts, mailServers), {listenForever: clOpts.keepListening} );
