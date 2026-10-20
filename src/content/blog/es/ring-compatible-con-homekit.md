---
title: ¿Es Ring compatible con HomeKit? 3 puentes y qué revisar si alquilas
seoTitle: ¿Es Ring compatible con HomeKit? 3 puentes para inquilinos
description: >-
  Ring no es compatible con HomeKit ni con Matter de serie. Así lo integran
  Homebridge, Scrypted y HOOBS en la app Casa, y qué revisar si vives de alquiler.
pubDate: '2026-10-21T01:05:00.000Z'
lang: es
translationOf: does-ring-work-with-apple-homekit
category: security
keyword: ring compatible con homekit
secondaryKeywords:
  - ring homekit
  - ring apple homekit
  - timbre ring en la app casa de apple
  - camara ring homekit
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
  - videotimbres
  - apple homekit
  - seguridad en el piso
  - normas para inquilinos
articleType: how-to
funnel: mofu
productStyle: paragraph
productCount: 1
readingTime: 10
tldr:
  - >-
    No. Los timbres, las cámaras y Ring Alarm no tienen compatibilidad nativa
    con HomeKit ni con Matter, así que por sí solos nunca aparecen en la app
    Casa de Apple.
  - >-
    Los puentes de terceros (Homebridge con el plugin de Ring, HOOBS o Scrypted
    para HomeKit Secure Video) pueden añadir Ring a la app Casa, pero necesitan
    un equipo encendido las 24 horas.
  - >-
    Si vives de alquiler, revisa primero el contrato y habla con tu casero, ten
    en cuenta los criterios de la AEPD sobre cámaras y zonas comunes, y luego
    decide si te compensa mantener un puente o comprar un timbre compatible con
    HomeKit de serie.
