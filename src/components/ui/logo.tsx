import { cn } from "@/lib/utils";
import { Text } from "./text";

export function Logo({ className }: { className?: string }) {
  return (
    <span className={cn("text-link flex items-center gap-2.5", className)}>
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M8 4 2 12l6 8"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M16 4l6 8-6 8"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <Text as="span" font="mono" size="sm" tone="default">
        Sahar Mahmoud
      </Text>
    </span>
  );
}
