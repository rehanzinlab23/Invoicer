import { useState } from "react";
import Line from "./Line";
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
}) => {
  const [selectedTemplate, setSelectedTemplate] = useState("Classic");

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
    <div className="mt-10">
      <div className="rounded-lg border border-[#e5e7eb] bg-white text-black shadow-sm">
        <div className="flex justify-between items-center space-y-1.5 p-6 pb-4">
          <h3 className="text-2xl font-semibold leading-none tracking-tight uppercase">
            Preview:
          </h3>
          {/* Select */}
          <InvoiceTemplateSelect
            value={selectedTemplate}
            onChange={setSelectedTemplate}
          />
        </div>
        <Line />
        <div className="p-6 pt-0">
          <div id="invoice-content">{templates[selectedTemplate]}</div>
        </div>
      </div>
      <InvoiceActions />
    </div>
  );
};

export default InvoicePreview;
