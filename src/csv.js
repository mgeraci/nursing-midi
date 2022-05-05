const fs = require('fs');
const csv = require('fast-csv');

const leftKey = 'Left duration (min)';
const rightKey = 'Right duration (min)';

const res = [];

let lastDate;

const parseRow = (row) => {
  const [date, time] = row.Time.split(', ');
  const duration = parseInt(row[leftKey], 10) + parseInt(row[rightKey], 10);
  const feed = { [time]: duration };

  if (date !== lastDate) {
    res.push([]);
  }

  res[res.length - 1].push(feed);

  lastDate = date;
};

module.exports = () => new Promise((resolve, reject) => {
  fs.createReadStream('data.csv')
    .pipe(csv.parse({ headers: true }))
    .on('error', (error) => reject(error))
    .on('data-invalid', (row, rowNumber) => {
      reject(new Error(`invalid csv data: [rowNumber=${rowNumber}] [row=${JSON.stringify(row)}]`));
    })
    .on('data', parseRow)
    .on('end', () => {
      res.reverse();
      resolve(res);
    });
});
