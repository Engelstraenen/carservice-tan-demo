#!/usr/bin/env python3
"""Erzeugt alle Seiten der neuen Car-Service-TAN-Seite.  Aufruf:  python3 build.py
Inhalte stehen unten (SERVICES, CARS, GALLERY, FAQ). Rechtstexte/Ratgeber liegen in _texte/."""
import os, re, html
HERE = os.path.dirname(os.path.abspath(__file__))
V = '15'  # Versionskennung gegen Browser-Cache: bei jeder Änderung hochzählen
TEL, TELH = '0211 989 111 88', 'tel:+4921198911188'

def ul(items): return '<ul class="ticks">' + ''.join(f'<li>{i}</li>' for i in items) + '</ul>'

SERVICES = [
 dict(slug='lackiererei', t='Lackiererei', claim='Lackierservice auf <em>höchstem Niveau.</em>', img='lack1', more=['kabine','lack2','halle'],
      lead='Autolackier-Meisterfachbetrieb mit Red-Eye &amp; Multi-Air System von Wolf, ausgestattet für Wasserbasislacke.',
      body='<p>Haben Sie Lackschäden an Ihrem Fahrzeug bemerkt oder hatten Sie einen Unfall? Die Tan GmbH erstellt Ihnen ein kostenloses und unverbindliches Angebot. Wir stehen Ihnen mit kompetenter Beratung zur Seite.</p><p>Lackiert wird in unserer Lackieranlage mit Wärmerückgewinnung. Vorbereitet wird an eigenen Lack-Vorbereitungsplätzen mit Prepkleen, für eine saubere und staubfreie Oberfläche.</p>',
      list=['Lackierung aller Art von Fahrzeugen','Teile-Lackierungen','Industrie-Lackierungen','Felgen-Lackierungen','Lackierung von mobilen Objekten','Effekt-Lackierungen'], slider=True,
      extra='<h3>Wir lackieren mehr als Autos</h3><ul class="pills"><li>Kleinfahrzeuge (PKW)</li><li>Gelände- und Nutzfahrzeuge</li><li>Transportfahrzeuge aller Art</li><li>LKW-Teile</li><li>Landwirtschaftsfahrzeuge</li><li>Motorrad &amp; Roller</li><li>Möbel &amp; Elektrogeräte</li><li>Messe-, Kunst- und Werbeobjekte</li></ul>'),
 dict(slug='fahrzeugaufbereitung', t='Fahrzeugaufbereitung', claim='Aufbereitung <em>bis ins Detail.</em>', img='aufbereitung', more=['wasch','betrieb2','lambo'],
      lead='Vom Motorrad bis zum LKW mit 7,5 Tonnen: innen und außen wie neu.',
      body='<p>Wir bereiten Motorräder, PKW, SUV aller Art und Größe, Nutzfahrzeuge, Wohnmobile, LKW bis 7,5 Tonnen und vieles mehr auf. Seit 1996 ist die Fahrzeugaufbereitung unser Handwerk, damit hat alles angefangen.</p>',
      list=['Reinigung mit Trockeneis','Desinfektion des Innenraumes','Geruchsneutralisation (Ozonbehandlung)','Doppel-Portal-Waschanlage im Haus','Leasing-Aufbereitung vor der Rückgabe']),
 dict(slug='smart-repair', t='Smart Repair', claim='Kleine Schäden, <em>schnell behoben.</em>', img='smart', more=['lack2','dellen','halle'],
      lead='Kleinschadenreparatur an jeder Art von Fahrzeugen, schnell und kostengünstig.',
      body='<p>Wir haben uns auf die Kleinschadenreparatur an jeder Art von Fahrzeugen spezialisiert. Bei kleinen Beschädigungen sind wir in der Lage, diese mit Smart-Repair- und Spot-Repair-Techniken schnell und kostengünstig zu beheben.</p>',
      list=['Kratzer und Lackschäden punktgenau ausbessern','Spot Repair statt Komplettlackierung','Kurze Standzeit Ihres Fahrzeugs','Kostenloses, unverbindliches Angebot']),
 dict(slug='beulendoktor', t='Beulendoktor', sub='Lackschadenfreie Ausbeultechnik', claim='Dellen raus, <em>Lack bleibt.</em>', img='dellen', more=['smart','lack2','halle'],
      lead='Dellen und Beulen lackschadenfrei ausbeulen, ohne Nachlackieren.',
      body='<p>Unser Team besitzt eine langjährige Erfahrung und bietet Ihnen eine professionelle und kostengünstige Umsetzung. Wir legen großen Wert auf sorgfältige Arbeit. Durch erfahrenes Personal und modernste Technik beulen wir Dellen und Beulen lackschadenfrei aus. Nicht immer müssen ausgebeulte Stellen nachlackiert werden.</p>',
      list=['Parkdellen und Hagelschäden','Originallack bleibt erhalten','Schneller und günstiger als Spachteln und Lackieren']),
 dict(slug='glasreparatur', t='Glasreparatur', sub='und Austausch von Fahrzeugscheiben', claim='Scheiben <em>reparieren und tauschen.</em>', img='glas', more=['halle','betrieb1','aussen'],
      lead='Glasreparatur und Austausch von Fahrzeugscheiben, direkt bei uns im Haus.',
      body='<p>Steinschlag oder Riss in der Scheibe? Wir reparieren und tauschen Fahrzeugscheiben in unserer Werkstatt am Tichauer Weg. Rufen Sie uns an, wir beraten Sie gern und leiten alles Weitere in die Wege.</p>',
      list=['Steinschlagreparatur','Austausch von Front-, Heck- und Seitenscheiben','Ein Ansprechpartner für Glas, Karosserie und Lack']),
 dict(slug='felgenreparatur', t='Felgenreparatur', sub='Glanzdrehen ab 149,- € zzgl. MwSt.', claim='Felgen wie neu, <em>glanzgedreht.</em>', img='felgen', more=['trockeneis','reifen','halle'],
      lead='Ihr Fachmann für Felgenreparatur und Felgenaufbereitung in Düsseldorf.',
      body='<p>Wir bieten Ihnen professionelles Glanzdrehen von Leichtmetallfelgen mit innovativen Techniken, ab 149,- € zzgl. MwSt. Leichtmetallfelgen bis 22 Zoll können wir glanzdrehen. Der Preis der Felgenreparatur ist abhängig vom Zustand und der Größe der Felge.</p><p>Sie brauchen keine teure Investition in eine neue Felge: Ihre Felgen erscheinen in neuem Glanz.</p>',
      list=['Glanzdrehen von Leichtmetallfelgen','Randschäden und Oxidationsschäden beseitigen','Komplett- oder Teillackierungen','Auf Hochglanz polieren','Trockeneisstrahlen und Sandstrahlen','Individuelle Terminvereinbarung ohne lange Wartezeiten','Hol- und Bringservice im Umkreis von 20 km','Logistikservice innerhalb Deutschlands: 35,- € zzgl. MwSt.']),
 dict(slug='reifendienst', t='Reifendienst', claim='Reifen wechseln <em>und einlagern.</em>', img='reifen', more=['felgen','halle','betrieb1'],
      lead='Reifenwechsel, Montage und Einlagerung an einem Ort.',
      body='<p>Unsere Werkstatt ist mit modernsten Maschinen und mehreren Hebebühnen ausgestattet. Reifendienst und Lagerung bieten wir für Privatkunden ebenso wie im Rahmen unseres Fuhrparkservice an.</p>',
      list=['Reifenwechsel und Montage','Einlagerung Ihrer Räder','Felgenreparatur direkt im Haus']),
 dict(slug='oldtimer-restauration', t='Oldtimer-Restauration', claim='Klassiker, <em>mit Sorgfalt restauriert.</em>', img='oldtimer', more=['lack2','kabine','lambo'],
      lead='Karosserie, Lack und Aufbereitung für Ihren Klassiker, aus einer Hand.',
      body='<p>Bei einem Oldtimer zählt jedes Detail. Karosseriearbeiten, Lackierung im Meisterbetrieb und die Aufbereitung bis zur Endabfertigung finden bei uns unter einem Dach statt. Ihr Fahrzeug wandert nicht durch mehrere Werkstätten.</p>',
      list=['Karosseriearbeiten','Lackierung im Meisterfachbetrieb','Aufbereitung und Endabfertigung']),
 dict(slug='trockeneis-strahlen', t='Trockeneis-Strahlen', claim='Sauber mit <em>Trockeneis.</em>', img='trockeneis', more=['aufbereitung','felgen','halle'],
      lead='Schonende Reinigung ohne Wasser und ohne Rückstände.',
      body='<p>Beim Trockeneisstrahlen lösen gefrorene Pellets den Schmutz, ohne die Oberfläche anzugreifen. Wir setzen das Verfahren in der Fahrzeugaufbereitung und in der Felgenaufbereitung ein.</p>',
      list=['Motorraum und Unterboden','Felgen','Innenraum und Polster']),
 dict(slug='gutachten', t='Kostenvoranschläge & Gutachten', claim='Kostenvoranschlag <em>und Gutachten.</em>', img='gutachten', more=['buero','halle','aussen'],
      lead='Ihr zuverlässiger Partner für professionelle Kostenvoranschläge und fundierte Gutachten.',
      body='<p>Ob für private oder geschäftliche Zwecke: Wir bieten Ihnen Lösungen, die auf Ihre Bedürfnisse abgestimmt sind.</p><p><b>Kostenvoranschläge:</b> präzise und transparente Kostenkalkulationen für Reparaturen und Dienstleistungen.</p><p><b>Gutachten:</b> qualifizierte Gutachten für Versicherungsfälle, Schadensanalysen oder Wertschätzungen, mit sorgfältiger Prüfung und objektiver Bewertung.</p>',
      list=['Fachkompetenz: erfahrene Spezialisten','Schnelle Bearbeitung','Klare, nachvollziehbare Dokumentation','Für Privatpersonen, Unternehmen, Versicherungen und Behörden']),
 dict(slug='fuhrparkservice', t='Fuhrparkservice', claim='Ihr Fuhrpark <em>in besten Händen.</em>', img='halle', more=['betrieb','aussen','wasch'],
      lead='Autoaufbereitung, Leasingaufbereitung, Fuhrparkverwaltung und Outsourcing.',
      body='<p>Mit unserer langjährigen Erfahrung und unserem top ausgebildeten Team unterstützen wir Ihr Fuhrpark-Management optimal. Auf unserem eigenen Gelände stehen 150 Stellplätze zur Verfügung.</p>',
      list=['Vorbereitung Leasingrückgabe','Erstellen von Kostenvoranschlägen','Erstellen von Gutachten','Professionelle Fahrzeugaufbereitung','Abschleppservice','Hol- und Bringservice','Kfz-Zulassung','Reifendienst und Lagerung']),
 dict(slug='waschanlage', t='Autowaschanlage', claim='Doppel-Portal- <em>Waschanlage.</em>', img='wasch', more=['aufbereitung','halle','betrieb2'],
      lead='Moderne Doppel-Portal-Waschanlage direkt in unserer Halle.',
      body='<p>Vor und nach jeder Arbeit wird Ihr Fahrzeug bei uns gründlich gereinigt. Die Waschanlage ist Teil unserer Arbeitshalle am Tichauer Weg 21.</p>',
      list=['Außenwäsche in der Doppel-Portal-Anlage','Kombinierbar mit der Fahrzeugaufbereitung']),
]
CARS = [('VW Golf 8 1,6 TDI','15,00',['Gangschaltung','5 Personen','Klima','Kleinwagen']),('Citroën C3','15,00',['Gangschaltung','5 Personen','Klima']),('Citroën C4','15,00',['Automatik','5 Türen','Klima','Mittelklasse']),('Citroën Jumper','55,00',['Gangschaltung','Transporter','Klima']),('VW Golf GTI TSI','65,00',['Automatik','5 Türen','Klima','Mittelklasse'])]
GALLERY = [('betrieb','Unser Betrieb','betrieb'),('kabine','Lackieranlage','lack'),('halle','Arbeitshalle','betrieb'),('aussen','Tichauer Weg 21','betrieb'),('lack1','Lackiererei','lack'),('lambo','Kundenfahrzeug','aufbereitung'),('aufbereitung','Fahrzeugaufbereitung','aufbereitung'),('wasch','Autowaschanlage','aufbereitung'),('buero','Bürotrakt','betrieb'),('lack2','Lackiererei','lack'),('felgen','Felgenreparatur','werkstatt'),('betrieb1','Unser Betrieb','betrieb'),('smart','Smart Repair','werkstatt'),('betrieb2','Unser Betrieb','betrieb'),('trockeneis','Trockeneis-Strahlen','werkstatt'),('oldtimer','Oldtimer','werkstatt')]
FAQ = [('Ich habe einen Unfall, was soll ich machen?',f'Ein Anruf genügt, wir werden alles für Sie in die Wege leiten: <a href="{TELH}">{TEL}</a>.'),('Bekomme ich während der Reparaturzeit ein Ersatzfahrzeug?','In den meisten Fällen ja. Unsere <a href="ersatzfahrzeuge.html">Ersatzfahrzeuge</a> stehen in Verbindung mit einem Reparaturauftrag bereit.'),('Können Sie mein Unfallfahrzeug abschleppen?','Wenn Ihr Fahrzeug bei uns repariert wird, ist diese Leistung für Sie kostenlos.'),('Was kostet eine Felgenreparatur?','Glanzdrehen von Leichtmetallfelgen ab 149,- € zzgl. MwSt., abhängig von Zustand und Größe der Felge (bis 22 Zoll). Mehr zur <a href="leistung-felgenreparatur.html">Felgenreparatur</a>.'),('Was kostet ein Angebot?','Nichts. Die Tan GmbH erstellt Ihnen ein kostenloses und unverbindliches Angebot.')]
STEPS = [('Anrufen','Ein Anruf genügt. Wir vereinbaren einen Termin ohne lange Wartezeit.'),('Angebot','Wir sehen uns Ihr Fahrzeug an. Das Angebot ist kostenlos und unverbindlich.'),('Arbeit in unserer Halle','Alles aus einer Hand auf 3000 qm. Sie haben nur einen Ansprechpartner.'),('Abholen','In den meisten Fällen bleiben Sie mit einem Ersatzfahrzeug mobil.')]
QUOTES = [('Preise korrekt und fair. Arbeit sauber, ordnungsgemäß, detailliert. Ich bringe mein Auto seit Jahren immer hin.','CM CM'),('Kostenlosen Leihwagen bekommen und die Lackierung war auch top, nur zu empfehlen.','Bastian Schmelich'),('Top Service, sehr freundliches Personal und ein gutes Ergebnis. Zudem gründliche Reinigung von außen und innen!','Armando Vasquez'),('Top Laden, netter Chef! Sehr zu empfehlen! Gruß aus Augsburg.','Chris M')]

