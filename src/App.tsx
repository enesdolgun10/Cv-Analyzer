import { useState } from 'react';
import { FileUpload } from './components/FileUpload';
import { AnalysisResult } from './components/AnalysisResult';
import { extractTextFromPDF } from './lib/pdf-worker';
import { extractTextFromWord } from './lib/word-worker';
import { analyzeCVWithAI } from './lib/ai-client';
import type { AnalysisResult as AnalysisResultType } from './types';

function App() {
  const [file, setFile] = useState<File | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<AnalysisResultType | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFileSelect = (selectedFile: File) => {
    setFile(selectedFile);
    setResult(null); // Yeni dosya seçilince eski sonucu temizle
    setError(null);
  };

  const handleAnalyze = async () => {
    if (!file) return;

    setIsAnalyzing(true);
    setError(null);

    try {
      let text = "";

      // Dosya türüne göre doğru okuyucuyu seç
      if (file.type === "application/pdf") {
        console.log("PDF okunuyor...");
        text = await extractTextFromPDF(file);
      } else if (
        file.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
        file.type === "application/msword"
      ) {
        console.log("Word dosyası okunuyor...");
        text = await extractTextFromWord(file);
      } else {
        throw new Error("Desteklenmeyen dosya formatı!");
      }

      console.log("Metin uzunluğu:", text.length);

      if (text.length < 50) {
        throw new Error("Dosyadan yeterli metin okunamadı. Lütfen içeriği kontrol et.");
      }

      console.log("AI analizi başlıyor...");
      const aiResponse = await analyzeCVWithAI(text);

      setResult(aiResponse);

    } catch (err: any) {
      console.error(err);
      setError(err.message || "Analiz sırasında bir hata oluştu.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans pb-20">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 py-6 sticky top-0 z-10 shadow-sm">
        <div className="max-w-5xl mx-auto px-6">
          <h1 className="text-2xl font-bold text-indigo-600 flex items-center gap-2">
            AI CV Analizörü 🚀
          </h1>
        </div>
      </header>

      {/* Ana İçerik */}
      <main className="max-w-5xl mx-auto px-6 py-12">
        <div className="flex flex-col gap-10">

          <div className="text-center space-y-2">
            <h2 className="text-3xl font-bold text-gray-800">CV'niz ne kadar güçlü?</h2>
            <p className="text-gray-500">Yapay zeka destekli analiz ile saniyeler içinde öğrenin.</p>
          </div>

          {/* Bölüm 1: Dosya Yükleme */}
          <FileUpload
            onFileSelect={handleFileSelect}
            isAnalyzing={isAnalyzing}
          />

          {/* Hata Mesajı */}
          {error && (
            <div className="p-4 bg-red-50 text-red-700 border border-red-200 rounded-lg text-center">
              {error}
            </div>
          )}

          {/* Bölüm 2: Analiz Butonu */}
          {file && !result && (
            <div className="flex justify-center">
              <button
                onClick={handleAnalyze}
                disabled={isAnalyzing}
                className="px-8 py-4 bg-indigo-600 text-white font-bold text-lg rounded-full shadow-xl hover:bg-indigo-700 disabled:opacity-70 disabled:cursor-not-allowed transition-transform transform hover:scale-105 active:scale-95"
              >
                {isAnalyzing ? (
                  <span className="flex items-center gap-2">
                    <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Analiz Ediliyor...
                  </span>
                ) : (
                  "Analizi Başlat ✨"
                )}
              </button>
            </div>
          )}

          {/* Bölüm 3: Sonuç Ekranı */}
          {result && (
            <div className="mt-8">
              <AnalysisResult data={result} />
              <div className="text-center mt-8">
                <button
                  onClick={() => { setFile(null); setResult(null); }}
                  className="text-indigo-600 font-medium hover:underline"
                >
                  Yeni Bir Analiz Yap
                </button>
              </div>
            </div>
          )}

        </div>
      </main>
    </div>
  );
}

export default App;