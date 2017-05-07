const {writeToCsv, writeToDatabase} = require('./persist_output');
const {CONSOLE, CSV, DATABASE, FILE} = require('../constants');

module.exports = handleOutput;

function handleOutput(result, outputConfig) {
  switch (outputConfig.kind) {
  case CONSOLE:
    console.log(JSON.stringify(result));
    break;
  case FILE:
    switch (outputConfig.subkind) {
    case CSV:
      writeToCsv(outputConfig.details, result);
      break;
    default:
      console.error('No such file output subkind supported: ' + outputConfig.subkind);
    }
    break;
  case DATABASE:
    writeToDatabase(outputConfig.details, result);
    break;
  default:
    console.error('No such output kind supported: ' + outputConfig.kind);
  }
}
