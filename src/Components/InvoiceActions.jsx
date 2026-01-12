import Btns from "./Btns";
import Line from "./Line";

const InvoiceActions = () => {
  return (
    <div className="mt-5.5 mb-5">
      <div className="rounded-lg border border-gray-200 bg-white text-black shadow-sm">
        <div className="flex flex-col space-y-1.5 p-6 pb-4">
          <h3 className="text-2xl font-semibold leading-none tracking-tight uppercase">
            Actions
          </h3>
        </div>
        <Line />
        <Btns />
      </div>
    </div>
  );
};

export default InvoiceActions;
