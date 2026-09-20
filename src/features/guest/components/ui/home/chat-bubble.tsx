import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Text } from "@/components/ui";

type ChatBubbleProps = {
  role: "user" | "assistant";
  children: ReactNode;
};

export function ChatBubble({ role, children }: ChatBubbleProps) {
  const user = role === "user";

  return (
    <div
      className={cn(
        "max-w-[88%] rounded-lg border px-3.5 py-3",
        user
          ? "border-primary bg-primary/10 self-end"
          : "border-border bg-panel self-start",
      )}
    >
      <Text as="div" size="xs" tone={user ? "default" : "link"}>
        {children}
      </Text>
    </div>
  );
}
