---
layout: post
title: "An Update On My Raspberry Pi Powered Model Rocket"
description: "A second launch of the rocket with more powerful motors shows some improvements, but there's still plenty of room to grow."
youtube: dPmbOca61OM
---

When I asked the woman behind the counter in the hobby shop for a
pack of Estes E12-6 motors, she responded with:

"Oh you must be one of those serious model rocket guys?!"

Yeah, lady. I am serious.

![Ed Harris in Apollo 13](/images/apollo13.gif#small)

This past weekend, on a long-overdue trip home to PA to visit my family,
we planned a short excursion to some wide-open space we have free access
to for an afternoon of rocketry. [Back in September, she had her maiden flight](/2020/10/04/model-rocket-telemetry-part-2/) 
with one successful launch, and one not-so-successful launch when the 
parachute failed, and now it was time for more.

With the past few months of COVID-19 essentially locking me at home,
making some updates to this project was one of the many, many, many
projects I took on. Here's a summary of what's new:

-   Refactored air software that separates each sensor reading out into
    its own thread. This allows for a slightly better sample rate than
    my single-threaded approach.

-   Added a GPS module for air and ground that reports readings over
    serial

-   Ground no longer logs data to the Raspberry Pi, it just buffers
    readings in-memory and emits them via a websocket.

-   Refactored dashboard software to a React-powered Electron app.

-   Refactored altitude calculation to use the first few readings of the
    pressure sensor as the "floor."

-   Enabled Ethernet link-local support in the ground Raspberry Pi so
    just connecting it to a host machine over USB powers it and provides
    a network interface for communication.

It was a cold but sunny day in PA when we launched. Spring hadn't quite
reached the Appalachian Mountains, but it was good enough for flight. So
we set up the base station and prepped the rocket for launch. OpenRocket
estimated we'd hit at least 500 feet with these E12-6 motors, and
luckily in this area there's far less concern around amateur flight than
in DC where I live.

If you listen carefully to the audio in the beginning of the clip, you
can hear my young nieces shrieking with excitement as they watch the
rocket ascend into the sky. Despite having three great flights topping
600 feet, the data capture was not great. On the first flight, the new 
software logged more data than last time, but there were a few key 
issues that I will need to work on for future launches:

-   My Toughbook was unable to connect to the ground Raspberry Pi
    despite what I thought was extensive testing. I could've spent more
    time debugging before the flight, but it was cold and my family was
    getting impatient. Therefore I relied on chance that I was getting
    good data.

-   I was not getting good data. The first flight was successful with
    proper data getting logged inboard, but on subsequent flights, it
    appears the data may have been truncated or corrupted. The logs from
    those launches show "flat" data that doesn't change, indicating it
    never captured the "launch event."

-   On the first flight, the GPS module never acquired a signal.

-   The GPS antenna broke on the impact on the first flight because the
    nose it the ground too hard, thus rendering that component useless.

-   The first two videos turned out excellent, but the third video was
    totally black. It seems the Raspberry Pi did not have time to save
    the video capture data.

-   The coupler section between the two rocket sections is still getting
    shoved up into the payload section when it hits the ground too hard.

However, the good news is that the rocket continues to be stable with
higher-powered motors. (The first flight used D's rather than E's here.)
My plan is to make some additional improvements to the software and
structure while still chasing down more powerful motors such as the
AeroTech F44W. The improvements will include:

-   Use simpler hardware for the ground station that can just emit data
    over a USB-serial connection. (ie. Arduino) This will require
    updating the dashboard software to collect data over serial rather
    than websockets.

-   Redesign the payload chassis to be even stronger without adding too
    much weight.

-   Add a small pushbutton to the air hardware that forces the software
    to stop recording, perform any file saving cleanup, and reboot the
    software. Right now I just pull the battery cable after flights and
    I think that is causing the file corruption.

-   Potentially find a GPS module that locks onto a signal faster.
