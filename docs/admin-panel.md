# Teklif paneli

Panel adresi: `/admin`. Panel ve müşteri teklif formu İngilizce hazırlandı.

## İlk yönetici erişimi

İlk yönetici hesabı henüz oluşturulup doğrulanmadı. Kod değişikliği mevcut olmayan bir Identity hesabına giriş sağlamaz; proje sahibi aşağıdaki davet ve rol atama işlemini tamamlamalıdır. Giriş ekranındaki “First-time administrator setup” bölümü aynı adımları ve Netlify bağlantısını içerir.

1. Yayın tamamlandıktan sonra Netlify proje ayarlarında Identity bölümünü açın. Kullanıcı kaydını **Invite only** olarak ayarlayın.
2. Kullanacağınız e-posta adresini yönetici olarak davet edin. Bu adresteki Identity kullanıcısına **admin** rolünü atayın. Rolün kullanıcı tarafından değiştirilebilen profil alanlarında değil, yönetici tarafından verilen uygulama rollerinde bulunması gerekir.
3. Davet e-postasındaki bağlantıyı açın. Panelde şifrenizi belirleyin; ardından `/admin` adresinden giriş yapın. Davet bağlantısı ana sayfaya dönerse uygulama bağlantıyı panel ekranına yönlendirir.
4. Rol sonradan eklendiyse çıkış yapıp tekrar giriş yapın.

Giriş ekranında herkese açık hesap oluşturma seçeneği yoktur. Giriş yapmış olsa da admin rolü olmayan hesaplar teklif API’sinden 403 yanıtı alır. İlk yönetici atamasını yalnızca projenin sahibi/yöneticisi yapmalıdır. Şifreyi veya giriş bağlantısını kod deposuna eklemeyin.

## Panelden yönetici rolü ekleme

İlk `admin` rolü yukarıdaki Netlify kullanıcı ayarından bir kez verilmelidir. Kullanıcıyı davet etmek veya Netlify ekibine yönetici olarak eklemek, site hesabına otomatik olarak `admin` rolü vermez.

Yetkili yönetici `/admin` panelindeki **Yönetici rolleri → Kullanıcıları ve rolleri göster** bölümünü açabilir. Mevcut kullanıcının yanındaki **Yönetici rolü ekle** düğmesi, kullanıcının diğer rollerini ve uygulama bilgilerini koruyarak `admin` rolünü ekler. Kullanıcı ardından çıkış yapıp tekrar giriş yapmalıdır. Yeni kullanıcı davetleri Netlify Identity üzerinden gönderilmeye devam eder.

Bu işlem `/api/admin/users` üzerinden sunucuda yapılır. Hem oturumdaki yönetici rolü hem Identity üzerindeki güncel yönetici kaydı doğrulanır. Yetkisiz veya yönetici rolü kaldırılmış hesaplar kullanıcıları listeleyemez ve rol atayamaz. Profil bilgileriyle yönetici yetkisi verilemez. Rol kaldırma, hesap silme ve şifre değiştirme bu bölüme eklenmedi.

`node tests/admin-users.test.mjs` rol yönetiminin yetki ve doğrulama kontrollerini canlı hesaplarda değişiklik yapmadan çalıştırır.

## Teklif akışı

Ana sayfadaki hızlı teklif formu ve `/ContactUs` sayfasındaki ayrıntılı form aynı kayıt API’sini kullanır. Sitedeki proje/teklif düğmeleri `/ContactUs` formuna açılır. Ad, e-posta, telefon, proje türü, başlık ve açıklama sunucuda doğrulanıp Netlify Database’e kaydedilir. Başarı mesajı yalnızca başarılı kayıt yanıtından sonra gösterilir. Aynı gönderim kimliğiyle yapılan tekrarlar ikinci bir kayıt oluşturmaz.

Panelde en yeni talepler önce listelenir; isim/e-posta/başlık araması, durum filtresi ve sayfalama bulunur. Talep seçilince iletişim bilgileri ve açıklama açılır. Yönetici durumu **New**, **In progress** veya **Completed** olarak güncelleyebilir ve iç not ekleyebilir. İç notlar müşteriye gönderilmez.

Bu yeni akışta kayıtlar panelde saklanır. Önceki EmailJS üzerinden e-posta gönderimi kaldırıldı; otomatik e-posta bildirimi veya eski e-postalardan geçmiş kayıt aktarımı eklenmedi. Panel yeni form gönderimleriyle dolmaya başlar.

## Yayın ve doğrulama

Veritabanı şeması `db/schema.ts` dosyasında, oluşturulan migration dosyası `netlify/database/migrations/` altında bulunur. Migration platform tarafından yayın sırasında uygulanır; elle uygulanmamalıdır. Identity etkinleştirme adımı çalıştırıldı.

`npm run check:server`, `npm run check:quotes` ve `npm run check:seo` komutları yerel kontrolleri çalıştırır. Bu kontroller canlı veritabanına test kaydı yazmaz. Yayın sonrasında yönetici hesabıyla gerçek bir test talebini gönderip panelde görünmesini, durum/not kaydını, çıkış yaptıktan sonra erişimin reddedilmesini ve davet/şifre yenileme e-postalarının dönüşünü doğrulayın.

Panel site haritasına eklenmedi; noindex ve önbellek engelleme başlıkları tanımlandı. Bu indeksleme ayarları güvenlik sınırı olarak kullanılmadı; müşteri verisi her istekte sunucu tarafındaki oturum ve admin rolü kontrolüyle korundu. Yönetici ekranı ve kimlik doğrulama dönüşleri analiz takibinden çıkarıldı.

Yetki kontrolü hem doğrudan uygulama rollerini hem de mevcut projenin iç içe authorization.roles alanını destekler. Kullanıcı tarafından düzenlenebilen profil bilgileri yetki vermez. Oturum açmış ama yetkisiz kullanıcıya ayrı bir erişim açıklaması gösterilir.

## Veritabanıyla canlıya yayın

“Publishing deploy previews to production is not currently supported for sites with a database” mesajı uygulama hatası değil, önizlemeyi doğrudan üretime taşıma kısıtlamasıdır. Site kodunda veya yönlendirmelerde değişiklik yaparak kaldırılmaz.

Bu çalışma için agent run sayfasındaki **Publish** işlemini kullanın. Git üzerinden yayın için değişiklikleri `main` dalına birleştirin; bağlı Netlify projesi yeni bir production build başlatır. Deploy Preview ekranındaki mevcut önizlemeyi üretime taşıma işlemini kullanmayın.

Üretim yayını, `npm run build` komutuyla `dist` klasörünü hazırlar. Netlify `netlify/database/migrations/` içindeki migration dosyalarını üretim yayını sırasında otomatik uygular. Migration başarısız olursa yayın durur; Deploys bölümündeki ilgili üretim kaydının hatası incelenmelidir. Migration komutunu build scriptine eklemeyin ve SQL dosyalarını elle çalıştırmayın.

Başarılı üretim yayını sonrasında ana sayfa tasarımını ve hızlı teklif formunu kontrol edin. Yönetici hesabıyla test talebinin `/admin` ekranında göründüğünü doğrulayın. Önizlemede gönderilen test taleplerinin üretim veritabanına aktarılmasını beklemeyin; önizleme ayrı bir veritabanı dalı kullanır.

## Quote spam protection

Quote submissions use a hidden honeypot field, server-side input validation, request origin checks and an IP rate limit of 10 requests per minute.
