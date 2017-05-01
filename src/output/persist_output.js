const outputTargetsConf = require('../../conf/output_targets_conf');

function persistOutput(persistConfigKeyname, result) {
  const conf = outputTargetsConf[ persistConfigKeyname ];
  console.info('Writing the email scrape results to:');
  console.info(conf);
  console.log(result);
}

module.exports = persistOutput;
