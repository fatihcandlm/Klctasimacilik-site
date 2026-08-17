# Klctasimacilik-site

KLC Taşımacılık kurumsal web sitesi — Ankara merkezli personel servisi,
öğrenci taşımacılığı, VIP transfer ve grup taşıma hizmetleri.

Statik site: düz HTML, CSS ve JavaScript. Çerçeve yok, derleme adımı yok,
bağımlılık yok. Klasörü herhangi bir statik hosting'e yüklemek yeterli.

## Sayfalar

| Dosya | İçerik |
|---|---|
| `index.html` | Ana sayfa |
| `hakkimizda.html` | Firma tanıtımı, çalışma biçimi, filo |
| `hizmetler.html` | Dört hizmetin detay bölümleri |
| `referanslar.html` | Referans kartları |
| `blog.html` | Yazı kartları |
| `iletisim.html` | İletişim bilgileri ve teklif formu |
| `tesekkurler.html` | Form gönderimi sonrası |
| `404.html` | Sayfa bulunamadı |

**Önemli:** `index.html` deponun kökünde durmalıdır. Alt klasöre taşınırsa
Vercel ve benzeri servisler siteyi bulamaz.

## Çalıştırma

```bash
python -m http.server 4000 --bind 127.0.0.1
```

Sonra: http://localhost:4000

## Yayına alma

**Vercel:** Depoyu içe aktar, hiçbir build ayarı gerekmez. Root Directory
boş kalmalı (dosyalar zaten kökte).

**Netlify:** Depoyu içe aktar; build command ve publish directory boş
bırakılır. Teklif formu Netlify Forms altyapısını kullanır, gönderim
sonrası `tesekkurler.html` sayfasına yönlenir.

> Not: Teklif formu Netlify'a özeldir. Vercel'de yayınlanırsa form
> gönderimleri hiçbir yere ulaşmaz; telefon ve WhatsApp çalışmaya devam eder.
> Vercel'de form istenirse bir form servisine (ör. Formspree) bağlanmalıdır.

Ayrıntılı kurulum, düzenleme ve yapılacaklar listesi için **`OKUBENI.md`**.

## Teknik notlar

- Görseller WebP (sayfa ağırlığı ~468 KB)
- Barlow / Barlow Condensed fontları site içinde barındırılıyor
- `assets/base.css` orijinal tasarım sisteminden alındı, dokunulmuyor
- `assets/site.css` bu proje için yazılan katman
- İletişim bilgileri sayfalara tek kaynaktan yayılır; değişiklik gerekirse
  tüm sayfalarda birlikte güncellenmelidir
- Tüm sayfalar WCAG kontrast eşiğini geçiyor, mobilde yatay kaydırma yok
