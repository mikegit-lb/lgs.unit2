/* ============================================================
   Audio player for the listening exercises.

   Priority order:
     1. A pre-rendered WAV in ./audio/  (works with no internet)
     2. The browser's own speech synthesis using the English
        voices installed on this PC (Microsoft David / Zira are
        used for the two speakers).

   Under file:// a media element loads local files fine, so the
   bundled audio is tried first and we fall back on 'error'.
   ============================================================ */

window.AudioPlayer = (function () {

  const SCRIPTS = window.AUDIO_SCRIPTS || {};
  const SPEAKER_VOICE = { D: 'en-US', Z: 'en-GB' };   // David / Zira pairing
  const SPEAKER_PITCH = { D: 0.9, Z: 1.05 };

  let current = null;         // HTMLAudioElement when a WAV is playing
  let playing = false;
  let rate = 0.86;
  let ttsVoices = [];
  let ttsReady = false;

  /* ---------------- voices ---------------- */
  function refreshVoices() {
    if (!('speechSynthesis' in window)) return;
    const all = window.speechSynthesis.getVoices() || [];
    ttsVoices = all;
    ttsReady = all.length > 0;
  }
  if ('speechSynthesis' in window) {
    refreshVoices();
    window.speechSynthesis.addEventListener('voiceschanged', refreshVoices);
    setTimeout(refreshVoices, 250);
    setTimeout(refreshVoices, 900);
  }

  function pickVoice(speaker) {
    const wantLocale = SPEAKER_VOICE[speaker] || 'en-US';
    if (!ttsVoices.length) return null;
    const byName = ttsVoices.filter(function (v) {
      const n = (v.name || '').toLowerCase();
      return (speaker === 'D' && n.indexOf('david') >= 0) ||
             (speaker === 'Z' && n.indexOf('zira') >= 0);
    });
    if (byName.length) return byName[0];

    const local = ttsVoices.filter(function (v) {
      return v.localService && v.lang && v.lang.toLowerCase().replace('_', '-') === wantLocale.toLowerCase();
    });
    if (local.length) return local[0];

    const anyLocal = ttsVoices.filter(function (v) { return v.localService && /^en/i.test(v.lang || ''); });
    if (anyLocal.length) return anyLocal[0];

    const en = ttsVoices.filter(function (v) { return /^en/i.test(v.lang || ''); });
    return en[0] || null;
  }

  /* ---------------- track info ---------------- */
  function getScript(id) { return SCRIPTS[id] || null; }
  function getLines(id) { const s = getScript(id); return s ? s.lines : []; }

  /* ---------------- stop ---------------- */
  function stop() {
    playing = false;
    if (current) {
      try { current.pause(); current.currentTime = 0; } catch (e) {}
      current = null;
    }
    if ('speechSynthesis' in window) {
      try { window.speechSynthesis.cancel(); } catch (e) {}
    }
    document.querySelectorAll('.dline.speaking').forEach(function (el) { el.classList.remove('speaking'); });
    emitState('stopped');
  }

  /* ---------------- play ---------------- */
  function play(id, opts) {
    opts = opts || {};
    const script = getScript(id);
    if (!script) { console.warn('No audio script for', id); return Promise.resolve(false); }
    stop();

    const file = 'audio/' + id + '.wav';
    return new Promise(function (resolve) {
      const el = new Audio();
      let settled = false;

      function fallbackToTts() {
        if (settled) return;
        settled = true;
        playWithTts(script, opts).then(function (ok) { resolve(ok); });
      }

      el.preload = 'auto';
      el.src = file;
      current = el;

      el.addEventListener('canplaythrough', function () {
        if (settled) return;
        settled = true;
        playing = true;
        el.playbackRate = 1;                 // rate baked into the WAV
        el.addEventListener('timeupdate', function () {
          if (el.duration) emitState('progress', el.currentTime / el.duration);
        });
        el.addEventListener('ended', function () {
          playing = false; current = null;
          emitState('ended', 1);
          if (opts.onLine) opts.onLine(-1);
        });
        emitState('playing', 0);
        el.play().catch(function () { settled = true; playWithTts(script, opts).then(resolve); });
        resolve(true);
      }, { once: true });

      el.addEventListener('error', fallbackToTts, { once: true });
      // If the file is missing under file:// the error event fires; give it a beat.
      setTimeout(function () { if (!settled) fallbackToTts(); }, 1200);

      try { el.load(); } catch (e) { fallbackToTts(); }
    });
  }

  /* ---------------- speech synthesis ---------------- */
  function playWithTts(script, opts) {
    if (!('speechSynthesis' in window)) {
      emitState('unavailable');
      return Promise.resolve(false);
    }
    playing = true;
    emitState('playing', 0);
    speakLine(script, opts, 0);
    return Promise.resolve(true);
  }

  function speakLine(script, opts, i) {
    if (!playing) return;
    if (i >= script.lines.length) {
      playing = false;
      emitState('ended', 1);
      if (opts.onLine) opts.onLine(-1);
      return;
    }
    const line = script.lines[i];
    const u = new SpeechSynthesisUtterance(line.t);
    u.voice = pickVoice(line.s);
    u.lang = u.voice ? u.voice.lang : SPEAKER_VOICE[line.s];
    u.rate = rate;
    u.pitch = SPEAKER_PITCH[line.s] || 1;
    u.volume = 1;

    if (opts.onLine) opts.onLine(i);
    emitState('line', i / script.lines.length, i);

    u.onend = function () {
      if (!playing) return;
      setTimeout(function () { speakLine(script, opts, i + 1); }, 320);
    };
    u.onerror = function (ev) {
      if (ev && ev.error === 'interrupted') return;
      // skip a broken line rather than stalling the whole track
      setTimeout(function () { speakLine(script, opts, i + 1); }, 60);
    };
    try { window.speechSynthesis.speak(u); }
    catch (e) { console.warn('TTS failed', e); emitState('unavailable'); }
  }

  /* ---------------- speed ---------------- */
  function setRate(r) { rate = r; }

  /* ---------------- state listeners ---------------- */
  const listeners = [];
  function onState(fn) { listeners.push(fn); }
  function emitState(kind, pct, lineIndex) {
    listeners.forEach(function (fn) {
      try { fn({ kind: kind, pct: pct || 0, line: lineIndex, playing: playing, mode: current ? 'wav' : 'tts' }); } catch (e) {}
    });
  }

  /* ---------------- feature detection ---------------- */
  function supported() { return 'speechSynthesis' in window; }
  function sourceLabel(id) { return current ? 'bundled audio' : 'this device\'s voice'; }

  /* ---------------- read-aloud helper (single sentences) ---------------- */
  function speak(text, speaker) {
    if (!supported()) return;
    const u = new SpeechSynthesisUtterance(text);
    u.voice = pickVoice(speaker || 'Z');
    u.rate = rate;
    u.pitch = SPEAKER_PITCH[speaker || 'Z'] || 1;
    window.speechSynthesis.speak(u);
  }

  return {
    play: play,
    stop: stop,
    speak: speak,
    setRate: setRate,
    getRate: function () { return rate; },
    getLines: getLines,
    getScript: getScript,
    onState: onState,
    isPlaying: function () { return playing; },
    supported: supported,
    sourceLabel: sourceLabel
  };
})();
