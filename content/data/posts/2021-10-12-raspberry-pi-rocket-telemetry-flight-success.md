---
layout: post
title: "Raspberry Pi Model Rocket Telemetry Flight 3: 1200 Feet! (With Project Updates)"
description: ""
youtube: MQ5-HOInSxI
preview: /images/rocket/assembled_oct9.jpg
---

I recently joined [NOVAAR, Northern Virginia Association of Rocketry](https://novaar.org/drupal7/) so that I could have consistent access to a launch site and so I could learn from the club's members to grow my own skill. (And potentially pursue high-powered certification.) At the club's launch on October 9 on the Great Meadow in the Plains, VA, I was able to fly my custom telemetry rocket with much success. I detail that below along with information about what I've updated with the [telemetry project I call _White Vest_](https://github.com/johnjones4/white-vest).

This is the third time I've taken my custom-designed, Raspberry Pi-based model rocket telemetry system out and it's the rocket's sixth flight overall. After mixed, but encouraging results from the first two sessions and a fair amount of refactoring and design refinement, this flight was a huge success. Flying on an Aerotech F44-8W motor, the rocket had an apogee of just over 1200 feet which is a new record for it! At this point, I feel the design of the entire setup is just about as optimal as it can be, save for the occasional tweaks that will cross my mind.

## Flight Info

### Timeline

![Altitude plot from the flight](/images/rocket/oct921_altitude.png)

As can be seen in the chart above, the rocket accelerated _extremely_ quickly and reached it's apogee after about 7 seconds. To understand more about the flight, I updated my software to monitor the flight's velocity and acceleration and determine what "mode" the flight is in according to the following rules:

* Velocity hits 5 m/s → Launch, Powered Ascent
* Velocity positive but Acceleration drops below 0 → Unpowered Ascent
* Velocity goes negative → Free fall
* Acceleration drops to ~0 → Parachute deployed
* Acceleration and Velocity drop to near zero → Recovery

Based on these rules, here is the data for this flight:

| Phase              | Length (seconds) |
|--------------------|------------------|
| Powered Ascent     | 1.439633s        |
| Unpowered Ascent   | 6.747054s        |
| Free fall Descent  | 1.723669s        |
| Controlled Descent | 122.346487s      |
 

I have confidence in these numbers because the powered ascent phase roughly matches the motor manufacturer's data for thrust duration and the sum of the unpowered ascent and free fall descent phases matches the delay time according to the motor manufacturer's data.

### Travel

![Map from the flight](/images/rocket/oct921_map.jpg)

Note that the descent phase of the flight lasted ... a long time. I used too large of a chute, but I did so because I was concerned about the descent phase overall with the more powerful motor. For the future I'll use a smaller chute because the rocket ended up landing 410 meters from the launch location. (I know this exactly because the GPS chip actually worked this time.)

## Telemetry Tracking Updates

### Inboard Module

I made several updates to the inboard module for this flight based on its performance on the first few flights. Overall, those improvements were:

* Replaced the old GPS module, which rarely found a signal with [one from Adafruit](https://www.adafruit.com/product/746). It uses the same serial interface, so the software didn't need to change.
* Switched to I2C for the altimeter, which yielded a faster sampling rate.
* Added a momentary switch to the module. When pressed, it gracefully stops the software and restarts it. This allows one to "end" the capture session safely instead of just pulling the battery.
* A new chassis, shown below. 

![Assembled telemetry chassis](/images/rocket/assembled_oct9.jpg)

![Fusion360 render of the telemetry chassis](/images/rocket/telemetrymodule_oct9.png)

This new chassis better braces the sensors in place, is stronger for hard landings, and it accomodates the new GPS chip and reset button.

### Software

In addition to the physical changes, I refactored the software somewhat to speed up the sampling rate after some further experimentation which different threading patterns. Overall I think I've optimized it as much as possible despite only getting to about 35 readings per second. (With the camera disabled, it can be much faster.)

For the ground software, the visualization platform is now entirely written in Go. Users can opt for a web dashboard or a terminal-based one. While the web version looks cooler, I find the terminal-based mode to be easier to read outside and faster for verifying if the tool is capturing. Again, this is only a backup if the inboard module fails to save data or gets destroyed.

I've also written some new tooling to make it easier to ingest the captured data, derive some summary stats from it, and generate charts. (The altitude chart and summaries in this post came from this tool.) To read more about that, check out the [GitHub project](https://github.com/johnjones4/white-vest).
