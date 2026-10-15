/* ============================================================
   Unit 2 · Teen Life — application shell
   Router, sidebar, dashboard, and every exercise renderer.
   ============================================================ */

(function () {

  const WB = window.WB, Store = window.Store, AP = window.AudioPlayer, LGSApp = window.LGSApp;
  const SECTIONS = WB.sections;
  const GROUPS = [
    { id: 'warmup', label: 'Isınma' },
    { id: 'skills', label: 'Dinleme · Konuşma · Okuma' },
    { id: 'core', label: 'Dilbilgisi · Kelime · Yazma' },
    { id: 'assessment', label: 'Değerlendirme' },
    { id: 'deep', label: '🌊 Derinlemesine' },
    { id: 'lgs', label: 'LGS' }
  ];

  /* ---------------- tiny helpers ---------------- */
  function esc(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }
  function $(sel, scope) { return (scope || document).querySelector(sel); }
  function $$(sel, scope) { return Array.prototype.slice.call((scope || document).querySelectorAll(sel)); }
  function shuffle(a) {
    const x = a.slice();
    for (let i = x.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const t = x[i]; x[i] = x[j]; x[j] = t;
    }
    return x;
  }
  function norm(s) {
    return String(s).toLowerCase()
      .replace(/[.,!?;:"'’“”()\[\]]/g, '')
      .replace(/\s+/g, ' ')
      .trim();
  }

  /* ---------------- toast ---------------- */
  let toastTimer = null;
  function toast(msg, cls) {
    const old = $('.toast'); if (old) old.remove();
    const d = document.createElement('div');
    d.className = 'toast ' + (cls || '');
    d.innerHTML = msg;
    document.body.appendChild(d);
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { d.remove(); }, 2600);
  }

  /* ---------------- confetti ---------------- */
  function confetti() {
    const colors = ['#4f46e5', '#eab308', '#16a34a', '#db2777', '#0891b2', '#f97316'];
    for (let i = 0; i < 70; i++) {
      const c = document.createElement('div');
      c.className = 'confetti';
      c.style.left = Math.random() * 100 + 'vw';
      c.style.background = colors[i % colors.length];
      c.style.animationDuration = (1.8 + Math.random() * 1.8) + 's';
      c.style.animationDelay = (Math.random() * 0.35) + 's';
      c.style.transform = 'rotate(' + (Math.random() * 360) + 'deg)';
      document.body.appendChild(c);
      setTimeout(function () { c.remove(); }, 4200);
    }
  }

  /* ---------------- modal ---------------- */
  function openModal(title, html) {
    $('#modalTitle').innerHTML = title;
    $('#modalBody').innerHTML = html;
    $('#modalBackdrop').hidden = false;
  }
  function closeModal() { $('#modalBackdrop').hidden = true; }

  /* ---------------- badges ---------------- */
  const BADGES = [
    { id: 'first-blood', ico: '🌱', name: 'İlk adım', desc: 'İlk alıştırmayı bitir.' },
    { id: 'perfect', ico: '💯', name: 'Kusursuz', desc: 'Bir alıştırmada %100 al.' },
    { id: 'streak-10', ico: '🔥', name: 'Seri', desc: '10 doğru üst üste.' },
    { id: 'memory-master', ico: '🧠', name: 'Hafıza Ustası', desc: 'Hafıza testinde 6/6.' },
    { id: 'blog-writer', ico: '✍️', name: 'Blogger', desc: 'Blog yazını kaydet.' },
    { id: 'band-writer', ico: '🎸', name: 'Grup Yazarı', desc: 'Bir grup paragrafı yaz.' },
    { id: 'unit-done', ico: '🏆', name: 'Unit 2 Tamamlandı', desc: 'Unit testi bitir.' },
    { id: 'lgs-first', ico: '🎯', name: 'LGS Adayı', desc: 'İlk denemeyi bitir.' },
    { id: 'lgs-8', ico: '🥇', name: 'LGS Avcısı', desc: 'Bir denemede 8/10 veya üzeri.' },
    { id: 'lgs-perfect', ico: '👑', name: 'LGS Şampiyonu', desc: 'Bir denemede 10/10.' },
    { id: 'all-types', ico: '🧰', name: 'Tip Ustası', desc: '6 soru tipinin hepsini dene.' }
  ];
  function award(id) {
    if (Store.awardBadge(id)) {
      const b = BADGES.filter(function (x) { return x.id === id; })[0];
      if (b) toast('🏅 Yeni rozet: <b>' + b.name + '</b>', 'gold');
      renderChrome();
    }
  }

  /* ---------------- chrome ---------------- */
  function renderChrome() {
    const s = Store.stats();
    $('#xpValue').textContent = s.xp;
    $('#streakValue').textContent = s.streak;
    $('#badgeCount').textContent = Store.badges().length;

    const prog = Store.sectionProgress(SECTIONS);
    let done = 0;
    SECTIONS.forEach(function (sec) { if ((prog[sec.id] || 0) >= 0.999) done++; });
    const overall = SECTIONS.reduce(function (a, sec) { return a + (prog[sec.id] || 0); }, 0) / SECTIONS.length;
    $('#progressFill').style.width = Math.round(overall * 100) + '%';
    $('#statusPct').textContent = Math.round(overall * 100) + '%';
    $('#statusText').textContent = done + ' / ' + SECTIONS.length + ' bölüm tamamlandı';

    $$('.side-item').forEach(function (btn) {
      const id = btn.getAttribute('data-sec');
      const pct = prog[id] || 0;
      const holder = btn.querySelector('.side-pct');
      if (holder) {
        holder.innerHTML = pct >= 0.999 ? '<span class="done">✓</span>' : Math.round(pct * 100) + '%';
      }
    });
  }

  /* ---------------- sidebar ---------------- */
  function buildSidebar() {
    const nav = $('#sidebar');
    nav.innerHTML = '<button class="side-item" data-sec="home"><span class="ico">🏠</span><span>Ana sayfa</span></button>' +
      GROUPS.map(function (g) {
        const secs = SECTIONS.filter(function (s) { return s.group === g.id; });
        if (!secs.length) return '';
        return '<div class="side-group"><div class="side-label">' + esc(g.label) + '</div>' +
          secs.map(function (s) {
            return '<button class="side-item' + (s.lgs ? ' lgs' : '') + '" data-sec="' + s.id + '">' +
              '<span class="ico">' + s.icon + '</span><span>' + esc(s.nav) + '</span>' +
              '<span class="side-pct"></span></button>';
          }).join('') + '</div>';
      }).join('') +
      '<div class="side-group"><div class="side-label">Araçlar</div>' +
        '<button class="side-item" id="navBadges"><span class="ico">🏅</span><span>Rozetler</span></button>' +
        '<button class="side-item" id="navHelp"><span class="ico">❓</span><span>Nasıl kullanılır?</span></button>' +
        '<button class="side-item" id="navReset"><span class="ico">🗑️</span><span>İlerlemeyi sıfırla</span></button>' +
      '</div>';

    nav.addEventListener('click', function (e) {
      const btn = e.target.closest('[data-sec]');
      if (btn) { location.hash = '#/' + btn.getAttribute('data-sec'); nav.classList.remove('open'); return; }
      if (e.target.closest('#navBadges')) showBadges();
      if (e.target.closest('#navHelp')) showHelp();
      if (e.target.closest('#navReset')) {
        if (confirm('Tüm ilerleme silinecek. Emin misin?')) {
          Store.resetAll(); renderChrome(); toast('İlerleme sıfırlandı', 'ok'); route();
        }
      }
    });
  }

  function showBadges() {
    const owned = Store.badges();
    openModal('🏅 Rozetler', '<div class="badgegrid">' + BADGES.map(function (b) {
      const has = owned.indexOf(b.id) >= 0;
      return '<div class="badgeitem' + (has ? '' : ' locked') + '"><span class="bico">' + b.ico + '</span>' +
        '<span class="bname">' + esc(b.name) + '</span><span class="bdesc">' + esc(b.desc) + '</span></div>';
    }).join('') + '</div>');
  }

  function showHelp() {
    openModal('❓ Nasıl kullanılır?', '' +
      '<div style="font-size:.9rem;line-height:1.65">' +
      '<p><b>Bu klasörü aç:</b> <code>index.html</code> dosyasına çift tıkla. Chrome veya Edge kullan. İnternet gerekmez.</p>' +
      '<p><b>Bölümler:</b> Sol menüde sırayla ilerle. Kitaptaki sayfa numaraları her kartın sağ üstünde yazıyor.</p>' +
      '<p><b>Dinleme:</b> Her dinleme alıştırmasında bir oynat düğmesi var. Ses dosyası yoksa tarayıcının kendi sesi devreye girer. Hızı değiştirebilir, metni açıp okuyabilirsin.</p>' +
      '<p><b>XP ve rozetler:</b> Doğru cevaplar XP kazandırır. Üst üste doğru yaparsan seri büyür.</p>' +
      '<p><b>Öğretmen modu:</b> Sağ üstteki 📽️ düğmesi. Tipografi büyür, sorular tek tek gösterilir — projeksiyon için.</p>' +
      '<p><b>LGS bölümü:</b> Kitapta olmayan yeni bölüm. ' + window.LGS.types.length + ' soru tipi atölyesi, ' + window.LGS.mocks.length + ' gerçek süreli deneme ve MEB net formülü (doğru − yanlış/3) içerir.</p>' +
      '<p><b>İlerleme:</b> Tarayıcında saklanır. Aynı bilgisayarda tekrar açtığında kaldığın yerden devam edersin.</p>' +
      '<p><b>Cevap anahtarı:</b> <code>#answer-key</code> adresine git ya da LGS bölümündeki "Yazdır" düğmesini kullan.</p>' +
      '</div>');
  }

  /* ================================================================
     AUDIO PLAYER COMPONENT
     ================================================================ */
  function audioPlayerHtml(trackId) {
    const s = AP.getScript(trackId);
    if (!s) return '';
    return '<div class="audioplayer" data-audio="' + trackId + '">' +
      '<button class="btn btn-sm ap-play">▶ Dinle</button>' +
      '<span class="ap-label">' + esc(s.title) + '</span>' +
      '<span class="audio-progress"><span class="audio-progress-fill"></span></span>' +
      '<span class="ap-speeds">' +
        '<button class="speedbtn" data-rate="0.7">0.7×</button>' +
        '<button class="speedbtn active" data-rate="0.86">1×</button>' +
        '<button class="speedbtn" data-rate="1">1.2×</button>' +
      '</span>' +
      '<button class="btn btn-ghost btn-sm ap-script">📝 Metin</button>' +
      '<span class="ap-src"></span>' +
    '</div>' +
    '<div class="transcript" data-transcript="' + trackId + '">' +
      s.lines.map(function (l) {
        return '<div class="dline ' + (l.s === 'Z' ? 'f' : '') + '" data-line="' + esc(l.t) + '">' +
          '<span class="davatar ' + (l.s === 'Z' ? 'f' : '') + '">' + l.s + '</span>' +
          '<span class="dtext"><span class="dname">' + (l.s === 'Z' ? 'Zira' : 'David') + '</span>' + esc(l.t) + '</span>' +
        '</div>';
      }).join('') +
    '</div>';
  }

  let audioWired = false;
  function wireAudio(scope) {
    if (!audioWired) {
      audioWired = true;
      AP.onState(function (st) {
        if (st.kind === 'progress' || st.kind === 'line' || st.kind === 'ended') {
          $$('[data-audio] .audio-progress-fill').forEach(function (f) { f.style.width = Math.round(st.pct * 100) + '%'; });
        }
        if (st.kind === 'ended') {
          $$('.ap-play').forEach(function (b) { b.textContent = '▶ Dinle'; });
          $$('.dline.speaking').forEach(function (l) { l.classList.remove('speaking'); });
        }
      });
    }
    $$('[data-audio]', scope).forEach(function (box) {
      const id = box.getAttribute('data-audio');
      const playBtn = $('.ap-play', box);
      const fill = $('.audio-progress-fill', box);
      const src = $('.ap-src', box);
      const tr = scope.querySelector('[data-transcript="' + id + '"]');

      src.textContent = AP.supported() ? 'ses hazır' : 'ses yok';
      if (!AP.supported()) src.textContent = 'tarayıcı ses desteği yok';

      playBtn.addEventListener('click', function () {
        if (AP.isPlaying()) { AP.stop(); playBtn.textContent = '▶ Dinle'; return; }
        playBtn.textContent = '⏹ Durdur';
        AP.play(id, {
          onLine: function (i) {
            if (!tr) return;
            $$('.dline', tr).forEach(function (l, li) {
              l.classList.toggle('speaking', li === i);
            });
            if (i >= 0) {
              const line = $$('.dline', tr)[i];
              if (line && tr.classList.contains('show')) line.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
            }
          }
        }).then(function () { src.textContent = 'oynatılıyor'; });
      });

      $$('.speedbtn', box).forEach(function (b) {
        b.addEventListener('click', function () {
          $$('.speedbtn', box).forEach(function (x) { x.classList.remove('active'); });
          b.classList.add('active');
          AP.setRate(parseFloat(b.getAttribute('data-rate')));
        });
      });

      const scriptBtn = $('.ap-script', box);
      if (scriptBtn && tr) {
        scriptBtn.addEventListener('click', function () {
          tr.classList.toggle('show');
          scriptBtn.textContent = tr.classList.contains('show') ? '📝 Metni gizle' : '📝 Metin';
        });
      }
    });

  }

  /* ================================================================
     SHARED EXERCISE CHROME
     ================================================================ */
  function exHead(ex) {
    return '<div class="card-head">' +
      '<h3>' + esc(ex.tag || 'Exercise') + '</h3>' +
      (ex.audioId ? '<span class="card-tag sec">🎧 Listening</span>' : '') +
      (ex.page ? '<span class="card-page">Kitap sayfası ' + ex.page + '</span>' : '') +
      '</div>' +
      '<div class="instruction">' + esc(ex.instruction) +
        (ex.instructionTr ? '<span class="tr">' + esc(ex.instructionTr) + '</span>' : '') +
      '</div>';
  }
  function feedbackBox() { return '<div class="feedback"></div>'; }
  function showFeedback(node, ok, html) {
    node.className = 'feedback show ' + (ok ? 'ok' : 'bad');
    node.innerHTML = html;
  }
  function bar(extra) {
    return '<div class="btnbar">' + (extra || '') +
      '<button class="btn btn-ok" data-check>✓ Kontrol et</button>' +
      '<button class="btn btn-ghost" data-reset>↻ Sıfırla</button>' +
      '</div>';
  }

  /* ================================================================
     RENDERERS
     ================================================================ */
  const RENDERERS = {};

  /* ---------- MATCH ---------- */
  RENDERERS.match = function (ex, host) {
    const left = shuffle(ex.pairs.map(function (p, i) { return { key: i, label: p.a }; }));
    const right = shuffle(ex.pairs.map(function (p, i) { return { key: i, label: p.b }; }));
    let sel = null, solved = 0;

    host.innerHTML = exHead(ex) +
      '<div class="match-grid">' +
        '<div class="match-col"><h4>Verbs</h4>' + left.map(function (o) {
          return '<button class="match-item" data-side="a" data-k="' + o.key + '">' + esc(o.label) + '</button>';
        }).join('') + '</div>' +
        '<div class="match-col"><h4>Phrases</h4>' + right.map(function (o) {
          return '<button class="match-item" data-side="b" data-k="' + o.key + '">' + esc(o.label) + '</button>';
        }).join('') + '</div>' +
      '</div>' +
      (ex.hint ? '<div class="hint-line">' + esc(ex.hint) + '</div>' : '') +
      feedbackBox() + bar();

    host.onclick = function (e) {
      const btn = e.target.closest('.match-item');
      if (!btn || btn.disabled) return;
      const side = btn.getAttribute('data-side');
      if (!sel) {
        sel = btn; btn.classList.add('selected');
        return;
      }
      if (sel === btn) { sel.classList.remove('selected'); sel = null; return; }
      if (sel.getAttribute('data-side') === side) {
        sel.classList.remove('selected'); sel = btn; btn.classList.add('selected'); return;
      }
      const a = side === 'a' ? btn : sel;
      const b = side === 'a' ? sel : btn;
      if (a.getAttribute('data-k') === b.getAttribute('data-k')) {
        a.classList.add('paired'); b.classList.add('paired');
        a.disabled = true; b.disabled = true;
        solved++;
        Store.addXp(5);
        if (solved === ex.pairs.length) {
          Store.record(ex.id, ex.pairs.length, ex.pairs.length, true);
          Store.bumpStreak();
          showFeedback(host.querySelector('.feedback'), true, '🎉 Tamam! Tüm eşleşmeler doğru.');
          award('first-blood');
          api.refreshChrome();
        }
      } else {
        a.classList.add('wrong'); b.classList.add('wrong');
        Store.resetStreak();
        setTimeout(function () { a.classList.remove('wrong'); b.classList.remove('wrong'); }, 500);
      }
      sel = null;
    };

    $('[data-reset]', host).addEventListener('click', function () { render(ex, host); });
    $('[data-check]', host).addEventListener('click', function () {
      const pct = solved / ex.pairs.length;
      showFeedback(host.querySelector('.feedback'), pct === 1,
        pct === 1 ? '🎉 Hepsi doğru!' : solved + ' / ' + ex.pairs.length + ' doğru. Yanlış olanları tekrar dene.');
      Store.record(ex.id, solved, ex.pairs.length, pct === 1);
      api.refreshChrome();
    });
  };

  /* ---------- TILES (listen & number) ---------- */
  RENDERERS.tiles = function (ex, host) {
    host.innerHTML = exHead(ex) +
      (ex.audioId ? audioPlayerHtml(ex.audioId) : '') +
      '<div class="tiles">' + ex.tiles.map(function (t, i) {
        return '<div class="tile" data-i="' + i + '">' +
          '<span class="tile-num empty">·</span>' +
          '<span class="tile-emoji">' + t.emoji + '</span>' +
          '<span class="tile-label">' + esc(t.label) + '</span>' +
          '<input type="number" min="0" max="9" inputmode="numeric" aria-label="order for ' + esc(t.label) + '">' +
        '</div>';
      }).join('') + '</div>' +
      '<div class="hint-line">Leave the extra picture empty (0).</div>' +
      feedbackBox() + bar();
    wireAudio(host);

    $('[data-check]', host).addEventListener('click', function () {
      let correct = 0;
      ex.tiles.forEach(function (t, i) {
        const box = host.querySelector('.tile[data-i="' + i + '"]');
        const input = $('input', box);
        const val = parseInt(input.value, 10) || 0;
        const want = ex.answers[i];
        const ok = val === want;
        box.classList.remove('answer-correct', 'answer-wrong', 'extra-correct');
        box.classList.add(ok ? (want === 0 ? 'extra-correct' : 'answer-correct') : 'answer-wrong');
        $('.tile-num', box).textContent = val || '·';
        $('.tile-num', box).classList.toggle('empty', !val);
        if (ok) correct++;
      });
      const pct = correct / ex.tiles.length;
      showFeedback(host.querySelector('.feedback'), pct === 1,
        pct === 1 ? '🎧 Perfect! All seven pictures are in the right order.' : correct + ' / ' + ex.tiles.length + ' doğru. Tekrar dinle.');
      Store.record(ex.id, correct, ex.tiles.length, pct === 1);
      Store.addXp(correct * 3);
      if (pct === 1) { Store.bumpStreak(); award('first-blood'); }
      else Store.resetStreak();
      api.refreshChrome();
    });
    $('[data-reset]', host).addEventListener('click', function () { render(ex, host); });
  };

  /* ---------- BUILDER ---------- */
  RENDERERS.builder = function (ex, host) {
    if (ex.custom === 'fourboxes') return renderFourBoxes(ex, host);

    const st = ex.groups.map(function (g) { return { picked: [], bank: shuffle(g.bank) }; });

    function sentence(gi) {
      const g = ex.groups[gi], s = st[gi];
      return '<div class="builder-sentence" data-g="' + gi + '">' +
        '<span class="tag type">' + esc(g.topic) + '</span>' +
        g.parts.map(function (p, pi) {
          const filled = s.picked[pi];
          return '<span class="slot' + (filled ? ' filled' : '') + '" data-slot="' + pi + '">' + (filled ? esc(filled) : '_______') + '</span>';
        }).join('') +
      '</div>' +
      '<div class="wordbank">' + s.bank.map(function (w, wi) {
        const used = s.picked.indexOf(w) >= 0;
        return '<button class="wordchip' + (used ? ' used' : '') + '" data-g="' + gi + '" data-w="' + esc(w) + '">' + esc(w) + '</button>';
      }).join('') + '</div>';
    }

    function draw() {
      host.innerHTML = exHead(ex) +
        (ex.tip ? '<div class="strategy"><h4>💡 Grammar tip</h4><div style="font-size:.86rem">' + esc(ex.tip) + '</div><div style="font-size:.8rem;color:#8a5307;opacity:.85;margin-top:.2rem">' + esc(ex.tipTr || '') + '</div></div>' : '') +
        ex.groups.map(function (g, gi) { return sentence(gi); }).join('') +
        feedbackBox() + bar();
      wire();
    }
    function wire() {
      $$('.wordchip', host).forEach(function (chip) {
        chip.addEventListener('click', function () {
          const gi = +chip.getAttribute('data-g');
          const w = chip.getAttribute('data-w');
          const g = ex.groups[gi], s = st[gi];
          if (s.picked.length >= g.parts.length) return;
          s.picked.push(w);
          draw();
        });
      });
      $$('.slot.filled', host).forEach(function (slot) {
        slot.classList.add('clickable');
        slot.addEventListener('click', function () {
          const gi = +slot.closest('.builder-sentence').getAttribute('data-g');
          const pi = +slot.getAttribute('data-slot');
          st[gi].picked.splice(pi, 1);
          draw();
        });
      });
      $('[data-check]', host).addEventListener('click', function () {
      let correct = 0;
      ex.groups.forEach(function (g, gi) {
        const s = st[gi];
        const box = host.querySelector('.builder-sentence[data-g="' + gi + '"]');
        let allOk = true;
        $$('.slot', box).forEach(function (slot, pi) {
          const want = norm(g.parts[pi]);
          const got = norm(s.picked[pi] || '');
          const ok = got === want;
          slot.classList.add(ok ? 'slot-correct' : 'slot-wrong');
          if (!ok) allOk = false;
        });
        if (allOk) correct++;
      });
      const total = ex.groups.length;
      showFeedback(host.querySelector('.feedback'), correct === total,
        correct === total ? '🎉 Tamam! Tüm cümleler doğru.' : correct + ' / ' + total + ' cümle doğru. Kırmızı yerleri düzelt.');
      Store.record(ex.id, correct, total, correct === total);
      Store.addXp(correct * 5);
      if (correct === total) { Store.bumpStreak(); award('first-blood'); } else Store.resetStreak();
      api.refreshChrome();
    });
      $('[data-reset]', host).addEventListener('click', function () {
        st.forEach(function (s) { s.picked = []; }); draw();
      });
    }

    draw();
  };

  function renderFourBoxes(ex, host) {
    const saved = Store.getAnswer(ex.id) || {};
    host.innerHTML = exHead(ex) +
      ex.verbs.map(function (v, vi) {
        return '<div class="card" style="background:var(--surface-2)">' +
          '<h4 style="font-size:.9rem;color:var(--brand)">' + esc(v) + '</h4>' +
          '<div style="display:grid;grid-template-columns:1fr 1fr;gap:.5rem">' +
            [0, 1].map(function (k) {
              return '<input type="text" data-v="' + vi + '" data-k="' + k + '" placeholder="' + esc(ex.topics[(vi * 2 + k) % ex.topics.length]) + '..." value="' + esc(saved[vi + '-' + k] || '') + '">';
            }).join('') +
          '</div>' +
        '</div>';
      }).join('') +
      feedbackBox() +
      '<div class="btnbar"><button class="btn btn-ok" data-save>💾 Kaydet</button>' +
      '<button class="btn btn-ghost" data-model>Örnek cevapları gör</button></div>' +
      '<div id="modelHost"></div>';

    host.oninput = function (e) {
      const t = e.target;
      if (!t.matches || !t.matches('input[data-v]')) return;
      const key = t.getAttribute('data-v') + '-' + t.getAttribute('data-k');
      saved[key] = t.value;
    };
    $('[data-save]', host).addEventListener('click', function () {
      Store.setAnswer(ex.id, saved);
      Store.setWriting(ex.id, Object.keys(saved).map(function (k) { return saved[k]; }).join(' '));
      const filled = Object.keys(saved).filter(function (k) { return saved[k].trim(); }).length;
      Store.record(ex.id, Math.min(filled, 8), 8, filled >= 8);
      Store.addXp(10);
      if (filled >= 8) { award('first-blood'); Store.bumpStreak(); }
      showFeedback(host.querySelector('.feedback'), filled >= 8,
        filled >= 8 ? '✅ Harika, 8 boşluğun tamamını doldurdun!' : filled + ' / 8 boşluk doldu. Devam et.');
      api.refreshChrome();
    });
    $('[data-model]', host).addEventListener('click', function () {
      $('#modelHost', host).innerHTML =
        '<div class="model-answer"><b>Örnek cevaplar</b><br>' +
        'love & like → listening to music, going to the cinema<br>' +
        'like & enjoy → reading books, doing a sport<br>' +
        'enjoy & am fond of → surfing the Internet, meeting friends<br>' +
        'hate & dislike → doing the shopping, waiting for the bus' +
        '</div>';
    });
  }

  /* ---------- LIKE / DISLIKE SORT ---------- */
  RENDERERS.ld = function (ex, host) {
    const st = { placed: {} };   // itemIndex -> 'L' | 'D'

    function draw() {
      host.innerHTML = exHead(ex) +
        (ex.audioId ? audioPlayerHtml(ex.audioId) : '') +
        '<div class="ld-grid">' +
          '<div class="ld-bin b-like" data-bin="L"><h4>👍 Like</h4><div class="ld-bin-items"></div></div>' +
          '<div class="ld-bin b-dislike" data-bin="D"><h4>👎 Dislike</h4><div class="ld-bin-items"></div></div>' +
        '</div>' +
        '<div class="ld-pool">' + ex.items.map(function (it, i) {
          const bin = st.placed[i];
          return '<button class="ld-chip' + (bin ? ' placed' : '') + '" data-i="' + i + '">' + esc(it) + (bin ? ' ✕' : '') + '</button>';
        }).join('') + '</div>' +
        feedbackBox() + bar();
      wire();
      wireAudio(host);
    }
    function wire() {
      $$('.ld-bin', host).forEach(function (bin) {
        bin.addEventListener('click', function () {
          const chip = $('.ld-chip.target', host);
          if (!chip) { toast('Önce bir aktivite seç', 'bad'); return; }
          const i = +chip.getAttribute('data-i');
          st.placed[i] = bin.getAttribute('data-bin');
          draw();
        });
      });
      $$('.ld-chip', host).forEach(function (chip) {
        chip.addEventListener('click', function () {
          const i = +chip.getAttribute('data-i');
          if (st.placed[i]) { delete st.placed[i]; draw(); return; }
          $$('.ld-chip', host).forEach(function (c) { c.classList.remove('target'); });
          chip.classList.add('target');
          toast('Şimdi 👍 Like veya 👎 Dislike kutusuna tıkla');
        });
      });
    }

    $('[data-check]', host).addEventListener('click', function () {
      let correct = 0;
      ex.items.forEach(function (it, i) {
        if (st.placed[i] === ex.answers[i]) correct++;
      });
      const placed = Object.keys(st.placed).length;
      const total = ex.items.length;
      // colour the chips
      $$('.ld-chip', host).forEach(function (chip) {
        const i = +chip.getAttribute('data-i');
        const ok = st.placed[i] === ex.answers[i];
        chip.classList.add(ok ? 'answer-correct' : 'answer-wrong');
      });
      const pct = correct / total;
      showFeedback(host.querySelector('.feedback'), pct === 1,
        pct === 1 ? '🎧 Perfect — all seven are in the right box.' :
          correct + ' / ' + total + ' doğru (' + placed + ' yerleşti). Yeşil olanlar doğru, kırmızı olanları düzelt.');
      Store.record(ex.id, correct, total, pct === 1);
      Store.addXp(correct * 3);
      if (pct === 1) { Store.bumpStreak(); award('first-blood'); } else Store.resetStreak();
      api.refreshChrome();
    });
    $('[data-reset]', host).addEventListener('click', function () { st.placed = {}; draw(); });

    draw();
  };

  /* ---------- GAP FILL ---------- */
  RENDERERS.gapfill = function (ex, host) {
    const saved = Store.getAnswer(ex.id) || {};
    let selected = null;

    function answerFor(n) { return ex.answers[n]; }
    function matches(n, val) {
      const opts = answerFor(n) || [];
      const v = norm(val);
      return opts.some(function (o) { return norm(o) === v; });
    }

    function draw() {
      const useBank = ex.mode === 'bank';
      host.innerHTML = exHead(ex) +
        (ex.audioId ? audioPlayerHtml(ex.audioId) : '') +
        (useBank ? '<div class="wordbank"><span class="wb-label">Word bank · Kelime bankası</span>' +
          shuffle(ex.bank).map(function (w) {
            return '<button class="wordchip" data-w="' + esc(w) + '">' + esc(w) + '</button>';
          }).join('') + '</div>' : '') +
        '<div class="stimulus">' + ex.lines.map(function (line) {
          return '<div class="gapline">' + esc(line).replace(/\{\{(\d+)\}\}/g, function (_, n) {
            const val = saved[n] || '';
            if (useBank) {
              return '<span class="gap' + (val ? '' : ' blank') + '" data-n="' + n + '">' + (val ? esc(val) : '(' + n + ')') + '</span>';
            }
            return '<input class="gap" type="text" data-n="' + n + '" placeholder="(' + n + ')" value="' + esc(val) + '">';
          }) + '</div>';
        }).join('') + '</div>' +
        feedbackBox() + bar() +
        (ex.flexible ? '<div class="hint-line">Bu alıştırmada farklı ama doğru ifadeler de kabul edilir. En azından bir cevap yaz ve kontrol et.</div>' : '');

      wire();
      wireAudio(host);
    }

    function wire() {
      $$('.gap[data-n]', host).forEach(function (g) {
        g.addEventListener('click', function () {
          if (g.tagName === 'INPUT') return;
          $$('.gap', host).forEach(function (x) { x.classList.remove('blank'); });
          selected = g;
          g.classList.add('blank');
        });
        g.addEventListener('input', function () { saved[g.getAttribute('data-n')] = g.value; });
      });
      $$('.wordchip', host).forEach(function (chip) {
        chip.addEventListener('click', function () {
          const w = chip.getAttribute('data-w');
          if (!selected) { toast('Önce bir boşluğa tıkla'); return; }
          saved[selected.getAttribute('data-n')] = w;
          selected.textContent = w;
          selected.classList.remove('blank');
          selected = null;
        });
      });
      $('[data-check]', host).addEventListener('click', function () {
      // pull values from live inputs
      $$('.gap[data-n]', host).forEach(function (g) {
        if (g.tagName === 'INPUT') saved[g.getAttribute('data-n')] = g.value;
      });
      let correct = 0, total = 0;
      Object.keys(ex.answers).forEach(function (n) {
        total++;
        const g = host.querySelector('.gap[data-n="' + n + '"]');
        if (!g) return;
        const ok = matches(n, saved[n] || '');
        g.classList.remove('correct', 'incorrect');
        g.classList.add(ok ? 'correct' : 'incorrect');
        if (ok) correct++;
      });
      const pct = correct / total;
      showFeedback(host.querySelector('.feedback'), pct === 1,
        pct === 1 ? '✅ Tamam! Tüm boşluklar doğru.' :
          correct + ' / ' + total + ' doğru. Kırmızı boşlukların doğrusu için ipucu:' +
          (ex.why && ex.why[Object.keys(ex.answers).filter(function (n) { return !matches(n, saved[n] || ''); })[0]] ? '' : ''));
      Store.setAnswer(ex.id, saved);
      Store.record(ex.id, correct, total, pct === 1);
      Store.addXp(correct * 4);
      if (pct === 1) { Store.bumpStreak(); award('first-blood'); }
      else Store.resetStreak();
      api.refreshChrome();

      // show per-blank Turkish explanations for the wrong ones
      const wrongs = Object.keys(ex.answers).filter(function (n) { return !matches(n, saved[n] || ''); });
      if (ex.why && wrongs.length) {
        const fb = host.querySelector('.feedback');
        fb.insertAdjacentHTML('beforeend', '<span class="why">' + wrongs.slice(0, 3).map(function (n) {
          return ex.why[n] ? esc(ex.why[n]) : '';
        }).filter(Boolean).join('<br>') + '</span>');
      }
    });

      $('[data-reset]', host).addEventListener('click', function () {
        Store.setAnswer(ex.id, {}); render(ex, host);
      });
    }

    draw();
  };

  /* ---------- MCQ ---------- */
  RENDERERS.mcq = function (ex, host) {
    const chosen = {};

    host.innerHTML = exHead(ex) +
      (ex.audioId ? audioPlayerHtml(ex.audioId) : '') +
      (ex.stimulusTitle ? '<div class="mcq-stem"><span class="qno">' + esc(ex.stimulusTitle) + '</span></div>' : '') +
      (ex.stimulus ? '<div class="stimulus">' + LGSApp.stimulusHtml(ex.stimulus) + '</div>' : '') +
      '<div class="mcq-list">' + ex.items.map(function (it, i) {
        let h = '<div class="mcq-item" data-q="' + i + '">';
        if (it.stimulusTitle) h += '<div class="mcq-stem"><span class="qno">' + esc(it.stimulusTitle) + '</span></div>';
        if (it.stimulus) h += '<div class="stimulus">' + LGSApp.stimulusHtml(it.stimulus) + '</div>';
        h += '<div class="mcq-stem"><span class="qno">' + (i + 1) + '</span>' + esc(it.stem) + '</div>';
        h += '<div class="mcq-opts">' + it.opts.map(function (o, oi) {
          return '<button class="mcq-opt" data-q="' + i + '" data-o="' + oi + '"><span class="opt-letter">' + 'ABCD'[oi] + '</span><span>' + esc(o) + '</span></button>';
        }).join('') + '</div>';
        if (it.note) h += '<div class="mcq-why">' + esc(it.note) + '</div>';
        h += '</div>';
        return h;
      }).join('') + '</div>' +
      feedbackBox() + bar();

    wireAudio(host);
    LGSApp.wireQuestionOptions(host, chosen);

    function reveal() {
      let correct = 0;
      ex.items.forEach(function (it, i) {
        const c = chosen[i];
        if (c === it.answer) correct++;
        LGSApp.revealQuestion(host, i, it, c);
      });
      return correct;
    }

    $('[data-check]', host).addEventListener('click', function () {
      const answered = Object.keys(chosen).length;
      if (!answered) { toast('Önce bir soru işaretle', 'bad'); return; }
      const correct = reveal();
      const total = ex.items.length;
      const pct = correct / total;
      showFeedback(host.querySelector('.feedback'), pct === 1,
        pct === 1 ? '🎉 Perfect — ' + total + ' / ' + total + '.' : correct + ' / ' + total + ' doğru. Her sorunun altında nedenini oku.');
      Store.record(ex.id, correct, total, pct === 1);
      Store.addXp(correct * 8);
      if (pct === 1) { Store.bumpStreak(); award('perfect'); }
      else Store.resetStreak();
      if (ex.id === 'unit-test' && pct >= 0.7) award('unit-done');
      api.refreshChrome();
    });
    $('[data-reset]', host).addEventListener('click', function () { render(ex, host); });
  };

  /* ---------- TABLE TICK ---------- */
  RENDERERS.tabletick = function (ex, host) {
    const rows = ex.rows.map(function (r) { return typeof r === 'string' ? { label: r } : r; });
    const state = {};
    ex.cols.forEach(function (c) { state[c.key] = rows.map(function () { return false; }); });

    host.innerHTML = exHead(ex) +
      (ex.stimulus ? '<div class="stimulus"><h4>' + esc(ex.stimulusTitle || '') + '</h4>' + esc(ex.stimulus).replace(/\n/g, '<br>') + '</div>' : '') +
      (ex.stimulus2 ? '<div class="stimulus"><h4>' + esc(ex.stimulus2Title || '') + '</h4>' + esc(ex.stimulus2).replace(/\n/g, '<br>') + '</div>' : '') +
      '<table class="grid-table"><tr><th style="text-align:left">Activity</th>' +
        ex.cols.map(function (c) { return '<th>' + esc(c.label) + '</th>'; }).join('') + '</tr>' +
        rows.map(function (r, ri) {
          return '<tr><td class="rowhead">' + (r.emoji ? r.emoji + ' ' : '') + esc(r.label) + '</td>' +
            ex.cols.map(function (c) {
              return '<td><button class="tickcell' + (c.self ? ' self' : '') + '" data-c="' + c.key + '" data-r="' + ri + '" aria-label="' + esc(c.label + ' ' + r.label) + '">✓</button></td>';
            }).join('') + '</tr>';
        }).join('') + '</table>' +
      (ex.suggestion ? '<div class="hint-line">Önerilen cevaplar: ' + Object.keys(ex.suggestion).map(function (k) { return esc(k) + ' → ' + ex.suggestion[k]; }).join(' · ') + '</div>' : '') +
      (ex.followUp ? '<div class="strategy" style="margin-top:.9rem"><h4>🗣️ Now answer aloud</h4><div>' + esc(ex.followUp.question) + '</div><div style="font-size:.8rem;color:#8a5307;margin-top:.3rem">' + esc(ex.followUp.tip) + '</div></div>' : '') +
      feedbackBox() + bar();

    $$('.tickcell', host).forEach(function (cell) {
      cell.addEventListener('click', function () {
        const c = cell.getAttribute('data-c'), r = +cell.getAttribute('data-r');
        state[c][r] = !state[c][r];
        cell.classList.toggle('on', state[c][r]);
      });
    });

    $('[data-check]', host).addEventListener('click', function () {
      if (ex.freeChoice) {
        $$('.tickcell.on', host).forEach(function (c) { c.classList.add('correct'); });
        showFeedback(host.querySelector('.feedback'), true, '✅ Kaydedildi. Bu aktivitelerin sana nasıl hissettirdiğini bir arkadaşına anlat.');
        Store.record(ex.id, 1, 1, true);
        api.refreshChrome();
        return;
      }
      let correct = 0, total = 0;
      ex.cols.forEach(function (c) {
        if (c.self || !ex.answers[c.key]) return;
        rows.forEach(function (r, ri) {
          total++;
          const cell = host.querySelector('.tickcell[data-c="' + c.key + '"][data-r="' + ri + '"]');
          const want = ex.answers[c.key][ri];
          const got = state[c.key][ri];
          if (want === got) correct++;
          cell.classList.remove('correct', 'incorrect', 'missed');
          if (want === got) cell.classList.add('correct');
          else if (got) cell.classList.add('incorrect');
          else cell.classList.add('missed');
        });
      });
      const pct = correct / total;
      showFeedback(host.querySelector('.feedback'), pct === 1,
        pct === 1 ? '✅ Tamam — Lily and Sam are exactly right.' :
          correct + ' / ' + total + ' doğru. Yeşil = doğru, kırmızı işaretli ama yanlış, kesikli yeşil = atlanan.');
      Store.record(ex.id, correct, total, pct === 1);
      Store.addXp(correct * 2);
      if (pct === 1) { Store.bumpStreak(); award('first-blood'); } else Store.resetStreak();
      api.refreshChrome();
    });
    $('[data-reset]', host).addEventListener('click', function () { render(ex, host); });
  };

  /* ---------- ORDER / REORDER ---------- */
  RENDERERS.order = function (ex, host) {
    if (ex.mode === 'memory') return renderMemory(ex, host);

    const st = ex.items.map(function (t, i) { return { text: t, from: i }; });

    function draw() {
      host.innerHTML = exHead(ex) +
        '<div class="reorder-list">' + st.map(function (s, i) {
          return '<div class="reorder-row" data-i="' + i + '">' +
            '<span class="order-num">' + (i + 1) + '</span>' +
            '<span style="flex:1">' + esc(s.text) + '</span>' +
            '<span class="move-btns"><button data-dir="-1" data-i="' + i + '" aria-label="move up">↑</button>' +
            '<button data-dir="1" data-i="' + i + '" aria-label="move down">↓</button></span>' +
          '</div>';
        }).join('') + '</div>' +
        feedbackBox() + bar();
      wire();
    }
    function wire() {
      $$('.move-btns button', host).forEach(function (b) {
        b.addEventListener('click', function () {
          const i = +b.getAttribute('data-i'), dir = +b.getAttribute('data-dir');
          const j = i + dir;
          if (j < 0 || j >= st.length) return;
          const t = st[i]; st[i] = st[j]; st[j] = t;
          draw();
        });
      });
    }
    $('[data-check]', host).addEventListener('click', function () {
      let correct = 0;
      st.forEach(function (s, i) {
        const row = host.querySelector('.reorder-row[data-i="' + i + '"]');
        const ok = s.from === i;
        row.classList.add(ok ? 'order-correct' : 'order-wrong');
        if (ok) correct++;
      });
      const pct = correct / st.length;
      showFeedback(host.querySelector('.feedback'), pct === 1,
        pct === 1 ? '🧩 Tamam! Sıra doğru.' : correct + ' / ' + st.length + ' cümle doğru yerde.');
      Store.record(ex.id, correct, st.length, pct === 1);
      Store.addXp(correct * 3);
      if (pct === 1) Store.bumpStreak(); else Store.resetStreak();
      api.refreshChrome();
    });
    $('[data-reset]', host).addEventListener('click', function () {
      st.forEach(function (s, i) { s.from = i; }); draw();
    });
    draw();
  };

  /* ---------- MEMORY TEST ---------- */
  function renderMemory(ex, host) {
    let revealed = false;
    let remaining = ex.timerSeconds, timerId = null;

    host.innerHTML = exHead(ex) +
      '<div class="btnbar" style="margin-bottom:.9rem">' +
        '<span class="timer" id="memTimer">⏱ ' + Math.floor(remaining / 60) + ':' + (remaining % 60 < 10 ? '0' : '') + (remaining % 60) + '</span>' +
        '<button class="btn btn-warn btn-sm" id="memStart">▶ Süreyi başlat</button>' +
        '<button class="btn btn-ghost btn-sm" id="memCover">🙈 Paragrafları ört</button>' +
      '</div>' +
      '<div class="memcards" id="memCards">' + ex.cards.map(function (c) {
        return '<div class="memcard" data-name="' + esc(c.name) + '"><h4><span class="davatar ' + (c.color === 'f' ? 'f' : '') + '">' + c.name[0] + '</span>' + esc(c.name) + '</h4>' +
          '<div class="cardbody">' + esc(c.text) + '</div></div>';
      }).join('') + '</div>' +
      '<div id="memQ" style="margin-top:1.1rem"></div>' +
      feedbackBox() + bar();

    const cards = $('#memCards', host);
    const qHost = $('#memQ', host);
    const chosen = {};

    function tick() {
      remaining--;
      const t = $('#memTimer', host);
      const m = Math.floor(remaining / 60), s = remaining % 60;
      if (t) {
        t.textContent = '⏱ ' + m + ':' + (s < 10 ? '0' : '') + s;
        t.className = 'timer' + (remaining <= 15 ? ' critical' : remaining <= 30 ? ' warn' : '');
      }
      if (remaining <= 0) {
        clearInterval(timerId);
        cover(true);
        toast("Süre doldu! Şimdi cevapla. 🧠", 'bad');
      }
    }
    function cover(on) {
      revealed = on;
      $$('.memcard', cards).forEach(function (c) { c.classList.toggle('hidden-text', on); });
      $('#memCover', host).textContent = on ? '👁️ Paragrafları göster' : '🙈 Paragrafları ört';
      if (on && !qHost.innerHTML) {
        qHost.innerHTML = '<h4 style="margin-bottom:.6rem">Now answer — hangi isim?</h4>' +
          ex.items.map(function (it, i) {
            return '<div class="mcq-item" data-q="' + i + '">' +
              '<div class="mcq-stem"><span class="qno">' + (i + 1) + '</span>' + esc(it.stem) + '</div>' +
              '<div class="mcq-opts">' + ex.cards.map(function (c, ci) {
                return '<button class="mcq-opt" data-q="' + i + '" data-o="' + ci + '"><span class="opt-letter">' + 'ABC'[ci] + '</span><span>' + esc(c.name) + '</span></button>';
              }).join('') + '</div></div>';
          }).join('');
        // adapt wireQuestionOptions to name indices
        $$('.mcq-opt', qHost).forEach(function (btn) {
          btn.addEventListener('click', function () {
            const q = +btn.getAttribute('data-q'), o = +btn.getAttribute('data-o');
            chosen[q] = o;
            $$('.mcq-opt[data-q="' + q + '"]', qHost).forEach(function (b) { b.classList.remove('selected'); });
            btn.classList.add('selected');
          });
        });
      }
    }

    $('#memStart', host).addEventListener('click', function () {
      clearInterval(timerId);
      remaining = ex.timerSeconds;
      timerId = setInterval(tick, 1000);
      cover(false);
      toast('⏱ 2 dakika. Hızlı oku!');
    });
    $('#memCover', host).addEventListener('click', function () { cover(!revealed); });

    $('[data-check]', host).addEventListener('click', function () {
      if (!revealed) { cover(true); toast('Önce paragrafları kapat'); return; }
      let correct = 0;
      ex.items.forEach(function (it, i) {
        const wantName = it.answer;
        const wantIdx = ex.cards.map(function (c) { return c.name; }).indexOf(wantName);
        const got = chosen[i];
        if (got === wantIdx) correct++;
        $$('.mcq-opt[data-q="' + i + '"]', qHost).forEach(function (b) {
          const o = +b.getAttribute('data-o');
          b.disabled = true;
          if (o === wantIdx) b.classList.add('answer-correct');
          else if (o === got) b.classList.add('answer-wrong');
        });
        const item = ex.items[i];
        const exBox = $$('.mcq-item', qHost)[i];
        if (exBox && got !== wantIdx) {
          exBox.insertAdjacentHTML('beforeend', '<div class="mcq-why show">' + esc(it.why) + '</div>');
        }
      });
      const pct = correct / ex.items.length;
      showFeedback(host.querySelector('.feedback'), pct === 1,
        pct === 1 ? '🧠 Hafıza Ustası! 6 / 6.' : correct + ' / ' + ex.items.length + ' doğru. Metni tekrar oku ve anahtar kelimeleri hatırla.');
      Store.record(ex.id, correct, ex.items.length, pct === 1);
      Store.addXp(correct * 10);
      if (pct === 1) { Store.bumpStreak(); award('memory-master'); confetti(); }
      else Store.resetStreak();
      api.refreshChrome();
    });
    $('[data-reset]', host).addEventListener('click', function () {
      clearInterval(timerId); render(ex, host);
    });
  }

  /* ---------- FLIP CARDS ---------- */
  RENDERERS.flip = function (ex, host) {
    const cards = shuffle(ex.cards);
    host.innerHTML = exHead(ex) +
      '<div class="btnbar" style="margin-bottom:.8rem"><button class="btn btn-ghost btn-sm" id="flipShuffle">🔀 Karıştır</button>' +
      '<button class="btn btn-ghost btn-sm" id="flipAll">👁️ Hepsini aç</button></div>' +
      '<div class="flipgrid" id="flipGrid">' + cards.map(function (c, i) {
        return '<div class="flip" data-i="' + i + '">' +
          '<div class="flip-face"><span class="big">' + c.big + '</span><span class="cap">' + esc(c.cap) + '</span><span class="hint">' + esc(c.hint) + '</span></div>' +
          '<div class="flip-face flip-back"><span class="cap">' + esc(c.cap) + '</span><span class="hint" style="font-size:.72rem">' + esc(c.back) + '</span></div>' +
        '</div>';
      }).join('') + '</div>' +
      '<div class="hint-line">Tap a card to turn it. Read the example aloud, then make your own sentence.</div>';

    function wire() {
      $$('.flip', host).forEach(function (card) {
        card.addEventListener('click', function () {
          card.classList.toggle('flipped');
          const back = $('.flip-back', card);
          if (back) AP.speak(cards[+card.getAttribute('data-i')].cap, 'D');
        });
      });
    }
    wire();
    $('#flipShuffle', host).addEventListener('click', function () { render(ex, host); });
    $('#flipAll', host).addEventListener('click', function () {
      const anyClosed = $$('.flip:not(.flipped)', host).length > 0;
      $$('.flip', host).forEach(function (c) { c.classList.toggle('flipped', anyClosed); });
    });
    Store.record(ex.id, 1, 1, true);
  };

  /* ---------- WRITE ---------- */
  RENDERERS.write = function (ex, host) {
    if (ex.multi) return renderMultiWrite(ex, host);

    const saved = Store.getWriting(ex.id);
    let text = saved.text || ex.starter || '';
    const checks = Store.getSelfCheck(ex.id) || [];

    host.innerHTML = exHead(ex) +
      (ex.questions ? '<div class="stimulus"><h4>Sorular</h4>' + ex.questions.map(esc).join('<br>') + '</div>' : '') +
      (ex.title ? '<h4 style="font-size:.95rem;color:var(--brand)">' + esc(ex.title) + '</h4>' : '') +
      '<div class="wordbank"><span class="wb-label">Use these · Bunları kullan</span>' +
        (ex.wordBank || []).map(function (w) { return '<button class="wordchip" data-insert="' + esc(w) + '">' + esc(w) + '</button>'; }).join('') + '</div>' +
      '<div class="field"><textarea id="wText" placeholder="' + (ex.starter ? esc(ex.starter) : '') + '">' + esc(text) + '</textarea>' +
        '<div class="wordcount" id="wCount"></div></div>' +
      (ex.checklist ? '<h4 style="font-size:.85rem;margin-top:.6rem">Self-check · Kendini kontrol et</h4><ul class="checklist">' +
        ex.checklist.map(function (c, i) {
          return '<li><input type="checkbox" id="ck' + i + '"' + (checks[i] ? ' checked' : '') + '><label for="ck' + i + '">' + esc(c) + '</label></li>';
        }).join('') + '</ul>' : '') +
      '<div class="btnbar">' +
        '<button class="btn btn-ok" id="wSave">💾 Kaydet</button>' +
        '<button class="btn btn-ghost" id="wModel">Örnek cevabı gör</button>' +
        '<button class="btn btn-ghost" id="wSpeak">🔊 Yazdığım metni dinle</button>' +
      '</div>' +
      '<div id="wModelHost"></div>';

    const ta = $('#wText', host), counter = $('#wCount', host);
    function updateCount() {
      const n = Store.countWords(ta.value);
      const met = n >= (ex.targetWords || 0);
      counter.className = 'wordcount' + (met ? ' met' : '');
      counter.textContent = n + ' kelime' + (ex.targetWords ? ' · hedef ' + ex.targetWords + (met ? ' ✓' : '') : '');
    }
    ta.addEventListener('input', updateCount);
    updateCount();

    $$('[data-insert]', host).forEach(function (b) {
      b.addEventListener('click', function () {
        const w = b.getAttribute('data-insert');
        ta.value = (ta.value.trimEnd() + ' ' + w).trim() + ' ';
        ta.focus(); updateCount();
      });
    });
    $$('.checklist input', host).forEach(function (cb, i) {
      cb.addEventListener('change', function () {
        const arr = $$('.checklist input', host).map(function (x) { return x.checked; });
        Store.setSelfCheck(ex.id, arr);
        if (arr.filter(Boolean).length === ex.checklist.length) Store.addXp(10);
      });
    });
    $('#wSave', host).addEventListener('click', function () {
      Store.setWriting(ex.id, ta.value);
      const n = Store.countWords(ta.value);
      Store.record(ex.id, n >= (ex.targetWords || 0) ? 1 : 0, 1, n >= (ex.targetWords || 0));
      Store.addXp(15);
      if (n >= (ex.targetWords || 0)) {
        award(ex.id === 'helen-write' ? 'blog-writer' : ex.id === 'write-band' ? 'band-writer' : 'first-blood');
        Store.bumpStreak();
        confetti();
      }
      showFeedback(host.querySelector('.feedback') || ensureFeedback(host), n >= (ex.targetWords || 0),
        n >= (ex.targetWords || 0) ? '✅ Yazın kaydedildi. Şimdi öğretmeninle paylaş.' : 'Kaydedildi ama hedefe ulaşmadın (' + n + '/' + (ex.targetWords || 0) + ').');
      api.refreshChrome();
    });
    $('#wModel', host).addEventListener('click', function () {
      $('#wModelHost', host).innerHTML = '<div class="model-answer"><b>Örnek cevap</b><br>' + esc(ex.model || '').replace(/\n/g, '<br>') + '</div>';
    });
    $('#wSpeak', host).addEventListener('click', function () {
      if (!ta.value.trim()) { toast('Önce bir şeyler yaz', 'bad'); return; }
      AP.speak(ta.value, 'Z');
    });
    host.insertAdjacentHTML('beforeend', feedbackBox());
  };

  function ensureFeedback(host) {
    if (!host.querySelector('.feedback')) host.insertAdjacentHTML('beforeend', feedbackBox());
    return host.querySelector('.feedback');
  }

  function renderMultiWrite(ex, host) {
    const saved = Store.getAnswer(ex.id) || {};
    host.innerHTML = exHead(ex) +
      ex.groups.map(function (g, gi) {
        return '<div class="card" style="background:var(--surface-2)">' +
          '<h4 style="font-size:.9rem;color:var(--brand)">' + esc(g.title) + '</h4>' +
          '<div class="field"><textarea data-g="' + gi + '" placeholder="' + esc(g.starter) + '">' + esc(saved[gi] || g.starter || '') + '</textarea></div>' +
          '<button class="btn btn-ghost btn-sm" data-model="' + gi + '">Örnek cevap</button>' +
          '<div id="model' + gi + '"></div>' +
        '</div>';
      }).join('') +
      '<div class="btnbar"><button class="btn btn-ok" data-saveall>💾 Kaydet</button></div>';

    $$('[data-model]', host).forEach(function (b) {
      b.addEventListener('click', function () {
        const gi = +b.getAttribute('data-model');
        $('#model' + gi, host).innerHTML = '<div class="model-answer">' + esc(ex.groups[gi].model).replace(/\n/g, '<br>') + '</div>';
      });
    });
    $('[data-saveall]', host).addEventListener('click', function () {
      $$('textarea[data-g]', host).forEach(function (t) { saved[t.getAttribute('data-g')] = t.value; });
      Store.setAnswer(ex.id, saved);
      Store.record(ex.id, 1, 1, true);
      Store.addXp(10);
      toast('Kaydedildi ✅', 'ok');
      api.refreshChrome();
    });
  }

  /* ---------- OPEN QUESTIONS ---------- */
  RENDERERS.openq = function (ex, host) {
    const saved = Store.getAnswer(ex.id) || {};
    host.innerHTML = exHead(ex) +
      ex.questions.map(function (q, i) {
        return '<div class="card" style="background:var(--surface-2)">' +
          '<div class="mcq-stem"><span class="qno">' + (i + 1) + '</span>' + esc(q.q) + '</div>' +
          '<div class="field"><textarea data-q="' + i + '" placeholder="Answer in full sentences...">' + esc(saved[i] || '') + '</textarea></div>' +
          '<button class="btn btn-ghost btn-sm" data-model="' + i + '">Örnek cevap</button>' +
          '<div id="om' + i + '"></div>' +
        '</div>';
      }).join('') +
      '<div class="btnbar"><button class="btn btn-ok" data-save>💾 Kaydet</button>' +
      '<button class="btn btn-ghost" data-allmodels>Tüm örnekleri gör</button></div>';

    $$('[data-model]', host).forEach(function (b) {
      b.addEventListener('click', function () {
        const i = +b.getAttribute('data-model');
        $('#om' + i, host).innerHTML = '<div class="model-answer">' + esc(ex.questions[i].model) + '</div>';
      });
    });
    $('[data-allmodels]', host).addEventListener('click', function () {
      ex.questions.forEach(function (q, i) {
        $('#om' + i, host).innerHTML = '<div class="model-answer">' + esc(q.model) + '</div>';
      });
    });
    $('[data-save]', host).addEventListener('click', function () {
      $$('textarea[data-q]', host).forEach(function (t) { saved[t.getAttribute('data-q')] = t.value; });
      Store.setAnswer(ex.id, saved);
      Store.record(ex.id, 1, 1, true);
      Store.addXp(10);
      toast('Kaydedildi ✅', 'ok');
      api.refreshChrome();
    });
  };

  /* ---------- SELF CHECK ---------- */
  RENDERERS.selfcheck = function (ex, host) {
    const checks = Store.getSelfCheck(ex.id) || [];
    host.innerHTML = exHead(ex) +
      (ex.audioId ? audioPlayerHtml(ex.audioId) : '') +
      (ex.stimulus ? '<div class="stimulus"><h4>' + esc(ex.stimulusTitle || '') + '</h4>' + esc(ex.stimulus).replace(/\n/g, '<br>') + '</div>' : '') +
      (ex.stimulus2 ? '<div class="stimulus"><h4>' + esc(ex.stimulus2Title || '') + '</h4>' + esc(ex.stimulus2).replace(/\n/g, '<br>') + '</div>' : '') +
      (ex.structure ? '<div class="card" style="background:var(--surface-2)"><h4 style="font-size:.9rem;color:var(--brand)">Paragraph structure</h4>' +
        ex.structure.map(function (s) {
          return '<div style="margin-bottom:.4rem"><b style="font-size:.8rem;color:var(--ink-3)">' + esc(s.step) + '</b><br>' + esc(s.text) + '</div>';
        }).join('') + '</div>' : '') +
      (ex.columns ? '<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:.7rem">' +
        ex.columns.map(function (c) {
          return '<div class="card" style="background:var(--surface-2);margin:0"><h4 style="font-size:.85rem;color:var(--' + (c.color || 'brand') + ')">' + esc(c.title) + '</h4>' +
            c.rows.map(function (r) { return '<div style="font-size:.87rem;padding:.22rem 0;border-bottom:1px dashed var(--surface-3)">' + esc(r) + '</div>'; }).join('') + '</div>';
        }).join('') + '</div>' : '') +
      (ex.tip ? '<div class="strategy"><h4>💡 Tip</h4><div style="font-size:.86rem">' + esc(ex.tip) + '</div><div style="font-size:.8rem;color:#8a5307;margin-top:.2rem">' + esc(ex.tipTr || '') + '</div></div>' : '') +
      (ex.items ? '<ul class="checklist" style="margin-top:.9rem">' + ex.items.map(function (it, i) {
        return '<li><input type="checkbox" id="sc' + i + '"' + (checks[i] ? ' checked' : '') + '>' +
          '<label for="sc' + i + '"><b>' + esc(it.text) + '</b>' + (it.code ? ' <span class="tag type">' + esc(it.code) + '</span>' : '') +
          '<br><span style="font-size:.78rem;color:var(--ink-3)">' + esc(it.tr || '') + '</span></label></li>';
      }).join('') + '</ul>' : '') +
      '<div class="btnbar"><button class="btn btn-ok" data-save>✅ Kaydet</button></div>';

    wireAudio(host);
    $('[data-save]', host).addEventListener('click', function () {
      const arr = $$('input[type=checkbox]', host).map(function (c) { return c.checked; });
      Store.setSelfCheck(ex.id, arr);
      const n = arr.filter(Boolean).length;
      Store.record(ex.id, n, arr.length, n === arr.length);
      Store.addXp(n * 3);
      if (n === arr.length) { Store.bumpStreak(); toast('✅ Tüm kazanımlar işaretlendi!', 'ok'); }
      api.refreshChrome();
    });
  };

  /* ---------- SPEAK (frequency + optional sentence patterns) ---------- */
  RENDERERS.speak = function (ex, host) {
    let actIdx = 0, advIdx = 2, patIdx = 0, reasonIdx = 0, otherIdx = 0;
    const patterns = ex.patterns && ex.patterns.length ? ex.patterns : ['I {{adv}} {{activity}}.'];

    host.innerHTML = exHead(ex) +
      '<div class="field"><label>Choose an activity</label><select id="spAct">' +
        ex.activities.map(function (a, i) { return '<option value="' + i + '">' + esc(a.q) + '</option>'; }).join('') +
      '</select></div>' +
      '<div class="freq-scale">' + ex.adverbs.map(function (a) { return '<span>' + a.word + '</span>'; }).join('') + '</div>' +
      '<div class="slider-row"><input type="range" id="spSlide" min="0" max="' + (ex.adverbs.length - 1) + '" value="' + advIdx + '"></div>' +
      (patterns.length > 1 ? '<div class="field"><label>Sentence pattern · Cümle kalıbı</label><select id="spPat">' +
        patterns.map(function (p, i) { return '<option value="' + i + '">' + esc(p.replace(/\{\{(\w+)\}\}/g, function (_, k) {
          return { adv: '«sıklık»', activity: '«aktivite»', gerund: '«aktivite» (-ing)', reason: '«sebep»', other: '«diğer aktivite»' }[k] || k;
        })) + '</option>'; }).join('') + '</select></div>' : '') +
      (ex.reasons && ex.reasons.length ? '<div class="field" id="spReasonWrap"><label>Reason · Sebep</label><select id="spReason">' +
        ex.reasons.map(function (r, i) { return '<option value="' + i + '">' + esc(r) + '</option>'; }).join('') + '</select></div>' : '') +
      (ex.others && ex.others.length ? '<div class="field" id="spOtherWrap"><label>Other activity · Diğer aktivite</label><select id="spOther">' +
        ex.others.map(function (r, i) { return '<option value="' + i + '">' + esc(r) + '</option>'; }).join('') + '</select></div>' : '') +
      '<div id="spOut"></div>' +
      (ex.tip ? '<div class="strategy" style="margin-top:.9rem"><h4>💡 Grammar tip</h4><div style="font-size:.86rem">' + esc(ex.tip) + '</div><div style="font-size:.8rem;color:#8a5307;margin-top:.2rem">' + esc(ex.tipTr || '') + '</div></div>' : '') +
      '<div class="btnbar">' +
        '<button class="btn btn-ghost" id="spSpeak">🔊 Söyle</button>' +
        '<button class="btn btn-ghost" id="spQ">❓ Soruyu sor</button>' +
        '<button class="btn btn-ghost" id="spNext">🔀 Başka aktivite</button>' +
        '<button class="btn btn-ok" id="spDone">✅ Bitti, XP kazan</button>' +
      '</div>';

    function buildSentence() {
      const a = ex.activities[actIdx], adv = ex.adverbs[advIdx];
      const pat = patterns[patIdx] || patterns[0];
      return pat.replace(/\{\{(\w+)\}\}/g, function (_, k) {
        if (k === 'adv') return adv.word;
        if (k === 'activity') return a.a;
        if (k === 'gerund') return a.g || a.a;
        if (k === 'reason') return ex.reasons[reasonIdx] || 'it is fun';
        if (k === 'other') return ex.others[otherIdx] || 'watching TV';
        if (k === 'otherBare') return (ex.othersBare && ex.othersBare[otherIdx]) || ex.others[otherIdx] || 'watch TV';
        return '';
      });
    }

    function draw() {
      const a = ex.activities[actIdx], adv = ex.adverbs[advIdx];
      const pat = patterns[patIdx] || patterns[0];
      // show/hide the optional selects only when the pattern needs them
      const rw = $('#spReasonWrap', host), ow = $('#spOtherWrap', host);
      if (rw) rw.style.display = pat.indexOf('{{reason}}') >= 0 ? '' : 'none';
      if (ow) ow.style.display = (pat.indexOf('{{other}}') >= 0 || pat.indexOf('{{otherBare}}') >= 0) ? '' : 'none';

      $('#spOut', host).innerHTML =
        '<div class="stimulus" style="text-align:center">' +
          '<div style="font-size:.78rem;color:var(--ink-3);font-weight:700;text-transform:uppercase;letter-spacing:.05em">Ask · Sor</div>' +
          '<div style="font-size:1.05rem;font-weight:700;margin-bottom:.6rem">How often do you ' + esc(a.q) + '?</div>' +
          '<div style="font-size:.78rem;color:var(--ink-3);font-weight:700;text-transform:uppercase;letter-spacing:.05em">Answer · Cevapla</div>' +
          '<div class="freq-readout">' + esc(buildSentence()) + '</div>' +
          '<div style="font-size:.78rem;color:var(--ink-3);margin-top:.4rem">' + esc(adv.tr) + '</div>' +
        '</div>';
    }
    $('#spAct', host).addEventListener('change', function () { actIdx = +this.value; draw(); });
    $('#spSlide', host).addEventListener('input', function () { advIdx = +this.value; draw(); });
    const patSel = $('#spPat', host);
    if (patSel) patSel.addEventListener('change', function () { patIdx = +this.value; draw(); });
    const rSel = $('#spReason', host);
    if (rSel) rSel.addEventListener('input', function () { reasonIdx = +this.value; draw(); });
    const oSel = $('#spOther', host);
    if (oSel) oSel.addEventListener('input', function () { otherIdx = +this.value; draw(); });
    $('#spSpeak', host).addEventListener('click', function () {
      AP.speak(buildSentence(), 'Z');
    });
    $('#spQ', host).addEventListener('click', function () {
      AP.speak('How often do you ' + ex.activities[actIdx].q + '?', 'D');
    });
    $('#spNext', host).addEventListener('click', function () {
      actIdx = Math.floor(Math.random() * ex.activities.length);
      patIdx = Math.floor(Math.random() * patterns.length);
      $('#spAct', host).value = actIdx;
      const ps = $('#spPat', host);
      if (ps) ps.value = patIdx;
      draw();
    });
    $('#spDone', host).addEventListener('click', function () {
      Store.record(ex.id, 1, 1, true);
      Store.addXp(10); Store.bumpStreak();
      toast('Güzel çalıştın! 🔊', 'ok');
      api.refreshChrome();
    });
    draw();
  };

  /* ================================================================
     SECTION RENDER
     ================================================================ */
  function render(ex, host) {
    const fn = RENDERERS[ex.kind];
    if (!fn) { host.innerHTML = '<p>Unknown exercise type: ' + esc(ex.kind) + '</p>'; return; }
    // Re-rendering into a card (reset) keeps the same node so delegated
    // handlers assigned with on* are replaced, not stacked.
    if (host.classList && host.classList.contains('card')) {
      host.innerHTML = '';
      fn(ex, host);
      return;
    }
    host.innerHTML = '';
    const card = document.createElement('section');
    card.className = 'card';
    host.appendChild(card);
    fn(ex, card);
  }

  function renderSection(sec) {
    const host = $('#view');
    if (sec.special === 'lgs') { LGSApp.render(api); return; }

    host.innerHTML =
      '<section class="hero">' +
        '<span class="kicker">' + (sec.page ? 'Sayfa ' + sec.page + ' · ' : '') + 'Unit 2</span>' +
        '<h1>' + esc(sec.title) + '</h1>' +
        '<p>' + esc(sec.intro) + '<br><span style="opacity:.85;font-size:.88rem">' + esc(sec.introTr || '') + '</span></p>' +
      '</section>' +
      sec.blocks.map(function (b, i) { return '<div class="ex-block" data-b="' + i + '"></div>'; }).join('');

    sec.blocks.forEach(function (b, i) {
      if (b.t !== 'ex') return;
      const holder = host.querySelector('[data-b="' + i + '"]');
      render(b.ex, holder);
    });
  }

  /* ================================================================
     HOME
     ================================================================ */
  function renderHome() {
    const host = $('#view');
    const s = Store.stats();
    const name = Store.getName();
    const prog = Store.sectionProgress(SECTIONS);

    host.innerHTML =
      '<section class="hero">' +
        '<span class="kicker">Bilim ve Kültür Yayınları · 8. Sınıf</span>' +
        '<h1>UNIT 2 · TEEN LIFE</h1>' +
        '<p>Bu, kitabın 26–40. sayfalarındaki <b>tüm</b> alıştırmaların etkileşimli hâli. Üstüne, kitapta olmayan bir <b>LGS Sınav Merkezi</b> eklendi: gerçek soru tipleri, gerçek süreli denemeler ve MEB\'in net kuralı (<b>doğru − yanlış/3</b>).</p>' +
        '<div class="hero-actions">' +
          '<button class="btn btn-lg" data-go="get-ready">▶ Derse başla</button>' +
          '<button class="btn btn-lg" style="background:rgba(255,255,255,.18);border:1px solid rgba(255,255,255,.4);box-shadow:none" data-go="lgs">🎯 LGS Merkezi</button>' +
        '</div>' +
        '<div class="hero-statrow">' +
          '<div class="hero-stat"><b>' + s.xp + '</b><span>XP</span></div>' +
          '<div class="hero-stat"><b>' + s.streak + '</b><span>Seri</span></div>' +
          '<div class="hero-stat"><b>' + s.correct + '/' + s.total + '</b><span>Doğru</span></div>' +
          '<div class="hero-stat"><b>' + Store.badges().length + '/' + BADGES.length + '</b><span>Rozet</span></div>' +
        '</div>' +
      '</section>' +
      (name ? '' : '<section class="card"><h3>👋 Hoş geldin! Adın ne?</h4>' +
        '<div class="field" style="max-width:340px"><input type="text" id="nameInput" placeholder="Adını yaz" maxlength="30"></div>' +
        '<button class="btn" id="nameSave">Kaydet</button></section>') +
      '<section class="card">' +
        '<div class="card-head"><h3>📚 Birim haritası</h3><span class="card-tag sec">' + SECTIONS.length + ' bölüm</span></div>' +
        '<div class="sectionlist">' + SECTIONS.map(function (sec) {
          const pct = Math.round((prog[sec.id] || 0) * 100);
          return '<button class="sectionrow" data-go="' + sec.id + '">' +
            '<span class="sr-ico">' + sec.icon + '</span>' +
            '<div class="sr-body"><div class="sr-title">' + esc(sec.title) + (sec.page ? ' <span style="color:var(--ink-3);font-weight:600">· s.' + sec.page + '</span>' : '') + '</div>' +
            '<div class="sr-sub">' + esc(sec.subtitle) + '</div></div>' +
            '<div class="sr-bar"><div class="sr-bar-fill" style="width:' + pct + '%"></div></div>' +
            '<div class="sr-pct">' + pct + '%</div>' +
          '</button>';
        }).join('') + '</div>' +
      '</section>' +
      '<section class="card">' +
        '<div class="card-head"><h3>📖 Kitabın yapısı</h3></div>' +
        '<div class="instruction">Bu uygulama kitaptaki sırayı birebir izliyor:<span class="tr">GET READY → LISTENING → SPEAKING → READING → GRAMMAR → VOCABULARY → WRITING → PRACTICE → UNIT TEST → SELF ASSESSMENT. Sonuna LGS Sınav Merkezi eklendi.</span></div>' +
        '<div class="formula">Net = Doğru − (Yanlış ÷ 3)&nbsp;&nbsp;·&nbsp;&nbsp;SP = 10 × (HP − μ) ÷ σ + 50&nbsp;&nbsp;·&nbsp;&nbsp;İngilizce katsayısı = 1</div>' +
      '</section>';

    $$('[data-go]', host).forEach(function (b) {
      b.addEventListener('click', function () { location.hash = '#/' + b.getAttribute('data-go'); });
    });
    const ni = $('#nameInput', host);
    if (ni) $('#nameSave', host).addEventListener('click', function () {
      Store.setName(ni.value.trim()); renderHome();
      toast('Kaydedildi 👋', 'ok');
    });
  }

  /* ================================================================
     PRINTABLE ANSWER KEY
     ================================================================ */
  function printAnswerKey() {
    const host = $('#printableKey');
    let html = '<h1>UNIT 2 · TEEN LIFE — CEVAP ANAHTARI</h1>' +
      '<p>Öğretmen için. Her alıştırmanın doğru cevapları ve Türkçe açıklamaları.</p>';

    SECTIONS.forEach(function (sec) {
      if (sec.lgs) return;
      html += '<h2>' + sec.icon + ' ' + sec.title + (sec.page ? ' — sayfa ' + sec.page : '') + '</h2>';
      sec.blocks.forEach(function (b) {
        if (b.t !== 'ex') return;
        const ex = b.ex;
        html += '<div class="card"><h3>' + ex.tag + '</h3>';
        if (ex.pairs) html += ex.pairs.map(function (p) { return '<div>' + esc(p.a) + ' → <b>' + esc(p.b) + '</b></div>'; }).join('');
        if (ex.answers && ex.kind === 'gapfill') {
          html += Object.keys(ex.answers).map(function (n) {
            return '<div>' + n + '. <b>' + esc(ex.answers[n][0]) + '</b>' + (ex.why && ex.why[n] ? ' <span style="color:#666">— ' + esc(ex.why[n]) + '</span>' : '') + '</div>';
          }).join('');
        }
        if (ex.kind === 'mcq') {
          html += ex.items.map(function (it, i) {
            return '<div>' + (i + 1) + '. <b>' + 'ABCD'[it.answer] + ') ' + esc(it.opts[it.answer]) + '</b>' +
              (it.note ? ' <span style="color:#a00">(' + esc(it.note) + ')</span>' : '') +
              '<br><span style="color:#555;font-size:.9em">' + esc(it.why) + '</span></div>';
          }).join('');
        }
        if (ex.kind === 'ld') html += ex.items.map(function (it, i) { return '<div>' + esc(it) + ' → <b>' + (ex.answers[i] === 'L' ? 'Like' : 'Dislike') + '</b></div>'; }).join('');
        if (ex.kind === 'tiles') html += ex.tiles.map(function (t, i) { return '<div>' + esc(t.label) + ' → <b>' + (ex.answers[i] === 0 ? 'EXTRA' : ex.answers[i]) + '</b></div>'; }).join('');
        if (ex.kind === 'tabletick' && ex.answers) {
          html += Object.keys(ex.answers).map(function (k) {
            return '<div><b>' + k + ':</b> ' + ex.rows.map(function (r, ri) {
              return ex.answers[k][ri] ? esc(typeof r === 'string' ? r : r.label) : null;
            }).filter(Boolean).join(', ') + '</div>';
          }).join('');
        }
        if (ex.kind === 'order' && ex.items) html += ex.items.map(function (t, i) { return '<div>' + (i + 1) + '. ' + esc(t) + '</div>'; }).join('');
        if (ex.model) html += '<div class="model-answer">Model: ' + esc(ex.model).replace(/\n/g, '<br>') + '</div>';
        html += '</div>';
      });
    });

    html += '<h2>🎯 LGS — Deneme cevap anahtarları</h2>';
    window.LGS.mocks.forEach(function (m) {
      const items = window.LGS.itemsByIds(m.itemIds);
      html += '<div class="card"><h3>' + esc(m.name) + '</h3>' +
        items.map(function (it, i) {
          return '<div>' + (i + 1) + '. <b>' + 'ABCD'[it.answer] + ') ' + esc(it.opts[it.answer]) + '</b><br>' +
            '<span style="color:#555;font-size:.9em">' + esc(it.why) + '</span></div>';
        }).join('') + '</div>';
    });

    host.innerHTML = html;
    window.print();
  }

  /* ================================================================
     ROUTER
     ================================================================ */
  function route() {
    const hash = location.hash.replace('#/', '') || 'home';
    $$('.side-item').forEach(function (b) {
      b.classList.toggle('active', b.getAttribute('data-sec') === hash);
    });
    AP.stop();
    if (hash === 'home') { renderHome(); }
    else {
      const sec = SECTIONS.filter(function (s) { return s.id === hash; })[0];
      if (sec) renderSection(sec); else renderHome();
    }
    renderChrome();
    $('#main').scrollTop = 0;
  }

  /* ================================================================
     API handed to renderers / LGS module
     ================================================================ */
  const api = {
    toast: toast,
    confetti: confetti,
    openModal: openModal,
    closeModal: closeModal,
    refreshChrome: renderChrome,
    printAnswerKey: printAnswerKey,
    award: award,
    render: render,
    esc: esc,
    shuffle: shuffle,
    norm: norm
  };
  window.WBAPI = api;

  /* ================================================================
     BOOT
     ================================================================ */
  function boot() {
    buildSidebar();
    renderChrome();

    window.addEventListener('hashchange', route);
    $('#sidebarToggle').addEventListener('click', function () { $('#sidebar').classList.toggle('open'); });
    $('#modalClose').addEventListener('click', closeModal);
    $('#modalBackdrop').addEventListener('click', function (e) { if (e.target.id === 'modalBackdrop') closeModal(); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeModal(); });
    $('#badgeBtn').addEventListener('click', showBadges);
    $('#helpBtn').addEventListener('click', showHelp);

    $('#modeToggle').addEventListener('click', function () {
      const app = $('#app');
      const teacher = app.getAttribute('data-mode') === 'teacher';
      app.setAttribute('data-mode', teacher ? 'student' : 'teacher');
      $('#modeToggle').setAttribute('title', teacher ? 'Switch to teacher / projector mode' : 'Switch to student mode');
      toast(teacher ? '🎓 Öğrenci modu' : '📽️ Öğretmen / projeksiyon modu', 'ok');
    });

    route();

    // first-run hint
    if (!Store.raw().studentName) {
      setTimeout(function () { toast('Önce adını yaz, sonra Derse başla 🚀'); }, 700);
    }
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();

})();
