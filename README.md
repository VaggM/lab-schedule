## Lab-Schedule

This web-app showcases a weekly schedule read from an excel file.

It was created to showcase the weekly schedule of ZB109 Consert lab in UniWA, Greece.

## Features

This web-app showcases a weekly schedule by swapping between a daily
and a weekly display with a timer of 5-30 seconds.

Daily display:

- current and upcoming classes for the day
- all classes for the day

![Daily display](./screenshots/dailydisplay.png)

Weekly display:

- all classes for the whole week

The schedule is read from an excel file of the following format.
The path to the file should be saved to an .env file based on the provided [sample](.envsample).

The schedule can be read manually through the settings while its
set to recheck every hour that passes. The folder of excel file
can be included in a Dropbox folder (or any other similar service)
to changethe current schedule without manually interacting with
the machine running the app.

Lastly, by clicking on the screen the settings button appears.
The following settings are available:

- Lab Name: sets the title on the top side of the app
- Timer: sets the timer of switching between the daily
  and the weekly diplay
- Daily Max: defines the limit of classes displayed within the daily
  display (the rest of the classes appear after a small delay)
- Weekly Max: defines the limit of classes displayed within the weekly
  display (the rest of the classes appear after a small delay)
- Manual Update: reads the excel file manually

## Installing the app

## Running the app

## Known Issues
