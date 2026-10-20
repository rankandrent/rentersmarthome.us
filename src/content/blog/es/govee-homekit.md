---
title: 'Govee HomeKit – cómo añadir tus luces a Apple Home con Matter'
seoTitle: Govee HomeKit (2026) – guía de Matter para Apple Home
description: >-
  Las luces Govee con logo Matter entran en Apple Home sin puente; las antiguas
  necesitan Homebridge o un puente de pago. Pasos, IPv6 y consejos al mudarte.
pubDate: '2026-10-20T19:30:00.000Z'
lang: es
translationOf: govee-apple-homekit
category: lighting
keyword: govee homekit
secondaryKeywords:
  - govee funciona con homekit
  - govee apple home
  - tiras led govee homekit
  - como añadir govee a apple home
  - govee matter apple home
  - govee m1 matter
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
  - tiras led
  - pisos de alquiler
articleType: how-to
funnel: mofu
productStyle: specs
readingTime: 7
tldr:
  - >-
    Sí en los modelos nuevos: las luces Govee con el logo Matter, como la LED
    Strip Light M1, se añaden a Apple Home escaneando el código QR de Matter,
    sin puente.
  - >-
    Las luces Govee antiguas no pueden recibir Matter por firmware, así que
    necesitan Homebridge, Home Assistant o un puente de pago.
  - >-
    A Apple Home solo llegan encendido/apagado, brillo, color y temperatura de
    color; la sincronización con música, los segmentos y DreamView se quedan en
    la app Govee Home.
  - >-
    En España, elige la M1 H61E0 con cargador de enchufe europeo de 2 patillas;
    para emparejarla hacen falta IPv6 y Wi-Fi de 2,4 GHz, y cambiar el Wi-Fi
    desde la app de Govee desactiva Matter, así que restablécela tras cada
    mudanza.
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
  - title: 'Govee LED Strip Light M1 (Matter, 2 m), tienda Govee EU'
    url: >-
      https://eu.govee.com/products/refurbished-govee-led-strip-light-m1-matter-compatible-2m
  - title: 'Ley 29/1994 de Arrendamientos Urbanos, art. 36 (BOE)'
    url: 'https://www.boe.es/buscar/act.php?id=BOE-A-1994-26003'
  - title: Cómo configurar IPv6 en el router (TP-Link)
    url: 'https://www.tp-link.com/uy/support/faq/1525/'
  - title: Casero no me devuelve la fianza por tener que pintar (r/ESLegal)
    url: >-
      https://www.reddit.com/r/ESLegal/comments/1sfnmv7/casero_no_me_devuelve_fianza_por_tener_que_pintar/
  - title: Cobro de pintura tras terminar el alquiler (r/ESLegal)
    url: >-
      https://www.reddit.com/r/ESLegal/comments/1nhisum/cobro_de_900_euros_en_pintura_tras_terminar/
reviewedDate: '2026-10-20'
faqs:
  - q: ¿Govee funciona con Apple HomeKit?
    a: >-
      Las luces Govee más nuevas con el logo Matter, como la LED Strip Light M1,
      se añaden directamente a Apple Home escaneando el código QR de Matter. Los
      modelos antiguos sin Matter solo funcionan a través de un puente como
      Homebridge, Home Assistant o uno de pago.
  - q: ¿Qué dispositivos Govee son compatibles con Matter?
    a: >-
      La FAQ de Matter de Govee cita la LED Strip Light M1 (2 m, y 5 m con caja
      de control compatible con Matter). AddToHomeKit añade la Floor Lamp 3, el
      Smart Plug Pro y otros. Busca el logo Matter en la caja.
  - q: ¿Por qué mi luz Govee no se empareja con Apple Home?
    a: >-
      Comprueba que IPv6 esté activado en el router, que el móvil esté en el
      Wi-Fi de 2,4 GHz con el Bluetooth encendido y que termines en los 15
      minutos siguientes a enchufar la luz. Si sigue fallando, reinicia el
      router, luego la luz, y vuelve a intentarlo.
  - q: ¿Puedo usar Govee en Apple Home y en Alexa a la vez?
    a: >-
      Sí, con el multiadministrador de Matter. Genera un nuevo código de
      configuración de 11 dígitos para la luz e introdúcelo en la segunda app,
      en lugar de reutilizar el código QR original.
  - q: ¿Necesito un HomePod o un Apple TV?
    a: >-
      La FAQ de Govee dice que hace falta un hub o controlador Matter, y en
      Apple Home eso significa un HomePod o un Apple TV como hub de casa, que
      también necesitas para el acceso remoto y las automatizaciones. El hub va
      ligado al ID de Apple que creó la casa.
  - q: ¿Qué pasa con mis luces Govee cuando me mudo de piso?
    a: >-
      Elimina la luz de Apple Home, restablécela y vuelve a añadirla en el nuevo
      Wi-Fi. No te limites a cambiar el Wi-Fi en la app de Govee, porque eso
      desactiva Matter.
