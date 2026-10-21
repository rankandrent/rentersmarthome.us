---
title: Werkt Ring met Apple HomeKit? 3 bridges en een huurderscheck (2026)
seoTitle: Werkt Ring met Apple HomeKit? 3 bridges voor huurders
description: >-
  Nee, Ring heeft geen eigen HomeKit- of Matter-ondersteuning. Zo zet je Ring via
  Homebridge, Scrypted of HOOBS in Apple Woning, en dit check je als huurder.
pubDate: '2026-10-20T23:35:00.000Z'
lang: nl
translationOf: does-ring-work-with-apple-homekit
category: security
keyword: werkt ring met apple homekit
secondaryKeywords:
  - ring camera homekit
  - ring deurbel apple woning
  - ring homekit koppelen
entities:
  - Ring and HomeKit
  - Ring
  - Apple Home app
  - Homebridge
  - Scrypted
  - HOOBS
  - Home Assistant
  - HomeKit Secure Video
  - Matter
  - Ring Protect
  - refresh token
  - lease
tags:
  - videodeurbellen
  - apple homekit
  - beveiliging appartement
  - regels voor huurders
articleType: how-to
funnel: mofu
productStyle: paragraph
readingTime: 9
tldr:
  - >-
    Nee. Ring-deurbellen, Ring-camera's en Ring Alarm hebben geen eigen
    HomeKit- of Matter-ondersteuning en verschijnen dus nooit vanzelf in de
    Woning-app van Apple.
  - >-
    Bridges van derden (Homebridge met de Ring-plugin, HOOBS, of Scrypted voor
    HomeKit Secure Video) kunnen Ring wel aan Apple Woning toevoegen, maar ze
    hebben een apparaat nodig dat altijd aan staat.
  - >-
    Check als huurder eerst je huurcontract en of je camera niet de buren of de
    openbare weg filmt; kies daarna tussen een bridge onderhouden of een
    deurbel die HomeKit zelf ondersteunt.
sources:
  - title: How to add Ring to Apple Home with HOOBS (HOOBS)
    url: 'https://hoobs.com/ring/'
  - title: HOOBS Box (HOOBS)
    url: 'https://hoobs.com/box/'
  - title: Does Ring work with Apple Home (AddToHomeKit)
    url: 'https://www.addtohomekit.com/blog/ring-homekit/'
  - title: Ring camera HomeKit (AddToHomeKit)
    url: 'https://www.addtohomekit.com/blog/ring-camera-homekit/'
  - title: 'Ring home automation with Google Home, Alexa, Apple (SafeHome.org)'
    url: 'https://www.safehome.org/doorbell-cameras/ring/automation/'
  - title: Does Ring work with Apple HomeKit? Top 3 methods (Wasserstein Home)
    url: >-
      https://wasserstein-home.com/blogs/smart-home/does-ring-work-with-apple-homekit-top-3-methods
  - title: Gefilmd worden door de camera van een ander huis (Autoriteit Persoonsgegevens)
    url: >-
      https://www.autoriteitpersoonsgegevens.nl/themas/cameratoezicht/cameragebruik-in-en-om-het-huis/gefilmd-worden-door-de-camera-van-een-ander-huis
  - title: Camera's bij het eigen huis (Autoriteit Persoonsgegevens)
    url: >-
      https://www.autoriteitpersoonsgegevens.nl/themas/cameratoezicht/cameragebruik-in-en-om-het-huis/cameras-bij-het-eigen-huis
  - title: Uitspraak ECLI:NL:RBZWB:2024:9594 (Rechtbank Zeeland-West-Brabant)
    url: 'https://uitspraken.rechtspraak.nl/details?id=ECLI:NL:RBZWB:2024:9594'
  - title: Camera van de buren (Juridisch Loket)
    url: 'https://www.juridischloket.nl/wonen-en-buren/buren/camera/'
  - title: Deurbel camera appartementen complex (r/juridischadvies)
    url: >-
      https://www.reddit.com/r/juridischadvies/comments/1k31ick/deurbel_camera_appartementen_complex/
  - title: Camera in gemeenschappelijke ruimte door huurder (r/thenetherlands)
    url: >-
      https://www.reddit.com/r/thenetherlands/comments/ooymt5/camera_in_gemeenschappelijke_ruimte_door_huurder/
  - title: Ring Protect plans (Ring)
    url: 'https://ring.com/plans'
  - title: Set up security cameras in Home on iPhone (Apple Support)
    url: 'https://support.apple.com/guide/iphone/set-up-security-cameras-iph7bc5df9d9/ios'
