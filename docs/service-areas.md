# Hizmet bölgeleri ve yerel SEO

## Mevcut mimari ve uygulama

Proje React 18, React Router ve Vite kullanır. Netlify yayın komutu mevcut `npm run build`, yayın klasörü `dist` olarak korundu. `scripts/prerender.mjs`, `src/data/seo.js` içindeki indekslenebilir rotaları React sunucu çıktısından HTML dosyalarına dönüştürür ve site haritasını üretir. Eşleşmeyen istekler mevcut Netlify 404 kuralına gider.

Yeni `/service-areas` dizini ve 18 şehir rotası aynı sisteme bağlandı. Toplam indekslenebilir sayfa sayısı 32 oldu. Şehir dosyaları örneğin `service-areas/frisco-tx.html` olarak oluşturulur; Netlify'ın mevcut temiz URL ayarı bunları `/service-areas/frisco-tx` üzerinden sunar. Tüm içerik tarayıcı JavaScript'i çalışmadan HTML'de bulunur.

## İçerik ve kapsam

Şehirler üç grupta düzenlendi:

- Ana bölgeler: Dallas, Plano, Frisco, McKinney, Allen, Richardson.
- Konut odaklı bölgeler: Highland Park, University Park, Southlake, Prosper, Celina, Flower Mound.
- Diğer DFW bölgeleri: Fort Worth, Irving, Carrollton, The Colony, Lewisville, Grapevine.

Kaynak içerik `src/data/service-areas.js` dosyasındadır. Her şehrin ayrı giriş metni, tasarım konusu, iki planlama paragrafı, hazırlık listesi, hizmet açıklamaları, üç soru-cevap, portföy seçimi ve yakın şehir bağlantıları vardır. Tek bir metinde şehir adı değiştirme yöntemi kullanılmadı. Şehir temaları arasında oturma düzeni, ev ofisi depolaması, mutfak projesi koordinasyonu, mevcut mobilyalarla uyum, tezgâh ergonomisi, malzeme seçimi, ticari erişim ve değişen koleksiyonların sergilenmesi bulunur.

Yeni şehirlerin hizmet kapsamı işletme sahibi tarafından doğrulanmış kabul edilmedi. Ana sayfa, dizin ve şehir sayfalarında adres bazında uygunluğun, kapsamın ve teslimat/kurulumun stüdyoyla teyit edilmesi gerektiği belirtildi. Yerel ofis, yapılmış yerel proje, müşteri yorumu, sertifika veya çalışma süresi uydurulmadı. Yeni portföy görselleri üretilmedi; gerçek mevcut iş görselleri kullanıldı ve şehirde yapılmış işler olarak sunulmadı.

Şehir rehberlerinin editoryal içeriği sitenin ana dili olan İngilizce hazırlandı. Yeni ortak gezinme, hizmet bölgesi başlıkları ve açıklama metinleri mevcut İspanyolca/Arapça çeviri sistemine eklendi; dil bağlantıları korundu.

## Tasarım, bağlantılar ve SEO

Ana sayfadaki on şehirlik bölüm son iletişim çağrısından önce yerleştirildi. Menüye “Service Areas”, footer'a altı ana şehir ve tüm bölgelere bağlantı eklendi. Mevcut renkler, yazı tipleri, teklif formu ve iletişim adresleri kullanıldı. Yeni düzenler mobilde tek veya iki sütuna iner; uzun menü metinleri mevcut mobil menü içinde kalır.

Her rotaya tek H1, benzersiz başlık/açıklama ve kendi canonical adresi eklendi. `BreadcrumbList` görünür gezinmeyle, `FAQPage` görünür sorular ve yanıtlarla eşleştirildi. `LocalBusiness` yalnızca mevcut Dallas işletmesini temsil eder. Yeni şehirlerde kapsam kesinleşmediğinden hizmet bölgesi sayfalarının `LocalBusiness` ve `Service` verilerinde `areaServed` kullanılmadı. Şehir hizmet verisi, uygunluğun teyit edilmesi gereken bir proje görüşmesi olarak tanımlandı; ayrı yerel işletme kaydı oluşturulmadı.

`public/sitemap.xml` güncellendi; yayın sırasındaki otomatik site haritası da aynı 32 rotayı kullanır. Mevcut robots.txt genel sayfaları taramaya açar ve doğru site haritasına işaret eder; engel eklenmedi. Admin noindex ayarları korundu. Görseller mevcut Netlify Image CDN üzerinden boyutlandırılır; alt görseller tembel yüklenir. Portföy kartlarının responsive kaynaklarında geçersiz kırpma parametresi kaldırıldı.

## Doğrulama

`npm run check:seo`, 32 sayfanın metadata benzersizliğini, H1 yapısını, canonical adreslerini, JSON-LD verilerini, tüm iç bağlantıları ve görsel dosyalarını kontrol eder.

`npm run check:service-areas`, 18 şehir ve üç grup bütünlüğünü, özgün metinleri ve 54 farklı soruyu, kapsam açıklamalarını, schema doğruluğunu ve gerçek ön işleme eklentisinin yeni HTML/site haritası üretmesini bellekte doğrular. Derleme çalıştırmaz veya yayın çıktısı yazmaz.

Dil, teklif, admin rolü ve sunucu tip kontrolleri de çalıştırıldı. Veritabanı veya migration değişikliği yapılmadı.

## Yayın sonrası kontrol

İşletme sahibi şehir bazında kapsama ve mutfak dahil proje türlerinin uygunluğuna karar vermelidir. Mevcut açıklamalar bu doğrulamaya kadar koşullu kalmalıdır; doğrulanmamış `areaServed`, yerel adres veya proje konumu eklenmemelidir.

Normal Netlify yayını sonrasında `/service-areas` ve 18 şehir URL'sinin 200 döndürdüğünü, bilinmeyen bir şehir yolunun 404 olduğunu kontrol edin. Sayfa kaynağında ana içerik, canonical ve JSON-LD'nin bulunduğunu; site haritasının 32 sayfayı içerdiğini doğrulayın. Menü, şehir kartları ve teklif bağlantılarını masaüstü ve mobilde deneyin. Yayınlanan sayfalarda PageSpeed/Core Web Vitals ölçümü ve Search Console URL denetimi yapılmalıdır. Google sıralaması veya indeksleme sonucu garanti edilmez.
