import { today } from "../todayDate";
import { Trash2 } from "lucide-react";

const Classic = ({ items, setItems, sellerName, customerName }) => {
  const deleteItem = (index) => {
    const updatedItems = [...items];
    updatedItems.splice(index, 1);
    setItems(updatedItems);
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
    <div className="my-3 pt-4">
      <div className="sm:flex items-center justify-between ">
        <h4 className="text-2xl uppercase font-semibold">Invoice #</h4>
        <span className="font-medium max-sm:mt-2">
          Date: <span className="text-[#555]">{today}</span>
        </span>
      </div>
      {/* Customer Name */}
      <div className="sm:flex items-center justify-between">
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
      <div className="mt-4">
        <div className="relative w-full overflow-auto">
          <table className="w-full caption-bottom text-sm border-collapse">
            <caption className="mt-4 text-sm text-[#737373] mb-2">
              Thanks For Coming in Data General Store
            </caption>
            <thead>
              <tr className="border-b border-[#e5e7eb] text-[#737373] hover:bg-gray-50">
                <th className="h-12 px-4 text-left font-medium w-15">#</th>
                <th className="h-12 px-4 text-left font-medium whitespace-nowrap">
                  Item Name
                </th>
                <th className="h-12 px-4 text-left font-medium">Quantity</th>
                <th className="h-12 px-4 text-left font-medium">Price</th>
                <th className="h-12 px-4 text-left font-medium">Discount</th>
                <th className="h-12 px-4 text-left font-medium w-0">Total</th>
                <th className="h-12 px-4 text-right w-0"></th>
              </tr>
            </thead>
            <tbody className="divide-y group divide-[#e5e7eb]">
              {items.map((item, index) => {
                const discountValue = (parseFloat(item.discount) || 0) / 100;
                const total = item.price * item.count * (1 - discountValue);
                return (
                  <tr
                    key={index}
                    className="border-b border-[#e5e7eb] hover:bg-gray-50"
                  >
                    <td className="p-4">{index + 1}</td>
                    <td className="p-4 uppercase">{item.itemName}</td>
                    <td className="p-4">{item.count}</td>
                    <td className="p-4">{item.price}</td>
                    <td className="p-4">{item.discount}</td>
                    <td className="p-4 w-0">{total.toFixed(2)}</td>
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
            <tfoot className="border-t border-[#e5e7eb] bg-[#f9fafb] font-medium">
              <tr>
                <td className="p-4 font-bold" colSpan="5">
                  Total
                </td>
                <td className="p-4 text-right font-bold" colSpan="2">
                  {calculateTotal()}
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Classic;
