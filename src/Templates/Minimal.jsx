import { today } from "../todayDate";
import { currentTime } from "../Time";
import { ShoppingCart, Trash2 } from "lucide-react";

const Minimal = ({ items, setItems, sellerName, customerName, invoiceId }) => {
  const deleteItem = (index) => {
    const updatedItems = [...items];
    updatedItems.splice(index, 1);
    setItems(updatedItems);
  };

  const calculateTotalDiscount = () => {
    return items.reduce((acc, item) => {
      const discPercent = (parseFloat(item.discount) || 0) / 100;
      return acc + item.price * item.count * discPercent;
    }, 0);
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
    <div className="bg-white dark:bg-gray-900 p-8 sm:p-16 font-sans text-slate-900 dark:text-slate-100">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-start mb-20">
          <div className="space-y-1">
            <h1 className="text-4xl font-bold tracking-tighter uppercase">
              Invoice
            </h1>
            <p className="text-sm font-medium text-slate-400 dark:text-slate-500">
              #{invoiceId}
            </p>
          </div>
          <div className="text-right">
            <p className="text-sm font-bold uppercase tracking-widest">
              {today}
            </p>
            <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">
              {currentTime}
            </p>
          </div>
        </div>
        {/* Customer Name */}
        <div className="grid grid-cols-2 gap-12 mb-20">
          <div className="space-y-2">
            <p className="text-[10px] font-black uppercase text-slate-400 dark:text-slate-500 tracking-[0.2em]">
              From
            </p>
            <h2 className="text-lg font-bold">{sellerName || "Seller Name"}</h2>
          </div>
          <div className="space-y-2 text-right">
            <p className="text-[10px] font-black uppercase text-slate-400 dark:text-slate-500 tracking-[0.2em]">
              Billed To
            </p>
            <h2 className="text-lg font-bold">
              {customerName || "Customer Name"}
            </h2>
          </div>
        </div>
        {/* Table Section */}
        <div className="overflow-x-auto max-w-75 sm:max-w-full">
          <table className="text-sm border-collapse mt-4">
            <thead>
              <tr className="border-b-2 border-slate-900 dark:border-slate-200">
                <th className="p-4 text-[11px] font-black uppercase tracking-widest">
                  Description
                </th>
                <th className="p-4 text-[11px] font-black uppercase tracking-widest">
                  Qty
                </th>
                <th className="p-4 text-[11px] font-black uppercase tracking-widest">
                  Price
                </th>
                <th className="p-4 text-[11px] font-black uppercase tracking-widest">
                  Discount
                </th>
                <th className="p-4 text-[11px] font-black uppercase tracking-widest">
                  Total
                </th>
                <th className="p-4 w-8 print:hidden"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {items.map((item, index) => {
                const discountValue = (parseFloat(item.discount) || 0) / 100;
                const total = item.price * item.count * (1 - discountValue);
                return (
                  <tr
                    key={index}
                    className="group hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-colors"
                  >
                    <td className="py-6 pr-4">
                      <div className="font-bold text-sm uppercase tracking-tight">
                        {item.itemName}
                      </div>
                      <div className="text-[10px] text-slate-400 dark:text-slate-500 mt-0.5">
                        ITEM #{index + 1}
                      </div>
                    </td>
                    <td className="py-6 px-2 text-center text-sm font-medium text-slate-600 dark:text-slate-300">
                      {item.count}
                    </td>
                    <td className="py-6 px-2 text-right text-sm font-medium text-slate-600 dark:text-slate-300">
                      ${item.price}
                    </td>
                    <td className="py-6 px-2 text-right text-sm font-bold text-red-600">
                      {item.discount}
                    </td>
                    <td className="py-6 pl-4 text-right text-sm font-black">
                      ${total.toFixed(2)}
                    </td>
                    <td className="py-6 pl-4 text-right print:hidden">
                      <button
                        onClick={() => deleteItem(index)}
                        className="opacity-0 group-hover:opacity-100 text-slate-300 dark:text-slate-600 hover:text-red-500 transition-all"
                      >
                        <Trash2 size={14} />
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
              className="mx-auto text-gray-200 dark:text-gray-700 mb-2"
              size={48}
            />
            <p className="text-gray-400 dark:text-gray-600 font-bold uppercase text-xs tracking-widest">
              No Items Found
            </p>
          </div>
        )}
        {/* Calculation */}
        <div className="flex justify-end mt-16">
          <div className="w-full sm:w-64 space-y-4">
            <div className="flex justify-between text-xs font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500">
              <span>Subtotal</span>
              <span className="text-slate-900 dark:text-slate-200">
                ${SubTotal()}
              </span>
            </div>
            <div className="flex justify-between text-xs font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500">
              <span>Discount</span>
              <span className="text-red-600">-{calculateTotalDiscount()}%</span>
            </div>
            <div className="pt-6 border-t border-slate-200 dark:border-slate-700 flex justify-between items-end">
              <span className="text-[10px] font-black uppercase tracking-[0.3em]">
                Total Amount
              </span>
              <span className="text-4xl font-black tracking-tighter">
                ${calculateTotal()}
              </span>
            </div>
          </div>
        </div>
        {/* Footer */}
        <div className="mt-12 text-center border-t border-gray-200 dark:border-gray-800 pt-6 w-full">
          <p className="text-[10px] text-gray-400 dark:text-gray-500 uppercase tracking-[0.2em] font-medium leading-relaxed">
            Invoice Generated on {today} • {currentTime}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Minimal;
