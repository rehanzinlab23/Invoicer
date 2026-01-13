import { today } from "../todayDate";
import { currentTime } from "../Time";
import { Trash2 } from "lucide-react";

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
          <div className="max-w-full py-4 pl-5 pr-7.5 scale-[1.1] print:shadow-none print:rounded-none layout-stripe-edge">
            {/* Stripe Edge */}
            <div className="p-5 bg-[#1e293b] text-[#ffffff] rounded-0 mb-7">
              <div className="text-[#ffffff]">
                <span>Subtotal:</span>
                <span className="font-medium">{SubTotal()}</span>
              </div>
              <div className="text-[#ffffff]">
                <span>Total Discount:</span>
                <span className="text-[#1D4ED8] font-medium">
                  {TotalDiscount()}%
                </span>
              </div>
              <div className="text-[20px]">
                <span>Total Amount:</span>
                <span>{calculateTotal()}</span>
              </div>
            </div>
            {/* Header */}
            <div className="flex justify-between items-start mb-7">
              <div className="grow">
                <h1 className="text-[28px] font-bold text-[#1e293b] mb-1">
                  INVOICE
                </h1>
                <div>##INV-{invoiceId}</div>
              </div>
              <div>{today}</div>
            </div>
            {/* Seller and Customer Name */}
            <div className="p-5 bg-[#f8fafc] border-l border-l-[#cbd5e1] rounded-bl-xl">
              <div className="sm:flex items-left flex-col">
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
            <div className="bg-gray-50 mt-5">
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
                      const discountValue =
                        (parseFloat(item.discount) || 0) / 100;
                      const total =
                        item.price * item.count * (1 - discountValue);
                      return (
                        <tr key={index} className="hover:bg-gray-100 bg-white">
                          <td className="py-3.5 px-3 text-[14px] align-top font-medium text-[#1e293b] whitespace-nowrap">
                            <div className="font-medium mb-0.5 uppercase">
                              {item.itemName}
                            </div>
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
            {/* Footer Message */}
            {items.length > 0 && (
              <div className="text-center text-[#64748b] mt-3 font-[14px] pb-5">
                <div>Thank you for coming to our store!</div>
                <div>
                  Generated on {today} at {currentTime}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default StripeEdge;
