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
<body>
<a class="skip" href="#main">Zum Inhalt</a>
<header class="head is-scrolled" id="head">
  <a class="logo" href="index.html" aria-label="Car Service TAN – Startseite"><img src="assets/img/logo-weiss.png" alt="Car Service TAN GmbH" width="800" height="484"></a>
  <nav class="nav" id="nav" aria-label="Hauptmenü">
    <a href="index.html#leistungen">Leistungen</a>
    <a href="index.html#lack">Lackierung</a>
    <a href="index.html#halle">Betrieb</a>
    <a href="index.html#stimmen">Kundenstimmen</a>
    <a href="index.html#kontakt">Kontakt</a>
  </nav>
  <a class="btn btn--line" href="tel:+4921198911188">Termin</a>
  <button class="burger" id="burger" aria-label="Menü öffnen" aria-expanded="false" aria-controls="nav"><span></span><span></span><span></span></button>
</header>
<main id="main">
  <section class="subhero"><div class="narrow"><p class="eyebrow">{{EYE}}</p><h1>{{TITLE}}</h1></div></section>
  <article class="narrow prose">
{{BODY}}
    <p class="back"><a class="btn btn--line" href="index.html">← Zur Startseite</a></p>
  </article>
</main>
<footer class="foot">
  <img src="assets/img/logo-weiss.png" alt="Car Service TAN GmbH" width="800" height="484" loading="lazy">
  <nav aria-label="Rechtliches"><a href="impressum.html">Impressum</a><a href="datenschutz.html">Datenschutz</a></nav>
  <small>© 2026 Tan GmbH · Tichauer Weg 21 · 40231 Düsseldorf</small>
</footer>
<script>
const n=document.getElementById('nav'),b=document.getElementById('burger');
b.onclick=()=>{const o=!n.classList.contains('is-open');n.classList.toggle('is-open',o);b.setAttribute('aria-expanded',o);};
</script>
</body>
</html>
