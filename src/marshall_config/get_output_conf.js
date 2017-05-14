const outputConfigs = require('../../conf/output_targets.conf');
const {logAboutCmdLOptions, logAboutCmdLOverride} = require('./infoLogger');
const {CONSOLE, DATABASE} = require('../constants');

module.exports = getOutputConf;

function getOutputConf(clOpts) {
  const outputConf = {};
  const key = clOpts.mailserver;

  if (!outputConfigs || (key && !outputConfigs[key])) {
    setDefault(outputConf);

    return outputConf;
  }
  const kind = outputConfigs[key].kind;
  if (clOpts.output && kind !== clOpts.output) {
    logAboutCmdLOverride('output');
    outputConf.kind = clOpts.output;

    return outputConf;
  }
  setDbPwdIfNeeded(kind, clOpts, outputConfigs[key].details);

  return outputConfigs[key];
}

function setDefault(outputConf) {
  console.info('No output config defined: Defaulting to ' + CONSOLE);
  console.info('  See conf/output_targets.conf for the optional details.');
  logAboutCmdLOptions();
  outputConf.kind = CONSOLE;
}

function setDbPwdIfNeeded(kind, clOpts, details) {
  if (kind === DATABASE) {
    if (!details.password) {
      if (clOpts.databasePassword) {
        details.password = clOpts.databasePassword;
      } else {
        console.error(`No database password has been provided, but the output is specified to be a
            database.  Specify --databasePassword=foo as a commandline option.`);
      }
    }
  }
}
