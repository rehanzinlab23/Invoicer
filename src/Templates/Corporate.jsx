import { today } from "../todayDate";
import { currentTime } from "../Time";
import { Trash2 } from "lucide-react";

const Corporate = ({
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
          <div className="max-w-full py-4 pl-5 pr-7.5 scale-[1.1] print:shadow-none print:rounded-none">
            {/* Header */}
            <div className="grid grid-cols-[2fr_1fr] gap-6 items-center mb-7 pb-5 border-b-2 border-[#1e293b]">
              <h1 className="text-[30px] font-semibold text-[#1e293b] mb-1">
                INVOICE
              </h1>
              <div className="text-[14px] text-[#64748b] font-medium">
                ##INV-{invoiceId}
              </div>
              <div>{today}</div>
            </div>
            {/* Customer Name */}
            <div className="p-4 bg-[#f8fafc] border border-[#cbd5e1] pt-0">
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
            <div className="bg-[#F8FAFC] mt-5">
              <div className="relative w-full">
                <table className="w-full border-collapse my-6 mx-0 border border-[#cbd5e1]">
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
                  <tbody className="border-t border-t-gray-200 divide-y group divide-[#e5e7eb] bg-white">
                    {items.map((item, index) => {
                      const discountValue =
                        (parseFloat(item.discount) || 0) / 100;
                      const total =
                        item.price * item.count * (1 - discountValue);
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
                          <td className="p-2.5 w-0 text-center text-[13px]">
                            {total.toFixed(2)}
                          </td>
                          <td className="p-2.5 opacity-0 group-hover:opacity-100 text-right cursor-pointer w-0 text-[13px]">
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
            {/* Total Section */}
            <div className="flex justify-start mt-6">
              <div className="min-w-[320px] max-w-100 p-4 bg-[#f8fafc] border border-[#cbd5e1] transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
                <div className="flex justify-between py-1.5 px-0 text-[14px]">
                  <span>Subtotal:</span>
                  <span className="font-medium">{SubTotal()}</span>
                </div>
                <div className="flex justify-between py-1.5 px-0 text-[14px]">
                  <span>Total Discount:</span>
                  <span className="text-[#1D4ED8] font-medium">
                    {TotalDiscount()}%
                  </span>
                </div>
                <div className="flex justify-between py-1.5 px-0 font-semibold text-[16px] text-[#1e293b] border-t border-[#1e293b] mt-1.5 pt-1.5">
                  <span>Total Amount:</span>
                  <span>{calculateTotal()}</span>
                </div>
              </div>
            </div>
            {/* Footer Message */}
            {items.length > 0 && (
              <div className="text-left mt-7 pt-4 text-[13px] text-[#64748b] border-t border-[#cbd5e1]">
                <div className="text-left text-[#64748b] mt-3 font-[14px] pb-5">
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

export default Corporate;
