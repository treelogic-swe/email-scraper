exports.extract = extract;

const FROM_FIELD = 'from';
const TO_FIELD = 'to';
const TEXT_BODY_FIELD = 'text';


function extract(emailMessage, conf) {
  if(!isMessageQualified(emailMessage, conf)) {
    return;
  }

  console.log('Found a qualified message (passes all the match requirements specified in the config).');
}


function isMessageQualified(msg, conf) {
  const fields = Object.keys(conf);
  for(let i = 0; i < fields.length; i++) {
    let mt = getMatchersAndTarget(fields[i], conf, msg);
    if( !doesFieldMatch(mt, fields[i]) ) {
      return false;
    }
  }

  return true;
}


function doesFieldMatch(mt, field) {
  const matchResults = applyMatchers(mt, field);
  for(let i = 0; i < matchResults.length; i++) {
    if(matchResults[i] !== null) { // 'or' logical condition.
      return true;
    }
  }

  return false;
}


function applyMatchers(mt, field) {
  const ms = mt.matchers;
  const matches = ms.map( (matcher) => {
    const target = getStringToMatch(field, mt.target);
    return target.match( matcher );
  } );

  return matches;
}


function getMatchersAndTarget(field, conf, msg) {
  let matchers;
  if( field === TEXT_BODY_FIELD ) {
    // Extract the match arrays from their names; names are used for naming the output values.
    matchers = Object.keys(conf[field]).map( _ => conf[field][_]);
  } else {
    matchers = conf[field];
  }
  const target = msg[field];

  return {matchers, target};
}


function getStringToMatch(field, target) {
  if (field === FROM_FIELD) {

    return target.address;
  }
  if (field === TO_FIELD)
  {
    return target.map( _ => _.address ).join(',');
  }

  return target;
}