img = lambda n: f'assets/img/{n}.jpg'
PHONE = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6.6 10.8a15.1 15.1 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.25 11.4 11.4 0 0 0 3.6.57 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.45.57 3.6a1 1 0 0 1-.25 1z"/></svg>'

def page(fn, title, body, desc='', active='', preload=''):
    nav = [('leistungen.html','Leistungen','leistungen'),('ueber-uns.html','Über uns','ueber'),('ersatzfahrzeuge.html','Ersatzfahrzeuge','ersatz'),('galerie.html','Galerie','galerie'),('ratgeber.html','Ratgeber','ratgeber'),('faq.html','FAQ','faq'),('kontakt.html','Kontakt','kontakt')]
    navh = ''
    for href, label, key in nav:
        cls = ' class="is-active"' if key == active else ''
        if key == 'leistungen':
            sub = ''.join(f'<a href="leistung-{s["slug"]}.html">{s["t"]}</a>' for s in SERVICES)
            navh += f'<div class="nav__drop"><a href="{href}"{cls}>{label} <i></i></a><div class="nav__menu">{sub}</div></div>'
        else: navh += f'<a href="{href}"{cls}>{label}</a>'
    foot_s = ''.join(f'<a href="leistung-{s["slug"]}.html">{s["t"]}</a>' for s in SERVICES)
    out = f'''<!doctype html>
<html lang="de">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex, nofollow">
<title>{title} | Car Service TAN – Design-Entwurf</title>
<meta name="description" content="{desc or 'Tan GmbH, Lackiermeisterfachbetrieb in Düsseldorf: Lackiererei, Karosserie, Smart Repair, Felgenreparatur und Fahrzeugaufbereitung auf 3000 qm.'}">
<link rel="preload" href="assets/fonts/mulish.woff2" as="font" type="font/woff2" crossorigin>
{f'<link rel="preload" href="{preload}" as="image">' if preload else ''}
<link rel="icon" href="assets/img/favicon.png">
<link rel="stylesheet" href="style.css?v={V}">
</head>
<body>
<a class="skip" href="#main">Zum Inhalt</a>
<header class="head" id="head">
  <a class="logo" href="index.html" aria-label="Car Service TAN – Startseite"><img src="assets/img/logo-weiss.png" alt="Car Service TAN GmbH" width="800" height="484"></a>
  <nav class="nav" id="nav" aria-label="Hauptmenü">{navh}</nav>
  <a class="btn btn--line head__cta" href="kontakt.html">Termin</a>
  <button class="burger" id="burger" aria-label="Menü öffnen" aria-expanded="false" aria-controls="nav"><span></span><span></span><span></span></button>
</header>
<main id="main">
{body}
</main>
<footer class="foot">
  <div class="foot__grid">
    <div><img src="assets/img/logo-weiss.png" alt="Car Service TAN GmbH" width="800" height="484" loading="lazy"><p>Seit 1996 als Car Cosmetic Tan in der Dienstleistungsbranche tätig. Lackiermeisterfachbetrieb, geprüft und zertifiziert durch Dekra.</p></div>
    <div><h4>Leistungen</h4><nav class="foot__cols">{foot_s}</nav></div>
    <div><h4>Betrieb</h4><nav><a href="ueber-uns.html">Über uns</a><a href="ersatzfahrzeuge.html">Ersatzfahrzeuge</a><a href="galerie.html">Galerie</a><a href="ratgeber.html">Ratgeber</a><a href="faq.html">FAQ</a></nav></div>
    <div><h4>Kontakt</h4><p><a href="{TELH}">{TEL}</a><br><a href="mailto:info@carservicetan.de">info@carservicetan.de</a><br>Tichauer Weg 21<br>40231 Düsseldorf<br>Mo–Fr 08–18 · Sa 08–13 Uhr</p></div>
  </div>
  <div class="foot__bar"><small>© 2026 Tan GmbH</small><nav><a href="impressum.html">Impressum</a><a href="datenschutz.html">Datenschutz</a></nav></div>
</footer>
<a class="callbar" href="{TELH}">Jetzt anrufen · {TEL}</a>
<dialog class="light" id="light"><button class="light__x" id="lightX" aria-label="Schließen">×</button><button class="light__nav light__nav--p" id="lightP" aria-label="Vorheriges Bild">←</button><img id="lightImg" alt=""><button class="light__nav light__nav--n" id="lightN" aria-label="Nächstes Bild">→</button><p id="lightCap"></p></dialog>
<script src="data.js?v={V}"></script>
<script src="app.js?v={V}"></script>
</body>
</html>
'''
    open(os.path.join(HERE, fn), 'w', encoding='utf-8').write(out)

