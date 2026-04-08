"use client";

import { useState } from "react";
import { ArrowUp, Loader2 } from "lucide-react";
import { appConfig } from "@/lib/config";

export function ChatInput({
  onSend,
  isLoading,
}: {
  onSend: (text: string) => void;
  isLoading: boolean;
}) {
  const [input, setInput] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = input.trim();
    if (!trimmed || isLoading) return;
    onSend(trimmed);
    setInput("");
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  }

  return (
    <div className="px-4 pb-4 pt-2">
      <form
        onSubmit={handleSubmit}
        className="relative mx-auto max-w-3xl"
      >
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={appConfig.inputPlaceholder}
          aria-label="Chat message"
          rows={1}
          disabled={isLoading}
          className="w-full resize-none rounded-xl bg-muted/50 py-3 pl-4 pr-12 text-[14px] leading-relaxed outline-none transition-colors placeholder:text-muted-foreground/50 focus:bg-muted/70 disabled:opacity-50 dark:bg-muted/30 dark:focus:bg-muted/40"
          style={{ fieldSizing: "content", maxHeight: 200 } as React.CSSProperties}
        />
        <button
          type="submit"
          disabled={!input.trim() || isLoading}
          aria-label={isLoading ? "Sending..." : "Send message"}
          className="absolute bottom-2 right-2 flex h-7 w-7 items-center justify-center rounded-lg bg-primary text-primary-foreground transition-all duration-150 hover:bg-primary/90 disabled:opacity-20 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <Loader2 className="h-3.5 w-3.5 animate-spin" />
          ) : (
            <ArrowUp className="h-3.5 w-3.5" />
          )}
        </button>
      </form>
    </div>
  );
}
