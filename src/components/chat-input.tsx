"use client";

import { useState } from "react";
import { ArrowUp, Loader2 } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
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
        className="mx-auto max-w-3xl rounded-2xl border border-border/60 bg-card shadow-[0_2px_12px_0_rgba(0,0,0,0.04)] transition-shadow focus-within:shadow-[0_2px_20px_0_rgba(0,0,0,0.06)] focus-within:border-border"
      >
        <Textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={appConfig.inputPlaceholder}
          aria-label="Chat message"
          className="min-h-[48px] max-h-[200px] resize-none border-0 bg-transparent px-4 py-3.5 text-[14px] shadow-none ring-0 focus-visible:ring-0 focus-visible:border-0 placeholder:text-muted-foreground/60"
          rows={1}
          disabled={isLoading}
        />
        <div className="flex items-center justify-end px-3 pb-3">
          <button
            type="submit"
            disabled={!input.trim() || isLoading}
            aria-label={isLoading ? "Sending..." : "Send message"}
            className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground transition-all duration-150 hover:bg-primary/90 disabled:opacity-30 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <ArrowUp className="h-4 w-4" />
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
