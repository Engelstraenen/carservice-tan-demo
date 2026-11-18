const $ = (s, r = document) => r.querySelector(s);
const ul = a => '<ul>' + a.map(x => `<li>${x}</li>`).join('') + '</ul>';

const SERVICES = [
  { t: 'Lackiererei', img: 'lack1', html: '<p><b>Autolackier-Meisterfachbetrieb.</b> Haben Sie Lackschäden bemerkt oder hatten Sie einen Unfall? Die Tan GmbH erstellt Ihnen ein kostenloses und unverbindliches Angebot und steht Ihnen mit kompetenter Beratung zur Seite.</p>' + ul(['Lackierung aller Art von Fahrzeugen', 'Teile-Lackierungen', 'Industrie-Lackierungen', 'Felgen-Lackierungen', 'Lackierung von mobilen Objekten', 'Effekt-Lackierungen']) },
  { t: 'Fahrzeugaufbereitung', img: 'aufbereitung', html: '<p>Aufbereitung von Motorrädern, PKW, SUV aller Art und Größe, Nutzfahrzeugen, Wohnmobilen, LKW bis 7,5 Tonnen und vielem mehr.</p><h4>Spezielle Reinigungssysteme</h4>' + ul(['Reinigung mit Trockeneis', 'Desinfektion des Innenraumes', 'Geruchsneutralisation (Ozonbehandlung)']) },
  { t: 'Smart Repair', img: 'smart', html: '<p>Wir haben uns auf Kleinschadenreparatur an jeder Art von Fahrzeugen spezialisiert. Kleine Beschädigungen beheben wir mit Smart-Repair-Techniken schnell und kostengünstig.</p>' },
  { t: 'Beulendoktor', sub: 'Lackschadenfreie Ausbeultechnik', img: 'dellen', html: '<p><b>Dellenbeseitigung ohne Lackieren.</b> Unser Team besitzt langjährige Erfahrung und bietet Ihnen eine professionelle, kostengünstige und sorgfältige Umsetzung. Nicht immer müssen ausgebeulte Stellen nachlackiert werden.</p>' },
  { t: 'Glasreparatur', sub: 'und Austausch von Fahrzeugscheiben', img: 'glas', html: '<p>Reparatur von Steinschlägen und Austausch von Fahrzeugscheiben, direkt bei uns im Haus. Rufen Sie uns an, wir beraten Sie gern.</p>' },
  { t: 'Felgenreparatur', sub: 'Glanzdrehen ab 149,- € zzgl. MwSt.', img: 'felgen', html: '<p><b>Ihr Fachmann für Felgenreparatur und Felgenaufbereitung in Düsseldorf.</b> Professionelles Glanzdrehen von Leichtmetallfelgen bis 22 Zoll, ab 149,- € zzgl. MwSt. Der Preis hängt von Zustand und Größe der Felge ab.</p>' + ul(['Randschäden und Oxidationsschäden beseitigen', 'Komplett- oder Teillackierungen', 'Auf Hochglanz polieren', 'Trockeneisstrahlen und Sandstrahlen', 'Individuelle Termine ohne lange Wartezeiten', 'Hol- und Bringservice im Umkreis von 20 km', 'Logistikservice innerhalb Deutschlands: 35,- € zzgl. MwSt.']) },
  { t: 'Reifendienst', img: 'reifen', html: '<p>Reifenwechsel, Montage und Einlagerung. Reifendienst und Lagerung bieten wir auch im Rahmen unseres Fuhrparkservice an.</p>' },
  { t: 'Oldtimer-Restauration', img: 'oldtimer', html: '<p>Karosserie, Lack und Aufbereitung für Ihren Klassiker, aus einer Hand und mit Sorgfalt bis ins Detail.</p>' },
  { t: 'Trockeneis-Strahlen', img: 'trockeneis', html: '<p>Schonende Reinigung mit Trockeneis, zum Beispiel für Motorraum, Unterboden, Felgen und Innenraum. Ohne Wasser, ohne Rückstände.</p>' },
  { t: 'Kostenvoranschläge & Gutachten', img: 'gutachten', html: '<p>Präzise, transparente Kostenkalkulationen und qualifizierte Gutachten für Versicherungsfälle, Schadensanalysen oder Wertschätzungen.</p>' + ul(['Fachkompetenz: erfahrene Spezialisten', 'Schnelle Bearbeitung', 'Klare, nachvollziehbare Dokumentation', 'Für Privatpersonen, Unternehmen, Versicherungen und Behörden']) },
  { t: 'Fuhrparkservice', img: 'halle', html: '<p>Mit langjähriger Erfahrung und einem top ausgebildeten Team unterstützen wir Ihr Fuhrpark-Management.</p>' + ul(['Vorbereitung Leasingrückgabe', 'Kostenvoranschläge und Gutachten', 'Professionelle Fahrzeugaufbereitung', 'Abschleppservice', 'Hol- und Bringservice', 'Kfz-Zulassung', 'Reifendienst und Lagerung']) },
  { t: 'Autowaschanlage', img: 'wasch', html: '<p>Moderne Doppel-Portal-Waschanlage direkt in unserer Halle, für die gründliche Reinigung von außen vor und nach jeder Arbeit.</p>' }
];

