---

title: "Building a CNC + LED Smart Clock"
description: "My office needed a stylish, modern clock—and I had just the tools to make one from scratch. In this episode of John Builds Things, I put my newly assembled, 3D-printed Dremel CNC machine to the test by crafting a custom LED wall clock that blends natural wood with vibrant, animated light."
youtube: 3aL_zUXObpA
githubs:
  - johnjones4/clock
links:
  - name: STL Files
    href: https://www.printables.com/model/1302787-sleek-modern-clock
bom:
  - title: ESP32C3
    href: https://amzn.to/3SbBjRV
  - title: NeoPixel Ring - 24 x 5050 RGB LED with Integrated Drivers
    href: https://www.adafruit.com/product/1586
  - title: NeoPixel 1/4 60 Ring - 5050 RGB LED w/ Integrated Drivers
    href: https://www.adafruit.com/product/1768

---

My office has plenty of great toys, but it was missing something important: a stylish clock. Since I had just finished assembling a lightweight, 3D-printed CNC machine based on a Dremel, I started brainstorming ways to put it to use. That’s when I came across these circular programmable LEDs from Adafruit. The contrast between modern LED lighting and natural wood struck me as a perfect concept for a sleek, custom wall clock.
See how I built this clock today on John Builds Things.

This CNC machine is simple and not particularly robust—the creator even acknowledges that in the project's description. It’s designed as an easy entry point for hobbyists looking to explore CNC milling. 
My motivation for building it was straightforward: I had spare stepper motors and an ESP32 CNC driver board left over from another project. Since I already had some of the key components, I figured, why not print the rest and put it together? While printing all the parts took time, before long, I had a working CNC machine.
With the CNC machine assembled and my clock project in mind as its first real test, I started planning. Constraints can help guide a creative process, and in this case, I had two major ones:

  * First, the millable area on this small CNC machine is really only a few inches across. That would limit me from designing anything that required large contiguous pieces of wood.
  * Second, the LED rings from Adafruit were a fixed size. I found that the outer diameter of the largest LED ring was beyond the millable area of my CNC machine, and so that outer ring would have to be a separate part from the wooden face that sat inside.

With those constraints established, I decided I would mill the main wooden face with the smaller ring embedded in the face behind a 3D printed cover. This small ring would show the hours much like the hour hand on a clock. Then the larger ring would sit in it’s out 3D printed cover surrounding the wooden face. This large ring would show the minutes and seconds like the minute and sweep hands of a clock.

I created the design in Fusion 360, intending to use its CAD/CAM tools to generate the G-code for the CNC machine. However, I found the software overwhelming—it's built for serious milling professionals.
Instead, I turned to Kiri:Moto, a web-based tool with a much more intuitive and streamlined interface, which made setting up the CNC job significantly easier.

Since this was my first CNC project, I approached it carefully. There were many variables to consider when dialing in the right speeds and settings. Jumping straight into hardwood would have been a mistake—not to mention a safety hazard—so I started with plywood, testing different settings with partial models before committing to full-size cuts.

Here are a few things I learned:

  1. It’s loud. A high-speed Dremel creates a piercing whine that gets annoying fast.
  2. It requires slow cutting speeds. My initial settings generated so much smoke I thought it might ignite.
  3. It’s not a “set and forget” machine. Unlike 3D printing, I couldn’t walk away for long periods.
  4. I went through a LOT of test pieces. Trial and error was necessary to get it right.

After many iterations, I finally landed on the right settings. My patience paid off—the final cut turned out well. I did have to do some manual finishing since the machine didn’t quite cut through all the wood fibers, but that’s expected from an entry-level setup.

To ensure the backside cuts aligned with the front, I 3D-printed a positioning jig. This allowed me to center the milling bit accurately and align the CNC machine’s starting point with the G-code. The method worked perfectly, and the back cut matched up exactly with the front. After milling, I sanded the wood, drilled a hole for wiring using a drill press, and sealed everything with a few coats of Danish oil.

The easiest part of this build was 3D-printing the LED covers. I love 3D printing—it’s much quieter than CNC milling!

Let's go through this code. So in the setup function, we do some basic value intialization and deal with some compiler macros I wrote to toggle various test modes and log debug info to the default serial output. After that FastLED starts up to control the two GPIO pins controlling the LEDs. I actually could've just used one GPIO pin and daisy chained the LED rings. Either would be good approaches I think. After that we setup a few classes I wrote: Face is a class that encasulates control of one or more clock hands and then we setup the NTP - network time protocol - controller with Wifi. I thought about using a spare GPS board I have to get the time data from space, but that board doesn't always get a great signal. NTP time of Wifi would be fine.

In the loop statement, we force the NTP class to update it's internal time and then we get that back as a time struct. We use that time struct to inspect the current second, minute, and hour. With those values then we can know what percentage threw the current minute, hour, and day we are. That percentage determines which LED index to illuminate and which to turn off. Now we could just do a simple color for each hand of the clock but I wanted to do something a little cooler looking. Instead I asked ChatGPT for some help with a basic color algorithm that turns a Hue/Saturation/Lightness value into an RGB value. That way, I could take the percentage value and convert that to a Hue value, which is really just a percentage. This creates the effect of a gradually changing gradient as each hand progresses from 0 to 59 for seconds and minutes and 0 to 23 for hours.

Here's a deeper look at Face.cpp which sets the hand positions on the LED rings. This class knows the previous positions of the hands and when it receives updated positions it first tries to clear the old position or restore the other hand's color value if the positions overlap. Then it sets the position and color from tne new values. This nice bit of encapsulation made it easy to debug.

Turning to GradientColor, this is the class that does some color math thanks to ChatGPT. With the percentage input value, that allows us to calculate where on the Hue gradient we should be. Saturation and Lightness are fixed values that I set based on preference. Then the conversion algorithm takes that HSL and turns it into an RGB.

Assembly was fairly easy, but the hardest part was soldering together the large ring. I had to carefully link the three traces for positive, data, and ground which were quite tiny. To reinforce the connection - which I felt was quite flimsy - I dabbed a bit of glue on each connection and let it set overnight. 

For the electronics, I originally prototyped the code using a full ESP32 board but later switched to an ESP32-C3, which is smaller and better suited for the compact design. The LED control is handled using the FastLED library, which makes setting RGB values for an LED array straightforward and highly customizable.
With the rings soldered and ready, I set the microcontroller into “test mode” so that it would only light the top – 0 position – led so that I could get alignment right. Making sure the top LED was exactly centered was critical to making this look great. Now with position set I could cover up the inner ring with it's plastic cover. I regret not milling out that channel just two or three millimeters deeper because when I pass my hand over the club I feel just a slight rise from the ring. It's not enough to notice from afar, but it's one of those things that I know and that just bugs me. I'll fix it next time I do this I guess. With the front assembled, I just had to insert the piece in the back for hanging on a hook and compact the wiring and microcontroller into the cavity in the back. 

And that’s it—the clock is finished! This project was a fantastic test for my CNC machine. Despite its limitations, it handled the task well, and I’m excited to push its capabilities further in future builds. Thanks for watching! If you enjoyed this project, don’t forget to like, subscribe, and hit the bell icon to stay updated on John Builds Things!
