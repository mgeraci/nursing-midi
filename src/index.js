const MidiWriter = require('midi-writer-js');
const fs = require('fs');

const csv = require('./csv');
const timeToPitch = require('./timeToPitch');
const scale = require('./scale');

const tempo = 190;

(async () => {
  const days = await csv();
  const maxFeedsPerDay = Math.max(
    ...days.map((day) => day.length),
  );
  const feedDurations = days
    .reduce((acc, cur) => acc.concat(cur.map(({ duration }) => duration)), []);
  const minFeedDuration = Math.min(...feedDurations);
  const maxFeedDuration = Math.max(...feedDurations);

  const tracks = Array.from(Array(maxFeedsPerDay)).map(() => new MidiWriter.Track());

  tracks.forEach((track) => track.setTempo(tempo));

  days.forEach((day) => {
    tracks.forEach((track, i) => {
      const feed = day[i];

      if (feed) {
        track.addEvent([
          new MidiWriter.NoteEvent({
            pitch: timeToPitch(feed.time),
            duration: '4',
            velocity: scale({
              input: feed.duration,
              inMin: minFeedDuration,
              inMax: maxFeedDuration * 0.7,
              outMin: 45,
              outMax: 100,
            }),
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
