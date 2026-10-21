---
title: 'What Is Homebridge? What It Needs, Plugins and 5 Renter Limits'
seoTitle: What Is Homebridge? What It Needs and 5 Renter Limits (2026)
description: >-
  What is Homebridge? Free software that adds non-HomeKit devices to Apple Home.
  What it needs, verified plugins, apartment Wi-Fi, moving out and 5 limits.
pubDate: '2026-10-22T00:55:00.000Z'
category: hubs-voice
keyword: what is homebridge
secondaryKeywords:
  - what does homebridge do
  - what is homebridge used for
  - homebridge explained
  - do i need a raspberry pi for homebridge
entities:
  - Homebridge
  - Apple HomeKit
  - Home app
  - HomeKit Accessory Protocol
  - Node.js
  - Homebridge plugins
  - Verified plugins
  - Homebridge UI
  - Child bridge
  - Raspberry Pi
  - Home hub
  - Matter
  - mDNS
  - HOOBS
  - Home Assistant
tags:
  - homebridge
  - homekit
  - apple home
  - smart home basics
  - matter
articleType: guide
funnel: tofu
productStyle: paragraph
readingTime: 7
tldr:
  - >-
    Homebridge is free, open-source software that makes smart devices without
    HomeKit support show up in Apple's Home app, so Siri and automations can use
    them.
  - >-
    It needs an always-on computer on your home network (a Raspberry Pi, Mac,
    PC, NAS or Docker host) plus a plugin for each brand; a HomePod or Apple TV
    adds remote control and automations.
  - >-
    In a rental, the catch is the network: Homebridge, your iPhone and your home
    hub must share one network with discovery working, which building-managed
    Wi-Fi can block.
  - >-
    Pick verified plugins, back up before updates and on move-out, and leave
    landlord-owned locks or thermostats out without written permission.
productCount: 0
sources:
  - title: 'Homebridge: official site'
    url: 'https://homebridge.io/'
  - title: 'Homebridge developer docs: overview, Matter support and limitations'
    url: 'https://developers.homebridge.io/homebridge/'
  - title: Homebridge on GitHub
    url: 'https://github.com/homebridge/homebridge'
  - title: 'Homebridge wiki: Verified Plugins'
    url: 'https://github.com/homebridge/homebridge/wiki/Verified-Plugins'
  - title: 'Homebridge Raspberry Pi Image: Getting Started'
    url: >-
      https://github.com/homebridge/homebridge-raspbian-image/wiki/Getting-Started
  - title: 'Homebridge: How to install Homebridge'
    url: 'https://homebridge.io/how-to-install-homebridge'
  - title: 'Add To HomeKit: What is Homebridge? Setup, plugins and Docker guide'
    url: 'https://www.addtohomekit.com/blog/homebridge/'
  - title: 'r/homebridge: the future concerns'
    url: >-
      https://www.reddit.com/r/homebridge/comments/1hkzlf0/homebridge_the_future_concerns/
  - title: 'r/homebridge: About to give up on HomeBridge'
    url: >-
      https://www.reddit.com/r/homebridge/comments/1eplbzv/about_to_give_up_on_homebridge/
  - title: 'r/homebridge: HomeKit devices using Homebridge get No Response'
    url: >-
      https://www.reddit.com/r/homebridge/comments/p8zmzr/homekit_devices_using_homebridge_get_no_response/
  - title: 'r/HomeKit: Is it worth it to set up (and maintain) a Homebridge?'
    url: >-
      https://www.reddit.com/r/HomeKit/comments/1d37h7m/is_it_worth_it_to_set_up_and_maintain_a/
reviewedDate: '2026-10-21'
faqs:
  - q: Is Homebridge free?
    a: >-
      Yes. Homebridge is a free, non-commercial, open-source project run by
      volunteers, and the official Raspberry Pi image is free too. The project
      says that if a page asks you to pay for Homebridge itself, it is not them.
      You only pay for the hardware it runs on.
  - q: Do I need a Raspberry Pi for Homebridge?
    a: >-
      No. A Raspberry Pi is the most common choice and has an official image,
      but Homebridge also installs on macOS, Windows, Linux, Docker and NAS
      boxes such as Synology. Whatever you pick has to stay on and connected all
      the time.
  - q: Is Homebridge safe to use?
    a: >-
      Homebridge runs on your own network, but every plugin is community code
      and the bridge is not certified by Apple. Prefer plugins with the verified
      badge, which the Homebridge team checks for things like no user tracking
      and no install scripts that change your system, and change the default
      admin password of the Homebridge UI.
  - q: Will Matter replace Homebridge?
    a: >-
      Not yet. Devices with native Matter or HomeKit support don't need it, but
      many brands still have neither. Homebridge v2 can itself expose plugin
      accessories over Matter, although that support is uncertified.
  - q: Can I use Homebridge in an apartment?
    a: >-
      Yes, as long as you control the network. The host, your iPhone and your
      home hub must be on the same network with discovery working, so
      building-managed Wi-Fi with client isolation can block it. Your own router
      in your unit usually solves that.