reviewedDate: '2026-10-20'
faqs:
  - q: Werkt Ring met Apple HomeKit?
    a: >-
      Niet standaard. Ring-deurbellen, Ring-camera's en Ring Alarm verschijnen
      niet vanzelf in de Woning-app van Apple, en Ring heeft geen Matter-deurbellen
      of -camera's. Bridges van derden zoals Homebridge met de Ring-plugin, HOOBS
      of Scrypted kunnen ze wel aan HomeKit doorgeven.
  - q: Werkt HomeKit Secure Video met Ring-camera's?
    a: >-
      Niet uit zichzelf. Scrypted is de bridge die de belangrijkste gidsen noemen
      voor HomeKit Secure Video op Ring-camera's, en HomeKit Secure Video bewaart
      opnamen in iCloud+, dus dat abonnement heb je ook nodig. De standaard
      Homebridge Ring-plugin biedt het niet.
  - q: Heb ik een hub of Raspberry Pi nodig om Ring aan HomeKit te koppelen?
    a: >-
      Je hebt een apparaat nodig dat altijd aan staat voor de bridge-software,
      zoals een Raspberry Pi, een computer die nooit in slaap valt of een
      kant-en-klare HOOBS Box. Voor bediening op afstand en automatiseringen heeft
      Apple Woning ook een HomePod of Apple TV als woninghub nodig.
  - q: Werkt Apple HomeView met Ring?
    a: >-
      AddToHomeKit meldt dat Apple een thuisscherm met de naam HomeView heeft
      aangekondigd; de details daarvan hebben we niet bevestigd. Zoals elk
      Apple Woning-scherm kan het Ring pas tonen nadat een bridge Ring aan de
      Woning-app heeft toegevoegd, omdat Ring geen eigen HomeKit-ondersteuning
      heeft.
  - q: Is het veilig om Homebridge mijn Ring-login te geven?
    a: >-
      De Homebridge Ring-plugin logt één keer in met je Ring-account en een
      tweestapscode en bewaart daarna een refresh token. Behandel die token als
      een wachtwoord, houd de bridge up-to-date en verwijder de login uit je
      Ring-account als je ermee stopt of verhuist.
  - q: Wat is de makkelijkste HomeKit-deurbel voor een huurwoning?
    a: >-
      Wil je alleen Apple Woning, dan heb je met een deurbel op batterij die
      HomeKit zelf ondersteunt helemaal geen bridge nodig. Eén huurder op
      r/HomeKit gebruikte een Aqara G4 op batterij in een huurwoning. Check je
      huurcontract en vraag je verhuurder schriftelijk om toestemming voordat je
      een deurbelcamera ophangt.
