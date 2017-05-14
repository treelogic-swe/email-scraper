module.exports = { // The keys of this object must map to a defined mailserver name in 'mail_servers.conf.js'.
  localTest: {
    kind: 'database',
    subkind: 'mysql',
    details: { // The password is provided as a command line option via option 'databasePassword' to avoid recording here.
      host: 'localhost',
      user: 'foo',
      database: 'email_scraper_1', // Use a single database per e-mail mailbox (inbox, etc).
      tableName: 'billing',
      /*-
       * An additional table is required, last_email_read, to track the last email read so that future reads will not be redundant.
       * See test/util/setup/db/mysql.sql for the specification of that table.
       */
    },
  },
  localTest2: {
    kind: 'file',
    subkind: 'csv', // Also serves as the filename extension in the case of a 'kind' of 'file'.
    details: {
      fullyQualifiedFilePath: './test-result-output.csv',
      // Optional: config for the csv file itself as defined here: http://papaparse.com/docs#json-to-csv
    }
  }
};