author: editorial-team
related:
  - what-is-homekit
  - does-ring-work-with-apple-homekit
  - apple-homekit-compatible-devices
illustrations:
  - prompt: >-
      A small bare single-board computer with a plain white case and a short
      ethernet cable sitting on a bookshelf next to a home router in a rental
      apartment living room, a few paperback books and a plant nearby, soft
      afternoon window light, realistic photo, no logos, no text
    alt: >-
      Small always-on computer next to a router on an apartment bookshelf, the
      kind of host Homebridge runs on
    afterHeading: 2
  - prompt: >-
      A renter in a hallway of an apartment building holding a smartphone near a
      plain white wall-mounted network box with blinking lights, closed
      neighbour doors along the corridor, evening ceiling light, realistic
      photo, face not visible, no text, no logos
    alt: >-
      Renter checking the building Wi-Fi in an apartment hallway before setting
      up Homebridge
    afterHeading: 4
  - prompt: >-
      A cardboard moving box on a wooden floor of a half-empty apartment with a
      small white computer, a coiled power cable and a home router packed
      inside, rolled rug and taped boxes in the background, daylight from a
      window, realistic photo, no text, no logos
    alt: Homebridge host and router packed in a moving box on move-out day
    afterHeading: 7
videos:
  - id: 1F2kj-hftkI
    afterHeading: 1
    title: What I Use Homebridge For (and Why I Love It)
    channel: 'Edgar’s Home Tech '
    checked: '2026-10-21'
heroImage: /images/featured/what-is-homebridge.png
heroAlt: >-
  What Is Homebridge? What It Needs, Plugins and 5 Renter Limits –
  RenterSmartHome renter guide
---

You moved into a new apartment with a Kasa plug and a Ring doorbell from your last place, switched to an iPhone, and the Home app can't see either of them. **Homebridge is free, open-source software that runs on an always-on computer in your home and makes devices without HomeKit support show up in Apple's Home app, so Siri, scenes and automations can use them.** It needs that computer, a plugin for each brand and, for remote control, a home hub. In a rental, the network and move-out day matter more than the software.

## What is Homebridge, in plain words

**Homebridge is a lightweight Node.js server that pretends to be a HomeKit accessory, then passes your commands to brands Apple doesn't support.** Its developer docs say it emulates the HomeKit Accessory Protocol (HAP), the language of Apple HomeKit and its Home app, and uses community plugins as the bridge to each maker's devices. Say "Hey Siri, turn on the lamp" and the Home app talks to Homebridge, which talks to the plug.