def hero(clip, poster, eyebrow, h1, sub='', cta=True, tall=False, crumbs=None):
    cr = ''
    if crumbs: cr = '<nav class="crumbs" aria-label="Brotkrumen">' + ' <span>/</span> '.join(f'<a href="{h}">{l}</a>' if h else f'<b>{l}</b>' for h, l in crumbs) + '</nav>'
    c = f'<div class="cta"><a class="btn btn--pri" href="kontakt.html">Termin anfragen</a><a class="btn btn--line btn--tel" href="{TELH}">{PHONE}{TEL}</a></div>' if cta else ''
    return f'''<section class="hero{' hero--tall' if tall else ' hero--sub'}">
  <div class="vid" data-clips="{clip}" data-posters="{poster}"></div>
  <div class="hero__in">{cr}<p class="eyebrow">{eyebrow}</p><h1>{h1}</h1>{f'<p class="hero__sub">{sub}</p>' if sub else ''}{c}</div>
  <button class="pp" aria-label="Video anhalten"><i></i></button>
</section>'''

def tile(s, cls='tile'):
    return f'<a class="{cls} rv" href="leistung-{s["slug"]}.html" data-v="svc-{s["slug"]}"><img src="{img(s["img"])}" alt="" loading="lazy"><i></i><b>{s["t"]}</b></a>'

