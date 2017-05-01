const persistOutput = require('./persist_output');

function handleOutput(clOpts, result) {
  if(clOpts.persistConfig) {
    persistOutput(clOpts.persistConfig);
  } else {
    console.log(JSON.stringify(result));
  }
}

module.exports = handleOutput;
