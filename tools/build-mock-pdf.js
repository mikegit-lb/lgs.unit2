/* ============================================================
   tools/build-mock-pdf.js
   ------------------------------------------------------------
   Builds a standalone, print-ready HTML booklet of the LGS mock
   exams and converts it to a real PDF with headless Chrome/Edge.

   Output:  lgs-denemeler.pdf  (questions only)
            lgs-denemeler-cevap-anahtarli.pdf  (questions + key)

   Usage:
     node tools/build-mock-pdf.js

   No internet needed. Uses the locally installed Chrome or Edge.
   ============================================================ */

const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');

// js/lgs-items.js assigns to window.LGS — give it a window to talk to.
global.window = {};
require(path.join(__dirname, '..', 'js', 'lgs-items.js'));
const L = global.window.LGS;

const ROOT = path.join(__dirname, '..');
const OUT_DIR = ROOT;

/* ---------------- helpers ---------------- */
function esc(s) {
  return String(s == null ? '' : s)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}
// Mirrors LGSApp.stimulusHtml: trusted table markup passes through,
// plain text is escaped with line breaks preserved.
function stimulusHtml(s) {
  if (!s) return '';
  if (/<table|<div|<p/i.test(s)) return s;
  return esc(s).replace(/\n/g, '<br>');
}
const mins = sec => Math.round(sec / 60);

/* ---------------- booklet markup ---------------- */
function bookletHtml(withKey) {
  let body = '' +
    '<div class="exam-cover">' +
      '<div class="exam-cover-kicker">Bilim ve Kültür Yayınları · 8. Sınıf İngilizce</div>' +
      '<h1>LGS DENEME SINAVLARI</h1>' +
      '<div class="exam-cover-sub">UNIT 2 · TEEN LIFE — ' + L.mocks.length +
        ' deneme · toplam ' + L.allMockItems.length + ' soru</div>' +
      '<div class="exam-cover-note">Her deneme yeni sayfada başlar. Doğru seçeneğin yanındaki kutuyu işaretle. ' +
        'Süre her denemenin üstünde yazıyor. Net = doğru − yanlış/3 — boş bıraktığın soru netini değiştirmez ama puan kaybettirir.</div>' +
      '<div class="exam-name-line">Ad Soyad: ________________________ &nbsp; Sınıf: ______ &nbsp; Tarih: ____________</div>' +
    '</div>';

  L.mocks.forEach(function (m) {
    const items = L.itemsByIds(m.itemIds);
    body += '<section class="exam-paper">' +
      '<div class="exam-paper-head">' +
        '<div class="exam-paper-title">' + esc(m.name) + '</div>' +
        '<div class="exam-paper-meta">' + items.length + ' soru · ' + mins(m.durationSec) + ' dakika</div>' +
      '</div>' +
      '<div class="exam-paper-desc">' + esc(m.description) + '</div>' +
      items.map(function (it, i) {
        return '<div class="exam-q">' +
          '<div class="exam-q-stem"><span class="exam-qno">' + (i + 1) + '.</span>' + esc(it.stem).replace(/\n/g, '<br>') + '</div>' +
          (it.stimulus ? '<div class="exam-stimulus">' + stimulusHtml(it.stimulus) + '</div>' : '') +
          '<div class="exam-opts">' + it.opts.map(function (o, oi) {
            return '<div class="exam-opt"><span class="exam-box">' + 'ABCD'[oi] + '</span><span>' + esc(o) + '</span></div>';
          }).join('') + '</div>' +
        '</div>';
      }).join('') +
    '</section>';
  });

  if (withKey) {
    body += '<section class="exam-paper">' +
      '<div class="exam-paper-head">' +
        '<div class="exam-paper-title">CEVAP ANAHTARI</div>' +
        '<div class="exam-paper-meta">Öğretmen için · ' + L.allMockItems.length + ' soru</div>' +
      '</div>' +
      '<div class="exam-paper-desc">Her sorunun doğru cevabı ve Türkçe açıklaması. Öğrenciye vermeden önce bu bölümü ayırın.</div>' +
      L.mocks.map(function (m) {
        const items = L.itemsByIds(m.itemIds);
        return '<div class="exam-key-block">' +
          '<h4>' + esc(m.name) + '</h4>' +
          '<div class="exam-key-grid">' + items.map(function (it, i) {
            return '<div class="exam-key-row"><b>' + (i + 1) + '.</b> ' + 'ABCD'[it.answer] + '</div>';
          }).join('') + '</div>' +
          '<div class="exam-key-why">' + items.map(function (it, i) {
            return '<div>' + (i + 1) + '. ' + esc(it.why) + '</div>';
          }).join('') + '</div>' +
        '</div>';
      }).join('') +
    '</section>';
  }

  return '' +
'<!doctype html><html lang="tr"><head><meta charset="utf-8">' +
'<title>Unit 2 · Teen Life — LGS Denemeleri</title>' +
'<style>' +
'  @page{ size:A4; margin:16mm 15mm; }' +
'  *{ box-sizing:border-box; }' +
'  body{ font-family:"Segoe UI",Tahoma,Geneva,Verdana,sans-serif; color:#16181d; margin:0; line-height:1.45; }' +
'  h1{ font-size:20pt; margin:0 0 .3em; }' +
'  p{ font-size:10pt; color:#444; margin:0 0 1em; }' +

  /* cover */
'  .exam-cover{ text-align:center; padding:22mm 0 10mm; page-break-after:always; }' +
'  .exam-cover-kicker{ font-size:9.5pt; letter-spacing:.14em; text-transform:uppercase; color:#777; }' +
'  .exam-cover h1{ font-size:26pt; margin:.25em 0 .1em; }' +
'  .exam-cover-sub{ font-size:12pt; font-weight:700; color:#333; }' +
'  .exam-cover-note{ font-size:9.5pt; color:#555; max-width:120mm; margin:1.4em auto; line-height:1.55; }' +
'  .exam-name-line{ display:inline-block; margin-top:2.5em; padding:.7em 1.4em; border:1.4px solid #333; border-radius:4px; font-size:11pt; font-weight:600; }' +

  /* papers */
'  .exam-paper{ page-break-before:always; }' +
'  .exam-paper:first-of-type{ page-break-before:avoid; }' +
'  .exam-paper-head{ display:flex; justify-content:space-between; align-items:baseline; border-bottom:2.2px solid #222; padding-bottom:.35em; margin-bottom:.2em; }' +
'  .exam-paper-title{ font-size:15pt; font-weight:800; }' +
'  .exam-paper-meta{ font-size:9.5pt; color:#555; font-weight:700; white-space:nowrap; }' +
'  .exam-paper-desc{ font-size:9pt; color:#666; line-height:1.5; margin:.5em 0 1em; }' +

  /* questions */
'  .exam-q{ margin-bottom:1.15em; page-break-inside:avoid; }' +
'  .exam-q-stem{ font-size:10.5pt; font-weight:600; line-height:1.5; margin-bottom:.4em; }' +
'  .exam-qno{ display:inline-block; min-width:1.7em; font-weight:800; }' +
'  .exam-stimulus{ background:#f6f6f8; border:1px solid #d5d5dd; border-radius:5px; padding:.6em .8em; margin:.2em 0 .55em; font-size:9.5pt; line-height:1.55; page-break-inside:avoid; }' +
'  .exam-stimulus table{ width:100%; border-collapse:collapse; font-size:9.5pt; }' +
'  .exam-stimulus th,.exam-stimulus td{ border:1px solid #bbb; padding:.3em .55em; text-align:left; }' +
'  .exam-stimulus th{ background:#e7e7ee; font-weight:700; }' +
'  .exam-stimulus td.rowhead{ font-weight:700; }' +

  /* options */
'  .exam-opts{ margin-left:1.7em; }' +
'  .exam-opt{ display:flex; gap:.5em; align-items:flex-start; margin-bottom:.28em; font-size:10pt; line-height:1.45; }' +
'  .exam-box{ flex:none; width:1.5em; height:1.5em; border:1.4px solid #333; border-radius:4px; display:inline-flex; align-items:center; justify-content:center; font-size:8.5pt; font-weight:800; margin-top:.05em; }' +

  /* answer key */
'  .exam-key-block{ page-break-inside:avoid; margin-bottom:1.3em; }' +
'  .exam-key-block h4{ font-size:11.5pt; margin:0 0 .35em; padding-bottom:.2em; border-bottom:1px solid #999; }' +
'  .exam-key-grid{ display:flex; flex-wrap:wrap; gap:.25em .5em; margin-bottom:.5em; }' +
'  .exam-key-row{ min-width:3.6em; padding:.2em .45em; background:#f0f0f4; border-radius:3px; font-size:10pt; text-align:center; }' +
'  .exam-key-why{ font-size:8.8pt; color:#555; line-height:1.5; }' +
'  .exam-key-why div{ margin-bottom:.12em; }' +
'</style></head><body>' + body + '</body></html>';
}

