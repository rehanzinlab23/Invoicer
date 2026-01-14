import Btns from "./Btns";
import Line from "./Line";
import { Settings } from "lucide-react";

const InvoiceActions = ({
  invoiceRef,
  handleNewInvoice,
  toggleSavedInvoices,
}) => {
  return (
    <div className="mt-10 mb-8 px-4 w-full">
      <div className="mx-auto max-w-5xl overflow-hidden rounded-[32px] border dark:border-white/10 border-black/10 bg-white/40 dark:bg-slate-900/40 backdrop-blur-2xl shadow-2xl">
        <div className="p-6 sm:p-10">
          {/* Header Section */}
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 bg-slate-900 dark:bg-white rounded-2xl flex items-center justify-center shadow-lg">
              <Settings
                size={22}
                className="text-white dark:text-slate-900"
              />
            </div>
            <div>
              <h3 className="text-2xl font-black text-slate-900 dark:text-white uppercase tracking-tighter leading-none">
                Actions
              </h3>
              <p className="text-[10px] font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest mt-1">
                Control Center
              </p>
            </div>
          </div>

          <Line />

          <div className="mt-8 flex flex-col lg:flex-row lg:items-end justify-between gap-8">
            <div className="w-full lg:flex-1">
              <div className="bg-white/40 dark:bg-slate-800/40 p-4 rounded-2xl border dark:border-white/10 border-black/5 shadow-lg">
                <div className="flex flex-wrap gap-3">
                  <Btns
                    invoiceRef={invoiceRef}
                    handleNewInvoice={handleNewInvoice}
                    toggleSavedInvoices={toggleSavedInvoices}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvoiceActions;