SLIDER = f'''<div class="lack__head"><div><p class="eyebrow">Probieren Sie es aus</p><h2>Ziehen Sie den Lack auf.</h2><p class="lead">Schieben Sie von links nach rechts: vorher unlackiert, nachher wie neu. Fotografiert in unserer Lackierkabine.</p></div><div class="swatches" id="swatches" role="group" aria-label="Neue Farbe wählen"></div></div>
<div class="ba ba--real rv" id="ba"><img class="ba__before" src="{img('lack-vorher-1800')}" srcset="{img('lack-vorher-1800')} 1800w, {img('lack-vorher')} 3840w" sizes="(max-width:1328px) 100vw, 1280px" alt="Fahrzeug vor der Lackierung in unserer Lackierkabine" width="3840" height="2143" loading="lazy">
<div class="ba__after" id="baAfter"><img src="{img('lack-nachher-1800')}" srcset="{img('lack-nachher-1800')} 1800w, {img('lack-nachher')} 3840w" sizes="(max-width:1328px) 100vw, 1280px" alt="Fahrzeug nach der Lackierung" width="3840" height="2143" loading="lazy"><img class="ba__tint" src="{img('lack-nachher-1800')}" srcset="{img('lack-nachher-1800')} 1800w, {img('lack-nachher')} 3840w" sizes="(max-width:1328px) 100vw, 1280px" alt="" aria-hidden="true" loading="lazy"></div>
<canvas class="ba__mist" id="baMist" aria-hidden="true"></canvas><span class="ba__tag ba__tag--l">Nachher</span><span class="ba__tag ba__tag--r">Vorher</span>
<div class="ba__bar"><span class="ba__knob"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 6l-6 6 6 6M15 6l6 6-6 6" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg></span></div>
<input class="ba__range" id="baRange" type="range" min="0" max="100" value="8" aria-label="Lackierung aufziehen"></div>'''

