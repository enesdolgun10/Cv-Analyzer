import OpenAI from "openai";
import type { AnalysisResult } from "../types";

const API_KEY = import.meta.env.VITE_API_KEY;

const openai = new OpenAI({
  apiKey: API_KEY,
  dangerouslyAllowBrowser: true 
});

const SYSTEM_PROMPT = `
Sen hem uzman bir İnsan Kaynakları danışmanı hem de teknik bir ATS (Aday Takip Sistemi) yazılımısın.
Verilen CV metnini analiz et. Hem içeriği hem de "makine tarafından okunabilirliği" değerlendir.

Cevabı SADECE şu JSON formatında döndür (Markdown yok):
{
  "score": (0-100 arası Genel Puan),
  "atsScore": (0-100 arası ATS Uyumluluk Puanı - Anahtar kelime yoğunluğu ve yapıya göre),
  "summary": "Aday hakkında 2 cümlelik Türkçe özet",
  "strengths": ["Güçlü yön 1", "Güçlü yön 2"],
  "weaknesses": ["Zayıf yön 1", "Zayıf yön 2"],
  "suggestions": ["Tavsiye 1", "Tavsiye 2"],
  "keywordsFound": ["React", "TypeScript", "Teamwork" gibi metinde geçen önemli teknik/soft yetenekler],
  "missingKeywords": ["Adayın rolüne göre eksik olduğu tahmin edilen 3-4 kritik kelime (Örn: Git, Docker, Agile)"],
  "missingSections": ["Eğer varsa eksik başlıklar (Örn: 'Projeler', 'Yabancı Dil'). Yoksa boş dizi"]
}
`;

export const analyzeCVWithAI = async (cvText: string): Promise<AnalysisResult> => {
  // Test için anahtar kontrolü
  // const API_KEY = "sk-proj-..." // Eğer .env çalışmazsa burayı açarsın
  if (!API_KEY) throw new Error("OpenAI API Key bulunamadı!");

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: `İşte analiz edilecek CV metni:\n${cvText}` },
      ],
      response_format: { type: "json_object" },
    });

    const content = completion.choices[0].message.content;

    if (!content) throw new Error("OpenAI boş cevap döndürdü.");

    return JSON.parse(content);

  } catch (error) {
    console.error("OpenAI Hatası:", error);
    throw new Error("CV analiz edilirken bir sorun oluştu.");
  }
};