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
        <div className="bg-white p-6 pr-4"></div>
        <div className="max-w-full py-4 pl-5 pr-7.5 scale-[1.1] print:shadow-none print:rounded-none layout-minimal">
          {/* Header */}
          <div className="flex justify-between items-start mb-4 pb-4 border-b border-[#cbd5e1]">
            <div>
              <h1 className="uppercase text-[28px] font-normal text-[#1e293b] tracking-[1px]">
                Invoice
              </h1>
              <div className="text-[12px] text-[#64748b] mt-1">
                ##INV-{invoiceId}
              </div>
            </div>
            <div>{today}</div>
          </div>
          {/* Customer Name */}
          <div className="sm:flex flex-col gap-4">
            <div className="flex items-center gap-2 mt-4">
              <h3 className="font-semibold">Seller Name:</h3>
              <h4>{sellerName}</h4>
            </div>
            <div className="flex items-center gap-2 mt-4">
              <h3 className="font-semibold">Customer Name:</h3>
              <h4>{customerName}</h4>
            </div>
          </div>
          {/* Table */}
          <div className="relative w-full">
            <table className="my-6 mx-0 w-full border-collapse border-t border-b border-[#cbd5e1]">
              <thead>
                <tr>
                  <th className="bg-transparent text-[#1e293b] py-4 px-3 font-semibold whitespace-nowrap text-left text-[13px] leading-[1.55]">
                    Item Name
                  </th>
                  <th className="bg-transparent text-[#1e293b] py-4 px-3 font-semibold whitespace-nowrap text-center text-[13px] leading-[1.55]">
                    Quantity
                  </th>
                  <th className="bg-transparent text-[#1e293b] py-4 px-3 font-semibold whitespace-nowrap text-center text-[13px] leading-[1.55]">
                    Price
                  </th>
                  <th className="bg-transparent text-[#1e293b] py-4 px-3 font-semibold whitespace-nowrap text-center text-[13px] leading-[1.55]">
                    Discount
                  </th>
                  <th className="bg-transparent text-[#1e293b] py-4 px-3 font-semibold whitespace-nowrap text-center text-[13px] leading-[1.55]">
                    Total
                  </th>
                  <th className="h-12 px-4 text-right w-0"></th>
                </tr>
              </thead>
              <tbody className="group bg-white">
                {items.map((item, index) => {
                  const discountValue = (parseFloat(item.discount) || 0) / 100;
                  const total = item.price * item.count * (1 - discountValue);
                  return (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="py-2 px-2 text-[13px] align-top font-medium text-[#1e293b] whitespace-nowrap">
                        <div className="font-medium mb-0.5 uppercase">
                          {item.itemName}
                        </div>
                        <div className="text-[13px] opacity-70">
                          Item #{index + 1}
                        </div>
                      </td>
                      <td className="p-2.5 text-center text-[13px]">
                        {item.count}
                      </td>
                      <td className="p-2.5 text-center text-[13px]">
                        {item.price}
                      </td>
                      <td className="p-2.5 text-center text-[13px]">
                        {item.discount}
                      </td>
                      <td className="p-2.5 w-0 text-center text-[13px] font-bold">
                        {total.toFixed(2)}
                      </td>
                      <td className="p-2.5 opacity-0 group-hover:opacity-100 text-right cursor-pointer w-0 text-[13px]">
                        <Trash2
                          size={16}
                          className="text-black hover:text-red-500 opacity-[70px]"
                          onClick={() => deleteItem(index)}
                        />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          {/* Total */}
          <div className="flex justify-end mt-6">
            <div className="min-w-62.5 p-0">
              <div className="flex justify-between py-1.5 px-0 text-[13px]">
                <span>Subtotal:</span>
                <span className="font-medium">{SubTotal()}</span>
              </div>
              <div className="flex justify-between py-1.5 px-0 text-[13px]">
                <span>Total Discount:</span>
                <span className="text-[#1D4ED8] font-medium">
                  {TotalDiscount()}%
                </span>
              </div>
              <div className="flex justify-between py-1.5 px-0 font-medium text-[15px] text-[#1e293b] border-t border-[#cbd5e1] mt-1.5 pt-1.5">
                <span>Total Amount:</span>
                <span>{calculateTotal()}</span>
              </div>
            </div>
          </div>
          {/* Footer Message */}
          {items.length > 0 && (
            <div className="text-center mt-8 pt-4 text-[12px] text-[#64748b]">
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
    </>
  );
};

export default Minimal;
