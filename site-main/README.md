# site

klctasimacilik

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

## Çalıştırma

```bash
python -m http.server 4000 --bind 127.0.0.1
```

Sonra: http://localhost:4000

## Yayına alma

Netlify için hazır: teklif formu Netlify Forms altyapısını kullanır,
gönderim sonrası `tesekkurler.html` sayfasına yönlenir.

Ayrıntılı kurulum, düzenleme ve yapılacaklar listesi için **`OKUBENI.md`**
dosyasına bakın.

## Teknik notlar

- Görseller WebP (sayfa ağırlığı ~468 KB)
- Barlow / Barlow Condensed fontları site içinde barındırılıyor
- `assets/base.css` orijinal tasarım sisteminden alındı, dokunulmuyor
- `assets/site.css` bu proje için yazılan katman
- Tüm sayfalar WCAG kontrast eşiğini geçiyor, mobilde yatay kaydırma yok
