# 🚀 AI Powered CV Analyzer (Yapay Zeka Destekli CV Analizörü)

Bu proje, iş arayanların CV'lerini saniyeler içinde analiz ederek hem **İnsan Kaynakları (İK)** gözüyle hem de **Aday Takip Sistemleri (ATS)** robotları gözüyle detaylı bir rapor sunan modern bir web uygulamasıdır.

Kullanıcılar PDF veya Word formatındaki CV'lerini yükler, uygulama **OpenAI (GPT-4o)** altyapısını kullanarak metni analiz eder ve eksikleri, puanı ve anahtar kelime uyumunu görselleştirir.

## 🌟 Öne Çıkan Özellikler

- **📄 Çoklu Format Desteği:** Hem `.pdf` (PDF.js ile) hem de `.docx` (Mammoth.js ile) dosyalarını okuyabilir.
- **🤖 ATS Simülasyonu:** CV'nizin robotlar tarafından okunup okunamadığını, anahtar kelime yoğunluğunu ve teknik uyumluluğunu test eder.
- **👤 İK Uzmanı Görüşü:** Bir insan gözüyle CV'nizin güçlü ve zayıf yönlerini, tasarım hatalarını ve içerik kalitesini yorumlar.
- **📊 Detaylı Puanlama:** 0-100 arası "Genel Puan" ve "ATS Uyumluluk Puanı" verir.
- **⚡ Modern Arayüz:** React, TypeScript ve Tailwind CSS ile geliştirilmiş, sürükle-bırak destekli hızlı bir UI.
- **🧠 Akıllı Tavsiyeler:** Eksik anahtar kelimeleri (örn: React, Docker, Agile) ve eksik bölümleri (örn: Projeler, Yabancı Dil) tespit eder.

## 🛠️ Kullanılan Teknolojiler

- **Frontend:** [React](https://reactjs.org/) + [Vite](https://vitejs.dev/)
- **Dil:** [TypeScript](https://www.typescriptlang.org/) (Tip güvenliği için)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Yapay Zeka:** [OpenAI API](https://openai.com/) (GPT-4o-mini Modeli)
- **Dosya İşleme:**
  - `pdfjs-dist`: PDF metinlerini ayrıştırmak için.
  - `mammoth`: Word (.docx) belgelerini okumak için.
- **İkonlar:** [Lucide React](https://lucide.dev/)

## 🚀 Kurulum ve Çalıştırma

Projeyi yerel makinenizde çalıştırmak için aşağıdaki adımları izleyin:

### 1. Projeyi Klonlayın

```bash
git clone [https://github.com/KULLANICI_ADIN/ai-cv-analyzer.git](https://github.com/KULLANICI_ADIN/ai-cv-analyzer.git)
cd ai-cv-analyzer
2. Gerekli Paketleri Yükleyin
Bash

npm install
3. Çevre Değişkenlerini (Environment Variables) Ayarlayın
Ana dizinde .env adında bir dosya oluşturun ve OpenAI API anahtarınızı ekleyin:

Kod snippet'i

VITE_OPENAI_API_KEY=sk-proj-Sizin-OpenAI-Anahtariniz
4. Uygulamayı Başlatın
Bash

npm run dev
Tarayıcınızda http://localhost:5173 adresine gidin.

📂 Proje Yapısı
src/
├── components/       # UI Bileşenleri (FileUpload, AnalysisResult vb.)
├── lib/              # Mantıksal İşlemler
│   ├── ai-client.ts  # OpenAI API bağlantısı ve Prompt yönetimi
│   ├── pdf-worker.ts # PDF okuma servisi
│   └── word-worker.ts# Word okuma servisi
├── types/            # TypeScript Veri Tipleri (Interface'ler)
├── App.tsx           # Ana Uygulama Mantığı
└── main.tsx          # Giriş Noktası
🔮 Gelecek Planları (Roadmap)
[ ] İş İlanı Eşleştirme: Kullanıcının başvurduğu ilanı yapıştırıp CV ile kıyaslaması.

[ ] PDF Rapor İndirme: Analiz sonucunun PDF olarak çıktısının alınması.

[ ] Geçmiş Analizler: Tarayıcı hafızasında (LocalStorage) eski analizlerin saklanması.

🤝 Katkıda Bulunma
Bu projeyi Fork'layın.

Yeni bir özellik dalı (feature branch) oluşturun (git checkout -b ozellik/YeniOzellik).

Değişikliklerinizi yapın ve Commit'leyin (git commit -m 'Yeni özellik eklendi').

Dalınızı (Branch) Push'layın (git push origin ozellik/YeniOzellik).

Bir Pull Request oluşturun.

Geliştirici: [Senin Adın]

İletişim: [Senin E-posta Adresin veya LinkedIn Linkin]
```
