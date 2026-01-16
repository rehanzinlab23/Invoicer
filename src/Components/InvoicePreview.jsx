import { useState, useRef } from "react";
import { Eye } from "lucide-react";
import InvoiceActions from "./InvoiceActions";
import { InvoiceTemplateSelect } from "./InvoiceTemplateSelect";
import Classic from "../Templates/Classic";
import SoftShadow from "../Templates/SoftShadow";
import StripeEdge from "../Templates/StripeEdge";
import Corporate from "../Templates/Corporate";
import Elegant from "../Templates/Elegant";
import Minimal from "../Templates/Minimal";

const InvoicePreview = ({
  items,
  setItems,
  sellerName,
  customerName,
  invoiceId,
  handleNewInvoice,
  toggleSavedInvoices,
}) => {
  const [selectedTemplate, setSelectedTemplate] = useState("Classic");
  const invoiceRef = useRef(null);

  const templates = {
    Classic: (
      <Classic
        items={items}
        setItems={setItems}
        sellerName={sellerName}
        customerName={customerName}
        invoiceId={invoiceId}
      />
    ),
    SoftShadow: (
      <SoftShadow
        items={items}
        setItems={setItems}
        sellerName={sellerName}
        customerName={customerName}
        invoiceId={invoiceId}
      />
    ),
    StripeEdge: (
      <StripeEdge
        items={items}
        setItems={setItems}
        sellerName={sellerName}
        customerName={customerName}
        invoiceId={invoiceId}
      />
    ),
    Corporate: (
      <Corporate
        items={items}
        setItems={setItems}
        sellerName={sellerName}
        customerName={customerName}
        invoiceId={invoiceId}
      />
    ),
    Elegant: (
      <Elegant
        items={items}
        setItems={setItems}
        sellerName={sellerName}
        customerName={customerName}
        invoiceId={invoiceId}
      />
    ),
    Minimal: (
      <Minimal
        items={items}
        setItems={setItems}
        sellerName={sellerName}
        customerName={customerName}
        invoiceId={invoiceId}
      />
    ),
  };

  return (
    <div className="mt-12 max-w-5xl mx-auto px-4 pb-20">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-6 gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <div className="p-2 bg-black dark:bg-white rounded-lg">
              <Eye size={20} className="text-white dark:text-black" />
            </div>
            <h2 className="text-sm font-bold tracking-widest text-gray-500 dark:text-gray-400 uppercase">
              Live Preview
            </h2>
          </div>
          <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white">
            Customize Your <span className="text-blue-500">Template</span>
          </h1>
        </div>

        {/* Template Selector Card */}
        <div className="bg-white dark:bg-slate-800 p-2 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm flex items-center gap-3 w-[85%] sm:w-auto">
          <InvoiceTemplateSelect
            value={selectedTemplate}
            onChange={setSelectedTemplate}
          />
        </div>
      </div>

      {/* Canvas */}
      <div className="relative group">
        <div className="absolute -inset-1 bg-linear-to-r from-gray-200 to-gray-100 dark:from-gray-800 dark:to-gray-900 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
        <div className="relative rounded-2xl border border-gray-200 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-900/50 shadow-2xl overflow-hidden w-[85%] sm:w-auto">
          {/* Top Bar */}
          <div className="flex items-center justify-between px-6 py-3 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-400"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
              <div className="w-3 h-3 rounded-full bg-green-400"></div>
            </div>
            <span className="text-xs font-medium text-gray-400 dark:text-gray-500 italic">
              Template: {selectedTemplate}
            </span>
          </div>
          <div className="p-4 md:p-10 flex justify-center overflow-x-auto">
            <div
              id="invoice-content"
              ref={invoiceRef}
              className="shadow-[0_0_50px_-12px_rgba(0,0,0,0.15)] dark:shadow-[0_0_50px_-12px_rgba(255,255,255,0.05)] min-w-full md:min-w-175 scale-[0.85] md:scale-100 origin-top transform transition-transform duration-300"
            >
              {templates[selectedTemplate]}
            </div>
          </div>
        </div>
      </div>
      <div className="mt-8">
        <InvoiceActions
          invoiceRef={invoiceRef}
          handleNewInvoice={handleNewInvoice}
          toggleSavedInvoices={toggleSavedInvoices}
        />
      </div>
    </div>
  );
};

export default InvoicePreview;
