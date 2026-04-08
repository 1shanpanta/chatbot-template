"use client";

import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Conversation } from "@/types";

export function SidebarItem({
  conversation,
  isActive,
  onSelect,
  onDelete,
}: {
  conversation: Conversation;
  isActive: boolean;
  onSelect: () => void;
  onDelete: () => void;
}) {
  return (
    <div
      role="button"
      tabIndex={0}
      onClick={onSelect}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onSelect();
        }
      }}
      className={`group flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-left text-[13px] transition-all duration-150 cursor-pointer ${
        isActive
          ? "bg-accent text-foreground font-medium"
          : "text-muted-foreground hover:bg-accent/50 hover:text-foreground"
      }`}
    >
      <span className="flex-1 truncate">{conversation.title}</span>
      <Button
        variant="ghost"
        size="icon"
        aria-label="Delete conversation"
        className="h-5 w-5 shrink-0 opacity-0 group-hover:opacity-100 focus-visible:opacity-100 transition-opacity"
        onClick={(e) => {
          e.stopPropagation();
          onDelete();
        }}
      >
        <Trash2 className="h-3 w-3" />
      </Button>
    </div>
  );
}
