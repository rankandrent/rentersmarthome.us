---
title: 'Govee HomeKit – Matter koppelen, bridges en tips voor als je verhuist'
seoTitle: Govee HomeKit (2026) – Matter koppelen in je huurwoning
description: >-
  Govee HomeKit werkt via Matter: lampen met het Matter-logo komen zonder
  bridge in Apple Home, oudere niet. Koppelen, IPv6-valkuilen en tips voor huurders.
pubDate: '2026-10-20T18:30:00.000Z'
lang: nl
translationOf: govee-apple-homekit
category: lighting
keyword: govee homekit
secondaryKeywords:
  - werkt govee met homekit
  - werkt govee met apple home
  - govee apple home
  - govee matter apple home
  - govee toevoegen aan apple woning
  - govee ledstrip homekit
entities:
  - Govee lights in Apple Home (HomeKit)
  - Matter
  - Govee Home app
  - Apple Home app
  - HomePod mini / Apple TV 4K
  - Govee LED Strip Light M1
  - Homebridge
  - Home Assistant
  - AddToHomeKit
  - IPv6
  - 2.4 GHz Wi-Fi
  - Multi-admin
  - Thread
tags:
  - apple homekit
  - matter
  - ledstrips
  - huurwoning
articleType: how-to
funnel: mofu
productStyle: specs
readingTime: 8
tldr:
  - >-
    Ja, voor nieuwere modellen: Govee-lampen met het Matter-logo, zoals de LED
    Strip Light M1, voeg je aan Apple Home toe door de Matter-QR-code te
    scannen, zonder bridge. Kies in Nederland en België de EU-versie H61E0 met
    EU-stekker (2-pin lader).
  - >-
    Oudere Govee-lampen krijgen geen Matter via een firmware-update, dus die
    hebben Homebridge, Home Assistant of een betaalde bridge nodig.
  - >-
    Alleen aan/uit, helderheid, kleur en kleurtemperatuur komen in Apple Home;
    muzieksync, segmenten en DreamView blijven in de Govee Home-app.
  - >-
    Huurders: koppelen vraagt IPv6 en 2,4 GHz-wifi (controleer bij je provider
    of IPv6 aan staat), en wifi wijzigen in de Govee-app zet Matter uit, dus
    resetten en opnieuw toevoegen na elke verhuizing.
sources:
  - title: Matter FAQ (Govee)
    url: 'https://us.govee.com/pages/matter-faq'
  - title: How to pair Matter to Apple Home for beginners (Govee Community)
    url: >-
      https://community.govee.com/posts/how-to-pair-matter-to-apple-home-for-beginners/261671
  - title: Is there a way to use HomeKit with Govee? (Govee Community)
    url: >-
      https://community.govee.com/posts/is-there-a-way-to-use-homekit-with-govee/264953
  - title: How to Add Any Govee Devices to Apple HomeKit (AddToHomeKit)
    url: 'https://www.addtohomekit.com/blog/govee-homekit/'
  - title: 'Govee LED Strip Light M1, refurbished listing (Govee)'
    url: 'https://us.govee.com/products/refurbished-govee-led-strip-light-m1'
  - title: Cutting LED lights guide (Govee)
    url: >-
      https://us.govee.com/blogs/product-review-blog/becoming-a-master-at-cutting-led-lights-a-comprehensive-guide
  - title: 'Govee LED Strip Light M1 (Matter, 2 m), EU-winkel van Govee'
    url: >-
      https://eu.govee.com/products/refurbished-govee-led-strip-light-m1-matter-compatible-2m
  - title: Rijksoverheid – Waarborgsom bij een huurwoning
    url: >-
      https://www.rijksoverheid.nl/vraag-en-antwoord/woning-huren/woning-huren-waarborgsom
  - title: heeftodidoipv6.nl (onafhankelijke site)
    url: 'https://heeftodidoipv6.nl/'
  - title: Tweakers Gathering – IPv6-topic
    url: 'https://gathering.tweakers.net/forum/list_messages/1308304/127'
  - title: Juridischforum.be – borg en gaten in de muur
    url: 'https://juridischforum.be/viewtopic.php?t=39574'
