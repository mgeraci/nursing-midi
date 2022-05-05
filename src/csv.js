const fs = require('fs');
const csv = require('fast-csv');

const leftKey = 'Left duration (min)';
const rightKey = 'Right duration (min)';

const parseRow = (row) => {
  console.log(
    row.Time,
    parseInt(row[leftKey], 10) + parseInt(row[rightKey], 10),
  );
};

fs.createReadStream('data.csv')
  .pipe(csv.parse({ headers: true }))
  .on('data', parseRow);
