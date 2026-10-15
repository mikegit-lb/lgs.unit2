/* ============================================================
   Progress store
   Everything is kept in localStorage so the workbook survives a
   reload, works from file://, and needs no server.
   ============================================================ */

window.Store = (function () {
  const KEY = 'unit2-teenlife-v1';

  const DEFAULT = {
    studentName: '',
    xp: 0,
    streak: 0,
    bestStreak: 0,
    badges: [],
    exercises: {},      // exId -> { correct, total, done }
    writing: {},        // exId -> { text, words, savedAt }
    answers: {},        // exId -> { ...typed answers, ticked rows }
    lgs: {
      workshop: {},     // typeId -> { attempted, correct, total }
      mocks: {},        // mockId -> { attempts, bestNet, lastNet }
      mistakes: [],     // { id, type, diff, stem, chosen, answer, why, at }
      seen: {}          // itemId -> true
    },
    selfCheck: {}       // exId -> [true,false,...]
  };

  let state = load();
  const listeners = [];

  function load() {
    try {
      const raw = localStorage.getItem(KEY);
      if (!raw) return clone(DEFAULT);
      const parsed = JSON.parse(raw);
      return deepMerge(clone(DEFAULT), parsed);
    } catch (e) {
      console.warn('Progress could not be loaded:', e);
      return clone(DEFAULT);
    }
  }

  function save() {
    try {
      localStorage.setItem(KEY, JSON.stringify(state));
    } catch (e) {
      console.warn('Progress could not be saved (private mode?)', e);
    }
    emit();
  }

  function clone(o) { return JSON.parse(JSON.stringify(o)); }

  function deepMerge(base, over) {
    if (over === undefined) return base;
    if (over === null || typeof over !== 'object' || Array.isArray(over)) return over;
    if (!base || typeof base !== 'object' || Array.isArray(base)) base = {};
    Object.keys(over).forEach(function (k) { base[k] = deepMerge(base[k], over[k]); });
    return base;
  }

  /* ---------- events ---------- */
  function on(fn) { listeners.push(fn); }
  function emit() { listeners.forEach(function (fn) { try { fn(state); } catch (e) { console.error(e); } }); }

  /* ---------- student ---------- */
  function setName(n) { state.studentName = n || ''; save(); }
  function getName() { return state.studentName; }

  /* ---------- xp / streak ---------- */
  function addXp(n) {
    if (!n) return;
    state.xp += n;
    save();
  }
  function bumpStreak() {
    state.streak += 1;
    if (state.streak > state.bestStreak) state.bestStreak = state.streak;
    save();
  }
  function resetStreak() {
    if (state.streak !== 0) { state.streak = 0; save(); }
  }
  function stats() {
    let correct = 0, total = 0, done = 0;
    Object.keys(state.exercises).forEach(function (k) {
      const e = state.exercises[k];
      correct += e.correct || 0;
      total += e.total || 0;
      if (e.done) done++;
    });
    return { xp: state.xp, streak: state.streak, bestStreak: state.bestStreak, correct: correct, total: total, doneCount: done };
  }

  /* ---------- exercise results ---------- */
  function record(exId, correct, total, done) {
    const prev = state.exercises[exId] || { correct: 0, total: 0, done: false };
    state.exercises[exId] = {
      correct: Math.max(prev.correct || 0, correct),
      total: Math.max(prev.total || 0, total),
      done: done !== false ? (prev.done || correct === total) : false
    };
    save();
  }
  function get(exId) { return state.exercises[exId] || null; }

  /* ---------- arbitrary saved answers (textareas, ticks) ---------- */
  function setAnswer(key, val) { state.answers[key] = val; save(); }
  function getAnswer(key) { return state.answers[key]; }

  function setWriting(exId, text) {
    state.writing[exId] = { text: text, words: countWords(text), savedAt: Date.now() };
    save();
  }
  function getWriting(exId) { return state.writing[exId] || { text: '', words: 0 }; }
  function countWords(t) {
    if (!t) return 0;
    return t.trim().split(/\s+/).filter(function (w) { return /[A-Za-zÇĞİÖŞÜçğıöşü]/.test(w); }).length;
  }

  function setSelfCheck(exId, arr) { state.selfCheck[exId] = arr; save(); }
  function getSelfCheck(exId) { return state.selfCheck[exId] || []; }

  /* ---------- badges ---------- */
  function hasBadge(id) { return state.badges.indexOf(id) >= 0; }
  function awardBadge(id) {
    if (hasBadge(id)) return false;
    state.badges.push(id);
    save();
    return true;
  }
  function badges() { return state.badges.slice(); }

  /* ---------- LGS ---------- */
  function lgsWorkshop(typeId, correct, total) {
    const w = state.lgs.workshop[typeId] || { attempted: 0, correct: 0, total: 0 };
    w.attempted += 1;
    w.correct += correct;
    w.total += total;
    state.lgs.workshop[typeId] = w;
    save();
  }
  function lgsMock(mockId, result) {
    const m = state.lgs.mocks[mockId] || { attempts: 0, bestNet: -99, lastNet: -99, bestPct: 0 };
    m.attempts += 1;
    m.lastNet = result.net;
    if (result.net > m.bestNet) { m.bestNet = result.net; m.bestPct = result.pct; }
    state.lgs.mocks[mockId] = m;
    save();
  }
  function addMistake(item) {
    // keep only the most recent 60 and avoid piling up the same item
    state.lgs.mistakes = state.lgs.mistakes.filter(function (m) { return m.id !== item.id; });
    state.lgs.mistakes.unshift(item);
    if (state.lgs.mistakes.length > 60) state.lgs.mistakes.length = 60;
    state.lgs.seen[item.id] = true;
    save();
  }
  function clearMistake(id) {
    state.lgs.mistakes = state.lgs.mistakes.filter(function (m) { return m.id !== id; });
    save();
  }
  function mistakes() { return state.lgs.mistakes.slice(); }

  /* ---------- reset ---------- */
  function resetAll() {
    state = clone(DEFAULT);
    save();
  }
  function resetLgs() {
    state.lgs = clone(DEFAULT.lgs);
    save();
  }

  /* ---------- section progress ---------- */
  function sectionProgress(sections) {
    const out = {};
    sections.forEach(function (s) {
      if (s.lgs) {
        const w = state.lgs.workshop;
        const keys = Object.keys(w);
        if (!keys.length) { out[s.id] = 0; return; }
        let c = 0, t = 0;
        keys.forEach(function (k) { c += w[k].correct; t += w[k].total; });
        const mockKeys = Object.keys(state.lgs.mocks);
        const mockBonus = Math.min(mockKeys.length / 2, 1) * 0.4;
        out[s.id] = Math.min(1, (t ? c / t : 0) * 0.6 + mockBonus);
        return;
      }
      let c = 0, t = 0;
      (s.blocks || []).forEach(function (b) {
        if (b.t !== 'ex') return;
        const r = state.exercises[b.ex.id];
        if (!r) return;
        if (b.ex.points > 0) { c += (r.correct || 0); t += (r.total || b.ex.points); }
        else { t += 1; c += r.done ? 1 : 0; }
      });
      out[s.id] = t ? c / t : 0;
    });
    return out;
  }

  return {
    on: on, save: save, raw: function () { return state; },
    setName: setName, getName: getName,
    addXp: addXp, bumpStreak: bumpStreak, resetStreak: resetStreak, stats: stats,
    record: record, get: get,
    setAnswer: setAnswer, getAnswer: getAnswer,
    setWriting: setWriting, getWriting: getWriting, countWords: countWords,
    setSelfCheck: setSelfCheck, getSelfCheck: getSelfCheck,
    hasBadge: hasBadge, awardBadge: awardBadge, badges: badges,
    lgsWorkshop: lgsWorkshop, lgsMock: lgsMock,
    addMistake: addMistake, clearMistake: clearMistake, mistakes: mistakes,
    resetAll: resetAll, resetLgs: resetLgs,
    sectionProgress: sectionProgress
  };
})();
