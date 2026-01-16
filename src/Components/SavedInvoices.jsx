import { X, Trash2 } from "lucide-react";

const SavedInvoices = ({
  savedInvoices,
  loadInvoice,
  deleteInvoice,
  show,
  toggleSavedInvoices,
}) => {
  if (!show) {
    return null;
  }

  const handleDelete = (e, invoiceId) => {
    e.stopPropagation();
    deleteInvoice(invoiceId);
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50">
      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl w-full max-w-2xl max-h-[80vh] flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
            Saved Invoices
          </h2>
          <button
            onClick={toggleSavedInvoices}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <X
              size={24}
              className="text-gray-600 dark:text-gray-300 cursor-pointer"
            />
          </button>
        </div>
        {/* Modal */}
        <div className="p-6 overflow-y-auto">
          {savedInvoices.length > 0 ? (
            <ul className="space-y-4">
              {savedInvoices.map((invoice) => (
                <li
                  key={invoice.id}
                  onClick={() => loadInvoice(invoice)}
                  className="cursor-pointer group"
                >
                  <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg border border-gray-200 dark:border-gray-700 group-hover:bg-blue-50 dark:group-hover:bg-blue-900/50 group-hover:border-blue-300 dark:group-hover:border-blue-600 transition-all duration-300">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-bold text-gray-800 dark:text-white">
                          Invoice #{invoice.id}
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                          {invoice.customerName || "No Customer Name"}
                        </p>
                      </div>
                      <div className="flex items-center">
                        <div className="text-right mr-4">
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            Items: {invoice.items.length}
                          </p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            Total: $
                            {invoice.items
                              .reduce((a, i) => {
                                const d = (parseFloat(i.discount) || 0) / 100;
                                return a + i.price * i.count * (1 - d);
                              }, 0)
                              .toFixed(2)}
                          </p>
                        </div>
                        <button
                          onClick={(e) => handleDelete(e, invoice.id)}
                          className="p-2 rounded-full hover:bg-red-100 text-red-500 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                          title="Delete Invoice"
                        >
                          <Trash2 size={20} />
                        </button>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500 dark:text-gray-400">
                No saved invoices yet.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SavedInvoices;
