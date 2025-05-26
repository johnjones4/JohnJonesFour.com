---

title: "Ultimate Ford Maverick Mod: A Flux Capacitor!"
description: "In this episode of John Builds Things, we’re diving into a Back to the Future-inspired project that’s sure to spark your imagination! As a lifelong fan of the iconic trilogy, I’ve always loved Doc Brown’s timeless wisdom: “If you put your mind to it, you can accomplish anything.” That mindset inspired me to bring a piece of movie magic into the real world by building a miniature Flux Capacitor for my 2022 Ford Maverick."
youtube: ZzgaDRBYyMo
githubs:
  - johnjones4/FluxCapacitor
links:
  - name: STL Files
    href: https://www.printables.com/model/1000982-ford-maverick-flux-capacitor
bom:
  - title: Raspberry Pi Pico
    href: https://amzn.to/3Fd28lK
  - title: White LEDs
    href: https://amzn.to/3H54Lqf
  - title: Momentary Push Button Switch
    href: https://amzn.to/4kenm1N
  - title: SPST Mini Toggle Switch
    href: https://amzn.to/3H2uyPY

---

If you’re going to build a Time Machine into a car (or truck), why not do it with some style? That was exactly the question I had as a Back to the Future fan  myself. This question even vexed my toddler. He’d ask me: Why can’t my truck go 88 mph in a residential area? Where is the Flux Capacitor? What is a Flux Capacitor? Why can't we climb up to the top of our town courthouse clock? These little guys ask the tough questions. 

Let’s answer those questions today on John Builds Things

So why much love for Back to The Future? It was one of the first movies that really inspired me to pursue a career in tech. Doc Brown’s reassurance to Marty that “if you put your mind to it; you can accomplish anything” has always resonated with me and it serves as a constant reminder to persevere and work through challenges one problem at a time. I introduced my son to the movie mostly because the time travel scenes are just so cool, but in time he will hopefully be able to absorb the same lesson. Until then, we’ll both enjoy watching that Delorean accelerate up to 88 and disappear in a flash of 80s special effects brilliance.

Given the affection for Back to the Future I’ve created in my house, it seemed only right to take on a project in honor of it. My 2022 Ford Maverick, a compact truck I’ve also fallen in love with, has a bit of a design quirk: on the dashboard there is a cubby with seemingly little utility. The maker community has had no shortage in ideas for things to fill it with: everything from the practical like a phone holster to the impractical but awesome like a chicken nugget and sauce caddy. These are great projects in themselves. But they won’t get you back to 1955 or to the um future of 2015 anytime soon. I decided that this little cubby is where I’d put a flux capacitor for both my and my son's amusement.

The area is pretty small, measuring only 50 by 80 ish millimeters, but that seemed like just enough room for a simple model. I did find a project on Printables that was a sort of blank for creating models for that cubby, but upon close inspection the dimensions were a little off. My assumption is that this was made for a different model year where they had changed sizes slightly.

I looked around on printing sites for a compact flux capacitor model, but nothing great came up. Having built a larger one a few years ago, I was not afraid of the challenge. The trick would be matching the cubby’s cavity closely. 

That was no worry; I just measured the space myself taking extra care. With the data in hand I modeled it in Fusion360 and printed it on my Ender 3 S1 Pro. The model is in a few pieces to accommodate the different colored parts on the front and to allow easy assembly of the front and back as separate components. The Fluxing effect is achieved just with a set of bright white LEDs powered by a simple script running on a Raspberry Pi Pico. I chose the Pico because honestly I had one laying around. This code is so simple that it will run on just about any microcontroller. 

Let's take a look at the code. After some simple initialization code in the setup section, the loop section isn't much more complicated. All the script really does is control three GPIO outputs to create the LED chasing effect. There are three basic modes: a normal mode with a static time delay for the chasing and a dynamic mode that gradually decreases the delay over a few seconds and third “time travel” mode blinks all the LEDs to simulate a time travel sequence. Activating that dynamic mode is done via a button wired to another GPIO pin in a pull up configuration. Again, this code is so simple it could run on just about any microcontroller that supports the Arduino framework. Of course it would be pretty simple to port this to another framework or language.

The great thing about the Pi Pico in this project is that it comes without the header pins pre-soldered. That way, I did not need to fuss with wiring up a protoboard or manipulating the existing pins; 

I could just solder my jumpers right in. In this case I only need to solder the three leads for the chasing LEDs. (There are nine total LEDs but they are synchronized so you can tie three together to the same pin each) Those of course get wired to ground in addition to the “time travel mode” pushbutton that then also gets soldered to another GPIO pin. That’s all. Just four GPIO pins and ground/power. Oh the power is being supplied by a AA battery pack. We let the Pi Pico regulate the volts. AA batteries aren’t always ideal for microcontrollers because of their falloff as they drain, but this is a simple enough project that it doesn’t really matter. We’re not doing any serious computing.

The toughest challenge with this project was the small size. Making it look like a convincing prop while fitting into a space of only a few square millimeters was a unique task. To glue up the various parts of the model I used a special type of glue that can be cured instantly using a special light. 

I just stumbled upon this one day at Home Depot but I absolutely love it. It’s obviously much more expensive than normal glue since the bottle literally has a built in light, so use it sparingly. But that light cures it so fast making small part, tedious glueups light this a breeze.

Options for installing this project in my truck were a little limited. I was reticent to start drilling into the dash or using anything like glues to secure it, and so I went with a bit of a lazy option and just shoved everything into the cubby and pushed the face back until it fit with a little friction. It definitely wobbles a little when I turn it on or press the little red button, but not so much so that it shakes loose. This gives me the option to modify or remove it in the future without a lot of hassle. I’m in no hurry to get rid of this truck as I absolutely love it, but I want to have my options open.

There are about a million build your own flux capacitor videos out there, and they all have their merits ranging from quick and easy to authentic film prop reproduction quality. However I’ve never seen one quite like this and so I hope you won’t mind my contribution to this vast pool. Overall this project was a lot of fun and I completed over the course of just two or three weekends, which was mostly eaten up by design and test fitting. Feel free to download the source to the project and the model files to modify and fit in your own dashboard. Just don’t drive too fast or you won’t know when you are. 

Thanks for watching. As always, please like this video and subscribe to John Builds Things.
