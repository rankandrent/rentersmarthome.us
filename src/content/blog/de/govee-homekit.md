---
title: 'Govee HomeKit – Matter einrichten, Bridges und Tipps für den Umzug'
seoTitle: Govee HomeKit (2026) – Matter-Einrichtung für Mieter
description: >-
  Govee HomeKit klappt ohne Bridge nur mit Matter-Logo; ältere Modelle brauchen
  Homebridge oder eine Bridge. Einrichtung, IPv6-Tipps und was Mieter wissen müssen.
pubDate: '2026-10-20T19:35:00.000Z'
lang: de
translationOf: govee-apple-homekit
category: lighting
keyword: govee homekit
secondaryKeywords:
  - govee apple home
  - govee mit homekit verbinden
  - govee matter homekit
  - funktioniert govee mit apple home
  - govee led strip homekit
  - govee in apple home hinzufügen
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
  - led strips
  - mieter-tipps
articleType: how-to
funnel: mofu
productStyle: specs
productCount: 1
readingTime: 7
tldr:
  - >-
    Ja, bei neueren Modellen: Govee-Leuchten mit Matter-Logo wie der LED Strip
    Light M1 landen per Matter-QR-Code in Apple Home, ganz ohne Bridge.
  - >-
    Ältere Govee-Leuchten bekommen Matter nicht per Firmware-Update; sie
    brauchen Homebridge, Home Assistant oder eine kostenpflichtige Bridge.
  - >-
    In Apple Home kommen nur Ein/Aus, Helligkeit, Farbe und Farbtemperatur an;
    Musik-Sync, Segmente und DreamView bleiben in der Govee-Home-App.
  - >-
    Für Mieter: Die Kopplung braucht IPv6 und 2,4-GHz-WLAN, und ein WLAN-Wechsel
    in der Govee-App schaltet Matter ab. Nach jedem Umzug also zurücksetzen und
    neu hinzufügen.
