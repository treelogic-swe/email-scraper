const n3 = require('pop3-n3');
const execS = require('child_process').execFileSync;

const PATH_TO_SCRIPT = './util/pop3_server.js';

execS(PATH_TO_SCRIPT);
