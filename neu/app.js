const $ = (s, r = document) => r.querySelector(s);
const src = n => `assets/img/${n}.jpg`;
const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ---------- Videoflächen: MP4 wenn vorhanden, sonst echtes Foto ---------- */
// Welche Medien schon da sind, steht in data.js (MEDIA), damit nichts ins Leere lädt.
const hasVideo = async name => MEDIA.videos.includes(name);
const mkVideo = (name, poster) => Object.assign(document.createElement('video'), { src: `assets/video/${name}.mp4`, poster: poster || '', muted: true, loop: true, playsInline: true, preload: 'metadata' });

document.querySelectorAll('.vid').forEach(async box => {
  const clips = box.dataset.clips.split(','), posters = box.dataset.posters.split(',');
  const els = posters.map((p, i) => box.appendChild(Object.assign(new Image(), { src: src(p), alt: '', className: i ? '' : 'is-on' })));
  box._els = els; box._show = i => { els.forEach((e, k) => { e.classList.toggle('is-on', k === i); if (e.tagName === 'VIDEO') k === i && !box._paused ? e.play().catch(() => {}) : e.pause(); }); };
  await Promise.all(clips.map(async (c, i) => {
    if (reduce || !(await hasVideo(c))) return;
    const v = mkVideo(c, src(posters[i] || posters[0])); v.className = els[i] ? els[i].className : '';
    els[i] ? els[i].replaceWith(v) : box.appendChild(v); els[i] = v;
  }));
  const io = new IntersectionObserver(([e]) => { box._vis = e.isIntersecting; els.forEach(el => { if (el.tagName === 'VIDEO') e.isIntersecting && el.classList.contains('is-on') && !box._paused ? el.play().catch(() => {}) : el.pause(); }); }, { threshold: .15 });
  io.observe(box);
  box.dispatchEvent(new Event('ready'));
});

/* ---------- Hero: Clips wechseln, Punkte, Pause ---------- */
(() => {
  const box = $('#heroVid'), dots = $('#heroDots'), pp = $('#heroPP');
  const n = box.dataset.posters.split(',').length; let cur = 0, t;
  dots.innerHTML = Array.from({ length: n }, (_, i) => `<button aria-label="Szene ${i + 1}"${i ? '' : ' class="is-on"'}></button>`).join('');
  const go = i => { cur = (i + n) % n; box._show && box._show(cur); [...dots.children].forEach((d, k) => d.classList.toggle('is-on', k === cur)); arm(); };
  const arm = () => { clearTimeout(t); if (!box._paused && !reduce) t = setTimeout(() => go(cur + 1), 9000); };
  dots.addEventListener('click', e => { const i = [...dots.children].indexOf(e.target); i >= 0 && go(i); });
  pp.onclick = () => { box._paused = !box._paused; pp.classList.toggle('is-paused', box._paused); pp.setAttribute('aria-label', box._paused ? 'Video abspielen' : 'Video anhalten'); box.classList.toggle('is-paused', box._paused); box._els.forEach(e => e.style.animationPlayState = box._paused ? 'paused' : ''); go(cur); };
  box.addEventListener('ready', () => go(0));
})();

/* ---------- Leistungen: Kacheln + Liste + Detail ---------- */
const sheet = $('#sheet');
const openSvc = i => { const s = SERVICES[i]; $('#sheetImg').src = src(s.img); $('#sheetTitle').textContent = s.t + (s.sub ? ' – ' + s.sub : ''); $('#sheetText').innerHTML = s.html; sheet.showModal(); };
$('#sheetX').onclick = () => sheet.close();
sheet.addEventListener('click', e => e.target === sheet && sheet.close());

const TILES = [0, 5, 3, 8];
$('#tiles').innerHTML = TILES.map(i => `<button class="tile rv" data-i="${i}" data-v="tile-${SERVICES[i].img}"><img src="${src(SERVICES[i].img)}" alt="" loading="lazy"><i></i><b>${SERVICES[i].t}</b></button>`).join('');
document.querySelectorAll('.tile').forEach(async t => {
  t.onclick = () => openSvc(+t.dataset.i);
  if (reduce || !(await hasVideo(t.dataset.v))) return;
  const v = t.insertBefore(mkVideo(t.dataset.v), t.querySelector('i'));
  const on = () => { t.classList.add('is-play'); v.play().catch(() => {}); }, off = () => { t.classList.remove('is-play'); v.pause(); };
  t.addEventListener('mouseenter', on); t.addEventListener('mouseleave', off); t.addEventListener('focus', on); t.addEventListener('blur', off);
});

$('#rows').innerHTML = SERVICES.map((s, i) => `<button class="row" data-i="${i}">${s.t}<span>→</span></button>`).join('');
const peek = $('#peek'), peekImg = peek.firstElementChild;
$('#rows').addEventListener('click', e => { const r = e.target.closest('.row'); r && openSvc(+r.dataset.i); });
$('#rows').addEventListener('mouseover', e => { const r = e.target.closest('.row'); if (!r) return; peekImg.src = src(SERVICES[r.dataset.i].img); peek.classList.add('is-on'); });
$('#rows').addEventListener('mouseleave', () => peek.classList.remove('is-on'));
$('#rows').addEventListener('mousemove', e => { peek.style.left = Math.min(e.clientX + 200, innerWidth - 150) + 'px'; peek.style.top = e.clientY + 'px'; });

