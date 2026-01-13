import { today } from "../todayDate";
import { currentTime } from "../Time";
import { Trash2, Building2, User, Hash, Calendar } from "lucide-react";

const Corporate = ({
  items,
  setItems,
  sellerName,
  customerName,
  invoiceId,
}) => {
  const deleteItem = (index) => {
    const updatedItems = [...items];
    updatedItems.splice(index, 1);
    setItems(updatedItems);
  };

  const TotalDiscount = () => {
    let totalDiscount = 0;
    items.forEach((item) => {
      totalDiscount += parseFloat(item.discount || 0);
    });
    return totalDiscount.toFixed(2);
  };

  const SubTotal = () => {
    let subTotal = 0;
    items.forEach((item) => {
      subTotal += item.price * item.count;
    });
    return subTotal.toFixed(2);
  };

  const calculateTotal = () => {
    let total = 0;
    items.forEach((item) => {
      const discountValue = (parseFloat(item.discount) || 0) / 100;
      const itemTotal = item.price * item.count * (1 - discountValue);
      total += itemTotal;
    });
    return total.toFixed(2);
  };

  return (
    <>
      <div className="max-w-4xl mx-auto bg-white shadow-2xl rounded-sm overflow-hidden border border-slate-200 print:shadow-none print:border-none">
        {/* Top Accent Line */}
        <div className="h-2 bg-[#1e293b]" />

        <div className="p-8 sm:p-12">
          {/* Header Section */}
          <div className="flex flex-col sm:flex-row justify-between items-start mb-12 gap-6">
            <div>
              <h1 className="text-4xl font-black text-[#1e293b] tracking-tighter mb-2">
                INVOICE
              </h1>
              <div className="flex items-center gap-4 text-slate-500 text-sm font-medium">
                <span className="flex items-center gap-1">
                  <Hash size={14} /> {invoiceId}
                </span>
                <span className="flex items-center gap-1">
                  <Calendar size={14} /> {today}
                </span>
              </div>
            </div>
            <div className="bg-slate-900 text-white px-6 py-4 rounded-sm text-right min-w-50">
              <p className="text-[10px] uppercase tracking-[0.2em] opacity-60 mb-1">
                Total Amount
              </p>
              <p className="text-2xl font-bold">${calculateTotal()}</p>
            </div>
          </div>

          {/* Parties Section */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-12">
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-[#1e293b] font-bold text-xs uppercase tracking-widest border-b border-slate-100 pb-2">
                <Building2 size={14} /> From
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900">
                  {sellerName || "Your Company Name"}
                </h3>
                <p className="text-slate-500 text-sm italic">
                  Authorized Seller
                </p>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-[#1e293b] font-bold text-xs uppercase tracking-widest border-b border-slate-100 pb-2">
                <User size={14} /> Billed To
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900">
                  {customerName || "Customer Name"}
                </h3>
                <p className="text-slate-500 text-sm italic">Valued Customer</p>
              </div>
            </div>
          </div>

          {/* Table Section */}
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-slate-50 border-y border-slate-200">
                  <th className="py-4 px-4 text-left text-[11px] font-black text-slate-500 uppercase tracking-wider">
                    Item Details
                  </th>
                  <th className="py-4 px-4 text-center text-[11px] font-black text-slate-500 uppercase tracking-wider">
                    Qty
                  </th>
                  <th className="py-4 px-4 text-right text-[11px] font-black text-slate-500 uppercase tracking-wider">
                    Rate
                  </th>
                  <th className="py-4 px-4 text-right text-[11px] font-black text-slate-500 uppercase tracking-wider">
                    Disc %
                  </th>
                  <th className="py-4 px-4 text-right text-[11px] font-black text-slate-500 uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="py-4 px-4 w-10 print:hidden"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {items.map((item, index) => {
                  const discountValue = (parseFloat(item.discount) || 0) / 100;
                  const itemTotal =
                    item.price * item.count * (1 - discountValue);
                  return (
                    <tr
                      key={index}
                      className="group hover:bg-slate-50/50 transition-colors"
                    >
                      <td className="py-5 px-4">
                        <p className="font-bold text-slate-800 uppercase text-sm">
                          {item.itemName}
                        </p>
                        <p className="text-[10px] text-slate-400 font-medium tracking-wide mt-1">
                          ITEM-{index + 1}
                        </p>
                      </td>
                      <td className="py-5 px-4 text-center font-semibold text-slate-600">
                        {item.count}
                      </td>
                      <td className="py-5 px-4 text-right font-medium text-slate-600">
                        ${item.price}
                      </td>
                      <td className="py-5 px-4 text-right font-bold text-red-600">
                        {item.discount}
                      </td>
                      <td className="py-5 px-4 text-right font-bold text-slate-900">
                        ${itemTotal.toFixed(2)}
                      </td>
                      <td className="py-5 px-4 text-right print:hidden">
                        <button
                          onClick={() => deleteItem(index)}
                          className="text-slate-300 hover:text-red-500 transition-colors p-1"
                        >
                          <Trash2 size={16} />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Summary Section */}
          <div className="mt-10 flex justify-end">
            <div className="w-full sm:w-80 space-y-3">
              <div className="flex justify-between text-sm py-1">
                <span className="text-slate-500 font-medium">Subtotal</span>
                <span className="text-slate-900 font-bold">${SubTotal()}</span>
              </div>
              <div className="flex justify-between text-sm py-1">
                <span className="text-slate-500 font-medium">
                  Total Discount
                </span>
                <span className="text-red-600 font-bold">
                  -{TotalDiscount()}%
                </span>
              </div>
              <div className="pt-4 border-t-2 border-slate-900 flex justify-between items-center">
                <span className="text-base font-black uppercase text-slate-900">
                  Total Amount
                </span>
                <span className="text-2xl font-black text-slate-900 tracking-tight">
                  ${calculateTotal()}
                </span>
              </div>
            </div>
          </div>

          {/* Footer Section */}
          <div className="mt-20 pt-8 border-t border-slate-100 text-center sm:text-left">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="sm:text-right flex flex-col justify-center">
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">
                  Processed on {today} At {currentTime}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Corporate;
