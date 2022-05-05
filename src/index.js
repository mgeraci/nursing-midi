const MidiWriter = require('midi-writer-js');
const fs = require('fs');

const csv = require('./csv');

(async () => {
  const data = await csv();
  console.log(data);
})();

const track1 = new MidiWriter.Track();

track1.addEvent([
  new MidiWriter.NoteEvent({ pitch: ['E4', 'D4'], duration: '4', velocity: 100 }),
  new MidiWriter.NoteEvent({ pitch: ['C4'], duration: '2', velocity: 60 }),
  new MidiWriter.NoteEvent({ pitch: ['E4', 'D4'], duration: '4', velocity: 40 }),
  new MidiWriter.NoteEvent({ pitch: ['C4'], duration: '2', velocity: 20 }),
  new MidiWriter.NoteEvent({ pitch: ['C4', 'C4', 'C4', 'C4', 'D4', 'D4', 'D4', 'D4'], duration: '8', velocity: 10 }),
  new MidiWriter.NoteEvent({ pitch: ['E4', 'D4'], duration: '4', velocity: 5 }),
  new MidiWriter.NoteEvent({ pitch: ['C4'], duration: '2', velocity: 1 }),
], () => ({ sequential: true }));

const track2 = new MidiWriter.Track();

track2.addEvent([
  new MidiWriter.NoteEvent({ pitch: ['G4', 'F4'], duration: '4' }),
  new MidiWriter.NoteEvent({ pitch: ['E4'], duration: '2' }),
  new MidiWriter.NoteEvent({ pitch: ['G4', 'F4'], duration: '4' }),
  new MidiWriter.NoteEvent({ pitch: ['E4'], duration: '2' }),
  new MidiWriter.NoteEvent({ pitch: ['E4', 'E4', 'E4', 'E4', 'F4', 'F4', 'F4', 'F4'], duration: '8' }),
  new MidiWriter.NoteEvent({ pitch: ['G4', 'F4'], duration: '4' }),
  new MidiWriter.NoteEvent({ pitch: ['E4'], duration: '2' }),
], () => ({ sequential: true }));

const write = new MidiWriter.Writer([track1, track2]);

try {
  fs.unlinkSync('output.midi');
} catch { /* noop */ }

fs.writeFile(
  'output.midi',
  write.buildFile(),
  (err) => console.log(err),
);
