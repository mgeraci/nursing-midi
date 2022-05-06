# Nursing Midi
My partner and I tracked when our baby was nursing with the app
[Baby Tracker](https://apps.apple.com/us/app/baby-tracker-pro-newborn-log/id845657206).
It has a great way to visualize a schedule of feeds, but I thought it would be
interesting to try sonifying it. This project converts the CSV output from Baby
Tracker's "backup data" function into MIDI.

## Installation and usage
This project is written in node. Assuming you have `nvm` and `yarn`:
1. Clone the repo
1. Use the version of node specified in `.nvmrc` with `nvm`
1. Install the JS packages it uses with `yarn install`
1. Add the Baby Tracker data file to the project root as `data.csv`
1. Generate the midi file with `yarn generate`
1. Open the results: `output.midi`

## What does it sound like?
Like [this](https://soundcloud.com/mgeraci-180667456/walter-nursing)!
