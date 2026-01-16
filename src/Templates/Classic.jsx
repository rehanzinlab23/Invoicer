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
    <div className="bg-white dark:bg-gray-900 p-10 flex flex-col shadow-sm border border-gray-100 dark:border-gray-800">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start border-b-4 border-black dark:border-white pb-8">
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-black dark:text-white">
            <ReceiptText size={36} strokeWidth={2.5} />
            <h1 className="text-4xl font-black tracking-tighter uppercase">
              Invoice
            </h1>
          </div>
          <p className="text-xs font-mono font-bold text-white bg-black dark:bg-white dark:text-black px-3 py-1 inline-block uppercase tracking-widest">
            Ref: #INV-{invoiceId}
          </p>
        </div>
        {/* Seller Name */}
        <div className="text-right mt-4 sm:mt-0">
          <h2 className="text-xl font-black uppercase text-gray-900 dark:text-gray-100">
            {sellerName || "Seller Name"}
          </h2>
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mt-1">
            {today}
          </p>
          <p className="text-[10px] text-gray-400 dark:text-gray-500 uppercase tracking-[0.2em] font-bold">
            {currentTime}
          </p>
        </div>
      </div>
      {/* Customer Name */}
      <div className="grid grid-cols-2 gap-8 my-12">
        <div className="border-l-4 border-gray-900 dark:border-gray-100 pl-4">
          <p className="text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-2">
            Billed To
          </p>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 uppercase tracking-tight">
            {customerName || "Valued Customer"}
          </h3>
        </div>
      </div>
      {/* Table Section*/}
      <div data-table-container className="">
        <div id="table" className="">
          <div className="w-full overflow-x-auto">
            <table className="w-full text-sm border-collapse mt-4">
              <thead>
                <tr className="border-b-2 border-gray-900 dark:border-gray-100">
                  <th className="py-4 text-left font-black uppercase text-[10px] text-gray-400 dark:text-gray-500 tracking-widest w-12">
                    #
                  </th>
                  <th className="py-4 text-left font-black uppercase text-[10px] text-gray-400 dark:text-gray-500 tracking-widest  whitespace-nowrap">
                    Description
                  </th>
                  <th className="py-4 text-center font-black uppercase text-[10px] text-gray-400 dark:text-gray-500 tracking-widest">
                    Qty
                  </th>
                  <th className="py-4 text-right font-black uppercase text-[10px] text-gray-400 dark:text-gray-500 tracking-widest whitespace-nowrap">
                    Unit Price
                  </th>
                  <th className="py-4 text-right font-black uppercase text-[10px] text-gray-400 dark:text-gray-500 tracking-widest">
                    Discount
                  </th>
                  <th className="py-4 text-right font-black uppercase text-[10px] text-gray-400 dark:text-gray-500 tracking-widest whitespace-nowrap">
                    Line Total
                  </th>
                  <th className="py-4 w-10"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                {items.map((item, index) => {
                  const discPercent = (parseFloat(item.discount) || 0) / 100;
                  const lineTotal = item.price * item.count * (1 - discPercent);
                  return (
                    <tr
                      key={index}
                      className="group hover:bg-gray-50/50 dark:hover:bg-gray-800/50"
                    >
                      <td className="py-5 text-gray-400 dark:text-gray-500 font-mono text-xs">
                        {index + 1}
                      </td>
                      <td className="py-5 font-bold text-gray-900 dark:text-gray-100 uppercase tracking-tight">
                        {item.itemName}
                      </td>
                      <td className="py-5 text-center font-bold text-gray-600 dark:text-gray-300">
                        {item.count}
                      </td>
                      <td className="py-5 text-right font-medium text-gray-600 dark:text-gray-300">
                        ${item.price.toFixed(2)}
                      </td>
                      <td className="py-5 text-right font-bold text-red-500 italic">
                        -{item.discount}
                      </td>
                      <td className="py-5 text-right font-black text-gray-900 dark:text-gray-100">
                        ${lineTotal.toFixed(2)}
                      </td>
                      <td className="py-5 text-right">
                        <button
                          onClick={() => deleteItem(index)}
                          className="p-1 opacity-0 group-hover:opacity-100 text-gray-400 dark:text-gray-600 hover:text-red-600 dark:hover:text-red-500 transition-all"
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
                className="mx-auto text-gray-200 dark:text-gray-700 mb-2"
                size={48}
              />
              <p className="text-gray-400 dark:text-gray-600 font-bold uppercase text-xs tracking-widest">
                No Items Found
              </p>
            </div>
          )}
        </div>
      </div>
      {/* Calculations */}
      <div className="mt-12 border-t-4 border-gray-900 dark:border-gray-100 pt-8">
        <div className="flex justify-between items-start">
          <div className="w-full max-w-xs space-y-3">
            <div className="flex justify-between text-sm font-bold text-gray-500 dark:text-gray-400">
              <span className="uppercase tracking-widest">Subtotal</span>
              <span className="text-gray-900 dark:text-gray-100 font-black">
                ${subtotal.toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between text-sm font-bold">
              <span className="uppercase tracking-widest text-gray-500 dark:text-gray-400 flex items-center gap-1">
                Discount <Tag size={12} className="text-red-500" />
              </span>
              <span className="text-red-600 font-black">
                -${totalDiscount.toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between items-center border-t-2 border-gray-100 dark:border-gray-700 pt-4">
              <span className="text-xl font-black uppercase italic tracking-tighter text-gray-800 dark:text-gray-200">
                Total
              </span>
              <span className="text-3xl font-black text-black dark:text-white tracking-tighter">
                ${grandTotal.toFixed(2)}
              </span>
            </div>
          </div>
        </div>
      </div>
      {/* Footer */}
      <div className="mt-16 text-center border-t border-gray-100 dark:border-gray-800 pt-10">
        <p className="mt-6 text-[10px] text-gray-400 dark:text-gray-500 uppercase tracking-widest leading-relaxed">
          Invoice Generated on • {today} • {currentTime}
        </p>
      </div>
    </div>
  );
};

export default Classic;
