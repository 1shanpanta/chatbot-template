"use client";

import { useEffect, useState } from "react";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { useChatStore } from "@/lib/store";
import { Sidebar } from "./sidebar";
import { ChatArea } from "./chat-area";
import { EmptyState } from "./empty-state";

export function ChatLayout() {
  const [hydrated, setHydrated] = useState(false);
  const [pendingPrompt, setPendingPrompt] = useState<string | null>(null);
  const activeId = useChatStore((s) => s.activeConversationId);
  const conversations = useChatStore((s) => s.conversations);
  const createConversation = useChatStore((s) => s.createConversation);
  const sidebarOpen = useChatStore((s) => s.sidebarOpen);
  const setSidebarOpen = useChatStore((s) => s.setSidebarOpen);

  const activeConversation = conversations.find((c) => c.id === activeId);

  // Hydrate zustand persist store (syncing with localStorage)
  useEffect(() => {
    setHydrated(true);
  }, []);

  if (!hydrated) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="h-6 w-6 animate-spin rounded-full border-2 border-foreground/20 border-t-foreground/70" />
      </div>
    );
  }

  function handlePromptFromEmpty(text: string) {
    createConversation();
    setPendingPrompt(text);
  }

  function handlePromptConsumed() {
    setPendingPrompt(null);
  }

  return (
    <div className="flex h-full">
      {/* Desktop sidebar */}
      <div className="hidden md:block">
        <Sidebar />
      </div>

      {/* Mobile sidebar */}
      <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
        <SheetContent side="left" className="w-[280px] p-0 md:hidden">
          <Sidebar />
        </SheetContent>
      </Sheet>

      {/* Main chat area */}
      <div className="flex flex-1 flex-col min-h-0">
        {/* Mobile header */}
        <div className="flex items-center gap-2 border-b px-4 py-2.5 md:hidden">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={() => setSidebarOpen(true)}
            aria-label="Open menu"
          >
            <Menu className="h-4 w-4" />
          </Button>
          <span className="text-[13px] font-medium truncate text-foreground/80">
            {activeConversation?.title ?? "Chat"}
          </span>
        </div>

        {activeConversation ? (
          <ChatArea
            key={activeConversation.id}
            conversationId={activeConversation.id}
            initialMessages={activeConversation.messages}
            initialPrompt={pendingPrompt}
            onPromptConsumed={handlePromptConsumed}
          />
        ) : (
          <div className="flex flex-1 flex-col">
            <EmptyState onPrompt={handlePromptFromEmpty} />
          </div>
        )}
      </div>
    </div>
  );
}
