# Nursing Midi
My partner and I tracked when our baby was nursing with the app
[Baby Tracker](https://apps.apple.com/us/app/baby-tracker-pro-newborn-log/id845657206).
It has a great way to visualize a schedule of feeds, but I thought it would be
interesting to try sonifying it. This project converts the CSV output from Baby
Tracker's "backup data" function into MIDI.

## Installation
This project is written in node. Assuming you have `nvm` and `yarn`:
1. Clone the repo
1. Use the version of node specified in `.nvmrc` with `nvm`
1. Install the JS packages it uses with `yarn install`
1. TODO get CSV file
1. Generate the midi file with `yarn generate`