CTA = f'''<section class="cta-band"><img src="{img('aussen')}" alt="" loading="lazy"><div class="cta-band__in"><p class="eyebrow">Kostenloses, unverbindliches Angebot</p><a class="tel" href="{TELH}">{TEL}</a><p class="addr">Tichauer Weg 21, 40231 Düsseldorf · Mo–Fr 08–18 · Sa 08–13 Uhr</p><div class="cta"><a class="btn btn--pri" href="kontakt.html">Termin anfragen</a><a class="btn btn--line" href="ersatzfahrzeuge.html">Ersatzfahrzeuge</a></div></div></section>'''
quotes = lambda n=3: '<div class="quotes">' + ''.join(f'<figure class="rv"><div class="stars" aria-label="5 von 5 Sternen">★★★★★</div><blockquote>{q}</blockquote><figcaption>{a}</figcaption></figure>' for q, a in QUOTES[:n]) + '</div>'
steps = '<ol class="steps">' + ''.join(f'<li class="rv"><b>{t}</b><span>{d}</span></li>' for t, d in STEPS) + '</ol>'

# ---------- Startseite ----------
page('index.html', 'Lack. Karosserie. Glanz.', f'''
<section class="hero hero--tall" id="top">
  <div class="vid" id="heroVid" data-clips="hero-tor,halle" data-posters="aussen,halle"></div>
  <div class="hero__in"><h1>Lack.<br>Karosserie.<br><em>Glanz.</em></h1><p class="hero__sub">Lackiermeisterfachbetrieb in Düsseldorf. Seit 1996, auf 3000 qm, alles aus einer Hand.</p><div class="cta"><a class="btn btn--pri" href="kontakt.html">Termin</a><a class="btn btn--line" href="leistungen.html">Leistungen</a></div></div>
  <div class="hero__ctrl"><div class="dots" id="heroDots"></div></div><button class="pp" aria-label="Video anhalten"><i></i></button>
</section>
<section class="sec"><div class="wrap"><div class="sec__top"><div><p class="eyebrow">Leistungen</p><h2>Was wir für Ihr Fahrzeug tun</h2></div><a class="more" href="leistungen.html">Alle {len(SERVICES)} Leistungen →</a></div>
  <div class="tiles">{''.join(tile(SERVICES[i]) for i in (0, 5, 3, 1, 2))}</div></div></section>
<section class="sec sec--deep" id="lack"><div class="wrap">{SLIDER}<p class="after-ba"><a class="more" href="leistung-lackiererei.html">Mehr zur Lackiererei →</a></p></div></section>
<section class="band"><div class="vid" data-clips="halle" data-posters="halle"></div><div class="band__in"><h2>Alles aus einer Hand</h2><p>Lack, Karosserie, Mechanik, Reifen, Felgen, Aufbereitung: ein Ansprechpartner, kürzere Reparaturzeiten.</p><a class="btn btn--line" href="ueber-uns.html">Der Betrieb</a></div></section>
<section class="split"><div class="split__vid"><div class="vid" data-clips="svc-waschanlage" data-posters="wasch"></div></div><div class="split__txt"><h2>Seit 1996</h2><p>Angefangen mit Fahrzeugaufbereitung, erweitert um Smart Repair und Spot Repair, später um Fahrzeuglackierung. Lackiermeisterfachbetrieb, eingetragen in der Handwerksrolle Düsseldorf.</p>
  <ul class="facts"><li><b><span data-count="3000">3000</span> m²</b><span>Werkstatthalle</span></li><li><b data-count="150">150</b><span>Stellplätze auf eigenem Gelände</span></li><li><b>DEKRA</b><span>geprüft und zertifiziert</span></li></ul></div></section>
<section class="sec"><div class="wrap"><p class="eyebrow">Alle Leistungen</p><div class="rows" id="rows">{''.join(f'<a class="row" href="leistung-{s["slug"]}.html" data-img="{img(s["img"])}">{s["t"]}<span>→</span></a>' for s in SERVICES)}</div></div><div class="peek" id="peek" aria-hidden="true"><img alt=""></div></section>
<section class="band band--soft"><div class="vid vid--blur" data-clips="halle" data-posters="betrieb1"></div><div class="wrap"><p class="eyebrow">Kundenstimmen</p><h2>Das sagen unsere Kunden</h2>{quotes()}</div></section>
{CTA}''', active='', preload=img('aussen'))

