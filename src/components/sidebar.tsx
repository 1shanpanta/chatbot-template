"use client";

import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { useChatStore } from "@/lib/store";
import { appConfig } from "@/lib/config";
import { ThemeToggle } from "./theme-toggle";
import { SidebarItem } from "./sidebar-item";

export function Sidebar() {
  const conversations = useChatStore((s) => s.conversations);
  const activeId = useChatStore((s) => s.activeConversationId);
  const createConversation = useChatStore((s) => s.createConversation);
  const deleteConversation = useChatStore((s) => s.deleteConversation);
  const setActive = useChatStore((s) => s.setActiveConversation);

  return (
    <div className="flex h-full w-[280px] flex-col bg-card border-r">
      <div className="flex items-center justify-between px-4 py-3">
        <h1 className="text-sm font-semibold truncate">{appConfig.name}</h1>
        <ThemeToggle />
      </div>
      <div className="px-3 pb-2">
        <Button
          variant="outline"
          className="w-full justify-start gap-2"
          onClick={createConversation}
        >
          <Plus className="h-4 w-4" />
          New Chat
        </Button>
      </div>
      <Separator />
      <ScrollArea className="flex-1 px-3 py-2">
        <div className="flex flex-col gap-0.5">
          {conversations.map((conversation) => (
            <SidebarItem
              key={conversation.id}
              conversation={conversation}
              isActive={conversation.id === activeId}
              onSelect={() => setActive(conversation.id)}
              onDelete={() => deleteConversation(conversation.id)}
            />
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}
