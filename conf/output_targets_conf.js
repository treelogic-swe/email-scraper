const outputTargets = {
  kattare: { // This must map to a defined mailserver name in 'mail_servers.conf.js'.
    kind: 'database',
    type: 'mysql',
    details: { // Credentials are provided on the command line to the program so that they are never recorded here.
      databaseName: 'fluffy',
      tableName: 'fc_t_monthly_statistics',
    },
  },
  localTest: {
    kind: 'file',
    type: 'csv', // Also serves as the filename extension in the case of a 'kind' of 'file'.
    details: {
      directoryName: '.',
      fileName: 'test-result-output'
    }
  }
};

exports.outputTargets = outputTargets;
