"use client";

import type { UIMessage } from "ai";
import { Bot, User } from "lucide-react";
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
      className={`group flex gap-3 px-4 py-3 ${
        isUser ? "flex-row-reverse" : ""
      }`}
    >
      <div
        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${
          isUser
            ? "bg-primary text-primary-foreground"
            : "bg-muted text-muted-foreground"
        }`}
      >
        {isUser ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
      </div>

      <div
        className={`flex max-w-[80%] flex-col gap-1 ${
          isUser ? "items-end" : "items-start"
        }`}
      >
        <div
          className={`rounded-2xl px-4 py-2.5 ${
            isUser
              ? "bg-primary text-primary-foreground rounded-tr-sm"
              : "bg-muted rounded-tl-sm"
          }`}
        >
          {isUser ? (
            <p className="text-sm whitespace-pre-wrap">{text}</p>
          ) : (
            <div className="text-sm prose-sm">
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
