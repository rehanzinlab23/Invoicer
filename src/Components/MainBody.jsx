import { useState, useEffect } from "react";
import { Toaster } from "react-hot-toast";
import InvoicePreview from "./InvoicePreview";
import Invoice from "./Invoice";
import { RandomNumber } from "../RandomNumber";
import SavedInvoices from "./SavedInvoices";

const MainBody = () => {
  const [items, setItems] = useState([]);
  const [sellerName, setSellerName] = useState("Rehan Hussain");
  const [customerName, setCustomerName] = useState("");
  const [searchItems, setSearchItems] = useState("");
  const [invoiceId, setInvoiceId] = useState(RandomNumber());
  const [savedInvoices, setSavedInvoices] = useState([]);
  const [showSavedInvoices, setShowSavedInvoices] = useState(false);

  useEffect(() => {
    const invoices = JSON.parse(localStorage.getItem("saved_invoices")) || [];
    setSavedInvoices(invoices);
  }, []);

  const handleNewInvoice = () => {
    if (items.length === 0 && customerName === "") {
      return;
    }
    const newInvoice = {
      id: invoiceId,
      items,
      sellerName,
      customerName,
    };
    const updatedInvoices = [...savedInvoices, newInvoice];
    setSavedInvoices(updatedInvoices);
    localStorage.setItem("saved_invoices", JSON.stringify(updatedInvoices));

    setItems([]);
    setCustomerName("");
    setSearchItems("");
    setInvoiceId(RandomNumber());
  };

  const loadInvoice = (invoice) => {
    setItems(invoice.items);
    setSellerName(invoice.sellerName);
    setCustomerName(invoice.customerName);
    setInvoiceId(invoice.id);
    setShowSavedInvoices(false);
  };

  const toggleSavedInvoices = () => {
    setShowSavedInvoices(!showSavedInvoices);
  };

  const deleteInvoice = (invoiceId) => {
    const updatedInvoices = savedInvoices.filter(
      (invoice) => invoice.id !== invoiceId
    );
    setSavedInvoices(updatedInvoices);
    localStorage.setItem("saved_invoices", JSON.stringify(updatedInvoices));
  };

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
        invoiceId={invoiceId}
        handleNewInvoice={handleNewInvoice}
        toggleSavedInvoices={toggleSavedInvoices}
      />
      <SavedInvoices
        savedInvoices={savedInvoices}
        loadInvoice={loadInvoice}
        deleteInvoice={deleteInvoice}
        show={showSavedInvoices}
        toggleSavedInvoices={toggleSavedInvoices}
      />
      <Toaster position="bottom-right" reverseOrder={true} />
    </div>
  );
};

export default MainBody;
