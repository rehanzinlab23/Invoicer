import { today } from "../todayDate";
import { Trash2, ShoppingCart, ReceiptText, Tag } from "lucide-react";
import { currentTime } from "../Time";

const Classic = ({ items, setItems, sellerName, customerName, invoiceId }) => {
  const deleteItem = (index) => {
    const updatedItems = [...items];
    updatedItems.splice(index, 1);
    setItems(updatedItems);
  };

  const getSubtotal = () => {
    return items.reduce((acc, item) => acc + item.price * item.count, 0);
  };

  const getTotalDiscountAmount = () => {
    return items.reduce((acc, item) => {
      const discPercent = (parseFloat(item.discount) || 0) / 100;
      return acc + item.price * item.count * discPercent;
    }, 0);
  };

  const subtotal = getSubtotal();
  const totalDiscount = getTotalDiscountAmount();
  const grandTotal = subtotal - totalDiscount;

  return (
    <div className="bg-white p-10 flex flex-col shadow-sm border border-gray-100">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start border-b-4 border-black pb-8">
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-black">
            <ReceiptText size={36} strokeWidth={2.5} />
            <h1 className="text-4xl font-black tracking-tighter uppercase">
              Invoice
            </h1>
          </div>
          <p className="text-xs font-mono font-bold text-white bg-black px-3 py-1 inline-block uppercase tracking-widest">
            Ref: #INV-{invoiceId}
          </p>
        </div>

        <div className="text-right mt-4 sm:mt-0">
          <h2 className="text-xl font-black uppercase text-gray-900">
            {sellerName || "Your Company"}
          </h2>
          <p className="text-sm font-medium text-gray-500 mt-1">{today}</p>
          <p className="text-[10px] text-gray-400 uppercase tracking-[0.2em] font-bold">
            {currentTime}
          </p>
        </div>
      </div>

      {/* Parties */}
      <div className="grid grid-cols-2 gap-8 my-12">
        <div className="border-l-4 border-gray-900 pl-4">
          <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">
            Billed To
          </p>
          <h3 className="text-2xl font-bold text-gray-900 uppercase tracking-tight">
            {customerName || "Valued Customer"}
          </h3>
        </div>
        <div className="text-right flex flex-col items-end justify-center">
          <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">
            Payment Status
          </p>
          <span className="text-[11px] font-black border-2 border-green-600 text-green-600 px-4 py-1 rounded uppercase italic">
            Paid in Full
          </span>
        </div>
      </div>

      {/* Table */}
      <div className="grow w-full">
        <div className="hidden md:block w-full">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b-2 border-gray-900">
                <th className="py-4 text-left font-black uppercase text-[10px] text-gray-400 tracking-widest w-12">
                  #
                </th>
                <th className="py-4 text-left font-black uppercase text-[10px] text-gray-400 tracking-widest">
                  Description
                </th>
                <th className="py-4 text-center font-black uppercase text-[10px] text-gray-400 tracking-widest">
                  Qty
                </th>
                <th className="py-4 text-right font-black uppercase text-[10px] text-gray-400 tracking-widest">
                  Unit Price
                </th>
                <th className="py-4 text-right font-black uppercase text-[10px] text-gray-400 tracking-widest">
                  Discount
                </th>
                <th className="py-4 text-right font-black uppercase text-[10px] text-gray-400 tracking-widest">
                  Line Total
                </th>
                <th className="py-4 w-10"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {items.map((item, index) => {
                const discPercent = (parseFloat(item.discount) || 0) / 100;
                const lineTotal = item.price * item.count * (1 - discPercent);
                return (
                  <tr key={index} className="group hover:bg-gray-50/50">
                    <td className="py-5 text-gray-400 font-mono text-xs">
                      {index + 1}
                    </td>
                    <td className="py-5 font-bold text-gray-900 uppercase tracking-tight">
                      {item.itemName}
                    </td>
                    <td className="py-5 text-center font-bold text-gray-600">
                      {item.count}
                    </td>
                    <td className="py-5 text-right font-medium text-gray-600">
                      ${item.price.toFixed(2)}
                    </td>
                    <td className="py-5 text-right font-bold text-red-500 italic">
                      -{item.discount}
                    </td>
                    <td className="py-5 text-right font-black text-gray-900">
                      ${lineTotal.toFixed(2)}
                    </td>
                    <td className="py-5 text-right">
                      <button
                        onClick={() => deleteItem(index)}
                        className="p-1 opacity-0 group-hover:opacity-100 hover:text-red-600 transition-all"
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
        <div className="md:hidden space-y-4">
          {items.map((item, index) => {
            const discPercent = (parseFloat(item.discount) || 0) / 100;
            const lineTotal = item.price * item.count * (1 - discPercent);
            return (
              <div
                key={index}
                className="relative p-4 rounded-2xl border border-gray-100 bg-gray-50/30"
              >
                <button
                  onClick={() => deleteItem(index)}
                  className="absolute top-4 right-4 text-gray-400 hover:text-red-600"
                >
                  <Trash2 size={18} />
                </button>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono text-gray-400">
                      #{index + 1}
                    </span>
                    <h4 className="font-black text-gray-900 uppercase text-sm">
                      {item.itemName}
                    </h4>
                  </div>
                  <div className="grid grid-cols-2 gap-4 pt-2 border-t border-gray-100">
                    <div>
                      <p className="text-[9px] text-gray-400 uppercase font-black">
                        Qty x Price
                      </p>
                      <p className="text-sm font-bold text-gray-700">
                        {item.count} × ${item.price.toFixed(2)}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-[9px] text-gray-400 uppercase font-black">
                        Discount
                      </p>
                      <p className="text-sm font-bold text-red-500">
                        -{item.discount}
                      </p>
                    </div>
                    <div className="col-span-2 pt-2">
                      <p className="text-[9px] text-gray-400 uppercase font-black">
                        Line Total
                      </p>
                      <p className="text-lg font-black text-gray-900">
                        ${lineTotal.toFixed(2)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {items.length === 0 && (
          <div className="py-20 text-center border-2 border-dashed border-gray-100 rounded-xl mt-6">
            <ShoppingCart className="mx-auto text-gray-200 mb-2" size={48} />
            <p className="text-gray-400 font-bold uppercase text-xs tracking-widest">
              No Items Found
            </p>
          </div>
        )}
      </div>

      {/* Summary */}
      <div className="mt-12 border-t-4 border-gray-900 pt-8">
        <div className="flex justify-between items-start">
          <div className="w-full max-w-xs space-y-3">
            <div className="flex justify-between text-sm font-bold text-gray-500">
              <span className="uppercase tracking-widest">Subtotal</span>
              <span className="text-gray-900 font-black">
                ${subtotal.toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between text-sm font-bold">
              <span className="uppercase tracking-widest text-gray-500 flex items-center gap-1">
                Discount <Tag size={12} className="text-red-500" />
              </span>
              <span className="text-red-600 font-black">
                -${totalDiscount.toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between items-center border-t-2 border-gray-100 pt-4">
              <span className="text-xl font-black uppercase italic tracking-tighter">
                Total
              </span>
              <span className="text-3xl font-black text-black tracking-tighter">
                ${grandTotal.toFixed(2)}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-16 text-center border-t border-gray-100 pt-10">
        <p className="mt-6 text-[10px] text-gray-400 uppercase tracking-widest leading-relaxed">
          Invoice Generated on • {today} • {currentTime}
        </p>
      </div>
    </div>
  );
};

export default Classic;
