"use client";

import { useState } from "react";
import { SendHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
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
    <form
      onSubmit={handleSubmit}
      className="border-t bg-background px-4 py-3"
    >
      <div className="mx-auto flex max-w-3xl items-end gap-2">
        <Textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={appConfig.inputPlaceholder}
          className="min-h-[44px] max-h-[200px] resize-none"
          rows={1}
          disabled={isLoading}
        />
        <Button
          type="submit"
          size="icon"
          className="h-[44px] w-[44px] shrink-0"
          disabled={!input.trim() || isLoading}
        >
          <SendHorizontal className="h-4 w-4" />
        </Button>
      </div>
    </form>
  );
}
