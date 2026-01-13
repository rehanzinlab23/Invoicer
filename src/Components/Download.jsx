import { jsPDF } from "jspdf";
import { toPng } from "html-to-image";

export const downloadPDF = async (element) => {
  if (!element) {
    alert("Invoice content not found");
    return;
  }

  try {
    const dataUrl = await toPng(element, {
      quality: 1.0,
      pixelRatio: 2,
      cacheBust: true,
    });

    const pdf = new jsPDF("p", "mm", "a4");
    const pdfWidth = pdf.internal.pageSize.getWidth();

    const imgProps = pdf.getImageProperties(dataUrl);
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

    pdf.addImage(dataUrl, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save("invoice.pdf");
  } catch (err) {
    console.error("Error generating PDF:", err);
    alert("Download failed. Check console for details.");
  }
};
