const fs = require('fs');
const csvUtil = require('babyparse');
const mysql = require('mysql2');
const pull = require('lodash/pull');

const {HASH, LAST_EMAIL_READ_DB_TABLE_NAME} = require('../constants');

module.exports = {

  writeToCsv: (conf, output) => {
    const result = output.scrapeResultStatus.scrapeResult;
    const fields = Object.keys(result);
    const data = getRows(fields, result);

    fs.writeFileSync(conf.fullyQualifiedFilePath, csvUtil.unparse({fields, data}));
  },

  writeToDatabase: (conf, output) => {
    const connection = getDBConnection(conf);
    const sr = output.scrapeResultStatus;
    connection.connect();
    writeLastReadMailNumber(connection, sr.mailStatus.received);
    writeContentResults(connection, conf.tableName, sr.scrapeResult);
    connection.end();
  }
};

function writeContentResults(connection, tableName, sr) {
  sr[HASH].map((hash, index) => { // Always use preparedStatements to block any sql injection attack.
    const preparedStatement = `INSERT INTO ${tableName} VALUES (?, ?, ?);`;
    connection.execute(preparedStatement,  [hash].concat(getInsertRemainder(sr, index)), handleDBOperationDone);
  });
}

function writeLastReadMailNumber(connection, sr) {
  const preparedStatement = `INSERT INTO ${LAST_EMAIL_READ_DB_TABLE_NAME} VALUES (?)`;
  connection.query(preparedStatement, [sr], handleDBOperationDone);
}

function getInsertRemainder(sr, index) {
  const remainingCols = pull(Object.keys(sr), HASH);
  const insertSqlFragment = remainingCols.reduce((acc, colName) => {
    const value = sr[colName][index];
    acc.push(`${value}`);

    return acc;
  }, []);

  return insertSqlFragment;
}

function handleDBOperationDone(error) {
  if (error) {
    console.log(error);
    throw error;
  }
}

function getDBConnection(conf) {
  return mysql.createConnection({host: conf.host, user: conf.user, password: conf.password, database: conf.database});
}

function getRows(fields, result) {
  const rows = [];
  fields.map((field, columnIndex) => {
    const fieldData = result[field];
    fieldData.map(addToColumn);

    function addToColumn(datum, rowIndex) {
      const row = rows[rowIndex] || [];
      if (!rows[rowIndex]) {
        rows[rowIndex] = row;
      }
      row[columnIndex] = datum;
    }
  });

  return rows;
}
