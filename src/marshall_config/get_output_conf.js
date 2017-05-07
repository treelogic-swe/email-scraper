const outputConfigs = require('../../conf/output_targets.conf');
const {logAboutCmdLOptions, logAboutCmdLOverride} = require('./infoLogger');
const {CONSOLE} = require('../constants');

module.exports = getOutputConf;

function getOutputConf(clOpts) {
  const outputConf = {};
  const key = clOpts.mailserver;

  if (!outputConfigs || (key && !outputConfigs[key])) {
    console.info('No output config defined: Defaulting to ' + CONSOLE);
    console.info('  See conf/output_targets.conf for the optional details.');
    logAboutCmdLOptions();
    outputConf.kind = CONSOLE;

    return outputConf;
  }
  if (clOpts.output && outputConfigs[key].kind !== clOpts.output) {
    logAboutCmdLOverride('output');
    outputConf.kind = clOpts.output;

    return outputConf;
  }

  return outputConfigs[key];
}