const CARS = [
  { n: 'VW Golf 8 1,6 TDI', p: '15,00', f: ['Gangschaltung', '5 Personen', 'Klima', 'Kleinwagen'] },
  { n: 'Citroën C3', p: '15,00', f: ['Gangschaltung', '5 Personen', 'Klima'] },
  { n: 'Citroën C4', p: '15,00', f: ['Automatik', '5 Türen', 'Klima', 'Mittelklasse'] },
  { n: 'Citroën Jumper', p: '55,00', f: ['Gangschaltung', 'Transporter', 'Klima'] },
  { n: 'VW Golf GTI TSI', p: '65,00', f: ['Automatik', '5 Türen', 'Klima', 'Mittelklasse'] }
];

const GAL = [['betrieb', 'Unser Betrieb'], ['lambo', 'Lackieranlage'], ['buero', 'Bürotrakt'], ['lack2', 'Lackiererei'], ['aufbereitung', 'Fahrzeugaufbereitung'], ['aussen', 'Tichauer Weg 21'], ['wasch', 'Autowaschanlage'], ['betrieb1', 'Unser Betrieb'], ['betrieb2', 'Unser Betrieb'], ['hero', 'Lackieranlage']];

const src = n => `assets/img/${n}.jpg`;

$('#services').innerHTML = SERVICES.map((s, i) => `<button class="svc rv" data-i="${i}"><img src="${src(s.img)}" alt="" loading="lazy"><i class="svc__n">${String(i + 1).padStart(2, '0')}</i><span class="svc__t"><b>${s.t}</b>${s.sub ? `<small>${s.sub}</small>` : ''}<span>Mehr erfahren →</span></span></button>`).join('');
$('#cars').innerHTML = CARS.map(c => `<article class="car rv"><h3>${c.n}</h3><div class="car__p">${c.p} € <small>/ Tag</small></div><ul>${c.f.map(x => `<li>${x}</li>`).join('')}</ul><a href="mailto:info@carservicetan.de?subject=${encodeURIComponent('Anfrage Ersatzfahrzeug ' + c.n)}">Jetzt anfragen →</a></article>`).join('');
$('#gal').innerHTML = GAL.map(([n, l]) => `<button class="rv" data-src="${src(n)}" aria-label="${l} vergrößern"><img src="${src(n)}" alt="${l}" loading="lazy"><span>${l}</span></button>`).join('');

