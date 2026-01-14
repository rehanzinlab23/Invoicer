import invoice from "../assets/invoice.png";
import { Sun, Moon } from "lucide-react";

const Navbar = ({ theme, handleThemeSwitch }) => {
  const isDark = theme === "dark";

  return (
    <nav className="sticky top-0 z-50 w-full px-3 py-4 sm:px-6 sm:py-6">
      <div className="w-full max-w-7xl mx-auto px-2 sm:px-0">
        <div className="relative overflow-hidden rounded-4xl sm:rounded-3xl border dark:border-white/10 border-black/10 bg-white/40 dark:bg-slate-900/40 backdrop-blur-xl shadow-2xl dark:shadow-[0_20px_50px_rgba(0,0,0,0.2)] h-16 sm:h-20 flex items-center px-4 sm:px-8 sm:w-full transition-all duration-500">
          <div className="absolute inset-0 bg-linear-to-tr from-white/20 via-white/5 to-transparent pointer-events-none"></div>

          <div className="flex items-center justify-between w-full relative z-10">
            {/* Logo */}
            <div className="flex items-center gap-2 sm:gap-4 group">
              <div className="relative w-10 h-10 sm:w-12 sm:h-12 bg-slate-900 dark:bg-white rounded-xl sm:rounded-2xl flex items-center justify-center p-2 sm:p-2.5 shadow-xl transition-transform group-hover:scale-105 duration-300">
                <img
                  src={invoice}
                  alt="Invoice Logo"
                  className="w-full h-full object-contain brightness-0 invert dark:invert-0"
                />
              </div>
              <div className="flex flex-col">
                <h2 className="font-black text-lg sm:text-2xl tracking-tight text-slate-900 dark:text-white drop-shadow-sm leading-tight">
                  Invoicer
                </h2>
                <span className="text-[8px] sm:text-[10px] font-black text-blue-600 dark:text-blue-400 uppercase tracking-[0.15em] sm:tracking-[0.25em] leading-none">
                  Glass Studio
                </span>
              </div>
            </div>
            <div className="flex items-center gap-3 sm:gap-6">
              <div className="h-6 w-px bg-slate-900/10 dark:bg-white/10 hidden xs:block"></div>
              <div className="flex items-center gap-2 sm:gap-4">
                <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400 hidden md:block">
                  {isDark ? "Dark" : "Light"}
                </span>
                {/* Theme Toggle Button */}
                <button
                  onClick={handleThemeSwitch}
                  className={`relative w-12 h-7 sm:w-14 cursor-pointer sm:h-8 rounded-full border dark:border-white/20 border-black/5 transition-all duration-500 shadow-inner shrink-0 ${
                    isDark ? "bg-slate-800" : "bg-white/80"
                  }`}
                >
                  <div
                    className={`absolute top-0.5 left-0.5 w-5.5 h-5.5 sm:w-6 sm:h-6 rounded-full flex items-center justify-center transition-all duration-500 shadow-lg ${
                      isDark
                        ? "translate-x-5 sm:translate-x-6 bg-slate-700"
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
