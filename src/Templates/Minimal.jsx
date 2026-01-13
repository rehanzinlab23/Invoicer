import { today } from "../todayDate";
import { currentTime } from "../Time";
import { Trash2 } from "lucide-react";

const Minimal = ({ items, setItems, sellerName, customerName, invoiceId }) => {
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
    <div className="bg-white p-8 sm:p-16 font-sans text-slate-900">
      <div className="max-w-4xl mx-auto">
        {/* Top Branding Section */}
        <div className="flex justify-between items-start mb-20">
          <div className="space-y-1">
            <h1 className="text-4xl font-bold tracking-tighter uppercase">
              Invoice
            </h1>
            <p className="text-sm font-medium text-slate-400">#{invoiceId}</p>
          </div>
          <div className="text-right">
            <p className="text-sm font-bold uppercase tracking-widest">
              {today}
            </p>
            <p className="text-xs text-slate-400 mt-1">{currentTime}</p>
          </div>
        </div>

        {/* Stakeholders Section */}
        <div className="grid grid-cols-2 gap-12 mb-20">
          <div className="space-y-2">
            <p className="text-[10px] font-black uppercase text-slate-400 tracking-[0.2em]">
              From
            </p>
            <h2 className="text-lg font-bold">
              {sellerName || "Service Provider"}
            </h2>
          </div>
          <div className="space-y-2 text-right">
            <p className="text-[10px] font-black uppercase text-slate-400 tracking-[0.2em]">
              Billed To
            </p>
            <h2 className="text-lg font-bold">
              {customerName || "Customer Name"}
            </h2>
          </div>
        </div>

        {/* Table Section */}
        <div className="w-full mb-12">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b-2 border-slate-900">
                <th className="py-4 text-left text-[11px] font-black uppercase tracking-widest">
                  Description
                </th>
                <th className="py-4 text-center text-[11px] font-black uppercase tracking-widest">
                  Qty
                </th>
                <th className="py-4 text-right text-[11px] font-black uppercase tracking-widest">
                  Rate
                </th>
                <th className="py-4 text-right text-[11px] font-black uppercase tracking-widest">
                  Disc.
                </th>
                <th className="py-4 text-right text-[11px] font-black uppercase tracking-widest">
                  Total
                </th>
                <th className="py-4 w-8 print:hidden"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {items.map((item, index) => {
                const discountValue = (parseFloat(item.discount) || 0) / 100;
                const total = item.price * item.count * (1 - discountValue);
                return (
                  <tr
                    key={index}
                    className="group hover:bg-slate-50/50 transition-colors"
                  >
                    <td className="py-6 pr-4">
                      <div className="font-bold text-sm uppercase tracking-tight">
                        {item.itemName}
                      </div>
                      <div className="text-[10px] text-slate-400 mt-0.5">
                        ID-#{index + 1}
                      </div>
                    </td>
                    <td className="py-6 px-2 text-center text-sm font-medium text-slate-600">
                      {item.count}
                    </td>
                    <td className="py-6 px-2 text-right text-sm font-medium text-slate-600">
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
                        className="opacity-0 group-hover:opacity-100 text-slate-300 hover:text-red-500 transition-all"
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

        {/* Calculation Section */}
        <div className="flex justify-end">
          <div className="w-full sm:w-64 space-y-4">
            <div className="flex justify-between text-xs font-bold uppercase tracking-widest text-slate-400">
              <span>Subtotal</span>
              <span className="text-slate-900">${SubTotal()}</span>
            </div>
            <div className="flex justify-between text-xs font-bold uppercase tracking-widest text-slate-400">
              <span>Discount</span>
              <span className="text-red-600">-{TotalDiscount()}%</span>
            </div>
            <div className="pt-6 border-t border-slate-200 flex justify-between items-end">
              <span className="text-[10px] font-black uppercase tracking-[0.3em]">
                Total Amount
              </span>
              <span className="text-4xl font-black tracking-tighter">
                ${calculateTotal()}
              </span>
            </div>
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
  );
};

export default Minimal;
