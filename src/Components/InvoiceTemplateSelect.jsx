import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function InvoiceTemplateSelect() {
  return (
    <Select>
      <SelectTrigger className="w-45">
        <SelectValue placeholder="Select Template" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Templates</SelectLabel>
          <SelectItem value="Soft Shadow">Soft Shadow</SelectItem>
          <SelectItem value="Stripe Edge">Stripe Edge</SelectItem>
          <SelectItem value="Corporate">Corporate</SelectItem>
          <SelectItem value="Elegant">Elegant</SelectItem>
          <SelectItem value="Minimal">Minimal</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
