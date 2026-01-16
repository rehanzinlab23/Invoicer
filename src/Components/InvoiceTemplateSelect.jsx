import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/Components/ui/select";
import { Layout } from "lucide-react";

export function InvoiceTemplateSelect({ value, onChange }) {
  return (
    <div className="flex flex-col gap-1.5 sm:w-full min-w-10">
      {/* Label */}
      <div className="flex items-center gap-2 px-1">
        <Layout
          size={13}
          className="text-blue-600 dark:text-blue-400 shrink-0"
        />
        <span className="text-[9px] sm:text-[10px] font-black uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
          Design your Invoice
        </span>
      </div>
      <Select value={value} onValueChange={onChange}>
        {/* Trigger */}
        <SelectTrigger
          className="
            w-full
            h-10 sm:h-12
            bg-white/70 dark:bg-slate-800/70
            border-2 border-slate-200 dark:border-slate-700
            rounded-xl sm:rounded-2xl
            text-slate-900 dark:text-slate-100
            font-semibold sm:font-bold
            px-3 sm:px-4
            text-sm sm:text-base
            shadow-sm
            transition-all
            focus:ring-4 focus:ring-blue-500/10
          "
        >
          <SelectValue placeholder="Select Style" />
        </SelectTrigger>
        {/* Dropdown */}
        <SelectContent
          className="
            w-(--radix-select-trigger-width)
            bg-white/95 dark:bg-slate-900/95
            backdrop-blur-3xl
            border border-slate-200 dark:border-slate-700
            rounded-xl sm:rounded-2xl
            shadow-2xl
            p-1.5 sm:p-2
            z-50
          "
        >
          {/* Template Selection */}
          <SelectGroup>
            <SelectLabel className="text-[8px] sm:text-[9px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] px-2 py-1.5">
              Available Templates
            </SelectLabel>
            {[
              "Classic",
              "SoftShadow",
              "StripeEdge",
              "Corporate",
              "Elegant",
              "Minimal",
            ].map((t) => (
              <SelectItem
                key={t}
                value={t}
                className="
                  rounded-lg sm:rounded-xl
                  py-2.5 sm:py-3
                  px-3 sm:px-4
                  text-sm sm:text-base
                  font-medium sm:font-semibold
                  dark:text-white
                  cursor-pointer
                  focus:bg-slate-900 focus:text-white
                  dark:focus:bg-white dark:focus:text-slate-900
                "
              >
                {t}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}