reviewedDate: '2026-10-20'
faqs:
  - q: Werkt Govee met Apple HomeKit?
    a: >-
      Nieuwere Govee-lampen met het Matter-logo, zoals de LED Strip Light M1,
      voeg je direct aan Apple Home toe door de Matter-QR-code te scannen. Oudere
      modellen zonder Matter werken alleen via een bridge zoals Homebridge, Home
      Assistant of een betaalde bridge.
  - q: Welke Govee-apparaten ondersteunen Matter?
    a: >-
      De Matter-FAQ van Govee noemt de LED Strip Light M1 (2 m, en 5 m met een
      bedieningskastje met Matter). AddToHomeKit noemt daarnaast onder meer de
      Floor Lamp 3 en de Smart Plug Pro. Kijk of het Matter-logo op de doos
      staat; in Nederland en België is dat bij de M1 de EU-versie H61E0 met
      EU-stekker.
  - q: Waarom lukt het niet om mijn Govee-lamp aan Apple Home toe te voegen?
    a: >-
      Controleer of IPv6 aan staat in de router (en of je provider IPv6 levert),
      of je telefoon op 2,4 GHz-wifi zit met bluetooth aan en of je binnen 15
      minuten na het inschakelen van de lamp klaar bent. Lukt het nog steeds
      niet, herstart dan eerst de router, daarna de lamp, en probeer het
      opnieuw.
  - q: Kan ik Govee tegelijk in Apple Home en Alexa gebruiken?
    a: >-
      Ja, via Matter multi-admin. Maak een nieuwe installatiecode van 11 cijfers
      voor de lamp aan en voer die in de tweede app in, in plaats van de
      oorspronkelijke QR-code opnieuw te gebruiken.
  - q: Heb ik een HomePod of Apple TV nodig?
    a: >-
      Volgens de FAQ van Govee is een Matter-hub of -controller nodig, en in
      Apple Home is dat een HomePod of Apple TV als woninghub, die je ook nodig
      hebt voor bediening op afstand en automatiseringen. De hub hoort bij het
      Apple ID dat de woning heeft aangemaakt.
  - q: Wat gebeurt er met mijn Govee-lampen als ik verhuis?
    a: >-
      Verwijder de lamp uit Apple Home, reset hem en voeg hem op het nieuwe
      wifinetwerk opnieuw toe. Wijzig niet alleen de wifi in de Govee-app, want
      dan gaat Matter uit.
author: editorial-team
heroImage: /images/featured/govee-apple-homekit.png
heroAlt: >-
  Govee HomeKit – Matter koppelen, bridges en tips voor als je verhuist –
  gids van RenterSmartHome
---

Je plakt een nieuwe Govee-ledstrip achter de tv, opent de Woning-app en hij staat er niet bij. **Of Govee met Apple HomeKit werkt, hangt af van het Matter-logo: Matter-modellen zoals de Govee LED Strip Light M1 voeg je aan Apple Home toe door een QR-code te scannen, zonder bridge.** Oudere Govee-apparaten krijgen geen Matter via een firmware-update, dus die hebben elk een bridge nodig: Homebridge, Home Assistant of een betaalde.

We schreven dit voor huurders, dus naast het koppelen behandelen we wat andere gidsen overslaan: routerinstellingen waar je misschien niet bij kunt, de IPv6-kwestie bij sommige Nederlandse providers, de wifiwijziging die Matter stilletjes uitschakelt, en wat er gebeurt als je verhuist.

## Werkt Govee met Apple HomeKit?

**Govee werkt met HomeKit via Matter, de merkoverstijgende smart home-standaard, en niet via een eigen HomeKit-koppeling.** Daardoor vallen alle Govee-lampen in twee groepen.

### Govee-apparaten met Matter: ja, zonder bridge

