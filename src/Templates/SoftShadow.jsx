import { today } from "../todayDate";
import { RandomNumber } from "../RandomNumber";
import { Trash2 } from "lucide-react";
import { currentTime } from "../Time";

const SoftShadow = ({ items, setItems, sellerName, customerName }) => {
  const deleteItem = (index) => {
    const updatedItems = [...items];
    updatedItems.splice(index, 1);
    setItems(updatedItems);
  };

  const TotalDiscount = () => {
    let totalDiscount = 0;
    items.forEach((item) => {
      totalDiscount += parseFloat(item.discount);
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
    <>
      {/* Header */}
      <div className="bg-[#ffffff] p-7 mb-4 mt-5 rounded-2xl border border-[#cbd5e1] shadow-[0_6px_20px_rgba(0,0,0,0.08)] transition-all duration-300 ease-in-out hover:-translate-y-2 hover:shadow-xl">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-[30px] font-semibold text-[#1e293b] mb-1">
              Invoice
            </h1>
            <div className="text-slate-500 font-medium">
              ##INV-{RandomNumber()}
            </div>
          </div>
          <span className="font-medium max-sm:mt-2 text-[#1e293b]">
            Date: <span className="text-[#555]">{today}</span>
          </span>
        </div>
        {/* Customer Name */}
        <div className="mt-2">
          <div className="sm:flex items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <h3 className="font-semibold text-[#1e293b]">Seller Name:</h3>
              <h4 className="text-slate-600">{sellerName || "N/A"}</h4>
            </div>
            <div className="flex items-center gap-2 max-sm:mt-3">
              <h3 className="font-semibold text-[#1e293b]">Customer Name:</h3>
              <h4 className="text-slate-600">{customerName}</h4>
            </div>
          </div>
        </div>
      </div>
      {/* Table */}
      <div className="bg-[#ffffff] p-7 mb-6 rounded-2xl border border-[#cbd5e1] shadow-[0_6px_20px_rgba(0,0,0,0.08)] ease-in-out  transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
        <div className="relative w-full">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr>
                <th className="bg-transparent text-[#1e293b] border-b-[#cbd5e1] py-4 px-3 font-semibold whitespace-nowrap text-left text-[13px] leading-[1.55]">
                  Item Name
                </th>
                <th className="bg-transparent text-[#1e293b] border-b-[#cbd5e1] py-4 px-3 font-semibold whitespace-nowrap text-center text-[13px] leading-[1.55]">
                  Quantity
                </th>
                <th className="bg-transparent text-[#1e293b] border-b-[#cbd5e1] py-4 px-3 font-semibold whitespace-nowrap text-center text-[13px] leading-[1.55]">
                  Price
                </th>
                <th className="bg-transparent text-[#1e293b] border-b-[#cbd5e1] py-4 px-3 font-semibold whitespace-nowrap text-center text-[13px] leading-[1.55]">
                  Discount
                </th>
                <th className="bg-transparent text-[#1e293b] border-b-[#cbd5e1] py-4 px-3 font-semibold whitespace-nowrap text-center text-[13px] leading-[1.55]">
                  Total
                </th>
                <th className="h-12 px-4 text-right w-0"></th>
              </tr>
            </thead>
            <tbody className="border-t border-t-gray-200 divide-y group divide-[#e5e7eb]">
              {items.map((item, index) => {
                const discountValue = (parseFloat(item.discount) || 0) / 100;
                const total = item.price * item.count * (1 - discountValue);
                return (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="py-3.5 px-3 text-[14px] align-top font-medium text-[#1e293b] whitespace-nowrap">
                      <div className="font-medium mb-0.5">{item.itemName}</div>
                      <div className="text-[0.9em] opacity-70">
                        Item #{index + 1}
                      </div>
                    </td>
                    <td className="p-4 text-center">{item.count}</td>
                    <td className="p-4 text-center">{item.price}</td>
                    <td className="p-4 text-center">{item.discount}</td>
                    <td className="p-4 w-0 text-center font-bold">
                      {total.toFixed(2)}
                    </td>
                    <td className="p-4 opacity-0 group-hover:opacity-100 text-right cursor-pointer w-0">
                      <Trash2
                        size={16}
                        className="text-black hover:text-red-500"
                        onClick={() => deleteItem(index)}
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      {/* Footer */}
      <div>
        <div className="w-full p-0">
          <div className="flex justify-between py-2 px-0 text-[15px]">
            <span>Subtotal:</span>
            <span className="font-medium">{SubTotal()}</span>
          </div>
          <div className="flex justify-between py-2 px-0 text-[15px]">
            <span>Total Discount:</span>
            <span className="text-[#1D4ED8] font-medium">
              {TotalDiscount()}%
            </span>
          </div>
          <div className="flex justify-between py-2 px-0 text-[18px] text-[#1e293b] font-bold border-t border-t-[#2563eb] mt-2 pt-2">
            <span>Total Amount:</span>
            <span className="font-bold">{calculateTotal()}</span>
          </div>
        </div>
      </div>
      {/* Footer Lines */}
      <div className="text-center text-[#64748b] mt-3 font-[14px] pb-5">
        <div>Thank you for coming to our store!</div>
        <div>
          <div>
            Generated on {today} at {currentTime}
          </div>
        </div>
      </div>
    </>
  );
};

export default SoftShadow;
