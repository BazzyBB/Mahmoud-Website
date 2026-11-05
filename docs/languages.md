# Site dilleri

Genel sitede menüdeki **Language / Idioma / اللغة** seçicisinden İngilizce, İspanyolca ve Arapça seçilebilir. Varsayılan dil İngilizcedir. Tarayıcı diline göre otomatik yönlendirme yapılmaz.

Seçim URL'de tutulur: İspanyolca için `?lang=es`, Arapça için `?lang=ar`. Site içi bağlantılar seçilen dili ve bölüm bağlantılarını korur. Bu adresler paylaşılabilir ve yenilendiğinde aynı dili gösterir. İngilizce seçildiğinde dil parametresi kaldırılır. Mevcut sayfa yolları ve asıl sayfa adresleri korunur; ayrı bir veritabanı kaydı veya tarayıcı depolaması kullanılmaz.

Menü, alt bölüm, ana sayfa, hizmetler, malzemeler, süreç, iletişim, portföy ve proje ayrıntıları için çeviriler `src/i18n/translations.js` içindedir. Anahtarlar mevcut İngilizce metinlerdir. Yeni genel içerik eklendiğinde iki çeviri de eklenmelidir. Dil bağlamı ve dil parametrelerini koruyan bağlantılar `src/i18n/LanguageContext.jsx` dosyasındadır.

Arapça seçildiğinde genel site sağdan sola yerleşir ve Arapça uyumlu yazı tipi kullanılır. Telefon ve e-posta alanları soldan sağa kalır. Marka adları, bağlantı adresleri ve HTX Growth imzası değiştirilmez. İmza her dilde “Crafted with care by HTX Growth” olarak gösterilir ve https://htxgrowth.com adresine bağlanır.

Teklif formu etiketleri ve kullanıcıya gösterilen proje türleri çevrilir; API'ye gönderilen alan adları ve proje türleri mevcut İngilizce değerlerini korur. Admin panelinin giriş sistemi ve rol yönetimi genel site dil seçiminden bağımsızdır.

`npm run check:languages`, tüm genel sayfaların üç dilde işlenmesini, proje metinlerinin çeviri kapsamını, dil seçicisini, bağlantıları, Arapça yönünü ve form değerlerinin korunmasını kontrol eder. Kontrol canlı veritabanına veya kullanıcı hesaplarına yazmaz.
