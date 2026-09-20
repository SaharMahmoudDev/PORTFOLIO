import type { ComponentProps } from "react";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "inverted";
type Size = "sm" | "md" | "icon";

const base =
  "inline-flex items-center justify-center gap-1.5 font-mono font-medium transition-colors";

const variantClass: Record<Variant, string> = {
  primary: "bg-primary text-primary-foreground hover:opacity-90",
  secondary:
    "border border-border-strong text-foreground hover:border-primary hover:text-primary",
  inverted: "bg-inverted-foreground text-inverted hover:opacity-90",
};

const sizeClass: Record<Size, string> = {
  sm: "rounded-md px-4 py-2 text-xs",
  md: "rounded-lg px-6 py-3.5 text-sm",
  icon: "size-8 shrink-0 rounded-[7px]",
};

type CommonProps = {
  variant?: Variant;
  size?: Size;
};

type LinkButtonProps = CommonProps & ComponentProps<typeof Link>;

type NativeButtonProps = CommonProps &
  Omit<ComponentProps<"button">, "href"> & { href?: undefined };

type ButtonProps = LinkButtonProps | NativeButtonProps;

export function Button({
  variant = "primary",
  size = "md",
  className,
  ...props
}: ButtonProps) {
  const classes = cn(base, variantClass[variant], sizeClass[size], className);

  if (props.href !== undefined) {
    return <Link className={classes} {...(props as LinkButtonProps)} />;
  }

  const { type = "button", ...rest } = props as NativeButtonProps;
  return <button type={type} className={classes} {...rest} />;
}
