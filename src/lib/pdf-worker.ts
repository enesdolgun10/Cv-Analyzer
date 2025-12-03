import * as pdfjsLib from 'pdfjs-dist';

// Worker dosyasını CDN'den çekiyoruz (Vite ile en sorunsuz yöntem budur)
pdfjsLib.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjsLib.version}/build/pdf.worker.min.mjs`;

export const extractTextFromPDF = async (file: File): Promise<string> => {
  const arrayBuffer = await file.arrayBuffer();
  const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
  
  let fullText = '';

  // Sayfa sayfa gezip metinleri topluyoruz
  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const textContent = await page.getTextContent();
    const pageText = textContent.items
      // @ts-ignore
      .map((item) => item.str)
      .join(' ');
    
    fullText += `--- Sayfa ${i} ---\n${pageText}\n`;
  }

  return fullText;
};