#!/usr/bin/env node
/* ============================================================
   Build the listening audio.

     node tools/build-audio.js

   1. Reads js/audio-scripts.js and writes tools/audio-manifest.json
   2. Runs tools/generate-audio.ps1 (offline Windows voices)
   3. Merges audio/_parts/*.wav into audio/<track>.wav

   The merged files are what the workbook plays; if they are
   missing the app falls back to the browser's own speech engine.
   ============================================================ */

const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');

const root = path.join(__dirname, '..');
const audioDir = path.join(root, 'audio');
const partsDir = path.join(audioDir, '_parts');
const manifestPath = path.join(__dirname, 'audio-manifest.json');

/* ---------- 1. manifest ---------- */
global.window = {};
require(path.join(root, 'js', 'audio-scripts.js'));
const scripts = global.window.AUDIO_SCRIPTS;

const manifest = {};
Object.keys(scripts).forEach(function (id) {
  manifest[id] = { title: scripts[id].title, rate: scripts[id].rate, lines: scripts[id].lines };
});
fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2), 'utf8');
console.log('manifest  ->', path.relative(root, manifestPath), '(' + Object.keys(manifest).length + ' tracks)');

/* ---------- 2. synthesise ---------- */
fs.mkdirSync(audioDir, { recursive: true });
fs.mkdirSync(partsDir, { recursive: true });

if (process.platform === 'win32') {
  try {
    execFileSync('powershell.exe', [
      '-NoProfile', '-ExecutionPolicy', 'Bypass',
      '-File', path.join(__dirname, 'generate-audio.ps1')
    ], { stdio: 'inherit', cwd: root });
  } catch (e) {
    console.error('\nPowerShell synthesis failed — the workbook will use the browser voice instead.');
    console.error(e.message);
    process.exitCode = 1;
    return;
  }
} else {
  console.warn('Not Windows: skipping synthesis. The app will use browser speech synthesis.');
  return;
}

/* ---------- 3. merge ---------- */
function parseWav(buf) {
  if (buf.toString('ascii', 0, 4) !== 'RIFF' || buf.toString('ascii', 8, 12) !== 'WAVE') {
    throw new Error('not a RIFF/WAVE file');
  }
  let pos = 12, fmt = null, data = null;
  while (pos + 8 <= buf.length) {
    const id = buf.toString('ascii', pos, pos + 4);
    const size = buf.readUInt32LE(pos + 4);
    if (id === 'fmt ') {
      fmt = {
        audioFormat: buf.readUInt16LE(pos + 8),
        channels: buf.readUInt16LE(pos + 10),
        sampleRate: buf.readUInt32LE(pos + 12),
        byteRate: buf.readUInt32LE(pos + 16),
        blockAlign: buf.readUInt16LE(pos + 20),
        bits: buf.readUInt16LE(pos + 22)
      };
    } else if (id === 'data') {
      data = { offset: pos + 8, size: size };
    }
    pos += 8 + size + (size % 2);
  }
  if (!fmt || !data) throw new Error('missing fmt/data chunk');
  return { fmt: fmt, data: data };
}

function buildWav(fmt, pcm) {
  const h = Buffer.alloc(44);
  h.write('RIFF', 0, 'ascii');
  h.writeUInt32LE(36 + pcm.length, 4);
  h.write('WAVE', 8, 'ascii');
  h.write('fmt ', 12, 'ascii');
  h.writeUInt32LE(16, 16);
  h.writeUInt16LE(fmt.audioFormat, 20);
  h.writeUInt16LE(fmt.channels, 22);
  h.writeUInt32LE(fmt.sampleRate, 24);
  h.writeUInt32LE(fmt.byteRate, 28);
  h.writeUInt16LE(fmt.blockAlign, 32);
  h.writeUInt16LE(fmt.bits, 34);
  h.write('data', 36, 'ascii');
  h.writeUInt32LE(pcm.length, 40);
  return Buffer.concat([h, pcm]);
}

const files = fs.readdirSync(partsDir).filter(function (f) { return /\.wav$/i.test(f); });
const groups = {};
files.forEach(function (f) {
  const m = f.match(/^(.+?)_(\d+)\.wav$/i);
  if (!m) return;
  (groups[m[1]] = groups[m[1]] || []).push({ file: f, n: parseInt(m[2], 10) });
});

let merged = 0;
Object.keys(groups).forEach(function (trackId) {
  const list = groups[trackId].sort(function (a, b) { return a.n - b.n; });
  let fmt = null;
  const chunks = [];
  let silence = null;

  list.forEach(function (entry, i) {
    const buf = fs.readFileSync(path.join(partsDir, entry.file));
    const p = parseWav(buf);
    if (!fmt) {
      fmt = p.fmt;
      // ~300 ms of silence between lines
      silence = Buffer.alloc(Math.round(fmt.sampleRate * fmt.channels * (fmt.bits / 8) * 0.30));
    }
    const pcm = buf.slice(p.data.offset, p.data.offset + p.data.size);
    if (pcm.length) chunks.push(pcm);
    if (i < list.length - 1 && silence) chunks.push(silence);
  });

  if (!fmt) return;
  const out = buildWav(fmt, Buffer.concat(chunks));
  fs.writeFileSync(path.join(audioDir, trackId + '.wav'), out);
  merged++;
  console.log('audio     ->', 'audio/' + trackId + '.wav',
    '(' + list.length + ' lines, ' + (out.length / 1024 / 1024).toFixed(2) + ' MB)');
});

const total = fs.readdirSync(audioDir).filter(function (f) { return /\.wav$/i.test(f); })
  .reduce(function (a, f) { return a + fs.statSync(path.join(audioDir, f)).size; }, 0);

console.log('\n' + merged + ' track(s) merged. Total audio: ' + (total / 1024 / 1024).toFixed(2) + ' MB');

// drop the per-line intermediates so the folder stays small
try {
  fs.rmSync(partsDir, { recursive: true, force: true });
  console.log('Removed intermediate parts folder.');
} catch (e) { /* keep them if removal fails */ }
