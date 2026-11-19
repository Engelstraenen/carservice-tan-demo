// Unsichtbare Ganzseiten-Bildschirmfotos über Chrome headless (kein Fenster auf dem Mac).
// Aufruf: node tools/shot.mjs <ausgabeordner> <breite>x<höhe> <url> [<url> ...]
import { spawn } from 'node:child_process';
import { writeFileSync, mkdtempSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
const [out, size, ...urls] = process.argv.slice(2); const [W, H] = size.split('x').map(Number);
const port = 9400 + Math.floor(Math.random() * 400);
const chrome = spawn('/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', ['--headless=new', '--disable-gpu', '--hide-scrollbars', '--mute-audio', `--remote-debugging-port=${port}`, `--user-data-dir=${mkdtempSync(join(tmpdir(), 'shot-'))}`, 'about:blank'], { stdio: 'ignore' });
const sleep = ms => new Promise(r => setTimeout(r, ms));
let ws, id = 0; const wait = new Map(), errors = [];
for (let i = 0; i < 40 && !ws; i++) { await sleep(250); try { const t = await (await fetch(`http://127.0.0.1:${port}/json`)).json(); const p = t.find(x => x.type === 'page'); if (p) ws = new WebSocket(p.webSocketDebuggerUrl); } catch {} }
await new Promise(r => ws.addEventListener('open', r));
ws.addEventListener('message', e => { const m = JSON.parse(e.data); if (m.id && wait.has(m.id)) { wait.get(m.id)(m.result); wait.delete(m.id); } if (m.method === 'Runtime.exceptionThrown') errors.push(m.params.exceptionDetails.text + ' ' + (m.params.exceptionDetails.exception?.description || '')); if (m.method === 'Log.entryAdded' && m.params.entry.level === 'error') errors.push(m.params.entry.text + ' ' + (m.params.entry.url || '')); });
const send = (method, params = {}) => new Promise(r => { wait.set(++id, r); ws.send(JSON.stringify({ id, method, params })); });
await send('Page.enable'); await send('Runtime.enable'); await send('Log.enable');
await send('Emulation.setDeviceMetricsOverride', { width: W, height: H, deviceScaleFactor: 1, mobile: W < 700 });
for (const url of urls) {
  errors.length = 0; await send('Page.navigate', { url }); await sleep(1800);
  const ev = e => send('Runtime.evaluate', { expression: e, awaitPromise: true, returnByValue: true });
  const h = (await ev('document.documentElement.scrollHeight')).result.value;
  for (let y = 0; y < h; y += H * .8) { await ev(`scrollTo(0,${y})`); await sleep(160); }
  await ev('scrollTo(0,0)'); await sleep(900);
  const info = (await ev('JSON.stringify({h:document.documentElement.scrollHeight,ov:document.documentElement.scrollWidth>innerWidth,broken:[...document.images].filter(i=>i.complete&&!i.naturalWidth&&i.getAttribute("src")).length})')).result.value;
  const full = JSON.parse(info).h;
  const { data } = await send('Page.captureScreenshot', { format: 'jpeg', quality: 70, captureBeyondViewport: true, clip: { x: 0, y: 0, width: W, height: Math.min(full, 16000), scale: W < 700 ? 1 : .5 } });
  const name = url.split('/').pop().replace(/\.html.*$/, '') || 'index';
  writeFileSync(join(out, `${name}_${W}.jpg`), Buffer.from(data, 'base64'));
  console.log(name, W, info, errors.length ? 'FEHLER: ' + errors.slice(0, 3).join(' | ') : 'konsole ok');
}
ws.close(); chrome.kill();