# ---------- Leistungen (Übersicht) ----------
page('leistungen.html', 'Leistungen', hero('halle', 'halle', 'Leistungen', 'Rund-um-Service <em>für Ihr Fahrzeug.</em>', 'Lange Jahre Erfahrung und sorgfältige Arbeit zeichnen uns aus. Alles unter einem Dach am Tichauer Weg 21.', crumbs=[('index.html', 'Start'), ('', 'Leistungen')]) +
     f'<section class="sec"><div class="wrap"><div class="cards">{"".join(tile(s, "card") for s in SERVICES)}</div></div></section><section class="sec sec--deep"><div class="wrap"><p class="eyebrow">So läuft es ab</p><h2>In vier Schritten zurück auf die Straße</h2>{steps}</div></section>' + CTA, active='leistungen', preload=img('halle'))

# ---------- Unterseite je Leistung ----------
for i, s in enumerate(SERVICES):
    prev, nxt = SERVICES[i - 1], SERVICES[(i + 1) % len(SERVICES)]
    rel = [SERVICES[(i + k) % len(SERVICES)] for k in (2, 4, 7)]
    body = hero(f'svc-{s["slug"]}', s['img'], f'{i + 1:02d} · {s["t"]}', s['claim'], s['lead'], crumbs=[('index.html', 'Start'), ('leistungen.html', 'Leistungen'), ('', s['t'])])
    body += f'''<section class="sec"><div class="wrap detail"><div class="detail__txt"><p class="eyebrow">{s.get("sub", "Leistung")}</p><h2>{s["t"]}</h2>{s["body"]}{ul(s["list"])}{s.get("extra", "")}</div>
<aside class="detail__card rv"><h3>Kostenloses Angebot</h3><p>Ein Anruf genügt, wir leiten alles für Sie in die Wege.</p><a class="tel tel--s" href="{TELH}">{TEL}</a><table class="hours"><tr><th>Mo–Fr</th><td>08:00–18:00</td></tr><tr><th>Sa</th><td>08:00–13:00</td></tr></table><a class="btn btn--pri" href="kontakt.html">Termin anfragen</a></aside></div></section>'''
    if s.get('slider'): body += f'<section class="sec sec--deep" id="lack"><div class="wrap">{SLIDER}</div></section>'
    body += f'<section class="strip">{"".join(f"<button class=\"rv\" data-src=\"{img(m)}\" data-cap=\"{s["t"]}\"><img src=\"{img(m)}\" alt=\"{s["t"]} bei der Tan GmbH\" loading=\"lazy\"></button>" for m in s["more"])}</section>'
    body += f'<section class="sec sec--deep"><div class="wrap"><p class="eyebrow">So läuft es ab</p><h2>In vier Schritten zurück auf die Straße</h2>{steps}</div></section>'
    body += f'<section class="sec"><div class="wrap"><div class="sec__top"><div><p class="eyebrow">Weitere Leistungen</p><h2>Alles aus einer Hand</h2></div><a class="more" href="leistungen.html">Alle Leistungen →</a></div><div class="cards cards--3">{"".join(tile(r, "card") for r in rel)}</div><nav class="pager"><a href="leistung-{prev["slug"]}.html">← {prev["t"]}</a><a href="leistung-{nxt["slug"]}.html">{nxt["t"]} →</a></nav></div></section>' + CTA
    page(f'leistung-{s["slug"]}.html', s['t'], body, desc=re.sub('<[^>]+>', '', html.unescape(s['lead'])) + ' Tan GmbH, Düsseldorf.', active='leistungen', preload=img(s['img']))

