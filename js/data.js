/* ============================================================
   Unit 2 · Teen Life — exercise content
   Every exercise from the textbook (pages 26–40) re-built as an
   interactive activity, plus supporting grammar/vocab labs.

   Exercise kinds rendered by app.js:
     match | tiles | builder | ld | gapfill | mcq | tabletick
     | order | flip | write | openq | selfcheck | speak

   Student-facing instructions stay in English; the "why"
   explanations (field `why`) are in Turkish, as agreed.
   ============================================================ */

window.WB = (function () {

  /* ---------------------------------------------------------- */
  /* GET READY! — page 26                                       */
  /* ---------------------------------------------------------- */

  const ex_ready_match = {
    id: 'ready-match',
    kind: 'match',
    tag: 'Get Ready',
    page: 26,
    instruction: 'Match each verb with the phrase that goes with it. Click a verb, then its partner.',
    instructionTr: 'Her fiil ile birlikte kullanılan ifadeyi eşleştir. Bir fiile, sonra eşine tıkla.',
    pairs: [
      { a: 'watch', b: 'TV' },
      { a: 'do', b: 'homework' },
      { a: 'listen to', b: 'music' },
      { a: 'read', b: 'a book' },
      { a: 'play', b: 'chess' },
      { a: 'go to', b: 'the cinema' }
    ],
    hint: 'Extra collocations to remember: do sport · play computer games · go hiking · go fishing',
    points: 6
  };

  const ex_ready_tiles = {
    id: 'ready-tiles',
    kind: 'tiles',
    tag: 'Listening',
    audioId: 'track07',
    page: 26,
    instruction: 'Listen to Track 7 and write the order 1–6 next to the pictures. One picture is extra — leave it empty.',
    instructionTr: 'Track 7\'yi dinle ve resimlerin yanına 1–6 sırasını yaz. Bir resim fazla — onu boş bırak.',
    tiles: [
      { emoji: '🎬', label: 'go to the cinema' },
      { emoji: '🎧', label: 'listen to music' },
      { emoji: '💻', label: 'surf the Internet' },
      { emoji: '🏀', label: 'play basketball' },
      { emoji: '🏋️', label: 'do a sport' },
      { emoji: '📖', label: 'read a book' },
      { emoji: '🎣', label: 'go fishing' }
    ],
    answers: [1, 2, 0, 3, 4, 5, 6],   // 0 = the extra picture
    points: 6
  };

  const ex_ready_builder = {
    id: 'ready-builder',
    kind: 'builder',
    tag: 'Speaking',
    page: 26,
    instruction: 'Build two sentences about each topic: one you like, one you dislike. Click the words in order.',
    instructionTr: 'Her konu için iki cümle kur: sevdiğin ve sevmediğin. Kelimelere sırayla tıkla.',
    groups: [
      {
        topic: '🎵 Music', positive: true,
        parts: ['I', 'like', 'classical', 'music', 'because', "it's", 'relaxing'],
        bank: ['I', 'like', 'classical', 'music', 'because', "it's", 'relaxing', 'unbearable']
      },
      {
        topic: '🎵 Music', positive: false,
        parts: ['I', 'dislike', 'metal', 'music', 'because', "it's", 'too', 'loud'],
        bank: ['I', 'dislike', 'metal', 'music', 'because', "it's", 'too', 'loud', 'terrific']
      },
      {
        topic: '📚 Books', positive: true,
        parts: ['I', 'like', 'reading', 'detective', 'stories', 'because', "they're", 'impressive'],
        bank: ['I', 'like', 'reading', 'detective', 'stories', 'because', "they're", 'impressive', 'boring']
      },
      {
        topic: '🎬 Films', positive: false,
        parts: ['I', 'dislike', 'horror', 'films', 'because', 'they', 'are', 'unbearable'],
        bank: ['I', 'dislike', 'horror', 'films', 'because', 'they', 'are', 'unbearable', 'relaxing']
      }
    ],
    adjectives: ['terrific', 'unbearable', 'relaxing', 'loud', 'impressive'],
    points: 4
  };

  /* ---------------------------------------------------------- */
  /* LISTENING (Track 8–9) — page 27                            */
  /* ---------------------------------------------------------- */

  const ex_listen_ld = {
    id: 'listen-ld',
    kind: 'ld',
    tag: 'Listening',
    audioId: 'track08',
    page: 27,
    instruction: 'Listen to the dialogue and put each activity Brooke talks about in the Like or Dislike box.',
    instructionTr: 'Diyaloğu dinle ve Brooke\'un bahsettiği her aktiviteyi Like veya Dislike kutusuna koy.',
    items: [
      'hanging around',
      'spending time with family',
      'doing the shopping',
      'playing online games',
      'surfing the Internet',
      'doing a sport',
      'watching sports programmes'
    ],
    answers: ['L', 'L', 'D', 'D', 'L', 'L', 'D'],
    points: 7
  };

  const ex_listen_gap = {
    id: 'listen-gap',
    kind: 'gapfill',
    tag: 'Listening',
    audioId: 'track09',
    page: 27,
    mode: 'bank',
    instruction: 'Listen to the dialogue and fill in the seven gaps with the words from the bank.',
    instructionTr: 'Diyaloğu dinle ve yedi boşluğu bankadaki kelimelerle doldur.',
    lines: [
      'William: What do you like or dislike doing, Archie?',
      'Archie: I like going to {{1}}, but I dislike listening to {{2}} music. I think it is {{3}}.',
      'Archie: I enjoy playing {{4}} with my friends, and I {{5}} hiking.',
      'William: What about {{6}} your room?',
      'Archie: No way! I {{7}} doing it.'
    ],
    bank: ['the cinema', 'loud', 'unbearable', 'basketball', 'love', 'tidying', 'hate'],
    answers: {
      1: ['the cinema', 'cinema'],
      2: ['loud'],
      3: ['unbearable'],
      4: ['basketball'],
      5: ['love'],
      6: ['tidying', 'cleaning'],
      7: ['hate']
    },
    why: {
      1: 'going TO the cinema — "go to" her zaman "the cinema" ile kullanılır.',
      2: 'Şarkı/tür sıfatları: loud music (yüksek sesli).',
      3: 'Önce "I dislike" demiş, sonra sebebini veriyor → olumsuz sıfat: unbearable.',
      4: 'play + spor oyunları: play basketball / play chess / play computer games.',
      5: 'I enjoy + -ing / I love + -ing. İkisi de "sevmek".',
      6: 'What about + -ing: "Peki ... yapmak nasıl?" → tidying your room.',
      7: 'No way! güçlü bir ret. Ardından gelen "I hate doing it" ile tutarlı.'
    },
    points: 7
  };

  /* ---------------------------------------------------------- */
  /* SPEAKING — frequency adverbs, page 27                       */
  /* ---------------------------------------------------------- */

  const ex_speak_freq = {
    id: 'speak-freq',
    kind: 'speak',
    tag: 'Speaking',
    page: 27,
    instruction: 'Choose an activity and how often you do it. Then say the sentence out loud — a partner or the class can ask you the question first.',
    instructionTr: 'Bir aktivite ve ne sıklıkla yaptığını seç. Sonra cümleyi yüksek sesle söyle.',
    activities: [
      { q: 'hang out with your friends', a: 'meet my friends' },
      { q: 'play basketball', a: 'play basketball' },
      { q: 'go to the cinema', a: 'go to the cinema' },
      { q: 'listen to music', a: 'listen to music' },
      { q: 'read a book', a: 'read a book' },
      { q: 'surf the Internet', a: 'surf the Internet' },
      { q: 'do the shopping', a: 'do the shopping' },
      { q: 'go hiking', a: 'go hiking' }
    ],
    adverbs: [
      { word: 'never', pct: 0, tr: 'asla — %0' },
      { word: 'rarely', pct: 15, tr: 'nadiren — çok az' },
      { word: 'sometimes', pct: 40, tr: 'bazen' },
      { word: 'often', pct: 65, tr: 'sık sık' },
      { word: 'always', pct: 100, tr: 'her zaman' }
    ],
    tip: 'Adverb goes BEFORE the main verb: "I sometimes meet my friends." But with "be" it goes after: "I am always tired."',
    tipTr: 'Sıklık zarfi ana fiilden ÖNCE gelir: I sometimes meet my friends. Ama "be" fiilinden SONRA: I am always ready.',
    points: 0
  };

  /* ---------------------------------------------------------- */
  /* READING — Lily & Sam, page 28                               */
  /* ---------------------------------------------------------- */

  const ex_lily_sam = {
    id: 'lily-sam',
    kind: 'tabletick',
    tag: 'Reading',
    page: 28,
    instruction: 'Read Lily\'s and Sam\'s speech bubbles. Tick ✓ the activities they do. The last column is for you.',
    instructionTr: 'Lily\'nin ve Sam\'in konuşma balonlarını oku. Yaptıkları aktivitelere ✓ koy. Son sütun senin için.',
    stimulusTitle: 'Lily',
    stimulus: 'I hang out with my friends or play basketball in my free time. In good weather, we go hiking or camping. When the weather is bad, we prefer going to the cinema or doing a sport in the gym. We sometimes go fishing in the river nearby. I love them a lot because we have a good relationship, and we never argue with each other.',
    stimulus2Title: 'Sam',
    stimulus2: 'When there is no school, I visit my friends or spend my time at home. I read books, listen to music or write on my blog. I have a blog about music and fashion. Sometimes, my friends come over, and we play computer games or watch movies.',
    rows: [
      'hang out', 'go hiking', 'listen to music', 'read a book', 'do a sport',
      'watch movies', 'visit friends', 'write a blog', 'play basketball', 'go fishing'
    ],
    cols: [
      { key: 'lily', label: 'Lily' },
      { key: 'sam', label: 'Sam' },
      { key: 'you', label: 'You', self: true }
    ],
    answers: {
      lily: [true, true, false, false, true, false, false, false, true, true],
      sam:  [false, false, true, true, false, true, true, true, false, false]
    },
    why: {
      3: 'Sam "listen to music or write on my blog" diyor; Lily müzikten hiç bahsetmiyor.',
      5: 'Lily "doing a sport in the gym" diyor; Sam evde vakit geçiriyor.',
      10: 'Lily "we sometimes go fishing in the river nearby" diyor.'
    },
    followUp: {
      question: 'Do you think you are more like Lily or Sam? Why?',
      tip: 'Answer with 2–3 sentences and give ONE reason: "I think I am more like Lily because I also go hiking with my friends."'
    },
    points: 20
  };

  /* ---------------------------------------------------------- */
  /* READING — Helen's Blog, page 29                             */
  /* ---------------------------------------------------------- */

  const ex_helen_read = {
    id: 'helen-read',
    kind: 'selfcheck',
    tag: 'Reading',
    audioId: 'helenBlog',
    page: 29,
    instruction: 'Read Helen\'s blog. You can also listen to it. Then do the exercise below.',
    instructionTr: 'Helen\'in blogunu oku. İstersen dinleyebilirsin. Sonra alttaki alıştırmayı yap.',
    stimulusTitle: "Helen's Blog — Activities teenagers like doing these days!",
    stimulus: 'The most popular activities among teenagers are surfing the Internet, sending messages to each other and going to the cinema or concerts. Other than these, teens like hanging around or going shopping. I\'m here to give you some other ideas to do in your free time. What about starting doing a sport? Choose a sport that you can do easily. For example, walk 5 kilometers every day for a healthy body. It\'s easy, and you can do it everywhere. And reading! Read a newspaper or a book every day. Reading enlarges your horizons. I recommend you to read George Heart\'s latest book about teen life. I\'m going to talk about music next time. Take care, folks.',
    points: 0
  };

  const ex_helen_gap = {
    id: 'helen-gap',
    kind: 'gapfill',
    tag: 'Reading',
    page: 29,
    mode: 'type',
    instruction: 'Fill in the missing words according to Helen\'s blog.',
    instructionTr: 'Helen\'in bloguna göre eksik kelimeleri doldur. (Büyük/küçük harf önemli değil)',
    lines: [
      '1. {{1}} like surfing the Internet.',
      '2. Going to the cinema or {{2}} is popular among the teenagers.',
      '3. Helen gives {{3}} for free time activities.',
      '4. Helen advises teenagers to do {{4}} and {{5}} books.',
      '5. Helen recommends to {{6}} to be healthy.',
      "6. George Heart's latest book is about {{7}}."
    ],
    answers: {
      1: ['teenagers', 'teens'],
      2: ['concerts', 'concert'],
      3: ['some other ideas', 'other ideas', 'ideas'],
      4: ['a sport', 'sport'],
      5: ['read'],
      6: ['walk 5 kilometers every day', 'walk 5 kilometres every day', 'walk 5 km every day', 'walk 5 kilometers', 'walk five kilometers every day'],
      7: ['teen life', 'teenlife']
    },
    why: {
      1: 'Metnin ilk cümlesi: "The most popular activities among teenagers are..."',
      2: '"...going to the cinema or concerts." — "or" ile bağlanan ikinci öğe.',
      3: '"I\'m here to give you some other ideas to do in your free time."',
      4: '"What about starting doing a sport?" — ardından gelen öneri.',
      5: '"And reading! Read a newspaper or a book every day."',
      6: '"For example, walk 5 kilometers every day for a healthy body."',
      7: '"George Heart\'s latest book about teen life." — kitabın konusu.'
    },
    points: 7
  };

  const ex_helen_write = {
    id: 'helen-write',
    kind: 'write',
    tag: 'Writing',
    page: 29,
    instruction: 'Suppose you are Helen. Write on your blog about free time activities that you can suggest to teenagers.',
    instructionTr: 'Helen olduğunu varsay. Teenager\'lara önereceğin serbest zaman aktiviteleri hakkında blog yazısı yaz.',
    title: "Helen's Blog — your turn",
    targetWords: 45,
    starter: 'Today I want to talk about free time activities. In my opinion, the best way to spend your free time is...',
    wordBank: ['surfing the Internet', 'going shopping', 'starting a sport', 'reading a newspaper',
      'reading a book', 'going to the cinema', 'hanging around', 'writing on a blog', 'going hiking'],
    checklist: [
      'I used at least three free-time activities.',
      'I used a preference structure (like / love / enjoy / hate / prefer / keen on).',
      'I gave a reason with "because".',
      'I used -ing forms after the verbs (going, reading, doing).',
      'I wrote in the present simple tense.'
    ],
    model: 'Today I want to talk about free time activities. In my opinion, teenagers should not spend all their time on the Internet. I recommend starting a sport that you can do easily. For example, you can go hiking or play basketball with your friends. You should also read a book every day because reading enlarges your horizons. If you do these things, you will feel relaxed and happy.',
    points: 0
  };

  /* ---------------------------------------------------------- */
  /* LISTENING (Track 10–11) — page 30                           */
  /* ---------------------------------------------------------- */

  const ex_listen_mcq = {
    id: 'listen-mcq',
    kind: 'mcq',
    tag: 'Listening',
    audioId: 'track10',
    page: 30,
    instruction: 'Listen to the conversation and answer the questions.',
    instructionTr: 'Konuşmayı dinle ve soruları cevapla.',
    items: [
      {
        stem: 'Tarik and Doris are talking about the activities they do in the ______.',
        opts: ['afternoons', 'evenings'], answer: 1,
        why: '"in the evenings" — akşam aktivitelerinden konuşuyorlar.'
      },
      {
        stem: 'Tarik prefers reading ______ stories of patriots.',
        opts: ['life', 'youth'], answer: 0,
        why: '"life stories of patriots" = vatanseverlerin yaşam öyküleri (biyografi).'
      },
      {
        stem: 'Tarik likes watching documentaries because they are ______.',
        opts: ['educative', 'fantastic'], answer: 0,
        why: 'educative = eğitici. "Because" dan sonra sebep veriliyor.'
      },
      {
        stem: 'Doris does ______ things what Tarik does in the evenings.',
        opts: ['different', 'same'], answer: 0,
        why: '"different things" + "than" yapısal olarak doğrudur: does different things than...'
      }
    ],
    points: 4
  };

  const ex_listen_gap2 = {
    id: 'listen-gap2',
    kind: 'gapfill',
    tag: 'Listening',
    audioId: 'track11',
    page: 30,
    mode: 'bank',
    instruction: 'Listen to Track 11 and fill in the seven gaps.',
    instructionTr: 'Track 11\'i dinle ve yedi boşluğu doldur.',
    lines: [
      'I {{1}} listen to rock music. I think it is {{2}}.',
      'I am keen on camping. It is {{3}}.',
      'To be honest, I never watch {{4}}. They are {{5}}.',
      'Listening to classical music is {{6}}.',
      'I hate buying {{7}} clothes.'
    ],
    bank: ['never', 'unbearable', 'exciting', 'documentaries', 'boring', 'relaxing', 'trendy'],
    answers: {
      1: ['never'],
      2: ['unbearable'],
      3: ['exciting'],
      4: ['documentaries', 'documentary'],
      5: ['boring'],
      6: ['relaxing'],
      7: ['trendy']
    },
    why: {
      1: '"I never + fiil" — olumsuz cümlede sıklık zarfi fiilden önce gelir.',
      2: 'Rock müziği sevmiyor → "unbearable" (dayanılmaz) tutarlı.',
      3: '"keen on" olumlu bir duygu → olumlu sıfat: exciting.',
      4: 'Tekil çoğul dikkat: "They are" geldiği için çoğul olmalı → documentaries.',
      5: '"They are boring" — belgeselleri sevmiyor.',
      6: 'Klasik müzik genelde "relaxing" (rahatlatıcı) olarak tanımlanır.',
      7: 'trendy clothes = moda kıyafetler. "I hate buying" ile tutarlı.'
    },
    points: 7
  };

  const ex_speak_prefs = {
    id: 'speak-prefs',
    kind: 'builder',
    tag: 'Speaking',
    page: 30,
    instruction: 'Use the phrases to make sentences about your likes, dislikes and opinions.',
    instructionTr: 'İfadeleri kullanarak sevgi, nefret ve görüşlerin hakkında cümleler kur.',
    phrases: ['keen on', 'hate', 'like', 'dislike', 'fond of', 'love', 'prefer'],
    groups: [
      {
        topic: '🎧 Music', positive: true,
        parts: ["I'm", 'keen', 'on', 'listening', 'to', 'pop', 'music'],
        bank: ["I'm", 'keen', 'on', 'listening', 'to', 'pop', 'music', 'hate', 'jazz', 'boring']
      },
      {
        topic: '🎧 Music', positive: false,
        parts: ['I', 'dislike', 'jazz', 'music', 'because', "it's", 'boring'],
        bank: ['I', 'dislike', 'jazz', 'music', 'because', "it's", 'boring', 'amazing', 'keen']
      },
      {
        topic: '⚽ Sports', positive: true,
        parts: ["I'm", 'fond', 'of', 'playing', 'basketball'],
        bank: ["I'm", 'fond', 'of', 'playing', 'basketball', 'swimming', 'dislike']
      },
      {
        topic: '📚 Books', positive: true,
        parts: ['I', 'prefer', 'science', 'fiction', 'to', 'romance'],
        bank: ['I', 'prefer', 'science', 'fiction', 'to', 'romance', 'detective', 'hate']
      }
    ],
    tip: 'keen on / fond of / interested in → all take a NOUN or -ING form, never a bare verb.',
    tipTr: 'keen on / fond of / interested in → hepsi SONRA noun veya -ing formu alır. Çıplak fiil asla gelmez.',
    points: 4
  };

  /* ---------------------------------------------------------- */
  /* MEMORY TEST — page 31                                       */
  /* ---------------------------------------------------------- */

  const ex_memory = {
    id: 'memory',
    kind: 'order',           // reuse order for the "who said" matching step
    tag: 'Reading & Speaking',
    page: 31,
    mode: 'memory',
    instruction: 'You have 2 minutes to read the three paragraphs. Then cover them and answer the questions.',
    instructionTr: 'Üç paragrafı okumak için 2 dakikan var. Sonra üzerini kapat ve soruları cevapla.',
    timerSeconds: 120,
    cards: [
      {
        name: 'David', color: 'brand',
        text: 'I enjoy reading books. I prefer reading e-books. They\'re faster and cheaper. I hate watching TV because most of the programmes are boring. I only watch documentaries and the news.'
      },
      {
        name: 'Ali', color: 'f',
        text: 'I love playing computer games. I\'m keen on playing computer games with my friends. They\'re enjoyable. I dislike buying trendy clothes because I\'m not a snob! I always ask my mother to buy things for me.'
      },
      {
        name: 'Maria', color: 'ok',
        text: 'I love going to concerts. I prefer hip-hop concerts. I think they\'re terrific. I like dancing and singing the songs. I feel free and relaxed while singing. I never listen to pop music. It\'s unbearable.'
      }
    ],
    items: [
      { stem: 'He / She doesn\'t like watching TV.', answer: 'David',
        why: 'David: "I hate watching TV because most of the programmes are boring."' },
      { stem: 'He / She can\'t stand pop music.', answer: 'Maria',
        why: 'Maria: "I never listen to pop music. It\'s unbearable." — can\'t stand = dayanamamak.' },
      { stem: 'He / She prefers reading books.', answer: 'David',
        why: 'David: "I prefer reading e-books." — okumayı tercih ediyor.' },
      { stem: 'He / She loves online games.', answer: 'Ali',
        why: 'Ali: "I love playing computer games with my friends."' },
      { stem: 'He / She thinks hip-hop is awesome.', answer: 'Maria',
        why: 'Maria: "I prefer hip-hop concerts. I think they\'re terrific." — terrific = awesome.' },
      { stem: 'He / She hates shopping.', answer: 'Ali',
        why: 'Ali: "I dislike buying trendy clothes... I always ask my mother to buy things for me."' }
    ],
    points: 6
  };

  const ex_memory_pairs = {
    id: 'memory-pairs',
    kind: 'selfcheck',
    tag: 'Speaking',
    page: 31,
    instruction: 'Work in pairs. Ask, answer and say what you are fond of / keen on doing.',
    instructionTr: 'İkili çalış. Sor ve cevapla; nelerden hoşlandığını söyle.',
    stimulus: 'Student A: "I\'m fond of playing computer games." — Student B: "It\'s okay, but I\'m keen on reading books, and I like listening to music."',
    tip: 'Keep the conversation going: after you answer, ask the SAME question back with "What about you?"',
    tipTr: 'Konuşmayı sürdür: cevap verdikten sonra aynı soruyu "What about you?" diye geri sor.',
    points: 0
  };

  /* ---------------------------------------------------------- */
  /* GRAMMAR LAB — page 32                                       */
  /* ---------------------------------------------------------- */

  const ex_grammar_table = {
    id: 'grammar-table',
    kind: 'selfcheck',
    tag: 'Grammar Lab',
    page: 32,
    instruction: 'Study the three ways to express yourself in this unit.',
    instructionTr: 'Bu ünitede kendini ifade etmenin üç yolunu incele.',
    columns: [
      {
        title: 'Expressing preferences', color: 'brand',
        rows: [
          'I prefer team sports to individual sports.',
          'I prefer wearing casual clothes.',
          'I would rather stay at home.',
          'I would prefer to go to the cinema.'
        ]
      },
      {
        title: 'Expressing likes / dislikes', color: 'ok',
        rows: [
          'I love / like / enjoy swimming.',
          'I hate / dislike running.',
          "I can't stand waiting.",
          "I don't mind reading on the bus."
        ]
      },
      {
        title: 'Stating personal opinions', color: 'warn',
        rows: [
          "I'm keen on hiking.",
          "I'm fond of cycling.",
          'I rarely / seldom play tennis.',
          'I think rock music is unbearable.'
        ]
      }
    ],
    points: 0
  };

  const ex_grammar_drill = {
    id: 'grammar-drill',
    kind: 'mcq',
    tag: 'Grammar Lab',
    page: 32,
    instruction: 'Choose the correct option. These are the structures LGS tests most often in this unit.',
    instructionTr: 'Doğru seçeneği işaretle. LGS bu ünitede en çok bu yapıları test ediyor.',
    items: [
      {
        stem: 'I prefer reading books ______ playing computer games.',
        opts: ['than', 'to', 'over', 'from'], answer: 1,
        why: 'prefer + isim/-ing + TO + isim/-ing. "Than" YANLIŞ — burada en sık yapılan hata.'
      },
      {
        stem: 'She would rather ______ at home than go out.',
        opts: ['to stay', 'staying', 'stay', 'stayed'], answer: 2,
        why: 'would rather + çıplak fiil (to\'suz). would rather TO stay ✗.'
      },
      {
        stem: "I'm keen on ______ to pop music in my free time.",
        opts: ['listen', 'to listen', 'listening', 'listened'], answer: 2,
        why: 'keen on + -ing. "on" bir prepozisyon olduğu için SONRASI -ing olur.'
      },
      {
        stem: "I can't ______ rock music. It's too loud.",
        opts: ['stand', 'like', 'enjoy', 'prefer'], answer: 0,
        why: "can't stand = dayanamak. " + "Sonraki \"It's too loud\" olumsuz bir duygu."
      },
      {
        stem: 'My sister ______ goes to the gym. She never misses a day.',
        opts: ['rarely', 'never', 'always', 'seldom'], answer: 2,
        why: '"never misses a day" → her zaman gidiyor → always.'
      },
      {
        stem: 'What do you prefer ______, tea or coffee?',
        opts: ['drink', 'drinking', 'to drink', 'drank'], answer: 2,
        why: 'prefer + to-infinitive: prefer TO drink. "What do you prefer to drink?"'
      },
      {
        stem: 'I\'m ______ reading e-books. They are faster and cheaper.',
        opts: ['fond', 'fond of', 'keen', 'keen to'], answer: 1,
        why: 'be fond OF + isim/-ing. "fond" tek başına kullanılmaz.'
      },
      {
        stem: 'We ______ camping in the summer because it is exciting.',
        opts: ['are keen on', 'are keen', 'keen on', 'keens on'], answer: 0,
        why: 'be keen on + -ing/isim. Yapı: özne + be + keen + on.'
      }
    ],
    points: 8
  };

  /* ---------------------------------------------------------- */
  /* VOCAB — genres & music, page 33                             */
  /* ---------------------------------------------------------- */

  const ex_vocab_flip = {
    id: 'vocab-flip',
    kind: 'flip',
    tag: 'Vocabulary',
    page: 33,
    instruction: 'Tap a card to see the example. Read it aloud, then try to make your own sentence with it.',
    instructionTr: 'Karta dokun, örneği gör. Sesli oku, sonra kendi cümleni kur.',
    cards: [
      { big: '🕵️', cap: 'detective', hint: 'book genre', back: 'a story about solving a crime — "Sherlock Holmes is a famous detective story."' },
      { big: '🐉', cap: 'fantasy', hint: 'book genre', back: 'stories with magic and imaginary worlds — "Harry Potter is fantasy."' },
      { big: '📜', cap: 'biographical', hint: 'book genre', back: 'the real life story of a person — "A biography of Atatürk."' },
      { big: '💘', cap: 'romance', hint: 'book genre', back: 'a love story between two people — "I hate romance; I think it\'s ridiculous."' },
      { big: '🚀', cap: 'science fiction', hint: 'book genre', back: 'future, space and technology — "I prefer science fiction to romance."' },
      { big: '🏰', cap: 'historical', hint: 'book genre', back: 'set in the past, about real events — "Historical novels teach you about the past."' },
      { big: '🎤', cap: 'hip-hop', hint: 'music type', back: '"I prefer hip-hop concerts. I think they\'re terrific."' },
      { big: '🎷', cap: 'jazz', hint: 'music type', back: '"I dislike jazz because I think it\'s boring."' },
      { big: '🎸', cap: 'rock', hint: 'music type', back: '"I always listen to rock music! I love it."' },
      { big: '🎻', cap: 'classical', hint: 'music type', back: '"Listening to classical music is relaxing."' },
      { big: '🪕', cap: 'folk', hint: 'music type', back: 'traditional music from ordinary people — "Folk music is my grandmother\'s favourite."' },
      { big: '💿', cap: 'pop', hint: 'music type', back: '"I never listen to pop music. It\'s unbearable."' }
    ],
    points: 0
  };

  const ex_martha = {
    id: 'martha',
    kind: 'mcq',
    tag: 'Reading',
    page: 33,
    instruction: 'Read the text and circle the correct option.',
    instructionTr: 'Metni oku ve doğru seçeneği işaretle.',
    stimulusTitle: "Martha's keen on running. She's a national athlete.",
    stimulus: "Martha's keen on running. She's a national athlete. That's why she works hard. She gets up early every morning, has a big breakfast and goes to school. After school, she has a short rest and starts doing exercises at 2 p.m. She goes to the gym on Mondays, Wednesdays and Fridays. Martha trains in the field every day. She runs 10 km each day. On weekends, she stays at home and rests.",
    items: [
      {
        stem: 'Martha likes ______ on week days.',
        opts: ['doing sports', 'resting'], answer: 0,
        why: 'Metinde hafta içi her gün antrenman yaptığını söylüyor; sadece hafta sonu dinleniyor.'
      },
      {
        stem: 'She eats a big breakfast before she ______.',
        opts: ['goes to school', 'trains in the field'], answer: 0,
        why: '"has a big breakfast and goes to school" — sıralama bu.'
      },
      {
        stem: 'She exercises in the ______.',
        opts: ['afternoon', 'evening'], answer: 0,
        why: '"starts doing exercises at 2 p.m." → 2 öğleden sonra = afternoon.'
      },
      {
        stem: 'She works out in the gym ______ days a week.',
        opts: ['5', '3'], answer: 1,
        why: '"Mondays, Wednesdays and Fridays" → haftada 3 gün.'
      }
    ],
    points: 4
  };

  /* ---------------------------------------------------------- */
  /* WRITING — page 34                                           */
  /* ---------------------------------------------------------- */

  const ex_write_model = {
    id: 'write-model',
    kind: 'selfcheck',
    tag: 'Writing',
    page: 34,
    instruction: 'Study the model paragraph. Notice how it is built.',
    instructionTr: 'Model paragrafı incele. Nasıl kurulduğuna dikkat et.',
    stimulusTitle: 'Model',
    stimulus: 'Teenagers do different activities in these days. They mostly text or send e-mails to each other, watch videos on the Internet, follow the bloggers, surf the Internet or play online games. They also like hanging out, going to the cinema or concerts, doing a sport or shopping.',
    structure: [
      { step: '1 · Opening', text: 'Name the group and the topic. — "Teenagers do different activities in these days."' },
      { step: '2 · Main body', text: 'List 5–6 activities with a linking word. — "They mostly text or send e-mails..."' },
      { step: '3 · Addition', text: 'Use "also" to add more. — "They also like hanging out, going to the cinema..."' }
    ],
    points: 0
  };

  const ex_write_band = {
    id: 'write-band',
    kind: 'write',
    tag: 'Assignment',
    page: 34,
    instruction: 'Write a short paragraph about a music band and state the characteristics of the band.',
    instructionTr: 'Bir müzik grubu hakkında kısa bir paragraf yaz ve grubun özelliklerini belirt.',
    title: 'MY FAVOURITE BAND',
    targetWords: 50,
    starter: 'My favourite band is .................... They are a .................... band from ....................',
    wordBank: ['formed the band', 'became very popular', 'make rock music', 'write songs',
      'the guitarist', 'the drummer', 'the vocalist', 'they say they love', "they're fond of"],
    checklist: [
      'I named the band and when they were formed.',
      'I said what kind of music they make.',
      'I named at least two members and their roles.',
      'I used a preference structure at the end.',
      'I used the past simple for past events (formed, became).'
    ],
    model: 'THE BOYS — Three close friends formed the band in 2008, and became very popular in a short time. They make rock music and write songs. Billy is the guitarist, James is the drummer, and Alex is the vocalist. They say they love rock music, and they\'re fond of reaching a lot of people with the music they make.',
    points: 0
  };

  /* ---------------------------------------------------------- */
  /* PRACTICE — pages 35–38                                      */
  /* ---------------------------------------------------------- */

  const ex_hobbies = {
    id: 'hobbies',
    kind: 'builder',
    tag: 'Practice',
    page: 35,
    instruction: 'Answer the question: WHAT ARE YOUR HOBBIES? Write two activities after each verb.',
    instructionTr: 'Soruyu cevapla: HOBİLERİN NELER? Her fiilden sonra iki aktivite yaz.',
    custom: 'fourboxes',
    verbs: ['love and like', 'like and enjoy', 'enjoy and am fond of', 'hate and dislike'],
    topics: ['music', 'books', 'films', 'sports', 'shopping', 'the Internet'],
    points: 0
  };

  const ex_triples = {
    id: 'triples',
    kind: 'write',
    tag: 'Practice',
    page: 35,
    instruction: 'Give three examples for each question.',
    instructionTr: 'Her soru için üç örnek ver.',
    multi: true,
    groups: [
      {
        title: 'a) What do you do in the afternoons?',
        targetWords: 0, lines: 3,
        starter: '1. I usually ...\n2. ...\n3. ...',
        model: '1. I usually do my homework.\n2. I sometimes play basketball with my friends.\n3. I read a book or watch TV.'
      },
      {
        title: 'b) What do you do in the evenings?',
        targetWords: 0, lines: 3,
        starter: '1. In the evenings, I usually ...\n2. ...\n3. ...',
        model: '1. In the evenings, I usually listen to music.\n2. I sometimes surf the Internet.\n3. I rarely go to the cinema on a school night.'
      }
    ],
    points: 0
  };

  const ex_pref_pairs = {
    id: 'pref-pairs',
    kind: 'mcq',
    tag: 'Practice',
    page: 36,
    instruction: 'Look at the pairs. Make your preference and give your reason. Then choose the better example sentence.',
    instructionTr: 'EŞLERE bak. Tercihini yap ve sebep ver. Sonra daha iyi örnek cümleyi seç.',
    items: [
      {
        stem: 'reading a book  ·  playing chess — Which sentence is better?',
        opts: [
          'I prefer playing chess to reading books because I think it is more enjoyable.',
          'I prefer playing chess than reading books because I think it is more enjoyable.'
        ], answer: 0,
        why: 'prefer + -ing + TO + -ing. "Than" kullanılmaz — bu birinci sıktır.'
      },
      {
        stem: 'fishing  ·  scuba diving — Which sentence is better?',
        opts: [
          'I prefer scuba diving to fishing because it is more exciting.',
          'I would rather scuba diving than fishing because it is more exciting.'
        ], answer: 0,
        why: 'would rather + çıplak fiil alır ("would rather go scuba diving"). Burada isimler var → prefer to.'
      },
      {
        stem: 'camping  ·  cycling — Which sentence is better?',
        opts: [
          'I prefer cycling to camping because I feel free while riding.',
          'I prefer cycling than camping because I feel free while riding.'
        ], answer: 0,
        why: 'Yine "prefer ... to ...". Unutma: TO.'
      }
    ],
    points: 3
  };

  const ex_dialogue_write = {
    id: 'dialogue-write',
    kind: 'gapfill',
    tag: 'Practice',
    page: 36,
    mode: 'type',
    instruction: 'Complete the dialogue with questions. Then listen to check your answers.',
    instructionTr: 'Diyaloğu sorularla tamamla. Sonra dinleyerek kontrol et.',
    lines: [
      'Nancy: {{1}}?',
      'Buket: On weekends? Well, ... I usually hang around or go to the cinema.',
      'Nancy: {{2}}?',
      'Buket: No, I don\'t like going to the concerts, but my sister Emma does.',
      'Nancy: {{3}}?',
      'Buket: She loves heavy metal music.',
      'Nancy: {{4}}?',
      'Buket: Me? I think it is unbearable.',
      'Nancy: There is a concert on Sunday. {{5}}?',
      'Buket: No, thanks. You can go to the concert with Emma!'
    ],
    flexible: true,
    answers: {
      1: ['what do you usually do on weekends', 'what do you do on weekends', 'what do you usually do at the weekends'],
      2: ['do you like going to the concerts', 'do you like going to concerts', 'do you like concerts'],
      3: ['what kind of music does your sister emma love', 'what kind of music does emma love'],
      4: ['what do you think of it', 'how do you feel about it', 'what do you think about it'],
      5: ['would you like to go with me', 'do you want to go with me', 'would you like to go to the concert']
    },
    why: {
      1: 'Buket "On weekends?" diye tekrarladı → soru hafta sonuyla ilgili.',
      2: 'Cevap "No, I don\'t like..." → bu bir Yes/No sorusu (Do you like...?).',
      3: 'Cevap "She loves heavy metal music." → tür soruluyor: What kind of music...?',
      4: 'Cevap "Me? I think it is unbearable." → bir görüş soruluyor.',
      5: 'Cevap "No, thanks." → bir davet/red: Would you like to...?'
    },
    points: 5
  };

  const ex_track12 = {
    id: 'track12',
    kind: 'gapfill',
    tag: 'Listening',
    audioId: 'track12',
    page: 37,
    mode: 'bank',
    instruction: 'Listen to Track 12 and complete the sentences.',
    instructionTr: 'Track 12\'yi dinle ve cümleleri tamamla.',
    lines: [
      '1. Fishing is {{1}}.',
      '2. Camping is {{2}}.',
      '3. Playing chess is {{3}}.',
      '4. Surfing the Internet is {{4}}.'
    ],
    bank: ['relaxing', 'exciting', 'fun', 'boring'],
    answers: {
      1: ['relaxing'],
      2: ['exciting'],
      3: ['fun'],
      4: ['boring']
    },
    why: {
      1: 'Fishing = durgun, sakin bir aktivite → relaxing (rahatlatıcı).',
      2: 'Camping = macera dolu → exciting (heyecan verici).',
      3: 'Playing chess = eğlenceli ama zihinsel → fun.',
      4: 'Suring the Internet = burada olumsuz sıfat → boring (sıkıcı).'
    },
    points: 4
  };

  const ex_diagram = {
    id: 'diagram',
    kind: 'tabletick',
    tag: 'Practice',
    page: 37,
    instruction: 'Look at the six activities and decide what you think about each one. Tick the column that matches your opinion, then read the suggested answers.',
    instructionTr: 'Altı aktiviteye bak ve her biri hakkında ne düşündüğünü kararlaştı. Sana uyan sütunu işaretle.',
    rows: [
      { emoji: '🎣', label: 'fishing' },
      { emoji: '⛺', label: 'camping' },
      { emoji: '♟️', label: 'playing chess' },
      { emoji: '💻', label: 'surfing the Internet' },
      { emoji: '🎧', label: 'listening to music' },
      { emoji: '🏀', label: 'playing basketball' }
    ],
    cols: [
      { key: 'relaxing', label: 'relaxing', self: true },
      { key: 'exciting', label: 'exciting', self: true },
      { key: 'fun', label: 'fun', self: true },
      { key: 'boring', label: 'boring', self: true }
    ],
    suggestion: {
      'fishing': 'relaxing', 'camping': 'exciting', 'playing chess': 'fun',
      'surfing the Internet': 'boring', 'listening to music': 'relaxing', 'playing basketball': 'fun'
    },
    freeChoice: true,
    points: 0
  };

  const ex_para_write = {
    id: 'para-write',
    kind: 'write',
    tag: 'Writing',
    page: 38,
    instruction: 'Answer the questions and write a paragraph. Use the phrases in the box.',
    instructionTr: 'Soruları cevapla ve bir paragraf yaz. Kutudaki ifadeleri kullan.',
    title: 'My free time',
    targetWords: 55,
    questions: [
      '1. What are your favourite activities?',
      '2. Why do you like doing them?',
      '3. When do you prefer doing them?'
    ],
    wordBank: ['hanging out', 'going shopping', 'playing a sport', 'listening to music',
      'reading books', 'meeting friends', 'going to the cinema'],
    starter: 'I like .................................................................... because ....................................................................',
    checklist: [
      'I answered all three questions.',
      'I used at least four activities from the box.',
      'I used "because" to give a reason.',
      'I said WHEN I do them (in the evenings / on weekends).',
      'I used at least one frequency adverb (always / usually / sometimes / rarely / never).'
    ],
    model: 'I like hanging out with my friends and listening to music because they are relaxing. In the afternoons, I usually play a sport with my friends, and at the weekends I sometimes go shopping with my sister. I also enjoy reading books and going to the cinema. I rarely stay at home because I prefer being outdoors.',
    points: 0
  };

  const ex_open_q = {
    id: 'open-q',
    kind: 'openq',
    tag: 'Practice',
    page: 38,
    instruction: 'Answer the questions in full sentences. Compare with a partner afterwards.',
    instructionTr: 'Sorulara tam cümlelerle cevap ver. Sonra bir eşinle karşılaştır.',
    questions: [
      {
        q: 'What do you do in the afternoons / evenings?',
        model: 'In the afternoons I usually do my homework and play basketball. In the evenings I sometimes listen to music or read a book.'
      },
      {
        q: 'What kind of activities do you like doing?',
        model: 'I like doing a sport and meeting my friends. I am also keen on listening to pop music.'
      },
      {
        q: 'What do you prefer doing on weekends?',
        model: 'I prefer going to the cinema to staying at home because I think films are more enjoyable.'
      },
      {
        q: 'What do you rarely do in your free time?',
        model: 'I rarely go shopping because I dislike buying clothes. I always ask my mother to buy things for me.'
      }
    ],
    points: 0
  };

  /* ---------------------------------------------------------- */
  /* UNIT TEST — pages 39–40                                     */
  /* ---------------------------------------------------------- */

  const ex_unit_test = {
    id: 'unit-test',
    kind: 'mcq',
    tag: 'Unit Test',
    page: 39,
    examStyle: true,
    instruction: 'Answer the seven questions. This is the test at the end of Unit 2.',
    instructionTr: 'Yedi soruyu cevapla. Bu, Unit 2\'nin sonundaki testtir.',
    stimulusTitle: '1',
    stimulus: `<table class="grid-table" style="font-size:.95rem">
      <tr><th></th><th>go to the cinema</th><th>listen to music</th><th>surf the Internet</th></tr>
      <tr><td class="rowhead">Laura</td><td>3</td><td>3</td><td>7</td></tr>
      <tr><td class="rowhead">Kelly</td><td>7</td><td>3</td><td>7</td></tr>
    </table>`,
    items: [
      {
        stem: 'Which of the following sentences is CORRECT according to the table?',
        opts: [
          'Laura likes spending time on the Internet.',
          'Kelly prefers listening to music to watching movies.',
          'Only Kelly loves listening to music.',
          'Kelly and Laura prefer surfing the Internet to listening to music.'
        ],
        answer: 3,
        why: 'İkisinin de Internet puanı (7) müzikten (3) yüksek → D. Not: A da doğru görünüyor ama D tablodaki kararlaştırmayı en iyi yapan ifadedir; kitap bu belirsizliği içinde barındırıyor. Sınavda en güçlü kanıt olan seçeneği işaretle.',
        note: 'Bu soru kaynak kitapta tartışmalı: hem A hem D tabloyla tutarlı. D en kapsayıcı ifadedir.'
      },
      {
        stem: 'Which of the following options completes the speech bubble?  "I always listen to rock music!  I ______ it."',
        opts: ['can\'t stand', 'love', 'hate', 'dislike'],
        answer: 1,
        why: '"always listen to" = sürekli dinliyor → seviyor olmalı. Olumsuz seçenekler (A, C, D) tutarsız.'
      },
      {
        stem: 'Emma: Do you like shopping?  Peter: ______ but I prefer shopping online.\nWhich of the following answers DOES Peter give?',
        opts: ['Yes, of course', 'Not at all', 'To be honest', 'I hate it'],
        answer: 0,
        why: '"but" öncesi olumlu bir kabul, sonrası tercih. "Not at all / I hate it" olsaydı "but" anlamsız olurdu.'
      },
      {
        stimulusTitle: '4',
        stimulus: 'Pamela: "I like wearing casual clothes in my daily life because they are comfortable. I never wear smart clothes if there isn\'t an event."',
        stem: 'Which of the following clothes DOES Pamela prefer wearing every day?',
        opts: ['casual clothes 👕', 'smart clothes 👔', 'sporty clothes 🏃', 'traditional clothes 🥻'],
        answer: 0,
        why: '"I like wearing casual clothes in my daily life" → günlük olarak casual giyiniyor.'
      },
      {
        stem: 'They are between 13-19 years old. They like doing trendy activities such as chatting online, texting, going to the gym or so. They meet their friends and go to the cinema or a café. They enjoy having fun.\n\nWhat\'s the text above about?',
        opts: ['Old people', 'Adults', 'Teenagers', 'Children'],
        answer: 2,
        why: '13-19 yaş aralığı + trendy aktiviteler + arkadaşlarla vakit = teenagers (gençler).'
      },
      {
        stimulusTitle: '6',
        stimulus: 'Melih: I\'ve got two tickets to the concert of the Symphony Orchestra. Would you like to join me?\nBob: I\'m sorry, I\'m not interested in classical music. My favourite is hip-hop, but I also enjoy pop and jazz.\nMelih: Well, my cousin, Buse, is playing the violin in the concert.\nBob: Oh! That\'s nice. When is the concert?\nMelih: At 8:45 on Sunday.\nBob: Okay! I\'m coming.',
        stem: 'Which of the following questions DOES NOT have an answer?',
        opts: [
          'Are the boys talking about their favourite movies?',
          'What time does the concert start?',
          'Does Buse play the violin?',
          'What kind of music does Bob like?'
        ],
        answer: 0,
        why: 'B: "At 8:45 on Sunday" ✓  C: "my cousin, Buse, is playing the violin" ✓  D: "My favourite is hip-hop" ✓. A için metinde doğrudan bir cevap yok — konu konser, film değil.'
      },
      {
        stimulusTitle: '7',
        stimulus: 'I. I think it\'s so relaxing.\nII. My favourite is classical music.\nIII. What kind of music do you prefer listening, Jane?\nIV. Why do you like it?',
        stem: 'What\'s the CORRECT order of the sentences to make a meaningful dialogue?',
        opts: ['IV - II - III - I', 'IV - I - III - II', 'III - I - IV - II', 'III - II - IV - I'],
        answer: 3,
        why: 'III soru → II cevap → IV takip sorusu → I gerekçe. Soru-cevap-soru-cevap akışı.'
      }
    ],
    points: 7
  };

  /* ---------------------------------------------------------- */
  /* SELF ASSESSMENT — page 40                                   */
  /* ---------------------------------------------------------- */

  const ex_self_assessment = {
    id: 'self-assessment',
    kind: 'selfcheck',
    tag: 'Self Assessment',
    page: 40,
    instruction: 'Tick what you can do honestly. This maps to the official curriculum outcomes for Unit 2.',
    instructionTr: 'Gerçekten yapabildiklerini dürüstçe işaretle. Bu, Unit 2\'nin resmi kazanımlarına karşılık gelir.',
    items: [
      { code: 'E8.2.SP1', text: 'I can express likes and dislikes.', tr: 'Sevgi ve nefretimi ifade edebilirim.' },
      { code: 'E8.2.SP1', text: 'I can express preferences.', tr: 'Tercihlerimi ifade edebilirim.' },
      { code: 'E8.2.SI1', text: 'I can state personal opinions (make simple inquiries).', tr: 'Kişisel görüşlerimi belirtebilirim ve basit sorular sorabilirim.' },
      { code: 'E8.2.L1', text: 'I can understand phrases about teenagers\' regular activities.', tr: 'Gençlerin günlük aktiviteleriyle ilgili ifadeleri anlayabilirim.' },
      { code: 'E8.2.R1', text: 'I can understand short texts about teenagers\' regular activities.', tr: 'Gençlerin günlük aktiviteleriyle ilgili kısa metinleri anlayabilirim.' },
      { code: 'E8.2.W1', text: 'I can write a short paragraph about teenagers\' regular activities.', tr: 'Gençlerin günlük aktiviteleri hakkında kısa bir paragraf yazabilirim.' }
    ],
    points: 0
  };

  /* ---------------------------------------------------------- */
  /* VOCAB DEEP DIVE — extra practice (not in the textbook)      */
  /* ---------------------------------------------------------- */

  const ex_vocab_deeper = {
    id: 'vocab-deeper',
    kind: 'flip',
    tag: 'Vocabulary',
    instruction: 'Tap each card to see the deeper meaning, collocations and example sentences.',
    instructionTr: 'Her karta dokun, kelimenin daha derin anlamını, kalıplarını ve örnek cümlelerini gör.',
    cards: [
      { big: '🎬', cap: 'terrific', hint: 'positive adjective', back: '= extremely good / amazing. "The film was terrific."' },
      { big: '😌', cap: 'relaxing', hint: 'positive adjective', back: '= making you feel calm. "Classical music is relaxing."' },
      { big: '😫', cap: 'unbearable', hint: 'negative adjective', back: '= so bad you cannot stand it. "The noise is unbearable."' },
      { big: '🔊', cap: 'loud', hint: 'adjective', back: '= making a lot of noise. "Loud music hurts my ears."' },
      { big: '😍', cap: 'impressive', hint: 'positive adjective', back: '= making you feel admiration. "Her painting is impressive."' },
      { big: '🤩', cap: 'amazing', hint: 'positive adjective', back: '= very surprising and excellent. "The concert was amazing."' },
      { big: '😅', cap: 'embarrassed', hint: '-ed adjective (feeling)', back: '= feeling shy or awkward. "I was embarrassed when I forgot her name."' },
      { big: '🤯', cap: 'exhausted', hint: '-ed adjective (feeling)', back: '= extremely tired. "After the match, I was exhausted."' },
      { big: '😬', cap: 'frustrated', hint: '-ed adjective (feeling)', back: '= feeling annoyed because you cannot succeed. "I get frustrated with slow computers."' },
      { big: '🤔', cap: 'confused', hint: '-ed adjective (feeling)', back: '= not understanding something. "I am confused by this grammar rule."' },
      { big: '😌', cap: 'keen on', hint: 'phrase + -ing', back: '= really like something. "I am keen on swimming."' },
      { big: '😊', cap: 'fond of', hint: 'phrase + noun/-ing', back: '= like something gently. "She is fond of reading."' },
      { big: '👍', cap: 'be into', hint: 'informal phrase', back: '= very interested in. "I am into football."' },
      { big: '🚫', cap: "can't stand", hint: 'strong dislike + -ing', back: '= really hate. "I can\'t stand waiting."' }
    ],
    points: 0
  };

  const ex_vocab_collocations = {
    id: 'vocab-collocations',
    kind: 'match',
    tag: 'Vocabulary',
    instruction: 'Match each verb with the correct preposition or particle. Click a verb, then its partner.',
    instructionTr: 'Her fiili doğru edat veya parçacıkla eşleştir. Bir fiile, sonra eşine tıkla.',
    pairs: [
      { a: 'be keen', b: 'on' },
      { a: 'be fond', b: 'of' },
      { a: 'be interested', b: 'in' },
      { a: 'prefer (doing)', b: 'to (doing)' },
      { a: 'would rather', b: '(do)' },
      { a: 'can\'t stand', b: '(doing)' },
      { a: 'don\'t mind', b: '(doing)' },
      { a: 'waste time', b: '(doing)' }
    ],
    hint: 'keen ON · fond OF · interested IN — ezberle. prefer X TO Y (than değil!).',
    points: 8
  };

  /* ---------------------------------------------------------- */
  /* GRAMMAR DEEP — prefer / would rather / like family         */
  /* ---------------------------------------------------------- */

  const ex_grammar_deep_table = {
    id: 'grammar-deep-table',
    kind: 'selfcheck',
    tag: 'Grammar Lab',
    instruction: 'Study the deeper comparison. LGS tests the difference between prefer and would rather.',
    instructionTr: 'Daha derin karşılaştırmayı incele. LGS, prefer ile would rather arasındaki farkı test eder.',
    columns: [
      {
        title: 'prefer + -ing / noun + TO + -ing / noun',
        color: 'brand',
        rows: [
          'I prefer reading to watching TV.',
          'I prefer team sports to individual sports.',
          'I would prefer to stay at home. (= would prefer + to-inf)',
          'What do you prefer doing at the weekend?'
        ]
      },
      {
        title: 'would rather + bare verb (+ than)',
        color: 'ok',
        rows: [
          'I would rather stay at home. (to\'suz!)',
          'I would rather read than watch TV.',
          'She would rather walk than take the bus.',
          'Would you rather come with me?'
        ]
      },
      {
        title: 'like family (love/enjoy/keen/fond)',
        color: 'warn',
        rows: [
          'I love / like / enjoy + -ing.',
          "I'm keen on + -ing.",
          "I'm fond of + noun / -ing.",
          "I'm interested in + noun / -ing."
        ]
      }
    ],
    points: 0
  };

  const ex_grammar_deep_drill = {
    id: 'grammar-deep-drill',
    kind: 'mcq',
    tag: 'Grammar Lab',
    instruction: 'Choose the correct option. These are the trickiest structures in Unit 2.',
    instructionTr: 'Doğru seçeneği işaretle. Bunlar Unit 2\'nin en tuzaklı yapıları.',
    items: [
      {
        stem: 'I prefer staying at home ______ going out in winter.',
        opts: ['than', 'to', 'over', 'from'], answer: 1,
        why: 'prefer + -ing + TO + -ing. "Than" kesinlikle yanlış.'
      },
      {
        stem: 'She would rather ______ TV than read a book.',
        opts: ['to watch', 'watching', 'watch', 'watches'], answer: 2,
        why: 'would rather + ÇIPLAK fiil (to\'suz). "than"dan sonra da çıplak fiil.'
      },
      {
        stem: "I'm keen ______ playing guitar in my free time.",
        opts: ['in', 'on', 'at', 'to'], answer: 1,
        why: 'be keen ON + -ing. "on" prepozisyon → sonraki fiil -ing olur.'
      },
      {
        stem: 'We are interested ______ learning about different cultures.',
        opts: ['on', 'in', 'at', 'for'], answer: 1,
        why: 'be interested IN. keen on / fond of / interested in — üçünü de ezberle.'
      },
      {
        stem: "I can't stand ______ for the bus in the rain.",
        opts: ['to wait', 'wait', 'waiting', 'waited'], answer: 2,
        why: "can't stand + -ing. \"I can't stand to wait\" nadiren duyulur; standart cevap -ing."
      },
      {
        stem: 'Would you ______ stay at home or go to the cinema?',
        opts: ['rather', 'prefer', 'like', 'love'], answer: 0,
        why: 'Would you rather X or Y? — çıplak fiil ile. "Would you prefer" olsaydı "to stay" gerekirdi.'
      },
      {
        stem: 'My brother is fond ______ chess, but I prefer tennis.',
        opts: ['on', 'of', 'in', 'to'], answer: 1,
        why: 'be fond OF + isim. "of" unutulursa cümle yanlış olur.'
      },
      {
        stem: 'I would prefer ______ to the party tonight.',
        opts: ['go', 'to go', 'going', 'went'], answer: 1,
        why: 'would prefer + TO-infinitive (would RATHER\'ın aksine "to" ister).'
      },
      {
        stem: 'What do you prefer, ______ or cycling?',
        opts: ['swim', 'to swim', 'swimming', 'swam'], answer: 2,
        why: 'prefer + -ing (veya isim). "What do you prefer doing?" yapısı burada da geçerli.'
      },
      {
        stem: 'I would rather ______ anything about the surprise.',
        opts: ['to say', 'say', 'saying', 'said'], answer: 1,
        why: 'would rather + çıplak fiil. Ayrıca "would rather not + fiil" de olumlu cümlede olumsuz anlam verir.'
      }
    ],
    points: 10
  };

  /* ---------------------------------------------------------- */
  /* READING LAB — 2 original passages + deeper questions       */
  /* ---------------------------------------------------------- */

  const ex_reading_lab1 = {
    id: 'reading-lab1',
    kind: 'mcq',
    tag: 'Reading',
    page: null,
    instruction: 'Read the passage and answer the questions. These are original LGS-style questions.',
    instructionTr: 'Metni oku ve soruları cevapla. Bunlar özgün LGS tarzı sorular.',
    stimulusTitle: 'A Typical Saturday for Mert',
    stimulus: 'Mert is fourteen, and he is a member of the school\'s photography club. Every Saturday he wakes up at 8 a.m., has a quick breakfast and takes his camera to different parts of the city. He likes photographing old buildings and street animals best. Sometimes he shows his photos to his uncle, who is a professional photographer, and his uncle gives him useful advice. Mert never sells his photos because he says photography is a hobby, not a job. Last month, he won the first prize in a national competition with a photo of a cat sleeping on an old car. He says he wants to be a photographer one day, but first he wants to study engineering.',
    items: [
      {
        stem: 'What does Mert do every Saturday?',
        opts: ['He sleeps until noon.', 'He takes his camera and photographs things in the city.', 'He works with his uncle.', 'He goes to school for extra lessons.'],
        answer: 1,
        why: 'Metin: "Every Saturday he wakes up at 8 a.m., has a quick breakfast and takes his camera to different parts of the city." Seçenek B bunun özeti.'
      },
      {
        stem: 'Why does Mert never sell his photos?',
        opts: ['They are not good enough to sell.', 'He needs the money for a new camera.', 'He thinks photography is a hobby, not a job.', 'His uncle does not let him.'],
        answer: 2,
        why: 'Metin: "Mert never sells his photos because he says photography is a hobby, not a job." "because"dan sonraki kısmı oku.'
      },
      {
        stem: 'The word "advice" in the passage most probably means ______.',
        opts: ['helpful suggestions', 'money', 'cameras', 'competitions'],
        answer: 0,
        why: '"his uncle gives him useful advice" — "useful" sıfatı "advice"in olumlu bir şey olduğunu gösterir. Türetilmiş kelimeyi bağlamdan bul.'
      },
      {
        stem: 'Which of the following is TRUE according to the passage?',
        opts: ['Mert won a prize with a photo of a cat.', 'Mert wants to be a photographer immediately.', 'Mert\'s uncle is a hobby photographer.', 'Mert photographs only people.'],
        answer: 0,
        why: '"He won the first prize in a national competition with a photo of a cat sleeping on an old car." Dikkat: "one day" = gelecekte, hemen değil.'
      },
      {
        stem: 'What can we understand from the passage about Mert\'s uncle?',
        opts: ['He is a professional photographer.', 'He is a student.', 'He does not like Mert\'s hobby.', 'He sells photos to Mert.'],
        answer: 0,
        why: 'Metin: "his uncle, who is a professional photographer" — "who" ile verilen bilgi.'
      },
      {
        stem: 'What is the main idea of the passage?',
        opts: ['A cat sleeping on an old car.', 'The school\'s photography club.', 'A teenager\'s passion for photography.', 'Engineering is a difficult job.'],
        answer: 2,
        why: 'Paragrafın tamamı Mert\'in fotoğraf tutkusunu anlatıyor. Diğerleri tek tek detay.'
      }
    ],
    points: 6
  };

  const ex_reading_lab2 = {
    id: 'reading-lab2',
    kind: 'mcq',
    tag: 'Reading',
    page: null,
    instruction: 'Read the dialogue and answer the questions. Watch for the "no answer" trap.',
    instructionTr: 'Diyaloğu oku ve soruları cevapla. "Cevabı yok" tuzağına dikkat.',
    stimulusTitle: 'A Phone Call Between Two Friends',
    stimulus: 'Ece: Hi Kaan, are you free this Friday evening?\nKaan: I am not sure. Why?\nEce: There is a folk music concert in the city square. It starts at 8:30 p.m.\nKaan: I am not really into folk music, to be honest.\nEce: But the "Green Hills" band is playing, and they are amazing. They make folk music with a modern style.\nKaan: Oh, that sounds interesting. How much are the tickets?\nEce: They are 50 TL for students and 80 TL for adults.\nKaan: OK. Let me ask my mother. When does the concert finish?\nEce: At 11:00 p.m.\nKaan: Great. I will call you back tonight.',
    items: [
      {
        stem: 'What time does the concert start?',
        opts: ['8:30 p.m.', '11:00 p.m.', '8:00 a.m.', 'The text does not say.'],
        answer: 0,
        why: '"It starts at 8:30 p.m." — saati bul.'
      },
      {
        stem: 'How much is a student ticket?',
        opts: ['80 TL', '50 TL', '30 TL', 'The text does not say.'],
        answer: 1,
        why: '"They are 50 TL for students and 80 TL for adults." Öğrenci = 50 TL.'
      },
      {
        stem: 'What can we understand about Kaan?',
        opts: ['He loves folk music.', 'He is not interested in folk music at first.', 'He will not go to the concert.', 'He is an adult.'],
        answer: 1,
        why: '"I am not really into folk music" = pek ilgilenmiyorum. "Not into" = "not interested in".'
      },
      {
        stem: 'Which of the following questions does NOT have an answer in the dialogue?',
        opts: ['What time does the concert start?', 'How much are the tickets?', 'Who is playing at the concert?', 'How is Kaan going to the concert?'],
        answer: 3,
        why: 'A: 8:30 ✓ B: 50/80 TL ✓ C: "Green Hills" band ✓ D: ulaşım hakkında hiçbir şey yazılmamış — bu sorunun cevabı YOK.'
      },
      {
        stem: 'Why does Kaan change his mind about the concert?',
        opts: ['The tickets are cheap.', 'The "Green Hills" band makes folk music in a modern style.', 'Ece is his best friend.', 'He has nothing else to do.'],
        answer: 1,
        why: 'Kaan\'ın fikri, Ece "modern style" dedikten sonra değişiyor: "Oh, that sounds interesting."'
      }
    ],
    points: 5
  };

  /* ---------------------------------------------------------- */
  /* SPEAKING LAB — role-play cards + deeper drill              */
  /* ---------------------------------------------------------- */

  const ex_speak_roleplay = {
    id: 'speak-roleplay',
    kind: 'builder',
    tag: 'Speaking',
    instruction: 'Work in pairs. Student A reads the left bubble, Student B reads the right. Click the words in order to build the missing line.',
    instructionTr: 'İkili çalış. A sol balonu, B sağ balonu okur. Eksik satırı sırayla tıklayarak kur.',
    groups: [
      {
        topic: 'A: invite B to a concert',
        positive: true,
        parts: ['There\'s', 'a', 'rock', 'concert', 'on', 'Friday.', 'Would', 'you', 'like', 'to', 'come?'],
        bank: ['There\'s', 'a', 'rock', 'concert', 'on', 'Friday.', 'Would', 'you', 'like', 'to', 'come?', 'Are']
      },
      {
        topic: 'B: accept the invitation',
        positive: true,
        parts: ['I\'d', 'love', 'to.', 'What', 'time', 'does', 'it', 'start?'],
        bank: ['I\'d', 'love', 'to.', 'What', 'time', 'does', 'it', 'start?', 'No']
      },
      {
        topic: 'A: ask about music taste',
        positive: true,
        parts: ['What', 'kind', 'of', 'music', 'do', 'you', 'prefer', 'listening', 'to?'],
        bank: ['What', 'kind', 'of', 'music', 'do', 'you', 'prefer', 'listening', 'to?', 'Do']
      },
      {
        topic: 'B: express preference + reason',
        positive: true,
        parts: ['I', 'prefer', 'listening', 'to', 'rock', 'to', 'pop', 'because', 'it\'s', 'more', 'exciting.'],
        bank: ['I', 'prefer', 'listening', 'to', 'rock', 'to', 'pop', 'because', 'it\'s', 'more', 'exciting.', 'than']
      }
    ],
    tip: 'Diyalog kurarken: soru → cevap → takip sorusu → detay. "Would you like to...?" davet, "I\'d love to" kabul.',
    tipTr: 'Diyalog akışı: soru → cevap → takip sorusu → detay. "Would you like to...?" bir davettir; "I\'d love to" onu kabul eder.',
    points: 4
  };

  const ex_speak_deep = {
    id: 'speak-deep',
    kind: 'speak',
    tag: 'Speaking',
    instruction: 'Build and say sentences about your preferences. Use the slider for frequency and the buttons for sentence patterns.',
    instructionTr: 'Tercihlerin hakkında cümleler kur ve söyle. Sıklık için kaydırıcıyı, cümle kalıpları için düğmeleri kullan.',
    activities: [
      { q: 'play video games', a: 'play video games', g: 'playing video games' },
      { q: 'read books', a: 'read books', g: 'reading books' },
      { q: 'go to the cinema', a: 'go to the cinema', g: 'going to the cinema' },
      { q: 'listen to music', a: 'listen to music', g: 'listening to music' },
      { q: 'do sport', a: 'do sport', g: 'doing sport' },
      { q: 'go shopping', a: 'go shopping', g: 'going shopping' },
      { q: 'hang out with friends', a: 'hang out with friends', g: 'hanging out with friends' },
      { q: 'use social media', a: 'use social media', g: 'using social media' }
    ],
    adverbs: [
      { word: 'never', pct: 0, tr: 'asla — %0' },
      { word: 'rarely', pct: 10, tr: 'nadiren — çok az' },
      { word: 'sometimes', pct: 40, tr: 'bazen' },
      { word: 'usually', pct: 80, tr: 'genellikle' },
      { word: 'always', pct: 100, tr: 'her zaman' }
    ],
    patterns: [
      'I {{adv}} {{activity}} because {{reason}}.',
      'I prefer {{gerund}} to {{other}}.',
      'I would rather {{activity}} than {{otherBare}}.',
      "I'm keen on {{gerund}}.",
      'I can\'t stand {{gerund}}.'
    ],
    reasons: [
      'it\'s relaxing', 'it\'s exciting', 'it\'s educational',
      'it\'s fun', 'I enjoy it', 'it helps me relax'
    ],
    others: [
      'staying at home', 'watching TV', 'playing outside',
      'reading a book', 'going to bed early'
    ],
    // Bare (base) forms, used by the "would rather ... than ..." pattern,
    // which takes the infinitive rather than the -ing form.
    othersBare: [
      'stay at home', 'watch TV', 'play outside',
      'read a book', 'go to bed early'
    ],
    tip: 'Kalıpları sesli tekrar et. Her birini en az 3 farklı aktivite ile dene.',
    tipTr: 'Kalıpları sesli tekrar et. Her birini en az 3 farklı aktivite ile dene.',
    points: 0
  };

  /* ---------------------------------------------------------- */
  /* VOCABULARY BUILDING — word families (LGS favourite)         */
  /* ---------------------------------------------------------- */

  const ex_wordfamilies = {
    id: 'wordfamilies',
    kind: 'gapfill',
    tag: 'Vocabulary',
    mode: 'bank',
    instruction: 'Fill in the correct form of the word in brackets. This is a classic LGS question type.',
    instructionTr: 'Parantezdeki kelimenin doğru formunu doldur. Bu klasik bir LGS soru tipi.',
    lines: [
      '1. Photography is one of my favourite {{1}} (hobby).',
      '2. My sister is a {{2}} (photograph) — she takes pictures for a magazine.',
      '3. The cat was so {{3}} (sleep) that it did not move.',
      '4. Mert\'s uncle gave him some good {{4}} (advise).',
      '5. The competition was very {{5}} (compete) — everyone wanted to win.',
      '6. I am {{6}} (interest) in learning about different cultures.',
      '7. She finds grammar {{7}} (bore), but I think it is useful.',
      '8. The band\'s new song is really {{8}} (impress).'
    ],
    bank: ['hobbies', 'photographer', 'sleepy', 'advice', 'competitive', 'interested', 'boring', 'impressive'],
    answers: {
      1: ['hobbies'],
      2: ['photographer'],
      3: ['sleepy'],
      4: ['advice'],
      5: ['competitive'],
      6: ['interested'],
      7: ['boring'],
      8: ['impressive']
    },
    why: {
      1: '"one of my favourite" + ÇOĞUL isim → hobbies.',
      2: 'Meslek adları -er/-or ile: photograph → photographer.',
      3: 'Hayvan/nesne için -ing değil, -y sıfatı: sleepy (uykulu).',
      4: '"advice" SAYILABİLİR DEĞİL: "some advice", "a piece of advice". "advise" ise fiildir.',
      5: 'turnuva yarışmalı → competitive.',
      6: 'be INTERESTED in (kişi -ed) / be INTERESTING in (nesne -ing). Kişi hissediyor → interested.',
      7: 'Konu "grammar" (nesne) → boring (sıkıcı). "bored" olsaydı kişinin hissi olurdu.',
      8: 'şarkı etkileyici → impressive (nesne için -ive sıfatı).'
    },
    points: 8
  };

  /* ---------------------------------------------------------- */
  /* SECTION DEFINITIONS                                         */
  /* ---------------------------------------------------------- */

  const sections = [
    {
      id: 'get-ready', icon: '🚦', nav: 'Get Ready!', group: 'warmup', page: 26,
      title: 'GET READY!', subtitle: 'Teen Life · Unit 2',
      intro: 'Warm up with the core verbs and adjectives of this unit before you start.',
      introTr: 'Bu ünitenin temel fiilleri ve sıfatlarıyla ısın.',
      blocks: [
        { t: 'ex', ex: ex_ready_match },
        { t: 'ex', ex: ex_ready_tiles },
        { t: 'ex', ex: ex_ready_builder }
      ]
    },
    {
      id: 'listening-1', icon: '🎧', nav: 'Listening 1', group: 'skills', page: 27,
      title: 'LISTENING', subtitle: 'Tracks 8 & 9',
      intro: 'Two dialogues about what Brooke and Archie like and dislike.',
      introTr: 'Brooke\'un ve Archie\'un sevdikleri/sevmedikleri üzerine iki diyalog.',
      blocks: [
        { t: 'ex', ex: ex_listen_ld },
        { t: 'ex', ex: ex_listen_gap }
      ]
    },
    {
      id: 'speaking-1', icon: '🗣️', nav: 'Speaking', group: 'skills', page: 27,
      title: 'SPEAKING', subtitle: 'Frequency adverbs',
      intro: 'Talk about the activities you do regularly.',
      introTr: 'Regular olarak yaptığın aktivitelerden bahset.',
      blocks: [
        { t: 'ex', ex: ex_speak_freq }
      ]
    },
    {
      id: 'reading-1', icon: '📖', nav: 'Reading 1', group: 'skills', page: 28,
      title: 'READING', subtitle: 'Lily & Sam',
      intro: 'Compare what two teenagers do in their free time.',
      introTr: 'İki gencin serbest zamanında ne yaptığını karşılaştır.',
      blocks: [
        { t: 'ex', ex: ex_lily_sam }
      ]
    },
    {
      id: 'reading-2', icon: '📝', nav: 'Reading 2 · Blog', group: 'skills', page: 29,
      title: 'READING', subtitle: "Helen's Blog",
      intro: 'Read a blog post about activities teenagers like doing these days.',
      introTr: 'Bugünlerin gençlerinin sevdiği aktiviteler üzerine bir blog yazısı oku.',
      blocks: [
        { t: 'ex', ex: ex_helen_read },
        { t: 'ex', ex: ex_helen_gap },
        { t: 'ex', ex: ex_helen_write }
      ]
    },
    {
      id: 'listening-2', icon: '🎙️', nav: 'Listening 2', group: 'skills', page: 30,
      title: 'LISTENING', subtitle: 'Tracks 10 & 11',
      intro: 'Tarık, Doris and an opinion monologue.',
      introTr: 'Tarık, Doris ve bir görüş monoloğu.',
      blocks: [
        { t: 'ex', ex: ex_listen_mcq },
        { t: 'ex', ex: ex_listen_gap2 },
        { t: 'ex', ex: ex_speak_prefs }
      ]
    },
    {
      id: 'memory', icon: '🧠', nav: 'Memory Test', group: 'skills', page: 31,
      title: 'READING & SPEAKING', subtitle: 'Memory Test!',
      intro: 'A 2-minute reading challenge. Read fast, cover, then answer.',
      introTr: '2 dakikalık okuma meydan okuması. Hızlı oku, kapat, sonra cevapla.',
      blocks: [
        { t: 'ex', ex: ex_memory },
        { t: 'ex', ex: ex_memory_pairs }
      ]
    },
    {
      id: 'grammar', icon: '⚙️', nav: 'Grammar Lab', group: 'core', page: 32,
      title: 'GRAMMAR LAB', subtitle: 'Preferences · Likes/Dislikes · Opinions',
      intro: 'The three structures this unit is built on — and the ones LGS tests most.',
      introTr: 'Bu ünitenin üzerine kurulduğu üç yapı — ve LGS\'nin en çok test ettiği yapılar.',
      blocks: [
        { t: 'ex', ex: ex_grammar_table },
        { t: 'ex', ex: ex_grammar_drill }
      ]
    },
    {
      id: 'vocab', icon: '🗂️', nav: 'Genres & Music', group: 'core', page: 33,
      title: 'VOCABULARY', subtitle: 'Book genres & music types',
      intro: 'Twelve words you need to talk about your taste.',
      introTr: 'Zevkinden bahsetmek için gereken on iki kelime.',
      blocks: [
        { t: 'ex', ex: ex_vocab_flip },
        { t: 'ex', ex: ex_martha }
      ]
    },
    {
      id: 'writing', icon: '✍️', nav: 'Writing', group: 'core', page: 34,
      title: 'WRITING', subtitle: 'Paragraph & assignment',
      intro: 'Write about teenagers\' activities — and about your favourite band.',
      introTr: 'Gençlerin aktiviteleri hakkında — ve en sevdiğin grup hakkında yaz.',
      blocks: [
        { t: 'ex', ex: ex_write_model },
        { t: 'ex', ex: ex_write_band }
      ]
    },
    {
      id: 'practice', icon: '🎯', nav: 'Practice', group: 'core', page: 35,
      title: 'EXTRA PRACTICE', subtitle: 'Pages 35–38',
      intro: 'The rest of the unit: hobbies, preferences, dialogue writing and a paragraph.',
      introTr: 'Ünitenin geri kalanı: hobiler, tercihler, diyalog yazımı ve bir paragraf.',
      blocks: [
        { t: 'ex', ex: ex_hobbies },
        { t: 'ex', ex: ex_triples },
        { t: 'ex', ex: ex_pref_pairs },
        { t: 'ex', ex: ex_dialogue_write },
        { t: 'ex', ex: ex_track12 },
        { t: 'ex', ex: ex_diagram },
        { t: 'ex', ex: ex_para_write },
        { t: 'ex', ex: ex_open_q }
      ]
    },
    {
      id: 'unit-test', icon: '📋', nav: 'Unit Test', group: 'assessment', page: 39,
      title: 'UNIT TEST', subtitle: 'End of Unit 2',
      intro: 'The seven test questions from the book, with instant feedback and a Turkish explanation for each.',
      introTr: 'Kitaptaki yedi test sorusu; anında geri bildirim ve her biri için Türkçe açıklama.',
      blocks: [
        { t: 'ex', ex: ex_unit_test }
      ]
    },
    {
      id: 'self-assessment', icon: '✅', nav: 'Self Assessment', group: 'assessment', page: 40,
      title: 'SELF ASSESSMENT', subtitle: 'What can you do now?',
      intro: 'Be honest — this is the unit outcome checklist.',
      introTr: 'Dürüst ol — bu ünitenin kazanım listesi.',
      blocks: [
        { t: 'ex', ex: ex_self_assessment }
      ]
    },
    {
      id: 'grammar-deep', icon: '🌊', nav: 'Derin Grammar', group: 'deep', page: null,
      title: 'GRAMMAR DEEP', subtitle: 'prefer · would rather · keen on',
      intro: 'The same structures, but deeper. These are the exact traps LGS sets in this unit.',
      introTr: 'Aynı yapılar ama daha derin. LGS bu ünitede tam olarak bu tuzakları kuruyor.',
      blocks: [
        { t: 'ex', ex: ex_grammar_deep_table },
        { t: 'ex', ex: ex_grammar_deep_drill }
      ]
    },
    {
      id: 'vocab-deep', icon: '🌊', nav: 'Derin Kelime', group: 'deep', page: null,
      title: 'VOCABULARY DEEP', subtitle: 'Collocations · word families · feelings',
      intro: 'Go beyond the 12 flip cards of the book: collocations, word families and -ed/-ing feelings.',
      introTr: 'Kitabın 12 kartının ötesine geç: kalıplar, kelime aileleri ve -ed/-ing duygular.',
      blocks: [
        { t: 'ex', ex: ex_vocab_deeper },
        { t: 'ex', ex: ex_vocab_collocations },
        { t: 'ex', ex: ex_wordfamilies }
      ]
    },
    {
      id: 'reading-lab', icon: '🌊', nav: 'Okuma Laboratuvarı', group: 'deep', page: null,
      title: 'READING LAB', subtitle: 'Two original LGS-style passages',
      intro: 'Two new passages with deeper questions: main idea, inference, reference, and the "no answer" trap.',
      introTr: 'Daha derin sorularla iki yeni metin: ana fikir, çıkarım, zamir ve "cevabı yok" tuzağı.',
      blocks: [
        { t: 'ex', ex: ex_reading_lab1 },
        { t: 'ex', ex: ex_reading_lab2 }
      ]
    },
    {
      id: 'speaking-lab', icon: '🌊', nav: 'Konuşma Laboratuvarı', group: 'deep', page: null,
      title: 'SPEAKING LAB', subtitle: 'Role-play · preferences · frequency',
      intro: 'Practice real dialogues and sentence patterns out loud. Use the audio buttons and speak along.',
      introTr: 'Gerçek diyalogları ve cümle kalıplarını sesli çalış. Ses düğmelerini kullan ve tekrar et.',
      blocks: [
        { t: 'ex', ex: ex_speak_roleplay },
        { t: 'ex', ex: ex_speak_deep }
      ]
    },
    {
      id: 'lgs', icon: '🎯', nav: 'LGS Exam Centre', group: 'lgs', page: null, lgs: true,
      title: 'LGS SINAV MERKEZİ',
      subtitle: 'Exam strategy · Question types · Timed mocks · Real MEB scoring',
      intro: 'This section does not exist in the book. It is built on the real LGS English section: 10 questions, the net rule doğru − yanlış/3, and the İngilizce katsayısı of 1.',
      introTr: 'Bu bölüm kitapta yok. Gerçek LGS İngilizce bölümü üzerine kuruludur: 10 soru, doğru − yanlış/3 net kuralı ve İngilizce katsayısı 1.',
      special: 'lgs',
      blocks: []
    }
  ];

  return {
    unit: { title: 'Teen Life', number: 2, klass: 8, publisher: 'Bilim ve Kültür Yayınları' },
    sections: sections
  };
})();
