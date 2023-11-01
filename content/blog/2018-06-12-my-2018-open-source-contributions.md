---

title: 'My 2018 Open Source Contributions'
description: "Sharing a few projects I've built this year."
background_image: 2018projects.jpg
---

I love the open source community not just for it's ability to unite developers and other technologists around common interests and problems but also because it is a showcase of what everyone - from beginners up to the masters - are exploring. In the interest of that, I want to share a few projects I've built this year to serve some of my own needs. The three projects I present here are the result of specific needs in my life around optimizing information that is important to me and managing my professional contacts. They are specific tools for my specific challenges, but, as open source projects, perhaps they may be useful to you as well.

## InBrief

![InBrief screenshot](https://raw.githubusercontent.com/johnjones4/InBrief/master/screenshot.png){: .img-responsive}

<div class="github-widget" data-repo="johnjones4/InBrief"></div>

The second screen in my office is alive with headlines, tweets, my calendar, my todos, and the weather thanks to InBrief. It's a personal dashboard app I built using Electron. All of it is fully customizable making it one of the few open source projects I've built that practically resembles a fully-realized product. Users can download a compiled binary from GitHub to try out the app on Mac and Linux. (Windows could potentially be supported, but I'd love some help getting that setup!) 

Here are a few of its features in-depth:

* **RSS** - While I long ago [declared RSS dead](https://web.archive.org/web/20130719031013/http://www.adfero.com:80/really-simple-syndication-d-2013/) when Google decommissioned Google Reader, I now see how wrong I was given the amount of readers on the market and the number of sites still actively supporting RSS. InBrief has a widget that scrapes a set of categorized RSS feeds, merges the stories by category, and presents a set of consolidated headlines. 
* **Twitter** - Twitter still reigns as my most-checked social media platform primarily because the number of techies that I follow. InBrief has a widget that displays tweets from various lists in my account. (I break out people I follow by individuals, companies, humor, and open-source/industry general.)
* **Email and Tasks** - Keeping a pulse on what's on my plate, InBrief reads out my unread and flagged emails from Exchange and Gmail as well as todos due today and this week from Todoist and Asana.
* **Calendar** - InBrief provides an overview of my agenda for the day based on my Exchange calendar.
* **Weather** - Of course a must-have for any dashboard, I think this is actually a useful place for a short weather forecast.

### What Inspired InBrief

I was using a few different tools simultaneously to do what InBrief now does for me. Those being:

* **TweetDeck** - I have been a longtime TweetDeck user and have always loved it, but I needed something that could share screen real estate. 
* **Feedly** - It has tons of great features, but it was slow and I didn't feel I was getting value out of the premium plan.
* **Email/Calendar/Todos** - These have not been supplanted by InBrief, but I desired something that could consolidate the status from these tools in one place.

### The Stack of InBrief

Say what you will about Electron's bulk, it allows for some extremely rapid cross-platform application development. Within the Electron environment, InBrief runs on React using from-scratch CSS framwwork and uses a simple JSON datastore to save settings.

### What's Next for InBrief

I've been collaborating with someone on improving the UI and UX of this project, and so I plan to continue doing so throughout the rest of the year and as I have time. 

In addition, I'd like to explore:

* **OPML** - Support pointing to an OPML file for importing categories and feeds.
* **Themes** - Build out more themes and styles for the tool to add additional variety. 

If anyone would like to see other services and widgets supported, please file a feature request on GitHub!

## Rolodex

![InBrief screenshot](https://raw.githubusercontent.com/johnjones4/Rolodex/master/screenshot.png){: .img-responsive}

<div class="github-widget" data-repo="johnjones4/Rolodex"></div>
  
Seeking to better manage my professional relationships, I built Rolodex, a web app that syncs-down my Exchange, Google, and LinkedIn contacts into one master list. In this app, I can star contacts for which I have a special relationship, see how often I am in touch with my network, set reminders for how often I'd like to be communication with specific individuals, and log notes after interactions so that I can remember everything. Networking is not my first-best talent, but Rolodex has given me a structure in which I can do a better job of managing relationships and building new ones.

### What Inspired Rolodex

Late last year, the Wall Street Journal published a look at [the system used by David Rockefeller](https://www.wsj.com/articles/david-rockefellers-famous-rolodex-is-astonishing-heres-a-first-peek-1512494592) to track all of his associations. Given the period in which he built this system, it was all done on notecards in a custom-built Rolodex system. Inspired by his system, I decided to take a more active approach to tracking my professional relationships. I built my own system because while there were many interesting personal-CRM apps on the market, they were all transaction oriented. For my needs, I wanted something that was more about managing a wide net of contacts but not necessarily targeting any sort of goal.

### The Stack of Rolodex

Rolodex is a web app backed by Node.JS storing everything in SQLite3 and uses React+Bootstrap4 on the frontend. The entire thing is fully Dockerized making for easy deployment and reuse.

### What's Next for Rolodex

I use this web app as part of my everyday routine, and so I'm constantly finding small bugs and ways I want to tweak the platform. Right now, there's a bug in the sync-scheduler and I'm considering switching to Postgres for the datastore. This is a project I will continually add features to as long as its a part of my workflow. 

Features I'm considering right now are:

* **Report Export** - Grab a CSV of notes for certain contacts
* **Sync-Up** - After pulling and merging contacts from various sources, push that merged data back up to one or all services
* **Speed Improvements** - Syncing down the data is too slow, and so I'd like to find ways to optimize this.

## FeedPage

![InBrief screenshot](https://raw.githubusercontent.com/johnjones4/FeedPage/master/screenshot.png){: .img-responsive}

<div class="github-widget" data-repo="johnjones4/FeedPage"></div>

Lastly, in keeping with my information addiction, I wanted a bare-bones RSS feed to set as my homepage. After building InBrief, I ditched Feedly and felt it was too slow to switch back to. Therefore, I cobbled together FeedPage in an afternoon to serve this need. 

Every few minutes, FeedPage pulls down an OPML file from my Gists (OPML is a standard XML format for storing a categorized list of RSS feeds), pulls the latest copies of each feed, and organizes the feed items into categorized lists based on the OPML file's categories. The page displaying the feed is just plain HTML and pulls Bootstrap from a CDN so it loads extremely quickly. Anytime I want to manage my feed, I just edit the OPML file on GitHub.

### The Stack of FeedPage

Feedpage is Node.JS web app that uses a simple EJS template to render the feed. The entire `index.js` file – the only actual JS code in the project – clocks in at a short 141 lines.

### What's Next for FeedPage

Not much. This is a simple tool doing a simple job. If anyone sees a way to speed up the OPML parsing or feed scraping, please shout!
