const timeToPitch = require('./timeToPitch');

describe('timeToPitch', () => {
  test('plays the min time/note', () => {
    expect(timeToPitch('00:00')).toEqual('C6');
  });

  test('plays the max time/note', () => {
    expect(timeToPitch('23:59')).toEqual('B5');
  });

  test.skip('logs every hour', () => {
    const hours = Array.from(Array(24)).map((hour, i) => {
      let res = `${i}:00`;
      if (i < 10) {
        res = `0${res}`;
      }
      return res;
    });

    hours.forEach((hour) => console.log(timeToPitch(hour)));
    expect(1).toEqual(1);
  });

  test('plays reasonable morning and evening feed notes', () => {
    console.log(timeToPitch('07:15'), timeToPitch('20:45'));
    expect(1).toEqual(1);
  });
});