# ---------- Über uns ----------
page('ueber-uns.html', 'Über uns', hero('halle', 'betrieb', 'Über uns', 'Ein Ansprechpartner. <em>Eine Halle.</em>', 'Ihr zuverlässiger Partner für sicheren und schnellen Service rund um Ihr Auto.', crumbs=[('index.html', 'Start'), ('', 'Über uns')]) + f'''
<section class="sec"><div class="wrap detail"><div class="detail__txt"><p class="eyebrow">Tan GmbH</p><h2>Lackiermeisterfachbetrieb in Düsseldorf</h2>
<p>Die Tan GmbH wurde im Juli 2015 von Cenk Tan gegründet und ist ein Lackiermeisterfachbetrieb, eingetragen in der Handwerksrolle in Düsseldorf. Geprüft und zertifiziert durch Dekra. Seit 1996 sind wir als Car Cosmetic Tan in der Dienstleistungsbranche tätig: angefangen mit Fahrzeugaufbereitung, erweitert um Smart Repair und Spot Repair, später um Fahrzeuglackierung.</p>
<p>Seit Anfang 2016 befinden wir uns in unserer 3000 qm großen Räumlichkeit auf dem Tichauer Weg 21. Auf dem eigenen Gelände stehen 150 Stellplätze zur Verfügung.</p>
<p>Diese Ausstattung ermöglicht es uns, alle Arbeiten und Dienstleistungen an Fahrzeugen aus einer Hand anzubieten. Ihr Fahrzeug wandert nicht durch mehrere Werkstätten, Sie haben nur einen Ansprechpartner, und die Reparaturzeiten werden kürzer.</p>
{ul(['Lack-Vorbereitungsplätze mit Prepkleen für staubfreie Vorbereitung','Lackieranlage mit Wärmerückgewinnung, Red-Eye und Multi-Air System von Wolf, für Wasserbasislacke','Fülleranlage, Lackmischraum, Gefahrstofflager','Aufbereitungsplätze und Doppel-Portal-Waschanlage','Arbeitsplätze für Karosserie, Mechanik, Reifendienst, Felgenreparatur, Smart Repair und Dellenbeseitigung','Mehrere Hebebühnen, Sozialräume, Bürotrakt, Kundenwartebereich'])}</div>
<aside class="detail__card rv"><ul class="facts"><li><b data-count="1996">1996</b><span>in der Branche seit</span></li><li><b><span data-count="3000">3000</span> m²</b><span>Werkstatthalle</span></li><li><b data-count="150">150</b><span>Stellplätze</span></li><li><b>DEKRA</b><span>geprüft und zertifiziert</span></li></ul></aside></div></section>
<section class="strip">{"".join(f'<button class="rv" data-src="{img(m)}" data-cap="{c}"><img src="{img(m)}" alt="{c}" loading="lazy"></button>' for m, c in [("aussen","Tichauer Weg 21"),("kabine","Lackieranlage"),("buero","Bürotrakt")])}</section>
<section class="band band--soft"><div class="vid vid--blur" data-clips="halle" data-posters="betrieb1"></div><div class="wrap"><p class="eyebrow">Kundenstimmen</p><h2>Das sagen unsere Kunden</h2>{quotes(4)}</div></section>''' + CTA, active='ueber', preload=img('betrieb'))

# ---------- Ersatzfahrzeuge ----------
cars = ''.join(f'<article class="car rv"><h3>{n}</h3><div class="car__p">{p} € <small>/ Tag inkl. MwSt.</small></div><ul>{"".join(f"<li>{f}</li>" for f in fs)}</ul><a class="btn btn--line" href="mailto:info@carservicetan.de?subject=Anfrage%20Ersatzfahrzeug%20{n.replace(" ", "%20")}">Jetzt anfragen</a></article>' for n, p, fs in CARS)
page('ersatzfahrzeuge.html', 'Ersatzfahrzeuge', hero('hero-tor', 'aussen', 'Ersatzfahrzeuge', 'Mobil bleiben, <em>ab 15 € pro Tag.</em>', 'Für unsere Kunden sichern wir die Mobilität mit eigenen Ersatzfahrzeugen, schnell und unkompliziert.', crumbs=[('index.html', 'Start'), ('', 'Ersatzfahrzeuge')]) +
     f'<section class="sec"><div class="wrap"><p class="eyebrow">Unsere Fahrzeuge</p><h2>Fünf Wagen für die Zeit Ihrer Reparatur</h2><p class="lead">Die Nutzung unserer Ersatzfahrzeuge steht ausschließlich in Verbindung mit einem Reparaturauftrag.</p><div class="cars">{cars}</div></div></section>' + CTA, active='ersatz', preload=img('aussen'))

# ---------- Galerie ----------
chips = ''.join(f'<button data-f="{k}"{" class=\"is-on\"" if k == "alle" else ""}>{l}</button>' for k, l in [('alle', 'Alle'), ('betrieb', 'Betrieb'), ('lack', 'Lackieranlage'), ('aufbereitung', 'Aufbereitung'), ('werkstatt', 'Werkstatt')])
gal = ''.join(f'<button class="rv" data-src="{img(n)}" data-cap="{c}" data-k="{k}"><img src="{img(n)}" alt="{c}" loading="lazy"><span>{c}</span></button>' for n, c, k in GALLERY)
page('galerie.html', 'Galerie', hero('halle', 'kabine', 'Galerie', 'Ein Blick <em>in den Betrieb.</em>', '3000 qm am Tichauer Weg 21: Halle, Lackieranlage, Aufbereitung und Waschanlage.', cta=False, crumbs=[('index.html', 'Start'), ('', 'Galerie')]) +
     f'<section class="sec"><div class="wrap"><div class="chips" id="chips">{chips}</div><div class="masonry" id="gal">{gal}</div></div></section>' + CTA, active='galerie', preload=img('kabine'))

