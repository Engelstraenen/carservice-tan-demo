<!doctype html>
<html lang="de">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex, nofollow">
<title>{{TITLE}} | Car Service TAN – Design-Entwurf</title>
<link rel="preload" href="assets/fonts/mulish.woff2" as="font" type="font/woff2" crossorigin>
<link rel="stylesheet" href="style.css">
</head>
<body class="sub">
<a class="skip" href="#main">Zum Inhalt</a>
<header class="head is-scrolled" id="head">
  <div class="wrap head__in">
    <a class="logo" href="index.html" aria-label="Car Service TAN – Startseite"><img src="assets/img/logo.png" alt="Car Service TAN" width="594" height="181"></a>
    <nav class="nav" id="nav" aria-label="Hauptmenü">
      <a href="index.html#leistungen">Leistungen</a>
      <a href="index.html#betrieb">Betrieb</a>
      <a href="index.html#ersatz">Ersatzfahrzeuge</a>
      <a href="index.html#galerie">Galerie</a>
      <a href="index.html#faq">FAQ</a>
      <a href="index.html#kontakt">Kontakt</a>
    </nav>
    <a class="btn btn--call" href="tel:+4921198911188"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6.6 10.8a15.1 15.1 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.25 11.4 11.4 0 0 0 3.6.57 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.45.57 3.6a1 1 0 0 1-.25 1z"/></svg><span>0211 989 111 88</span></a>
    <button class="burger" id="burger" aria-label="Menü öffnen" aria-expanded="false" aria-controls="nav"><span></span><span></span></button>
  </div>
</header>

<main id="main">
  <section class="subhero">
    <div class="wrap narrow">
      <p class="eyebrow">{{EYE}}</p>
      <h1>{{TITLE}}</h1>
    </div>
  </section>
  <article class="wrap narrow prose">
{{BODY}}
    <p class="back"><a class="btn btn--call" href="index.html">← Zur Startseite</a></p>
  </article>
</main>

<footer class="foot">
  <div class="wrap foot__in">
    <img src="assets/img/logo-weiss.png" alt="Car Service TAN" width="800" height="484" loading="lazy">
    <p>Seit 1996 als Car Cosmetic Tan in der Dienstleistungsbranche tätig. Angefangen mit Fahrzeugaufbereitung, erweitert um Smart Repair und Spot Repair, später um Fahrzeuglackierung.</p>
    <nav aria-label="Rechtliches"><a href="impressum.html">Impressum</a><a href="datenschutz.html">Datenschutz</a></nav>
    <small>© 2026 Tan GmbH · Tichauer Weg 21 · 40231 Düsseldorf</small>
  </div>
</footer>
<a class="callbar" href="tel:+4921198911188">Jetzt anrufen · 0211 989 111 88</a>
<script>
const n=document.getElementById('nav'),b=document.getElementById('burger');
b.onclick=()=>{const o=!n.classList.contains('is-open');n.classList.toggle('is-open',o);b.setAttribute('aria-expanded',o);};
</script>
</body>
</html>
