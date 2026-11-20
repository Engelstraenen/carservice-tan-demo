# PROJEKT-MASTERFILE – CARSERVICE-TAN
Gilt zusätzlich zur globalen Masterfile (~/.claude/CLAUDE.md).

## 1. Ziel und Endprodukt
Zwei Design-Entwürfe für carservicetan.de (Tan GmbH, Lackiermeisterfachbetrieb, Tichauer Weg 21, 40231 Düsseldorf):
1. `modern/` – modernisierte Fassung der bestehenden Seite (gleiche Inhalte, neues Design). Fertig 18.11.2026.
2. `neu/` – komplett neue Seite als MEHRSEITEN-Auftritt (24 Seiten): Start, Leistungsübersicht, eine Unterseite je Leistung (12) mit durchlaufendem Video oben, Über uns, Ersatzfahrzeuge, Galerie, Ratgeber (+2 Artikel), FAQ, Kontakt, Impressum, Datenschutz. Wird aus `neu/build.py` erzeugt.

## 2. Qualitätsanspruch & Referenzen
Quelle aller Inhalte: https://carservicetan.de (WordPress, Theme von inoya). Markenfarben: Blau #0b4b8a, Cyan #00aeef, Logo orange/blau. Schrift: Mulish (lokal).

## 3. Regeln für dieses Projekt
- Entwürfe tragen `noindex` und „Design-Entwurf“ im Seitentitel. Tan GmbH ist ein Kollege von Eugen: Seite wird ihm geschenkt, Eugen will sie als Referenz zeigen. Muss komplett sein (eigenes Impressum, Datenschutz, Ratgeber), keine Links zur alten Seite.
- Kein Zugriff auf das echte WordPress; Live-Domain nur nach OK.
- KEIN ONE-PAGER (Eugen 19.11.2026): wirkt billig. Jeder Punkt der Originalseite bekommt eine eigene Unterseite, jede Leistungsseite ein durchlaufendes Video, auf dem sichtbar etwas passiert (nicht nur leichter Zoom).
- GRUNDRISS (Eugen 19.11.2026, endgültig): Hinter dem großen Tor liegt sofort die riesige freie Hallenfläche (links), rechts die Türenreihe/das weiße Häuschen. Im Hallenfoto `carservicetan-halle.jpg` ist das Tor RECHTS, wo das helle Licht hereinkommt, neben dem weißen Häuschen. Der Hallen-Film aus diesem Foto ist der Maßstab für den Look. Kein eigener Gang.
- Echte Halle, echtes Gebäude mit Logo in Videos und Bildern (Quellen in `neu/quellen/`). Hero-Testfilm 1 (nur leichte Fahrt) war Eugen zu wenig.
- Prüfen nur unsichtbar: `node tools/shot.mjs <ordner> 1440x900 <urls>` (Chrome headless, Ganzseiten-Fotos + Konsolenfehler). Nie Seiten auf Eugens Mac öffnen, auch nicht das Browser-Panel.
- Leere Originalseiten (Glas, Reifen, Oldtimer, Trockeneis) haben von Claude geschriebene Kurztexte: vor Livegang vom Betrieb bestätigen lassen.
- Fotos stammen von carservicetan.de; die Motive aus 2025/01 (Dellen, Glas, Reifen, Gutachten) sind vermutlich Stockfotos, vor Livegang Rechte klären oder ersetzen.
- LEISTUNGSFILME NUR NACH RECHERCHE (Eugen 19.11.2026): Jeder Leistungsfilm zeigt den echten Arbeitsschritt so, wie er in Fachbetrieben gemacht wird. Vor jedem Startbild 2–3 echte Werkstattvideos ansehen und den Ablauf in `verlauf/` festhalten. Felgen = Glanzdrehen auf CNC-Drehmaschine (Tür zu, Meißel, Späne), nie Flex/Schleifen.
- BILDER FÜR EUGEN NUR AUS DEM PROJEKTORDNER (Fehler 20.11.2026): Kontaktbogen aus dem Scratchpad kam nicht an. Vorschauen liegen in `neu/drafts/start/vorschau_*.jpg`, von dort einzeln mit Nummer schicken.
- Telefon-Link der Originalseite ist fehlerhaft (tel:0049121198911188), hier korrigiert auf +4921198911188.

