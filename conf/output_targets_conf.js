const outputTargets = {
  kattare: { // This must map to a defined mailserver name in 'mail_servers.conf.js'.
    kind: 'database',
    type: 'mysql',
    details: { // Credentials are provided on the command line to the program so that they are never recorded here.
      databaseName: 'fluffy',
      tableName: 'fc_t_monthly_statistics',
    },
  },
};

exports.outputTargets = outputTargets;
