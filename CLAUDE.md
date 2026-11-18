# PROJEKT-MASTERFILE – CARSERVICE-TAN
Gilt zusätzlich zur globalen Masterfile (~/.claude/CLAUDE.md).

## 1. Ziel und Endprodukt
Zwei Design-Entwürfe für carservicetan.de (Tan GmbH, Lackiermeisterfachbetrieb, Tichauer Weg 21, 40231 Düsseldorf):
1. `modern/` – modernisierte Fassung der bestehenden Seite (gleiche Inhalte, neues Design). Fertig 18.11.2026.
2. `neu/` – komplett neue Seite, etwas Scrollytelling ODER Hintergrundvideos vom Betrieb. Wartet auf Storyboard-Wahl.

## 2. Qualitätsanspruch & Referenzen
Quelle aller Inhalte: https://carservicetan.de (WordPress, Theme von inoya). Markenfarben: Blau #0b4b8a, Cyan #00aeef, Logo orange/blau. Schrift: Mulish (lokal).

## 3. Regeln für dieses Projekt
- Entwürfe tragen `noindex` und „Design-Entwurf“ im Seitentitel. Tan GmbH ist ein Kollege von Eugen: Seite wird ihm geschenkt, Eugen will sie als Referenz zeigen. Muss komplett sein (eigenes Impressum, Datenschutz, Ratgeber), keine Links zur alten Seite.
- Kein Zugriff auf das echte WordPress; Live-Domain nur nach OK.
- Leere Originalseiten (Glas, Reifen, Oldtimer, Trockeneis) haben von Claude geschriebene Kurztexte: vor Livegang vom Betrieb bestätigen lassen.
- Fotos stammen von carservicetan.de; die Motive aus 2025/01 (Dellen, Glas, Reifen, Gutachten) sind vermutlich Stockfotos, vor Livegang Rechte klären oder ersetzen.
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
- Lokal: `cd modern && python3 -m http.server 4471` → http://127.0.0.1:4471 (Port 4350 gehört LICHTBOGEN)
- Veröffentlichen: `git push origin main && git push origin main:gh-pages`
- Online: https://engelstraenen.github.io/carservice-tan-demo/

## 8. Offene Fragen
- Echte Fotos/Videos vom Betrieb verfügbar? Datenschutztext stammt von der alten WordPress-Seite und muss vor Livegang an die neue Technik angepasst werden.

## 9. Entschieden
- 18.11.2026: Fassung 1 als statischer One-Pager (HTML/CSS/JS, keine Abhängigkeiten).

## 10. Ablage
Repo: github.com/Engelstraenen/carservice-tan-demo. Zielordner: Dropbox/CLAUDE/Projekte/CARSERVICE-TAN (noch nicht verschoben).
