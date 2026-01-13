import { today } from "../todayDate";
import { currentTime } from "../Time";
import { Trash2 } from "lucide-react";

const Elegant = ({ items, setItems, sellerName, customerName, invoiceId }) => {
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
      <div className="min-w-full table">
        <div className="bg-white p-6 pr-4">
          <div className=" max-w-full py-4 pl-5 px-12.5 scale-[1.1] print:shadow-none print:rounded-none layout-elegant">
            {/* Header */}
            <div className="flex justify-between items-center mb-8 pb-7.5 relative border-b border-[#dbeafe]">
              <div>
                <h1 className="text-[38px] font-medium text-[#1e293b] tracking-[1px] mb-1.5">
                  INVOICE
                </h1>
                <div className="text-base text-[#64748b] italic">
                  ##INV-{invoiceId}
                </div>
              </div>
              <div>{today}</div>
            </div>
            {/* Customer Name */}
            <div className="p-4 pt-0 bg-[#f8fafc] border border-[#dbeafe] rounded-[6px] shadow-md">
              <div className="sm:flex justify-between">
                <div className="flex items-center gap-2 mt-4">
                  <h3 className="font-semibold">Seller Name:</h3>
                  <h4>{sellerName}</h4>
                </div>
                <div className="flex items-center gap-2 mt-4">
                  <h3 className="font-semibold">Customer Name:</h3>
                  <h4>{customerName}</h4>
                </div>
              </div>
            </div>
            {/* Table */}
            <div className="relative w-full">
              <table className="w-full border-separate border-spacing-0 my-8 border border-[#dbeafe] rounded-[6px] overflow-hidden shadow-lg">
                <thead>
                  <tr>
                    <th className="bg-linear-to-br from-[#f8fafc] to-[#dbeafe] text-[#1e293b] border-b border-[#dbeafe] px-4 py-4.5 font-medium text-sm text-left uppercase whitespace-nowrap">
                      Item Name
                    </th>
                    <th className="bg-linear-to-br from-[#f8fafc] to-[#dbeafe] text-[#1e293b] border-b border-[#dbeafe] px-4 py-4.5 font-medium text-sm text-center uppercase whitespace-nowrap">
                      Quantity
                    </th>
                    <th className="bg-linear-to-br from-[#f8fafc] to-[#dbeafe] text-[#1e293b] border-b border-[#dbeafe] px-4 py-4.5 font-medium text-sm text-center uppercase whitespace-nowrap">
                      Price
                    </th>
                    <th className="bg-linear-to-br from-[#f8fafc] to-[#dbeafe] text-[#1e293b] border-b border-[#dbeafe] px-4 py-4.5 font-medium text-sm text-center uppercase whitespace-nowrap">
                      Discount
                    </th>
                    <th className="bg-linear-to-br from-[#f8fafc] to-[#dbeafe] text-[#1e293b] border-b border-[#dbeafe] px-4 py-4.5 font-medium text-sm text-center uppercase whitespace-nowrap">
                      Total
                    </th>
                    <th className="bg-linear-to-br from-[#f8fafc] to-[#dbeafe] border-b border-[#dbeafe] w-10">
                      <Trash2 size={16} className="text-black inline-block" />
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white">
                  {items.map((item, index) => {
                    const discountValue =
                      (parseFloat(item.discount) || 0) / 100;
                    const total = item.price * item.count * (1 - discountValue);
                    return (
                      <tr key={index} className="hover:bg-gray-50 group">
                        <td className="py-4 px-4 text-[13px] align-top font-medium text-[#1e293b] border-b border-[#dbeafe]">
                          <div className="font-medium mb-0.5 uppercase">
                            {item.itemName}
                          </div>
                          <div className="text-[13px] opacity-70">
                            Item #{index + 1}
                          </div>
                        </td>
                        <td className="border-b border-[#dbeafe] p-6 text-[15px] text-center">
                          {item.count}
                        </td>
                        <td className="border-b border-[#dbeafe] p-6 text-[15px] text-center">
                          {item.price}
                        </td>
                        <td className="border-b border-[#dbeafe] p-6 text-[15px] text-center">
                          {item.discount}
                        </td>
                        <td className="border-b border-[#dbeafe] p-6 text-[15px] text-right font-medium">
                          {total.toFixed(2)}
                        </td>
                        <td className="border-b border-[#dbeafe] p-4 text-right w-10">
                          <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                            <Trash2
                              size={16}
                              className="text-black hover:text-red-500 cursor-pointer inline-block"
                              onClick={() => deleteItem(index)}
                            />
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            {/* Total Section */}
            <div className="flex justify-end mt-8">
              <div className="min-w-85 p-6 bg-[##f8fafc] border border-[#dbeafe] rounded-md shadow-md transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
                <div className="flex justify-between py-2.5 px-0 text-base">
                  <span>Subtotal:</span>
                  <span className="font-medium">{SubTotal()}</span>
                </div>
                <div className="flex justify-between py-2.5 px-0 text-base">
                  <span>Total Discount:</span>
                  <span className="text-[#1D4ED8] font-medium">
                    {TotalDiscount()}%
                  </span>
                </div>
                <div className="flex justify-between font-semibold text-[20px] text-[#1e293b] border-t border-t-[#2563eb] mt-3 pt-3">
                  <span>Total Amount:</span>
                  <span>{calculateTotal()}</span>
                </div>
              </div>
            </div>
            {/* Footer Message */}
            {items.length > 0 && (
              <div className="text-left mt-7 pt-4 text-[13px] text-[#64748b] border-t border-[#cbd5e1]">
                <div className="text-center text-[#64748b] mt-3 font-[14px] pb-5">
                  <div>Thank you for coming to our store!</div>
                  <div>
                    Generated on {today} at {currentTime}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Elegant;
