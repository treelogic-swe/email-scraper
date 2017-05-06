const clOpts = [
  { name: 'username', alias: 'u', type: String, defaultValue: 'test-user' },
  { name: 'password', alias: 'p', type: String },
  { name: 'mailserver', alias: 'm', type: String, defaultValue: 'localTest' },
  { name: 'keepListening', alias: 'k', type: Boolean, defaultValue: false },
  { name: 'startAt', alias: 's', type: Number, defaultValue: 0 },
  { name: 'help', alias: 'h', type: Boolean, defaultValue: false },
  { name: 'list', alias: 'l', type: Boolean, defaultValue: false },
];

exports.commandLineOptionDefinitions = clOpts;