// Leistungs-Details
const sheet = $('#sheet');
$('#services').addEventListener('click', e => {
  const b = e.target.closest('.svc'); if (!b) return;
  const s = SERVICES[b.dataset.i];
  $('#sheetImg').src = src(s.img); $('#sheetTitle').textContent = s.t + (s.sub ? ' – ' + s.sub : ''); $('#sheetText').innerHTML = s.html;
  sheet.showModal();
});
// Galerie
const light = $('#light');
$('#gal').addEventListener('click', e => { const b = e.target.closest('button'); if (!b) return; $('#lightImg').src = b.dataset.src; light.showModal(); });
[[sheet, '#sheetX'], [light, '#lightX']].forEach(([d, x]) => { $(x).onclick = () => d.close(); d.addEventListener('click', e => { if (e.target === d) d.close(); }); });

// Kopfzeile + Menü
const head = $('#head'), nav = $('#nav'), burger = $('#burger');
addEventListener('scroll', () => head.classList.toggle('is-scrolled', scrollY > 10), { passive: true });
const setNav = o => { nav.classList.toggle('is-open', o); burger.setAttribute('aria-expanded', o); burger.setAttribute('aria-label', o ? 'Menü schließen' : 'Menü öffnen'); };
burger.onclick = () => setNav(!nav.classList.contains('is-open'));
nav.addEventListener('click', e => e.target.tagName === 'A' && setNav(false));

// Geöffnet / geschlossen (Zeit in Düsseldorf)
(() => {
  const p = Object.fromEntries(new Intl.DateTimeFormat('en-GB', { timeZone: 'Europe/Berlin', weekday: 'short', hour: '2-digit', minute: '2-digit', hour12: false }).formatToParts(new Date()).map(x => [x.type, x.value]));
  const d = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].indexOf(p.weekday), m = +p.hour * 60 + +p.minute;
  const close = d === 0 ? 0 : d === 6 ? 13 * 60 : 18 * 60, open = d !== 0 && m >= 480 && m < close;
  const chip = $('#openchip');
  chip.classList.toggle('is-open', open);
  chip.lastElementChild.textContent = open ? `Jetzt geöffnet · bis ${close / 60}:00 Uhr` : 'Geschlossen · Mo–Fr 08–18, Sa 08–13';
  const row = document.querySelectorAll('.hours tr')[d === 0 ? 2 : d === 6 ? 1 : 0]; row && row.classList.add('is-today');
})();

// Einblenden + Zähler + aktiver Menüpunkt
const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
document.querySelectorAll('.sec__head, .split__media, .split__text, .why div, .quote, .q, .post, .card').forEach(el => el.classList.add('rv'));
const io = new IntersectionObserver(es => es.forEach(e => {
  if (!e.isIntersecting) return;
  const sib = [...e.target.parentElement.children].filter(c => c.classList.contains('rv'));
  e.target.style.transitionDelay = Math.min(sib.indexOf(e.target), 6) * 60 + 'ms';
  e.target.classList.add('is-in'); io.unobserve(e.target);
}), { threshold: .12 });
document.querySelectorAll('.rv').forEach(el => io.observe(el));

if (!reduce) document.querySelectorAll('[data-count]').forEach(el => {
  const to = +el.dataset.count, from = el.hasAttribute('data-plain') ? to - 30 : 0, t0 = performance.now();
  const step = t => { const k = Math.min((t - t0) / 1400, 1), v = Math.round(from + (to - from) * (1 - Math.pow(1 - k, 3))); el.textContent = v; k < 1 && requestAnimationFrame(step); };
  requestAnimationFrame(step);
});

const links = [...nav.querySelectorAll('a')];
const spy = new IntersectionObserver(es => es.forEach(e => e.isIntersecting && links.forEach(a => a.classList.toggle('is-active', a.getAttribute('href') === '#' + e.target.id))), { rootMargin: '-45% 0px -50% 0px' });
links.forEach(a => { const s = $(a.getAttribute('href')); s && spy.observe(s); });
