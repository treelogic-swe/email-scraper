const {mailServers} = require('../conf/mail_servers.conf');

const {getMailStore} = require('./get_mail_store');
const scrapeMail = require('./scrape_mail');

const getAccessConf = require('./marshall_config/get_access_conf');
const getExtractTasks = require('./marshall_config/get_extract_tasks');

const processCommandLineOptions = require('./command_line_options/process_command_line_options');
const handleOutput = require('./output/handle_output');

const clOpts = processCommandLineOptions(mailServers);

const accessConfig = getAccessConf(clOpts, mailServers);
console.log('\n\u2600 Running with this mailserver access configuration:');
console.log(accessConfig);

const mailStore = getMailStore(accessConfig, clOpts);

const options = {
  listenForever: clOpts.keepListening,
  callback: (result) => {
    handleOutput(clOpts, result);
  }
};

const extractTasks = getExtractTasks(clOpts, mailServers);

scrapeMail(mailStore, extractTasks, options);