products:
  - name: Govee LED Strip Light M1 (H61E0 6.56ft / H61E1 16.4ft)
    brand: Govee
    query: Govee LED Strip Light M1 Matter
    matchName: Govee LED Strip Light M1
    badge: Govees erster Matter-LED-Strip
    summary: >-
      Ein RGBIC-Strip zum Einstecken mit Klebeband auf der Rückseite und einer
      Steuerbox. Govees Matter-FAQ nennt den M1 als Matter-fähigen Strip, er
      lässt sich also per Matter-QR-Code ohne Bridge in Apple Home einbinden.
      Matter läuft über WLAN und gibt Ein/Aus, Helligkeit, Farbtemperatur und
      Farbe an Apple Home weiter; Szenen, Musik-Sync und Segmentsteuerung
      bleiben in der Govee-Home-App. In Deutschland ist die EU-Version H61E0
      (2 m) mit EU-2-Pin-Netzteil die richtige Wahl, nicht die US-Version.
    renterNote: >-
      Für Mieter, die einen Strip im Schlafzimmer oder hinter dem Fernseher per
      Siri und Home-App steuern wollen, ohne Bridge und ohne Elektriker. Achte
      auf die EU-Version H61E0 (2 m) mit EU-2-Pin-Netzteil, die Govee im
      EU-Shop führt; ob es die 5-m-Variante H61E1 mit EU-Stecker gibt, war
      nicht bestätigt. Einschränkungen: Für Fernzugriff und Automationen braucht
      Apple Home eine Steuerzentrale (Apple TV oder HomePod), die
      Matter-Einrichtung muss innerhalb von 15 Minuten nach dem Einstecken
      abgeschlossen sein und braucht IPv6 und 2,4-GHz-WLAN, und ein WLAN-Wechsel
      in der Govee-App schaltet Matter ab. Ältere Govee-Strips ohne Matter
      brauchen eine Bridge; prüf vor dem Kauf das Matter-Logo und die
      M1-Modellnummer.
    pros:
      - >-
        Koppelt per Matter mit Apple Home über den QR-Code am Netzkabel oder in
        der Govee-App, keine Bridge nötig (Govee Matter-FAQ)
      - >-
        Strip und Steuerbox kleben, dazu ein Steckernetzteil: kein Verkabeln,
        kein Bohren
      - >-
        Dank Matter-Multi-Admin lässt sich derselbe Strip zusätzlich mit Alexa
        oder Google Home teilen
    cons:
      - >-
        In Apple Home kommen nur Ein/Aus, Helligkeit, Farbtemperatur und Farbe
        an; Musik-Sync, DIY-Effekte und Segmentsteuerung bleiben in der
        Govee-App
      - >-
        Matter nur über WLAN (kein Thread), und die Matter-Verbindung kann
        abbrechen, wenn das WLAN in der Govee-App gewechselt wird; manche
        Besitzer berichten von einer Kopplung, die nie fertig wird
      - >-
        Laut Govee lässt sich der Strip nicht kürzer als 3 m (9.8 ft)
        schneiden, überschüssige Länge muss also aufgerollt oder zurückgeführt
        werden
    specs:
      Models: 'H61E0: 2 m (6.56 ft); H61E1: 5 m (16.4 ft)'
      Matter: >-
        Matter über WLAN; Govees Matter-FAQ nennt M1 (2 m) und M1 (5 m, mit
        Matter-fähiger Steuerbox)
      Apple Home: Über Matter eingebunden; keine Angabe zu einer nativen HomeKit-Zertifizierung gefunden
      Install: >-
        Klebeband auf Strip und Steuerbox; Steckernetzteil (EU-Version H61E0 mit
        EU-2-Pin-Stecker)
      LEDs: '60 pro Meter, RGBIC mit weißem Licht'
      Expandable: >-
        2 m (6.56 ft) erweiterbar auf bis zu 5 m (16.4 ft); 5 m auf bis zu 10 m
        (32.8 ft) (Govee-Refurbished-Angebot)
    scores:
      install: 8
      reversibility: 7
      value: 7
      compatibility: 8
      portability: 7
    owners:
      read: 5
      praise:
        - >-
          Die Kopplung über den Matter-QR-Code am Netzkabel klappte bei einem
          Besitzer, der den Strip zuerst nicht in Apple Home bekam
        - >-
          Ein Besitzer, der einen No-Name-Strip unter dem Küchenschrank gegen den
          M1 getauscht hat, war vom Ergebnis mehr als beeindruckt
      complaints:
        - >-
          Die Kopplung kann hängen bleiben: Bei einem Besitzer auf r/HomeKit
          wurde der Strip als verfügbar angezeigt, verband sich aber nie
        - >-
          Apple Home setzt nur eine Farbe gleichzeitig, und mehr als eine
          Verlängerung machte bei einem Besitzer Probleme
      sources:
        - title: HomeKit connection issue (r/Govee)
          url: >-
            https://www.reddit.com/r/Govee/comments/18lvp88/homekit_connection_issue/
        - title: Govee M1 with Matter will not connect (r/HomeKit)
          url: >-
            https://www.reddit.com/r/HomeKit/comments/1i38ag0/govee_m1_with_matter_will_not_connect_other/
        - title: Govee Matter and Homekit support question (r/Govee)
          url: >-
            https://www.reddit.com/r/Govee/comments/147vslu/q_govee_matter_and_homekit_support/
        - title: LED strip M1 with matter 2nd extension issues (r/Govee)
          url: >-
            https://www.reddit.com/r/Govee/comments/1bgbq1k/led_strip_m1_with_matter_2nd_extension_issues/
        - title: Govee M1 strip light installation review (Govee Facebook group)
          url: 'https://www.facebook.com/groups/govee/posts/850373166599559/'
    scoreNote: >-
      Kleben und einstecken, ohne Verkabelung; der Kleber kann beim Abziehen
      trotzdem Farbe mitnehmen. Matter bringt Apple-Home-Steuerung ohne Bridge,
      aber nur die Grundfunktionen.
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
  - title: 'Govee LED Strip Light M1 (Matter, 2 m), EU-Shop (Govee)'
    url: >-
      https://eu.govee.com/products/refurbished-govee-led-strip-light-m1-matter-compatible-2m
  - title: Mietkaution Rückzahlung (R+V Versicherung)
    url: 'https://www.ruv.de/mietkaution/mietkaution-rueckzahlung'
  - title: Kaution (Mieterverein zu Hamburg)
    url: >-
      https://www.mieterverein-hamburg.de/ratgeber/vertraege-verpflichtungen/kaution/
  - title: IPv6 in FRITZ!Box einrichten (AVM Wissensdatenbank)
    url: >-
      https://avm.de/service/wissensdatenbank/dok/FRITZ-Box-7582-int/573_IPv6-in-FRITZ-Box-einrichten/
  - title: Vermieter will Schadensersatz für Tapete (r/wohnen)
    url: >-
      https://www.reddit.com/r/wohnen/comments/1shqgox/vermieter_will_800_schadensersatz_f%C3%BCr_nicht/
