---

title: "Live Train Announcements with a Raspberry Pi"
description: "I turned an old Lionel train signal from Ebay into something that announces arriving and departing trains with some model railroading flair. "
youtube: d5GzUV-ZxMM
githubs:
  - johnjones4/train-announcer
links:
  - name: STL Files
    href: https://www.printables.com/model/812078-train-signal-base
bom:
  - title: Raspberry Pi Zero
    href: https://www.amazon.com/Raspberry-Bluetooth-Compatible-Connector-headers/dp/B0CG99MR5W?crid=12HMLVLJNTS3U&dib=eyJ2IjoiMSJ9.5jeAEst4vfQSigFCXntmYTgHSkN1646AdvniovkXYvrJWuOHNq-cQ-8xSMIl1IuKd5Cgt3p8TGL03svQ5fogwR4p0sWGnlxBlGFmwbeVb5VaRjQrFTEGN3BKIfwRoSkIkdLI9bPrI-jyvTrGLS6MDIUDkMN6ptpTPrKcItuc9A4waMS4_D7OcioQ19EOQq9Qk1h42vfgUKntKad-N08zkOGKyzCBN5KpHm0Va7N0anA.dTAYNLOtzc5wFeiQI0Ctxqnm_BijSR9_NTd_bzRVUVA&dib_tag=se&keywords=raspberry%2Bpi%2Bzero&qid=1712929515&sprefix=raspberry%2Bpi%2Bzero%2Caps%2C218&sr=8-3&th=1&linkCode=ll1&tag=recommmendsby-20&linkId=04e24a38fbc58543119c0c677f8c3606&language=en_US&ref_=as_li_ss_tl
  - title: Audio Hat
    href: https://www.adafruit.com/product/4757
  - title: Lionel Train Signals
    href: https://www.ebay.com/sch/i.html?_from=R40&_nkw=Lionel+Train+Signal&_sacat=0

---

## Abridged Transcript:

From a pretty young age my son loved trains, and I’ll admit that I do too. In 
our first house we lived within earshot of some train tracks, and so out of my 
own curiosity about which trains were passing by and to make something 
interesting for our precocious toddler, I turned an old Lionel train signal from 
Ebay into something that announces arriving and departing trains with some model 
railroading flair. It uses a Raspberry Pi Zero to query Amtrak’s live train 
timetable and uses AWS Polly and some audio processing to make an authentic 
sounding train announcement along with some GPIO magic to activate the signal.

### Software

So I built this gadget almost two years and I decided that it was time to share 
it with you all. What you’re seeing here is a bit of a rebuild and refinement of 
the original. Like all projects, I started with the software to get something 
basic working There were three key things to think through for the software: 

1. Where to get the arrival/departure data 
2. How to generate the announcement voice 
3. How to make the audio have an authentic railroading sound

#### Getting the Data

Amtrak doesn’t expose an actual API, but after some digging I discovered many 
people have reverse engineered their live train tracking dashboard to get that 
data. Amtrak doesn’t expose an actual API, but after some digging I discovered 
many people have reverse engineered their live train tracking dashboard to get 
that data.

I converted this all to Python and compared notes with some others who’ve 
reverse engineered this service. In no time I was getting real JSON data output 
that was in a fairly easy to understand layout. You can see from this pretty 
printed output, the data contains an entry for each train and details which line 
it’s running on and the scheduled and real arrival and departure times for each 
station on the route.

#### Generating Voice

For those who aren’t familiar with the Raspberry Pi Zero, it’s the little 
sibling of the massively popular Raspberry Pi single board computer. The Zero 
offers the same architecture and I/O but in a much smaller form factor and 
reduced processor and ram specs. Its small form factor and just enough computing 
power to manage the JSON parsing and decryption work made it perfect for this 
project. I knew I wanted to run this on something small like a Raspberry Pi Zero 
and have a fairly high quality voice so generating it locally was probably out. 
And so I turned to AWS Polly to generate the speech. My use of it would be well 
below any serious billing threshold and it offered the quality and voice 
controls I was looking for.

#### Mixing Down

I wanted to create an authentic sound mixing the announcer voice with some 
atmosphere audio. SOX is a Swiss army knife for audio manipulation and luckily
there’s a Python library that bridges into it which had exactly the 
functionality I needed. Using SOX’s manipulation and mixing tools, I could start 
with a custom track I premixed containing a train signal bell and ambient crowd 
noise simulating a busy train station and then add some echo to the synthesized 
voice, prepend some blank audio to add a delay, and mix it. With a little bit of 
tweaking to the levels, effects, and timing I had a winner.

### Hardware

With the software figured out it was time to build the hardware. I searched the 
usual 3D printing sites for any model railroading meshes that I could use and 
came up short, so I chose to buy an old Lionel train signal from Ebay. These 
signals are designed to run on voltage a bit higher than I would have available 
and so the lights and electromagnet to drop the gate would barely function. So I 
removed the existing electronics. Then I replaced the lamps with red LEDs and 
started designing a base for the signal in Fusion 360 that could also house a 
servo motor to actuate the gate.

With an enclosure I was satisfied with I updated my code to activate both the 
audio effects and servo when a train was arriving or departing at my nearby 
station. Finally it was time for assembly which was pretty straightforward. I 
intentionally left the bottom of this exposed as it would just be sitting up on 
a shelf where my family would rarely interact with it. From time to time we do 
unplug it as the voice can get a little annoying, but every time it activates it 
gives my todler – and me – a thrill. To amplify and output the audio, I used a 
speaker bonnet made for the Pi Zero from Adafruit. These tend to go in and out 
of production, so any audio hat will do. I wired the new LEDs into two GPIO pins 
on the Pi Zero. And wired the servo to another. You can see when it rotates, it 
pulls the signal down in place of the electromagnet originally in the signal

If you’d like to build this yourself, I’ve posted the STL files to Printables 
and you’ll just need to get an old Lionel train signal. Just about any model 
should be fine. Feel free to make a PR against the repo if you make any cool 
modifications. There’s also plenty of documentation on the software so that you
can replicate what I’ve done here.
