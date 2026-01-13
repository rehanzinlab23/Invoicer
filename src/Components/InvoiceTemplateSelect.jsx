import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function InvoiceTemplateSelect({ value, onChange }) {
  return (
    <Select
      value={value}
      onValueChange={(val) => {
        onChange(val);
      }}
    >
      <SelectTrigger className="w-48">
        <SelectValue placeholder="Select Template" />
      </SelectTrigger>

      <SelectContent>
        <SelectGroup>
          <SelectLabel>Templates</SelectLabel>

          <SelectItem value="Classic">Classic</SelectItem>
          <SelectItem value="SoftShadow">Soft Shadow</SelectItem>
          <SelectItem value="StripeEdge">Stripe Edge</SelectItem>
          <SelectItem value="Corporate">Corporate</SelectItem>
          <SelectItem value="Elegant">Elegant</SelectItem>
          <SelectItem value="Minimal">Minimal</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
