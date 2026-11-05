# SEO analizi ve uygulama hedefleri

5 Kasım 2026. Site dili ve hedef pazarı doğrultusunda Dallas–Fort Worth için İngilizce arama niyetleri ele alındı. Aşağıdaki anahtar kelimeler içerik ve niyet analizine dayanan hedeflerdir; Keyword Planner, Search Console veya ücretli sıralama verileri sağlanmadığı için aylık hacim, zorluk, mevcut sıra veya trafik artışı ölçülmedi.

## Rakip ve sektör incelemesi

- [Woodbine Furniture ana sayfa](https://www.woodbinefurniture.com/): “Custom Amish Furniture” başlığı, oda ve ürün türüne göre kategori bağlantıları, malzeme özelleştirme bilgileri ve danışmanlık çağrıları görüldü. DFW’de özelleştirilebilir mobilya satan bir işletmedir; aynı üretim modeline sahip birebir rakip değildir.
- [Woodbine tablolar](https://www.woodbinefurniture.com/tables): ayrı bir ürün kategorisi adresi bulunuyor.
- [Woodbine alıcı rehberi](https://www.woodbinefurniture.com/buyers-guide): “Wood Furniture Buyer's Guide” başlığı; masif ahşap/kaplama, ağaç türleri ve işçilik açıklamalarıyla bilgi arayan ziyaretçiyi ürün seçimine yönlendiriyor. Şablonda fotoğrafçı adına ait ilgisiz bir H1 de görüldü; bu hata örnek alınmadı.
- [Berdoll Sawmill](https://www.berdollsawmill.com/): “Live Edge Slabs, Native Texas Lumber, Mantels” başlığı; malzeme ve ürün türlerine ayrılmış bağlantılar, belirgin H1 ve proje örnekleri görüldü.
- [Berdoll projeler](https://berdollsawmill.com/custom-projects/) ve [SSS](https://berdollsawmill.com/faqs/): malzeme seçimi, kurutma, yüzey hazırlığı ve kullanım sorularını ele alan içerikler görüldü. Austin çevresinde bir tedarikçi/sektör örneğidir; Dallas’ta doğrudan mobilya rakibi olarak sunulmadı.

Bazı diğer firma adresleri bağlantı/DNS hataları nedeniyle incelenemedi. Bu örneklem bir Google ilk-sayfa rakip listesi veya backlink analizi değildir. Rakiplere ait fiyat, garanti, üretim yöntemi veya yorumlar Live Wood Studio’ya atfedilmedi.

## Sayfa ve anahtar kelime eşleştirmesi

| Sayfa | Birincil hedef | Destekleyici niyet |
| --- | --- | --- |
| `/` | custom woodworking Dallas | custom furniture Dallas, Dallas woodworker |
| `/Services` | custom woodworking services Dallas | custom cabinets Dallas, built-ins, commercial casework |
| `/Gallery` | custom furniture portfolio Dallas | completed woodworking projects |
| `/Gallery/live-edge-walnut-epoxy-river-dining-table` | epoxy river table Dallas | live edge walnut dining table |
| `/Gallery/custom-jewelry-display-cabinet-system` | jewelry display cabinets Dallas | glass showcases, LED cabinet system |
| `/Gallery/walnut-diamond-setting-bench` | custom diamond setting bench | walnut jeweler workbench Dallas |
| `/Gallery/geometric-oak-block-epoxy-table` | custom oak coffee table Dallas | geometric block epoxy table |
| `/Gallery/mixed-hardwood-mosaic-epoxy-table` | mosaic epoxy coffee table | mixed hardwood custom table Dallas |
| `/Gallery/white-oak-retail-display-table` | retail display table Dallas | white oak store fixtures |
| `/Materials` | walnut vs white oak furniture | wood and epoxy finish guide |
| `/Process` | custom furniture design process | consultation, material selection, installation |
| `/AboutUs` | Live Wood Studio Dallas | furniture maker / workshop identity |
| `/ContactUs` | custom furniture quote Dallas | woodworking consultation / contact |

Tek bir genel arama terimini her sayfada tekrarlamak yerine her sayfa ayrı bir niyete odaklandı. Proje sayfaları gerçek fotoğraf, ölçü/malzeme özellikleri ve özgün açıklamalarla desteklendi. Gerçek yerel içerik olmadan şehir bazlı kopya sayfalar oluşturulmadı.

## Teknik bulgular ve kararlar

Önceki Vite uygulaması her adreste aynı boş kök HTML’ini sunuyordu; sayfa metni ve meta etiketleri JavaScript çalışınca oluşuyordu. Yayın sırasında mevcut React sayfalarından statik HTML üretimi eklendi. Böylece başlık, açıklama, kanonik adres, içerik ve schema ilk HTML’de bulunacak şekilde düzenlendi. Aynı React bileşenleri kullanıldığı için kullanıcıya ve tarayıcıya ayrı içerik üretilmedi.

Sayfalara özgü kısa başlıklar/açıklamalar, tek işletme kimliği, WebSite/WebPage, hizmet kataloğu ve breadcrumb verileri tanımlandı. İşletme adresinde yalnızca mevcut şehir/bölge/posta kodu kullanıldı; “Dallas, Texas” sokak adresi gibi sunulmadı. Projeler CreativeWork ve hizmet bağlamıyla işaretlendi; fiyat/yorum/puan bilgisi uydurulmadı. FAQ içeriği görünür sorularla eşlendi; mobilya sitesinde Google FAQ zengin sonucu beklenmemelidir. HowTo işaretlemesi kaldırıldı; Google HowTo zengin sonuç özelliği kullanılmadığı için yatırımın odağı değildir.

Meta keywords Google sıralama sinyali olarak kullanılmadığından kaldırıldı. `<strong>` vurguları yalnızca metnin anlamlı noktalarında kullanıldı; bold kullanımı tek başına sıralama stratejisi olarak sunulmadı. Açıklayıcı bağlantılar hizmet → proje → malzeme → görüşme akışını bağladı. Site haritası kanonik sayfalarla eşleştirildi ve bilinmeyen adresler için 404 davranışı düzenlendi.

## Yayından sonra ölçüm

Search Console’da site haritasını gönderme ve önemli adresleri URL Denetleme ile inceleme; gösterim, tıklama, CTR ve sorguları sayfa bazında izleme gerekir. Google Business Profile bilgileri, gerçek müşteri yorumları, yerel referanslar ve atölye/üretim içerikleri sonraki çalışmalar için değerlidir. Yeni kanonik adresleri, gerçek HTTP 404 yanıtını ve schema uygunluğunu yayından sonra doğrulamak gerekir. İlk sıralara çıkma süresi veya sonucu garanti edilemez.
