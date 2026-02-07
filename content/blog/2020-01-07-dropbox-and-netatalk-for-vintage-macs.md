---

title: 'Accessing Dropbox From A Vintage Macintosh'
description: "Vintage computing is a great way to appreciate the engineering and design achievements of yesteryear; here's a quick tip on how to actually get a little work done while you're at it."
---

There's a small, but growing, niché of nerds out there who enjoy an activity aptly-named _vintage computing_ or sometimes _retrocomputing_. Think of it along the lines of buying and fixing up classic cars. There's a love the design and an astonishment for how primitive yet still amazing this old technology is. The design of the first Apple II motherboard makes one think about all the decisions Wozniak had to make every step of the way to get it just right. The translucent plastic casing of the original iMac marks the bold and industry redefining step Jonny Ive took in the late 90s. Today, we expect our electronics to have the detail and polish of fine art, but it was in these days that the industry pioneers set these standards. Because of that, using - or reusing - this hardware and software is an enjoyable pastime for the sentimental design-loving technophile.

![OS 9 Desktop](/images/OS9.png)

I consider myself one of these vintage computing enthusiasts - particularly with Mac hardware and the "classic" Mac OSes, which ended with OS 9 before the release of the completely rebuilt OS X. While OS X lives on to be the more stable, versatile, and scalable OS that the classic Mac OS architecture could not be, there's an appreciable element of design and utilitarianism with these relics. They didn't do multitasking well – forcing you to do one task at a time. The interface was quirky, but if you took the time to learn it, then you could get around much faster than you can with modern interfaces. But above all else, sharing a similar sentiment with those who fix up old muscle cars, it's just plain fun to use old machines and software.

![iBook](/images/ibook.jpg)

Writing is an activity I enjoy with vintage hardware. It is a task where the lack of good multitasking is a bonus as focus stays directed, and one doesn't need a machine with the latest processor and gigabytes of RAM to do it well. [Keyboards also aren't what they used to be.](https://www.youtube.com/watch?v=D7wmMZmMinM) I wrote much of the first draft of this post on a clamshell iBook that came out in 2000. Remember those? With translucent color plastic trim and a clean white keyboard, the iBook and iMac were integral parts of Jonny Ive's redefinition of what a computer looked like. There're not many modern computing tasks these machines can take on today, but they can run an old copy of Microsoft Word just fine.

One challenge I faced with my embrace of vintage computing was file management. I frankly don't trust the old hard drive in my iBook, and I while I looked up steps for updating the old drive with a new SSD, that seemed like an incomplete solution as I'd still have to shuttle files back and forth via a USB drive. However, these machines were some of the first on the laptop market to feature integrated Wi-Fi, which Apple branded as "Airport" back then. What if I could set up something that allowed me to wirelessly access my Dropbox account from my iBook? One option I explored was simply sharing my MacBook Pro's home directory so that the iBook could reach it, but I love Dropbox's new slimmer on-demand file access feature which wouldn't be compatible with shared volumes. With the easy route ruled out, I decided to build a solution. Here's how:

## Wi-Fi

The first challenge was Wi-Fi. Modern wireless access point security, _WPA_, did not exist when OS 9 came out, and so accessing my existing home network was out. What was available for security in 2000 was _WEP_. While insecure now, I decided to accept the risk of setting up a hidden wireless network with WEP security using a spare router. Also, I set the router to operate in "bridge mode" so that, upon connecting to it, my iBook would be on the same subnet as the rest of my home network and receive an IP address from my home network's existing DHCP server. This got my iBook on the Internet.

## Server Hardware

![iBook](/images/asus.jpg)


To get my iBook accessing Dropbox, I had to set up an intermediary device that would act like a Network Attached Storage (NAS) device that also synced to Dropbox. I discovered that Dropbox only supports Intel architecture for their Linux client, and I wanted to make sure I was using the official Dropbox client for this as I've had shaky experiences with third-party solutions. This restriction therefore limited me from using something simple like a Raspberry Pi, and instead I browsed [PC Liquidations](https://www.pcliquidations.com/) for slim/nettop PCs that would be low power consumers. In that search, I found this [Asus EB1033 Atom](https://www.pcliquidations.com/p25745-asus-eb1033-atom-d2550). I ordered it along with an external hard drive enclosure. (I had a spare 2 TB drive laying around, but you could also customize the order on PC Liquidations to just upgrade the built in drive.) I loaded the machine up with [Ubuntu Server 18.04.3](https://ubuntu.com/download/server) running off of the external drive so that I could keep my Dropbox folder in the home directory.

## File Access

In the days of OS 9, the preferred way for accessing network files was using Apple's proprietary Apple Filing Protocol (AFP) - which is still in use today on the Mac OS and as an open source project called Netatalk. It's easy and fast on OS 9 so I wanted to stick with it, and Netatalk is great project which I've used many times over the years. The project wiki contains a detailed step-by-step tutorial for installing it on Ubuntu [here](http://netatalk.sourceforge.net/wiki/index.php/Install_Netatalk_3.1.12_on_Ubuntu_18.04_Bionic). When I got to the step configuring `/usr/local/etc/afp.conf`, I just shared home directories because that is where the Dropbox folder lives. (Note that you'll need some light Linux experience to do this.) At this point, I could access the new server from my iBook (Using OS 9's Network Browser located under the Apple menu) and manipulate files in the home directory.

## Dropbox Access

The last step of this process was to get Dropbox syncing on the server. To do that, I followed another detailed step-by-step tutorial on Tech Republic [here](https://www.techrepublic.com/article/how-to-install-and-run-dropbox-from-a-headless-linux-server/). Once I had Dropbox up and running as a background process on the server, I left it overnight so it could sync down my entire account, which is about 700 GB. With this complete, the server now will constantly keep an updated version of my Dropbox account and any local changes made will sync up.

## Outcome

With Dropbox syncing to my new slim server and it shared over AFP, I can now access any Dropbox file from my iBook, edit those files on my iBook, and watch them automatically sync to Dropbox. It allows me to rest assured my work on the iBook is safe, and I can easily move from machine to machine to work in a very modern why while using vintage hardware.
