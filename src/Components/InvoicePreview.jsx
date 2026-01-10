import Line from "./Line";
import InvoiceActions from "./InvoiceActions";
import Classic from "../Templates/Classic";
import { InvoiceTemplateSelect } from "./InvoiceTemplateSelect";

const InvoicePreview = ({ items, setItems, sellerName, customerName }) => {
  return (
    <div className="mt-10">
      <div className="rounded-lg border border-[#e5e7eb] bg-white text-black shadow-sm">
        <div className="flex justify-between items-center space-y-1.5 p-6 pb-4">
          <h3 className="text-2xl font-semibold leading-none tracking-tight uppercase">
            Preview:
          </h3>
          {/* Select */}
          <InvoiceTemplateSelect />
        </div>
        <Line />
        <div className="p-6 pt-0">
          <div id="invoice-content">
            {/* Classic */}
            <Classic
              items={items}
              setItems={setItems}
              sellerName={sellerName}
              customerName={customerName}
            />
          </div>
        </div>
      </div>
      <InvoiceActions />
    </div>
  );
};

export default InvoicePreview;
