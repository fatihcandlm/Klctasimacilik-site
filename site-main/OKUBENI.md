# KLC Taşımacılık — Site

Tek dosyalık kapalı bir şablondan dönüştürülmüş, düz HTML/CSS/JS ile çalışan
çok sayfalı site. Çerçeve (React vb.) yok, derleme adımı yok, bağımlılık yok.

## Çalıştırma

Dosyalar `file://` ile de açılır ama fontlar ve bazı davranışlar için yerel
sunucu önerilir:

```
cd "C:\Users\Bilgi İşlem\Desktop\site-proje"
python -m http.server 4000 --bind 127.0.0.1
```

Sonra: **http://localhost:4000**

`--bind 127.0.0.1` sunucuyu yalnızca bu bilgisayara açar. Kaldırırsan site
yerel ağdaki herkese açılır.

## Yayına alma

Klasörün tamamını (`index.html` + diğer sayfalar + `assets/`) hosting'e
yükle. Özel bir gereksinim yok; herhangi bir statik hosting çalışır.

Yükledikten sonra kontrol et:
- `404.html` sunucu tarafında hata sayfası olarak tanımlandı mı
- `.woff2` dosyaları `font/woff2` MIME tipiyle sunuluyor mu
- Dizin listeleme kapalı mı

## Dosya düzeni

```
index.html        Ana sayfa
hakkimizda.html   Biz kimiz, 5 adımlı çalışma biçimi, filo, farklarımız
hizmetler.html    4 hizmetin her biri için ayrı detay bölümü
referanslar.html  Referans kartları, müşteri görüşü, rakamlar
blog.html         Yazı kartları
iletisim.html     İletişim kutuları + teklif formu
404.html          Sayfa bulunamadı

assets/
  base.css        Orijinal şablondan çıkarılan tasarım sistemi.
                  DOKUNMA — renk/font değişkenleri buradan gelir ama
                  düzenlemeni site.css içinden yapman daha güvenli.
  site.css        Bu site için yazılan katman. Değişiklikleri buraya yap.
  site.js         Menü, açılır menü ve teklif formu davranışı.
  logo.png, hero-filo.png
  fonts/          Barlow ve Barlow Condensed (15 dosya)

index.html.yedek-*  Orijinal 3,4 MB'lık paket. Silme, geri dönüş noktan.
```

## Sık yapılacak değişiklikler

**Yazı değiştirmek:** İlgili `.html` dosyasını herhangi bir editörle aç, yazıyı
değiştir, kaydet. Başka bir şey gerekmez.

**Marka rengini değiştirmek:** `assets/site.css` başındaki tek yer:

```css
:root {
  --brand: #e2231a;        /* kırmızı */
  --brand-dark: #c11c14;   /* üzerine gelince */
  --navy: var(--color-accent-900);
  --navy-rgb: 29, 45, 61;  /* laciverdin saydam tonları için */
}
```

Laciverti değiştirirsen `--navy-rgb` değerini de aynı renge çevir, yoksa
hero'daki karartma ve mobil menü fonu eski renkte kalır.

**Menüye sayfa eklemek:** Menü her sayfada tekrar yazılıdır. Bir bağlantı
eklerken 6 sayfanın hepsinde hem masaüstü hem mobil menüyü güncelle, yoksa
sayfalar arasında tutarsızlık olur.

**Fotoğraf değiştirmek:** `assets/` içindeki dosyanın üzerine aynı adla yaz.
Hero ve Hakkımızda şu an aynı fotoğrafı (`hero-filo.png`) kullanıyor; ayırmak
istersen ikinci bir dosya ekleyip ilgili `<img src="...">` değerini değiştir.

## Yapılması gerekenler

Sitede gerçek bilgi bekleyen yerler turuncu rozetlerle işaretli:

- [ ] **Telefon numarası** — `iletisim.html` içinde `0312 000 00 00` ve
      `href="tel:+903120000000"`. Şu an sahte; butona basan müşteri hiçbir
      yeri aramıyor. En öncelikli düzeltme.
- [ ] **Açık adres** — `iletisim.html`, şu an sadece "Ankara, Türkiye"
- [ ] **E-posta adresini doğrula** — `info@klctasimacilik.com` gerçek mi?
      Değişecekse `site.js` içindeki `adres` değişkenini de güncelle.
- [ ] **Referanslar** — `referanslar.html` içindekiler örnek. Gerçek müşteri
      isimlerini ancak ilgili kurumlardan izin aldıktan sonra yaz.
- [ ] **Blog yazıları** — kartlar örnek, detay sayfaları yok. Bu yüzden
      kartlar bilerek tıklanamaz yapıldı.
- [ ] **İstatistikler** — 120+ araç, 15 yıl, %99 gibi rakamlar şablondan
      geldi; doğrulanmalı.

## Netlify'a yayınlama

Site Netlify için hazırlandı. `netlify.com` → giriş yap → **Add new site →
Deploy manually** → bu klasörü sürükle bırak. Dakikalar içinde bir adres verir.

Sonrasında Netlify panelinde:
- **Forms** sekmesinde teklif talepleri birikir
- **Forms → Settings → Form notifications** ile e-postana yönlendirebilirsin
- **Domain settings** ile kendi alan adını (`klctasimacilik.com`) bağlarsın

Güncelleme yapmak için klasörü tekrar sürükle bırak, ya da GitHub deposuna
bağla; o zaman her `git push` otomatik yayınlanır.

## Teklif formu nasıl çalışıyor

Statik sitede sunucu tarafı yoktur, form kendi başına mesaj gönderemez.
Şu anki çözüm: form doldurulunca bilgiler e-posta programında hazır bir mesaj
olarak açılır, kullanıcı "gönder"e basar.

Mesajın doğrudan kutuna düşmesini istersen iki yol var:
- Form servisine bağlamak (Formspree gibi) — kod değişikliği küçük
- Siteyi sunucu tarafı olan bir yere taşımak — daha kapsamlı

Not: `mailto:` bağlantıları çok uzun olduğunda bazı e-posta programları
mesajı kırpıyor. Bu yüzden mesaj alanı 1200 karakterle sınırlandı ve kod
sınırı aşan durumu kullanıcıya bildiriyor.

## Bilinen sınırlar

- Blog yazılarının detay sayfaları yok.
- `base.css` orijinal şablondan geldiği için içinde bu sitede kullanılmayan
  bileşen stilleri var. Zararsız; temizlemek istersen dikkatli ol.
- `base.css` içindeki `[data-mobnav]` ve `[data-burger]` kuralları eski
  çalışma zamanına aitti ve düzeni bozuyordu; `site.css` sonundaki
  "sızan kuralların etkisizleştirilmesi" bloğu bunları geçersiz kılıyor.
  O bloğu silme.
