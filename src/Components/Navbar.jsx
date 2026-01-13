import { useState } from "react";
import invoice from "../assets/invoice.png";
import { Sun, Moon } from "lucide-react";

const Navbar = () => {
  const [isDark, setIsDark] = useState(false);

  return (
    <nav className="sticky top-0 z-50 w-full px-3 py-4 sm:px-6 sm:py-6">
      <div className="max-w-7xl mx-auto">
        {/* Adjusted height and padding for mobile (h-16 on mobile, h-20 on desktop) */}
        <div className="relative overflow-hidden rounded-4xl sm:rounded-3xl border border-white/40 bg-white/20 backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.1)] h-16 sm:h-20 flex items-center px-4 sm:px-8 transition-all duration-500">
          <div className="absolute inset-0 bg-linear-to-tr from-white/20 via-white/5 to-transparent pointer-events-none"></div>

          <div className="flex items-center justify-between w-full relative z-10">
            {/* Logo Section */}
            <div className="flex items-center gap-2 sm:gap-4 group">
              <div className="relative w-10 h-10 sm:w-12 sm:h-12 bg-slate-900 rounded-xl sm:rounded-2xl flex items-center justify-center p-2 sm:p-2.5 shadow-xl transition-transform group-hover:scale-105 duration-300">
                <img
                  src={invoice}
                  alt="Invoice Logo"
                  className="w-full h-full object-contain brightness-0 invert"
                />
              </div>
              <div className="flex flex-col">
                <h2 className="font-black text-lg sm:text-2xl tracking-tight text-slate-900 drop-shadow-sm leading-tight">
                  Invoicer
                </h2>
                <span className="text-[8px] sm:text-[10px] font-black text-blue-600 uppercase tracking-[0.15em] sm:tracking-[0.25em] leading-none">
                  Glass Studio
                </span>
              </div>
            </div>

            {/* Right Side Section */}
            <div className="flex items-center gap-3 sm:gap-6">
              {/* Divider: Hidden on very small screens */}
              <div className="h-6 w-px bg-slate-900/10 hidden xs:block"></div>

              <div className="flex items-center gap-2 sm:gap-4">
                {/* Mode Label: Desktop only */}
                <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-widest text-slate-500 hidden md:block">
                  {isDark ? "Dark" : "Light"}
                </span>

                {/* Theme Toggle Button */}
                <button
                  onClick={() => setIsDark(!isDark)}
                  className={`relative w-12 h-7 sm:w-14 sm:h-8 rounded-full border border-white/50 transition-all duration-500 shadow-inner shrink-0 ${
                    isDark ? "bg-slate-900/80" : "bg-white/40"
                  }`}
                >
                  <div
                    className={`absolute top-0.5 left-0.5 w-5.5 h-5.5 sm:w-6 sm:h-6 rounded-full flex items-center justify-center transition-all duration-500 shadow-lg ${
                      isDark
                        ? "translate-x-5 sm:translate-x-6 bg-slate-800"
                        : "translate-x-0 bg-white"
                    }`}
                  >
                    {isDark ? (
                      <Moon
                        size={10}
                        className="text-blue-400 fill-blue-400 sm:size-3"
                      />
                    ) : (
                      <Sun
                        size={10}
                        className="text-amber-500 fill-amber-500 sm:size-3"
                      />
                    )}
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