The project is non-commercial and volunteer-run, with [over 2,000 Homebridge plugins](https://homebridge.io/) listed on its site, including Ring, Nest, TP-Link Kasa, Philips Hue, Belkin Wemo and SwitchBot. Since v2, plugins can also share accessories over Matter with Google Home, Alexa or SmartThings. The video below shows what one owner uses it for day to day.

## What Homebridge needs to run

**Homebridge needs three things: an always-on host on your home network, a plugin for each device brand, and an Apple home hub if you want control away from home.** There's no monthly fee; the software and the Raspberry Pi image are free.

### The always-on computer

Homebridge installs on a [Raspberry Pi, Linux, macOS, Windows or Docker](https://homebridge.io/how-to-install-homebridge), and the install page links guides for Synology, Unraid and QNAP NAS boxes. A Raspberry Pi is the usual pick because it is small and uses little power. The official image needs a supported Pi model and [a 4GB or larger SD card](https://github.com/homebridge/homebridge-raspbian-image/wiki/Getting-Started), and it is flashed with Raspberry Pi Imager. If the host sleeps or loses power, every Homebridge accessory shows as unresponsive until it's back.

### The home hub

Homebridge works from your iPhone on the same Wi-Fi without anything else. Per [homebridge.io](https://homebridge.io/), adding a home hub such as an Apple TV or HomePod lets you run automations and control devices when you're out. We explain hubs in our [HomeKit basics for renters](/blog/what-is-homekit/).

### The plugins

You install plugins from the Homebridge UI, a browser dashboard that also edits settings, shows logs and backs up your setup. You then add the bridge to the Home app once by scanning its QR code; cameras and most TVs pair separately.

## Verified vs unverified Homebridge plugins

**A verified badge means the Homebridge team reviewed the plugin against a list of requirements; it doesn't mean the device maker supports it.** The [Verified Plugins wiki page](https://github.com/homebridge/homebridge/wiki/Verified-Plugins) lists what reviewers check:

- Published on npm with public source on GitHub and issues enabled
- Configurable through the Homebridge UI settings screen
- No analytics or calls that track the user
- No post-install scripts that modify your system
- Runs on the supported Node.js LTS versions

An unverified plugin can still be fine. We'd read its GitHub page first: recent releases, open issues and a maintainer who replies tell you more than the download count.

## Homebridge in a rental

**Homebridge suits renters because nothing gets drilled or wired: the host plugs into an outlet and leaves with you.** The catches are the building network, devices you don't own and move-out day.

### Building Wi-Fi

The Home app finds Homebridge through local discovery (mDNS, Apple's Bonjour). The [developer docs](https://developers.homebridge.io/homebridge/) say Matter pairing needs the controller and Homebridge on the same IP subnet with mDNS working, "the same network constraints as HomeKit." Building-wide Wi-Fi with client isolation, or a guest network, can stop that discovery. If your complex provides Wi-Fi, we'd ask whether you can plug your own router into the wall jack, then put the host, your iPhone and your home hub on it.

### Landlord-owned devices

Plugins exist for locks, garage openers and thermostats. If the landlord owns the smart lock or thermostat, get written permission before bridging it, and never store the landlord's account password in your plugin settings without that consent.

### Moving out

Before you pack, our advice is to download a backup from the Homebridge UI. At the new place, a new router hands out new IP addresses, so check any plugin you set up with a device's IP address. Remove the bridge from your Home app if you won't reuse it, and sign out of brand accounts in plugin settings before you hand the computer to anyone.

## 5 limits to know before you start

**Homebridge is useful but unofficial, and these five limits are the ones we'd want any renter to know first.**

1. **Accessory cap.** [One bridge can only expose 150 accessories](https://developers.homebridge.io/homebridge/) due to a HomeKit limit; child bridges or a second instance get around it.
2. **Uncertified.** The Home app warns that the bridge is not certified, and Homebridge's Matter support is not certified by the Connectivity Standards Alliance either.
3. **Cloud plugins can break.** Plugins that log in to a maker's cloud (Ring, Nest) can stop working when the maker changes its service, until a volunteer fixes them.
4. **Always on.** No host, no accessories.
5. **Old 32-bit Pi images.** The 32-bit Homebridge image is not recommended, and [support ends Spring 2027](https://github.com/homebridge/homebridge-raspbian-image/wiki/Getting-Started); the 64-bit image runs on Pi 3B and newer.

## Problems owners run into, and the fix

**Most Homebridge complaints come down to three things: plugins, power and discovery.**

**Plugins that stop working.** After Homebridge 2.0, one r/homebridge user wrote, "[It appears that most of my plugins are not currently supporting HB v2, or even worse, they are no longer being developed by the maintainer.](https://www.reddit.com/r/homebridge/comments/1hkzlf0/homebridge_the_future_concerns/)" Fix: favor verified, recently updated plugins, back up before every update and roll back a plugin that breaks. Run each important plugin as a child bridge so one crash doesn't take down the rest.

**"Not Responding" after an outage.** Raspberry Pi owners in an [r/homebridge thread](https://www.reddit.com/r/homebridge/comments/1eplbzv/about_to_give_up_on_homebridge/) worry a power outage might damage the SD card, and one had to reboot the Apple TV to clear the errors. Fix: use a decent SD card, keep a current backup, connect the host by Ethernet, and add a small UPS if your building loses power often.

**The Home app can't find Homebridge.** The developer docs suggest swapping between the Bonjour HAP and Ciao mDNS advertisers and toggling airplane mode to flush the iPhone's DNS cache. One owner fixed a No Response bridge by [switching mDNS to Avahi](https://www.reddit.com/r/homebridge/comments/p8zmzr/homekit_devices_using_homebridge_get_no_response/).

> **From our notes:** When we worked through the Homebridge docs for this guide, the part that surprised us was how specific the verified list is. We counted 433 plugins in the wiki's verified table, including Ring, TP-Link Kasa, SwitchBot, Govee, Meross and Tuya, and each of them had to pass rules like no user tracking and a settings screen in the UI. The official Raspberry Pi guide was the other eye-opener: it warns that 32-bit images are losing support in Spring 2027, a detail none of the explainers we read mentioned. Picture a renter flashing an old card from a drawer; that's the first thing we'd check.

## Is Homebridge worth it for a renter?

**Homebridge is worth it if you already own devices without HomeKit or Matter support and are fine maintaining a small computer; if you're buying new, buy native.** Owners are split: one r/HomeKit reply says "[Homebridge is completely worth it.](https://www.reddit.com/r/HomeKit/comments/1d37h7m/is_it_worth_it_to_set_up_and_maintain_a/)" for things like virtual timers, while another, a software engineer, says it takes a lot of debugging to get working.

We compare the three common routes in this table.

| Route | Best for | Upkeep |
|---|---|---|
| Homebridge | Devices you already own with no HomeKit or Matter | You update the host and plugins |
| HOOBS | Homebridge without setting up Linux | Lower, packaged |
| Home Assistant | Mixed Apple, Google and Alexa homes | Highest, most flexible |

So for that renter with the Kasa plug and the Ring doorbell: Homebridge on a Pi beside your own router gets both into the Home app with no drilling and leaves with you. For Ring specifically, our [Ring and HomeKit guide](/blog/does-ring-work-with-apple-homekit/) walks through the plugin. If you'd rather skip the bridge, start with our [HomeKit compatible devices for renters](/blog/apple-homekit-compatible-devices/).
