import { today } from "../todayDate";
import { currentTime } from "../Time";
import { Trash2, Receipt, ShoppingCart } from "lucide-react";

const StripeEdge = ({
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

  const calculateSubtotal = () => {
    return items.reduce((acc, item) => acc + item.price * item.count, 0);
  };

  const calculateTotalDiscount = () => {
    return items.reduce((acc, item) => {
      const discPercent = (parseFloat(item.discount) || 0) / 100;
      return acc + item.price * item.count * discPercent;
    }, 0);
  };

  const subtotal = calculateSubtotal();
  const discountTotal = calculateTotalDiscount();
  const grandTotal = subtotal - discountTotal;

  return (
    <div className="bg-white flex flex-col font-sans border border-gray-200 shadow-xl overflow-hidden">
      {/* Header Bar */}
      <div className="flex border-b border-gray-100">
        <div className="w-16 bg-slate-900 flex flex-col items-center py-6">
          <Receipt className="text-white" size={24} />
        </div>
        <div className="grow p-8 flex justify-between items-center bg-slate-50">
          <div>
            <h1 className="text-2xl font-black tracking-tight uppercase italic text-slate-900">
              Invoice
            </h1>
            <p className="text-xs font-mono text-slate-400 mt-0.5">
              ID: #INV-{invoiceId}
            </p>
          </div>
          <div className="text-right">
            <h2 className="text-sm font-bold text-slate-800 uppercase tracking-widest">
              {sellerName || "SELLER NAME"}
            </h2>
            <p className="text-[11px] text-slate-500 font-medium">
              {today} • {currentTime}
            </p>
          </div>
        </div>
      </div>

      <div className="p-10 grow">
        {/* Customer Section */}
        <div className="mb-10 border-l-4 border-slate-900 pl-4">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">
            Billed To
          </p>
          <h3 className="text-xl font-bold text-slate-900">
            {customerName || "Valued Customer"}
          </h3>
        </div>

        {/* Table Section */}
        <div className="w-full">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-slate-900 text-[10px] font-black uppercase text-slate-500 tracking-wider">
                <th className="py-3">Description</th>
                <th className="py-3 text-center w-20">Qty</th>
                <th className="py-3 text-right w-28">Price</th>
                <th className="py-3 text-right w-24">Disc.</th>
                <th className="py-3 text-right w-28">Total</th>
                <th className="w-8"></th>
              </tr>
            </thead>
            {items.length > 0 && (
              <tbody className="divide-y divide-gray-50">
                {items.map((item, index) => {
                  const discPercent = (parseFloat(item.discount) || 0) / 100;
                  const rowTotal = item.price * item.count * (1 - discPercent);
                  return (
                    <tr
                      key={index}
                      className="group hover:bg-slate-50/50 transition-colors"
                    >
                      <td className="py-4 font-bold text-slate-700 text-sm uppercase">
                        {item.itemName}
                      </td>
                      <td className="py-4 text-center font-bold text-slate-500 text-sm">
                        {item.count}
                      </td>
                      <td className="py-4 text-right text-slate-600 text-sm">
                        ${item.price.toFixed(2)}
                      </td>
                      <td className="py-4 text-right text-red-500 text-xs italic font-medium">
                        -{item.discount}%
                      </td>
                      <td className="py-4 text-right font-bold text-slate-900 text-sm">
                        ${rowTotal.toFixed(2)}
                      </td>
                      <td className="py-4 text-right">
                        <button
                          onClick={() => deleteItem(index)}
                          className="opacity-0 group-hover:opacity-100 p-1 text-slate-300 hover:text-red-500 transition-all"
                        >
                          <Trash2 size={14} />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            )}
          </table>

          {items.length === 0 && (
            <div className="py-16 text-center border-2 border-dashed border-gray-100 rounded-xl mt-6">
              <ShoppingCart className="mx-auto text-gray-300 mb-2" size={40} />
              <p className="text-gray-400 text-xs font-bold uppercase tracking-widest">
                No items added yet
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Summary Footer */}
      <div className="mt-auto border-t border-slate-100 p-10 bg-slate-50/50">
        <div className="flex flex-col items-center">
          <div className="w-full md:w-72 space-y-2.5">
            <div className="flex justify-between text-xs font-medium">
              <span className="text-slate-500 uppercase tracking-tighter">
                Subtotal
              </span>
              <span className="text-slate-800 font-bold">
                ${subtotal.toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between text-xs font-medium border-b border-slate-200 pb-2">
              <span className="text-slate-500 uppercase tracking-tighter">
                Total Discount
              </span>
              <span className="text-red-500 font-bold">
                -${discountTotal.toFixed(2)}
              </span>
            </div>
            <div className="pt-2 flex justify-between items-center">
              <span className="text-xs font-black uppercase text-slate-900 italic tracking-widest">
                Grand Total
              </span>
              <span className="text-3xl font-black tracking-tight text-slate-900">
                ${grandTotal.toFixed(2)}
              </span>
            </div>
          </div>

          {/* Footer Text */}
          <div className="mt-12 text-center border-t border-gray-200 pt-6 w-full">
            <p className="text-[10px] text-gray-400 uppercase tracking-[0.2em] font-medium leading-relaxed">
              Invoice Generated on {today} • {currentTime}
            </p>
          </div>
        </div>
      </div>
      <div className="h-2 bg-slate-900 w-full" />
    </div>
  );
};

export default StripeEdge;
