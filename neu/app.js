const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const src = n => `assets/img/${n}.jpg`;
const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
const hasVideo = name => MEDIA.videos.includes(name);
const mkVideo = (name, poster) => Object.assign(document.createElement('video'), { src: `assets/video/${name}.mp4`, poster: poster || '', muted: true, loop: true, playsInline: true, preload: 'metadata' });

/* ---------- Videoflächen: MP4 wenn vorhanden (MEDIA in data.js), sonst echtes Foto mit langsamer Fahrt ---------- */
$$('.vid').forEach(box => {
  const clips = box.dataset.clips.split(','), posters = box.dataset.posters.split(',');
  const els = posters.map((p, i) => {
    const c = clips[i] || clips[0];
    const el = !reduce && hasVideo(c) ? mkVideo(c, src(p)) : Object.assign(new Image(), { src: src(p), alt: '' });
    if (!i) el.className = 'is-on';
    return box.appendChild(el);
  });
  box._els = els;
  const sync = () => els.forEach(e => { if (e.tagName === 'VIDEO') e.classList.contains('is-on') && box._vis && !box._paused ? e.play().catch(() => {}) : e.pause(); else e.style.animationPlayState = box._paused ? 'paused' : ''; });
  box._show = i => { els.forEach((e, k) => e.classList.toggle('is-on', k === i)); sync(); };
  box._pause = p => { box._paused = p; sync(); };
  new IntersectionObserver(([e]) => { box._vis = e.isIntersecting; sync(); }, { threshold: .1 }).observe(box);
});

/* ---------- Pause-Knopf je Hero ---------- */
$$('.hero').forEach(hero => {
  const box = $('.vid', hero), pp = $('.pp', hero); if (!box || !pp) return;
  const dots = $('.dots', hero), n = box._els.length; let cur = 0, t;
  const seq = n > 1 && box._els.every(e => e.tagName === 'VIDEO');
  const arm = () => { clearTimeout(t); if (n > 1 && !seq && !box._paused && !reduce) t = setTimeout(() => go(cur + 1), box._els[cur].tagName === 'VIDEO' ? 10000 : 6000); };
  const go = i => { cur = (i + n) % n; const v = box._els[cur]; if (seq) v.currentTime = 0; box._show(cur); dots && [...dots.children].forEach((d, k) => d.classList.toggle('is-on', k === cur)); arm(); };
  if (dots && n > 1) { dots.innerHTML = box._els.map((_, i) => `<button aria-label="Szene ${i + 1}"${i ? '' : ' class="is-on"'}></button>`).join(''); dots.addEventListener('click', e => { const i = [...dots.children].indexOf(e.target); i >= 0 && go(i); }); }
  if (seq) box._els.forEach((v, k) => { v.loop = false; v.preload = 'auto'; v.addEventListener('ended', () => k === cur && go(cur + 1)); });
  pp.onclick = () => { const p = !box._paused; box._pause(p); pp.classList.toggle('is-paused', p); pp.setAttribute('aria-label', p ? 'Video abspielen' : 'Video anhalten'); arm(); };
  arm();
});

/* ---------- Kacheln und Karten: Video bei Hover, wenn vorhanden ---------- */
$$('[data-v]').forEach(t => {
  if (reduce || !hasVideo(t.dataset.v)) return;
  const v = t.insertBefore(mkVideo(t.dataset.v), t.querySelector('i'));
  const on = () => { t.classList.add('is-play'); v.play().catch(() => {}); }, off = () => { t.classList.remove('is-play'); v.pause(); };
  t.addEventListener('mouseenter', on); t.addEventListener('mouseleave', off); t.addEventListener('focus', on); t.addEventListener('blur', off);
});

/* ---------- Leistungsliste mit Vorschaubild ---------- */
(() => {
  const rows = $('#rows'), peek = $('#peek'); if (!rows || !peek) return;
  const pi = peek.firstElementChild;
  rows.addEventListener('mouseover', e => { const r = e.target.closest('.row'); if (!r) return; pi.src = r.dataset.img; peek.classList.add('is-on'); });
  rows.addEventListener('mouseleave', () => peek.classList.remove('is-on'));
  rows.addEventListener('mousemove', e => { peek.style.left = Math.min(e.clientX + 200, innerWidth - 150) + 'px'; peek.style.top = e.clientY + 'px'; });
})();

