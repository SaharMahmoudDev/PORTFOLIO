import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Text } from "./text";

type FieldProps = {
  label: string;
  htmlFor?: string;
  error?: string;
  optional?: string;
  className?: string;
  children: ReactNode;
};

export function Field({
  label,
  htmlFor,
  error,
  optional,
  className,
  children,
}: FieldProps) {
  return (
    <div className={cn("flex flex-col gap-2.5", className)}>
      <label htmlFor={htmlFor} className="flex items-baseline gap-2">
        <Text as="span" font="mono" size="xs" tone="subtle">
          {label}
        </Text>
        {optional && (
          <Text as="span" font="mono" size="2xs" tone="faint">
            {optional}
          </Text>
        )}
      </label>
      {children}
      {error && (
        <Text as="p" font="mono" size="2xs" tone="term-amber" role="alert">
          {error}
        </Text>
      )}
    </div>
  );
}