reviewedDate: '2026-10-20'
faqs:
  - q: Funktioniert Govee mit Apple HomeKit?
    a: >-
      Neuere Govee-Leuchten mit Matter-Logo wie der LED Strip Light M1 landen
      direkt in Apple Home, wenn du den Matter-QR-Code scannst. Ältere Modelle
      ohne Matter funktionieren nur über eine Bridge wie Homebridge, Home
      Assistant oder eine kostenpflichtige Bridge.
  - q: Welche Govee-Geräte unterstützen Matter?
    a: >-
      Govees Matter-FAQ nennt den LED Strip Light M1 (2 m, und 5 m mit
      Matter-fähiger Steuerbox). AddToHomeKit führt außerdem die Floor Lamp 3,
      den Smart Plug Pro und weitere auf. Achte auf das Matter-Logo auf der
      Verpackung; in Deutschland auf die EU-Version H61E0 mit EU-Stecker.
  - q: Warum lässt sich meine Govee-Leuchte nicht mit Apple Home koppeln?
    a: >-
      Prüf, ob IPv6 im Router aktiv ist, ob dein iPhone im 2,4-GHz-WLAN ist und
      Bluetooth an ist, und ob du innerhalb von 15 Minuten nach dem Einstecken
      fertig wirst. Klappt es dann noch nicht, starte erst den Router und dann
      die Leuchte neu und versuch es noch einmal.
  - q: Kann ich Govee gleichzeitig in Apple Home und Alexa nutzen?
    a: >-
      Ja, über Matter-Multi-Admin. Erzeuge für die Leuchte einen neuen
      11-stelligen Einrichtungscode und gib ihn in der zweiten App ein, statt
      den ursprünglichen QR-Code noch einmal zu verwenden.
  - q: Brauche ich einen HomePod oder ein Apple TV?
    a: >-
      Laut Govees FAQ ist ein Matter-Hub oder -Controller nötig, und in Apple
      Home heißt das ein HomePod oder Apple TV als Steuerzentrale, die du auch
      für Fernzugriff und Automationen brauchst. Die Steuerzentrale gehört zu
      der Apple-ID, die das Zuhause eingerichtet hat.
  - q: Was passiert mit meinem Govee-Setup, wenn ich umziehe?
    a: >-
      Entferne die Leuchte aus Apple Home, setz sie zurück und füge sie im neuen
      WLAN wieder hinzu. Wechsle das WLAN nicht einfach in der Govee-App, denn
      das schaltet Matter ab.
author: editorial-team
heroImage: /images/featured/govee-apple-homekit.png
heroAlt: >-
  Govee HomeKit – Matter einrichten, Bridges und Tipps für den Umzug –
  RenterSmartHome-Ratgeber
---

Du klebst einen neuen Govee-Strip hinter den Fernseher, öffnest die Home-App, und er taucht nicht auf. **Ob Govee mit HomeKit funktioniert, hängt am Matter-Logo: Matter-Modelle wie der Govee LED Strip Light M1 landen per QR-Code in Apple Home, ganz ohne Bridge.** Ältere Govee-Geräte bekommen Matter nicht per Firmware-Update, deshalb braucht jedes davon eine Bridge: Homebridge, Home Assistant oder eine kostenpflichtige Lösung.

Wir haben diesen Ratgeber für Mieter geschrieben. Deshalb geht es bei uns nicht nur um die Einrichtung, sondern auch um das, was andere Anleitungen auslassen: Router-Einstellungen, auf die du vielleicht keinen Zugriff hast, den WLAN-Wechsel, der Matter stillschweigend abschaltet, und was beim Umzug passiert. Und weil es in Deutschland beim Auszug fast immer um die Kaution geht, sagen wir auch, was dazu allgemein gilt.

