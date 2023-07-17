---
layout: post
title: "Tracking Smoking Temperatures with Grillbot"
description: "What’s the best way to overcomplicate grilling? Make a meat thermometer that logs temperatures to your computer."
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

```c++
#include <Arduino.h>
#include <Base64.h>

#define BYTES_IN_DOUBLE 8
#define THERMOMETERS 2

const double ADC_LUT[4096] PROGMEM = { }; /* See https://github.com/e-tinkers/esp32-adc-calibrate */

#define R1 100000.0
#define R0 100000.0    
#define T0 298.15  
#define BETA 3950.0
#define NUMSAMPLES 50
#define VS 3.3
#define ADC_MAX 4095.0

int pins[THERMOMETERS] = {A10,A13};
typedef union doublesbytes {
  double doubles[THERMOMETERS];
  char bytes[THERMOMETERS * BYTES_IN_DOUBLE];
} doublebytes;

double takeReading(int pin)
{
  double total = 0;
  for (int i=0; i<NUMSAMPLES; i++) {
    int reading = analogRead(pin);
    total += ADC_LUT[reading];
    delay(5);
  }
  return (total/double(NUMSAMPLES));
}

double calculateTemp(double adc)
{
  double vOut = adc * VS / ADC_MAX;
  double rt = R1 * vOut / (VS - vOut);
  double t = 1.0/(1.0/T0 + log(rt/R0)/BETA);
  double tc = t - 273.15;
  double tf = tc * 9 / 5 + 32;
  return tf;
}

void setup() {
  Serial.begin(9600);
}

void loop() {
  doublesbytes db;
  for (int i = 0; i < THERMOMETERS; i++)
  {
    double r = takeReading(pins[i]);
    db.doubles[i] = calculateTemp(r);
  }

  int l = Base64.encodedLength(THERMOMETERS * BYTES_IN_DOUBLE);
  char encodedString[l + 1];
  Base64.encode(encodedString, db.bytes, THERMOMETERS * BYTES_IN_DOUBLE);
  Serial.println(encodedString);
  delay(100);
}
```

In the main application loop, I take a reading for both thermometers and add the values to a special union structure that easily allows me to convert the double values to a byte array. Then I convert the byte array to a base 64 string and print the value to serial for reading by the host computer.

To read the temperature there are two key functions:

* The first called `takeReading` accepts the PIN number and then reads and averages a few ping readings.
* The second called `calculateTemp` converts the pin reading value into a fareneheight temperature.

## Logger

![Web Dashboard](/images/grillbotdashboard.png)

The logger reads the serial port connected to the bot and displays and logs the temperatue value coming from the bot. All data is stored using Sqlite. There are a few different configuations that can be passed in via command line flags. It is a Go project and also has a minimal web interface written in vanilla HTML/CSS/JS. The web UI exists to monitor temperature and control some basic settings.