/* ---------- Lackier-Schieber ---------- */
(() => {
  const ba = $('#ba'); if (!ba) return;
  const range = $('#baRange'), cv = $('#baMist'), ctx = cv.getContext('2d'), sw = $('#swatches');
  const COLORS = [['Blau', '#0b4b8a', 'none'], ['Rot', '#b3161b', 'hue-rotate(142deg) saturate(1.9) brightness(1.12)'], ['Grün', '#0f6b3c', 'hue-rotate(-72deg) saturate(.9)'], ['Orange', '#e56d18', 'hue-rotate(172deg) saturate(1.5) brightness(1.55)'], ['Schwarz', '#14171c', 'saturate(0) brightness(.38) contrast(1.25)']];
  let pos = 8, last = 8, parts = [], raf, paint = COLORS[0][1], touched = false;
  sw.innerHTML = COLORS.map((c, i) => `<button style="background:${c[1]}" aria-label="${c[0]}" data-i="${i}"${i ? '' : ' class="is-on"'}></button>`).join('');
  sw.addEventListener('click', e => { const b = e.target.closest('button'); if (!b) return; const c = COLORS[b.dataset.i]; paint = c[1]; ba.style.setProperty('--paint', c[1]); ba.style.setProperty('--tint', c[2]); [...sw.children].forEach(x => x.classList.toggle('is-on', x === b)); burst(40); });
  const size = () => { const r = ba.getBoundingClientRect(); cv.width = r.width; cv.height = r.height; };
  addEventListener('resize', size); size();
  const burst = n => { if (reduce) return; const x = cv.width * pos / 100; for (let i = 0; i < n; i++) parts.push({ x: x + (Math.random() - .3) * 14, y: Math.random() * cv.height, vx: 1 + Math.random() * 3.5, vy: (Math.random() - .5) * 1.2, r: 2 + Math.random() * 16, a: .28 + Math.random() * .3 }); if (!raf) raf = requestAnimationFrame(draw); };
  const draw = () => {
    ctx.clearRect(0, 0, cv.width, cv.height); parts = parts.filter(p => p.a > .01);
    for (const p of parts) { p.x += p.vx; p.y += p.vy; p.r += .5; p.a *= .93; const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r); g.addColorStop(0, paint); g.addColorStop(1, 'transparent'); ctx.globalAlpha = p.a; ctx.fillStyle = g; ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, 7); ctx.fill(); }
    ctx.globalAlpha = 1; raf = parts.length ? requestAnimationFrame(draw) : 0;
  };
  const set = (v, quiet) => { pos = Math.max(0, Math.min(100, v)); ba.style.setProperty('--pos', pos + '%'); if (!quiet) range.value = pos; if (pos > last) burst(Math.min(26, 6 + (pos - last) * 5)); last = pos; };
  range.addEventListener('input', () => { touched = true; set(+range.value, true); });
  new IntersectionObserver(([e], o) => {
    if (!e.isIntersecting) return; o.disconnect(); size(); if (reduce) return set(55);
    const t0 = performance.now(), run = t => { if (touched) return; const k = Math.min((t - t0) / 2600, 1), ease = k < .5 ? 2 * k * k : 1 - Math.pow(-2 * k + 2, 2) / 2; set(8 + ease * 52); k < 1 && requestAnimationFrame(run); };
    requestAnimationFrame(run);
  }, { threshold: .45 }).observe(ba);
})();

/* ---------- Galerie: Filter + Großansicht (auch für Bildstreifen) ---------- */
(() => {
  const light = $('#light'), li = $('#lightImg'), cap = $('#lightCap'); let set = [], cur = 0;
  const show = i => { cur = (i + set.length) % set.length; li.src = set[cur].dataset.src; li.alt = cap.textContent = set[cur].dataset.cap || ''; };
  document.addEventListener('click', e => {
    const b = e.target.closest('button[data-src]'); if (!b) return;
    set = $$('button[data-src]', b.parentElement).filter(x => !x.classList.contains('is-hid')); show(set.indexOf(b)); light.showModal();
  });
  $('#lightX').onclick = () => light.close(); $('#lightP').onclick = () => show(cur - 1); $('#lightN').onclick = () => show(cur + 1);
  light.addEventListener('click', e => e.target === light && light.close());
  light.addEventListener('keydown', e => { if (e.key === 'ArrowRight') show(cur + 1); if (e.key === 'ArrowLeft') show(cur - 1); });
  const chips = $('#chips'); if (!chips) return;
  chips.addEventListener('click', e => { const c = e.target.closest('button'); if (!c) return; [...chips.children].forEach(x => x.classList.toggle('is-on', x === c)); $$('#gal button').forEach(b => { const hid = c.dataset.f !== 'alle' && b.dataset.k !== c.dataset.f; b.classList.toggle('is-hid', hid); hid || b.classList.add('is-in'); }); });
})();

/* ---------- Kopfzeile, Menü, Einblenden, Zähler ---------- */
const head = $('#head'), nav = $('#nav'), burger = $('#burger');
const onScroll = () => head.classList.toggle('is-scrolled', scrollY > 30 || !$('.hero')); onScroll();
addEventListener('scroll', onScroll, { passive: true });
burger.onclick = () => { const o = !nav.classList.contains('is-open'); nav.classList.toggle('is-open', o); burger.setAttribute('aria-expanded', o); document.body.style.overflow = o ? 'hidden' : ''; };

