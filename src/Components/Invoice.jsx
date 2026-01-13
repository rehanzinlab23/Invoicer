import { Calendar, Plus, User, ShoppingBag, Tag, Search } from "lucide-react";
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
  const [discount, setDiscount] = useState("0%");
  const inputStyle =
    "flex h-12 w-full rounded-2xl border border-slate-200 bg-white px-4 py-2 text-sm transition-all duration-200 outline-none focus:border-blue-400 focus:ring-4 focus:ring-blue-500/10 placeholder:text-slate-400 disabled:cursor-not-allowed disabled:opacity-50";

  const labelStyle =
    "text-[10px] font-black uppercase tracking-[0.15em] text-slate-500 mb-2 ml-1 flex items-center gap-2";

  const handleAddItem = () => {
    if (!itemName || !price || !customerName || !count || !sellerName) {
      toast.error("Please fill all required fields!");
      return;
    }
    const newItem = {
      itemName,
      price: parseFloat(price),
      count: parseInt(count),
      discount,
    };
    setItems([...items, newItem]);
    toast.success("Item added to invoice");
    setItemName("");
    setPrice("");
    setDiscount("0%");
    setCount(1);
  };

  return (
    <div className="mt-6 mb-12 max-w-5xl mx-auto px-2 sm:px-6 lg:px-8">
      <div className="overflow-hidden rounded-[32px] border border-white/40 bg-white/30 backdrop-blur-2xl shadow-2xl">
        <div className="p-5 sm:p-10 border-b border-slate-200/50">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-1">
              <div className="flex flex-wrap items-center gap-3">
                <h3 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tighter">
                  INVOICE
                </h3>
                <span className="rounded-full bg-blue-600 px-3 py-1 text-[9px] font-black text-white uppercase tracking-widest shadow-lg shadow-blue-500/30">
                  New Draft
                </span>
              </div>
              <p className="text-xs sm:text-sm font-medium text-slate-500 text-pretty">
                Generate professional invoice in seconds.
              </p>
            </div>

            <div className="flex items-center gap-3 self-start bg-white/60 px-4 py-2 rounded-2xl border border-white shadow-sm">
              <Calendar size={14} className="text-blue-500" />
              <span className="text-xs sm:text-sm font-bold text-slate-700">
                {today}
              </span>
            </div>
          </div>
        </div>

        <div className="p-5 sm:p-10 space-y-8 sm:space-y-10">
          {/* Section 1 */}
          <section>
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-slate-900 rounded-xl shadow-md shrink-0">
                <User size={18} className="text-white" />
              </div>
              <h3 className="font-black text-slate-800 uppercase text-sm tracking-tight">
                Entity Details
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="w-full">
                <label className={labelStyle}>Seller Name</label>
                <input
                  className={inputStyle}
                  type="text"
                  placeholder="Your Business"
                  value={sellerName}
                  onChange={(e) => setSellerName(e.target.value)}
                />
              </div>
              <div className="w-full">
                <label className={labelStyle}>Customer Name</label>
                <input
                  className={inputStyle}
                  type="text"
                  placeholder="Client Name"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                />
              </div>
            </div>
          </section>

          <Line />

          {/* Section 2 */}
          <section className="bg-slate-50/60 -mx-5 sm:mx-0 sm:rounded-[24px] p-5 sm:p-8 border-y sm:border border-slate-100">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-8">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-600 rounded-xl shadow-lg shadow-blue-500/20 shrink-0">
                  <ShoppingBag size={18} className="text-white" />
                </div>
                <h3 className="font-black text-slate-800 uppercase text-sm tracking-tight">
                  Item Details
                </h3>
              </div>

              <div className="relative w-full lg:w-72">
                <Search
                  size={16}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                />
                <input
                  className={`${inputStyle} pl-11 h-10! bg-white`}
                  type="text"
                  placeholder="Quick search..."
                  value={searchItems}
                  onChange={(e) => setSearchItems(e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <label className={labelStyle}>Item Description</label>
                <input
                  className={inputStyle}
                  type="text"
                  placeholder="What are you selling?"
                  value={itemName}
                  onChange={(e) => setItemName(e.target.value)}
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                <div>
                  <label className={labelStyle}>Quantity</label>
                  <input
                    className={inputStyle}
                    type="number"
                    min="1"
                    value={count}
                    onChange={(e) => setCount(e.target.value)}
                  />
                </div>
                <div>
                  <label className={labelStyle}>Price ($)</label>
                  <input
                    className={inputStyle}
                    type="number"
                    placeholder="0.00"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                  />
                </div>
                <div className="sm:col-span-2 lg:col-span-1">
                  <label className={labelStyle}>Discount</label>
                  <div className="relative">
                    <Tag
                      size={14}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                    />
                    <input
                      className={`${inputStyle} pl-10`}
                      type="text"
                      value={discount}
                      onChange={(e) => setDiscount(e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <button
                onClick={handleAddItem}
                className="group flex items-center justify-center gap-3 rounded-2xl bg-slate-900 px-8 py-4 text-xs sm:text-sm font-black text-white hover:bg-slate-800 active:scale-[0.97] transition-all w-full sm:w-auto shadow-xl shadow-slate-900/10"
              >
                <Plus size={18} />
                <span>ADD ITEM TO LIST</span>
              </button>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Invoice;
