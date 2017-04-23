exports.extract = extract;

const pull = require('lodash/pull');
const some = require('lodash/some');

const CONDITIONAL_KEY = 'conditional';

const FROM_FIELD = 'from';
const TO_FIELD = 'to';
const TEXT_BODY_FIELD = 'text';


function extract(emailMessage, conf) {
  const extracted = getMatchesFromQualifiedMessages(emailMessage, conf);
  if( !extracted || !extracted.length ) {
    console.info('No qualified message found (none pass all the match requirements specified in the config).');

    return null;
  }
  console.info('Found a qualified message (passes all the match requirements specified in the config).');
  console.log(extracted);

  return extracted;
}


function getMatchesFromQualifiedMessages(msg, conf) {
  //console.log(msg);
  const allMatches = {};
  const fields = pull( Object.keys(conf), CONDITIONAL_KEY );
  for(let i = 0; i < fields.length; i++) {
    let mt = getMatchersAndTarget(fields[i], conf, msg);
    let matches = getMatches(mt, fields[i]);
    if( !matches ) {
      return null;
    }
    allMatches[ fields[ i ] ] = matches;
  }
  const extracted = getMatchingText(allMatches);
  return extracted;
}


function getMatches(mt, field) {
  const matchResults = applyMatchers(mt, field);
  const anyMatch = some( matchResults, _ => _ !== null); // 'or' logical condition.

  return anyMatch ? matchResults : null;
}


function getMatchingText(matches) {
  const textMatches = matches[ TEXT_BODY_FIELD ];
  const nonNull = pull( textMatches, null ); // Remove any null matches.
  const extracted = nonNull.map( _ => {
    if( _.length > 1 ) { // A regex group was used and matched, so return that particular text.
      return _[1];
    }

    return _[0]; // Just return the entire match since no regex group was used.
  } );

  return extracted;
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
