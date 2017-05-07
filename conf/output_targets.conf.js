module.exports = {
  kattare: { // This must map to a defined mailserver name in 'mail_servers.conf.js'.
    kind: 'database',
    subkind: 'mysql',
    details: { // Credentials are provided on the command line to the program so that they are never recorded here.
      databaseName: 'fluffy',
      tableName: 'fc_t_monthly_statistics',
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
