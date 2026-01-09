import invoice from "../assets/invoice.png";

const Navbar = () => {
  return (
    <div>
      <div className="text-card-foreground shadow-sm bg-white rounded-lg h-25 flex items-center relative">
        <div className="p-6 py-0 w-full">
          <div className="flex items-center gap-2">
            <div className="w-10 aspect-square rounded-full flex items-center justify-center font-bold text-xl text-white">
              <img src={invoice} alt="Invoice Logo" />
            </div>
            <h2 className="font-semibold text-3xl">Invoicer</h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
