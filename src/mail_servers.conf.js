const mailServers = {
  kattare: {
    access: {
      protocol: 'pop3',
      fqDomain: 'mail.kattare.com',
      port: 110,
      username: 'treelogic_admin',
      pwd: 'thundercl0uD1',
    },
    extractTasks: {
      billing: {
        subject: [ /^Kattare:\s+Payment\s+Received\s*$/, /^[Ff]w[d]?:\s+Kattare:\s+Payment\s+Received\s*$/ ],
        sender: /.*/,
        body: /Amount:\s*\$\s*(\d+)/gm,
      }
    }
  }
};

exports.mailServers = mailServers;