products:
  - name: HOOBS Box (HSLF-3)
    brand: HOOBS
    query: HOOBS Box HomeKit Homebridge hub
    matchName: HOOBS
    badge: Puente listo para usar con Ring
    summary: >-
      Un hub de Homebridge ya montado que ejecuta el plugin de Ring y muestra
      los timbres, las cámaras y Ring Alarm en la app Casa de Apple. El plugin
      trabaja con tu cuenta de Ring y con tus propios dispositivos Ring a través
      de su nube; no hemos comprobado qué modelos concretos de Ring se venden en
      España. Ring no es compatible con HomeKit de serie, así que es un apaño de
      terceros, no una función oficial de Ring. En España, elige la opción de
      adaptador EU-Plug.
    renterNote: >-
      Para quien vive de alquiler, usa la app Casa y ya tiene Ring, pero no
      quiere montar una Raspberry Pi ni un servidor. Elige el adaptador EU-Plug
      (la caja se alimenta por USB-C). Tiene que estar siempre enchufado y
      conectado, depende de la nube de Ring (el vídeo en directo puede tardar) y
      el plugin estándar de Ring no ofrece HomeKit Secure Video.
    pros:
      - >-
        Viene con el software HOOBS (una plataforma basada en Homebridge) ya
        instalado; no hay que montar ningún servidor, según HOOBS
      - >-
        Según las fuentes, el plugin de Ring lleva a la app Casa el timbre, las
        cámaras y los sensores de Ring Alarm
      - >-
        Según las fuentes, pulsar el timbre puede activar escenas de HomeKit y
        hacer sonar un HomePod
    cons:
      - >-
        Es de terceros y no oficial: si Ring cambia el inicio de sesión de su
        nube, el plugin puede dejar de funcionar
      - >-
        Sin HomeKit Secure Video con el plugin estándar de Ring; el vídeo en
        directo pasa por la nube y es más lento que con cámaras HomeKit nativas
    scores:
      install: 6
      reversibility: 9
      value: 6
      compatibility: 6
      portability: 8
    scoreNote: >-
      Sin taladrar y se desenchufa sin dejar rastro; la configuración exige
      trabajar con plugins y tokens, y la compatibilidad con Ring no es
      oficial, así que es parcial.
    owners:
      read: 8
      praise:
        - >-
          Un usuario de r/HOOBS tuvo un HOOBS Pro funcionando en menos de 2
          minutos con unos 40 dispositivos Ring añadidos
        - >-
          Los usuarios cuentan que la caja se actualiza sola, igual que sus
          plugins, y que funciona bien en el día a día
        - >-
          Un analista vio la primera configuración rápida y pulida, con
          automatizaciones de la app Casa que respondían rápido
      complaints:
        - >-
          Varios usuarios de r/HOOBS cuentan que sus cámaras Ring o sus iconos
          aparecen como "No responde" tras una actualización del plugin o del
          sistema
        - >-
          Un usuario dice que su HOOBS se colgaba a diario y había que
          desenchufarlo y volver a enchufarlo
        - >-
          El mismo analista vio complicado configurar plugins más allá de lo
          básico y tuvo que reinstalar el software una vez
      sources:
        - title: HOOBS Pro users reviews/feedback (r/HOOBS)
          url: >-
            https://www.reddit.com/r/HOOBS/comments/14yfyom/hoobs_pro_users_reviewsfeedback/
        - title: HOOBs Pro feedback (r/HOOBS)
          url: 'https://www.reddit.com/r/HOOBS/comments/148koyr/hoobs_pro_feedback/'
        - title: HOOBS crashes daily (r/HOOBS)
          url: >-
            https://www.reddit.com/r/HOOBS/comments/1hub2kv/hoobs_crashes_dailyunable_to_access_via_client_app/
        - title: Ring bridge not working after update (r/HOOBS)
          url: >-
            https://www.reddit.com/r/HOOBS/comments/1elpgqp/ring_bridge_not_working_after_yesterdays_update/
        - title: I'm about to throw this thing away (r/HOOBS)
          url: >-
            https://www.reddit.com/r/HOOBS/comments/10wstqk/im_about_to_throw_this_thing_away/
        - title: Ring camera feed on Apple TV (r/HOOBS)
          url: >-
            https://www.reddit.com/r/HOOBS/comments/vl6ztp/ring_camera_feed_on_apple_tv/
        - title: HOOBS out of the box review (r/homeautomation)
          url: >-
            https://www.reddit.com/r/homeautomation/comments/j0ed8t/hoobs_out_of_the_box_review/
        - title: HOOBS review (Stacey on IoT)
          url: 'https://staceyoniot.com/hoobs-review-homekit-homebridge/'
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
  - title: HOOBS Box Starter Kit, opción de adaptador EU-Plug (tienda HOOBS)
    url: 'https://hoobs.com/shop/HOOBS-Box-Starter-Kit-p709063339'
  - title: Shipping & taxes (HOOBS)
    url: 'https://hoobs.com/shipping-taxes/'
  - title: Cámaras de videovigilancia en comunidades de propietarios (AEPD)
    url: >-
      https://www.aepd.es/preguntas-frecuentes/9-comunidades-de-propietarios/FAQ-0910-en-nuestra-comunidad-de-vecinos-hay-camaras-de-videovigilancia-son-legales
  - title: ¿Se aplica la normativa de protección de datos a los videoporteros? (AEPD)
    url: >-
      https://www.aepd.es/preguntas-frecuentes/9-comunidades-de-propietarios/FAQ-0912-la-normativa-de-proteccion-de-datos-se-aplica-a-los-videoporteros
  - title: Guía sobre el uso de videocámaras para seguridad y otras finalidades (AEPD)
    url: 'https://www.aepd.es/guias/guia-videovigilancia.pdf'
  - title: >-
      El Supremo confirma que una mirilla electrónica vulnera la intimidad de
      los vecinos (CAF Madrid)
    url: >-
      https://ciudadycomunidad.cafmadrid.es/el-supremo-confirma-que-una-mirilla-electronica-vulnera-la-intimidad-de-los-vecinos/
  - title: Mirilla con cámara digital y protección de datos (Ayuda Ley Protección Datos)
    url: 'https://ayudaleyprotecciondatos.es/2019/03/04/mirilla-camara-digital/'
