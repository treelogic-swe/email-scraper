const mailx = require('mailx');

module.exports = getMailStore;

function getMailStore(conf) {
  const {protocol, fqDomain, port, username, pwd} = conf;
  const mailStore = mailx.store(protocol, fqDomain, port, username, pwd || '');

  return mailStore;
}
