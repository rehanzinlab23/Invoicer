import Btns from "./Btns";
import Line from "./Line";
import { Settings } from "lucide-react";

const InvoiceActions = ({ invoiceRef }) => {
  return (
    <div className="mt-10 mb-8 px-4 w-full">
      <div className="mx-auto max-w-5xl overflow-hidden rounded-[32px] border border-white/40 bg-white/30 backdrop-blur-2xl shadow-2xl">
        <div className="p-6 sm:p-10">
          {/* Header Section */}
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 bg-slate-900 rounded-2xl flex items-center justify-center shadow-lg">
              <Settings size={22} className="text-white" />
            </div>
            <div>
              <h3 className="text-2xl font-black text-slate-900 uppercase tracking-tighter leading-none">
                Actions
              </h3>
              <p className="text-[10px] font-bold text-blue-600 uppercase tracking-widest mt-1">
                Control Center
              </p>
            </div>
          </div>

          <Line />

          {/* Responsive Layout Container */}
          {/* Mobile pe stack (col), Desktop pe row */}
          <div className="mt-8 flex flex-col lg:flex-row lg:items-end justify-between gap-8">
            {/* Left Side: Buttons */}
            <div className="w-full lg:flex-1">
              <div className="flex flex-wrap gap-3">
                <Btns invoiceRef={invoiceRef} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvoiceActions;
