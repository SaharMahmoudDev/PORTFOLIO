import type { ComponentProps } from "react";
import { Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { Input } from "./input";

type SearchFieldProps = Omit<ComponentProps<"input">, "type"> & {
  label: string;
};

export function SearchField({ label, className, ...props }: SearchFieldProps) {
  return (
    <label
      className={cn(
        "border-border bg-panel focus-within:border-primary flex min-w-56 items-center gap-2.5 rounded-lg border px-4 py-2.5",
        className,
      )}
    >
      <Search size={14} className="text-fg-faint" aria-hidden="true" />
      <Input type="search" aria-label={label} className="flex-1" {...props} />
    </label>
  );
}
