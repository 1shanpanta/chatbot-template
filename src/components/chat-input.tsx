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

  const hasInput = input.trim().length > 0;

  return (
    <div className="border-t border-border/40 bg-background px-4 py-3">
      <form
        onSubmit={handleSubmit}
        className="relative mx-auto max-w-3xl rounded-2xl border border-border/70 bg-background shadow-sm transition-colors focus-within:border-foreground/20 dark:border-border dark:bg-card dark:focus-within:border-foreground/15"
      >
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={appConfig.inputPlaceholder}
          aria-label="Chat message"
          rows={1}
          disabled={isLoading}
          className="block w-full resize-none bg-transparent px-4 pt-3.5 pb-3.5 pr-14 text-[14px] leading-relaxed outline-none placeholder:text-muted-foreground/50 disabled:opacity-50"
          style={{ fieldSizing: "content", maxHeight: 200 } as React.CSSProperties}
        />
        <button
          type="submit"
          disabled={!hasInput || isLoading}
          aria-label={isLoading ? "Sending..." : "Send message"}
          className={`absolute bottom-2.5 right-2.5 flex h-8 w-8 items-center justify-center rounded-xl transition-all duration-150 ${
            hasInput && !isLoading
              ? "bg-foreground text-background hover:bg-foreground/85"
              : "bg-muted text-muted-foreground/40 cursor-not-allowed"
          }`}
        >
          {isLoading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <ArrowUp className="h-4 w-4" strokeWidth={2.5} />
          )}
        </button>
      </form>
    </div>
  );
}
