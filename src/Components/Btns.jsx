import { downloadPDF } from "../Components/Download";
import { Download, Printer } from "lucide-react";

const Btns = ({ invoiceRef }) => {
  return (
    <div className="p-6 pt-0">
      <div className="flex  gap-4 mt-1 pt-4">
        <button
          onClick={() => downloadPDF(invoiceRef.current)}
          className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium cursor-pointer bg-black text-white hover:bg-black/80 h-10 px-4 py-2"
        >
          <Download
            size={20}
            color="#ffffff"
            strokeWidth={2.5}
            className="mr-2"
          />
          Download Bill
        </button>

        <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium cursor-pointer bg-black text-white hover:bg-black/80 h-10 px-4 py-2">
          <Printer
            size={20}
            color="#ffffff"
            strokeWidth={2.5}
            className="mr-2"
          />
          Print Bill
        </button>
      </div>
    </div>
  );
};

export default Btns;
