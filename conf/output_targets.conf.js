module.exports = { // The keys of this object must map to a defined mailserver name in 'mail_servers.conf.js'.
  localTest2: {
    kind: 'database',
    subkind: 'mysql',
    details: { // The password is provided as a command line option via option 'databasePassword' to avoid recording here.
      host: 'localhost',
      user: 'foo',
      database: 'email_scraper_1',
      tableName: 'billing',
    },
  },
  localTest: {
    kind: 'file',
    subkind: 'csv', // Also serves as the filename extension in the case of a 'kind' of 'file'.
    details: {
      fullyQualifiedFilePath: './test-result-output.csv',
      // Optional: config for the csv file itself as defined here: http://papaparse.com/docs#json-to-csv
    }
  }
};
