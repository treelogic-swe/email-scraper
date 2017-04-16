const mailx = require('mailx');

exports.getMailStore = getMailStore;

function getMailStore(conf) {
  const {protocol, fqDomain, port, username, pwd} = conf;
  const mailStore = mailx.store(protocol, fqDomain, port, username, pwd); // @to-do: Pull this from salted database entry.

  return mailStore;
}
