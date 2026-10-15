# Unit 2 · TEEN LIFE — Interactive Workbook + LGS Exam Centre

8. Sınıf İngilizce · Bilim ve Kültür Yayınları · kitap sayfaları **26–40**

---

## Nasıl açılır

```
index.html dosyasına çift tıklayın.
```

Chrome veya Edge kullanın. **Kurulum yok, sunucu yok, internet gerekmez.** Bütün dosyalar bu klasörde. USB'ye kopyalayıp okul bilgisayarında da açabilirsiniz.

İlerleme tarayıcının `localStorage`'ında saklanır — aynı bilgisayarda tekrar açtığınızda öğrenci kaldığı yerden devam eder.

> Not: Bu uygulama sunucu kullanmaz, `fetch` çağırmaz. Bu yüzden dosya protokolü (`file://`) altında sorunsuz çalışır.

---

## Klasör yapısı

```
index.html                 ← açın bu dosyayı
css/styles.css             ← tüm görünüm
js/audio-scripts.js        ← dinleme metinleri (kaynak dosya)
js/data.js                 ← kitaptaki bütün alıştırmalar
js/lgs-items.js            ← LGS soru bankası
js/progress.js             ← ilerleme, XP, rozetler
js/audio.js                ← ses oynatıcı + yedek seslendirme
js/lgs.js                  ← sınav motoru ve MEB puanlaması
js/app.js                  ← arayüz ve alıştırma bileşenleri
audio/*.wav                ← 9 ses dosyası (Track 7–12 + okuma metinleri)
tools/build-audio.js       ← sesleri yeniden üretir
tools/build-mock-pdf.js    ← denemeleri PDF kitapçığı olarak üretir
```

---

## Bölüm haritası — kitap sırasıyla

| Sayfa | Bölüm | İçerik |
|---|---|---|
| 26 | **GET READY!** | Fiil–ifade eşleştirme, Track 7 (dinle–sırala), sıfat–cümle kurucu |
| 27 | **LISTENING** | Track 8 (Like/Dislike), Track 9 (7 boşluk) |
| 27 | **SPEAKING** | Sıklık zarfları kaydırıcısı + seslendirme |
| 28 | **READING** | Lily & Sam tablosu (10 satır × 3 sütun) |
| 29 | **READING** | Helen'in Blogu — okuma, 7 boşluk, blog yazma |
| 30 | **LISTENING** | Track 10 (4 çoktan seçmeli), Track 11 (7 boşluk) |
| 31 | **MEMORY TEST** | 2 dakikalık geri sayım + "Who said…?" (6 soru) |
| 32 | **GRAMMAR LAB** | Tercih yapıları tablosu + 8 soruluk dilbilgisi çalışması |
| 33 | **VOCABULARY** | 12 kart çevirmeli oyun + Martha metni (4 soru) |
| 34 | **WRITING** | Model paragraf analizi + grup yazma ödevi |
| 35–38 | **PRACTICE** | Hobiler, tercih çiftleri, diyalog yazma, Track 12, diyagram, paragraf, 4 açık soru |
| 39–40 | **UNIT TEST** | Kitabın 7 test sorusu, anında geri bildirim |
| 40 | **SELF ASSESSMENT** | Resmi kazanım listesi (E8.2.*) |
| — | **🌊 DERİN GRAMMAR** | Kitapta yok — `prefer` / `would rather` / `keen on` karşılaştırma tablosu + 10 soruluk çalışma |
| — | **🌊 DERİN KELİME** | Kitapta yok — 14 kart (duygular + kalıplar), edat eşleştirmeleri, 8 soruluk kelime ailesi |
| — | **🌊 OKUMA LABORATUVARI** | Kitapta yok — 2 özgün LGS tarzı metin (ana fikir, çıkarım, "cevabı yok" tuzağı) |
| — | **🌊 KONUŞMA LABORATUVARI** | Kitapta yok — davet diyalog kurucu + 5 cümle kalıbı sesli çalışması |
| — | **🎯 LGS SINAV MERKEZİ** | Kitapta yok — aşağıya bakın |

Toplam **220'den fazla otomatik puanlanan soru/cevap** + serbest yazma panoları.

---

