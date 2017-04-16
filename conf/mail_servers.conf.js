const NO_MATCH = /^$/;  // Use this to turn off matches for a given category.

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
      billing: {  // Object properties (keys) are 'and'd, and Array elements inside the properties are 'or'd.
        subject: [ /^Kattare:\s+Payment\s+Received\s*$/, /^[Ff]w[d]?:\s+Kattare:\s+Payment\s+Received\s*$/ ],
        from: [ /.*/ ], // Uses the 'address' field only, not name.
        to: [ /.*/ ],  // Uses the 'address' field only, not name.
        text: { fixed_amount_bill: /Amount:\s*\$\s*(\d+)/gm, network_usage_bill: NO_MATCH },  // This is the e-mail body text.
      }
    }
  }
};

exports.mailServers = mailServers;
