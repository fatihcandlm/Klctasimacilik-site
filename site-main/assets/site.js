/* KLC Taşımacılık — menü davranışı
   Orijinal şablon "dc-runtime" adlı özel bir çalışma zamanı kullanıyordu
   (sc-if, sc-camel-on-click). Bu dosya aynı işi standart JavaScript ile yapar;
   hiçbir dış kütüphane gerekmez. */

(function () {
  "use strict";

  document.addEventListener("DOMContentLoaded", function () {
    /* --- Mobil menü --------------------------------------------------- */
    var burger = document.querySelector("[data-burger]");
    var mobnav = document.querySelector("[data-mobnav]");

    if (burger && mobnav) {
      burger.setAttribute("aria-expanded", "false");
      burger.addEventListener("click", function () {
        var acik = mobnav.classList.toggle("open");
        burger.setAttribute("aria-expanded", acik ? "true" : "false");
        burger.setAttribute("aria-label", acik ? "Menüyü kapat" : "Menüyü aç");
      });
    }

    /* --- Açılır menü ---------------------------------------------------
       Açık/kapalı durumu TEK yerde tutulur: `.open` sınıfı. Fare ile açma da
       buradan yapılır. Daha önce hover CSS'te, tıklama JS'te olduğu için
       kullanıcı menünün üzerine gelip tıkladığında menü açık kilitli kalıyordu. */
    var droplar = document.querySelectorAll(".has-drop");
    var fareVar = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

    function ayarla(d, acik) {
      d.classList.toggle("open", acik);
      var t = d.querySelector(".drop-toggle");
      if (t) t.setAttribute("aria-expanded", acik ? "true" : "false");
    }

    function hepsiniKapat(haric) {
      droplar.forEach(function (d) {
        if (d !== haric) ayarla(d, false);
      });
    }

    droplar.forEach(function (d) {
      var toggle = d.querySelector(".drop-toggle");
      if (!toggle) return;

      toggle.setAttribute("aria-expanded", "false");
      toggle.setAttribute("aria-haspopup", "true");

      toggle.addEventListener("click", function (e) {
        e.preventDefault();
        e.stopPropagation();
        var acilacak = !d.classList.contains("open");
        hepsiniKapat(d);
        ayarla(d, acilacak);
      });

      // Yalnızca gerçek fare olan cihazlarda; dokunmatikte hover taklit edilir
      // ve menü parmak değdiği anda açılıp kapanmaz hâle gelir.
      if (fareVar) {
        d.addEventListener("mouseenter", function () {
          hepsiniKapat(d);
          ayarla(d, true);
        });
        d.addEventListener("mouseleave", function () {
          ayarla(d, false);
        });
      }

      // Menü içinde klavyeyle gezinirken odak dışarı çıkınca kapansın
      d.addEventListener("focusout", function (e) {
        if (!d.contains(e.relatedTarget)) ayarla(d, false);
      });
    });

    // Dışarı tıklayınca kapat
    document.addEventListener("click", function (e) {
      if (!e.target.closest(".has-drop")) hepsiniKapat(null);
    });

    /* --- Teklif formu -------------------------------------------------
       Yayında (Netlify) form normal şekilde POST edilir ve gönderimler
       Netlify panelinde toplanır. Yerelde test ederken Netlify altyapısı
       olmadığı için gönderim başarısız olurdu; o durumda bilgiler e-posta
       taslağına dönüştürülüp kullanıcının posta programında açılır. */
    var form = document.querySelector("[data-teklif]");
    var yerelMi =
      location.protocol === "file:" ||
      location.hostname === "localhost" ||
      location.hostname === "127.0.0.1";

    if (form) {
      form.addEventListener("submit", function (e) {
        var d = new FormData(form);
        var al = function (k) { return (d.get(k) || "").toString().trim(); };

        /* Tarayıcının `required` kontrolü alanın uzunluğuna bakar, boşlukları
           kırpmaz. Sadece boşluk girilirse form "geçerli" sayılır ve firmaya
           kimin yazdığı belli olmayan bir e-posta gider. Burada kırpılmış
           hâline bakılır. */
        var zorunlu = [["ad", "Ad Soyad"], ["telefon", "Telefon"]];
        for (var i = 0; i < zorunlu.length; i++) {
          if (al(zorunlu[i][0]) === "") {
            e.preventDefault();
            var alan = form.elements[zorunlu[i][0]];
            alan.setCustomValidity(zorunlu[i][1] + " alanını doldurun.");
            alan.reportValidity();
            alan.addEventListener("input", function () { this.setCustomValidity(""); }, { once: true });
            return;
          }
        }

        // Yayında: forma dokunma, Netlify'a normal POST edilsin.
        if (!yerelMi) return;

        // Yerelde: e-posta taslağı olarak aç.
        e.preventDefault();

        var satirlar = [
          "Ad Soyad: " + al("ad"),
          "Kurum: " + al("kurum"),
          "Telefon: " + al("telefon"),
          "E-posta: " + al("eposta"),
          "Hizmet: " + al("hizmet"),
          "Kişi sayısı: " + al("kisi"),
          "",
          "Güzergâh ve vardiya bilgisi:",
          al("mesaj"),
        ];

        var konu = "Teklif talebi — " + (al("kurum") || al("ad"));
        var adres = "info@klctasimacilik.com";

        var baglanti =
          "mailto:" + adres +
          "?subject=" + encodeURIComponent(konu) +
          "&body=" + encodeURIComponent(satirlar.join("\n"));

        /* Türkçe karakterler yüzde-kodlamada 2-3 katına çıkar. Windows'ta
           mailto çağrısı ~2000 karakterin üstünde sessizce kırpılabiliyor;
           kullanıcı eksik giden mesajı fark etmez. Sınırı aşarsa uyar. */
        if (baglanti.length > 1900) {
          var mesajAlani = form.elements["mesaj"];
          mesajAlani.setCustomValidity(
            "Mesajınız e-posta bağlantısı için fazla uzun. Lütfen kısaltın veya " +
            "doğrudan " + adres + " adresine yazın."
          );
          mesajAlani.reportValidity();
          mesajAlani.addEventListener("input", function () { this.setCustomValidity(""); }, { once: true });
          return;
        }

        window.location.href = baglanti;
      });
    }

    // Esc ile kapat
    document.addEventListener("keydown", function (e) {
      if (e.key !== "Escape") return;
      hepsiniKapat(null);
      if (mobnav && mobnav.classList.contains("open")) {
        mobnav.classList.remove("open");
        if (burger) {
          burger.setAttribute("aria-expanded", "false");
          burger.focus();
        }
      }
    });
  });
})();