reviewedDate: '2026-10-20'
faqs:
  - q: ¿Ring es compatible con HomeKit de Apple?
    a: >-
      No de forma nativa. Los timbres, las cámaras y Ring Alarm no aparecen por
      sí solos en la app Casa de Apple, y Ring no tiene timbres ni cámaras con
      Matter. Puentes de terceros como Homebridge con el plugin de Ring, HOOBS o
      Scrypted pueden llevarlos a HomeKit.
  - q: ¿Las cámaras Ring funcionan con HomeKit Secure Video?
    a: >-
      No por sí solas. Scrypted es el puente que citan las guías principales
      para usar HomeKit Secure Video con cámaras Ring, y HomeKit Secure Video
      guarda los clips en iCloud+, así que también necesitas ese plan. El
      plugin estándar de Ring para Homebridge no lo ofrece.
  - q: ¿Necesito un hub o una Raspberry Pi para conectar Ring a HomeKit?
    a: >-
      Necesitas un equipo siempre encendido para el software del puente, como
      una Raspberry Pi, un ordenador que nunca entre en reposo o una HOOBS Box
      ya montada. Para el acceso remoto y las automatizaciones, la app Casa
      también necesita un HomePod o un Apple TV como concentrador.
  - q: ¿Apple HomeView funciona con Ring?
    a: >-
      AddToHomeKit informa de que Apple ha anunciado una pantalla para el hogar
      llamada HomeView; no hemos confirmado sus detalles. Como cualquier
      pantalla de la app Casa, solo puede mostrar Ring después de que un puente
      añada Ring a la app Casa, porque Ring no tiene compatibilidad nativa con
      HomeKit.
  - q: ¿Es seguro darle a Homebridge mi cuenta de Ring?
    a: >-
      El plugin de Ring para Homebridge inicia sesión una vez con tu cuenta de
      Ring y el código de verificación en dos pasos, y después guarda un token
      de actualización. Trata ese token como una contraseña, mantén el puente
      actualizado y elimina su sesión de tu cuenta de Ring cuando dejes de
      usarlo o te mudes.
  - q: ¿Cuál es el timbre HomeKit más fácil si vivo de alquiler?
    a: >-
      Si solo quieres la app Casa, un timbre con batería compatible con HomeKit
      de serie evita el puente por completo. Un inquilino de r/HomeKit usó un
      Aqara G4 con batería en su piso de alquiler. Revisa tu contrato y pide
      permiso a tu casero por escrito antes de instalar cualquier timbre con
      cámara.
author: editorial-team
heroImage: /images/featured/does-ring-work-with-apple-homekit.png
heroAlt: >-
  ¿Es Ring compatible con HomeKit? 3 puentes y qué revisar si alquilas –
  guía práctica de RenterSmartHome
---