author: editorial-team
illustrations:
  - prompt: >-
      A small single-board computer in a clear case and a compact white network
      box sitting on a bookshelf next to a home router in a rental apartment,
      tidy cables, a potted plant and paperback books nearby, soft afternoon
      daylight, realistic photo
    alt: >-
      Kleine computer die altijd aan staat als bridge naast de router op een boekenplank
    afterHeading: 2
  - prompt: >-
      A person holding a smartphone in a bright apartment kitchen, the screen
      showing a blurred live video feed of a front door hallway, a small round
      smart speaker on the counter beside a coffee mug, morning light through
      the window, realistic photo, face not visible
    alt: >-
      Huurder bekijkt het live beeld van de deurbelcamera op de telefoon in de keuken
    afterHeading: 3
  - prompt: >-
      A renter reading a printed lease agreement at a dining table, a
      battery-powered video doorbell and an adhesive mounting plate lying
      unopened beside the papers, an apartment front door with a peephole
      visible in the background, natural daylight, realistic photo, face not
      visible
    alt: >-
      Huurder leest het huurcontract voordat hij een videodeurbel ophangt
    afterHeading: 5
videos:
  - id: mK8Wvv9aALs
    afterHeading: 4
heroImage: /images/featured/does-ring-work-with-apple-homekit.png
heroAlt: >-
  Werkt Ring met Apple HomeKit? 3 bridges en een huurderscheck (2026) –
  RenterSmartHome how-to
---

