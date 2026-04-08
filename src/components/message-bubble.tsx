"use client";

import type { UIMessage } from "ai";
import { appConfig } from "@/lib/config";
import { MarkdownRenderer } from "./markdown-renderer";
import { CopyButton } from "./copy-button";

function getTextContent(message: UIMessage): string {
  return message.parts
    .filter((part) => part.type === "text")
    .map((part) => part.text)
    .join("");
}

export function MessageBubble({ message }: { message: UIMessage }) {
  const isUser = message.role === "user";
  const text = getTextContent(message);

  return (
    <div
      className={`group flex gap-3.5 px-4 py-4 ${
        isUser ? "flex-row-reverse" : ""
      }`}
    >
      <div
        className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-xs font-semibold select-none ${
          isUser
            ? "bg-primary text-primary-foreground"
            : "bg-foreground/[0.08] text-foreground/60"
        }`}
      >
        {isUser ? (
          <div className="h-2.5 w-2.5 rounded-full bg-primary-foreground/80" />
        ) : (
          appConfig.name.charAt(0)
        )}
      </div>

      <div
        className={`flex max-w-[75%] flex-col gap-1.5 ${
          isUser ? "items-end" : "items-start"
        }`}
      >
        <div
          className={`rounded-2xl px-4 py-2.5 ${
            isUser
              ? "bg-primary text-primary-foreground rounded-tr-md"
              : "bg-muted/60 rounded-tl-md"
          }`}
        >
          {isUser ? (
            <p className="text-[14px] leading-relaxed whitespace-pre-wrap">
              {text}
            </p>
          ) : (
            <div className="text-[14px] leading-relaxed">
              <MarkdownRenderer content={text} />
            </div>
          )}
        </div>

        {!isUser && text && (
          <div className="flex items-center pl-1">
            <CopyButton text={text} />
          </div>
        )}
      </div>
    </div>
  );
}