$$('.sec h2, .sec .eyebrow, .sec .lead, .detail__txt>p, .ticks li, .split__txt>*, .row, .band__in>*, .cta-band__in>*, .lack__list li').forEach(el => el.classList.add('rv'));
const io = new IntersectionObserver(es => es.forEach(e => {
  if (!e.isIntersecting) return;
  const sib = [...e.target.parentElement.children].filter(c => c.classList.contains('rv'));
  e.target.style.transitionDelay = Math.min(sib.indexOf(e.target), 8) * 55 + 'ms';
  e.target.classList.add('is-in'); io.unobserve(e.target);
  $$('[data-count]', e.target).forEach(count); e.target.matches('[data-count]') && count(e.target);
}), { threshold: .08 });
$$('.rv').forEach(el => io.observe(el));
$$('.detail__card [data-count]').forEach(el => new IntersectionObserver(([e], o) => { if (e.isIntersecting) { count(el); o.disconnect(); } }).observe(el));
function count(el) {
  if (reduce || el._c) return; el._c = 1; const to = +el.dataset.count, from = to > 1900 && to < 2100 ? to - 30 : 0, t0 = performance.now();
  const step = t => { const k = Math.min((t - t0) / 1400, 1); el.textContent = Math.round(from + (to - from) * (1 - Math.pow(1 - k, 3))); k < 1 && requestAnimationFrame(step); };
  requestAnimationFrame(step);
}

/* ---------- Terminformular: prüfen, dann fertige E-Mail öffnen ---------- */
(() => {
  const f = $('#terminForm'); if (!f) return;
  const el = n => f.elements[n], box = n => el(n).closest('.f, .check');
  const pad = n => String(n).padStart(2, '0'), d0 = new Date(), today = `${d0.getFullYear()}-${pad(d0.getMonth() + 1)}-${pad(d0.getDate())}`;
  el('datum').min = today;
  const slug = new URLSearchParams(location.search).get('leistung');
  if (slug) { const o = [...el('leistung').options].find(o => o.dataset.slug === slug); if (o) el('leistung').value = o.value; }
  const zeitBox = f.querySelector('[role=radiogroup]');
  const check = () => {
    const errs = [];
    const mark = (b, bad, msg) => { b.classList.toggle('is-err', bad); if (bad) { if (msg) { const e = b.querySelector('.err'); e && (e.textContent = msg); } errs.push(b); } };
    mark(box('leistung'), !el('leistung').value);
    mark(box('name'), el('name').value.trim().length < 2);
    mark(box('telefon'), !/^[0-9 +()\/-]{6,}$/.test(el('telefon').value.trim()));
    mark(box('email'), !!el('email').value.trim() && !el('email').checkValidity());
    const v = el('datum').value, day = v ? new Date(v + 'T12:00').getDay() : -1;
    mark(box('datum'), !v || v < today || day === 0, !v || v < today ? 'Bitte einen Tag ab heute wählen.' : 'Sonntags ist geschlossen. Bitte einen anderen Tag wählen.');
    const zeit = f.querySelector('[name=zeit]:checked').value;
    mark(zeitBox, day === 6 && zeit === 'Nachmittag', 'Samstags sind wir bis 13 Uhr da. Bitte Vormittag wählen.');
    mark(el('ds').closest('.check'), !el('ds').checked);
    return errs;
  };
  f.addEventListener('submit', e => {
    e.preventDefault();
    const errs = check(); f.dataset.tried = '1';
    if (errs.length) { const first = errs[0].querySelector('input,select,textarea') || errs[0]; first.focus({ preventScroll: true }); errs[0].scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'center' }); return; }
    const v = el('datum').value.split('-'), datum = `${v[2]}.${v[1]}.${v[0]}`, zeit = f.querySelector('[name=zeit]:checked').value;
    const body = [`Leistung: ${el('leistung').value}`, `Wunschtermin: ${datum}, ${zeit}`, `Name: ${el('name').value.trim()}`, `Telefon: ${el('telefon').value.trim()}`, el('email').value.trim() && `E-Mail: ${el('email').value.trim()}`, el('fahrzeug').value.trim() && `Fahrzeug: ${el('fahrzeug').value.trim()}`, `Ersatzfahrzeug: ${el('ersatz').checked ? 'ja' : 'nein'}`, el('nachricht').value.trim() && `\nNachricht:\n${el('nachricht').value.trim()}`, '\nDatenschutzhinweis gelesen und akzeptiert.'].filter(Boolean).join('\n');
    const url = `mailto:info@carservicetan.de?subject=${encodeURIComponent(`Terminanfrage: ${el('leistung').value} am ${datum} (${zeit})`)}&body=${encodeURIComponent(body)}`;
    f.dataset.mailto = url;
    $('.form__ok', f).hidden = false;
    location.href = url;
  });
  f.addEventListener('input', () => f.dataset.tried && check());
  f.addEventListener('change', () => f.dataset.tried && check());
})();