In een Nederlands appartementencomplex begint de vraag over een videodeurbel vaak niet bij de techniek, maar bij de buren. Op r/juridischadvies vat iemand het zo samen: ["Iemand mag alleen een camera of videodeurbel ophangen als die camera de bezittingen van buren en/of de openbare weg niet filmt."](https://www.reddit.com/r/juridischadvies/comments/1k31ick/deurbel_camera_appartementen_complex/) Daar komen we verderop op terug. Eerst de techniek, want ook daar is het antwoord kort. **Ring werkt niet standaard met Apple HomeKit: Ring-deurbellen, Ring-camera's en Ring Alarm hebben geen HomeKit- of Matter-ondersteuning, dus ze verschijnen nooit vanzelf in de Woning-app van Apple.** Bridges van derden zoals Homebridge, Scrypted en HOOBS kunnen Ring wel aan Apple Woning toevoegen, maar het blijven onofficiële omwegen die een apparaat nodig hebben dat dag en nacht aan staat.

We schreven deze gids voor huurders die die omweg overwegen: de drie bridge-routes, wat je ermee krijgt, en de checks rond huurcontract, privacy en verhuizen die andere gidsen overslaan.

## Werkt Ring met Apple HomeKit?

**Zoals wij de bronnen lezen, komen Ring en HomeKit alleen samen via een bridge van derden; Ring ondersteunt zelf Alexa en Google Home, niet Apple.** In de Ring-app zit geen knop "Voeg toe aan Apple Woning", er staat geen HomeKit-QR-code op de doos en er is geen Matter-koppelcode.

### Wat native ondersteuning betekent voor Ring-deurbellen, camera's en Alarm

Native ondersteuning zou betekenen: je scant een code in de Woning-app en ziet daar de deurbel, de camera's en de alarmsensoren, zonder extra software. Ring biedt die route wel voor Alexa en Google Home, en daarom voelen Ring-bezitters met een iPhone zich vaak klem gezet. Een bridge bootst die route na door de cloud van Ring te vertalen naar HomeKit-accessoires.

### Waarom Matter je hier niet helpt

Ring heeft geen Matter-deurbellen of -camera's, dus Matter is geen achterdeur naar Apple Woning. Die verwarring komt steeds terug in draadjes op r/HomeKit, waar eigenaren vragen of "Matter" op de doos betekent dat een apparaat in Apple Woning verschijnt. Eén reactie legt uit waarom de antwoorden blijven veranderen: ["The challenge is that Matter is evolving quickly."](https://www.reddit.com/r/HomeKit/comments/1l0soq3/does_matter_automatically_mean_a_device_will_work/) Onze vuistregel: vertrouw op een Matter- of "Werkt met Apple Woning"-logo op het product zelf, en negeer beweringen dat Ring "via Matter" met HomeKit werkt.

## Ring in Apple Woning krijgen: drie manieren

**De gratis route is Homebridge met de Ring-plugin; Scrypted is de route voor HomeKit Secure Video; Home Assistant is alleen zinvol als je dat al draait.** Alle drie hebben een computer nodig die de klok rond aan staat.

- **Homebridge of HOOBS.** Homebridge is gratis, open-source bridge-software, en de Ring-plugin zet Ring-deurbellen, Ring-camera's en Ring Alarm-sensoren als HomeKit-accessoires in je Woning-app. HOOBS verpakt Homebridge voor een Raspberry Pi of voor een eigen box.
- **Scrypted.** Deze bridge streamt Ring-camera's naar HomeKit en is de methode die de belangrijkste gidsen noemen voor HomeKit Secure Video (HKSV), Apples versleutelde camera-opslag via iCloud+.
- **Home Assistant.** Deze hub heeft een Ring-integratie en een HomeKit Bridge die Ring doorgeeft aan de Woning-app, maar geen HKSV voor Ring.

Deze tabel zet de drie routes naast elkaar: wat je als huurder moet laten draaien en wat je ervoor terugkrijgt.

| Route | Wat moet er draaien | HomeKit Secure Video | Het beste voor |
|---|---|---|---|
| Homebridge / HOOBS | Raspberry Pi, computer die altijd aan staat of HOOBS Box | Nee (standaard Ring-plugin) | Deurbelmeldingen, Siri, automatiseringen |
| Scrypted | Computer of server die altijd aan staat | Ja, met iCloud+ | Camera-opnamen in Apple Woning |
| Home Assistant | Bestaande Home Assistant-server | Nee | Wie het al gebruikt |

### HOOBS als kant-en-klare host voor Ring

Heb je al Ring en wil je geen server bouwen, dan is een kant-en-klare HOOBS-box volgens ons de eenvoudigste host. Volgens HOOBS komt die met de HOOBS-software al geïnstalleerd, een platform op basis van Homebridge, dus je werk bestaat uit de Ring-plugin toevoegen en koppelen, niet uit Linux inrichten. De Ring-plugin werkt via je Ring-account met de Ring-apparaten die je zelf hebt; HOOBS legt de stappen uit op zijn [Ring-installatiepagina](https://hoobs.com/ring/). Welke Ring-modellen in Nederland en België te koop zijn, hebben we niet nagekeken. Volgens de bronnen kan een druk op de deurbel HomeKit-scènes starten en een HomePod laten klinken.

De nadelen zijn dezelfde als bij elke Ring-bridge. Het is onofficieel, dus een wijziging in de cloudlogin van Ring kan de plugin breken, en live beeld loopt via de cloud van Ring, waardoor het trager is dan bij een native HomeKit-camera. De standaard Ring-plugin geeft ook geen HomeKit Secure Video. Voor huurders: zo'n box vraagt geen boren en trek je bij het verhuizen in seconden uit het stopcontact, maar hij moet wel in je woning aan de stroom en online blijven.

## Wat je wel en niet kunt als Ring via een bridge loopt

**Met een bridge geeft Ring je in de Woning-app live beeld, bewegings- en deurbelmeldingen, Siri-bediening en automatiseringen; opnamen, instellingen en Ring Protect blijven in de Ring-app.** Wij zouden beide apps op je telefoon houden.

### Live beeld, beweging, deurbel, Siri en automatiseringen

De bronnen beschrijven live beeld en momentopnamen in de Woning-app, meldingen bij beweging en als er wordt aangebeld, Siri-verzoeken om een camera te tonen, en automatiseringen zoals een lamp die aangaat als de deurbel gaat. Ook Ring Alarm-sensoren kunnen verschijnen. Omdat het beeld van de Ring-cloud naar de bridge en dan naar Apple Woning gaat, moet je rekenen op een vertraging voordat live beeld start.

### Wat in de Ring-app blijft (opnamen, instellingen, Ring Protect)

Een bridge zet de opnamen van Ring Protect niet over naar Apple Woning, volgens [AddToHomeKit](https://www.addtohomekit.com/blog/ring-homekit/). Ring Protect is het betaalde cloudabonnement van Ring; volgens de Amerikaanse abonnementspagina van Ring worden bewegingsvideo's [tot 180 dagen](https://ring.com/plans) in de cloud bewaard (functies kunnen per land verschillen). Wil je daarnaast HomeKit Secure Video via Scrypted, dan heb je een iCloud+-abonnement nodig: volgens Apple zie je daarmee [de activiteit van de laatste 10 dagen, en ondersteunt het 200-GB-abonnement tot vijf camera's](https://support.apple.com/guide/iphone/set-up-security-cameras-iph7bc5df9d9/ios). Je betaalt dus voor twee clouds om opnamen in beide apps te hebben. Wij denken dat de meeste huurders beter één kant kiezen: Ring Protect houden en Apple Woning alleen gebruiken voor meldingen en Siri, of helemaal voor HKSV gaan.

### HomePod of Apple TV als woninghub

Een HomePod of Apple TV is de woninghub van Apple Woning, en die heb je nodig voor bediening op afstand en automatiseringen. Zonder woninghub werken bediening op afstand en een deel van de automatiseringen niet.

## Ring koppelen aan Apple Woning, stap voor stap (voorbeeld met Homebridge)

**Installeer Homebridge op een apparaat dat altijd aan staat, voeg de Ring-plugin toe, log in met tweestapsverificatie en scan daarna de QR-code in de Woning-app.** De stappen hieronder volgen de Homebridge- en HOOBS-handleidingen uit onze bronnen:

1. Installeer Homebridge op een Raspberry Pi, een computer die nooit in slaap valt of in een Docker-container, of sluit een HOOBS Box aan.
2. Open de webinterface van Homebridge en installeer de Ring-plugin.
3. Log in met je Ring-account en voer de code voor tweestapsverificatie in; de plugin bewaart een refresh token van Ring zodat hij er niet elke keer om vraagt.
4. Herstart Homebridge zodat de Ring-apparaten laden.
5. Tik in de Woning-app op Voeg accessoire toe en scan de QR-code die Homebridge toont.
6. Wijs ruimtes toe, zet deurbelmeldingen aan en bouw automatiseringen op je HomePod of Apple TV als woninghub.

Wil je de installatie eerst zien, dan loopt de video hieronder de Homebridge-route door, van de Ring-app tot Apple Woning.

Wij behandelen die refresh token als een wachtwoord. Wie bij je bridge kan, heeft toegang tot je Ring, en dat telt in een gedeelde woning.

## Huurderscheck voordat je Ring aan HomeKit koppelt

**Een bridge verandert in welke app je Ring ziet; hij verandert niets aan de vraag of je Ring überhaupt mag ophangen.** Regel toestemming, montage, privacy en je vertrekplan voordat je een avond aan plugins besteedt.

### Toestemming van de verhuurder en de buren

In de Nederlandse draadjes die we lazen gaat het vooral over wat een camera mag zien. Op r/thenetherlands schrijft iemand over een camera van een huurder in een gemeenschappelijke ruimte: ["Wettelijk gezien mag je niet zomaar camera's plaatsen in de publieke ruimte."](https://www.reddit.com/r/thenetherlands/comments/ooymt5/camera_in_gemeenschappelijke_ruimte_door_huurder/) De [Autoriteit Persoonsgegevens](https://www.autoriteitpersoonsgegevens.nl/themas/cameratoezicht/cameragebruik-in-en-om-het-huis/gefilmd-worden-door-de-camera-van-een-ander-huis) zegt dat een camera of videodeurbel bij een woning in principe niet de openbare weg of de bezittingen van de buren mag filmen, en raadt aan eerst met de buren te praten. De AP heeft ook een pagina met privacyregels en praktische tips voor [camera's bij je eigen huis](https://www.autoriteitpersoonsgegevens.nl/themas/cameratoezicht/cameragebruik-in-en-om-het-huis/cameras-bij-het-eigen-huis). Volgens het [Juridisch Loket](https://www.juridischloket.nl/wonen-en-buren/buren/camera/) is een camera ophangen niet verboden; het geeft ook stappen voor als de camera van een buur jouw huis of tuin filmt. En in een uitspraak van de [Rechtbank Zeeland-West-Brabant (ECLI:NL:RBZWB:2024:9594)](https://uitspraken.rechtspraak.nl/details?id=ECLI:NL:RBZWB:2024:9594) vond de rechter dat een huurder eerst toestemming aan de verhuurder had moeten vragen voordat hij camera's ophing, en moesten ze na een belangenafweging weg. Dat is één zaak bij één rechtbank en algemene informatie, geen juridisch advies. Wij kunnen niet zeggen wat in jouw situatie geldt. Check je huurcontract en de huisregels van je complex, richt de camera alleen op je eigen voordeur, en vraag je verhuurder schriftelijk om toestemming voordat je iets ophangt. Een koppeling met HomeKit verandert daar niets aan.

### Monteren zonder boren en de host in je eigen woning

Boren is de andere muur, soms letterlijk: veel huurders mogen niet in de buitengevel of de voordeur boren. Onze gids over [een Ring deurbel in een appartement zonder boren](/nl/blog/ring-deurbel-appartement/) behandelt de Peephole Cam en plakmontage. Zet de bridge-host binnen in je eigen woning op je eigen router, niet op een gedeeld wifi-netwerk van het gebouw.

### Het verborgen onderhoud van een bridge

Een bridge is een tweede apparaat dat je moet bijhouden, en volgens ons is dat het deel waar gidsen overheen stappen. Eigenaren op r/homebridge beschrijven Ring-camera's die wel in de Woning-app staan maar geen live beeld openen, en deurbellen die niet meer reageren, met één oplossing in [een draadje over Ring-deurbellen die niet reageren](https://www.reddit.com/r/homebridge/comments/in3p6e/ring_doorbells_not_responding/): ["Restarting the homekit hub finally fixed it."](https://www.reddit.com/r/homebridge/comments/in3p6e/ring_doorbells_not_responding/) Bij elke verhuizing, nieuwe router of nieuw wifi-wachtwoord moet je de host opnieuw controleren. Ook een stroomstoring telt: de deurbel blijft in Ring werken, maar verdwijnt uit Apple Woning tot de bridge weer draait.

> **Uit onze notities:** Toen we de drie best scorende gidsen over Ring en HomeKit naast elkaar legden (AddToHomeKit, SafeHome.org en Wasserstein Home), legden ze alle drie Homebridge, Scrypted of HOOBS uit, en geen enkele vroeg of de lezer wel een Ring mocht ophangen. De huurdersdraadjes die we voor dit artikel verzamelden vertelden de andere helft. Mensen vroegen of een verbod op camera's standhoudt, waar je kunt monteren zonder te boren en waarom een gekoppelde deurbel ineens "Reageert niet" gaf. Daarom staan in deze gids het huurcontract en het onderhoud naast de installatiestappen.

### Bridge of native kopen: de huurvriendelijke HomeKit-deurbel

Draait alles bij jou om Apple Woning, dan kan een deurbel die HomeKit zelf ondersteunt beter zijn dan Ring plus een bridge. In een [draadje over een huurvriendelijke deurbel op r/HomeKit](https://www.reddit.com/r/HomeKit/comments/1tiqf0c/renter_friendly_doorbell_solution/) vertelt een huurder dat hij een Aqara G4 op batterij gebruikt, die geen deurbelbedrading nodig heeft. Native HomeKit-camera's koppel je rechtstreeks aan de Woning-app, dus er is geen host die je in leven moet houden. Wij zouden alleen een bridge nemen als je al Ring hebt, Alexa of Google Home nodig hebt voor een huisgenoot, of de eigen app van Ring wilt. Onze [vergelijking van Ring en Nest deurbellen voor huurders](/nl/blog/ring-of-nest-deurbel/) bespreekt modellen op batterij die bij een huurwoning passen.

### Verhuischecklist voor een gekoppelde Ring

Deze checklist is ons voorstel, geen regel van Ring of Apple:

1. Verwijder de login van de bridge in de beveiligingsinstellingen van je Ring-account, of wijzig je Ring-wachtwoord, zodat de refresh token niet meer werkt.
2. Verwijder de Ring-accessoires en de bridge uit de Woning-app.
3. Haal de HOOBS Box of Raspberry Pi van de stroom en zet hem terug naar de fabrieksinstellingen als je hem verkoopt.
4. Haal de Ring weg, werk eventuele gaatjes bij zoals je huurcontract voorschrijft, en zet de oorspronkelijke deurbel of deurspion terug.
5. Koppel Ring opnieuw in de Ring-app op je nieuwe adres en koppel daarna de bridge opnieuw.

## Problemen met Ring en HomeKit, en de oplossing

**De meeste klachten van eigenaren gaan over tegels met "Reageert niet", verouderde momentopnamen en abonnementskosten; de hub of bridge herstarten lost de eerste twee op, en één cloud kiezen lost de derde op.**

### Ring geeft "Reageert niet" in Apple Woning

Herstart in deze volgorde: de woninghub van Apple (HomePod of Apple TV), daarna de bridge, daarna het Ring-apparaat. Blijven de momentopnamen oud, log dan opnieuw in bij de Ring-plugin met een nieuwe tweestapscode; opnieuw inloggen is een van de oplossingen die eigenaren uitwisselen in draadjes op r/homebridge, zoals [dit draadje over camera's die niet openen](https://www.reddit.com/r/homebridge/comments/1l15kwk/ring_cameras_show_in_homekit_but_when_i_click_for/). Blijft het gebeuren, dan beslist de keuze tussen bridge en native zich eigenlijk vanzelf.

### Abonnement en privacy tegen elkaar afwegen

Maandelijkse camerakosten zijn een terugkerende ergernis in draadjes op r/homeowners en r/homeautomation, en één eigenaar merkt op dat je bij sommige camera's geen abonnement nodig hebt: ["Subscription not required to record to SD card and view via your cell phone."](https://www.reddit.com/r/homeowners/comments/1ot0xm0/home_security_cameras_without_monthly_payment/) Een Ring via een bridge blijft afhankelijk van de cloud van Ring, en volgens Ring start de [gratis proefperiode van 30 dagen voor Ring Protect](https://ring.com/plans) bij het instellen van het apparaat; daarna betaal je voor video-opnamen. Vind je lokale opslag belangrijker dan HomeKit, kijk dan naar onze [videodeurbellen zonder abonnement voor huurders](/nl/blog/videodeurbel-zonder-abonnement-voor-huurders/).

### Welke Apple- of Matter-claims je kunt negeren

Negeer elke advertentie die zegt dat Ring "HomeKit-compatibel" of "Matter-ready" is zonder het logo van Apple op de doos. AddToHomeKit meldt dat Apple een thuisscherm met de naam HomeView heeft aangekondigd; de details daarvan hebben we niet bevestigd, maar geen enkel Apple-scherm kan Ring tonen voordat een bridge het in de Woning-app zet.

Dus voor de huurder die met een iPhone een deurbel zoekt: heb je nog geen Ring en wil je Apple Woning, koop dan native. Heb je er al een, dan krijgt een HOOBS Box of Homebridge hem in de Woning-app, zodra je verhuurder ja zegt en je camera alleen je eigen voordeur filmt. Twijfel je nog tussen ecosystemen? Onze [vergelijking van Alexa en Google Home voor huurders](/nl/blog/alexa-of-google-home/) legt uit waar Ring wel standaard bij past.
