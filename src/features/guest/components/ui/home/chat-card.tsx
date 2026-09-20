"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowRight, Sparkles } from "lucide-react";
import { useTranslations } from "next-intl";
import { Button, Dot, Input, Tag, Text } from "@/components/ui";
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
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => {
    const el = listRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages, pending]);

  useEffect(() => () => clearTimeout(timer.current), []);

  const send = (text: string, replyKey = "fallback") => {
    const question = text.trim();
    if (!question || pending) return;

    setMessages((prev) => [
      ...prev,
      { id: nextId.current++, role: "user", text: question },
    ]);
    setValue("");
    setPending(true);

    timer.current = setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: nextId.current++,
          role: "assistant",
          text: t(`replies.${replyKey}`),
        },
      ]);
      setPending(false);
    }, 700);
  };

  return (
    <div className="relative">
      <div className="pointer-events-none absolute -start-10 -top-8 size-80 rounded-full bg-[radial-gradient(circle,rgba(53,212,130,0.16),rgba(53,212,130,0)_70%)] blur-[60px]" />

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
              onClick={() => send(t(`suggestions.${key}`), key)}
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
            send(value);
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
