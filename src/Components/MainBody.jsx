import { useState } from "react";
import { Toaster } from "react-hot-toast";
import InvoicePreview from "./InvoicePreview";
import Invoice from "./Invoice";

const MainBody = () => {
  const [items, setItems] = useState([]);
  const [sellerName, setSellerName] = useState("Rehan Hussain");
  const [customerName, setCustomerName] = useState("");
  const [searchItems, setSearchItems] = useState("");
  const filteredItem = items.filter((item) => {
    return item.itemName.toLowerCase().includes(searchItems.toLowerCase());
  });
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-4">
      {/* Left */}
      <Invoice
        items={filteredItem}
        setItems={setItems}
        sellerName={sellerName}
        setSellerName={setSellerName}
        customerName={customerName}
        setCustomerName={setCustomerName}
        searchItems={searchItems}
        setSearchItems={setSearchItems}
      />
      {/* Right */}
      <InvoicePreview
        items={filteredItem}
        setItems={setItems}
        sellerName={sellerName}
        customerName={customerName}
        searchItems={searchItems}
      />
      <Toaster position="bottom-right" reverseOrder={true} />
    </div>
  );
};

export default MainBody;
