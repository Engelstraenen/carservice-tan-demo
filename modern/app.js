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

const GAL = [['betrieb', 'Unser Betrieb'], ['lambo', 'Kundenfahrzeug'], ['buero', 'Bürotrakt'], ['lack2', 'Lackiererei'], ['aufbereitung', 'Fahrzeugaufbereitung'], ['aussen', 'Tichauer Weg 21'], ['wasch', 'Autowaschanlage'], ['betrieb1', 'Unser Betrieb'], ['betrieb2', 'Unser Betrieb'], ['hero', 'Lackieranlage']];

const src = n => `assets/img/${n}.jpg`;

$('#services').innerHTML = SERVICES.map((s, i) => `<button class="svc rv" data-i="${i}"><img src="${src(s.img)}" alt="" loading="lazy"><i class="svc__n">${String(i + 1).padStart(2, '0')}</i><span class="svc__t"><b>${s.t}</b>${s.sub ? `<small>${s.sub}</small>` : ''}<span>Mehr erfahren →</span></span></button>`).join('');
$('#cars').innerHTML = CARS.map(c => `<article class="car rv"><h3>${c.n}</h3><div class="car__p">${c.p} € <small>/ Tag</small></div><ul>${c.f.map(x => `<li>${x}</li>`).join('')}</ul><a href="mailto:info@carservicetan.de?subject=${encodeURIComponent('Anfrage Ersatzfahrzeug ' + c.n)}">Jetzt anfragen →</a></article>`).join('');
$('#gal').innerHTML = GAL.map(([n, l]) => `<button class="rv" data-src="${src(n)}" aria-label="${l} vergrößern"><img src="${src(n)}" alt="${l}" loading="lazy"><span>${l}</span></button>`).join('');

// Leistungs-Details
const sheet = $('#sheet');
const openSvc = i => {
  const s = SERVICES[i];
  $('#sheetImg').src = src(s.img); $('#sheetTitle').textContent = s.t + (s.sub ? ' – ' + s.sub : ''); $('#sheetText').innerHTML = s.html;
  sheet.showModal();
};
$('#services').addEventListener('click', e => { const b = e.target.closest('.svc'); b && openSvc(+b.dataset.i); });
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