author: editorial-team
heroImage: /images/featured/govee-apple-homekit.png
heroAlt: >-
  Govee HomeKit – cómo añadir luces Govee a Apple Home con Matter, guía de
  RenterSmartHome
---

Pegas una tira Govee nueva detrás de la tele, abres la app Casa y no aparece por ningún lado. **Que Govee funcione con HomeKit depende del logo Matter: los modelos Matter, como la Govee LED Strip Light M1, se añaden a Apple Home escaneando un código QR, sin puente.** Los dispositivos Govee más antiguos no pueden recibir Matter por actualización de firmware, así que cada uno necesita un puente: Homebridge, Home Assistant o uno de pago.

Hemos escrito esta guía pensando en quien vive de alquiler, así que además de la configuración cubrimos lo que otras guías se saltan: los ajustes de un router que quizá no controlas, el cambio de Wi-Fi que rompe Matter sin avisar, qué versión de la M1 tiene sentido en España y qué pasa cuando te mudas y quieres recuperar la fianza.

## ¿Funciona Govee con Apple HomeKit?

**El soporte de Govee para HomeKit pasa por Matter, el estándar de hogar inteligente compartido entre marcas, no por HomeKit nativo.** Eso divide todas las luces Govee en dos grupos.

### Dispositivos Govee con Matter: sí, sin puente

