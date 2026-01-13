import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Layout } from "lucide-react";

export function InvoiceTemplateSelect({ value, onChange }) {
  return (
    <div className="flex flex-col gap-2 w-full sm:min-w-60">
      <div className="flex items-center gap-2 px-1">
        <Layout size={14} className="text-blue-600" />
        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">
          Design Style
        </span>
      </div>

      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className="w-full h-12 bg-white/60! border-2 border-slate-200 rounded-2xl text-slate-900 font-bold px-4 shadow-sm transition-all focus:ring-4 focus:ring-blue-500/10">
          <SelectValue placeholder="Select Style" />
        </SelectTrigger>

        <SelectContent className="bg-white/95 backdrop-blur-3xl border-slate-200 rounded-2xl shadow-2xl p-2 z-999">
          <SelectGroup>
            <SelectLabel className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] p-2">
              Available Themes
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
                className="rounded-xl focus:bg-slate-900 focus:text-white cursor-pointer py-3 px-4 mb-1 font-semibold"
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