## 🎯 LGS SINAV MERKEZİ (yeni bölüm)

Kitapta olmayan, LGS'ye hazırlık için özel olarak yazıldı.

### A. Soru tipi atölyeleri
LGS İngilizce'de tekrar eden 6 format, her biri kendi Türkçe strateji kartıyla:

| Tip | Ad | Strateji özeti |
|---|---|---|
| 📊 | Tablo & grafik okuma | Önce soruyu oku, sonra tabloyu. Sayıları karşılaştır, tahmin etme. |
| 💬 | Diyalog tamamlama | **Cevaba bak** — eksik satırın şeklini o söyler. |
| 🔍 | Cevabı olmayan soru | Cevabı metinde olanları ele. Tuzak hep "makul" görünen seçenektir. |
| 🧩 | Cümle sıralama | Önce soruyu bul. Why sorusundan sonra Because gelir. |
| 🎯 | Ana fikir & başlık | İlk ve son cümleye bak. Doğru başlık geneldir. |
| 💭 | Çıkarım & doğru-yanlış | NOT / NEVER / ONLY altını çiz. Kelime tekrarına aldanma. |

Her atölyede **5–6 soru** ve Türkçe açıklama.

### B. Deneme sınavları

| Deneme | Süre | Kapsam |
|---|---|---|
| Deneme 1 · Teen Life Değerlendirme | **15 dk** | Unit 2 konuları, gerçek LGS temposu (soru başına ~1,5 dk) |
| Deneme 2 · Karışık LGS Stili | **8 dk** | Hız antrenmanı — süre baskısını azaltır |
| Deneme 3 · Ek Değerlendirme | **10 dk** | Farklı soru tipleriyle geniş değerlendirme (soru başına 1 dk) |
| Deneme 4 · Zaman Baskısı | **8 dk** | Zaman baskısı testi — hız ve doğruluk dengesi |
| Deneme 5 · Kazanım Kontrolü | **12 dk** | Kapsamlı deneme — tablo okuma ve "cevabı olmayan soru" ağırlıklı |
| Deneme 6 · Final Provası | **10 dk** | Gerçek sınav öncesi son kontrol |

**Toplam 6 deneme · 60 soru.** Her biri **10 soru** — gerçek LGS İngilizce bölümünün uzunluğu. Soru paleti, işaretleme, otomatik kapanma var. Deneme 3–6'da tablo okuma, "cevabı olmayan soru" ve çıkarım soruları ağırlıktadır.

### B2. 📄 Sınavları PDF olarak indirme

Deneme Sınavları bölümündeki iki düğme, bütün denemeleri **yazdırmaya hazır** bir kitapçık olarak hazırlar:

- **📄 Sınavları yazdır (cevap anahtarlı)** — 6 deneme + öğretmen için cevap anahtarı (22 sayfa)
- **🖨️ Sadece soruları yazdır** — sadece 6 deneme, anahtarsız (20 sayfa)

Düğmeye basınca tarayıcının yazdırma penceresi açılır. Hedefi **"PDF olarak kaydet"** seçin — dosya bilgisayarınıza iner. Kapak sayfasında ad/sınıf/tarih alanı, her deneme ayrı sayfada, seçenekler A/B/C/D kutucuklarıyla işaretlemeye hazır.

**Komut satırından toplu üretim** (başlık satırı olmayan temiz PDF için):

```bash
node tools/build-mock-pdf.js
```

Bu komut projenin kök klasörüne iki dosya yazar:

| Dosya | İçerik |
|---|---|
| `lgs-denemeler.pdf` | 6 deneme · 60 soru · 20 sayfa |
| `lgs-denemeler-cevap-anahtarli.pdf` | Yukarıdakiler + cevap anahtarı · 22 sayfa |

İnternet gerekmez; yerel Chrome/Edge ile yazdırılır.

### C. Puanlama motoru — gerçek MEB kuralı

```
Ham puan (HP) = Doğru − (Yanlış ÷ 3)
Standart puan (SP) = 10 × (HP − μ) ÷ σ + 50
Ağırlıklı (ASP) = SP × 1        ← İngilizce katsayısı
```

