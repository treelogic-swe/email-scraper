module.exports.logAboutCmdLOverride = function(name) {
  console.info(`Overriding the specified ${name} with the ${name} supplied on the command line.`);
};

module.exports.logAboutCmdLOptions = function() {
  console.info('Command line option info, including default settings that may be applied, is in:' +
      ' ./src/command_line_option_definitions.js');
};
