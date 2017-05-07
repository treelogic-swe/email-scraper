const fs = require('fs');
const csvUtil = require('babyparse');

module.exports = {

  writeToCsv: (conf, output) => {
    const result = output.scrapeResultStatus.scrapeResult;
    const fields = Object.keys(result);
    const data = getRows(fields, result);

    fs.writeFileSync(conf.fullyQualifiedFilePath, csvUtil.unparse({fields, data}));
  },

  writeToDatabase: (conf, output) => {
    console.log(output);
  }
};

function getRows(fields, result) {
  const rows = [];
  fields.map((field, columnIndex) => {
    const fieldData = result[field];
    fieldData.map(addToColumn);

    function addToColumn(datum, rowIndex) {
      const row = rows[rowIndex] || [];
      if(!rows[rowIndex]) {
        rows[rowIndex] = row;
      }
      row[columnIndex] = datum;
    }
  });

  return rows;
}