// Hero-Slider: alle Leistungen
const SLIDES = [
  { c: 'Lackiererei', h: 'Lackierservice auf <em>höchstem Niveau.</em>', s: 'Autolackier-Meisterfachbetrieb mit Red-Eye &amp; Multi-Air System. Lackierung aller Art von Fahrzeugen, Teilen und Objekten.', img: 'hero', svc: 0 },
  { c: 'Karosserie & Mechanik', h: 'Unfall? <em>Ein Anruf genügt.</em>', s: 'Karosseriearbeiten, Mechanik und Lack aus einer Hand. Abschleppen ist kostenlos, wenn Ihr Fahrzeug bei uns repariert wird.', img: 'betrieb1', go: '#kontakt' },
  { c: 'Smart Repair', h: 'Smart Repair: <em>schnell und günstig.</em>', s: 'Kleine Beschädigungen an jeder Art von Fahrzeugen beheben wir schnell und kostengünstig.', img: 'smart', svc: 2 },
  { c: 'Beulendoktor', h: 'Dellen raus, <em>Lack bleibt.</em>', s: 'Lackschadenfreie Ausbeultechnik: Nicht immer muss nach dem Ausbeulen nachlackiert werden.', img: 'dellen', svc: 3 },
  { c: 'Felgenreparatur', h: 'Felgen wie neu, <em>glanzgedreht.</em>', s: 'Glanzdrehen von Leichtmetallfelgen bis 22 Zoll, ab 149,- € zzgl. MwSt. Mit Hol- und Bringservice im Umkreis von 20 km.', img: 'felgen', svc: 5 },
  { c: 'Fahrzeugaufbereitung', h: 'Aufbereitung <em>bis ins Detail.</em>', s: 'Vom Motorrad bis zum LKW mit 7,5 Tonnen. Mit Trockeneis, Innenraum-Desinfektion und Ozonbehandlung.', img: 'aufbereitung', svc: 1 },
  { c: 'Glasreparatur', h: 'Scheiben <em>reparieren und tauschen.</em>', s: 'Glasreparatur und Austausch von Fahrzeugscheiben, direkt bei uns im Haus.', img: 'glas', svc: 4 },
  { c: 'Reifendienst', h: 'Reifendienst <em>und Einlagerung.</em>', s: 'Wechsel, Montage und Lagerung Ihrer Reifen an einem Ort.', img: 'reifen', svc: 6 },
  { c: 'Oldtimer', h: 'Oldtimer, <em>mit Sorgfalt restauriert.</em>', s: 'Karosserie, Lack und Aufbereitung für Ihren Klassiker, aus einer Hand.', img: 'oldtimer', svc: 7 },
  { c: 'Trockeneis-Strahlen', h: 'Sauber mit <em>Trockeneis.</em>', s: 'Schonende Reinigung ohne Wasser und ohne Rückstände.', img: 'trockeneis', svc: 8 },
  { c: 'Gutachten', h: 'Kostenvoranschlag <em>und Gutachten.</em>', s: 'Transparente Kalkulationen und qualifizierte Gutachten für Privatpersonen, Unternehmen, Versicherungen und Behörden.', img: 'gutachten', svc: 9 },
  { c: 'Fuhrparkservice', h: 'Ihr Fuhrpark <em>in besten Händen.</em>', s: 'Leasingrückgabe, Aufbereitung, Abschleppservice, Zulassung, Reifendienst und Lagerung.', img: 'halle', svc: 10 },
  { c: 'Waschanlage', h: 'Doppel-Portal- <em>Waschanlage.</em>', s: 'Moderne Waschanlage direkt in unserer Halle.', img: 'wasch', svc: 11 },
  { c: 'Ersatzfahrzeuge', h: 'Mobil bleiben, <em>ab 15 € pro Tag.</em>', s: 'Eigene Ersatzfahrzeuge für die Zeit Ihrer Reparatur, schnell und unkompliziert.', img: 'aussen', go: '#ersatz' }
];
(() => {
  const hero = $('#top'), media = $('#hMedia'), copy = $('#hCopy'), tabs = $('#hTabs'), DUR = 6000;
  let cur = 0, timer, paused = false;
  const imgs = [media.querySelector('img')];
  const img = i => imgs[i] || (imgs[i] = media.insertBefore(Object.assign(new Image(), { src: src(SLIDES[i].img), alt: SLIDES[i].c }), media.querySelector('.hero__arrows')));
  tabs.innerHTML = SLIDES.map((s, i) => `<button type="button" data-i="${i}"${i ? '' : ' class="is-on"'}>${s.c}</button>`).join('');
  const tb = [...tabs.children];
  const arm = () => { clearTimeout(timer); if (!paused && !reduce) timer = setTimeout(() => go(cur + 1), DUR); };
  const go = (n, user) => {
    const i = (n + SLIDES.length) % SLIDES.length, s = SLIDES[i];
    if (i !== cur) {
      img(i); imgs.forEach((el, k) => el && el.classList.toggle('is-on', k === i));
      copy.classList.add('is-out');
      setTimeout(() => { $('#hNum').textContent = String(i + 1).padStart(2, '0'); $('#hCat').textContent = s.c; $('#hTitle').innerHTML = s.h; $('#hSub').innerHTML = s.s; copy.classList.remove('is-out'); }, 300);
    }
    tb.forEach((b, k) => b.classList.toggle('is-on', false));
    void tabs.offsetWidth; tb[i].classList.add('is-on');
    if (user || i !== cur) tabs.scrollTo({ left: tb[i].offsetLeft - tabs.offsetLeft - 20, behavior: reduce ? 'auto' : 'smooth' });
    cur = i; img((i + 1) % SLIDES.length); arm();
  };
  const pause = p => { paused = p; hero.classList.toggle('is-paused', p); p ? clearTimeout(timer) : go(cur); };
  tabs.addEventListener('click', e => { const b = e.target.closest('button'); b && go(+b.dataset.i, true); });
  $('#hPrev').onclick = () => go(cur - 1, true); $('#hNext').onclick = () => go(cur + 1, true);
  $('#hMore').onclick = () => { const s = SLIDES[cur]; s.go ? $(s.go).scrollIntoView() : openSvc(s.svc); };
  const grid = hero.querySelector('.hero__grid');
  grid.addEventListener('mouseenter', () => pause(true)); grid.addEventListener('mouseleave', () => pause(false));
  grid.addEventListener('focusin', () => pause(true)); grid.addEventListener('focusout', () => pause(false));
  document.addEventListener('visibilitychange', () => pause(document.hidden));
  sheet.addEventListener('close', () => pause(false));
  let x0 = null;
  media.addEventListener('pointerdown', e => x0 = e.clientX);
  media.addEventListener('pointerup', e => { if (x0 !== null && Math.abs(e.clientX - x0) > 40) go(cur + (e.clientX < x0 ? 1 : -1), true); x0 = null; });
  hero.addEventListener('keydown', e => { if (e.key === 'ArrowRight') go(cur + 1, true); if (e.key === 'ArrowLeft') go(cur - 1, true); });
  img(1); arm();
})();