**3 yanlış 1 doğruyu götürür.** Bu, MEB'in kendi kılavuzunda yazan kuraldır; burada birebir uygulanır. Amaç, öğrencinin "boş bırakayım mı" sorusunun cevabını rakamla görmesi.

Sonuç ekranı şunları verir:

- Doğru / Yanlış / **Boş** ayrı ayrı
- **Net** (2 haneli)
- Soru tipine göre başarı kırılımı (hangi tip puan götürüyor)
- Zorluk kırılımı (kolay / orta / zor)
- Soru başına ortalama süre + "yavaşsın / çok hızlısın" uyarısı
- **MEB projeksiyonu** (HP → SP → ASP)
- Boş bırakma uyarısı
- Sıradaki adım önerisi

#### ⚠️ Projeksiyon hakkında dürüst bir not

μ (ortalama) ve σ (standart sapma) değerleri **MEB her yıl sınavı girenlerin gerçek sonuçlarından hesaplar ve önceden yayımlamaz.** Bu yüzden ekrandaki varsayılan değerler (μ = 5,6 · σ = 2,4) makul bir varsayımdır, resmi bir değer değil. Kaydırıcıları oynatarak farklı senaryolar görebilirsiniz. Ekran bunu açıkça "projeksiyon, tahmin değil" diye belirtiyor — öğrencinin bunu puan olarak ezberlemesini istemeyiz.

### D. Yanlış tekrarı
Her yanlış soru, Türkçe açıklamasıyla birlikte saklanır (son 60 tanesi). Sınavdan bir gece önce yeniden okumak için birebir.

### E. Strateji kartları
Türk 8. sınıfların bu ünitede en çok yaptığı 6 hata: negatif işaretler, `prefer`/`would rather` karışıklığı, kelime tuzağı, sıklık zarfları, çizelge sınırları, ilk makul seçende durma.

---

## Sık yapılan hatalar — cevap anahtarı notları

**Unit Test, 1. soru** kaynak kitapta **tartışmalı**: tabloya göre hem **A** hem **D** doğru görünüyor. Cevap anahtarı **D** işaretlendi çünkü tablodaki kararlaştırmayı en kapsayıcı şekilde yapıyor. Uygulamada bu belirsizlik öğrencinin ekranında da Türkçe olarak not ediliyor — tartışmaya değer bir sınıf sorusu olabilir.

**Unit Test, 4. soru** kitapta görsel seçimi gerektiriyor; burada emojili seçeneklere çevrildi (👕 casual · 👔 smart · 🏃 sporty · 🥻 traditional).

Kitaptaki "Track 7–12" ses dosyaları PDF'te yok. Bu uygulamadaki sesler **Windows'un yerleşik çevrimdışı sesleriyle** (Microsoft David ve Microsoft Zira) yeniden üretildi; metinler kitaptaki boşluklarla birebir uyumlu olacak şekilde yazıldı.

---

## Sesi yeniden üretme

Sesleri değiştirmek isterseniz:

```bash
# 1. js/audio-scripts.js içinde metinleri düzenleyin
# 2. Sonra:
node tools/build-audio.js
```

Bu komut manifest'i üretir, PowerShell ile sesleri kaydeder ve dosyaları birleştirir. **İnternet gerekmez.**

Ses dosyası silinirse ya da olmazsa uygulama otomatik olarak tarayıcının kendi İngilizce sesine düşer (aynı metin okunur). Ses çalmazsa sayfadaki **📝 Metin** düğmesiyle tam metin görünür.

---

## Öğretmen / projeksiyon modu

Sağ üstteki **📽️** düğmesi:

- Tipografi belirgin şekilde büyür
- Uzun metinler daha rahat okunur
- Sınıfta tek tek ilerletmek için uygundur

## Cevap anahtarı yazdırma

- Adres çubuğuna `#answer-key` yazın, **veya**
- LGS bölümündeki **🖨️ Yazdır** düğmesini kullanın

Bütün alıştırmaların ve dört denemenin cevapları, Türkçe açıklamalarıyla yazdırılır.

---

## Telif notu

Alıştırmaların metinleri yayıncının kitabından alınmıştır ve **kendi sınıfınızda** kullanım içindir. Bu klasörü herkese açık bir yerde yayınlamayın.
