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
    <div className="font-sans">
      <div className="max-w-4xl mx-auto bg-white dark:bg-gray-900 border border-slate-200 dark:border-slate-800 rounded-sm shadow-2xl overflow-hidden print:shadow-none print:border-none">
        <div className="h-2 bg-[#1e293b] dark:bg-white" />
        <div className="px-3 py-6 sm:p-10 lg:p-12">
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between gap-6 mb-10">
            <div>
              <h1 className="text-3xl sm:text-4xl font-black text-[#1e293b] dark:text-white tracking-tight mb-2">
                INVOICE
              </h1>
              <div className="flex flex-wrap gap-3 text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-medium">
                <span className="flex items-center gap-1">
                  <Hash size={12} /> {invoiceId}
                </span>
                <span className="flex items-center gap-1">
                  <Calendar size={12} /> {today}
                </span>
              </div>
            </div>
            {/* Right Side */}
            <div className="bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-4 py-3 rounded-sm text-left sm:text-right sm:min-w-45">
              <p className="text-[9px] uppercase tracking-widest opacity-60 dark:opacity-80">
                Total Amount
              </p>
              <p className="text-xl sm:text-2xl font-bold">${total()}</p>
            </div>
          </div>
          {/* Customer Name */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
            <div>
              <div className="flex items-center gap-2 text-[#1e293b] dark:text-white font-bold text-xs uppercase tracking-widest border-b dark:border-slate-700 pb-2 mb-2">
                <Building2 size={14} /> From
              </div>
              <h3 className="text-sm sm:text-lg font-bold wrap-break-word dark:text-slate-200">
                {sellerName || "Seller Name"}
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 italic">
                Authorized Seller
              </p>
            </div>

            <div>
              <div className="flex items-center gap-2 text-[#1e293b] dark:text-white font-bold text-xs uppercase tracking-widest border-b dark:border-slate-700 pb-2 mb-2">
                <User size={14} /> Billed To
              </div>
              <h3 className="text-sm sm:text-lg font-bold wrap-break-word dark:text-slate-200">
                {customerName || "Customer Name"}
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 italic">
                Valued Customer
              </p>
            </div>
          </div>
          {/* Table Section */}
          <div id="table" className="mt-4">
            <div className="relative w-full overflow-auto">
              <table className="w-full text-sm border-collapse mt-4">
                <thead>
                  <tr className="bg-slate-50 dark:bg-slate-800 border-y dark:border-slate-700 text-[10px] sm:text-xs uppercase dark:text-slate-400">
                    <th className="w-[40%] py-3 px-2 text-left">
                      Item Details
                    </th>
                    <th className="w-[10%] py-3 px-1 text-center">Qty</th>
                    <th className="w-[15%] py-3 px-1 text-right">Rate</th>
                    <th className="w-[10%] py-3 px-1 text-right">Disc %</th>
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
                        <td className="py-3 px-2 dark:text-slate-200">
                          <p className="font-bold uppercase text-[11px] sm:text-sm wrap-break-word">
                            {item.itemName}
                          </p>
                          <p className="text-[9px] text-slate-400">
                            ITEM-{index + 1}
                          </p>
                        </td>

                        <td className="py-3 px-1 text-center text-xs sm:text-sm font-semibold dark:text-slate-300">
                          {item.count}
                        </td>

                        <td className="py-3 px-1 text-right text-xs sm:text-sm dark:text-slate-400">
                          ${item.price}
                        </td>

                        <td className="py-3 px-1 text-right text-xs sm:text-sm font-bold text-red-600">
                          {item.discount}
                        </td>

                        <td className="py-3 px-1 text-right text-xs sm:text-sm font-bold dark:text-slate-100">
                          ${amount.toFixed(2)}
                        </td>

                        <td className="py-3 px-1 text-right">
                          <button
                            onClick={() => deleteItem(index)}
                            className="p-1 hover:text-red-500 text-slate-300 dark:text-slate-600 dark:hover:text-red-500"
                          >
                            <Trash2 size={12} />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
          {/* Calculations */}
          <div className="flex justify-end mt-16">
            <div className="w-full sm:w-80 text-sm space-y-2 dark:text-slate-300">
              <div className="flex justify-between">
                <span className="text-slate-500 dark:text-slate-400">
                  Subtotal
                </span>
                <span className="font-bold">${subTotal()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500 dark:text-slate-400">
                  Total Discount
                </span>
                <span className="font-bold text-red-600">
                  -{totalDiscount()}
                </span>
              </div>
              <div className="pt-3 border-t-2 border-slate-900 dark:border-slate-200 flex justify-between items-center">
                <span className="uppercase font-black text-sm dark:text-white">
                  Total Amount
                </span>
                <span className="text-xl sm:text-2xl font-black dark:text-white">
                  ${total()}
                </span>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-12 pt-6 border-t dark:border-slate-800 text-center">
            <p className="text-[9px] text-slate-400 dark:text-slate-500 uppercase tracking-widest">
              Invoice generated on {today} at {currentTime}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Corporate;
