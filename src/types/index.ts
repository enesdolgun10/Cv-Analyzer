export interface AnalysisResult {
  score: number;          // Genel İçerik Puanı
  atsScore: number;       // ATS (Robot) Okunabilirlik Puanı
  summary: string;
  strengths: string[];
  weaknesses: string[];
  suggestions: string[];
  // Yeni ATS Özellikleri:
  keywordsFound: string[];   // CV'de bulunan teknik terimler
  missingKeywords: string[]; // Olması gereken ama bulunamayan terimler
  missingSections: string[]; // Eksik bölümler (Örn: Hobiler, Projeler)
}