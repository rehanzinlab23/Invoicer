import { Calendar, Plus } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import Line from "./Line";
import { today } from "../todayDate";

const Invoice = ({
  items,
  setItems,
  sellerName,
  setSellerName,
  customerName,
  setCustomerName,
  searchItems,
  setSearchItems,
}) => {
  const [count, setCount] = useState(1);
  const [price, setPrice] = useState("");
  const [itemName, setItemName] = useState("");
  const [discount, setDiscount] = useState("1%");

  const handleChange = (e) => {
    const value = e.target.value;
    if (value === "") {
      setCount("");
      return;
    }
    if (!isNaN(value)) {
      setCount(Number(value));
    }
  };

  const priceChange = (e) => {
    const value = e.target.value;
    if (value === "" || !isNaN(value)) {
      setPrice(value);
    }
  };

  const handleAddItem = () => {
    if (
      !itemName ||
      !price ||
      !customerName ||
      !count ||
      !discount ||
      !sellerName
    ) {
      toast.error("Please fill all the fields!");
      return;
    }

    const newItem = {
      itemName,
      price: parseFloat(price),
      count: parseInt(count),
      discount: discount,
    };

    setItems([...items, newItem]);
    toast.success("You added a new item!");

    setItemName("");
    setPrice("");
    setDiscount("1%");
    setCount(1);
  };

  return (
    <div className="mt-10 mb-4">
      <div className="rounded-lg border bg-white border-gray-200 shadow-sm">
        <div className="flex flex-col space-y-1.5 p-6 pb-4">
          <h3 className="text-2xl font-semibold leading-none tracking-tight uppercase flex items-center gap-4">
            Invoice
            <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 font-semibold border-transparent bg-gray-100 text-xs capitalize">
              New Invoice
            </div>
          </h3>
          <p className="text-sm text-muted-foreground font-medium text-gray-500">
            Generate Invoice
          </p>
        </div>
        <Line />
        <div className="p-6 pt-0">
          <h3 className="text-xl font-semibold mb-4 pt-4">Customer Details</h3>
          <div className="sm:flex items-center flex-wrap gap-2">
            <div className="sm:sm:w-[49%] w-full">
              <label>Seller Name</label>
              <input
                className="flex h-10 rounded-md border border-gray-200 bg-white px-3 py-2 text-sm w-full mt-2"
                type="text"
                value={sellerName}
                onChange={(e) => setSellerName(e.target.value)}
              />
            </div>
            <div className="sm:sm:w-[49%] w-full">
              <label>Customer Name</label>
              <input
                className="flex h-10 w-full mt-2 rounded-md border border-gray-200 bg-white px-3 py-2 text-sm"
                type="text"
                placeholder="Customer Name"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
              />
            </div>
            <div className="w-full mt-1 sm:flex gap-2">
              <div className="w-full">
                <label className="mb-2">Date</label>
                <button className="inline-flex items-center font-medium h-10 w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm">
                  <Calendar
                    size={20}
                    className="mr-2 h-4 w-4"
                    color="#6b7280"
                  />
                  <span className="text-gray-500">{today}</span>
                </button>
              </div>
              <div className="w-full">
                <label className="mb-2">Search Items</label>
                <input
                  className="flex h-10 rounded-md border border-gray-200 bg-white px-3 py-2 w-full"
                  type="text"
                  placeholder="Search Items..."
                  value={searchItems}
                  onChange={(e) => setSearchItems(e.target.value)}
                />
              </div>
            </div>
          </div>
          <h3 className="text-xl font-semibold mt-6 mb-4">Items Details</h3>
          <div>
            <div className="w-full">
              <label>Item Name</label>
              <input
                className="flex h-10 rounded-md border border-gray-200 bg-white px-3 py-2 text-sm w-full mt-2"
                type="text"
                value={itemName}
                placeholder="Item name"
                onChange={(e) => setItemName(e.target.value)}
              />
            </div>
            <div className="sm:flex items-center flex-wrap gap-2 mt-2">
              <div className="sm:sm:w-[32.3%] w-full">
                <label>Quantity</label>
                <input
                  className="flex h-10 rounded-md border border-gray-200 px-3 py-2 text-sm w-full mt-2"
                  type="number"
                  value={count}
                  onChange={handleChange}
                />
              </div>
              <div className="sm:sm:w-[32.3%] w-full">
                <label>Price</label>
                <input
                  className="flex h-10 rounded-md border border-gray-200 bg-white px-3 py-2 text-sm w-full mt-2"
                  type="number"
                  placeholder="Price"
                  value={price}
                  onChange={priceChange}
                />
              </div>
              <div className="sm:w-[32.3%] w-full">
                <label>Discount</label>
                <input
                  className="flex h-10 rounded-md border border-gray-200 bg-white px-3 py-2 text-sm w-full mt-2"
                  type="text"
                  value={discount}
                  onChange={(e) => setDiscount(e.target.value)}
                />
              </div>
            </div>
          </div>
          <div className="flex sm:justify-end mt-5">
            <button
              onClick={handleAddItem}
              className="inline-flex items-center justify-center rounded-md text-sm font-medium cursor-pointer bg-black text-white hover:bg-black/80 h-10 px-4 py-2 w-full transition"
            >
              <Plus color="#ffffff" className="mr-1" />
              Add Item
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Invoice;
