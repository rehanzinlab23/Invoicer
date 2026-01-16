import { jsPDF } from "jspdf";
import { toPng } from "html-to-image";

export const downloadPDF = async (element) => {
  if (!element) return;

  try {
    const dataUrl = await toPng(element, { quality: 1.0, pixelRatio: 3 });

    const imgProps = await new Promise((resolve) => {
      const img = new Image();
      img.onload = () => resolve({ width: img.width, height: img.height });
      img.src = dataUrl;
    });

    const pdf = new jsPDF({
      orientation: imgProps.width > imgProps.height ? "l" : "p",
      unit: "px",
      format: [imgProps.width, imgProps.height],
    });

    pdf.addImage(dataUrl, "PNG", 0, 0, imgProps.width, imgProps.height);
    pdf.save("invoice.pdf");
  } catch (err) {
    console.error("Error generating PDF:", err);
  }
};