De [Matter-FAQ van Govee](https://us.govee.com/pages/matter-faq) noemt de LED Strip Light M1 als zijn Matter-ledstrip. AddToHomeKit noemt in zijn [Govee HomeKit-gids](https://www.addtohomekit.com/blog/govee-homekit/) daarnaast de Govee Floor Lamp 3, de Govee Smart Plug Pro, de Strip Light 2 Pro en verschillende lampen en plafondlampen als Matter-apparaten. Govee-Matter werkt alleen via wifi; geen enkel Govee-product gebruikt Thread, dus alles staat of valt met hoe betrouwbaar je wifi is.

### Oudere Govee-apparaten: alleen via een bridge

Oudere Govee-modellen krijgen volgens Govee en AddToHomeKit geen Matter via een firmware-update, omdat de hardware dat niet toelaat. Die hebben een bridge nodig (die vergelijken we hieronder).

### Govee HomeKit-check: welke heb jij?

Kijk voordat je koopt of het Matter-logo op de doos staat en of je het M1-modelnummer ziet (H61E0 of H61E1). Dat is belangrijk, want de verwarring hierover komt steeds terug in r/HomeKit, waar eigenaren vragen of "Matter" op een doos betekent dat het apparaat gegarandeerd in Apple Home werkt. Eén antwoord zegt het kort: "The challenge is that Matter is evolving quickly." Onze vuistregel: vertrouw op het logo van het specifieke model, niet op het merk.

Woon je in Nederland of België, let dan ook op de stekker. In de EU-winkel van Govee staat de M1 als model H61E0 (2 m) met een EU 2-pin lader en Matter (werkt met HomeKit, Alexa en Google). Een EU-versie van de 5 meter lange H61E1 hebben we niet kunnen bevestigen. Zoek dus gericht op de H61E0 met EU-stekker en niet op de Amerikaanse uitvoering.

### Voorbeeld van een Matter-ledstrip: de Govee LED Strip Light M1

De Govee LED Strip Light M1 past bij een huurder die een ledstrip in de slaapkamer of achter de tv met Siri en de Woning-app wil bedienen, zonder bridge en zonder vaste bedrading. Kies de EU-versie H61E0 met EU 2-pin lader: die gaat gewoon in het stopcontact, de strip plakt vast, en je kunt dezelfde strip ook met Alexa of Google Home delen. Reken in Apple Home alleen op de basisfuncties, en houd er rekening mee dat de strip volgens Govee niet korter dan 3 meter kan worden geknipt; bedenk dus vooraf waar je de extra lengte oprolt. De ervaringen van eigenaren zijn wisselend: een lid van een Govee-Facebookgroep was "more than impressed" nadat hij een gewone kastverlichting door de M1 had vervangen, terwijl de strip van een eigenaar op r/HomeKit wel als geschikt verscheen, maar nooit klaar was met verbinden. Volgens een reactie op r/Govee loste de QR-code op het snoer een vergelijkbaar koppelprobleem op.

## Govee toevoegen aan Apple Home in 5 stappen

**Een Govee-lamp koppel je in vijf stappen aan Apple Home: lamp aanzetten, Woning-app openen, de Matter-QR-code scannen en binnen 15 minuten afronden.** De stappen volgen de FAQ van Govee en de [beginnersgids in de Govee-community](https://community.govee.com/posts/how-to-pair-matter-to-apple-home-for-beginners/261671).

Loop voordat je begint deze lijst na:

- Je telefoon zit op de 2,4 GHz-band van je wifi en bluetooth staat aan.
- IPv6 staat aan op de router (volgens de community-gids heeft Govee-Matter dat nodig). Hoe dat bij Nederlandse providers zit, lees je verderop.
- Je hebt 15 minuten vanaf het inschakelen; daarna sluit het koppelvenster.
- Voor bediening op afstand en automatiseringen heb je een Apple-woninghub nodig (HomePod mini/Apple TV 4K of een andere HomePod of Apple TV).

Daarna:

1. Steek de lamp in het stopcontact en laat hem aanstaan.
2. Tik in de Woning-app van Apple op Voeg accessoire toe.
3. Scan de Matter-QR-code. Bij de M1 zit die op het stroomsnoer; is dat label weg, dan toont de Govee Home-app de Matter-installatiecode.
4. Geef de lamp een naam en kies een kamer.
5. Controleer met Siri of alles werkt en maak daarna scènes of automatiseringen op je hub.

## Govee in Apple Home – wat er in de Govee-app blijft

**Govee-lampen in Apple Home krijgen aan/uit, helderheid, kleur en kleurtemperatuur; muzieksync, DreamView, segmentbediening en DIY-effecten blijven in de Govee Home-app.** Wij zouden allebei de apps installeren.

Het addertje dat niemand vooraan zet: volgens de FAQ van Govee gaat Matter uit als je het wifinetwerk van de lamp vanuit de Govee-app wijzigt. De community-gids voegt toe dat opnieuw Setup Wi-Fi doorlopen (wat sommige eigenaren doen om DreamView terug te krijgen) hetzelfde effect heeft. In beide gevallen verdwijnt de lamp uit Apple Home en moet je hem resetten en opnieuw toevoegen.

De veilige volgorde als je router of mesh-systeem verandert:

1. Verwijder de lamp uit de Woning-app van Apple.
2. Reset de lamp.
3. Koppel hem opnieuw via Apple Home op het nieuwe netwerk, binnen 15 minuten na het inschakelen.
4. Stel pas daarna de functies in de Govee-app in die je wilt gebruiken.

## Govee HomeKit-bridges voor oudere lampen vergeleken

**Elke oudere Govee-lamp heeft een bridge nodig; het gratis alternatief is een Matter-model, en anders weeg je een gratis bridge op een computer die altijd aanstaat af tegen een betaalde.** Homebridge is gratis bridgesoftware die apparaten zonder Matter aan Apple Home doorgeeft; Home Assistant doet hetzelfde via Govee LAN-bediening en zijn HomeKit Bridge.

De tabel vergelijkt elke route op wat je als huurder zelf moet draaien:

| Route | Kosten | Hardware | Moeite | Geschikt voor een huurwoning |
|---|---|---|---|---|
| Matter-model | Gratis | Niets behalve de lamp | Laag | Beste keuze: niets te onderhouden |
| Homebridge (Govee-plug-in) | Gratis software | Raspberry Pi of computer die 24/7 aanstaat | Gemiddeld | Prima als je een Pi laat draaien |
| Home Assistant | Gratis software | Server die altijd aanstaat | Hoog | Voor wie het al gebruikt |
| AddToHomeKit / ATH Bridge | Betaald | Gehost, of een plug-and-play-kastje | Laag | Makkelijk, maar terugkerende kosten |

AddToHomeKit noemt ook Siri-opdrachten via Tap-to-Run van Govee als noodoplossing zonder bridge. Twee reacties in de Govee-community onder de beginnersgids zijn het overwegen waard. De ene (van HIWATT) wijst erop dat community-plug-ins voor Homebridge na updates kunnen breken; de andere (van sendo427) ging terug naar Homebridge, omdat Matter via wifi na netwerkwijzigingen kieskeurig was. Geen van beide routes is onderhoudsvrij. Kan je provider geen IPv6 leveren (zie hieronder), dan is een bridge uit deze tabel de route die overblijft.

## Govee in je huurwoning – zonder boren en zonder gedoe met je borg

**Een Govee-Matter-opstelling in Apple Home is het veiligst voor je borg met stekkerlampen en de Smart Plug Pro, die niets op de muur achterlaten; plakstrips zijn het risico.**

### Kies waar het kan voor een stekker in plaats van plakstrips

De angst dat de verhuurder iets van de borg inhoudt voor muurschade (lijmresten, gaatjes, losgetrokken verf) is onder huurders groot. Volgens de Rijksoverheid moet de verhuurder de waarborgsom binnen 14 dagen na het einde van de huur terugbetalen, maar je moet de woning wel achterlaten zoals afgesproken, en de verhuurder verrekent soms schade. Dit is algemene informatie, geen juridisch advies. Op een Belgisch forum schrijft iemand over gaatjes in de muur: "De gaten indien mooi opgevuld is gebruiksschade en daarvan kan een verhuurder zelfs geen schadevergoeding voor vragen." Dat is de mening van één forumgebruiker, geen regel, maar het laat zien hoe vaak dit speelt. Ook op r/juridischadvies gaan draadjes over borg en schade, zoals dat van een huurder die schrijft: "Ik ga binnenkort mijn huurcontract opozeggen en had afgelopen maand ter voorbereiding een reparatieverzoek gedaan voor schade aan mijn linoleum vloer."

Een Floor Lamp 3 of een lamp op een Smart Plug Pro (beide volgens AddToHomeKit Matter-apparaten) laat geen sporen na. In onze gids met [Matter slimme stekkers](/nl/blog/beste-matter-slimme-stekkers/) lees je hoe een stekker van elke lamp een lamp voor Apple Home maakt. Maak hoe dan ook foto's van de muren als je erin trekt en als je vertrekt.

### Als je toch een ledstrip gebruikt

Bij het verwijderen helpt het om de plaklaag eerst te behandelen met een lijmoplosser of alcohol voordat je trekt. Het omgekeerde probleem, strips die binnen een paar dagen loslaten, komt ook vaak voor in groepen van huurders en ouders, waar iemand waarschuwt: "the adhesive backing may not be sufficient." De oplossing zijn clips, profielen of beter hechtende verwijderbare tape. In onze gids over [ledstrips in je huurwoning](/nl/blog/ledstrip-huurwoning/) vergelijken we manieren om ze op te hangen.

> **Uit onze notities:** Toen we de Matter-FAQ van Govee naast de beginnersgids uit de community legden, was het niet de uitleg over koppelen die ons bijbleef. Het was de waarschuwing dat wifi wijzigen in de Govee-app Matter uitzet. Stel je een huurder voor die verhuist, de strip via de Govee-app op de nieuwe router zet en hem uit Apple Home ziet verdwijnen. Geen van de belangrijkste gidsen die we vergeleken, legt dat verband met de verhuisdag, en daarom staat de volgorde "eerst resetten" in dit artikel.

### Wiens Apple ID heeft de hub, en wat doe je bij verhuizen

Huurders vragen hier vaak naar op r/HomeKit; een draadje over een huurwoning begint met "One of the first decisions is regarding HomeKit hub and the Apple ID." De hub hoort bij één Apple ID, dus met huisgenoten zouden we hem koppelen aan degene die het langst blijft wonen. Matter-lampen hebben geen extra hub nodig, en dat past bij het advies in een draadje over een eerste appartement: "I'd stay away from anything that needs a unique hub". Verwijder bij het verhuizen elke lamp uit Apple Home, reset hem en voeg hem in je nieuwe woning opnieuw toe.

### Router en IPv6 – als je provider of verhuurder het netwerk regelt

Govee-Matter heeft IPv6 nodig, en in Nederland is dat niet bij elke provider vanzelfsprekend. De onafhankelijke site heeftodidoipv6.nl meldt dat Odido geen IPv6 aanbiedt aan klanten in Nederland. Op Tweakers schreef iemand: "Alle grote ISPs (Ziggo, KPN, Delta) ondersteunen het wel met uitzondering van Odido." Dat topic is oud en ook zo'n onafhankelijke site kan achterlopen, dus controleer de actuele IPv6-status altijd zelf bij je provider. Levert je aansluiting geen IPv6, dan is de Matter-route niet haalbaar en is een bridge zoals Homebridge de logische uitweg.

Regelt de verhuurder de wifi in het gebouw, dan kun je IPv6 misschien niet zelf aanzetten. Vraag het de verhuurder of de provider in één zin: "Kan IPv6 aangezet worden op het netwerk van mijn woning, voor een slimme lamp?" Lukt dat niet, dan is een eigen router de schoonste oplossing.

## Problemen met Govee en Apple HomeKit, en hoe je ze oplost

**De meeste problemen met Govee in HomeKit komen neer op het netwerk, een code die al in gebruik is, of een lichtschakelaar.**

### Koppelen lukt niet

Een Matter-koppeling die urenlang mislukt, is een terugkerende klacht in draadjes op r/homeassistant en r/alexa, zoals deze poging van drie dagen. Veel daarvan gaan over Thread-border-routers, en die spelen bij Govee geen rol. Controleer IPv6 (en of je provider het levert), 2,4 GHz en het venster van 15 minuten, herstart dan eerst de router en daarna de lamp, en koppel opnieuw.

### Al ergens anders gekoppeld

Wil je de lamp ook aan Alexa of Google toevoegen, gebruik dan multi-admin (Matter-delen): maak een nieuwe installatiecode van 11 cijfers aan in plaats van de oorspronkelijke QR-code opnieuw te scannen.

### Reageert niet meer na een wifiwijziging

Volg de volgorde hierboven: verwijderen, resetten, opnieuw toevoegen.

### Lichtschakelaar uit, bediening weg

Huisgenoten die de schakelaar omzetten, is de klassieke fout in een gedeelde huurwoning: "when you flip the wall switch, all power is stopped so the smart bulb becomes totally dead." Laat die schakelaar aan staan en plak er een afdekkapje over. In onze gids met [slimme lampen voor huurders](/nl/blog/beste-slimme-lampen-voor-huurders/) staan meer oplossingen voor de lichtschakelaar, en onze [smart home-gids voor huurders](/nl/blog/smart-home-huurwoning/) laat zien wat je daarna kunt toevoegen.
