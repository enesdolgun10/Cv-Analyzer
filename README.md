# 🚀 AI Powered CV Analyzer

> **Yapay Zeka Destekli CV Analiz ve Optimizasyon Aracı**

Bu proje, iş arayanların özgeçmişlerini (CV) saniyeler içinde analiz ederek hem **İnsan Kaynakları (İK)** profesyonellerinin hem de **Aday Takip Sistemleri (ATS)** algoritmalarının beklentilerine göre puanlayan ve iyileştirme önerileri sunan modern bir web uygulamasıdır.

## ✨ Öne Çıkan Özellikler

- **📄 Çoklu Format Desteği:**
  - **PDF Desteği:** `pdfjs-dist` kullanılarak PDF dosyaları metne dönüştürülür.
  - **Word Desteği:** `mammoth.js` ile `.docx` ve `.doc` dosyaları işlenir.
- **🤖 Çift Katmanlı Analiz:**
  - **ATS Simülasyonu:** CV'nizin robotlar tarafından okunabilirliğini, anahtar kelime yoğunluğunu ve teknik yapısını analiz eder.
  - **İK Uzmanı Görüşü:** Yapay zeka, deneyimli bir İK uzmanı rolüne bürünerek içeriğin kalitesini, dil kullanımını ve etkileyiciliğini yorumlar.
- **📊 Detaylı Puanlama Sistemi:** 0-100 arasında "Genel Başarı Puanı" ve "ATS Uyumluluk Puanı" verir.
- **💡 Akıllı Tavsiyeler:**
  - Güçlü ve zayıf yönlerin tespiti.
  - Eksik anahtar kelimelerin (örn: _Docker, Agile, React_) belirlenmesi.
  - Eksik bölümlerin (örn: _Projeler, Yabancı Dil_) raporlanması.
- **⚡ Modern ve Hızlı Arayüz:** React 19, TypeScript ve Tailwind CSS ile geliştirilmiş, sürükle-bırak destekli kullanıcı deneyimi.

## 🛠️ Teknoloji Yığını

- **Frontend:** [React 19](https://react.dev/) + [Vite](https://vitejs.dev/)
- **Dil:** [TypeScript](https://www.typescriptlang.org/) (Tip güvenliği ve geliştirme hızı için)
- **Stil:** [Tailwind CSS](https://tailwindcss.com/)
- **Yapay Zeka:** [OpenAI API](https://openai.com/) (GPT-4o-mini Modeli)
- **Dosya İşleme:** `pdfjs-dist` & `mammoth`
- **İkon Seti:** `lucide-react`

## 🚀 Kurulum ve Çalıştırma

Projeyi yerel makinenizde çalıştırmak için aşağıdaki adımları izleyin:

### 1. Projeyi Klonlayın

```bash
git clone https://github.com/enesdolgun10/ai-cv-analyzer.git
cd ai-cv-analyzer
2. Bağımlılıkları Yükleyin

npm install

3. Çevre Değişkenlerini Ayarlayın (Önemli!)
Ana dizinde .env adında bir dosya oluşturun. İçerisine OpenAI API anahtarınızı aşağıdaki değişken adıyla ekleyin. (Not: Kod içerisinde import.meta.env.VITE_API_KEY kullanıldığı için değişken adı tam olarak böyle olmalıdır.)

VITE_API_KEY=sk-proj-Sizin-OpenAI-Api-Anahtariniz...

4. Uygulamayı Başlatın

npm run dev

Tarayıcınızda http://localhost:5173 adresine giderek uygulamayı kullanmaya başlayabilirsiniz.


📂 Proje Yapısı
src/
├── components/          # UI Bileşenleri
│   ├── AnalysisResult.tsx # Sonuçların gösterildiği detaylı rapor ekranı
│   └── FileUpload.tsx     # Sürükle-bırak dosya yükleme alanı
├── lib/                 # Yardımcı Kütüphaneler ve İş Mantığı
│   ├── ai-client.ts       # OpenAI API bağlantısı ve Prompt yönetimi
│   ├── pdf-worker.ts      # PDF metin ayrıştırma işlemleri
│   └── word-worker.ts     # Word (.docx) metin ayrıştırma işlemleri
├── types/               # TypeScript Tip Tanımları
├── App.tsx              # Ana uygulama konteyneri
└── main.tsx             # React giriş noktası



🤝 Katkıda Bulunma
Katkılarınızı bekliyoruz! Lütfen şu adımları izleyin:

Bu repoyu Fork'layın.

Yeni bir özellik dalı (feature branch) oluşturun (git checkout -b feature/YeniOzellik).

Değişikliklerinizi yapın ve Commit'leyin (git commit -m 'Yeni özellik eklendi').

Dalınızı Push'layın (git push origin feature/YeniOzellik).

Bir Pull Request oluşturun.


