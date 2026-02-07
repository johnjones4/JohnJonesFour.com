---

title: "ESP32 Powered Darkroom F Stop Printing Timer"
description: "I absolutely love film photography. From the moment I was first given a hand-me-down Nikon SLR in the early 2000s until today, the process of loading a fresh role of film into a camera excites me. Much like most working professionals I spend much of my day staring at a computer screen, and so digital photography lost its luster to me long ago because it ended up just being another screen based activity. Today's video on John Builds Things is about my latest project creating a custom print exposure timer for my darkroom. "
youtube: a5j6p5AFZho
githubs:
  - johnjones4/F-Stop-Timer
links:
  - name: STL Files
    href: https://www.printables.com/model/1016441-darkroom-f-stop-printing-timer-enclosure-and-contr
bom:
  - title: Mini Toggle Switch
    href: https://amzn.to/3ZdbGmF
  - title: Terminal Block Connector
    href: https://amzn.to/3Zchm0n
  - title: uxcell 1P7T 1 Pole 7 Position Selectable Single Deck Band Channel Rotary Switch Selector
    href: https://amzn.to/3VfYPPw
  - title: uxcell 1P4T 1 Pole 4 Position 1 Deck Band Channel Rotary Switch Selector with Knob
    href: https://amzn.to/3OtwIZp
  - title: Iot Relay
    href: https://amzn.to/3VcXhFX
  - title: Assembled Adafruit 0.56" 4-Digit 7-Segment Display - w/ I2C Backpack STEMMA QT - Red
    href: https://www.adafruit.com/product/5599
  - title: Rotary Encoder + Extras
    href: https://www.adafruit.com/product/377
  - title: Twidec/10Pcs SPST AC250V/3A AC125V/6A Mini Off(ON) NO Momentary Push Button Switch 5 Colour R13-507-5C
    href: https://amzn.to/3Vemno2

---

## Abridged Transcript:

I absolutely love film photography. From the moment I was first given a hand-me-down Nikon SLR in the early 2000s until today, the process of loading a fresh role of film into a camera excites me. Much like most working professionals I spend much of my day staring at a computer screen, and so digital photography lost its luster to me long ago because it ended up just being another screen based activity. 

Instead, film photography is a fully screenless activity. Each frame I shoot has value to me and the work of exposing and developing a print with hands is far more fulfilling than fiddling with some photo adjustment controls in Lightroom. And yes while a big part of the film photography fad includes a healthy - or unhealthy - amount of gear acquisition syndrome, as a technophile I am a big supporter of awesome gear. 

Film photography is so special to me that I convinced my wife to allow me to expand a basement closet into a a proper darkroom. While I'd really love a larger space, this five foot by ten foot room has everything I need for an ergonomic film development and printing workflow. 

It includes a sink that I custom made from wood and an immense amount of epoxy to make it water tight and a dry area that includes a large Beseler enlarger. 

It even has this cool switch panel to toggle timers, lights, and ventilation. 

Today's video on John Builds Things is about my latest project creating a custom print exposure timer for my darkroom. 

Throughout this video, you’ll seen me assembling the inner components of the timer. Basically, this entails an ESP32 microcontroller board mounted to a custom PCB. 

Despite my insistence that this is an "analog" hobby, I am not so puritanical about the process that I will not employ some digital tools to aid in producing better results. As such I decided my old analog timer was just too limiting, and I had been reading about a more advanced type of printing known as F Stop printing.

This style of printing is slightly more complicated, and while there exist numerous timers on the new and used market that have this functionality they all are expensive. I've seen new timers - really well made timers - costing upwards of $600 dollars online. With a little bit of coding and assembly, I realized I could make one that would likely total less than $100 in parts.

And so after writing the software and testing on a breadboard, I designed a PCB and sent it away for fabrication. I then designed a case in Fusion 360 that would work nicely at my printing station in my darkroom, and I printed it on my Ender 3 S1 Pro.

The PCB is mostly just a socket for the ESP32 dev board and screw terminals for the front panel. I use an MCP23017 I/O expander to add a few extra GPIO ports since this timer uses several. A regular old shift register would've worked well here too, but I had a bunch of these ICs on hand so I went with that. As always I've linked the GitHub repo with the firmware and CAD files for the PCB in the description.

For the front control panel, I opted for a heavily dial-centric interface. There is a rotary encoder to select the base exposure time. Turning this changes the time in half second increments. And then there are three rotary switches. These select various test and final print option and give the panel a very tactile, analog feel. They are great for working with in the low light conditions of a darkroom.

Additionally, to make working with the controls easy in the darkroom I used a special technique I saw in a hobby flight simulator channel where you print a few layers of the front panel in black with the label text knocked out and then at the right level swap the filament for white or clear to finish the back of the panel. This allows red LEDs from the PCB to shine through and backlight the display for safe visibility in the dark much like cockpit avionics.

With assembly and testing complete I installed the timer in my darkroom. On my way too serious looking switch panel, I already had a 5 volt toggle to control my development timer which is also an ESP32 project. I knew the power supply was capable of delivering as many amps as I needed to run two controllers and associated displays and lights, so I opted to tie into that. 

This is the end of the road for my old timer and so that is going into storage. I also ran a cable to below my workstation to hook into the relay control for the enlarger so that it could stay out of sight. It just connects via a headphone jack

Let's dive in on how the timer works. On the front panel, there are six controls:

1. A first toggle switch to flip between test strip mode and final print mode. More on that in a moment
2. A second toggle focus switch that overrides the timer and manually enables the exposure light to allow cropping and focusing of the image before printing
3. A rotary encoder to set a base time. This defaults to 15 seconds on start
4. A rotary switch to select 1/4, 1/3, 1/2 or whole stops when testing
5. A rotary switch to select which offset from the base time to expose the final print
6. And that all important start button that kicks off the timer

Here's the typical process using this timer:

1. Set a base time using the rotary encoder
2. Set a stop delta using the rotary switch
3. Produce a test strip, repeating by varying the base time and stop delta as necessary
4. Flip the timer from test mode into final print mode
5. Select which stop offset was optimal from the test strip 
6. Produce the final print

In normal test strip printing, I increment the exposure times by fixed intervals, for instance starting at 30 seconds and exposing more of the paper every five seconds. While this seems to make sense at first, linear exposure times do not result in linear changes on a print. Look at the exposure times on any camera, they increment geometrically, doubling every step. In photography that's referred to as a stop. Generating test strips using geometric increments mimics this approach and results in more useful test prints that get me to my desired final print time much faster.

This workflow is far more efficient than with my old timer, I feel I'm better able to identify and iterate on proper exposures for my prints. Generally I'm pretty critical of my own work - always looking back on prints and finding little imperfections and flaws that I could've spent more time on. That's the fun and challenge of film photography and photography in general: there's always another variation, another blend of techniques that can maybe yield a slightly better image. I'm not certain if this timer will reduce that feeling in the future but I do know it helps me move through those variations just a little bit faster which hopefully helps in the future.

Thanks for watching today. If you like this more photography oriented video and want to learn more about my process and some of the custom tools I've built for myself, please let me know in the comments. I'm happy to share more of the projects that I've previously done and can spend more time overall showing how I've constructed my darkroom. And as always, please like this video and subscribe to John Builds Things. Bye!
