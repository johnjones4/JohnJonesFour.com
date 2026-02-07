---

title: "Tracking Smoking Temperatures with Grillbot"
description: "What’s the best way to overcomplicate grilling? Make a meat thermometer that logs temperatures to your computer. This helps me track and understand how different cuts and types of meat behave throughout the smoke. Smoking and grilling meat is one of my many hobbies and I'm constantly searching for ways to improve. With my longer cooks like brisket, I want to be able to go back and review temperatures over the whole cook for different cuts. Building something like GrillBot allows me to capture that data in an easily digested format for later review."
youtube: 9kDx2IjlLYs
preview: /images/grillbotposter.jpg
githubs:
  - johnjones4/grillbot
---

What’s the best way to overcomplicate grilling? Make a meat thermometer that logs temperatures to your computer. This helps me track and understand how different cuts and types of meat behave throughout the smoke. Smoking and grilling meat is one of my many hobbies and I'm constantly searching for ways to improve. With my longer cooks like brisket, I want to be able to go back and review temperatures over the whole cook for different cuts. Building something like GrillBot allows me to capture that data in an easily digested format for later review.

## Chassis

First I started by modeling a case in Fusion 360, and then I printed on my aging Makerbot Replicator 2. (One of these days I'll get myself a respectable printer.)

Starting the assembly I add brass threaded inserts to the chassis that holds the PCB and the case two secure the chassis.

## Electronics

The core of this is an ESP32. A simpler microcontroller would absolutely suffice but it’s what I had laying around. All that’s needed is something with at least two analog to digital pins. The thermometers themselves are just thermistors and so I use a voltage divider circuit so that the ADC pins can determine the temperature based on the voltage they register.

The software is built using PlatformIO and designed to work on an ESP32 platform such as `esp32doit-devkit-v1` but any decent microcontroller platform that supports the Arduino toolchain, has two ADC pins, and serial communication should suffice.

## Software

In the main application loop, I take a reading for both thermometers and add the values to a special union structure that easily allows me to convert the double values to a byte array. Then I convert the byte array to a base 64 string and print the value to serial for reading by the host computer.

To read the temperature there are two key functions:

* The first called `takeReading` accepts the PIN number and then reads and averages a few ping readings.
* The second called `calculateTemp` converts the pin reading value into a fareneheight temperature.

## Logger

![Web Dashboard](/images/grillbotdashboard.png)

The logger reads the serial port connected to the bot and displays and logs the temperatue value coming from the bot. All data is stored using Sqlite. There are a few different configuations that can be passed in via command line flags. It is a Go project and also has a minimal web interface written in vanilla HTML/CSS/JS. The web UI exists to monitor temperature and control some basic settings.
