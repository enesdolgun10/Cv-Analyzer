import mammoth from 'mammoth';

export const extractTextFromWord = async (file: File): Promise<string> => {
  try {
    const arrayBuffer = await file.arrayBuffer();
    
    // Mammoth ile raw text (ham metin) çıkarıyoruz
    const result = await mammoth.extractRawText({ arrayBuffer });
    
    return result.value; // Çıkarılan temiz metin
  } catch (error) {
    console.error("Word dosyası okunamadı:", error);
    throw new Error("Word dosyası metne çevrilirken hata oluştu.");
  }
};