En un hilo de r/HomeKit, alguien que vive de alquiler pregunta qué timbre con cámara comprar para un piso donde todo es de Apple, y [la primera respuesta es tajante](https://www.reddit.com/r/HomeKit/comments/1x50tp7/doorbell_camera_for_an_apartment_recommendation/): que no compre un Ring, porque no es compatible con HomeKit y encima hay que pagar para sacarle partido. En lo básico, esa respuesta acierta. **Ring no es compatible con HomeKit de forma nativa: los timbres, las cámaras y Ring Alarm no tienen soporte para HomeKit ni para Matter, así que por sí solos nunca aparecen en la app Casa de Apple.** Puentes de terceros como Homebridge, Scrypted y HOOBS pueden añadir Ring a la app Casa, pero son apaños no oficiales que necesitan un dispositivo encendido todo el día.

Hemos escrito esta guía para quien vive de alquiler y se está planteando ese apaño: las tres rutas de puente, lo que consigues con cada una y las comprobaciones de contrato, vecinos y mudanza que otras guías se saltan. En España, además, hay un debate propio sobre mirillas digitales y cámaras en la puerta del piso que no aparece en las guías en inglés, y nosotros lo incluimos.

## ¿Ring funciona con HomeKit de Apple?

**Según nuestra lectura de las fuentes, Ring y HomeKit solo se encuentran a través de un puente de terceros; Ring es compatible de serie con Alexa y Google Home, no con Apple.** En la app de Ring no hay ningún botón de "Añadir a Casa", en la caja no viene ningún código QR de HomeKit y tampoco hay código de emparejamiento Matter.

### Qué significaría la compatibilidad nativa en timbres, cámaras y Alarm de Ring

Compatibilidad nativa significaría escanear un código en la app Casa de Apple y ver allí el timbre, las cámaras y los sensores de la alarma sin instalar nada más. Ring ofrece ese camino para Alexa y Google Home, y por eso quienes tienen Ring y usan Apple suelen sentirse atrapados. Un puente imita ese camino: traduce la nube de Ring a accesorios de HomeKit.

### Por qué Matter no ayuda

Ring no tiene timbres ni cámaras con Matter, así que Matter no es una puerta trasera para entrar en la app Casa. La confusión sobre esto sale una y otra vez en los hilos de r/HomeKit, donde la gente pregunta si "Matter" en la caja significa que un dispositivo aparecerá en la app Casa. Una respuesta resume por qué las respuestas cambian tanto: ["The challenge is that Matter is evolving quickly."](https://www.reddit.com/r/HomeKit/comments/1l0soq3/does_matter_automatically_mean_a_device_will_work/) (el problema es que Matter evoluciona muy deprisa). Nuestra regla: fíate del logo de Matter o de "Funciona con Apple Home" en el propio producto e ignora cualquier afirmación de que Ring funciona con HomeKit "a través de Matter".

## Tres formas de meter Ring en la app Casa

**La ruta gratuita es Homebridge con el plugin de Ring; Scrypted es la ruta para HomeKit Secure Video; Home Assistant solo tiene sentido si ya lo usas.** Las tres necesitan un ordenador que esté encendido las 24 horas.

- **Homebridge o HOOBS.** Homebridge es un software puente gratuito y de código abierto, y su plugin de Ring presenta los timbres, las cámaras y los sensores de Ring Alarm como accesorios de HomeKit. HOOBS empaqueta Homebridge para una Raspberry Pi o para su propia caja.
- **Scrypted.** Este puente transmite las cámaras Ring a HomeKit y es el método que citan las guías principales para HomeKit Secure Video (HKSV), la grabación cifrada de cámaras de Apple a través de iCloud+.
- **Home Assistant.** Este hub tiene una integración con Ring y un HomeKit Bridge que pasa Ring a la app Casa, pero sin HKSV para Ring.

Esta tabla compara las tres rutas según lo que tienes que mantener en marcha y lo que obtienes:

| Ruta | Equipo necesario | HomeKit Secure Video | Ideal para |
|---|---|---|---|
| Homebridge / HOOBS | Raspberry Pi, ordenador siempre encendido o HOOBS Box | No (plugin estándar de Ring) | Avisos del timbre, Siri, automatizaciones |
| Scrypted | Ordenador o servidor siempre encendido | Sí, con iCloud+ | Grabar las cámaras dentro de la app Casa |
| Home Assistant | Servidor de Home Assistant que ya tengas | No | Quien ya lo tiene funcionando |

### HOOBS Box (HSLF-3): un puente listo para usar con Ring

Para quien vive de alquiler, ya tiene Ring y no quiere montarse un servidor, creemos que la [HOOBS Box](amzn:HOOBS+Box+HomeKit+Homebridge+hub) es el equipo más sencillo. Según HOOBS, viene con su software ya instalado, una plataforma basada en Homebridge, así que el trabajo consiste en añadir el plugin de Ring y emparejar, no en pelearse con Linux. Si la pides en la [tienda de HOOBS](https://hoobs.com/shop/HOOBS-Box-Starter-Kit-p709063339), elige en "Power Adapter" la opción **EU-Plug** (también hay US-Plug, UK-Plug y solo cable USB); la caja se alimenta por USB-C (5 V, hasta 3 A), así que lo único que cambia es el adaptador de enchufe. HOOBS indica en su [página de envíos e impuestos](https://hoobs.com/shipping-taxes/) que los pedidos europeos salen de su almacén en Alemania y que los aranceles e impuestos corren a cargo del comprador.

En su [página de configuración para Ring](https://hoobs.com/ring/), HOOBS explica cómo añadir Ring a la app Casa; el plugin trabaja con tu cuenta y la nube de Ring, de modo que lo que verás son tus propios dispositivos Ring. No hemos comprobado qué modelos concretos de Ring de su lista se venden en España. Las fuentes cuentan que pulsar el timbre puede activar escenas de HomeKit y hacer sonar un HomePod. Los inconvenientes son los mismos que tiene cualquier puente para Ring. No es oficial, así que un cambio en el inicio de sesión de la nube de Ring puede romper el plugin, y el vídeo en directo pasa por la nube de Ring, lo que lo hace más lento que una cámara HomeKit nativa. El plugin estándar de Ring tampoco ofrece HomeKit Secure Video.

Los usuarios de HOOBS en r/HOOBS describen ese mismo mantenimiento: uno cuenta que sus cámaras Ring dejaron de funcionar tras una actualización del plugin y otros ven iconos de "No responde" después de actualizar, mientras que otro dice que la caja se actualiza sola y funciona bien en el día a día, y otro más puso unos 40 dispositivos Ring en marcha en menos de 2 minutos (esos dos usaban un HOOBS Pro). Hemos leído ocho publicaciones de usuarios y analistas, sobre todo de modelos Box y Pro anteriores, porque la HSLF-3 es nueva, así que tómalas como una guía sobre el software, no sobre esta unidad exacta. Un usuario cuenta que su caja se colgaba a diario y había que desenchufarla para reiniciarla. Para un piso de alquiler, la caja no necesita taladros y se desenchufa en segundos al mudarte, pero tiene que seguir enchufada y conectada dentro de tu vivienda.

## Qué puedes hacer y qué no con Ring en la app Casa

**Con el puente, Ring en la app Casa te da vídeo en directo, avisos de movimiento y de timbre, control por Siri y automatizaciones; las grabaciones, los ajustes y Ring Protect se quedan en la app de Ring.** Nosotros mantendríamos las dos apps en el móvil.

### Vídeo en directo, movimiento, timbre, Siri y automatizaciones

Las fuentes describen vídeo en directo e instantáneas en la app Casa, notificaciones de movimiento y de pulsación del timbre, peticiones a Siri para mostrar una cámara y automatizaciones como encender una lámpara cuando suena el timbre. Los sensores de Ring Alarm también pueden aparecer. Como la señal va de la nube de Ring al puente y de ahí a la app Casa, cuenta con un retraso antes de que arranque el vídeo en directo.

### Lo que se queda en la app de Ring (grabaciones, ajustes, Ring Protect)

Un puente no lleva las grabaciones de Ring Protect a la app Casa, según [AddToHomeKit](https://www.addtohomekit.com/blog/ring-homekit/). Ring Protect es el plan de nube de pago de Ring, y SafeHome.org lo describe como una cuota mensual. Si además quieres HomeKit Secure Video con Scrypted, necesitas un plan de iCloud+, así que pagarías dos nubes para tener grabaciones en las dos apps. Creemos que la mayoría de inquilinos debería elegir una: quedarse con Ring Protect y usar la app Casa solo para avisos y Siri, o apostar del todo por HKSV.

### HomePod o Apple TV como concentrador

Un HomePod o un Apple TV hace de concentrador de la app Casa, y lo necesitas para el acceso remoto y las automatizaciones. Sin uno, el acceso remoto y algunas automatizaciones no funcionarán.

## Cómo añadir Ring a la app Casa paso a paso (ejemplo con Homebridge)

**Instala Homebridge en un equipo siempre encendido, añade el plugin de Ring, inicia sesión con verificación en dos pasos y escanea el código QR en la app Casa.** Los pasos siguen las guías de Homebridge y HOOBS de nuestras fuentes:

1. Instala Homebridge en una Raspberry Pi, en un ordenador que nunca entre en reposo o en un contenedor Docker, o enchufa una HOOBS Box.
2. Abre la interfaz web de Homebridge e instala el plugin de Ring.
3. Inicia sesión con tu cuenta de Ring e introduce el código de verificación en dos pasos; el plugin guarda un token de actualización de Ring para no pedírtelo cada vez.
4. Reinicia Homebridge para que se carguen los dispositivos Ring.
5. En la app Casa de Apple, toca Añadir accesorio y escanea el código QR que muestra Homebridge.
6. Asigna las habitaciones, activa las notificaciones del timbre y crea automatizaciones en tu HomePod o Apple TV.

Nosotros tratamos el token de actualización como una contraseña. Quien tenga acceso a tu puente tiene acceso a tu Ring, y eso importa en un piso compartido.

## Qué revisar si vives de alquiler antes de conectar Ring a HomeKit

**Un puente cambia la app en la que ves tu Ring; no cambia nada sobre si puedes tener un Ring en la puerta de tu piso.** Resuelve el permiso, la orientación de la cámara, el montaje y el plan de salida antes de pasarte una tarde con plugins.

### Contrato, casero y vecinos: el debate de la mirilla digital en España

En España, la duda que más se repite no es solo qué dice el contrato, sino si una cámara en la puerta del piso puede ver el rellano y a los vecinos. En un foro sobre protección de datos alguien lo resume así: ["eso no es legal ya que necesita el permiso de los vecinos para grabar. Puedes denunciar ante la AEPD."](https://ayudaleyprotecciondatos.es/2019/03/04/mirilla-camara-digital/) Y en los comentarios de una noticia sobre el tema, otra persona responde: ["Si la mirilla no graba se puede poner ."](https://www.facebook.com/lasextanoticias/videos/%EF%B8%8F-ojo-con-las-mirillas-electr%C3%B3nicas-el-tribunal-supremo-ha-hablado-instalar-c%C3%A1ma/24177751445212360/) Las dos frases circulan mucho, y ninguna de las dos es la respuesta completa.

Lo que sí recogen las fuentes, como información general y no como asesoramiento legal:

- **El Tribunal Supremo y la mirilla electrónica.** El Colegio de Administradores de Fincas de Madrid informa de que [el Supremo consideró que una mirilla electrónica vulneraba la intimidad de los vecinos](https://ciudadycomunidad.cafmadrid.es/el-supremo-confirma-que-una-mirilla-electronica-vulnera-la-intimidad-de-los-vecinos/) porque se activaba cada vez que alguien llegaba a la puerta de un vecino y la visión era constante. Las fuentes señalan que las mirillas digitales que solo muestran o graban cuando se pulsa el timbre se valoran de otra manera. Es un caso concreto con sus circunstancias, no una regla para cada puerta.
- **Zonas comunes y vía pública.** La AEPD indica en sus [preguntas frecuentes sobre comunidades de propietarios](https://www.aepd.es/preguntas-frecuentes/9-comunidades-de-propietarios/FAQ-0910-en-nuestra-comunidad-de-vecinos-hay-camaras-de-videovigilancia-son-legales) que las cámaras de una comunidad solo pueden instalarse en zonas comunes y no pueden captar la vía pública salvo la franja mínima necesaria para el acceso.
- **El uso doméstico tiene límites.** En su [FAQ sobre videoporteros](https://www.aepd.es/preguntas-frecuentes/9-comunidades-de-propietarios/FAQ-0912-la-normativa-de-proteccion-de-datos-se-aplica-a-los-videoporteros), la AEPD explica que la normativa de protección de datos no se aplica a los tratamientos que hacen las personas en actividades exclusivamente personales o domésticas, pero el mismo texto sigue y fija límites. No te quedes con esa frase sola: lee la FAQ entera antes de dar nada por hecho.
- **La referencia oficial.** Para carteles informativos y conservación de imágenes, la referencia es la [guía de la AEPD sobre el uso de videocámaras](https://www.aepd.es/guias/guia-videovigilancia.pdf).

Nosotros no podemos decirte si tu caso concreto está permitido. Lo que sí haríamos: lee tu contrato, pide permiso a tu casero por escrito antes de montar nada, elige un timbre que solo muestre o grabe cuando alguien llama, apunta la cámara solo a tu propia puerta y, si tienes dudas, consulta la guía de la AEPD o a un profesional. Conectar Ring a HomeKit no cambia ninguna de esas respuestas, y lo que decidas sobre grabar (con Ring Protect o con HKSV) conviene tenerlo claro desde el principio.

### Montaje sin taladrar y el puente dentro de tu piso

Taladrar es el otro muro, a veces literalmente. Hay edificios que no permiten taladrar hacia el exterior, así que el montaje sin taladros es lo más cómodo. Nuestra guía para [poner un timbre Ring en un piso de alquiler sin taladrar](/es/blog/timbre-ring-piso-alquiler/) explica la Peephole Cam y los soportes adhesivos. Deja el equipo del puente dentro de tu piso, conectado a tu propio router y no a la wifi del edificio.

### El mantenimiento oculto de un puente

Un puente es un segundo aparato que tienes que mantener, y en nuestra opinión es la parte que las guías pasan por alto. En r/homebridge hay usuarios con cámaras Ring que aparecen en la app Casa pero no abren el vídeo en directo, y timbres que dejan de responder; en [un hilo sobre timbres Ring que no responden](https://www.reddit.com/r/homebridge/comments/in3p6e/ring_doorbells_not_responding/), la solución fue esta: ["Restarting the homekit hub finally fixed it."](https://www.reddit.com/r/homebridge/comments/in3p6e/ring_doorbells_not_responding/) (reiniciar el concentrador de HomeKit lo arregló por fin). Cada mudanza, cada router nuevo o cada cambio de contraseña de la wifi supone volver a revisar el equipo. Los cortes de luz también cuentan: el timbre sigue en Ring, pero desaparece de la app Casa hasta que el puente vuelve.

> **De nuestras notas:** Cuando leímos juntas las tres guías mejor posicionadas sobre Ring y HomeKit (AddToHomeKit, SafeHome.org y Wasserstein Home), las tres explicaban Homebridge, Scrypted o HOOBS, y ninguna se preguntaba si el lector podía tener un Ring en su puerta. Los hilos de inquilinos que reunimos para este artículo contaban la otra mitad. La gente preguntaba si una cláusula de "nada de cámaras" se sostiene, dónde montar sin taladrar y por qué un timbre conectado con un puente pasaba a "No responde". Por ese hueco esta guía pone el contrato, los vecinos y el mantenimiento al lado de los pasos de configuración.

### ¿Puente o timbre compatible con HomeKit de serie?

Si lo que quieres de verdad es la app Casa, comprar un timbre compatible con HomeKit de serie puede ser mejor que Ring más un puente. En [un hilo de r/HomeKit sobre timbres para pisos de alquiler](https://www.reddit.com/r/HomeKit/comments/1tiqf0c/renter_friendly_doorbell_solution/), un inquilino cuenta que usa un Aqara G4 con batería, que no necesita el cableado del timbre. Las cámaras HomeKit nativas se emparejan directamente con la app Casa, así que no hay ningún equipo que mantener encendido. Nosotros solo recurriríamos al puente si ya tienes un Ring, si un compañero de piso necesita Alexa o Google Home, o si quieres seguir usando la app de Ring. Nuestra [comparativa de timbres Ring y Nest para inquilinos](/es/blog/timbre-ring-o-nest/) repasa los modelos con batería que encajan con un alquiler.

### Lista para la mudanza con Ring conectado a HomeKit

Esta lista es una sugerencia nuestra, no una norma de Ring ni de Apple:

1. Elimina la sesión del puente en los ajustes de seguridad de tu cuenta de Ring, o cambia tu contraseña de Ring, para que el token de actualización deje de funcionar.
2. Elimina los accesorios de Ring y el puente de la app Casa de Apple.
3. Desenchufa la HOOBS Box o la Raspberry Pi y restablécela si vas a venderla.
4. Desmonta el Ring, tapa los agujeros que haya como pida tu contrato y vuelve a poner el timbre o la mirilla original.
5. Vuelve a vincular Ring en la app de Ring en tu nueva casa y empareja de nuevo el puente.

## Problemas habituales con Ring y HomeKit, y cómo solucionarlos

**La mayoría de quejas son iconos de "No responde", instantáneas que no se actualizan y cuotas; reiniciar el concentrador o el puente arregla las dos primeras, y quedarte con una sola nube arregla la tercera.**

### Ring aparece como "No responde" en la app Casa

Reinicia por este orden: el concentrador de Apple (HomePod o Apple TV), después el puente y por último el dispositivo Ring. Si las instantáneas siguen sin actualizarse, vuelve a autenticar el plugin de Ring con un código nuevo de verificación en dos pasos; volver a autenticar es una de las soluciones que se comparten en hilos de r/homebridge como [este sobre cámaras que no se abren](https://www.reddit.com/r/homebridge/comments/1l15kwk/ring_cameras_show_in_homekit_but_when_i_click_for/). Si sigue pasando, la decisión entre puente y timbre nativo se está tomando sola.

### Cuotas y privacidad

Las cuotas mensuales de las cámaras son una queja habitual en hilos de r/homeowners y r/homeautomation, y un usuario señala que con algunas cámaras no hace falta suscripción para grabar en tarjeta SD y verlas desde el móvil (["Subscription not required to record to SD card and view via your cell phone."](https://www.reddit.com/r/homeowners/comments/1ot0xm0/home_security_cameras_without_monthly_payment/)). Ring con puente sigue dependiendo de la nube de Ring. Si te importa más el almacenamiento local que HomeKit, mira nuestra selección de [timbres con cámara sin suscripción para inquilinos](/es/blog/timbre-con-camara-sin-suscripcion-para-inquilinos/).

### Qué afirmaciones sobre Apple o Matter ignorar

Ignora cualquier anuncio que diga que Ring es "compatible con HomeKit" o "Matter ready" si no lleva el logo de Apple en la caja. AddToHomeKit informa de que Apple ha anunciado una pantalla para el hogar llamada HomeView; no hemos confirmado sus detalles, pero ninguna pantalla de Apple puede mostrar Ring hasta que un puente lo meta en la app Casa.

Así que, para aquel inquilino de r/HomeKit: si todavía no tienes un Ring y quieres la app Casa, compra un timbre nativo. Si ya tienes uno, una HOOBS Box (con el adaptador EU-Plug) o Homebridge lo llevan a la app Casa, una vez que tu casero haya dicho que sí y la cámara solo mire a tu puerta. ¿Aún dudas entre ecosistemas? Nuestra [comparativa de Alexa y Google Home para inquilinos](/es/blog/alexa-o-google-home/) explica dónde encaja Ring de forma nativa.
