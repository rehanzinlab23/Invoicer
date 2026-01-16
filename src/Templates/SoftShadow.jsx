import { today } from "../todayDate";
import { currentTime } from "../Time";
import { Trash2, Zap, Tag, ShoppingCart } from "lucide-react";

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
      <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.05)] dark:shadow-[0_20px_50px_rgba(255,255,255,0.05)] border border-white dark:border-gray-800 overflow-hidden">
        <div className="h-2 w-full bg-linear-to-r from-blue-600 via-indigo-500 to-purple-500" />
        <div className="p-8">
          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-start gap-6">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="bg-blue-600 p-2 rounded-xl">
                  <Zap size={24} className="text-white" fill="white" />
                </div>
                <h1 className="text-2xl font-black text-slate-800 dark:text-slate-100 tracking-tight uppercase">
                  Soft-Shadow
                </h1>
              </div>
              <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em]">
                Billing From
              </p>
              <h2 className="text-lg font-bold text-slate-700 dark:text-slate-300">
                {sellerName || "Seller Name"}
              </h2>
            </div>
            <div className="text-right">
              <div className="bg-slate-100 dark:bg-slate-800 px-4 py-2 rounded-2xl inline-block mb-4">
                <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase">
                  Invoice #
                </span>
                <span className="ml-2 font-mono font-bold text-blue-600 dark:text-blue-400">
                  {invoiceId}
                </span>
              </div>
              <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em]">
                Billed To
              </p>
              <h2 className="text-lg font-bold text-slate-700 dark:text-slate-300">
                {customerName || "Valued Customer"}
              </h2>
            </div>
          </div>
          {/* Table Section */}
          <div className="overflow-x-auto max-w-75 sm:max-w-full">
            <table className="text-sm border-collapse mt-4">
              <thead>
                <tr className="text-slate-400 dark:text-slate-500 text-[11px] uppercase tracking-[0.2em] border-b border-slate-100 dark:border-slate-800">
                  <th className="p-4 font-bold px-2">Description</th>
                  <th className="p-4 font-bold">Qty</th>
                  <th className="p-4 font-bold">Price</th>
                  <th className="p-4 font-bold">Discount</th>
                  <th className="p-4 font-bold px-2">Total</th>
                  <th className="p-4 w-10"></th>
                </tr>
              </thead>
              <tbody>
                {items.map((item, index) => {
                  const discVal = (parseFloat(item.discount) || 0) / 100;
                  const rowTotal = item.price * item.count * (1 - discVal);
                  return (
                    <tr
                      key={index}
                      className="group border-b border-slate-50 dark:border-slate-800 hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-colors"
                    >
                      <td className="py-6 px-2">
                        <p className="font-bold text-slate-700 dark:text-slate-200 uppercase text-sm">
                          {item.itemName}
                        </p>
                        <p className="text-[10px] text-slate-400 dark:text-slate-500 mt-0.5 tracking-wide">
                          ITEM #{index + 1}
                        </p>
                      </td>
                      <td className="py-6 text-center font-semibold text-slate-600 dark:text-slate-300">
                        {item.count}
                      </td>
                      <td className="py-6 text-center font-semibold text-slate-600 dark:text-slate-300">
                        ${item.price}
                      </td>
                      <td className="py-6 text-center">
                        <span className="bg-red-50 dark:bg-red-900/50 text-red-500 px-2 py-1 rounded-lg text-[10px] font-black uppercase">
                          {item.discount}
                        </span>
                      </td>
                      <td className="py-6 text-right px-2 font-bold text-slate-800 dark:text-slate-100">
                        ${rowTotal.toFixed(2)}
                      </td>
                      <td className="py-6 text-right">
                        <button
                          onClick={() => deleteItem(index)}
                          className="opacity-0 group-hover:opacity-100 p-2 text-slate-300 dark:text-slate-600 hover:text-red-500 transition-all"
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
          {items.length === 0 && (
            <div className="py-20 text-center border-2 border-dashed border-gray-100 dark:border-gray-800 rounded-xl mt-6">
              <ShoppingCart
                className="mx-auto text-blue-400 dark:text-blue-700 mb-2"
                size={48}
              />
              <p className="text-white-400 dark:text-white-600 font-Outfit font-bold uppercase text-xs tracking-widest">
                No Items Found
              </p>
            </div>
          )}
          {/* Calculations */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 bg-slate-50 dark:bg-slate-800/50 rounded-3xl p-8 gap-8 items-center border border-slate-100 dark:border-slate-800">
            <div className="space-y-3">
              <div className="flex justify-between text-sm sm:text-xs font-medium">
                <span className="text-slate-500 dark:text-slate-400">
                  Subtotal
                </span>
                <span className="text-slate-700 dark:text-slate-300">
                  ${subtotal.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between text-sm sm:text-xs font-medium">
                <span className="text-slate-500 dark:text-slate-400 flex items-center gap-1">
                  Total Discount <Tag size={12} className="text-red-400" />
                </span>
                <span className="text-red-500">
                  -${totalDiscount.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between items-center pt-3 border-t border-slate-200 dark:border-slate-700">
                <span className="text-slate-900 dark:text-slate-100 font-black uppercase text-xs sm:text-[10px] tracking-widest">
                  Grand Total
                </span>
                <span className="text-3xl sm:text-2xl font-black text-blue-600 dark:text-blue-400 tracking-tighter">
                  ${grandTotal.toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        </div>
        {/* Footer */}
        <div className="flex items-center justify-center pb-8">
          <div className="text-center border-t border-gray-100 dark:border-gray-800 pt-5 w-full mx-8">
            <p className="text-[10px] text-gray-400 dark:text-gray-500 uppercase tracking-widest leading-relaxed">
              Invoice Generated on • {today} • {currentTime}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default SoftShadow;