# ---------- FAQ ----------
page('faq.html', 'FAQ', hero('hero-tor', 'buero', 'FAQ', 'Die meistgestellten <em>Fragen.</em>', 'Ihre Frage ist nicht dabei? Rufen Sie uns an oder schreiben Sie uns.', cta=False, crumbs=[('index.html', 'Start'), ('', 'FAQ')]) +
     '<section class="sec"><div class="narrow">' + ''.join(f'<details class="q rv"{" open" if k == 0 else ""}><summary>{q}</summary><p>{a}</p></details>' for k, (q, a) in enumerate(FAQ)) + '</div></section>' + CTA, active='faq', preload=img('buero'))

# ---------- Kontakt ----------
page('kontakt.html', 'Kontakt', hero('hero-tor', 'aussen', 'Kontakt', 'Ein Anruf <em>genügt.</em>', 'Wir sind ein „Haus der offenen Tür“ und freuen uns über jeden Besucher.', cta=False, crumbs=[('index.html', 'Start'), ('', 'Kontakt')]) + f'''
<section class="sec"><div class="wrap kontakt"><div><p class="eyebrow">Rufen Sie uns an</p><a class="tel" href="{TELH}">{TEL}</a><p class="lead">Das Angebot ist kostenlos und unverbindlich. Bei einem Unfall leiten wir alles für Sie in die Wege.</p>
<div class="cta"><a class="btn btn--pri" href="mailto:info@carservicetan.de?subject=Terminanfrage">E-Mail schreiben</a><a class="btn btn--line" href="https://www.google.com/maps/dir/?api=1&destination=Tichauer+Weg+21,+40231+D%C3%BCsseldorf" target="_blank" rel="noopener">Route planen</a></div></div>
<aside class="detail__card rv"><h3>Tan GmbH</h3><p>Tichauer Weg 21<br>40231 Düsseldorf</p><table class="hours"><tr><th>Montag bis Freitag</th><td>08:00–18:00</td></tr><tr><th>Samstag</th><td>08:00–13:00</td></tr><tr><th>Sonntag</th><td>geschlossen</td></tr></table><p><a href="mailto:info@carservicetan.de">info@carservicetan.de</a></p></aside></div></section>
<section class="strip">{"".join(f'<button class="rv" data-src="{img(m)}" data-cap="{c}"><img src="{img(m)}" alt="{c}" loading="lazy"></button>' for m, c in [("aussen","Einfahrt am Tichauer Weg 21"),("betrieb","Unser Gelände"),("buero","Empfang und Bürotrakt")])}</section>''', active='kontakt', preload=img('aussen'))

# ---------- Ratgeber, Impressum, Datenschutz (Texte aus _texte/) ----------
def text(name): return open(os.path.join(HERE, '_texte', name + '.html'), encoding='utf-8').read()
ARTICLES = [('ratgeber-verdeckreinigung', 'Verdeckreinigung', 'verdeck', 'Ob automatisch oder klassisch per Hand: Das Verdeck schützt vor äußeren Einflüssen. So bleibt es lange schön.'), ('ratgeber-kleinschadenreparatur', 'Lack- und Kleinschadenreparatur', 'lack2', 'Dellen und Beulen lackschadenfrei ausbeulen: Nicht immer muss nachlackiert werden.')]
page('ratgeber.html', 'Ratgeber', hero('halle', 'verdeck', 'Ratgeber', 'Rund um den Service <em>für Ihr Fahrzeug.</em>', cta=False, crumbs=[('index.html', 'Start'), ('', 'Ratgeber')]) +
     '<section class="sec"><div class="wrap posts">' + ''.join(f'<a class="post rv" href="{fn}.html"><img src="{img(im)}" alt="" loading="lazy"><div><h3>{t}</h3><p>{d}</p><span class="more">Artikel lesen →</span></div></a>' for fn, t, im, d in ARTICLES) + '</div></section>' + CTA, active='ratgeber', preload=img('verdeck'))
for fn, t, im, d in ARTICLES:
    page(fn + '.html', t, hero('halle', im, 'Ratgeber', t, d, cta=False, crumbs=[('index.html', 'Start'), ('ratgeber.html', 'Ratgeber'), ('', t)]) + f'<article class="narrow prose">{text(fn)}<p class="back"><a class="btn btn--line" href="ratgeber.html">← Alle Artikel</a></p></article>' + CTA, desc=d, active='ratgeber', preload=img(im))
for fn, t in [('impressum', 'Impressum'), ('datenschutz', 'Datenschutzerklärung')]:
    page(fn + '.html', t, f'<section class="subhero"><div class="narrow"><p class="eyebrow">Rechtliches</p><h1>{t}</h1></div></section><article class="narrow prose">{text(fn)}</article>')
print('Seiten:', len([f for f in os.listdir(HERE) if f.endswith('.html')]))
