import { today } from "../todayDate";
import { currentTime } from "../Time";
import { Trash2, ShoppingBag, Sparkles } from "lucide-react";

const Elegant = ({ items, setItems, sellerName, customerName, invoiceId }) => {
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
    <div className="font-serif">
      <div className="max-w-4xl mx-auto bg-white shadow-[0_20px_50px_rgba(0,0,0,0.05)] rounded-2xl overflow-hidden border border-orange-50/50 relative">
        <div className="h-1.5 w-full bg-linear-to-r from-slate-100 via-blue-200 to-slate-100" />

        <div className="p-10 sm:p-16">
          {/* Header Section */}
          <div className="flex flex-col sm:flex-row justify-between items-start mb-16 border-b border-slate-50 pb-10">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-blue-400 mb-1">
                <Sparkles size={18} />
                <span className="text-[10px] uppercase tracking-[0.3em] font-sans font-bold">
                  Premium Service
                </span>
              </div>
              <h1 className="text-5xl font-light text-slate-900 tracking-tight">
                Invoice
              </h1>
              <p className="text-sm font-sans text-slate-400 font-medium tracking-wide">
                REF: <span className="text-slate-900">#INV-{invoiceId}</span>
              </p>
            </div>

            <div className="mt-8 sm:mt-0 text-right font-sans">
              <p className="text-[10px] uppercase tracking-widest text-slate-400 mb-1">
                Issue Date
              </p>
              <p className="text-slate-900 font-semibold">{today}</p>
              <p className="text-[10px] text-slate-400 mt-1">{currentTime}</p>
            </div>
          </div>

          {/* Client Details Section */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-12 mb-16 px-2">
            <div className="group">
              <p className="text-[10px] uppercase tracking-[0.2em] text-blue-500 font-bold mb-3">
                Issued By
              </p>
              <h3 className="text-xl font-medium text-slate-800 border-l-2 border-slate-100 pl-4 group-hover:border-blue-200 transition-colors">
                {sellerName || "Elite Merchant"}
              </h3>
            </div>
            <div className="group">
              <p className="text-[10px] uppercase tracking-[0.2em] text-blue-500 font-bold mb-3">
                Billed To
              </p>
              <h3 className="text-xl font-medium text-slate-800 border-l-2 border-slate-100 pl-4 group-hover:border-blue-200 transition-colors">
                {customerName || "Valued Customer"}
              </h3>
            </div>
          </div>

          {/* Table Section */}
          <div className="mb-10 overflow-hidden rounded-xl border border-slate-50 shadow-sm">
            <table className="w-full border-collapse font-sans">
              <thead>
                <tr className="bg-slate-50/50">
                  <th className="py-5 px-6 text-left text-[11px] font-bold text-slate-500 uppercase tracking-widest border-b border-slate-100">
                    Description
                  </th>
                  <th className="py-5 px-6 text-center text-[11px] font-bold text-slate-500 uppercase tracking-widest border-b border-slate-100">
                    Qty
                  </th>
                  <th className="py-5 px-6 text-right text-[11px] font-bold text-slate-500 uppercase tracking-widest border-b border-slate-100">
                    Price
                  </th>
                  <th className="py-5 px-6 text-right text-[11px] font-bold text-slate-500 uppercase tracking-widest border-b border-slate-100">
                    Disc.
                  </th>
                  <th className="py-5 px-6 text-right text-[11px] font-bold text-slate-500 uppercase tracking-widest border-b border-slate-100">
                    Amount
                  </th>
                  <th className="py-5 px-4 w-10 border-b border-slate-100 print:hidden"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {items.map((item, index) => {
                  const discountValue = (parseFloat(item.discount) || 0) / 100;
                  const itemTotal =
                    item.price * item.count * (1 - discountValue);
                  return (
                    <tr
                      key={index}
                      className="group hover:bg-slate-50/30 transition-all"
                    >
                      <td className="py-6 px-6">
                        <div className="font-bold text-slate-800 uppercase text-[13px] tracking-wide">
                          {item.itemName}
                        </div>
                        <div className="text-[10px] text-slate-400 mt-1 uppercase tracking-tighter">
                          Item #{index + 1}
                        </div>
                      </td>
                      <td className="py-6 px-6 text-center text-slate-600 font-medium">
                        {item.count}
                      </td>
                      <td className="py-6 px-6 text-right text-slate-600">
                        ${item.price}
                      </td>
                      <td className="py-6 px-6 text-right text-blue-500 font-bold italic">
                        -{item.discount}
                      </td>
                      <td className="py-6 px-6 text-right text-slate-900 font-bold">
                        ${itemTotal.toFixed(2)}
                      </td>
                      <td className="py-6 px-4 text-right print:hidden">
                        <button
                          onClick={() => deleteItem(index)}
                          className="opacity-0 group-hover:opacity-100 transition-opacity p-2 hover:bg-red-50 rounded-full"
                        >
                          <Trash2 size={14} className="text-red-400" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>

            {items.length === 0 && (
              <div className="py-20 text-center bg-white">
                <ShoppingBag
                  className="mx-auto text-slate-200 mb-3"
                  size={32}
                />
                <p className="text-slate-400 text-xs font-sans font-medium tracking-widest uppercase">
                  Waiting for items...
                </p>
              </div>
            )}
          </div>

          {/* Totals Section */}
          <div className="flex justify-end pr-2">
            <div className="w-full sm:w-72 font-sans">
              <div className="flex justify-between py-3 text-sm border-b border-slate-50">
                <span className="text-slate-400 font-medium">Subtotal</span>
                <span className="text-slate-800 font-semibold">
                  ${SubTotal()}
                </span>
              </div>
              <div className="flex justify-between py-3 text-sm border-b border-slate-50">
                <span className="text-slate-400 font-medium">
                  Total Discount
                </span>
                <span className="text-blue-500 font-bold">
                  {TotalDiscount()}%
                </span>
              </div>
              <div className="flex justify-between py-6 items-center">
                <span className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-900">
                  Total Due
                </span>
                <span className="text-3xl font-light text-slate-900 tracking-tighter">
                  ${calculateTotal()}
                </span>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="pt-10 border-t border-slate-50">
            <div className="flex flex-col items-center gap-6">
              <div className="w-120 h-px bg-slate-100" />
              <p className="text-[9px] text-slate-300 font-sans font-bold uppercase tracking-[0.3em]">
                System Log: {today} | {currentTime}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Elegant;
