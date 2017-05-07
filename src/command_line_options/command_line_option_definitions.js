const clOpts = [
  { name: 'databasePassword', alias: 'd', type: String                             },
  { name: 'help',             alias: 'h', type: Boolean, defaultValue: false       },
  { name: 'keepListening',    alias: 'k', type: Boolean, defaultValue: false       },
  { name: 'list',             alias: 'l', type: Boolean, defaultValue: false       },
  { name: 'mailserver',       alias: 'm', type: String,  defaultValue: 'localTest' },
  { name: 'output',           alias: 'o', type: String,                            },
  { name: 'password',         alias: 'p', type: String                             },
  { name: 'startAt',          alias: 's', type: Number,  defaultValue: 0           },
  { name: 'username',         alias: 'u', type: String,                            },
];

exports.commandLineOptionDefinitions = clOpts;
