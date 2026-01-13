import { today } from "../todayDate";
import { currentTime } from "../Time";
import { Trash2, Zap, Tag } from "lucide-react";

const SoftShadow = ({
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

  const getSubtotal = () => {
    return items.reduce((acc, item) => acc + item.price * item.count, 0);
  };

  const getTotalDiscountValue = () => {
    return items.reduce((acc, item) => {
      const discPercent = (parseFloat(item.discount) || 0) / 100;
      return acc + item.price * item.count * discPercent;
    }, 0);
  };

  const subtotal = getSubtotal();
  const totalDiscount = getTotalDiscountValue();
  const grandTotal = subtotal - totalDiscount;

  return (
    <>
      {/* Main Invoice Card */}
      <div className="bg-white rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-white overflow-hidden">
        {/* Top Decorative Bar */}
        <div className="h-2 w-full bg-linear-to-r from-blue-600 via-indigo-500 to-purple-500" />

        <div className="p-8">
          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-start gap-6">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="bg-blue-600 p-2 rounded-xl">
                  <Zap size={24} className="text-white" fill="white" />
                </div>
                <h1 className="text-2xl font-black text-slate-800 tracking-tight uppercase">
                  Soft-Flow
                </h1>
              </div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">
                Billing From
              </p>
              <h2 className="text-lg font-bold text-slate-700">
                {sellerName || "Authorized Seller"}
              </h2>
            </div>

            <div className="text-right">
              <div className="bg-slate-100 px-4 py-2 rounded-2xl inline-block mb-4">
                <span className="text-xs font-bold text-slate-500 uppercase">
                  Invoice #
                </span>
                <span className="ml-2 font-mono font-bold text-blue-600">
                  {invoiceId}
                </span>
              </div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">
                Billed To
              </p>
              <h2 className="text-lg font-bold text-slate-700">
                {customerName || "Valued Customer"}
              </h2>
            </div>
          </div>

          {/* Table Section */}
          <div className="mt-12 overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-slate-400 text-[11px] uppercase tracking-[0.2em] border-b border-slate-100">
                  <th className="pb-4 font-bold text-left px-2">Description</th>
                  <th className="pb-4 font-bold text-center">Qty</th>
                  <th className="pb-4 font-bold text-center">Price</th>
                  <th className="pb-4 font-bold text-center">Disc.</th>
                  <th className="pb-4 font-bold text-right px-2">Amount</th>
                  <th className="pb-4 w-10"></th>
                </tr>
              </thead>
              <tbody>
                {items.map((item, index) => {
                  const discVal = (parseFloat(item.discount) || 0) / 100;
                  const rowTotal = item.price * item.count * (1 - discVal);
                  return (
                    <tr
                      key={index}
                      className="group border-b border-slate-50 hover:bg-slate-50/50 transition-colors"
                    >
                      <td className="py-6 px-2">
                        <p className="font-bold text-slate-700 uppercase text-sm">
                          {item.itemName}
                        </p>
                        <p className="text-[10px] text-slate-400 mt-0.5 tracking-wide">
                          ITEM ID: {index + 1}
                        </p>
                      </td>
                      <td className="py-6 text-center font-semibold text-slate-600">
                        {item.count}
                      </td>
                      <td className="py-6 text-center font-semibold text-slate-600">
                        ${item.price}
                      </td>
                      <td className="py-6 text-center">
                        <span className="bg-red-50 text-red-500 px-2 py-1 rounded-lg text-[10px] font-black uppercase">
                          {item.discount}
                        </span>
                      </td>
                      <td className="py-6 text-right px-2 font-bold text-slate-800">
                        ${rowTotal.toFixed(2)}
                      </td>
                      <td className="py-6 text-right">
                        <button
                          onClick={() => deleteItem(index)}
                          className="opacity-0 group-hover:opacity-100 p-2 text-slate-300 hover:text-red-500 transition-all"
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
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 bg-slate-50 rounded-3xl p-8 gap-8 items-center border border-slate-100">
            {/* Detailed Totals */}
            <div className="space-y-3">
              <div className="flex justify-between text-sm font-medium">
                <span className="text-slate-500">Subtotal</span>
                <span className="text-slate-700">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm font-medium">
                <span className="text-slate-500 flex items-center gap-1">
                  Total Discount <Tag size={12} className="text-red-400" />
                </span>
                <span className="text-red-500">
                  -${totalDiscount.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between items-center pt-3 border-t border-slate-200">
                <span className="text-slate-900 font-black uppercase text-xs tracking-widest">
                  Grand Total
                </span>
                <span className="text-3xl font-black text-blue-600 tracking-tighter">
                  ${grandTotal.toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-center">
          <div className="text-center border-t border-gray-100 pt-5">
            <p className="text-[10px] text-gray-400 uppercase tracking-widest leading-relaxed">
              Invoice Generated on • {today} • {currentTime}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default SoftShadow;