La [FAQ de Matter de Govee](https://us.govee.com/pages/matter-faq) cita la LED Strip Light M1 como su tira con Matter. AddToHomeKit, en su [guía de Govee para HomeKit](https://www.addtohomekit.com/blog/govee-homekit/), también incluye como Matter la Govee Floor Lamp 3, el Govee Smart Plug Pro, la Strip Light 2 Pro y varias bombillas y plafones. Govee usa Matter solo por Wi-Fi; ningún producto de Govee usa Thread, así que todo depende de lo fiable que sea tu Wi-Fi.

### Dispositivos Govee antiguos: solo con un puente

Según Govee y AddToHomeKit, los modelos Govee antiguos no pueden recibir Matter mediante una actualización de firmware por limitaciones de hardware. Esos necesitan un puente (los comparamos más abajo).

### Comprobación Govee HomeKit: ¿cuál tienes?

Antes de comprar, busca el logo Matter en la caja y el número de modelo de la M1 (H61E0 o H61E1). Importa porque es una duda recurrente en los hilos de r/HomeKit, donde los usuarios preguntan si "Matter" en la caja garantiza que funcione con Apple Home. Una respuesta lo resume sin rodeos: ["The challenge is that Matter is evolving quickly."](https://www.reddit.com/r/HomeKit/comments/1l0soq3/does_matter_automatically_mean_a_device_will_work/) (el problema es que Matter evoluciona muy deprisa). Nuestra regla: fíate del logo del modelo concreto, no de la marca.

### Ejemplo de tira Matter: la Govee LED Strip Light M1

La Govee LED Strip Light M1 encaja con el inquilino que quiere que Siri y la app Casa manejen una tira en el dormitorio o detrás de la tele sin puente ni cableado. Se enchufa a la corriente y se pega con adhesivo, y la misma tira se puede compartir también con Alexa o Google Home. Para España, busca la versión europea: la [tienda europea de Govee](https://eu.govee.com/products/refurbished-govee-led-strip-light-m1-matter-compatible-2m) muestra la M1 H61E0 de 2 m (6.56 ft) con cargador de enchufe EU de 2 patillas y compatibilidad Matter (HomeKit, Alexa y Google). La versión europea de la H61E1 (5 m, 16.4 ft) no la hemos podido confirmar, así que no des por hecho que exista con enchufe europeo.

En Apple Home solo tendrás lo básico, y ten en cuenta que Govee dice que la tira no se puede cortar por debajo de 3 metros, así que piensa dónde vas a enrollar el sobrante. Las opiniones de los propietarios son mixtas: un miembro del grupo de Facebook de Govee quedó "muy impresionado" tras cambiar una tira genérica de los muebles por la M1, mientras que a un usuario de r/HomeKit la tira le aparecía como compatible pero nunca terminaba de conectarse. Una respuesta en r/Govee cuenta que el código QR del cable resolvió un problema de emparejamiento parecido.

## Cómo añadir Govee a Apple Home en 5 pasos

**Emparejar Govee con Apple Home lleva cinco pasos: enchufa la luz, abre la app Casa, escanea el código QR de Matter y termina en menos de 15 minutos.** Los pasos siguen la FAQ de Govee y la [guía para principiantes de la comunidad Govee](https://community.govee.com/posts/how-to-pair-matter-to-apple-home-for-beginners/261671).

Antes de empezar, repasa esta lista:

- Tu móvil está en la banda Wi-Fi de 2,4 GHz y con el Bluetooth activado.
- IPv6 está activado en el router (la guía de la comunidad dice que el emparejamiento Matter de Govee lo necesita). En muchos routers está en Avanzado > IPv6, como explica [TP-Link](https://www.tp-link.com/uy/support/faq/1525/).
- Tienes 15 minutos desde que enchufas la luz; después se cierra la ventana de emparejamiento.
- Para el acceso remoto y las automatizaciones, un hub de casa de Apple (HomePod mini/Apple TV 4K u otro HomePod o Apple TV).

Después:

1. Enchufa la luz y déjala encendida.
2. En la app Casa, toca Añadir accesorio.
3. Escanea el código QR de Matter. En la M1 está en el cable de alimentación; si esa etiqueta ya no está, la app Govee Home te muestra el código de configuración de Matter.
4. Ponle nombre a la luz y asígnale una habitación.
5. Compruébala con Siri y después crea escenas o automatizaciones en tu hub.

## Límites de Govee en Apple Home: lo que se queda en la app de Govee

**Las luces Govee en Apple Home tienen encendido/apagado, brillo, color y temperatura de color; la sincronización con música, DreamView, el control por segmentos y los efectos DIY se quedan en la app Govee Home.** Nosotros mantendríamos las dos apps instaladas.

La trampa que nadie cuenta de entrada: la FAQ de Govee dice que cambiar la red Wi-Fi de la luz desde la app de Govee desactiva Matter. La guía de la comunidad añade que volver a ejecutar la configuración del Wi-Fi (algo que algunos propietarios hacen para recuperar DreamView) tiene el mismo efecto. En ambos casos la luz desaparece de Apple Home y hay que restablecerla y volver a añadirla.

El orden seguro cuando cambias de router o de red mesh:

1. Elimina la luz de la app Casa.
2. Restablece la luz.
3. Vuelve a emparejarla desde Apple Home en la nueva red, dentro de los 15 minutos siguientes a enchufarla.
4. Solo entonces configura las funciones de la app de Govee que quieras.

## Puentes HomeKit para luces Govee antiguas, comparados

**Toda luz Govee antigua necesita un puente; la alternativa sin puente es un modelo Matter, y si no, toca elegir entre un puente gratuito en un ordenador siempre encendido o uno de pago.** Homebridge es un software de puente gratuito que presenta a Apple Home los dispositivos sin Matter; Home Assistant hace lo mismo mediante el control LAN de Govee y su HomeKit Bridge.

La tabla compara cada opción según lo que un inquilino tiene que mantener en marcha:

| Opción | Coste | Hardware | Esfuerzo | Encaje en un piso de alquiler |
|---|---|---|---|---|
| Modelo Matter | Gratis | Nada aparte de la luz | Bajo | El mejor: nada que mantener |
| Homebridge (plugin de Govee) | Software gratuito | Raspberry Pi u ordenador encendido 24/7 | Medio | Bien si mantienes una Pi encendida |
| Home Assistant | Software gratuito | Servidor siempre encendido | Alto | Para quien ya lo usa |
| AddToHomeKit / ATH Bridge | De pago | Alojado, o caja lista para enchufar | Bajo | Fácil, pero es un gasto recurrente |

AddToHomeKit también menciona los Atajos de Siri mediante Tap-to-Run de Govee como apaño provisional sin puente. Merece la pena tener en cuenta dos comentarios de la comunidad Govee en la guía para principiantes. Uno (de HIWATT) señala que los plugins de Homebridge de la comunidad pueden romperse tras una actualización; otro (de sendo427) volvió a Homebridge porque Matter por Wi-Fi le daba guerra después de cambios de red. Ninguna de las dos vías está libre de mantenimiento.

## Govee en un piso de alquiler: sin taladrar y sin problemas con la fianza

**Con Govee, Matter y Apple Home, lo más seguro para la fianza son las lámparas enchufables y el Smart Plug Pro, que no dejan nada en la pared; las tiras adhesivas son el riesgo.**

### Mejor enchufable que adhesivo cuando puedas

Que el casero se quede parte de la fianza por la pintura es una queja que se repite en r/ESLegal. Un inquilino que dejó su piso tras cinco años cuenta que ["el casero se niega a devolverme la fianza"](https://www.reddit.com/r/ESLegal/comments/1sfnmv7/casero_no_me_devuelve_fianza_por_tener_que_pintar/) por tener que pintar, y en otro hilo una respuesta recuerda que ["Son desperfectos derivados del uso normal del piso y los asume el propietario."](https://www.reddit.com/r/ESLegal/comments/1nhisum/cobro_de_900_euros_en_pintura_tras_terminar/) Una Floor Lamp 3 o una lámpara en un Smart Plug Pro (ambos con Matter según AddToHomeKit) evitan el problema. Nuestra guía de [enchufes inteligentes Matter](/es/blog/mejores-enchufes-inteligentes-matter/) explica cómo un enchufe hace que cualquier lámpara funcione con Apple Home.

Como información general, no como asesoramiento legal: el [artículo 36 de la Ley de Arrendamientos Urbanos](https://www.boe.es/buscar/act.php?id=BOE-A-1994-26003) establece que el saldo de la fianza en metálico devenga el interés legal si no se ha devuelto pasado un mes desde la entrega de las llaves.

### Si usas una tira

Al irte del piso, calienta el adhesivo o humedécelo con alcohol isopropílico antes de despegarlo, y haz fotos del estado de las paredes antes de entregar las llaves. El problema contrario, tiras que se caen a los pocos días, también sale en grupos de inquilinos y de padres, donde una respuesta advierte de que ["the adhesive backing may not be sufficient"](https://www.facebook.com/groups/1841247825900748/posts/28748695164729316/) (el adhesivo de serie puede no bastar). La solución son clips, canales o cinta extraíble de más agarre. En nuestra guía de [tiras LED para piso de alquiler](/es/blog/tiras-led-para-piso-de-alquiler/) comparamos las opciones de montaje.

> **De nuestras notas:** Cuando leímos la FAQ de Matter de Govee junto a la guía para principiantes de su comunidad, la frase que nos hizo parar no hablaba del emparejamiento. Era el aviso de que cambiar el Wi-Fi en la app de Govee desactiva Matter. Imagina a un inquilino que se muda, conecta la tira al nuevo router desde la app de Govee y ve cómo desaparece de Apple Home. Ninguna de las guías principales que comparamos lo relaciona con el día de la mudanza, y por eso hemos puesto en este artículo el orden de restablecer primero.

### De quién es el ID de Apple del hub, y qué hacer al mudarte

Los inquilinos lo preguntan a menudo en r/HomeKit; un hilo sobre pisos de alquiler empieza así: ["One of the first decisions is regarding HomeKit hub and the Apple ID."](https://www.reddit.com/r/HomeKit/comments/n51voa/homekit_in_a_rental_property/) (una de las primeras decisiones es el hub de HomeKit y el ID de Apple). El hub va ligado a un solo ID de Apple, así que si compartes piso nosotros lo pondríamos a nombre de quien se vaya a quedar más tiempo. Las luces Matter no necesitan un hub adicional, lo que encaja con el consejo de [un hilo sobre el primer piso](https://www.reddit.com/r/HomeKit/comments/zzyc45/first_apartment_homekit_recommendations/): ["I'd stay away from anything that needs a unique hub"](https://www.reddit.com/r/HomeKit/comments/zzyc45/first_apartment_homekit_recommendations/) (yo evitaría todo lo que necesite su propio hub). Al mudarte, elimina cada luz de Apple Home, restablécela y vuelve a añadirla en la nueva casa.

### Router e IPv6 cuando la red la controla el casero

Si el Wi-Fi lo gestiona el casero, o usas el router del operador o una red comunitaria, puede que no puedas activar IPv6 tú mismo. Pregúntalo al casero o al operador en una línea: "¿Se puede activar IPv6 en la red de mi piso para una luz inteligente?". Si no, tener tu propio router es la solución más limpia.

## Problemas de Govee con HomeKit y cómo solucionarlos

**La mayoría de los fallos de Govee con HomeKit se deben a la red, a un código que ya está en uso o a un interruptor de pared.**

### No se empareja

Que el emparejamiento Matter falle durante horas es una queja recurrente en hilos de r/homeassistant y r/alexa, como [este intento de tres días](https://www.reddit.com/r/homeassistant/comments/1rgodgx/ive_been_trying_to_pair_matter_devices_for_3_days/). Muchos de esos casos tienen que ver con routers de borde Thread, que no afectan a Govee. Comprueba IPv6, los 2,4 GHz y la ventana de 15 minutos; después reinicia primero el router y luego la luz, y vuelve a emparejar.

### Ya está emparejada en otra app

Para añadir la luz también a Alexa o Google, usa el multiadministrador (compartir en Matter): genera un nuevo código de configuración de 11 dígitos en lugar de volver a escanear el código QR original.

### No responde tras cambiar el Wi-Fi

Sigue el orden de eliminar, restablecer y volver a añadir que explicamos arriba.

### El interruptor de la pared la deja sin control

Que un compañero de piso apague el interruptor es el fallo clásico en un piso compartido: ["when you flip the wall switch, all power is stopped so the smart bulb becomes totally dead."](https://doitforme.solutions/blog/are-your-smart-bulbs-making-your-smart-home-dumb/) (al apagar el interruptor se corta toda la corriente y la bombilla inteligente se queda completamente muerta). Deja ese interruptor encendido y tápalo con un protector. Nuestra guía de [bombillas inteligentes para inquilinos](/es/blog/mejores-bombillas-inteligentes-para-inquilinos/) recoge otras soluciones, y la de [domótica para pisos de alquiler](/es/blog/domotica-para-pisos-de-alquiler/) muestra qué añadir después.