/* ---------------- find a browser ---------------- */
function findBrowser() {
  const candidates = [
    'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
    'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
    'C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe'
  ];
  return candidates.find(p => fs.existsSync(p)) || null;
}

/* ---------------- build ---------------- */
const browser = findBrowser();
if (!browser) {
  console.error('Chrome/Edge not found. Open index.html and use the "Soruları yazdır" button instead.');
  process.exit(1);
}

const jobs = [
  { withKey: false, out: 'lgs-denemeler.pdf' },
  { withKey: true,  out: 'lgs-denemeler-cevap-anahtarli.pdf' }
];

jobs.forEach(function (job) {
  const htmlPath = path.join(ROOT, 'tools', '.mock-booklet' + (job.withKey ? '-key' : '') + '.html');
  const pdfPath = path.join(OUT_DIR, job.out);

  fs.writeFileSync(htmlPath, bookletHtml(job.withKey), 'utf8');

  execFileSync(browser, [
    '--headless', '--disable-gpu', '--no-sandbox',
    '--no-pdf-header-footer',
    '--print-to-pdf=' + pdfPath,
    'file:///' + htmlPath.replace(/\\/g, '/')
  ], { stdio: 'ignore', timeout: 90000 });

  fs.unlinkSync(htmlPath);

  const kb = Math.round(fs.statSync(pdfPath).size / 1024);
  console.log('✓ ' + job.out + '  (' + kb + ' KB)');
});

console.log('\nToplam ' + L.mocks.length + ' deneme · ' + L.allMockItems.length + ' soru.');
