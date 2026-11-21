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
- 20.11.2026: Startbilder für Lackiererei, Fahrzeugaufbereitung, Oldtimer-Restauration, Trockeneis-Strahlen, Gutachten freigegeben („Alle 5 freigeben“). Prompts in `neu/drafts/prompts/filme_ab_20-11.md`. Reihenfolge (gratis, je Modell 2/Tag): 20.11 Smart Repair + Glas (Wan); 21.11 Reifen + Lackiererei (MiniMax), Aufbereitung + Oldtimer (Wan); 22.11 Trockeneis + Gutachten (MiniMax).
- 20.11.2026: Leistungsfilme NUR GRATIS (Unlimited), auch wenn die Warteschlange hängt („Nein, gratis warten“). Kein bezahlter Draft ohne neue Freigabe.
- 20.11.2026: Smart Repair v1 verworfen („Nein, neu rendern“: Papier lag im Startbild über der Schadstelle, Kratzer blieb, Lackierer fuhr aus dem Bild). Neues Startbild `neu/drafts/start/start_smart-repair-v2_4k.png` freigegeben (graue Grundierstelle frei im Papierfenster, Lackierer ganz im Bild). Prompt „Smart Repair v2“ in `filme_ab_20-11.md`. Neuer Plan: 21.11 Smart Repair v2 + Reifen (MiniMax), Aufbereitung + Oldtimer (Wan, falls Glas heute durch); 22.11 Lackiererei + Trockeneis (MiniMax), Gutachten (Wan).
- 21.11.2026: Glas v1 und Reifen v1 abgenommen („Ja, beide drauf“): `neu/assets/video/svc-glasreparatur.mp4` (Wan 3.0 Unlimited 480P, 854×480, 10 s, PU-Kleberaupe an der Scheibenkante + Saugheber; Raupe eher dünn, zwei Saugheber schon ab Start auf dem Glas) und `neu/assets/video/svc-reifendienst.mp4` (MiniMax H3 Unlimited 768P, 1344×768, 10 s, Rad heranrollen, aufsetzen, Schlagschrauber).
- 21.11.2026: Smart Repair v2 misslungen (sprüht neben das Papierfenster, graue Stelle bleibt, Kamera fährt stark heran). Startbild v3 als Nahaufnahme erzeugt (`neu/drafts/start/start_smart-repair-v3_4k.png`, Düse zielt auf die mittige graue Stelle) und freigegeben („Ja, freigeben“). Neuer Plan: 22.11 Smart Repair v3 + Lackiererei (MiniMax), Gutachten (Wan); 23.11 Trockeneis (MiniMax). Aufbereitung + Oldtimer (Wan) sobald der Wan-Slot frei ist. Prompt „Smart Repair v3“ in `filme_ab_20-11.md`.

## 10. Ablage
Repo: github.com/Engelstraenen/carservice-tan-demo. Zielordner: Dropbox/CLAUDE/Projekte/CARSERVICE-TAN (noch nicht verschoben).