/* ---------- Lackier-Schieber ---------- */
(() => {
  const ba = $('#ba'), range = $('#baRange'), cv = $('#baMist'), ctx = cv.getContext('2d');
  const COLORS = [['Blau', '#0b4b8a', 'none'], ['Rot', '#b3161b', 'hue-rotate(142deg) saturate(1.9) brightness(1.12)'], ['Grün', '#0f6b3c', 'hue-rotate(-72deg) saturate(.9)'], ['Orange', '#e56d18', 'hue-rotate(172deg) saturate(1.5) brightness(1.55)'], ['Schwarz', '#14171c', 'saturate(0) brightness(.38) contrast(1.25)']];
  let pos = 8, last = 8, parts = [], raf, paint = COLORS[0][1], touched = false;
  $('#swatches').innerHTML = COLORS.map((c, i) => `<button style="background:${c[1]}" aria-label="${c[0]}" data-i="${i}"${i ? '' : ' class="is-on"'}></button>`).join('');
  $('#swatches').addEventListener('click', e => { const b = e.target.closest('button'); if (!b) return; const c = COLORS[b.dataset.i]; paint = c[1]; ba.style.setProperty('--paint', c[1]); ba.style.setProperty('--tint', c[2]); [...$('#swatches').children].forEach(x => x.classList.toggle('is-on', x === b)); burst(40); });
  const size = () => { const r = ba.getBoundingClientRect(); cv.width = r.width; cv.height = r.height; };
  addEventListener('resize', size); size();
  const burst = n => { if (reduce) return; const x = cv.width * pos / 100; for (let i = 0; i < n; i++) parts.push({ x: x + (Math.random() - .3) * 14, y: Math.random() * cv.height, vx: 1 + Math.random() * 3.5, vy: (Math.random() - .5) * 1.2, r: 2 + Math.random() * 16, a: .28 + Math.random() * .3 }); if (!raf) raf = requestAnimationFrame(draw); };
  const draw = () => {
    ctx.clearRect(0, 0, cv.width, cv.height);
    parts = parts.filter(p => p.a > .01);
    for (const p of parts) { p.x += p.vx; p.y += p.vy; p.r += .5; p.a *= .93; const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r); g.addColorStop(0, paint); g.addColorStop(1, 'transparent'); ctx.globalAlpha = p.a; ctx.fillStyle = g; ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, 7); ctx.fill(); }
    ctx.globalAlpha = 1; raf = parts.length ? requestAnimationFrame(draw) : 0;
  };
  const set = (v, quiet) => { pos = Math.max(0, Math.min(100, v)); ba.style.setProperty('--pos', pos + '%'); if (!quiet) range.value = pos; if (pos > last) burst(Math.min(26, 6 + (pos - last) * 5)); last = pos; };
  range.addEventListener('input', () => { touched = true; set(+range.value, true); });
  // einmalige Vorführung beim ersten Sichtkontakt
  new IntersectionObserver(([e], o) => {
    if (!e.isIntersecting) return; o.disconnect(); size(); if (reduce) return set(55);
    const t0 = performance.now(), run = t => { if (touched) return; const k = Math.min((t - t0) / 2600, 1), ease = k < .5 ? 2 * k * k : 1 - Math.pow(-2 * k + 2, 2) / 2; set(8 + ease * 52); k < 1 && requestAnimationFrame(run); };
    requestAnimationFrame(run);
  }, { threshold: .45 }).observe(ba);
  // echte Vorher/Nachher-Bilder verwenden, sobald sie da sind
  if (MEDIA.lack) { ba.classList.add('ba--real'); const set2 = (el, n) => { el.srcset = `${src(n + '-1800')} 1800w, ${src(n)} 3840w`; el.sizes = '(max-width: 1328px) 100vw, 1280px'; el.src = src(n); }; set2(ba.querySelector('.ba__before'), 'lack-vorher'); ba.querySelectorAll('#baAfter img').forEach(i => set2(i, 'lack-nachher')); }
})();

/* ---------- Kopfzeile, Menü, Einblenden, Zähler ---------- */
const head = $('#head'), nav = $('#nav'), burger = $('#burger');
addEventListener('scroll', () => head.classList.toggle('is-scrolled', scrollY > 30), { passive: true });
burger.onclick = () => { const o = !nav.classList.contains('is-open'); nav.classList.toggle('is-open', o); burger.setAttribute('aria-expanded', o); };
nav.addEventListener('click', e => e.target.tagName === 'A' && nav.classList.remove('is-open'));

document.querySelectorAll('.sec h2, .sec .eyebrow, .ba, .lack__list li, .split__txt>*, .row, .quotes figure, .band__in>*, .contact__in>*').forEach(el => el.classList.add('rv'));
const io = new IntersectionObserver(es => es.forEach(e => {
  if (!e.isIntersecting) return;
  const sib = [...e.target.parentElement.children].filter(c => c.classList.contains('rv'));
  e.target.style.transitionDelay = Math.min(sib.indexOf(e.target), 8) * 55 + 'ms';
  e.target.classList.add('is-in'); io.unobserve(e.target);
  e.target.querySelectorAll('[data-count]').forEach(count); e.target.matches('[data-count]') && count(e.target);
}), { threshold: .1 });
document.querySelectorAll('.rv').forEach(el => io.observe(el));
function count(el) {
  if (reduce || el._c) return; el._c = 1; const to = +el.dataset.count, t0 = performance.now();
  const step = t => { const k = Math.min((t - t0) / 1400, 1); el.textContent = Math.round(to * (1 - Math.pow(1 - k, 3))); k < 1 && requestAnimationFrame(step); };
  requestAnimationFrame(step);
}
