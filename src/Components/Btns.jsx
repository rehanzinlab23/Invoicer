import { downloadPDF } from "../Components/Download";
import { Download, Printer, FilePlus, Save } from "lucide-react";
import toast from "react-hot-toast";

const Btns = ({ invoiceRef, handleNewInvoice, toggleSavedInvoices }) => {
  const handleNewInvoiceClick = () => {
    handleNewInvoice();
    toast.success("New invoice created successfully!");
  };

  return (
    <div className="flex flex-wrap gap-3">
      <button
        onClick={() => downloadPDF(invoiceRef.current)}
        className="inline-flex items-center justify-center whitespace-nowrap rounded-2xl text-sm font-bold ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 text-white dark:text-slate-900 bg-slate-900 dark:bg-white hover:bg-slate-800 dark:hover:bg-slate-200 h-10 px-6 cursor-pointer"
      >
        <Download size={18} className="mr-2" />
        Download
      </button>

      <button className="inline-flex items-center justify-center whitespace-nowrap rounded-2xl text-sm font-bold ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 text-white dark:text-slate-900 bg-slate-900 dark:bg-white hover:bg-slate-800 dark:hover:bg-slate-200 h-10 px-6 cursor-pointer">
        <Printer size={18} className="mr-2" />
        Print
      </button>
      <button
        onClick={handleNewInvoiceClick}
        className="inline-flex items-center justify-center whitespace-nowrap rounded-2xl text-sm font-bold ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 text-white dark:text-slate-900 bg-slate-900 dark:bg-white hover:bg-slate-800 dark:hover:bg-slate-200 h-10 px-6 cursor-pointer"
      >
        <FilePlus size={18} className="mr-2" />
        New Invoice
      </button>
      <button
        onClick={toggleSavedInvoices}
        className="inline-flex items-center justify-center whitespace-nowrap rounded-2xl text-sm font-bold ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 text-white dark:text-slate-900 bg-slate-900 dark:bg-white hover:bg-slate-800 dark:hover:bg-slate-200 h-10 px-6 cursor-pointer"
      >
        <Save size={18} className="mr-2" />
        Saved Invoices
      </button>
    </div>
  );
};

export default Btns;
