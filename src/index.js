const MidiWriter = require('midi-writer-js');
const fs = require('fs');

const csv = require('./csv');
const timeToPitch = require('./timeToPitch');

(async () => {
  const days = await csv();
  const maxFeedsPerDay = Math.max(
    ...days.map((day) => day.length),
  );
  const feedDurations = days
    .reduce((acc, cur) => acc.concat(cur.map(({ duration }) => duration)), []);
  const minFeedDuration = Math.min(...feedDurations);
  const maxFeedDuration = Math.max(...feedDurations);

  console.log({ maxFeedsPerDay, minFeedDuration, maxFeedDuration });

  const tracks = Array.from(Array(maxFeedsPerDay)).map(() => new MidiWriter.Track());

  days.forEach((day) => {
    tracks.forEach((track, i) => {
      const feed = day[i];

      if (feed) {
        track.addEvent([
          new MidiWriter.NoteEvent({
            pitch: timeToPitch(feed.time),
            duration: '4',
            velocity: 100,
          }),
        ]);
      } else {
        track.addEvent([
          new MidiWriter.NoteEvent({
            pitch: 'C0',
            duration: '4',
            velocity: 0,
          }),
        ]);
      }
    });
  });

  const write = new MidiWriter.Writer(tracks);

  try {
    fs.unlinkSync('output.midi');
  } catch { /* noop */ }

  fs.writeFile(
    'output.midi',
    write.buildFile(),
    () => {},
  );
})();
