"use client";

import { useEffect, useRef } from "react";
import { useChat } from "@ai-sdk/react";
import type { UIMessage } from "ai";
import { useChatStore } from "@/lib/store";
import { MessageList } from "./message-list";
import { ChatInput } from "./chat-input";
import { EmptyState } from "./empty-state";
import { ErrorBanner } from "./error-banner";

export function ChatArea({
  conversationId,
  initialMessages,
  initialPrompt,
  onPromptConsumed,
}: {
  conversationId: string;
  initialMessages: UIMessage[];
  initialPrompt?: string | null;
  onPromptConsumed?: () => void;
}) {
  const updateMessages = useChatStore((s) => s.updateConversationMessages);
  const updateTitle = useChatStore((s) => s.updateConversationTitle);
  const conversations = useChatStore((s) => s.conversations);
  const conversation = conversations.find((c) => c.id === conversationId);
  const promptSent = useRef(false);

  const { messages, sendMessage, status, error, clearError } = useChat({
    id: conversationId,
    messages: initialMessages,
    onFinish: ({ messages: finishedMessages }) => {
      updateMessages(conversationId, finishedMessages);

      // Auto-title from first user message
      if (conversation?.title === "New Chat") {
        const firstUserMsg = finishedMessages.find((m) => m.role === "user");
        if (firstUserMsg) {
          const text = firstUserMsg.parts
            .filter((p) => p.type === "text")
            .map((p) => p.text)
            .join("");
          const title =
            text.length > 50 ? text.substring(0, 50) + "..." : text;
          updateTitle(conversationId, title);
        }
      }
    },
  });

  // Send initial prompt if provided (syncing prop with external chat API)
  useEffect(() => {
    if (initialPrompt && !promptSent.current) {
      promptSent.current = true;
      sendMessage({ text: initialPrompt });
      onPromptConsumed?.();
    }
  }, [initialPrompt, sendMessage, onPromptConsumed]);

  const isStreaming = status === "streaming" || status === "submitted";

  function handleSend(text: string) {
    sendMessage({ text });
  }

  return (
    <div className="flex flex-1 flex-col min-h-0">
      {error && (
        <ErrorBanner message={error.message} onDismiss={clearError} />
      )}

      {messages.length === 0 && !isStreaming ? (
        <EmptyState onPrompt={handleSend} />
      ) : (
        <MessageList messages={messages} isStreaming={isStreaming} />
      )}

      <ChatInput onSend={handleSend} isLoading={isStreaming} />
    </div>
  );
}