## 4. Skills, Plugins, Agenten, MCP
| Name | wofür |
|---|---|
| sjinn.ai (Chrome, Unlimited) | Storyboards, Bilder, Videos |

## 5. Zugänge
GitHub (Engelstraenen) vorhanden · sjinn.ai in Chrome eingeloggt · WordPress-Zugang carservicetan.de fehlt (nur für Livegang nötig).

## 6. Workflow & Freigabepunkte
Storyboards A/B/C zeigen → Eugen wählt → 4K-Bilder/Videos erzeugen → `neu/` bauen → Screenshot-Vergleich mit Storyboard → pushen.

## 7. Befehle
- Lokal: `cd modern && python3 -m http.server 4471` → http://127.0.0.1:4471 · `cd neu && python3 -m http.server 4472` → http://127.0.0.1:4472 (Port 4350 gehört LICHTBOGEN)
- Neue Seite bauen: `cd neu && python3 build.py` (Inhalte in build.py, Rechtstexte in `neu/_texte/`, `V` hochzählen gegen Cache). Fertige Videos als `neu/assets/video/<name>.mp4` ablegen und in `neu/data.js` (MEDIA.videos) eintragen: hero-tor, hero-halle, halle, svc-<slug>.
- Veröffentlichen: `git push origin main && git push origin main:gh-pages`
- Online: https://engelstraenen.github.io/carservice-tan-demo/

## 8. Offene Fragen
- Echte Fotos/Videos vom Betrieb verfügbar? Datenschutztext stammt von der alten WordPress-Seite und muss vor Livegang an die neue Technik angepasst werden.

## 9. Entschieden
- 18.11.2026: Fassung 1 als statischer One-Pager (HTML/CSS/JS, keine Abhängigkeiten).
- 18.11.2026: Neue Seite = Storyboard B WERKHALLE (GPT) + Lackier-Schieber (Idee aus A). Echte Halle und echtes Logo sind Pflicht.
- 19.11.2026: Neue Seite wird Mehrseiten-Auftritt statt One-Pager; Lackier-Schieber mit echtem Bildpaar aus der Kabine + Farbwahl.
- 19.11.2026: Hero abgenommen („Passt“): `hero-einfahrt_v1` = echte Tor-Fahrt mit Logo → Weißblende im Tor → Hallen-Clip aus dem echten Hallenfoto rückwärts, endet auf dem echten Hallenbild. Weg für echte Innenräume: Clip vom echten Foto hinaus ins Licht erzeugen und rückwärts setzen.
- 19.11.2026: Felgen-Film = Glanzdrehen in der CNC-Drehmaschine, Startbild 1 (Nahaufnahme im Maschinenraum, `neu/drafts/start/start_felge-v1_4k.jpg`). Erster Entwurf (silberne Felge, nichts passiert) verworfen.
- 20.11.2026: Felgen-Film v2 abgenommen („Ja, auf die Seite“): `neu/assets/video/svc-felgenreparatur.mp4` (MiniMax H3 Unlimited 768P, 1344×768, 10 s). Bekannte Abweichung: auch das Felgenbett wird blank.
- 20.11.2026: Beulendoktor-Film v1 abgenommen („Ja, auf die Seite“): `neu/assets/video/svc-beulendoktor.mp4` (MiniMax H3 Unlimited 768P, 10 s, LED-Linienlampe + Drückstange, Reflexlinien werden gerade; kleiner Rest am Ende).

## 10. Ablage
Repo: github.com/Engelstraenen/carservice-tan-demo. Zielordner: Dropbox/CLAUDE/Projekte/CARSERVICE-TAN (noch nicht verschoben).
