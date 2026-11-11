"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowRight, Sparkles } from "lucide-react";
import { useTranslations } from "next-intl";
import { Button, Dot, Glow, Input, Tag, Text } from "@/components/ui";
import { askSaharsAi } from "../../../actions/ask-ai";
import { ChatBubble } from "./chat-bubble";

const suggestions = ["build", "best", "available"] as const;

type Message = { id: number; role: "user" | "assistant"; text: string };

export function ChatCard() {
  const t = useTranslations("home.askAi.chat");
  const [messages, setMessages] = useState<Message[]>([]);
  const [value, setValue] = useState("");
  const [pending, setPending] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);
  const nextId = useRef(0);

  useEffect(() => {
    const el = listRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages, pending]);

  const send = async (text: string) => {
    const question = text.trim();
    if (!question || pending) return;

    const history = messages.map((message) => ({
      role: message.role,
      text: message.text,
    }));

    setMessages((prev) => [
      ...prev,
      { id: nextId.current++, role: "user", text: question },
    ]);
    setValue("");
    setPending(true);

    const result = await askSaharsAi({ message: question, history });

    setMessages((prev) => [
      ...prev,
      {
        id: nextId.current++,
        role: "assistant",
        text: result.ok ? result.reply : t(`errors.${result.error}`),
      },
    ]);
    setPending(false);
  };

  return (
    <div className="relative">
      <Glow
        intensity="soft"
        className="inset-s-0 -top-8 size-64 sm:size-80 lg:-inset-s-10"
      />

      <div className="border-border bg-card relative overflow-hidden rounded-[10px] border">
        <div className="border-border bg-panel flex items-center justify-between gap-2.5 border-b px-5 py-4">
          <div className="flex items-center gap-2.5">
            <span className="border-border-strong bg-secondary flex size-7.5 items-center justify-center rounded-full border">
              <Sparkles size={15} className="text-primary" aria-hidden="true" />
            </span>
            <Text as="span" font="mono" size="xs" tone="default">
              {t("name")}
            </Text>
          </div>
          <div className="flex items-center gap-1.5">
            <Dot size="xs" />
            <Text as="span" font="mono" size="2xs" tone="faint">
              {t("online")}
            </Text>
          </div>
        </div>

        <div
          ref={listRef}
          role="log"
          aria-live="polite"
          className="flex max-h-72 min-h-40 flex-col gap-3 overflow-y-auto px-5 pt-5 pb-1.5"
        >
          <ChatBubble role="assistant">{t("greeting")}</ChatBubble>
          {messages.map((message) => (
            <ChatBubble key={message.id} role={message.role}>
              {message.text}
            </ChatBubble>
          ))}
          {pending && (
            <ChatBubble role="assistant">
              <span className="sr-only">{t("typing")}</span>
              <span aria-hidden="true">…</span>
            </ChatBubble>
          )}
        </div>

        <div className="flex flex-wrap gap-2 px-5 pt-3.5 pb-5">
          {suggestions.map((key) => (
            <button
              key={key}
              type="button"
              disabled={pending}
              onClick={() => send(t(`suggestions.${key}`))}
              className="rounded-full disabled:opacity-50"
            >
              <Tag shape="pill" interactive>
                {t(`suggestions.${key}`)}
              </Tag>
            </button>
          ))}
        </div>

        <form
          onSubmit={(event) => {
            event.preventDefault();
            void send(value);
          }}
          className="border-border focus-within:border-primary flex items-center gap-2.5 border-t px-5 py-3.5"
        >
          <Input
            value={value}
            onChange={(event) => setValue(event.target.value)}
            placeholder={t("placeholder")}
            aria-label={t("placeholder")}
            className="flex-1"
          />
          <Button
            type="submit"
            size="icon"
            disabled={pending || !value.trim()}
            aria-label={t("send")}
            className="disabled:opacity-50"
          >
            <ArrowRight
              size={14}
              className="rtl:-scale-x-100"
              aria-hidden="true"
            />
          </Button>
        </form>
      </div>
    </div>
  );
}