## Funktioniert Govee mit Apple HomeKit?

**Govee kommt über Matter, den markenübergreifenden Smart-Home-Standard, in Apple Home, nicht über native HomeKit-Unterstützung.** Damit zerfallen alle Govee-Leuchten in zwei Gruppen.

### Govee-Geräte mit Matter: ja, ohne Bridge

Govees [Matter-FAQ](https://us.govee.com/pages/matter-faq) nennt den LED Strip Light M1 als seinen Matter-Strip. AddToHomeKit führt in seinem [Govee-HomeKit-Ratgeber](https://www.addtohomekit.com/blog/govee-homekit/) außerdem die Govee Floor Lamp 3, den Govee Smart Plug Pro, den Strip Light 2 Pro sowie mehrere Lampen und Deckenleuchten als Matter-fähig. Govee-Matter läuft ausschließlich über WLAN; kein Govee-Produkt nutzt Thread. Wie zuverlässig dein WLAN ist, entscheidet also über alles.

### Ältere Govee-Geräte: nur über eine Bridge

Ältere Govee-Modelle können Matter laut Govee und AddToHomeKit wegen Hardware-Grenzen nicht per Firmware-Update nachrüsten. Sie brauchen eine Bridge (Vergleich weiter unten).

### Govee-HomeKit-Check: Was hast du zu Hause?

Achte vor dem Kauf auf das Matter-Logo auf der Verpackung und auf die M1-Modellnummer (H61E0 oder H61E1). Das ist wichtig, weil genau hier immer wieder Verwirrung herrscht: In r/HomeKit fragen Besitzer regelmäßig, ob „Matter“ auf der Packung automatisch Apple-Home-Unterstützung bedeutet. Eine Antwort bringt es auf den Punkt: Matter entwickle sich schnell weiter, und genau das sei das Problem ([Thread auf r/HomeKit](https://www.reddit.com/r/HomeKit/comments/1l0soq3/does_matter_automatically_mean_a_device_will_work/)). Unsere Faustregel: Vertrau dem Logo auf dem konkreten Modell, nicht der Marke.

Für Deutschland kommt ein zweiter Check dazu: Govee führt den M1 im [EU-Shop](https://eu.govee.com/products/refurbished-govee-led-strip-light-m1-matter-compatible-2m) als H61E0 (2 m) mit EU-2-Pin-Netzteil und Matter-Kompatibilität (HomeKit, Alexa, Google); das dort gelistete Exemplar ist generalüberholt. Such also nach dieser EU-Version, nicht nach dem US-Modell mit US-Stecker. Ob es die 5-m-Variante H61E1 auch mit EU-Stecker gibt, konnten wir nicht bestätigen.

### Govee LED Strip Light M1: der Matter-Strip, den beide Hauptquellen nennen

Der [Govee LED Strip Light M1](amzn:Govee+LED+Strip+Light+M1+Matter) passt zu Mietern, die einen Strip im Schlafzimmer oder an der TV-Wand per Siri und Home-App steuern wollen, ohne Bridge und ohne festen Anschluss. Achte auf die EU-Version H61E0 mit EU-2-Pin-Netzteil. Der Strip kommt in die Steckdose und wird aufgeklebt, und derselbe Strip lässt sich zusätzlich mit Alexa oder Google Home teilen. In Apple Home gibt es nur die Grundfunktionen, und laut Govee lässt er sich nicht kürzer als 3 m (9.8 ft) schneiden. Plan also ein, wo die überschüssige Länge hinkommt. Die Stimmen von Besitzern sind gemischt: Ein Mitglied der Govee-Facebook-Gruppe war „mehr als beeindruckt“, nachdem es einen No-Name-Strip unter dem Küchenschrank gegen den M1 getauscht hatte, während bei einem Besitzer auf r/HomeKit der Strip zwar als verfügbar angezeigt wurde, die Verbindung aber nie zustande kam. Eine Antwort auf r/Govee sagt, dass der QR-Code am Netzkabel ein ähnliches Kopplungsproblem gelöst hat.

## Govee in Apple Home hinzufügen – in 5 Schritten

**Die Govee-Kopplung mit Apple Home dauert fünf Schritte: Leuchte einstecken, Home-App öffnen, Matter-QR-Code scannen und innerhalb von 15 Minuten fertig werden.** Die Schritte folgen Govees FAQ und der [Einsteiger-Anleitung aus der Govee-Community](https://community.govee.com/posts/how-to-pair-matter-to-apple-home-for-beginners/261671).

Bevor du loslegst, geh diese Liste durch:

- Dein iPhone ist im 2,4-GHz-WLAN, Bluetooth ist an.
- IPv6 ist im Router aktiviert (laut Community-Anleitung braucht die Govee-Matter-Kopplung das).
- Du hast ab dem Einstecken 15 Minuten Zeit; danach schließt sich das Kopplungsfenster.
- Für Fernzugriff und Automationen eine Apple-Steuerzentrale (HomePod mini/Apple TV 4K oder ein anderer HomePod bzw. ein anderes Apple TV).

Wer eine FRITZ!Box hat, findet IPv6 laut [AVM-Wissensdatenbank](https://avm.de/service/wissensdatenbank/dok/FRITZ-Box-7582-int/573_IPv6-in-FRITZ-Box-einrichten/) unter Heimnetz > Netzwerk > Netzwerkeinstellungen. Ist der Router vom Anbieter gestellt oder hängst du im Hausnetz des Vermieters, brauchst du dafür unter Umständen dessen Zustimmung.

Dann:

1. Steck die Leuchte ein und lass sie am Strom.
2. Tipp in der Apple-Home-App auf „Gerät hinzufügen“.
3. Scann den Matter-QR-Code. Beim M1 klebt er am Netzkabel; fehlt das Etikett, zeigt die Govee-Home-App den Matter-Einrichtungscode an.
4. Gib der Leuchte einen Namen und weise ihr einen Raum zu.
5. Prüf sie mit Siri und richte danach Szenen oder Automationen auf deiner Steuerzentrale ein.

## Govee in Apple Home – was in der Govee-App bleibt

**Govee-Leuchten bekommen in Apple Home Ein/Aus, Helligkeit, Farbe und Farbtemperatur; Musik-Sync, DreamView, Segmentsteuerung und DIY-Effekte bleiben in der Govee-Home-App.** Wir würden beide Apps installiert lassen.

Der Haken, den kaum jemand vorne erwähnt: Laut Govees FAQ schaltet ein WLAN-Wechsel der Leuchte über die Govee-App Matter ab. Die Community-Anleitung ergänzt, dass ein erneutes „Setup Wi-Fi“ (manche Besitzer machen das, um DreamView zurückzubekommen) denselben Effekt hat. So oder so verschwindet die Leuchte aus Apple Home und muss zurückgesetzt und neu hinzugefügt werden.

Die sichere Reihenfolge, wenn sich dein Router oder dein Mesh-System ändert:

1. Entferne die Leuchte aus der Apple-Home-App.
2. Setz die Leuchte zurück.
3. Kopple sie über Apple Home im neuen Netzwerk neu, innerhalb von 15 Minuten nach dem Einstecken.
4. Richte erst danach die Funktionen in der Govee-App ein, die du willst.

## Govee-HomeKit-Bridges für ältere Leuchten im Vergleich

**Jede ältere Govee-Leuchte braucht eine Bridge; die Alternative ohne Zusatzkosten ist ein Matter-Modell, ansonsten wägst du eine kostenlose Bridge auf einem Dauerläufer-Rechner gegen eine kostenpflichtige ab.** Homebridge ist kostenlose Bridge-Software, die Geräte ohne Matter in Apple Home sichtbar macht; Home Assistant erledigt das über die Govee-LAN-Steuerung und seine HomeKit Bridge.

Die Tabelle vergleicht die Wege danach, was du als Mieter dauerhaft betreiben musst:

| Weg | Kosten | Hardware | Aufwand | Passt zur Mietwohnung |
|---|---|---|---|---|
| Matter-Modell | Keine Zusatzkosten | Nur die Leuchte | Gering | Am besten: nichts zu warten |
| Homebridge (Govee-Plugin) | Kostenlose Software | Raspberry Pi oder Rechner rund um die Uhr an | Mittel | Gut, wenn ein Pi ohnehin läuft |
| Home Assistant | Kostenlose Software | Server, der immer läuft | Hoch | Für alle, die es schon nutzen |
| AddToHomeKit / ATH Bridge | Kostenpflichtig | Gehostet oder Plug-and-Play-Box | Gering | Einfach, aber laufende Kosten |

AddToHomeKit nennt außerdem Siri-Kurzbefehle über Govees Tap-to-Run als Notlösung ohne Bridge. Zwei Kommentare unter der Einsteiger-Anleitung der Govee-Community sind es wert, bedacht zu werden. Einer (von HIWATT) weist darauf hin, dass Homebridge-Plugins aus der Community nach Updates kaputtgehen können; ein anderer (von sendo427) ist zu Homebridge zurückgekehrt, weil Matter über WLAN nach Netzwerkänderungen zickig war. Wartungsfrei ist keiner der Wege.

## Govee in der Mietwohnung – ohne Bohren und ohne Ärger mit der Kaution

**Govee-Matter-Setups mit Apple Home sind für die Kaution am unkritischsten mit Stecker-Lampen und dem Smart Plug Pro, die nichts an der Wand hinterlassen; Klebe-Strips sind das Risiko.**

### Lieber einstecken als kleben

Dass der Kleber von LED-Strips beim Abziehen Farbe oder Tapete mitnimmt, ist eine typische Sorge. Wie schnell daraus Streit wird, zeigt ein Beitrag auf r/wohnen: [„Dafür will mein Vermieter jetzt einen Fachbetrieb ranholen, um neue Tapeten anbringen zu lassen … und komplett von meiner Kaution abziehen.“](https://www.reddit.com/r/wohnen/comments/1shqgox/vermieter_will_800_schadensersatz_f%C3%BCr_nicht/) Eine Floor Lamp 3 oder eine Lampe an einem Smart Plug Pro (beide laut AddToHomeKit Matter-fähig) umgeht das Problem. Unser Ratgeber zu [Matter-Steckdosen für die Wohnung](/de/blog/beste-matter-steckdosen/) erklärt, wie eine Steckdose jede Lampe fit für Apple Home macht.

### Wenn du doch einen Strip nimmst

Für den Auszug rät ein Besitzer auf [r/HomeMaintenance](https://www.reddit.com/r/HomeMaintenance/comments/13sj00r/my_led_lights_ripped_off_the_paint_around_the/), das Klebeband vor dem Abziehen mit einem Kleberentferner oder Isopropanol (Reinigungsalkohol) zu behandeln. Fotografier außerdem die Wand vor dem Ankleben und vor dem Abnehmen, damit du den Zustand belegen kannst. Das umgekehrte Problem, Strips, die nach ein paar Tagen herunterfallen, taucht in Mieter- und Elterngruppen auf; eine Antwort warnt dort, dass der Klebestreifen auf der Rückseite womöglich [nicht ausreicht](https://www.facebook.com/groups/1841247825900748/posts/28748695164729316/). Abhilfe schaffen Clips, Profile oder stärker haftendes, wieder ablösbares Klebeband. Unser Ratgeber zu [LED Strips für die Mietwohnung](/de/blog/led-strip-mietwohnung/) vergleicht die Befestigungsmöglichkeiten.

### Was zur Kaution allgemein gilt

Wir sind keine Juristen, das hier ist allgemeine Information und keine Rechtsberatung. Die [R+V Versicherung](https://www.ruv.de/mietkaution/mietkaution-rueckzahlung) beschreibt als gängige Praxis, dass Vermieter in der Regel 3 bis 6 Monate nach dem Auszug Zeit haben, die Kaution abzurechnen; einbehalten dürfen sie nur berechtigte Forderungen, etwa für Schäden über die normale Abnutzung hinaus, und die Beweislast liege beim Vermieter. Der [Mieterverein Hamburg](https://www.mieterverein-hamburg.de/ratgeber/vertraege-verpflichtungen/kaution/) widerspricht der pauschalen 3-bis-6-Monats-Frist: Nach Mietende müsse die Kaution „alsbald“ zurückgezahlt werden, und einbehalten werden dürfe nur in Höhe tatsächlicher Forderungen. Wenn es konkret Streit gibt, frag beim örtlichen Mieterverein nach.

> **Aus unseren Notizen:** Als wir Govees Matter-FAQ neben die Einsteiger-Anleitung aus der Community gelegt haben, hat uns nicht die Kopplung stutzig gemacht. Es war die Warnung, dass ein WLAN-Wechsel in der Govee-App Matter abschaltet. Stell dir vor, du ziehst um, meldest den Strip in der Govee-App am neuen Router an und siehst zu, wie er aus Apple Home verschwindet. Keine der großen Anleitungen, die wir verglichen haben, bringt das mit dem Umzugstag in Verbindung, und genau deshalb steht in unserem Ratgeber die Reihenfolge „erst zurücksetzen“.

### Wem gehört die Steuerzentrale, und was passiert beim Auszug?

Mieter fragen das oft in r/HomeKit; ein Thread zur Mietwohnung beginnt sinngemäß damit, dass eine der ersten Entscheidungen die [Steuerzentrale und die Apple-ID](https://www.reddit.com/r/HomeKit/comments/n51voa/homekit_in_a_rental_property/) betrifft. Die Steuerzentrale hängt an einer Apple-ID. In einer WG würden wir sie deshalb auf die Person laufen lassen, die am längsten bleibt. Matter-Leuchten brauchen keinen zusätzlichen Hub, und das passt zum Rat aus einem [Thread zur ersten eigenen Wohnung](https://www.reddit.com/r/HomeKit/comments/zzyc45/first_apartment_homekit_recommendations/), lieber die Finger von allem zu lassen, was einen eigenen Hub braucht. Beim Auszug entfernst du jede Leuchte aus Apple Home, setzt sie zurück und fügst sie in der neuen Wohnung wieder hinzu.

### Router und IPv6, wenn der Vermieter das Netz verwaltet

Wird das WLAN im Haus vom Vermieter verwaltet, kannst du IPv6 womöglich nicht selbst einschalten. Frag den Vermieter oder den Anbieter mit einem Satz: „Kann für das Netz meiner Wohnung IPv6 aktiviert werden? Ich brauche es für eine smarte Leuchte.“ Wenn nicht, ist ein eigener Router die sauberere Lösung; bei einer FRITZ!Box hilft dann der AVM-Pfad von oben.

## Govee-HomeKit-Probleme, die Besitzer haben, und die Lösung

**Die meisten Govee-HomeKit-Probleme liegen am Netzwerk, an einem bereits verwendeten Code oder am Lichtschalter.**

### Kopplung klappt nicht

Matter-Kopplungen, die stundenlang scheitern, sind eine wiederkehrende Klage in Threads auf r/homeassistant und r/alexa, etwa [dieser Versuch über drei Tage](https://www.reddit.com/r/homeassistant/comments/1rgodgx/ive_been_trying_to_pair_matter_devices_for_3_days/). Viele davon drehen sich um Thread-Border-Router, die bei Govee keine Rolle spielen. Prüf IPv6, 2,4 GHz und das 15-Minuten-Fenster, starte dann zuerst den Router und danach die Leuchte neu und kopple noch einmal.

### Schon woanders gekoppelt

Wenn die Leuchte zusätzlich in Alexa oder Google soll, nutz Multi-Admin (Matter-Freigabe): Erzeuge einen neuen 11-stelligen Einrichtungscode, statt den ursprünglichen QR-Code erneut zu scannen.

### Reagiert nach einem WLAN-Wechsel nicht mehr

Halte dich an die Reihenfolge von oben: entfernen, zurücksetzen, neu hinzufügen.

### Lichtschalter aus, Steuerung weg

Mitbewohner, die den Schalter umlegen, sind der Klassiker in der WG: Wer den Wandschalter ausschaltet, nimmt der smarten Leuchte den Strom komplett, und sie ist [tot für die App](https://doitforme.solutions/blog/are-your-smart-bulbs-making-your-smart-home-dumb/). Lass den Schalter an und klebe eine Abdeckung darüber. Unser Ratgeber zu [smarten Glühbirnen für Mieter](/de/blog/smarte-gluehbirnen-fuer-mieter/) zeigt weitere Lösungen für den Lichtschalter, und unser [Smart Home für Mieter ohne Bohren](/de/blog/smart-home-fuer-mieter/) zeigt, was du als Nächstes ergänzen kannst.
