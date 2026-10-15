/* Dev helper: finds lines where a contraction apostrophe would break a
   single-quoted JS string. Run: node tools/check-quotes.js */
const fs = require('fs');

const files = process.argv.slice(2).length
  ? process.argv.slice(2)
  : ['js/lgs-items.js', 'js/data.js', 'js/audio-scripts.js'];

const contractions = /(can't|doesn't|don't|isn't|aren't|didn't|won't|wouldn't|it's|that's|what's|he's|she's|there's|who's|they're|i'm|i've|i'd|i'll)/i;

let total = 0;
for (const f of files) {
  if (!fs.existsSync(f)) continue;
  const lines = fs.readFileSync(f, 'utf8').split('\n');
  lines.forEach((ln, i) => {
    const t = ln.trim();
    // only string-literal-ish lines
    if (!/^[a-zA-Z0-9_$]+\s*:/.test(t) && !t.startsWith('why') && !t.startsWith('stem')) return;
    if (!contractions.test(ln)) return;
    let quotes = 0;
    for (let k = 0; k < ln.length; k++) {
      if (ln[k] === "'" && ln[k - 1] !== '\\') quotes++;
    }
    if (quotes % 2 !== 0) {
      total++;
      console.log(`${f}:${i + 1}\n   ${t.slice(0, 120)}`);
    }
  });
}
console.log(total ? `\n${total} suspect line(s).` : 'No suspect lines found.');
