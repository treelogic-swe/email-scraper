/**
 * To use any of the below output configs with this package as-is out-of-the-box,
 * just change the keyname to `localTest`.  For example, change `localTest3` to `localTest`.
 * To use the database kind of output, see the instructions in the `./README.md`.
 */
module.exports = { // The keys of this object must map to a defined mailserver name in 'mail_servers.conf.js'.
  localTest2: {
    kind: 'database',
    subkind: 'mysql',
    details: { // The password is provided as a command line option via option 'databasePassword' to avoid recording here.
      host: 'localhost',
      user: 'foo', // For test, use --databasePassword=bar (if you have your tables owned by user foo, set password to `bar` (no quotes)).
      database: 'email_scraper_1',
      tableName: 'billing',
      /*-
       * An additional table is required, last_email_read, to track the last email read so that future reads will not be redundant.
       * See test/util/setup/db/mysql.sql for the specification of that table.
       */
    },
  },
  localTest3: {
    kind: 'file',
    subkind: 'csv', // Also serves as the filename extension in the case of a 'kind' of 'file'.
    details: {
      fullyQualifiedFilePath: './test-result-output.csv',
      // Optional: config for the csv file itself as defined here: http://papaparse.com/docs#json-to-csv
    }
  },
  kattare: {
    kind: 'file',
    subkind: 'csv', // Also serves as the filename extension in the case of a 'kind' of 'file'.
    details: {
      fullyQualifiedFilePath: './test-result-output.csv',
    }
  }
};
