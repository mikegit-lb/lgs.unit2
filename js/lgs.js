/* ============================================================
   LGS SINAV MERKEZİ
   Question-type workshops + timed 10-question mocks scored with
   the real MEB rule:  net = doğru - yanlış/3

   Projection chain (İngilizce, katsayı = 1):
     HP  = net
     SP  = 10 * (HP - mu) / sigma + 50
     ASP = SP * katsayı
   ============================================================ */

window.LGSApp = (function () {

  const L = window.LGS;
  const Store = window.Store;
  const AP = window.AudioPlayer;

  const DIFF_WEIGHT = { easy: 1, medium: 1.5, hard: 2 };
  const DIFF_LABEL = { easy: 'Kolay', medium: 'Orta', hard: 'Zor' };

  /* ---------------- helpers ---------------- */
  function esc(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }
  function stimulusHtml(s) {
    if (!s) return '';
    // table markup produced by us is trusted; plain text gets escaped + line breaks
    if (/<table|<div|<p/i.test(s)) return s;
    return esc(s).replace(/\n/g, '<br>');
  }
  function stripTags(s) { return String(s).replace(/<[^>]*>/g, ''); }

  /* ================================================================
     SCORING ENGINE
     ================================================================ */
  function score(items, answers) {
    let correct = 0, wrong = 0, blank = 0;
    let weightedGot = 0, weightedMax = 0;
    const byType = {}, byDiff = { easy: [0, 0], medium: [0, 0], hard: [0, 0] };

    items.forEach(function (it, i) {
      const a = answers[i];
      const w = DIFF_WEIGHT[it.diff] || 1;
      weightedMax += w;
      if (a === undefined || a === null) blank++;
      else if (a === it.answer) { correct++; weightedGot += w; }
      else wrong++;

      byDiff[it.diff] = byDiff[it.diff] || [0, 0];
      byDiff[it.diff][1] += 1;
      if (a === it.answer) byDiff[it.diff][0] += 1;

      byType[it.type] = byType[it.type] || { correct: 0, total: 0 };
      byType[it.type].total += 1;
      if (a === it.answer) byType[it.type].correct += 1;
    });

    const net = correct - wrong / 3;
    return {
      total: items.length,
      correct: correct, wrong: wrong, blank: blank,
      net: Math.round(net * 100) / 100,
      pct: items.length ? Math.round((correct / items.length) * 100) : 0,
      weightedGot: Math.round(weightedGot * 10) / 10,
      weightedMax: Math.round(weightedMax * 10) / 10,
      byType: byType,
      byDiff: byDiff
    };
  }

  /* HP -> SP -> ASP. mu/sigma come from the sliders; MEB derives the
     real ones from that year's cohort, so this is a projection. */
  function project(net, mu, sigma) {
    const cfg = L.projection;
    const m = (mu === undefined ? cfg.mu : mu);
    const s = (sigma === undefined ? cfg.sigma : sigma) || 1;
    const hp = Math.max(cfg.hpMin, Math.min(cfg.hpMax, net));
    const sp = 10 * (hp - m) / s + 50;
    const asp = sp * cfg.coefficient;
    const fullHp = cfg.hpMax;
    const fullSp = 10 * (fullHp - m) / s + 50;
    return {
      hp: Math.round(hp * 100) / 100,
      sp: Math.round(sp * 10) / 10,
      asp: Math.round(asp * 10) / 10,
      mu: m, sigma: s,
      coefficient: cfg.coefficient,
      gapToFull: Math.round((fullSp - sp) * 10) / 10
    };
  }

  /* ================================================================
     SECTION RENDER
     ================================================================ */
  function render(api) {
    const host = document.getElementById('view');
    host.innerHTML =
      heroHtml() +
      strategyHtml() +
      typeCardsHtml() +
      mocksHtml() +
      mistakesHtml() +
      projectionLabHtml();
    wire(host, api);
    updateTypeCards();
    updateMistakes();
  }

  function heroHtml() {
    return '' +
      '<section class="lgs-hero">' +
        '<span class="kicker" style="position:relative;background:rgba(255,255,255,.2);padding:.2rem .6rem;border-radius:999px;font-size:.7rem;font-weight:800;letter-spacing:.07em;">NEW SECTION · kitapta yok</span>' +
        '<h1>LGS SINAV MERKEZİ</h1>' +
        '<p>Bu bölüm kitabın içinde yok. Gerçek LGS İngilizce bölümü üzerine kuruldu: <b>10 soru</b>, kural <b>doğru − yanlış/3</b> ve İngilizce için <b>katsayı 1</b>. Buradaki her soru LGS formatında yazıldı.</p>' +
        '<div class="lgs-facts">' +
          '<div class="lgs-fact"><b>10</b>soru / İngilizce</div>' +
          '<div class="lgs-fact"><b>−1/3</b>yanlış kuralı</div>' +
          '<div class="lgs-fact"><b>×1</b>İngilizce katsayısı</div>' +
          '<div class="lgs-fact"><b>50 / 10</b>ortalama / standart sapma</div>' +
          '<div class="lgs-fact"><b>~1,5 dk</b>soru başına süre</div>' +
        '</div>' +
      '</section>';
  }

  function strategyHtml() {
    let cards = L.strategyCards.map(function (c) {
      return '<li style="margin-bottom:.35rem"><b>' + esc(c.ico + ' ' + c.title) + '</b><br><span style="font-size:.82rem">' + esc(c.text) + '</span></li>';
    }).join('');
    return '' +
      '<section class="card">' +
        '<div class="card-head"><h3>⚡ 6 strateji kartı</h3><span class="card-tag">Sınav taktikleri</span></div>' +
        '<div class="instruction">These are the six mistakes Turkish 8th graders make most often in this unit.<span class="tr">Bu altı hata, Türk 8. sınıfların bu ünitede en çok yaptığı hatalardır. Sınavdan önce bir kez oku.</span></div>' +
        '<ul style="columns:2;column-gap:1.6rem;list-style:none;padding:0;margin:0">' + cards + '</ul>' +
      '</section>';
  }

  function typeCardsHtml() {
    const cards = L.types.map(function (t) {
      return '<button class="typecard" data-type="' + t.id + '">' +
        '<span class="tc-ico">' + t.ico + '</span>' +
        '<span class="tc-name">' + esc(t.name) + '</span>' +
        '<span class="tc-desc">' + esc(t.desc) + '</span>' +
        '<span class="tc-stats" data-stats="' + t.id + '"></span>' +
      '</button>';
    }).join('');
    return '' +
      '<section class="card" id="typeWorkshop">' +
        '<div class="card-head"><h3>🧰 Soru Tipi Atölyeleri</h3><span class="card-tag sec">' + L.types.length + ' tip · ' + L.bank.length + ' soru</span></div>' +
        '<div class="instruction">Pick a question type to practise. Each workshop opens with a strategy card, then gives you the items for that type.<span class="tr">Bir soru tipi seç. Her atölye bir strateji kartıyla açılır, sonra o tipin sorularını verir.</span></div>' +
        '<div class="typecards">' + cards + '</div>' +
        '<div id="workshopHost"></div>' +
      '</section>';
  }

  function mocksHtml() {
    const rows = L.mocks.map(function (m) {
      const rec = Store.raw().lgs.mocks[m.id] || {};
      return '<div class="sectionrow" style="cursor:default">' +
        '<span class="sr-ico">📝</span>' +
        '<div class="sr-body">' +
          '<div class="sr-title">' + esc(m.name) + '</div>' +
          '<div class="sr-sub">' + esc(m.description) + '</div>' +
        '</div>' +
        '<div style="flex:none;text-align:right">' +
          '<div style="font-size:.72rem;color:var(--ink-3);font-weight:700">' + (rec.attempts ? 'En iyi net: <b style="color:var(--brand)">' + rec.bestNet.toFixed(2) + '</b> · ' + rec.attempts + ' deneme' : 'Henüz denenmedi') + '</div>' +
          '<button class="btn btn-warn btn-sm" data-mock="' + m.id + '" style="margin-top:.3rem">▶ ' + (rec.attempts ? 'Tekrar dene' : 'Başlat') + '</button>' +
        '</div>' +
      '</div>';
    }).join('');
    return '' +
      '<section class="card" id="mocks">' +
        '<div class="card-head"><h3>⏱️ Deneme Sınavları</h3><span class="card-tag sec">10 soru · gerçek süre</span></div>' +
        '<div class="instruction">Two full 10-question papers. The timer runs exactly like the real exam — 1.5 minutes per question. Leave nothing blank in the real exam, but remember: <b>3 yanlış 1 doğruyu götürür</b>.<span class="tr">İki tam 10 soruluk deneme. Sayaç gerçek sınav gibi işler. Gerçek sınavda boş bırakma ama unutma: 3 yanlış 1 doğruyu götürür.</span></div>' +
        '<div class="sectionlist">' + rows + '</div>' +
        '<div id="examHost"></div>' +
      '</section>';
  }

  function mistakesHtml() {
    return '' +
      '<section class="card" id="mistakes">' +
        '<div class="card-head"><h3>📕 Yanlış tekrarı</h3><span class="card-tag sec">Kaydedilen hatalar</span></div>' +
        '<div class="instruction">Every question you get wrong is saved here with its Turkish explanation. Re-read them the night before the exam.<span class="tr">Yanlış yaptığın her soru burada Türkçe açıklamasıyla saklanır. Sınavdan bir gece önce tekrar oku.</span></div>' +
        '<div class="mistakelog" id="mistakeLog"></div>' +
        '<div class="btnbar"><button class="btn btn-ghost btn-sm" id="clearMistakes">Temizle</button>' +
        '<button class="btn btn-ghost btn-sm" id="printKey">Cevap anahtarını yazdır</button></div>' +
      '</section>';
  }

  function projectionLabHtml() {
    const cfg = L.projection;
    return '' +
      '<section class="card" id="projLab">' +
        '<div class="card-head"><h3>📈 Puan projeksiyonu</h3><span class="card-tag sec">Gerçek MEB formülü</span></div>' +
        '<div class="instruction">Choose how many questions you got right and wrong, and see the projected LGS contribution.<span class="tr">Kaç doğru, kaç yanlış yaptığını seç ve LGS\'ye tahmini katkısını gör.</span></div>' +
        '<div class="field"><label>Doğru (0–10)</label><input type="range" id="pC" min="0" max="10" step="1" value="7"></div>' +
        '<div class="field"><label>Yanlış (0–10)</label><input type="range" id="pW" min="0" max="10" step="1" value="3"></div>' +
        '<div class="proj-sliders">' +
          '<div class="field"><label>Kohort ortalaması (μ) — <span id="muVal">' + cfg.mu + '</span></label><input type="range" id="pMu" min="2" max="9" step="0.1" value="' + cfg.mu + '"></div>' +
          '<div class="field"><label>Standart sapma (σ) — <span id="sigVal">' + cfg.sigma + '</span></label><input type="range" id="pSig" min="1" max="5" step="0.1" value="' + cfg.sigma + '"></div>' +
        '</div>' +
        '<div id="projOut"></div>' +
      '</section>';
  }

  /* ================================================================
     WIRING
     ================================================================ */
  function wire(host, api) {
    host.querySelectorAll('.typecard').forEach(function (btn) {
      btn.addEventListener('click', function () {
        openWorkshop(btn.getAttribute('data-type'), host, api);
      });
    });
    host.querySelectorAll('[data-mock]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        startMock(btn.getAttribute('data-mock'), host, api);
      });
    });
    const clear = host.querySelector('#clearMistakes');
    if (clear) clear.addEventListener('click', function () {
      Store.resetLgs(); updateMistakes(); updateTypeCards();
      api.toast('Yanlış kayıtları temizlendi', 'ok');
    });
    const print = host.querySelector('#printKey');
    if (print) print.addEventListener('click', function () { api.printAnswerKey(); });

    ['pC', 'pW', 'pMu', 'pSig'].forEach(function (id) {
      const el = host.querySelector('#' + id);
      if (el) el.addEventListener('input', updateProjection);
    });
    updateProjection();
  }

  function updateProjection() {
    const host = document.getElementById('view');
    const c = +host.querySelector('#pC').value;
    const w = +host.querySelector('#pW').value;
    const mu = +host.querySelector('#pMu').value;
    const sig = +host.querySelector('#pSig').value;
    host.querySelector('#muVal').textContent = mu.toFixed(1);
    host.querySelector('#sigVal').textContent = sig.toFixed(1);

    // keep the sliders consistent: wrong cannot exceed what is left
    const net = Math.round((c - w / 3) * 100) / 100;
    const p = project(net, mu, sig);
    const best = project(L.projection.hpMax, mu, sig);

    host.querySelector('#projOut').innerHTML =
      '<div class="proj-out">' +
        '<div class="pval"><b>' + net.toFixed(2) + '</b><span>Ham puan (HP)</span></div>' +
        '<div class="pval"><b>' + p.sp.toFixed(1) + '</b><span>Standart puan (SP)</span></div>' +
        '<div class="pval"><b>' + p.asp.toFixed(1) + '</b><span>Ağırlıklı (ASP)</span></div>' +
        '<div class="pval"><b>' + Math.round((c / 10) * 100) + '%</b><span>Başarı</span></div>' +
      '</div>' +
      '<div class="formula">' +
        'HP  = ' + c + ' − (' + w + ' ÷ 3) = <b>' + net.toFixed(2) + '</b><br>' +
        'SP  = 10 × (' + net.toFixed(2) + ' − ' + mu.toFixed(1) + ') ÷ ' + sig.toFixed(1) + ' + 50 = <b>' + p.sp.toFixed(1) + '</b><br>' +
        'ASP = SP × 1 (İngilizce katsayısı) = <b>' + p.asp.toFixed(1) + '</b>' +
      '</div>' +
      '<div class="disclaimer">' +
        '⚠️ Bu bir projeksiyondur, tahmin değildir. MEB her yıl kohortun ortalamasını ve standart sapmasını kendi hesaplar; buradaki μ ve σ değerlerini değiştirerek senaryolar görebilirsin. 10/10 yapan bir öğrenci için SP = ' + best.sp.toFixed(1) + ' olur; iyi bir öğrencinin gerçek LGS katkısı bu değerin altındadır.' +
      '</div>';
  }

  function updateTypeCards() {
    const w = Store.raw().lgs.workshop || {};
    document.querySelectorAll('[data-stats]').forEach(function (el) {
      const id = el.getAttribute('data-stats');
      const rec = w[id];
      if (!rec || !rec.total) { el.innerHTML = '<span style="color:var(--ink-3)">henüz denenmedi</span>'; return; }
      const pct = Math.round((rec.correct / rec.total) * 100);
      el.innerHTML = '<span>' + rec.correct + '/' + rec.total + '</span><span style="color:' + (pct >= 70 ? 'var(--ok)' : pct >= 40 ? 'var(--warn)' : 'var(--bad)') + '">' + pct + '%</span>';
      const card = el.closest('.typecard');
      if (card) card.classList.add('attempted');
    });
  }

  function updateMistakes() {
    const host = document.getElementById('mistakeLog');
    if (!host) return;
    const ms = Store.mistakes();
    if (!ms.length) {
      host.innerHTML = '<div class="mistake-empty">🎉 Henüz yanlışın yok. Denemeleri çözdükçe burası dolacak.</div>';
      return;
    }
    host.innerHTML = ms.map(function (m) {
      const t = L.types.filter(function (x) { return x.id === m.type; })[0];
      return '<div class="mistakerow">' +
        '<div style="flex:1">' +
          '<div class="mr-q">' + esc(stripTags(m.stem).slice(0, 110)) + (stripTags(m.stem).length > 110 ? '…' : '') + '</div>' +
          '<div class="mr-why">Senin cevabın: <b>' + (m.chosen == null ? 'boş' : esc(m.opts[m.chosen])) + '</b> · Doğru: <b>' + esc(m.opts[m.answer]) + '</b></div>' +
          '<div class="mr-why">' + esc(m.why) + '</div>' +
        '</div>' +
        '<span class="mr-tag">' + (t ? t.ico + ' ' + t.name.split(' ')[0] : '') + '</span>' +
      '</div>';
    }).join('');
  }

  /* ================================================================
     WORKSHOP
     ================================================================ */
  function openWorkshop(typeId, host, api) {
    const type = L.types.filter(function (t) { return t.id === typeId; })[0];
    if (!type) return;
    const items = L.bank.filter(function (i) { return i.type === typeId; });
    if (!items.length) { api.toast('Bu tip için soru bulunamadı', 'bad'); return; }

    const el = host.querySelector('#workshopHost');
    el.innerHTML =
      '<div class="card" style="margin-top:1rem;background:var(--surface-2)">' +
        '<div class="card-head"><h3>' + type.ico + ' ' + esc(type.name) + '</h3>' +
          '<button class="btn btn-ghost btn-sm" id="wsClose" style="margin-left:auto">Kapat</button></div>' +
        '<div class="strategy">' +
          '<h4>🧭 Strateji · Strategy</h4>' +
          '<ul>' + type.strategy.tr.map(function (s) { return '<li>' + esc(s) + '</li>'; }).join('') + '</ul>' +
          '<div style="margin-top:.4rem;font-size:.78rem;color:#8a5307;opacity:.85">' + type.strategy.en.map(esc).join(' · ') + '</div>' +
        '</div>' +
        '<div id="wsItems"></div>' +
        '<div class="btnbar">' +
          '<button class="btn btn-ok" id="wsCheck">Kontrol et</button>' +
          '<button class="btn btn-ghost" id="wsReset">Sıfırla</button>' +
          '<span id="wsResult" style="font-weight:750"></span>' +
        '</div>' +
      '</div>';

    el.querySelector('#wsClose').addEventListener('click', function () { el.innerHTML = ''; });
    el.querySelector('#wsReset').addEventListener('click', function () { openWorkshop(typeId, host, api); });

    const state = { chosen: {} };
    const itemsHost = el.querySelector('#wsItems');
    itemsHost.innerHTML = items.map(function (it, i) { return questionHtml(it, i, state.chosen, 'ws'); }).join('');
    wireQuestionOptions(itemsHost, state.chosen);

    el.querySelector('#wsCheck').addEventListener('click', function () {
      let correct = 0, answered = 0;
      items.forEach(function (it, i) {
        const c = state.chosen[i];
        if (c === undefined) return;
        answered++;
        if (c === it.answer) correct++;
        revealQuestion(itemsHost, i, it, c);
        if (c !== it.answer) {
          Store.addMistake({ id: it.id, type: it.type, diff: it.diff, stem: stripTags(it.stem), chosen: c, answer: it.answer, opts: it.opts, why: it.why, at: Date.now() });
        }
      });
      if (answered === 0) { api.toast('Önce bir soru işaretle', 'bad'); return; }
      Store.lgsWorkshop(typeId, correct, items.length);
      Store.addXp(correct * 15);
      if (correct === items.length) { Store.bumpStreak(); api.confetti(); api.toast('Tamam! 🎯 Tümü doğru', 'ok'); }
      else if (correct > 0) Store.resetStreak();
      el.querySelector('#wsResult').innerHTML = correct + ' / ' + items.length + ' doğru';
      updateTypeCards(); updateMistakes(); api.refreshChrome();
      api.toast('Atölye bitti: ' + correct + '/' + items.length, correct === items.length ? 'ok' : 'info');
    });

    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  /* ================================================================
     MOCK EXAM RUNNER
     ================================================================ */
  function startMock(mockId, host, api) {
    const mock = L.mocks.filter(function (m) { return m.id === mockId; })[0];
    if (!mock) return;
    const items = L.itemsByIds(mock.itemIds);
    if (!items.length) { api.toast('Deneme yüklenemedi', 'bad'); return; }

    const st = {
      mockId: mock.id,
      items: items, idx: 0, answers: {}, flags: {},
      startedAt: Date.now(), remaining: mock.durationSec,
      finished: false, timerId: null
    };
    const el = host.querySelector('#examHost');

    function renderExam() {
      const it = st.items[st.idx];
      el.innerHTML =
        '<div class="examshell" style="margin-top:1rem">' +
          '<div class="examhead">' +
            '<span class="exam-title">' + esc(mock.name) + '</span>' +
            '<span class="timer" id="examTimer">⏱ ' + fmt(st.remaining) + '</span>' +
            '<span class="chip">' + (st.idx + 1) + ' / ' + st.items.length + '</span>' +
            '<div class="palette" id="pal"></div>' +
          '</div>' +
          '<div class="exambody">' +
            '<div id="examQ"></div>' +
          '</div>' +
          '<div class="examfoot">' +
            '<button class="btn btn-ghost btn-sm" id="prevQ">‹ Önceki</button>' +
            '<button class="btn btn-ghost btn-sm" id="flagQ">' + (st.flags[st.idx] ? '🚩 İşaretli' : '🚩 İşaretle') + '</button>' +
            '<button class="btn btn-ghost btn-sm" id="clearQ">Temizle</button>' +
            '<button class="btn btn-sm" id="nextQ">Sonraki ›</button>' +
            '<button class="btn btn-ok btn-sm" id="finishQ" style="margin-left:auto">Sınavı bitir</button>' +
          '</div>' +
        '</div>';

      const q = el.querySelector('#examQ');
      q.innerHTML = questionHtml(it, st.idx, st.answers, 'exam', true);
      // repaint the palette immediately so the current question shows as
      // answered the moment a student picks an option, not only on navigation
      wireQuestionOptions(q, st.answers, renderPalette);
      renderPalette();

      el.querySelector('#prevQ').onclick = function () { if (st.idx > 0) { st.idx--; renderExam(); } };
      el.querySelector('#nextQ').onclick = function () { if (st.idx < st.items.length - 1) { st.idx++; renderExam(); } };
      el.querySelector('#flagQ').onclick = function () { st.flags[st.idx] = !st.flags[st.idx]; renderExam(); };
      el.querySelector('#clearQ').onclick = function () { delete st.answers[st.idx]; renderExam(); };
      el.querySelector('#finishQ').onclick = finish;
    }

    function renderPalette() {
      const pal = el.querySelector('#pal');
      pal.innerHTML = st.items.map(function (_, i) {
        // current and answered must coexist, otherwise the question a student
        // is looking at never shows as answered
        let cls = '';
        if (i === st.idx) cls += 'current ';
        if (st.answers[i] !== undefined) cls += 'answered';
        else if (st.flags[i]) cls += 'flagged';
        return '<button class="palbtn ' + cls + '" data-i="' + i + '">' + (i + 1) + '</button>';
      }).join('');
      pal.querySelectorAll('.palbtn').forEach(function (b) {
        b.onclick = function () { st.idx = +b.getAttribute('data-i'); renderExam(); };
      });
    }

    function finish() {
      if (st.finished) return;
      st.finished = true;
      clearInterval(st.timerId);
      const used = Math.round((Date.now() - st.startedAt) / 1000);
      const r = score(st.items, st.answers);
      const p = project(r.net);

      // record mistakes
      st.items.forEach(function (it, i) {
        if (st.answers[i] !== it.answer) {
          Store.addMistake({ id: it.id, type: it.type, diff: it.diff, stem: stripTags(it.stem), chosen: st.answers[i] === undefined ? null : st.answers[i], answer: it.answer, opts: it.opts, why: it.why, at: Date.now() });
        }
      });
      Store.lgsMock(mock.id, { net: r.net, pct: r.pct });
      Store.addXp(r.correct * 10);
      if (r.pct >= 80) api.confetti();
      api.refreshChrome();

      el.innerHTML = resultHtml(mock, r, p, used, st, api);
      wireResult(el, st, api);
    }

    function tick() {
      if (st.finished) return;
      st.remaining--;
      const t = el.querySelector('#examTimer');
      if (t) {
        t.textContent = '⏱ ' + fmt(st.remaining);
        t.className = 'timer' + (st.remaining <= 30 ? ' critical' : st.remaining <= 90 ? ' warn' : '');
      }
      if (st.remaining <= 0) { finish(); api.toast('Süre doldu! ⏰', 'bad'); }
    }

    renderExam();
    st.timerId = setInterval(tick, 1000);
  }

  function fmt(s) {
    const m = Math.floor(s / 60), ss = s % 60;
    return m + ':' + (ss < 10 ? '0' : '') + ss;
  }

  /* ================================================================
     RESULT
     ================================================================ */
  function resultHtml(mock, r, p, used, st, api) {
    const deg = Math.max(0, Math.min(1, r.pct / 100)) * 360;
    const colour = r.pct >= 80 ? 'var(--ok)' : r.pct >= 50 ? 'var(--warn)' : 'var(--bad)';

    // diagnosis by type
    let diag = '';
    const types = Object.keys(r.byType);
    if (types.length) {
      diag = '<div class="diagnosis"><h4 style="font-size:.9rem;margin-bottom:.6rem">🔍 Soru tipine göre kırılım</h4>' +
        types.map(function (tid) {
          const d = r.byType[tid];
          const t = L.types.filter(function (x) { return x.id === tid; })[0];
          const pct = Math.round((d.correct / d.total) * 100);
          const cls = pct >= 75 ? '' : pct >= 40 ? 'mid' : 'weak';
          return '<div class="diagrow">' +
            '<span class="dlabel">' + (t ? t.ico + ' ' + esc(t.name) : tid) + '</span>' +
            '<span class="dbar"><span class="dbar-fill ' + cls + '" style="width:' + pct + '%"></span></span>' +
            '<span class="dpct">' + pct + '%</span>' +
            '<span class="dcount">' + d.correct + '/' + d.total + '</span>' +
          '</div>';
        }).join('') + '</div>';
    }

    // difficulty breakdown
    const diffRows = ['easy', 'medium', 'hard'].filter(function (d) { return r.byDiff[d][1]; }).map(function (d) {
      return '<span class="tag ' + d + '">' + DIFF_LABEL[d] + ': ' + r.byDiff[d][0] + '/' + r.byDiff[d][1] + '</span>';
    }).join('');

    const mins = Math.floor(used / 60), secs = used % 60;
    const perQ = (used / r.total).toFixed(1);

    const advice = buildAdvice(r);

    return '' +
      '<div class="result" style="margin-top:1rem">' +
        '<div class="result-top">' +
          '<div class="net-dial" style="background:conic-gradient(' + colour + ' 0deg, ' + colour + ' ' + deg + 'deg, var(--surface-2) ' + deg + 'deg)">' +
            '<div class="net-inner"><b>' + r.net.toFixed(2) + '</b><span>NET</span></div>' +
          '</div>' +
          '<div style="flex:1;min-width:220px">' +
            '<h3 style="margin-bottom:.2rem">' + esc(mock.name) + '</h3>' +
            '<p style="font-size:.85rem;color:var(--ink-2);margin-bottom:.5rem">Süre: <b>' + mins + 'dk ' + secs + 'sn</b> · Soru başına ortalama <b>' + perQ + ' sn</b></p>' +
            '<div class="tag-row">' + diffRows + '</div>' +
            '<p style="font-size:.85rem;color:var(--ink-2);margin:0">Zaman baskısı: ' + (perQ > 90 ? '⏰ Yavaşsın — bu tempoda LGS\'de 10 soruyu bitiremezsin.' : perQ > 60 ? '⏱ Orta tempoda gidiyorsun.' : '⚡ Çok hızlısın, dikkatli misin?') + '</p>' +
          '</div>' +
        '</div>' +
        '<div class="scoregrid">' +
          '<div class="scorecell ok"><b>' + r.correct + '</b><span>Doğru</span></div>' +
          '<div class="scorecell bad"><b>' + r.wrong + '</b><span>Yanlış</span></div>' +
          '<div class="scorecell warn"><b>' + r.blank + '</b><span>Boş</span></div>' +
          '<div class="scorecell brand"><b>' + r.pct + '%</b><span>Başarı</span></div>' +
          '<div class="scorecell brand"><b>' + p.sp.toFixed(1) + '</b><span>SP (İngilizce)</span></div>' +
        '</div>' +
        (r.blank > 0 ? '<div class="feedback bad show">⚠️ <b>' + r.blank + ' boş bıraktın.</b> LGS\'de boş da yanlış da sayılır ama boş bırakırsan sıfır alırsın; tahmin etmek en kötü ihtimalle 1/4 şans verir. <span class="why">Net = doğru − yanlış/3. Boş, neti değiştirmez ama seni puanın tamamından mahrum eder.</span></div>' : '') +
        diag +
        '<div class="projection"><h4>📈 MEB projeksiyonu</h4>' +
          '<div class="formula">HP = ' + r.correct + ' − (' + r.wrong + ' ÷ 3) = <b>' + r.net.toFixed(2) + '</b><br>' +
          'SP = 10 × (' + r.net.toFixed(2) + ' − ' + p.mu + ') ÷ ' + p.sigma + ' + 50 = <b>' + p.sp.toFixed(1) + '</b><br>' +
          'ASP = SP × 1 = <b>' + p.asp.toFixed(1) + '</b> · İngilizce katsayısı 1 olduğu için bu değer doğrudan toplam puanına eklenir.</div>' +
          '<div class="disclaimer">⚠️ μ = ' + p.mu + ' ve σ = ' + p.sigma + ' varsayılan değerlerdir. MEB bunları her yıl sınava girenlerin gerçek sonuçlarından hesaplar, önceden yayınlamaz. Bu nedenle sonuç bir <b>projeksiyon</b>tur, kesin bir puan tahmini değildir.</div>' +
        '</div>' +
        advice +
        '<div class="btnbar">' +
          '<button class="btn btn-ghost" id="retryMock">🔁 Tekrar dene</button>' +
          '<button class="btn btn-ghost" id="reviewMock">Cevapları incele</button>' +
          '<button class="btn btn-ghost" id="printKey2">🖨️ Yazdır</button>' +
        '</div>' +
        '<div id="reviewHost"></div>' +
      '</div>';
  }

  function buildAdvice(r) {
    const weak = Object.keys(r.byType).filter(function (t) { return r.byType[t].correct / r.byType[t].total < 0.7; });
    const typeName = function (id) { const t = L.types.filter(function (x) { return x.id === id; })[0]; return t ? t.name : id; };
    let html = '<div class="strategy" style="margin-top:1rem"><h4>🎯 Sıradaki adım</h4><ul>';
    if (weak.length) {
      html += '<li>Zayıf olduğun tipler: <b>' + weak.map(typeName).join(', ') + '</b>. Bu atölyeleri tekrar çöz.</li>';
    } else {
      html += '<li>Tüm tiplerde iyisin. Şimdi tempoyu artır: Deneme 2\'yi 8 dakikada çöz.</li>';
    }
    if (r.blank > 0) html += '<li>' + r.blank + ' boş soru var. Sınavda emin olmasan bile işaretle — kaybedecek bir şeyin yok.</li>';
    if (r.byDiff.hard[1] && r.byDiff.hard[0] / r.byDiff.hard[1] < 0.5) html += '<li>Zor sorularda zorlanıyorsın. Zorluk kırılımına bak: bu sorularda tuzak ifadeler var.</li>';
    html += '</ul></div>';
    return html;
  }

  function wireResult(el, st, api) {
    const retry = el.querySelector('#retryMock');
    if (retry) retry.onclick = function () {
      const host = document.getElementById('view');
      startMock(st.mockId, host, api);
    };
    const review = el.querySelector('#reviewMock');
    if (review) review.onclick = function () { toggleReview(el, st, api); };
    const pk = el.querySelector('#printKey2');
    if (pk) pk.onclick = function () { api.printAnswerKey(); };
  }

  function toggleReview(el, st, api) {
    const host = el.querySelector('#reviewHost');
    if (host.innerHTML) { host.innerHTML = ''; return; }
    host.innerHTML = '<div class="card" style="background:var(--surface-2);margin-top:.8rem">' +
      '<h4 style="margin-bottom:.7rem">📖 Cevap incelemesi</h4>' +
      st.items.map(function (it, i) {
        const a = st.answers[i];
        const ok = a === it.answer;
        return '<div style="padding:.6rem 0;border-bottom:1px dashed var(--surface-3)">' +
          '<div style="display:flex;gap:.6rem;align-items:flex-start">' +
            '<span style="flex:none;font-weight:800;color:' + (ok ? 'var(--ok)' : 'var(--bad)') + '">' + (i + 1) + '.</span>' +
            '<div style="flex:1">' +
              '<div style="font-size:.88rem">' + esc(stripTags(it.stem)) + '</div>' +
              (it.stimulus ? '<div class="stimulus" style="margin-top:.4rem;font-size:.82rem">' + stimulusHtml(it.stimulus) + '</div>' : '') +
              '<div style="font-size:.84rem;margin-top:.3rem">Senin cevabın: <b>' + (a === undefined ? '— (boş)' : esc(it.opts[a])) + '</b></div>' +
              '<div style="font-size:.84rem;color:var(--ok)">Doğru cevap: <b>' + esc(it.opts[it.answer]) + '</b></div>' +
              '<div style="font-size:.82rem;color:var(--ink-2);margin-top:.2rem">' + esc(it.why) + '</div>' +
            '</div>' +
          '</div>' +
        '</div>';
      }).join('') + '</div>';
  }

  /* ================================================================
     SHARED QUESTION RENDERER
     ================================================================ */
  function questionHtml(it, i, chosenMap, ns, isExam) {
    const n = i + 1;
    let h = '<div class="mcq-item" data-q="' + i + '">';
    if (it.stimulusTitle) h += '<div class="mcq-stem"><span class="qno">' + esc(it.stimulusTitle) + '</span></div>';
    if (it.stimulus) h += '<div class="stimulus">' + stimulusHtml(it.stimulus) + '</div>';
    h += '<div class="tag-row"><span class="tag ' + it.diff + '">' + DIFF_LABEL[it.diff] + '</span></div>';
    h += '<div class="mcq-stem"><span class="qno">' + n + '</span>' + esc(it.stem) + '</div>';
    h += '<div class="mcq-opts">' + it.opts.map(function (o, oi) {
      return '<button class="mcq-opt" data-q="' + i + '" data-o="' + oi + '"><span class="opt-letter">' + 'ABCD'[oi] + '</span><span>' + esc(o) + '</span></button>';
    }).join('') + '</div>';
    h += '<div class="mcq-explain" data-explain="' + i + '"></div>';
    h += '</div>';
    return h;
  }

  function wireQuestionOptions(scope, chosenMap, onChange) {
    scope.querySelectorAll('.mcq-opt').forEach(function (btn) {
      btn.addEventListener('click', function () {
        const q = +btn.getAttribute('data-q');
        const o = +btn.getAttribute('data-o');
        chosenMap[q] = o;
        scope.querySelectorAll('.mcq-opt[data-q="' + q + '"]').forEach(function (b) { b.classList.remove('selected'); });
        btn.classList.add('selected');
        if (onChange) onChange();
      });
    });
  }

  function revealQuestion(scope, i, it, chosen) {
    scope.querySelectorAll('.mcq-opt[data-q="' + i + '"]').forEach(function (b) {
      const o = +b.getAttribute('data-o');
      b.disabled = true;
      if (o === it.answer) b.classList.add('answer-correct');
      else if (o === chosen) b.classList.add('answer-wrong');
    });
    const ex = scope.querySelector('[data-explain="' + i + '"]');
    if (ex) {
      ex.innerHTML = '<b>💡 ' + (chosen === it.answer ? 'Doğru!' : 'Doğrusu: ' + esc(it.opts[it.answer])) + '</b><br>' + esc(it.why);
      ex.classList.add('show');
    }
  }

  return {
    render: render,
    score: score,
    project: project,
    stripTags: stripTags,
    stimulusHtml: stimulusHtml,
    questionHtml: questionHtml,
    wireQuestionOptions: wireQuestionOptions,
    revealQuestion: revealQuestion,
    fmt: fmt,
    DIFF_LABEL: DIFF_LABEL
  };
})();
