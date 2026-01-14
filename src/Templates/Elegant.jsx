import { today } from "../todayDate";
import { currentTime } from "../Time";
import { Trash2, ShoppingBag, Sparkles } from "lucide-react";

const Elegant = ({ items, setItems, sellerName, customerName, invoiceId }) => {
  const deleteItem = (index) => {
    const updated = [...items];
    updated.splice(index, 1);
    setItems(updated);
  };

  const subTotal = () =>
    items.reduce((a, i) => a + i.price * i.count, 0).toFixed(2);

  const totalDiscount = () =>
    items.reduce((a, i) => {
      const d = (parseFloat(i.discount) || 0) / 100;
      return a + i.price * i.count * d;
    }, 0);

  const total = () =>
    items
      .reduce((a, i) => {
        const d = (parseFloat(i.discount) || 0) / 100;
        return a + i.price * i.count * (1 - d);
      }, 0)
      .toFixed(2);

  return (
    <div className="font-serif">
      <div className="max-w-4xl mx-auto bg-white dark:bg-gray-900 rounded-2xl border dark:border-gray-800 shadow-sm overflow-hidden">
        <div className="h-1.5 bg-linear-to-r from-slate-100 via-blue-200 to-slate-100 dark:from-slate-800 dark:via-blue-900 dark:to-slate-800" />

        {/* CONTENT */}
        <div className="px-3 py-6 sm:p-10 lg:p-16">
          {/* HEADER */}
          <div className="flex flex-col sm:flex-row justify-between gap-6 mb-10 border-b dark:border-gray-800 pb-6">
            <div>
              <div className="flex items-center gap-2 text-blue-400 mb-1">
                <Sparkles size={14} />
                <span className="text-[9px] uppercase tracking-widest font-bold">
                  Premium Service
                </span>
              </div>
              <h1 className="text-3xl sm:text-5xl font-light dark:text-white">
                Invoice
              </h1>
              <p className="text-xs text-slate-400 dark:text-slate-500">
                REF:{" "}
                <span className="text-slate-900 dark:text-slate-200">
                  #INV-{invoiceId}
                </span>
              </p>
            </div>

            <div className="text-left sm:text-right font-sans">
              <p className="text-[10px] uppercase tracking-widest text-slate-400 dark:text-slate-500">
                Issue Date
              </p>
              <p className="font-semibold dark:text-white">{today}</p>
              <p className="text-[10px] text-slate-400 dark:text-slate-500">
                {currentTime}
              </p>
            </div>
          </div>

          {/* CLIENT INFO */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
            <div>
              <p className="text-[10px] uppercase tracking-widest text-blue-500 font-bold mb-1">
                Issued By
              </p>
              <h3 className="text-sm sm:text-lg wrap-break-word dark:text-slate-200">
                {sellerName || "Seller Name"}
              </h3>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-widest text-blue-500 font-bold mb-1">
                Billed To
              </p>
              <h3 className="text-sm sm:text-lg wrap-break-word dark:text-slate-200">
                {customerName || "Valued Customer"}
              </h3>
            </div>
          </div>

          {/* TABLE */}
          <div className="mt-4">
            <div className="relative w-full overflow-x-auto">
              <table className="w-full text-sm border-collapse mt-4">
                <thead>
                  <tr className="bg-slate-50 dark:bg-slate-800 text-[10px] sm:text-xs uppercase dark:text-slate-400">
                    <th className="w-[40%] py-3 px-2 text-left">Description</th>
                    <th className="w-[10%] py-3 px-1 text-center">Qty</th>
                    <th className="w-[15%] py-3 px-1 text-right">Price</th>
                    <th className="w-[10%] py-3 px-1 text-right">Disc</th>
                    <th className="w-[20%] py-3 px-1 text-right">Amount</th>
                    <th className="w-[5%] py-3 px-1"></th>
                  </tr>
                </thead>

                <tbody className="divide-y dark:divide-slate-800">
                  {items.map((item, index) => {
                    const d = (parseFloat(item.discount) || 0) / 100;
                    const amount = item.price * item.count * (1 - d);

                    return (
                      <tr
                        key={index}
                        className="hover:bg-slate-50 dark:hover:bg-slate-800/50"
                      >
                        <td className="py-3 px-2">
                          <div className="font-bold uppercase text-[11px] sm:text-[13px] wrap-break-word dark:text-slate-200">
                            {item.itemName}
                          </div>
                          <div className="text-[9px] text-slate-400 dark:text-slate-500">
                            Item #{index + 1}
                          </div>
                        </td>

                        <td className="py-3 px-1 text-center text-xs sm:text-sm dark:text-slate-300">
                          {item.count}
                        </td>

                        <td className="py-3 px-1 text-right text-xs sm:text-sm dark:text-slate-400">
                          ${item.price}
                        </td>

                        <td className="py-3 px-1 text-right text-xs sm:text-sm text-blue-500">
                          -{item.discount}
                        </td>

                        <td className="py-3 px-1 text-right font-bold text-xs sm:text-sm dark:text-slate-100">
                          ${amount.toFixed(2)}
                        </td>

                        <td className="py-3 px-1 text-right">
                          <button
                            onClick={() => deleteItem(index)}
                            className="p-1 rounded hover:bg-red-50 dark:hover:bg-red-900/50"
                          >
                            <Trash2 size={12} className="text-red-400" />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>

              {items.length === 0 && (
                <div className="py-12 text-center">
                  <ShoppingBag className="mx-auto text-slate-300 dark:text-slate-700 mb-2" />
                  <p className="text-xs text-slate-400 dark:text-slate-600 uppercase tracking-widest">
                    No items added
                  </p>
                </div>
              )}
            </div>
          </div>
          {/* TOTALS */}
          <div className="flex justify-end mt-8">
            <div className="w-full sm:w-72 font-sans text-sm dark:text-slate-200">
              <div className="flex justify-between py-2">
                <span className="text-slate-400 dark:text-slate-500">
                  Subtotal
                </span>
                <span>${subTotal()}</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-slate-400 dark:text-slate-500">
                  Discount
                </span>
                <span className="text-blue-500 font-bold">
                  {totalDiscount()}%
                </span>
              </div>
              <div className="flex justify-between items-center pt-4 border-t dark:border-slate-800">
                <span className="text-xs uppercase tracking-widest font-bold">
                  Total Due
                </span>
                <span className="text-2xl sm:text-3xl font-light">
                  ${total()}
                </span>
              </div>
            </div>
          </div>

          {/* FOOTER */}
          <div className="mt-10 pt-6 border-t dark:border-slate-800 text-center">
            <div className="mx-auto w-full max-w-xs h-px bg-slate-100 dark:bg-slate-800 mb-3" />
            <p className="text-[9px] text-slate-400 dark:text-slate-500 uppercase tracking-widest">
              Invoice Generated on • {today} • {currentTime}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Elegant;
