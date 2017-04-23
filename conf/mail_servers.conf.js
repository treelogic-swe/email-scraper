const NO_MATCH = /^$/;  // Use this to turn off matches for a given category.

const mailServers = {
  kattare: {
    access: {
      protocol: 'pop3',
      fqDomain: 'mail.kattare.com',
      port: 110,
      /*-
       * Config Doc:
       * Username and password can be specified on the command line like this:
       *   --username foo --password bar
       */
      username: '',
      pwd: '',
    },
    extractTasks: {
      billing: {
        /*-
         * Config Doc:
         *
         * Object keys (keys: 'subject', 'from', 'to', 'text', and so forth) are either 'and'd or 'or'd depending
         * on the 'conditional' object specified below (see the 'localTest' config).
         * If it is left unspecified, then all keys are 'and'd.
         * Also, if the 'conditional' object is specified, then only the relationships specified there are applied.
         *
         * Array elements inside the properties are 'or'd.  To use 'and' in that case, put the cases into a single regex.
         *
         * The final extracted value is the match of the 'text' field.  Only a maximum of one regex group can be used.
         * If a regex group is used, the extracted value is any match of that group.  Note that if the 'g' option is used on a regex,
         * then no groups will be applied by the regex engine (if you want to match a group, then you cannot use the 'g' option).
         */
        subject: [ /^Kattare:\s+Payment\s+Received\s*$/, /^[Ff]w[d]?:\s+Kattare:\s+Payment\s+Received\s*$/ ],
        from: [ /.*/ ], // Uses the 'address' field only, not name.
        to: [ /.*/ ],  // Uses the 'address' field only, not name.
        text: { fixed_amount_bill: /Amount:\s*\$\s*(\d+)/m, network_usage_bill: NO_MATCH },  // This is the e-mail body text.
      }
    }
  },
  localTest: {
      access: {
      protocol: 'pop3',
      fqDomain: 'localhost',
      port: 1110,
      username: 'test-user',
      pwd: '12345',
    },
    extractTasks: {
      billing: {  // Object properties (keys) are 'and'd, and Array elements inside the properties are 'or'd.
        subject: [ /^Kattare:\s+Payment\s+Received\s*$/, /^[Ff]w[d]?:\s+Kattare:\s+Payment\s+Received\s*$/ ],
        from: [ /.*/ ], // Uses the 'address' field only, not name.
        to: [ /.*/ ],  // Uses the 'address' field only, not name.
        text: { fixed_amount_bill: /Amount:\s*\$\s*(\d+)/m, network_usage_bill: NO_MATCH },  // This is the e-mail body text.
        conditional: [ { terms: ['subject', 'text'], operator: 'or' } ],
      }
    }
  }
};

exports.mailServers = mailServers;
