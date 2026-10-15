/* ============================================================
   LGS SINAV MERKEZİ — question bank
   Original, LGS-format items written for this workbook on Unit 2
   "Teen Life" topics. Structure mirrors the real MEB English
   section: 4-option multiple choice, 10 questions per paper.

   Types map to the recurring LGS formats:
     table     Tablo / grafik okuma
     dialogue  Diyalog tamamlama (cevap seçimi)
     noanswer  "Cevabı olmayan soruyu bul"
     order     Cümle sıralama
     mainidea  Ana fikir / en uygun başlık
     infer     Metinden çıkarım & doğru-yanlış

   Scoring uses the real MEB rule:  net = doğru - yanlış/3
   ============================================================ */

window.LGS = (function () {

  /* ---------------- Question types ---------------- */
  const types = [
    {
      id: 'table',
      name: 'Tablo & Grafik Okuma',
      ico: '📊',
      desc: 'Bir tabloyu ya da çizelgeyi okuyup karşılaştırma yapmak.',
      strategy: {
        en: ['Read the question BEFORE the table — you know what to look for.', 'Compare numbers; never assume.', 'Check every constraint: day, time, price.'],
        tr: [
          'Tabloyu okumadan ÖNCE soruyu oku; ne aradığını bilirsin.',
          'Sayıları karşılaştır, tahmin etme.',
          'Bütün sınırları kontrol et: gün, saat, fiyat.'
        ]
      }
    },
    {
      id: 'dialogue',
      name: 'Diyalog Tamamlama',
      ico: '💬',
      desc: 'Verilen cevaptan doğru soruyu ya da repliği bulmak.',
      strategy: {
        en: ['Look at the ANSWER first — it tells you the shape of the missing line.', 'Yes/No answer → a Do/Does/Can/Are question.', '"No, thanks" → an invitation; "Because..." → a Why question.'],
        tr: [
          'Önce CEVABA bak — eksik satırın şeklini o söyler.',
          'Evet/Hayır cevabı → Do/Does/Can/Are ile başlayan soru.',
          '"No, thanks" → bir davet; "Because..." → Why sorusu.'
        ]
      }
    },
    {
      id: 'noanswer',
      name: 'Cevabı Olmayan Soru',
      ico: '🔍',
      desc: 'Metinde cevabı verilmemiş soruyu yakalamak.',
      strategy: {
        en: ['Cross out the options whose answer IS in the text.', 'The wrong option is usually PLAUSIBLE — that is the trap.', 'Beware of "which is correct": the last option is often right.'],
        tr: [
          'Cevabı metinde geçen seçenekleri tek tek ele.',
          'Yanlış seçenek genelde makul görünür — asıl tuzak bu.',
          '"Hangisi doğrudur" sorularında son seçenek sıkça doğrudur.'
        ]
      }
    },
    {
      id: 'order',
      name: 'Cümle Sıralama',
      ico: '🧩',
      desc: 'Dağınık cümleleri anlamlı bir diyaloga dönüştürmek.',
      strategy: {
        en: ['Find the QUESTION first — it is usually the opening.', 'Match pronouns to their references (she → she).', 'A Why-question must be followed by a Because-answer.'],
        tr: [
          'Önce SORUYU bul — genelde diyalog onunla başlar.',
          'Zamirleri referanslarına eşle (she → she).',
          'Why sorusunun hemen ardından Because cevabı gelir.'
        ]
      }
    },
    {
      id: 'mainidea',
      name: 'Ana Fikir & Başlık',
      ico: '🎯',
      desc: 'Paragrafın ana fikrini ya da en uygun başlığını seçmek.',
      strategy: {
        en: ['Look at the first and last sentences — the main idea lives there.', 'A good title is general; a trap title is too specific.', 'If two options are similar, the broader one usually wins.'],
        tr: [
          'İlk ve son cümleye bak — ana fikir oradadır.',
          'Doğru başlık geneldir; tuzak başlık fazla spesifiktir.',
          'İki seçenek birbirine yakınsa, genel olan kazanır.'
        ]
      }
    },
    {
      id: 'infer',
      name: 'Çıkarım & Doğru-Yanlış',
      ico: '💭',
      desc: 'Metinde yazmayan ama çıkarılabilen bilgiyi bulmak.',
      strategy: {
        en: ['An inference must be provable from the text, not just likely.', 'Underline NOT, NEVER, ONLY, ALL — they flip the meaning.', 'Do not pick an option just because it repeats a word from the text.'],
        tr: [
          'Çıkarım metinle KANITLANABİLİR olmalı; sadece "olabilir" yetmez.',
          'NOT, NEVER, ONLY, ALL altını çiz — anlamı tersine çevirirler.',
          'Sadece metinden kelime tekrarlı diye o seçeneği seçme.'
        ]
      }
    }
  ];

  /* ---------------- Item bank ---------------- */
  const bank = [

    /* ================= TABLE ================= */
    {
      id: 't1', type: 'table', diff: 'medium',
      stimulusTitle: 'A survey in 8-B about hobbies',
      stimulus: `<table class="grid-table">
        <tr><th>Hobby</th><th>Boys</th><th>Girls</th></tr>
        <tr><td class="rowhead">Reading books</td><td>12</td><td>20</td></tr>
        <tr><td class="rowhead">Playing football</td><td>30</td><td>5</td></tr>
        <tr><td class="rowhead">Listening to music</td><td>25</td><td>28</td></tr>
        <tr><td class="rowhead">Going to the cinema</td><td>18</td><td>22</td></tr>
      </table>`,
      stem: 'Which of the following is TRUE according to the table?',
      opts: [
        'More boys than girls like reading books.',
        'Listening to music is the most popular activity among boys.',
        'Going to the cinema is more popular among girls than boys.',
        'Only girls like reading books.'
      ],
      answer: 2,
      why: "Kızlar 22 > Erkekler 18 → C doğru. A: 12 < 20, yani kızlar daha çok. B: erkeklerde en yüksek 30 (football), müzik 25 değil. D: 'only' keskinleştirici, tablo bunu desteklemiyor."
    },
    {
      id: 't2', type: 'table', diff: 'easy',
      stimulusTitle: "Ali's weekly plan",
      stimulus: `<table class="grid-table">
        <tr><th>Day</th><th>Activity</th><th>Time</th></tr>
        <tr><td class="rowhead">Monday</td><td>Basketball training</td><td>16:00 – 17:30</td></tr>
        <tr><td class="rowhead">Wednesday</td><td>English course</td><td>15:00 – 16:30</td></tr>
        <tr><td class="rowhead">Friday</td><td>Basketball training</td><td>16:00 – 17:30</td></tr>
        <tr><td class="rowhead">Saturday</td><td>Nothing</td><td>—</td></tr>
      </table>`,
      stem: 'How many times a week does Ali play basketball?',
      opts: ['Once', 'Twice', 'Three times', 'Four times'],
      answer: 1,
      why: "Basketbol antrenmanı iki kez geçiyor: Pazartesi ve Cuma → Twice."
    },
    {
      id: 't3', type: 'table', diff: 'hard',
      stimulusTitle: 'Ticket prices — Teen Museum',
      stimulus: `<table class="grid-table">
        <tr><th>Ticket</th><th>Price</th></tr>
        <tr><td class="rowhead">Student</td><td>40 TL</td></tr>
        <tr><td class="rowhead">Adult</td><td>70 TL</td></tr>
        <tr><td class="rowhead">Family ticket (2 adults + 1 child)</td><td>150 TL</td></tr>
      </table>`,
      stem: 'A family of two adults and one child is going to the museum. What is the cheapest way to enter?',
      opts: [
        'Two adult tickets and one student ticket — 180 TL',
        'One family ticket — 150 TL',
        'Two adult tickets — 140 TL',
        'One family ticket and one student ticket — 190 TL'
      ],
      answer: 1,
      why: '70×2 + 40 = 180 TL. Aile bileti 150 TL → en ucuz. Dikkat: çocuk öğrenci bileti alsa bile 180 TL öder.'
    },
    {
      id: 't4', type: 'table', diff: 'medium',
      stimulusTitle: "Members of the school's music club",
      stimulus: `<table class="grid-table">
        <tr><th>Music type</th><th>Number of members</th></tr>
        <tr><td class="rowhead">Pop</td><td>34</td></tr>
        <tr><td class="rowhead">Rock</td><td>19</td></tr>
        <tr><td class="rowhead">Classical</td><td>8</td></tr>
        <tr><td class="rowhead">Jazz</td><td>6</td></tr>
        <tr><td class="rowhead">Folk</td><td>5</td></tr>
      </table>`,
      stem: 'Which of the following is NOT TRUE according to the table?',
      opts: [
        'Pop is the most popular music type in the club.',
        'More members like rock than jazz.',
        'Classical music is the second most popular.',
        'Most of the members like folk music.'
      ],
      answer: 3,
      why: 'Folk en düşük (5) → "most of the members" kesinlikle yanlış. "NOT TRUE" sorularında en abartılı ifadeyi ara.'
    },

    /* ================= DIALOGUE ================= */
    {
      id: 'd1', type: 'dialogue', diff: 'easy',
      stimulus: 'Zeynep: Do you like playing volleyball?\nMert: ______, but I prefer playing basketball.',
      stem: 'Which answer completes the dialogue?',
      opts: ['No, not at all', 'Yes, of course', "I can't stand it", 'Never'],
      answer: 1,
      why: '"but" ÖNCESİ olumlu bir kabul olmalı. "No / I can\'t stand it" dese "but" anlamsız kalırdı.'
    },
    {
      id: 'd2', type: 'dialogue', diff: 'easy',
      stimulus: 'Ece: What do you think of jazz music?\nDeniz: ______. I think it is too loud.',
      stem: 'Which answer completes the dialogue?',
      opts: ["It's fantastic", "It's unbearable", "I'm fond of it", 'I love it'],
      answer: 1,
      why: 'Son cümle olumsuz ("too loud"). Sadece "unbearable" (dayanılmaz) olumsuzdur; diğerleri olumlu.'
    },
    {
      id: 'd3', type: 'dialogue', diff: 'medium',
      stimulus: 'Burak: Would you like to come to the cinema with us tonight?\nKaan: ______. I have to study for the exam tomorrow.',
      stem: 'Which answer completes the dialogue?',
      opts: ["I'd love to, but ...", 'Yes, I would love to', "That's terrific", 'Me too'],
      answer: 0,
      why: 'Nazik bir RED + bahane: "I\'d love to, but ...". İkinci cümle bir özür/zaman kısıtı, bu yüzden red.'
    },
    {
      id: 'd4', type: 'dialogue', diff: 'easy',
      stimulus: 'Selin: How often do you go to the gym?\nAyşe: ______.',
      stem: 'Which answer completes the dialogue?',
      opts: ["I'm keen on it", 'Three times a week', "Because it is relaxing", 'With my friends'],
      answer: 1,
      why: '"How often" sıklık sorar → cevap bir FREQUENCY olmalı: three times a week.'
    },
    {
      id: 'd5', type: 'dialogue', diff: 'medium',
      stimulus: '— Would you like some more tea?\n— ______, thanks. I am full.',
      stem: 'Which answer completes the dialogue?',
      opts: ['Yes, please', 'No, thanks', 'I would', 'I like it'],
      answer: 1,
      why: '"thanks" ve "I am full" birer ipucu: tokum, istemiyorum → No, thanks.'
    },
    {
      id: 'd6', type: 'dialogue', diff: 'medium',
      stem: 'Which is the MOST suitable opening line?\n\n— ______\n— I usually read a book or play chess with my brother.',
      opts: ['What do you do at the weekends?', 'What is your favourite book?', 'Do you like reading?', 'Why do you like chess?'],
      answer: 0,
      why: 'Cevap bir aktivite listesi. Sadece "What do you do..." bir aktivite listesi bekler.'
    },

    /* ================= NO ANSWER ================= */
    {
      id: 'n1', type: 'noanswer', diff: 'easy',
      stimulusTitle: 'A note on the class board',
      stimulus: 'Hi! This Saturday is my birthday party. It starts at 15:00 at my house. We are going to play games, listen to music and eat pizza. Please join us!\n— Elif',
      stem: 'Which of the following questions does NOT have an answer in the note?',
      opts: [
        'When does the party start?',
        'Where does the party take place?',
        'How is Elif going to travel to the party?',
        'What are they going to do at the party?'
      ],
      answer: 2,
      why: 'A: "at 15:00" ✓  B: "at my house" ✓  D: "play games, listen to music, eat pizza" ✓. Ulaşım hakkında hiçbir şey yazılmamış.'
    },
    {
      id: 'n2', type: 'noanswer', diff: 'medium',
      stimulusTitle: 'Ali and Mert are talking.',
      stimulus: 'Ali: I am really keen on hiking. On Sundays I usually go to Belgrad Forest with my cousins.\nMert: That sounds great. I prefer staying at home, to be honest. I am fond of reading and playing computer games.\nAli: Do you ever come with us?\nMert: No, never. But tell me, what do you do there?\nAli: We walk for about three hours, have a picnic and sometimes go fishing in the river.',
      stem: 'Which of the following questions does NOT have an answer in the dialogue?',
      opts: [
        'What does Ali do in Belgrad Forest?',
        'How often does Mert go hiking?',
        "What is Mert's favourite free-time activity?",
        'Who does Ali go hiking with?'
      ],
      answer: 1,
      why: 'Mert "No, never" diyor ama HAFTADA KAÇ kez sorusu cevaplanmıyor. "How often" sorusuna verilen "never" aslında farklı bir sorunun cevabı — dikkatli oku.'
    },
    {
      id: 'n3', type: 'noanswer', diff: 'hard',
      stimulusTitle: 'An e-mail from Emma',
      stimulus: 'Hi Jack!\nHow are you? I hope you are fine. My cousins are here for the holidays, and we are having a lot of fun. Yesterday we went to the new shopping centre and saw a great film there.\nOn Friday we are going to the rock concert in the city square. It starts at 20:00. My uncle is driving us, so we do not need to take the bus.\nWrite back soon!\nEmma',
      stem: 'Which of the following questions does NOT have an answer in the e-mail?',
      opts: [
        'What are Emma and her cousins going to do on Friday?',
        'Why do they not take the bus on Friday?',
        'How much is the concert ticket?',
        'Where did they see a film yesterday?'
      ],
      answer: 2,
      why: 'Konser bileti FİYATI hiçbir yerde geçmiyor. Dikkat: "rock concert" kelimesi metinde var ama fiyat yok — bu klasik tuzak.'
    },
    {
      id: 'n4', type: 'noanswer', diff: 'medium',
      stimulusTitle: 'A poster',
      stimulus: '🎸 TEEN ROCK NIGHT\nCome and join us on 14 May at the school hall!\nFive student bands are going to play. The show starts at 18:30 and finishes at 21:00.\nTickets: 25 TL for students, 40 TL for adults.\nFree popcorn for everyone!\nDo not miss it!',
      stem: 'Which of the following questions does NOT have an answer on the poster?',
      opts: [
        'How many bands are going to play?',
        'Where is the show going to be?',
        'Who is going to sing in the first band?',
        'How much is a student ticket?'
      ],
      answer: 2,
      why: 'Grup SAYISI var (5), mekan var, bilet fiyatı var. İlk grupta kimin şarkı söyleyeceği yazılmamış.'
    },

    /* ================= ORDER ================= */
    {
      id: 'o1', type: 'order', diff: 'medium',
      stimulus: 'I. Because I think they are educational.\nII. What kind of books do you like reading?\nIII. I love reading biographical books.\nIV. Really? My favourite is historical.',
      stem: "What's the correct order of the sentences to make a meaningful dialogue?",
      opts: ['II - III - I - IV', 'III - II - IV - I', 'II - I - III - IV', 'IV - II - III - I'],
      answer: 0,
      why: 'II soru → III cevap → IV tepki + yeni soru → I gerekçe ("Because"). Soru-cevap-tepki-gerekçe zinciri.'
    },
    {
      id: 'o2', type: 'order', diff: 'easy',
      stem: 'Which is the correct order of the sentences?\n\nI. Because it is easier and cheaper.\nII. Do you like going shopping at the weekends?\nIII. That is interesting. Why do you prefer online shopping?\nIV. No, I hate shopping. I prefer shopping online.',
      opts: ['II - IV - III - I', 'IV - II - III - I', 'II - III - IV - I', 'IV - III - II - I'],
      answer: 0,
      why: 'II soru → IV cevap → III yeni soru → I gerekçe. "Because" mutlaka bir "Why" sorusundan sonra gelir.'
    },
    {
      id: 'o3', type: 'order', diff: 'hard',
      stem: 'Which is the correct order of the sentences?\n\nI. How often do you go there?\nII. I am keen on playing tennis. I go to the sports centre every Tuesday and Thursday.\nIII. Great! I prefer basketball, but tennis is fun too.\nIV. What sport do you usually play in your free time?',
      opts: ['IV - II - I - III', 'I - IV - II - III', 'IV - I - II - III', 'IV - II - III - I'],
      answer: 0,
      why: 'IV soru → II cevap (içinde "every Tuesday and Thursday" var) → I takip sorusu (bu cevap zaten verildi) → III yorum. Dikkat: I, II\'nin İÇİNDEKİ bilgiye gönderme yapıyor.'
    },
    {
      id: 'o4', type: 'order', diff: 'medium',
      stem: 'Which is the correct order of the sentences?\n\nI. Yes, I do. I love classical music because it is relaxing.\nII. Do you listen to music while you are doing your homework?\nIII. Me too. I usually listen to jazz.\nIV. That is interesting. I think jazz is boring.',
      opts: ['II - I - III - IV', 'I - II - III - IV', 'II - III - I - IV', 'III - II - I - IV'],
      answer: 0,
      why: 'II soru → I cevap → III "Me too" ile aynı fikirde → IV "That is interesting" ile karşıt görüş. "Me too" ancak önceki cümle olumsuz değilse kullanılır.'
    },

    /* ================= MAIN IDEA ================= */
    {
      id: 'm1', type: 'mainidea', diff: 'easy',
      stimulus: 'Leo is fourteen, and he is crazy about swimming. He gets up at six o\'clock every morning and goes to the swimming pool before school. After school, he trains for two more hours. He says he wants to be a professional swimmer one day. At the weekends, he usually rests and watches swimming competitions on television.',
      stem: "What's the main idea of the text?",
      opts: [
        'Leo wants to be a professional swimmer.',
        'Swimming pools open early in the morning.',
        'Leo watches television at the weekends.',
        'Professional swimmers train a lot.'
      ],
      answer: 0,
      why: 'Metnin tamamı Leo\'nun hedefini (want to be a professional swimmer) anlatıyor. Diğerleri tek tek detay.'
    },
    {
      id: 'm2', type: 'mainidea', diff: 'medium',
      stimulusTitle: 'The best title for the text',
      stimulus: 'My name is Ela. I am in 8-B. On weekdays I get up early, have breakfast with my family and go to school by bus. After school, I usually do my homework and then play the guitar. At the weekends, I visit my grandparents in the village. I love spending time with them because they tell me interesting stories.',
      stem: 'Which is the BEST title for the text?',
      opts: ['My Family in the Village', 'A Typical Week in My Life', 'How to Play the Guitar', 'My Favourite Grandparents'],
      answer: 1,
      why: 'Metin hafta içi + hafta sonu rutinlerini kapsıyor → en kapsayıcı başlık "A Typical Week in My Life".'
    },
    {
      id: 'm3', type: 'mainidea', diff: 'medium',
      stimulus: 'Three years ago, five friends from the same school formed a band called "Blue Sky". They make folk music, and their songs are about nature and friendship. At first they played only at school events, but today they give concerts in six different cities. They say they are fond of reaching people with the music they make.',
      stem: "What's the main idea of the text?",
      opts: [
        'Blue Sky is a folk band that became popular.',
        'School events are the best places to play music.',
        'Nature and friendship are important topics.',
        'Five friends formed a band three years ago.'
      ],
      answer: 0,
      why: 'En kapsayıcı seçenek: hem kuruluş hem müzik türü hem de popülerlik. D tek başına sadece başlangıcı anlatıyor.'
    },
    {
      id: 'm4', type: 'mainidea', diff: 'hard',
      stem: 'Which sentence can be the MAIN IDEA of a paragraph?\n\nI. I think it is more useful than video games.\nII. Reading helps you learn new words and think better.\nIII. I usually read before I go to sleep.\nIV. My mother buys me a new book every month.',
      opts: ['I', 'II', 'III', 'IV'],
      answer: 1,
      why: 'Ana fikir cümlesi GENEL bir yargı bildirir. II "Reading helps you learn..." gibi genel ve desteklenebilir bir cümle; diğerleri kişisel alışkanlık.'
    },

    /* ================= INFER ================= */
    {
      id: 'i1', type: 'infer', diff: 'medium',
      stimulus: 'Deniz never goes to the cinema. He says films are always too long and boring for him. Instead, he prefers watching short documentaries on his computer. His friends often invite him, but he always says no.',
      stem: 'What can we understand from the text?',
      opts: [
        'Deniz likes spending time with his friends at the cinema.',
        'Deniz prefers short documentaries to films.',
        'Deniz has no friends who invite him.',
        'Deniz watches films on his computer.'
      ],
      answer: 1,
      why: '"Instead, he prefers watching short documentaries" doğrudan kanıt. D tuzak: documentary FİLM değil, belgesel.'
    },
    {
      id: 'i2', type: 'infer', diff: 'hard',
      stimulus: 'Maria says she hates buying trendy clothes. She thinks they are expensive and they do not last long. That is why she always asks her mother to buy clothes for her, and she never shops alone.',
      stem: 'Why does Maria never shop alone?',
      opts: [
        'Because she is not old enough to go shopping alone.',
        'Because she thinks trendy clothes are not worth the money.',
        'Because she does not like her mother.',
        'Because she prefers shopping online.'
      ],
      answer: 1,
      why: 'Metindeki gerekçe: "they are expensive and they do not last long" → parasına değmiyor. A ve D metinde YOK; sık yapılan çıkarım hatası.'
    },
    {
      id: 'i3', type: 'infer', diff: 'easy',
      stimulus: 'Every Saturday, Kerem helps his father in their small shop. He carries the boxes, arranges the shelves and talks to the customers. He says he learns something new every week.',
      stem: 'What can we understand about Kerem?',
      opts: [
        'Kerem works in the shop instead of going to school.',
        'Kerem enjoys helping his father.',
        'Kerem wants to open his own shop one day.',
        'Kerem does not like the customers.'
      ],
      answer: 1,
      why: '"He says he learns something new every week" → olumlu bir tutum. A tuzak: sadece Cumartesi yardım ediyor, okula gidiyor.'
    },
    {
      id: 'i4', type: 'infer', diff: 'medium',
      stem: 'Which sentence is TRUE according to the text below?\n\n"I never watch reality shows," says Sofia. "I think they are unbearable. I prefer watching historical documentaries because I learn a lot from them. My brother, on the other hand, loves them."',
      opts: [
        'Sofia likes historical documentaries.',
        'Sofia and her brother have the same taste in television.',
        'Sofia\'s brother dislikes reality shows.',
        'Sofia watches television with her brother every evening.'
      ],
      answer: 0,
      why: '"I prefer watching historical documentaries because I learn a lot" → doğru. "On the other hand" zıtlaştırma işaretidir: kardeşinin zevki farklı.'
    },
    {
      id: 'i5', type: 'infer', diff: 'hard',
      stimulus: 'Our school\'s film club meets every Thursday in the art room. Last month the members watched four films from different countries and wrote short reviews. The club president, Efe, says that they are going to start a magazine next term.',
      stem: 'What can we predict about the film club?',
      opts: [
        'The club is going to publish a magazine.',
        'The club meets in the library every Thursday.',
        'Efe does not like watching films.',
        'The members write reviews every day.'
      ],
      answer: 0,
      why: '"they are going to start a magazine next term" → tahmin edilebilir: dergi çıkaracaklar. "start a magazine" = "publish a magazine".'
    },

    /* ================= EXTRA — deeper Unit 2 structures ================= */
    {
      id: 'x1', type: 'dialogue', diff: 'medium',
      stem: 'Which is the correct response?\n\n— I prefer reading paper books to e-books. What about you?\n— ______',
      opts: ['I would rather read e-books because they are cheaper.', 'I read a book yesterday.', 'Yes, paper.', 'Because they are cheaper.'],
      answer: 0,
      why: 'Tercih sorusuna en tutarlı yanıt bir TERCİH bildirmektir. "I would rather + çıplak fiil" yapısal olarak doğru; diğerleri soruya uymuyor.'
    },
    {
      id: 'x2', type: 'dialogue', diff: 'hard',
      stem: 'Which is the most suitable question?\n\n— ______\n— I would rather stay at home than go out tonight.',
      opts: ['What do you usually do at the weekends?', 'What would you rather do tonight?', 'Do you like going out?', 'Why do you stay at home every day?'],
      answer: 1,
      why: 'Cevap "I would rather..." → soru da "What would you rather...?" ile başlamalı. Cevabın şekli sorunun şeklini söyler.'
    },
    {
      id: 'x3', type: 'table', diff: 'medium',
      stimulusTitle: 'Free-time activities of 8-C (30 students)',
      stimulus: `<table class="grid-table">
        <tr><th>Activity</th><th>Students</th></tr>
        <tr><td class="rowhead">Playing video games</td><td>12</td></tr>
        <tr><td class="rowhead">Reading books</td><td>9</td></tr>
        <tr><td class="rowhead">Doing a sport</td><td>6</td></tr>
        <tr><td class="rowhead">Watching films</td><td>3</td></tr>
      </table>`,
      stem: 'How many students prefer reading books to playing video games?',
      opts: ['3', '6', '9', '12'],
      answer: 2,
      why: '"Reading books" satırındaki sayı 9. DİKKAT: "prefer ... to ..." ifadesi burada sadece "okumayı seven" anlamına gelir — iki grubu çıkarmak gerekmez, sadece doğru satırdaki sayıyı oku.'
    },
    {
      id: 'x4', type: 'order', diff: 'hard',
      stem: 'Which is the correct order?\n\nI. Neither do I. I cannot stand horror films.\nII. I love watching horror films at the cinema.\nIII. Really? Why do you like them?\nIV. Because they are exciting.',
      opts: ['II - III - IV - I', 'III - II - IV - I', 'II - IV - III - I', 'IV - III - II - I'],
      answer: 0,
      why: 'II karşıt görüş → III "Really?" tepkisi + Why sorusu → IV gerekçe → I "Neither do I" ile aynı olumsuz fikir. "Neither do I" ancak önceki cümle olumsuzsa kullanılır.'
    },
    {
      id: 'x5', type: 'noanswer', diff: 'hard',
      stimulusTitle: 'A message in the class group',
      stimulus: 'Hi everyone!\nThis Saturday our class is going on a trip to the Youth Camp. We will meet at the school gate at 8:00 a.m. and take the bus. The bus will bring us back at 6:00 p.m.\nBring a snack, a water bottle and a hat. There is no shop at the camp.\nDo not be late!\n— Ms. Aydin',
      stem: 'Which question does NOT have an answer in the message?',
      opts: ['What time will they meet?', 'How will they go to the camp?', 'What should the students bring?', 'How much does the trip cost?'],
      answer: 3,
      why: 'Saat, ulaşım ve getirilecekler yazılı. ÜCRET bilgisi hiçbir yerde yok — bu sorunun cevabı YOK.'
    },
    {
      id: 'x6', type: 'infer', diff: 'medium',
      stem: 'What can we understand from the text?\n\n"Ali says he is keen on cooking. Every weekend he helps his mother in the kitchen and tries a new recipe. Last month he made a chocolate cake for his father\'s birthday, and everyone said it was delicious."',
      opts: ['Ali likes cooking and is good at it.', 'Ali only cooks on birthdays.', 'Ali\'s mother does not let him cook.', 'Ali wants to be a chef one day.'],
      answer: 0,
      why: '"keen on cooking" + her hafta yeni tarif + "everyone said it was delicious" → hem seviyor hem iyi. B tuzak: sadece birthday\'da değil, HER hafta sonu.'
    }
  ];

  /* ---------------- Mock exams ---------------- */
  const mocks = [
    {
      id: 'mock1',
      name: 'Deneme 1 · Teen Life Değerlendirme',
      short: 'Deneme 1',
      durationSec: 900,          // 15 min — 1.5 min/question, LGS pace
      description: 'Bu deneme UNIT 2 konularını kapsar. 15 dakika, 10 soru — LGS\'deki İngilizce bölümünün gerçek süresiyle aynı tempoda.',
      itemIds: ['q1', 'q2', 'q3', 'q4', 'q5', 'q6', 'q7', 'q8', 'q9', 'q10']
    },
    {
      id: 'mock2',
      name: 'Deneme 2 · Karışık LGS Stili',
      short: 'Deneme 2',
      durationSec: 480,          // 8 min — fast drill
      description: 'Hızlı antrenman: 8 dakikada 10 soru. Bu tempoda çalışmak sınavda zaman baskısını azaltır.',
      itemIds: ['r1', 'r2', 'r3', 'r4', 'r5', 'r6', 'r7', 'r8', 'r9', 'r10']
    },
    {
      id: 'mock3',
      name: 'Deneme 3 · Ek Değerlendirme',
      short: 'Deneme 3',
      durationSec: 600,          // 10 min — 1 min/question
      description: 'Ek deneme: 10 dakikada 10 soru. Farklı soru tipleriyle daha geniş bir değerlendirme.',
      itemIds: ['s1', 's2', 's3', 's4', 's5', 's6', 's7', 's8', 's9', 's10']
    },
    {
      id: 'mock4',
      name: 'Deneme 4 · Zaman Baskısı',
      short: 'Deneme 4',
      durationSec: 480,          // 8 min — speed run
      description: 'Zaman baskısı testi: 8 dakikada 10 soru. Hız ve doğruluk dengesi.',
      itemIds: ['v1', 'v2', 'v3', 'v4', 'v5', 'v6', 'v7', 'v8', 'v9', 'v10']
    },
    {
      id: 'mock5',
      name: 'Deneme 5 · Kazanım Kontrolü',
      short: 'Deneme 5',
      durationSec: 720,          // 12 min — 1.2 min/question
      description: 'Kapsamlı deneme: 12 dakikada 10 soru. Tablo okuma ve "cevabı olmayan soru" ağırlıklı.',
      itemIds: ['w1', 'w2', 'w3', 'w4', 'w5', 'w6', 'w7', 'w8', 'w9', 'w10']
    },
    {
      id: 'mock6',
      name: 'Deneme 6 · Final Provası',
      short: 'Deneme 6',
      durationSec: 600,          // 10 min — final rehearsal
      description: 'Final provası: 10 dakikada 10 soru. Gerçek sınav öncesi son kontrol.',
      itemIds: ['y1', 'y2', 'y3', 'y4', 'y5', 'y6', 'y7', 'y8', 'y9', 'y10']
    }
  ];

  /* ---------------- Mock 1 items ---------------- */
  const mockItems = [
    {
      id: 'q1', type: 'table', diff: 'easy',
      stimulusTitle: 'After-school activities of four friends',
      stimulus: `<table class="grid-table">
        <tr><th>Name</th><th>Activity</th><th>Days</th></tr>
        <tr><td class="rowhead">Ada</td><td>Swimming</td><td>Tue, Thu</td></tr>
        <tr><td class="rowhead">Bora</td><td>Basketball</td><td>Mon, Wed, Fri</td></tr>
        <tr><td class="rowhead">Cem</td><td>Guitar lessons</td><td>Wed</td></tr>
        <tr><td class="rowhead">Deniz</td><td>Reading club</td><td>Thu</td></tr>
      </table>`,
      stem: 'Ada and Deniz meet each other on ______.',
      opts: ['Monday', 'Tuesday', 'Wednesday', 'Thursday'],
      answer: 3,
      why: 'Ada Salı ve Perşembe, Deniz sadece Perşembe → ortak gün Perşembe.'
    },
    {
      id: 'q2', type: 'dialogue', diff: 'easy',
      stem: 'Lara: ______?\nTolga: I usually hang out with my friends or play online games.',
      opts: ['What do you do in your free time', 'How often do you play online games', 'Do you like hanging out', 'Why do you play online games'],
      answer: 0,
      why: 'Cevap bir aktivite listesi → soru "What do you do..." olmalı.'
    },
    {
      id: 'q3', type: 'dialogue', diff: 'medium',
      stem: 'Which is the most suitable response?\n\n— I think rock music is terrific. What about you?\n— ______',
      opts: ["I can't stand it. I think it is too loud.", 'Yes, I listen to it.', 'Because it is terrific.', 'Three times a week.'],
      answer: 0,
      why: 'Soru "What about you?" → bir GÖRÜŞ bekliyor. Sadece A bir görüş bildiriyor. B/E/C/D cevap şekli olarak uyumsuz.'
    },
    {
      id: 'q4', type: 'noanswer', diff: 'medium',
      stimulusTitle: "Eylül's message",
      stimulus: 'Hey!\nThis weekend I am going to Bursa with my family. We are going to climb Uludağ on Saturday morning. On Sunday we will visit my aunt. I will be back on Sunday night.\nDo not forget our English project — it is due on Monday!\nEylül',
      stem: 'Which of the following questions does NOT have an answer in the message?',
      opts: [
        'Where is Eylül going this weekend?',
        'What is Eylül going to do on Saturday?',
        'Why is Eylül going to Bursa?',
        'When must the English project be handed in?'
      ],
      answer: 2,
      why: 'NEDEN gittiği yazmıyor — sadece nereye ve ne yapacağı yazılı. "It is due on Monday" → proje teslim tarihi var.'
    },
    {
      id: 'q5', type: 'order', diff: 'medium',
      stem: 'Which is the correct order?\n\nI. Because it is relaxing and cheap.\nII. Why do you prefer camping to staying at a hotel?\nIII. So, when are you going camping again?\nIV. Next month, with my cousins.',
      opts: ['II - I - III - IV', 'I - II - III - IV', 'II - III - I - IV', 'III - II - I - IV'],
      answer: 0,
      why: 'II soru → I gerekçe → III takip sorusu → IV cevap. "Because" hemen bir "Why" sorusundan sonra geliyor.'
    },
    {
      id: 'q6', type: 'table', diff: 'hard',
      stimulusTitle: 'A music survey in 8-A',
      stimulus: `<table class="grid-table">
        <tr><th></th><th>Pop</th><th>Rock</th><th>Classical</th></tr>
        <tr><td class="rowhead">Girls</td><td>18</td><td>6</td><td>9</td></tr>
        <tr><td class="rowhead">Boys</td><td>7</td><td>15</td><td>4</td></tr>
      </table>`,
      stem: 'Which music type is the LEAST popular in 8-A?',
      opts: ['Pop', 'Rock', 'Classical', 'They are all equally popular.'],
      answer: 2,
      why: 'Toplamlar: Pop 25, Rock 21, Classical 13 → en az sevilen Classical.'
    },
    {
      id: 'q7', type: 'infer', diff: 'medium',
      stem: 'Which sentence is TRUE according to the text below?\n\n"I prefer e-books to paper books," says Ali. "They are faster and cheaper, and I can carry hundreds of them in my bag. But my grandfather hates them. He says there is nothing better than the smell of a real book."',
      opts: [
        'Ali and his grandfather like the same kind of books.',
        'Ali\'s grandfather prefers e-books.',
        'Ali likes carrying heavy books in his bag.',
        'Ali and his grandfather have different opinions about books.'
      ],
      answer: 3,
      why: 'Ali e-kitapları, dedesi basılı kitapları tercih ediyor → görüşler FARKLI. "But" bu zıtlığı işaret ediyor.'
    },
    {
      id: 'q8', type: 'mainidea', diff: 'easy',
      stem: 'Which is the best summary of this text?\n\nSena loves painting. She paints for at least one hour every day after school. Her paintings are usually about nature. Last week, she won the first prize in a national competition.',
      opts: [
        'Sena is a talented young painter.',
        'Nature is the best topic for paintings.',
        'School competitions are important.',
        'Painting takes a lot of time.'
      ],
      answer: 0,
      why: 'En kapsayıcı özet: her gün resim yapıyor + doğa konusu + ulusal birincilik → yetenekli genç ressam.'
    },
    {
      id: 'q9', type: 'dialogue', diff: 'hard',
      stem: 'Which is the most suitable question for the answer?\n\n— ______\n— No, never. I always ask my mother to buy things for me.',
      opts: ['How often do you go shopping?', 'Do you like shopping?', 'Why do you like shopping?', 'What do you buy?'],
      answer: 0,
      why: '"No, never" bir sıklık cevabı. "How often" sorusuna "never" yanıtı verilebilir.'
    },
    {
      id: 'q10', type: 'noanswer', diff: 'hard',
      stimulusTitle: 'A poster for the school radio',
      stimulus: '📻 OUR SCHOOL RADIO\nEvery weekday, 12:30 – 13:00, Room 12.\nWe play student requests, share news about the clubs and interview a different teacher each week.\nNew members are welcome! You do not need any experience — we will train you.\nCome and see Mr. Yılmaz on Mondays.',
      stem: 'Which of the following questions does NOT have an answer on the poster?',
      opts: [
        'Where is the school radio?',
        'What do they play on the radio?',
        'How long is the programme every weekday?',
        'How much does it cost to join the radio club?'
      ],
      answer: 3,
      why: 'ÜCRET bilgisi posterde yok. Sadece "New members are welcome" deniyor — fiyat belirtilmemiş.'
    }
  ];

  /* ---------------- Mock 2 items ---------------- */
  const mock2Items = [
    {
      id: 'r1', type: 'dialogue', diff: 'easy',
      stem: 'Which is the most suitable response?\n\n— Would you like to come to my birthday party on Saturday?\n— ______',
      opts: ["I'd love to. Thanks for asking!", 'Yes, I like parties.', 'Because I am free.', 'Three o\'clock.'],
      answer: 0,
      why: 'Bir davete en doğal cevap: "I\'d love to. Thanks for asking!"'
    },
    {
      id: 'r2', type: 'table', diff: 'medium',
      stimulusTitle: 'School club meeting times',
      stimulus: `<table class="grid-table">
        <tr><th>Club</th><th>Day</th><th>Time</th></tr>
        <tr><td class="rowhead">Chess</td><td>Tuesday</td><td>14:00</td></tr>
        <tr><td class="rowhead">Drama</td><td>Wednesday</td><td>15:30</td></tr>
        <tr><td class="rowhead">Coding</td><td>Thursday</td><td>14:00</td></tr>
        <tr><td class="rowhead">Chess</td><td>Friday</td><td>14:00</td></tr>
      </table>`,
      stem: 'Which club meets twice a week?',
      opts: ['Chess', 'Drama', 'Coding', 'No club meets twice a week.'],
      answer: 0,
      why: 'Satranç kulübü hem Salı hem Cuma → iki kez.'
    },
    {
      id: 'r3', type: 'order', diff: 'easy',
      stem: 'Which is the correct order?\n\nI. Me too. I am keen on basketball.\nII. What sport do you like?\nIII. Great. We can play together after school.',
      opts: ['II - I - III', 'I - II - III', 'II - III - I', 'III - II - I'],
      answer: 0,
      why: 'II soru → I cevap ("Me too" ancak öncesi olumluysa kullanılır) → III teklif.'
    },
    {
      id: 'r4', type: 'infer', diff: 'medium',
      stem: 'What can we understand from the text?\n\n"Kuzey lives far from his school, so he cannot come home for lunch. Instead, he eats at the school canteen with his friends. He says the canteen food is not very healthy, but he enjoys the time he spends with them."',
      opts: [
        'Kuzey likes the canteen food.',
        'Kuzey enjoys eating with his friends at the canteen.',
        'Kuzey goes home for lunch every day.',
        'Kuzey thinks the canteen is unhealthy, so he never eats there.'
      ],
      answer: 1,
      why: '"but he enjoys the time he spends with them" → asıl sebep arkadaşlarıyla geçirdiği zaman. A tuzak: yemeği pek sevmiyor.'
    },
    {
      id: 'r5', type: 'noanswer', diff: 'medium',
      stimulusTitle: 'A note from a friend',
      stimulus: 'Hi Deniz!\nAre you free on Friday evening? There is a great folk concert in the park. It starts at 19:00 and finishes at 22:00. I have two extra tickets, so I thought of you.\nCall me if you want to come.\nEmre',
      stem: 'Which of the following questions does NOT have an answer in the note?',
      opts: [
        'What is Deniz invited to?',
        'What time does the concert start?',
        'How did Emre get the tickets?',
        'What kind of music is the concert?'
      ],
      answer: 2,
      why: 'Emre\'nin biletlere NASIL sahip olduğu yazılmamış — sadece "two extra tickets" deniyor.'
    },
    {
      id: 'r6', type: 'mainidea', diff: 'medium',
      stem: 'Which is the best title?\n\n"My grandmother is the best cook in our family. Every Sunday she makes a different traditional dish. The whole family goes to her house, and we eat together. I love those days because I learn the recipes and listen to her old stories."',
      opts: ['My Grandmother\'s Sunday Dinners', 'Traditional Turkish Food', 'How to Cook', 'My Favourite Stories'],
      answer: 0,
      why: 'Metnin merkezinde pazar günleri ve aile buluşması var → en kapsayıcı başlık.'
    },
    {
      id: 'r7', type: 'table', diff: 'hard',
      stimulusTitle: 'How 60 students spend their free time',
      stimulus: `<table class="grid-table">
        <tr><th>Activity</th><th>Number of students</th></tr>
        <tr><td class="rowhead">Playing video games</td><td>24</td></tr>
        <tr><td class="rowhead">Going out with friends</td><td>18</td></tr>
        <tr><td class="rowhead">Reading</td><td>10</td></tr>
        <tr><td class="rowhead">Doing a sport</td><td>8</td></tr>
      </table>`,
      stem: 'What percentage of the students goes out with friends in their free time?',
      opts: ['18%', '20%', '30%', '40%'],
      answer: 2,
      why: '18 / 60 = 0,30 → %30. Tabloda toplam 60 verilmiş (24+18+10+8 = 60).'
    },
    {
      id: 'r8', type: 'dialogue', diff: 'medium',
      stem: 'Which is the most suitable response?\n\n— I hardly ever play computer games because I think they are boring.\n— ______',
      opts: ['So do I.', "That's why I prefer playing football.", 'Yes, every day.', 'Since last year.'],
      answer: 1,
      why: 'Cevap bir SEBEP/alternatif sunuyor. "So do I" zaten aynı fikirde olmayı söylerdi ama "I hardly ever" olumsuz bir ifade — dikkatli ol.'
    },
    {
      id: 'r9', type: 'infer', diff: 'hard',
      stem: 'Which can we INFER from the text?\n\n"Although she is only thirteen, Ece has her own blog about books. She writes a review every week. Her readers ask her which books to read next, and she always answers them. She says she wants to be a writer one day."',
      opts: [
        'Ece reads a book every week.',
        'Ece answers her readers when they ask for advice.',
        'Ece is a professional writer.',
        'Ece\'s readers do not like her reviews.'
      ],
      answer: 1,
      why: '"she always answers them" doğrudan yazıyor. A tuzak: haftada KİTAP değil, haftada KİTAP İNCELEMESİ yazıyor — bu ikisi farklı.'
    },
    {
      id: 'r10', type: 'noanswer', diff: 'easy',
      stimulusTitle: 'An invitation card',
      stimulus: '🎸 Rock Night!\nJoin us at the school garden on 21 June.\nStudent bands will start at 19:30.\nThere will be food and drinks.\nBring your friends!',
      stem: 'Which question does NOT have an answer on the card?',
      opts: [
        'When is Rock Night?',
        'Where is Rock Night?',
        'Who will play at Rock Night?',
        'How much is a ticket?'
      ],
      answer: 3,
      why: 'Fiyat bilgisi kartta yok. Davet kartlarında fiyat belirtilmemesi çok yaygındır.'
    }
  ];

  /* ---------------- Mock 3 items (Deneme 3 — 10 dk) ---------------- */
  const mock3Items = [
    {
      id: 's1', type: 'table', diff: 'easy',
      stimulusTitle: 'After-school activities of three friends',
      stimulus: `<table class="grid-table">
        <tr><th>Name</th><th>Activity</th><th>Days</th></tr>
        <tr><td class="rowhead">Ada</td><td>Swimming</td><td>Tue, Thu</td></tr>
        <tr><td class="rowhead">Bora</td><td>Basketball</td><td>Mon, Wed, Fri</td></tr>
        <tr><td class="rowhead">Cem</td><td>Guitar</td><td>Wed, Sat</td></tr>
      </table>`,
      stem: 'On which day do all three friends have an activity?',
      opts: ['Monday', 'Wednesday', 'Thursday', 'Saturday'],
      answer: 1,
      why: 'Ada: Salı/Perşembe. Bora: Pzt/Çar/Cum. Cem: Çar/Cmt. Üçünün de ortak günü Çarşamba → Wednesday.'
    },
    {
      id: 's2', type: 'dialogue', diff: 'easy',
      stem: 'Which is the most suitable response?\n\n— I usually read before bed. What about you?\n— ______',
      opts: ['I am reading a book now.', 'I usually watch TV.', 'Yes, I do.', 'Because it is relaxing.'],
      answer: 1,
      why: '"What about you?" alışkanlık soruyor → "I usually watch TV." Evet/hayır cevabı (C) ya da sebep (D) olmaz.'
    },
    {
      id: 's3', type: 'order', diff: 'medium',
      stem: 'Which is the correct order?\n\nI. Because it is exciting.\nII. Why do you like rock music?\nIII. So you listen to it every day?\nIV. Yes, I always listen to it after school.',
      opts: ['II - I - III - IV', 'I - II - III - IV', 'II - III - I - IV', 'III - II - I - IV'],
      answer: 0,
      why: 'II soru → I gerekçe → III takip sorusu → IV evet + detay. "Because" mutlaka "Why" sorusundan sonra gelir.'
    },
    {
      id: 's4', type: 'noanswer', diff: 'medium',
      stimulusTitle: 'A school announcement',
      stimulus: '🎸 ROCK CONCERT\nOur school band "Thunder" will play at the school garden on 20 May.\nThe concert starts at 7:00 p.m. and finishes at 9:30 p.m.\nTickets: 30 TL for students, 50 TL for adults.\nFree drinks for everyone!\nCome and join us!',
      stem: 'Which question does NOT have an answer on the poster?',
      opts: ['When is the concert?', 'Where is the concert?', 'Who is playing at the concert?', 'How can I get to the concert?'],
      answer: 3,
      why: 'A: 20 Mayıs ✓ B: okul bahçesi ✓ C: "Thunder" band ✓ D: ulaşım hiçbir yerde yazılmamış.'
    },
    {
      id: 's5', type: 'infer', diff: 'medium',
      stem: 'What can we understand from the text?\n\n"Although Deniz is only thirteen, he has his own blog about books. He writes a review every week. His readers ask him which books to read next, and he always answers them."',
      opts: ['Deniz is a professional writer.', 'Deniz answers his readers when they ask for advice.', 'Deniz reads a book every day.', 'Deniz\'s readers do not like his reviews.'],
      answer: 1,
      why: '"he always answers them" doğrudan yazıyor. A tuzak: blog yazarı ≠ profesyonel yazar.'
    },
    {
      id: 's6', type: 'mainidea', diff: 'easy',
      stem: 'Which is the best summary?\n\n"Sena loves painting. She paints for at least one hour every day after school. Her paintings are usually about nature. Last week, she won the first prize in a national competition."',
      opts: ['Sena is a talented young painter.', 'Nature is the best topic for paintings.', 'School competitions are important.', 'Painting takes a lot of time.'],
      answer: 0,
      why: 'En kapsayıcı özet: her gün resim + doğa konusu + ulusal birincilik → yetenekli genç ressam.'
    },
    {
      id: 's7', type: 'table', diff: 'hard',
      stimulusTitle: 'A music survey in 8-A',
      stimulus: `<table class="grid-table">
        <tr><th></th><th>Pop</th><th>Rock</th><th>Classical</th></tr>
        <tr><td class="rowhead">Girls</td><td>18</td><td>6</td><td>9</td></tr>
        <tr><td class="rowhead">Boys</td><td>7</td><td>15</td><td>4</td></tr>
      </table>`,
      stem: 'How many more girls like pop than rock?',
      opts: ['6', '9', '12', '18'],
      answer: 2,
      why: 'Kızlar: Pop 18, Rock 6 → fark 12. Sayıları karşılaştır, tahmin etme.'
    },
    {
      id: 's8', type: 'dialogue', diff: 'hard',
      stem: 'Which is the most suitable response?\n\n— I can\'t stand waiting in long queues.\n— ______',
      opts: ['So do I.', 'I love queues.', 'That\'s why I prefer shopping online.', 'Yes, every day.'],
      answer: 2,
      why: 'Olumsuz ifadeden sonra en anlamlı yanıt bir alternatif sunmaktır: "That\'s why I prefer shopping online."'
    },
    {
      id: 's9', type: 'noanswer', diff: 'hard',
      stimulusTitle: 'An e-mail from Emma',
      stimulus: 'Hi Jack!\nHow are you? I hope you are fine. My cousins are here for the holidays, and we are having a lot of fun. Yesterday we went to the new shopping centre and saw a great film there.\nOn Friday we are going to the rock concert in the city square. It starts at 20:00. My uncle is driving us, so we do not need to take the bus.\nWrite back soon!\nEmma',
      stem: 'Which question does NOT have an answer in the e-mail?',
      opts: ['What are Emma and her cousins going to do on Friday?', 'Why do they not take the bus?', 'How much is the concert ticket?', 'Where did they see a film yesterday?'],
      answer: 2,
      why: 'Bilet FİYATI hiçbir yerde geçmiyor. "rock concert" var ama fiyat yok — klasik tuzak.'
    },
    {
      id: 's10', type: 'order', diff: 'medium',
      stem: 'Which is the correct order?\n\nI. Because it is relaxing and cheap.\nII. Why do you prefer camping to staying at a hotel?\nIII. So, when are you going camping again?\nIV. Next month, with my cousins.',
      opts: ['II - I - III - IV', 'I - II - III - IV', 'II - III - I - IV', 'III - II - I - IV'],
      answer: 0,
      why: 'II soru → I gerekçe → III takip sorusu → IV cevap.'
    }
  ];

  /* ---------------- Mock 4 items (Deneme 4 — 8 dk) ---------------- */
  const mock4Items = [
    {
      id: 'v1', type: 'dialogue', diff: 'easy',
      stem: 'Which is the most suitable response?\n\n— Would you like to come to my birthday party?\n— ______',
      opts: ['I\'d love to. Thanks!', 'Yes, I like parties.', 'Because I am free.', 'Three o\'clock.'],
      answer: 0,
      why: 'Davete en doğal cevap: "I\'d love to. Thanks!"'
    },
    {
      id: 'v2', type: 'table', diff: 'medium',
      stimulusTitle: 'School club meeting times',
      stimulus: `<table class="grid-table">
        <tr><th>Club</th><th>Day</th><th>Time</th></tr>
        <tr><td class="rowhead">Chess</td><td>Tuesday</td><td>14:00</td></tr>
        <tr><td class="rowhead">Drama</td><td>Wednesday</td><td>15:30</td></tr>
        <tr><td class="rowhead">Chess</td><td>Friday</td><td>14:00</td></tr>
      </table>`,
      stem: 'Which club meets twice a week?',
      opts: ['Chess', 'Drama', 'Coding', 'No club meets twice a week.'],
      answer: 0,
      why: 'Satranç kulübü hem Salı hem Cuma → iki kez.'
    },
    {
      id: 'v3', type: 'order', diff: 'easy',
      stem: 'Which is the correct order?\n\nI. Me too. I am keen on basketball.\nII. What sport do you like?\nIII. Great. We can play together after school.',
      opts: ['II - I - III', 'I - II - III', 'II - III - I', 'III - II - I'],
      answer: 0,
      why: 'II soru → I cevap → III teklif.'
    },
    {
      id: 'v4', type: 'infer', diff: 'medium',
      stem: 'What can we understand?\n\n"Kuzey lives far from his school, so he cannot come home for lunch. Instead, he eats at the school canteen with his friends. He says the canteen food is not very healthy, but he enjoys the time he spends with them."',
      opts: ['Kuzey likes the canteen food.', 'Kuzey enjoys eating with his friends.', 'Kuzey goes home for lunch every day.', 'Kuzey never eats at the canteen.'],
      answer: 1,
      why: '"but he enjoys the time he spends with them" → asıl sebep arkadaşlarıyla geçirdiği zaman.'
    },
    {
      id: 'v5', type: 'noanswer', diff: 'medium',
      stimulusTitle: 'A note from a friend',
      stimulus: 'Hi Deniz!\nAre you free on Friday evening? There is a great folk concert in the park. It starts at 19:00 and finishes at 22:00. I have two extra tickets, so I thought of you.\nCall me if you want to come.\nEmre',
      stem: 'Which question does NOT have an answer in the note?',
      opts: ['What is Deniz invited to?', 'What time does the concert start?', 'How did Emre get the tickets?', 'What kind of music is the concert?'],
      answer: 2,
      why: 'Emre\'nin biletlere NASIL sahip olduğu yazılmamış — sadece "two extra tickets" deniyor.'
    },
    {
      id: 'v6', type: 'mainidea', diff: 'medium',
      stem: 'Which is the best title?\n\n"My grandmother is the best cook in our family. Every Sunday she makes a different traditional dish. The whole family goes to her house, and we eat together. I love those days because I learn the recipes and listen to her old stories."',
      opts: ['My Grandmother\'s Sunday Dinners', 'Traditional Turkish Food', 'How to Cook', 'My Favourite Stories'],
      answer: 0,
      why: 'Metnin merkezinde pazar günleri ve aile buluşması var → en kapsayıcı başlık.'
    },
    {
      id: 'v7', type: 'table', diff: 'hard',
      stimulusTitle: 'How 60 students spend their free time',
      stimulus: `<table class="grid-table">
        <tr><th>Activity</th><th>Students</th></tr>
        <tr><td class="rowhead">Playing video games</td><td>24</td></tr>
        <tr><td class="rowhead">Going out with friends</td><td>18</td></tr>
        <tr><td class="rowhead">Reading</td><td>10</td></tr>
        <tr><td class="rowhead">Doing a sport</td><td>8</td></tr>
      </table>`,
      stem: 'What percentage goes out with friends?',
      opts: ['18%', '20%', '30%', '40%'],
      answer: 2,
      why: '18 / 60 = 0,30 → %30. Tabloda toplam 60 verilmiş (24+18+10+8).'
    },
    {
      id: 'v8', type: 'dialogue', diff: 'hard',
      stem: 'Which is the most suitable question?\n\n— ______\n— No, never. I always ask my mother to buy things for me.',
      opts: ['How often do you go shopping?', 'Do you like shopping?', 'Why do you like shopping?', 'What do you buy?'],
      answer: 0,
      why: '"No, never" bir sıklık cevabı → "How often" sorusu. "How many times" de kabul edilebilir ama seçeneklerde yok.'
    },
    {
      id: 'v9', type: 'infer', diff: 'hard',
      stem: 'Which can we INFER?\n\n"Our school\'s film club meets every Thursday in the art room. Last month the members watched four films from different countries and wrote short reviews. The club president, Efe, says that they are going to start a magazine next term."',
      opts: ['The club is going to publish a magazine.', 'The club meets in the library.', 'Efe does not like watching films.', 'The members write reviews every day.'],
      answer: 0,
      why: '"they are going to start a magazine next term" → gelecekte dergi çıkaracaklar.'
    },
    {
      id: 'v10', type: 'noanswer', diff: 'easy',
      stimulusTitle: 'An invitation card',
      stimulus: '🎸 Rock Night!\nJoin us at the school garden on 21 June.\nStudent bands will start at 19:30.\nThere will be food and drinks.\nBring your friends!',
      stem: 'Which question does NOT have an answer on the card?',
      opts: ['When is Rock Night?', 'Where is Rock Night?', 'Who will play at Rock Night?', 'How much is a ticket?'],
      answer: 3,
      why: 'Fiyat bilgisi kartta yok. Davet kartlarında fiyat belirtilmemesi çok yaygındır.'
    }
  ];

  /* ---------------- Mock 5 items (Deneme 5 — 12 dk) ---------------- */
  const mock5Items = [
    {
      id: 'w1', type: 'table', diff: 'easy',
      stimulusTitle: 'Weekly club timetable',
      stimulus: `<table class="grid-table">
        <tr><th>Club</th><th>Day</th><th>Time</th></tr>
        <tr><td class="rowhead">Photography</td><td>Monday</td><td>14:30</td></tr>
        <tr><td class="rowhead">Choir</td><td>Tuesday</td><td>15:00</td></tr>
        <tr><td class="rowhead">Photography</td><td>Thursday</td><td>14:30</td></tr>
        <tr><td class="rowhead">Robotics</td><td>Wednesday</td><td>16:00</td></tr>
      </table>`,
      stem: 'A student can only come on Tuesday and Thursday. Which club can they join?',
      opts: ['Photography', 'Choir', 'Robotics', 'None of them'],
      answer: 0,
      why: 'Fotoğrafçılık hem Pazartesi hem Perşembe 14:30\'da. Öğrenci Salı + Perşembe gelebiliyor → Perşembe oturumuna katılabilir. Robotics Çarşamba, Choir Salı — ikisi de tek gün.'
    },
    {
      id: 'w2', type: 'dialogue', diff: 'medium',
      stem: 'Which is the most suitable response?\n\n— Would you mind if I opened the window?\n— ______',
      opts: ['Not at all. Go ahead.', 'Yes, I mind a lot.', 'No, I would not open it.', 'Because it is cold.'],
      answer: 0,
      why: '"Would you mind if..." kibar bir izin sorusu. Olumlu izin yanıtı "Not at all / Of course not" ile verilir — burada "mind" olumsuz sorulduğu için "not at all" = izin veriyorum.'
    },
    {
      id: 'w3', type: 'order', diff: 'medium',
      stem: 'Which is the correct order?\n\nI. Yes, I am. I am so excited!\nII. Are you ready for the school trip?\nIII. Great. The bus leaves at seven.\nIV. Me too. I have packed my bag already.',
      opts: ['II - I - III - IV', 'I - II - III - IV', 'II - III - I - IV', 'III - II - I - IV'],
      answer: 0,
      why: 'II soru → I evet + duygu → III takip bilgisi → IV karşılık. "Me too" ancak önceki cümle olumluysa kullanılır.'
    },
    {
      id: 'w4', type: 'noanswer', diff: 'medium',
      stimulusTitle: 'School library notice',
      stimulus: '📚 SCHOOL LIBRARY\nOpen: 08:00 – 16:30 (weekdays)\nYou can borrow two books at a time.\nBooks must be returned within 14 days.\nLate return: 1 TL per day.\nAsk the librarian for a membership card.',
      stem: 'Which question does NOT have an answer on the notice?',
      opts: ['How many books can you borrow?', 'What time does the library close?', 'How much is a membership card?', 'What happens if you return a book late?'],
      answer: 2,
      why: 'Üyelik KARTININ ücreti yazılmamış — sadece "ask for a membership card" deniyor. Diğer üçünün cevabı daire içinde.'
    },
    {
      id: 'w5', type: 'infer', diff: 'hard',
      stem: 'What can we understand from the text?\n\n"Zeynep wants to learn the guitar, but her flat is small and her neighbours complain about the noise. So she practices at her uncle\'s house twice a week, and on other days she plays only with headphones on an electric guitar."',
      opts: ['Zeynep has stopped learning the guitar.', 'Zeynep found a way to practise without disturbing her neighbours.', 'Zeynep\'s uncle lives in the same building.', 'Zeynep practises at home every day.'],
      answer: 1,
      why: 'Metin iki çözüm sunuyor: amcada pratik + kulaklıkla elektrik gitar → komşuları rahatsız etmeden çalışıyor. A tuzak: bırakmadı, devam ediyor.'
    },
    {
      id: 'w6', type: 'mainidea', diff: 'easy',
      stem: 'Which is the best title?\n\n"Every summer my family and I go to the same village. My grandfather was born there. We stay for three weeks. I help him in the garden, feed the chickens and learn stories about the old days. I love those weeks because they are quiet and I forget all about my phone."',
      opts: ['My Grandfather\'s Village', 'How to Feed Chickens', 'My Summer Homework', 'Phones Are Useful'],
      answer: 0,
      why: 'Metnin bütün satırları köye, dedeye ve yaz tatiline gidiyor → en kapsayıcı başlık A.'
    },
    {
      id: 'w7', type: 'table', diff: 'hard',
      stimulusTitle: 'A survey: "How do you go to school?" (40 students)',
      stimulus: `<table class="grid-table">
        <tr><th>Way</th><th>Students</th></tr>
        <tr><td class="rowhead">By bus</td><td>16</td></tr>
        <tr><td class="rowhead">On foot</td><td>10</td></tr>
        <tr><td class="rowhead">By car</td><td>8</td></tr>
        <tr><td class="rowhead">By bicycle</td><td>6</td></tr>
      </table>`,
      stem: 'How many more students go by bus than by car?',
      opts: ['6', '8', '10', '24'],
      answer: 1,
      why: 'Otobüs 16, araba 8 → fark 8. Tablodaki toplam (40) bu soruda kullanılmaz; sadece iki satırı karşılaştır.'
    },
    {
      id: 'w8', type: 'dialogue', diff: 'hard',
      stem: 'Which is the most suitable question?\n\n— ______\n— I would rather walk to school than take the bus.',
      opts: ['How do you go to school?', 'Why do you like buses?', 'What time do you leave home?', 'Do you walk to school every day?'],
      answer: 0,
      why: 'Cevap bir TERCİH bildiriyor ("would rather... than...") → soru da seçeneklerden biriyle bu tercihi sormalı. "How do you go to school?" en doğrusu; D ise "her gün" diye soruyor ama cevap tercih.'
    },
    {
      id: 'w9', type: 'noanswer', diff: 'hard',
      stimulusTitle: 'A message from the organiser',
      stimulus: 'Hi class!\nThis year\'s spring trip is on 12 May. We will visit the Science Museum and then have a picnic in the park.\nPlease pay 80 TL to Ms. Demir until 5 May.\nWear comfortable shoes and bring a hat.\nIf it rains, the trip will be postponed to 19 May.\nSee you!\n— Mr. Kaya',
      stem: 'Which question does NOT have an answer in the message?',
      opts: ['When is the spring trip?', 'Where will the students have a picnic?', 'What should the students wear?', 'Which museum will they visit in the morning?'],
      answer: 3,
      why: '"Science Museum" ziyaret edilecek ama SABAH/ÖĞLEDEN SONRA bilgisi YOK. Saat bilgisi hiçbir yerde geçmiyor — en ince tuzak bu.'
    },
    {
      id: 'w10', type: 'order', diff: 'medium',
      stem: 'Which is the correct order?\n\nI. Neither do I. I think it is too noisy.\nII. Do you enjoy living in the city centre?\nIII. Why is that?\nIV. Because there are too many cars everywhere.',
      opts: ['II - I - III - IV', 'I - II - III - IV', 'II - III - I - IV', 'III - II - I - IV'],
      answer: 0,
      why: 'II soru → I olumsuz yanıt ("Neither do I") → III "Why is that?" → IV gerekçe. "Neither do I" ancak önceki cümle olumsuzsa kullanılır.'
    }
  ];

  /* ---------------- Mock 6 items (Deneme 6 — 10 dk) ---------------- */
  const mock6Items = [
    {
      id: 'y1', type: 'dialogue', diff: 'easy',
      stem: 'Which is the most suitable response?\n\n— I have just won the school poetry contest!\n— ______',
      opts: ['Congratulations! That\'s great news.', 'I am sorry to hear that.', 'That\'s all right.', 'Good luck next time.'],
      answer: 0,
      why: 'Müjdeli haber → tebrik. B üzüntü, C özür/fark etmez, D "umarım gelecek sefer" — hiçbiri burada uygun değil.'
    },
    {
      id: 'y2', type: 'table', diff: 'medium',
      stimulusTitle: 'Teenagers\' favourite free-time activity',
      stimulus: `<table class="grid-table">
        <tr><th>Activity</th><th>Girls</th><th>Boys</th></tr>
        <tr><td class="rowhead">Reading</td><td>14</td><td>5</td></tr>
        <tr><td class="rowhead">Sports</td><td>6</td><td>13</td></tr>
        <tr><td class="rowhead">Music</td><td>10</td><td>12</td></tr>
      </table>`,
      stem: 'Which activity is the most popular overall?',
      opts: ['Reading', 'Sports', 'Music', 'They are all equal.'],
      answer: 2,
      why: 'Toplamlar: Reading 19, Sports 19, Music 22 → Müzik en popüler. Sütunları ayrı ayrı değil, TOPLA bak.'
    },
    {
      id: 'y3', type: 'infer', diff: 'medium',
      stem: 'What can we understand?\n\n"Berk never used to read books, but last year his English teacher gave him a short adventure novel. He liked it so much that he read three more books in English. Now he says reading in a foreign language is not as difficult as he thought."',
      opts: ['Berk reads more books in English than in Turkish now.', 'A teacher helped Berk start reading in English.', 'Berk still finds reading difficult.', 'Berk only reads adventure novels.'],
      answer: 1,
      why: 'Tetikleyici olay öğretmenin verdiği kitap. "he liked it so much that..." zinciri bunu gösteriyor. A ve D aşırı yorum, C metni tersine çeviriyor.'
    },
    {
      id: 'y4', type: 'noanswer', diff: 'easy',
      stimulusTitle: 'A poster for the fun run',
      stimulus: '🏃 TEEN FUN RUN\nDate: 18 April, Sunday\nStart: 09:00, in front of the school\nDistance: 3 km\nEntry: free\nT-shirts for the first 100 runners!',
      stem: 'Which question does NOT have an answer on the poster?',
      opts: ['Where does the run start?', 'How long is the run?', 'What time does it start?', 'How can I get a T-shirt?'],
      answer: 3,
      why: 'T-shirt\'in NASIL alınacağı yazmıyor — sadece "ilk 100 kişiye" deniyor. Kayıt/yöntem bilgisi yok.'
    },
    {
      id: 'y5', type: 'order', diff: 'medium',
      stem: 'Which is the correct order?\n\nI. Because they are cheap and healthy.\nII. Why do you prefer home-made food to fast food?\nIII. So you never eat burgers?\nIV. Rarely. Maybe once a month.',
      opts: ['II - I - III - IV', 'I - II - III - IV', 'II - III - I - IV', 'III - II - I - IV'],
      answer: 0,
      why: 'II soru → I gerekçe → III takip sorusu → IV sıklık cevabı. "Rarely" bir sıklık zarfı, soru da frequency sormuş.'
    },
    {
      id: 'y6', type: 'mainidea', diff: 'medium',
      stem: 'Which is the best summary?\n\n"Our school has a new eco-club. The members collect paper, plastic and glass every Friday. They also planted forty trees in the school garden last term. The club leader, Defne, says that their aim is to make the school greener and to teach everyone how to recycle."',
      opts: ['The eco-club works to make the school greener.', 'Recycling paper is the most important task.', 'Schools should have more clubs.', 'Defne likes planting trees.'],
      answer: 0,
      why: 'Kapsayıcı özet: geri dönüşüm + ağaç dikimi + "make the school greener" amacı. Diğerleri tek tek detay.'
    },
    {
      id: 'y7', type: 'table', diff: 'hard',
      stimulusTitle: 'How 50 teenagers spend their pocket money',
      stimulus: `<table class="grid-table">
        <tr><th>Category</th><th>Percentage</th></tr>
        <tr><td class="rowhead">Snacks & drinks</td><td>40%</td></tr>
        <tr><td class="rowhead">Savings</td><td>25%</td></tr>
        <tr><td class="rowhead">Books & stationery</td><td>20%</td></tr>
        <tr><td class="rowhead">Transport</td><td>15%</td></tr>
      </table>`,
      stem: 'If a teenager gets 20 TL pocket money, how much does he/she save?',
      opts: ['3 TL', '4 TL', '5 TL', '8 TL'],
      answer: 2,
      why: 'Birikim %25 → 20 × 0,25 = 5 TL. Önce yüzdelik satırını bul, sonra çarp.'
    },
    {
      id: 'y8', type: 'dialogue', diff: 'hard',
      stem: 'Which is the most suitable response?\n\n— Do you mind if I use your charger?\n— ______ My battery is full anyway.',
      opts: ['Not at all, go ahead.', 'Yes, I do. It is mine.', 'No, you cannot.', 'I am using it right now.'],
      answer: 0,
      why: '"Do you mind if..." + "My battery is full anyway" → izin veriyor. "Not at all" = hiç önemli değil. D tutarlı olurdu ama "anyway" cümlesi izin verdiğini gösteriyor.'
    },
    {
      id: 'y9', type: 'infer', diff: 'hard',
      stem: 'Which can we INFER?\n\n"Kaan\'s family moved to a new city three months ago. At first he did not talk to anyone at school, but now he eats lunch with a group from his class. He says he still misses his old friends, but he is happy because the new school has a drama club and he loves acting."',
      opts: ['Kaan has forgotten his old friends.', 'Kaan is slowly settling into his new school.', 'Kaan does not like acting.', 'Kaan eats lunch alone every day.'],
      answer: 1,
      why: 'İlk zamanlar hiç konuşmuyordu → şimdi grupla yemek + drama kulübü + "he is happy" → yavaş yavaş uyum sağlıyor. A, C, D metni tersine çeviriyor.'
    },
    {
      id: 'y10', type: 'noanswer', diff: 'medium',
      stimulusTitle: 'An e-mail to a pen-friend',
      stem: 'Hi Alex!\n\nI hope you are well. I am 13 and I live in Izmir with my parents and my little sister. I usually get up at 7:00 and have breakfast with my family. My favourite subject is maths because I find it challenging.\nAt weekends I play basketball with my neighbours. Last week we won a match against a team from Ankara. It was great!\n\nWrite back and tell me about your town.\n\nBest,\nEmre',
      opts: ['What time does Emre get up?', 'Which subject does Emre like best?', 'How many people are there in Emre\'s family?', 'What does Alex like about his town?'],
      answer: 3,
      why: 'A, B, C\'nin cevabı e-maillerde var. D sorusu ALEX\'in hakkında — henüz cevaplamadı, sadece "tell me about your town" deniyor.'
    }
  ];

  /* ---------------- Projection defaults ---------------- */
  const projection = {
    // MEB standardises each subtest to mean 50, SD 10, then applies
    // the İngilizce katsayısı of 1. The cohort mean (mu) and standard
    // deviation (sigma) are NOT published in advance, so they are
    // exposed as sliders with sensible defaults.
    mu: 5.6,          // typical cohort mean raw score out of 10
    sigma: 2.4,       // typical cohort standard deviation
    coefficient: 1,   // İngilizce katsayısı
    hpMin: 0,         // a candidate answering 0 correctly, 0 wrongly
    hpMax: 10         // a candidate scoring 10/10
  };

  const strategyCards = [
    {
      ico: '🚫', title: 'Negatif işaretleri daire içine al',
      text: 'NOT, DOESN\'T, NEVER, NO excuse, DOES NOT have... Bu kelimeler sorunun anlamını tersine çevirir. Soruyu okurken altını çiz.'
    },
    {
      ico: '↔️', title: 'prefer mi, would rather mi?',
      text: 'prefer + isim/-ing + TO + isim/-ing.  would rather + ÇIPLAK fiil (to\'suz). İkisini karıştırmak bu ünitedeki en sık yapılan hatadır.'
    },
    {
      ico: '🎣', title: 'Kelime tuzağına düşme',
      text: 'Bir seçenek "rock music" kelimesini içeriyor diye doğru olduğu anlamına gelmez. Soruya CEVAP VEREN seçenek doğru olandır.'
    },
    {
      ico: '⏱️', title: 'Sıklık zarflarını ayrı ayrı öğren',
      text: 'never = %0 · rarely = %10 · sometimes = %40 · usually = %80 · always = %100. Aynı değiller; sıklık sırasını ezberle.'
    },
    {
      ico: '📅', title: 'Çizelgede TÜM sınırları kontrol et',
      text: 'Gün + saat + fiyat. Üçünü birden doğrula. Sadece birine bakıp cevap vermek bu soru tipindeki en yaygın kayıp puan.'
    },
    {
      ico: '🚦', title: 'İlk makul seçende durma',
      text: 'Dört seçeneği de oku. "Cevabı olmayan soruyu bul" ve "hangisi doğrudur" sorularında en son seçenek sık sık doğrudur.'
    }
  ];

  /* ---------------- Lookup helpers ----------------
     The mock runner and the printable answer key both need to find
     items by id no matter which paper they came from. */
  const allMockItems = mockItems.concat(mock2Items, mock3Items, mock4Items, mock5Items, mock6Items);
  function itemsByIds(ids) {
    return ids.map(function (id) {
      return allMockItems.filter(function (x) { return x.id === id; })[0];
    }).filter(Boolean);
  }

  return { types, bank, mocks, mockItems, mock2Items, mock3Items, mock4Items, mock5Items, mock6Items, allMockItems, itemsByIds, projection, strategyCards };
})();
