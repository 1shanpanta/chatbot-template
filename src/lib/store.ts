"use client";

import type { UIMessage } from "ai";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { appConfig } from "./config";
import type { Conversation } from "@/types";

interface ChatState {
  conversations: Conversation[];
  activeConversationId: string | null;
  sidebarOpen: boolean;

  createConversation: () => string;
  deleteConversation: (id: string) => void;
  setActiveConversation: (id: string | null) => void;
  updateConversationMessages: (id: string, messages: UIMessage[]) => void;
  updateConversationTitle: (id: string, title: string) => void;
  toggleSidebar: () => void;
  setSidebarOpen: (open: boolean) => void;
}

export const useChatStore = create<ChatState>()(
  persist(
    (set, get) => ({
      conversations: [],
      activeConversationId: null,
      sidebarOpen: true,

      createConversation: () => {
        const id = crypto.randomUUID();
        const conversation: Conversation = {
          id,
          title: "New Chat",
          messages: [],
          createdAt: Date.now(),
          updatedAt: Date.now(),
        };

        set((state) => {
          const conversations = [conversation, ...state.conversations];
          if (conversations.length > appConfig.maxConversations) {
            conversations.pop();
          }
          return { conversations, activeConversationId: id };
        });

        return id;
      },

      deleteConversation: (id: string) => {
        set((state) => {
          const conversations = state.conversations.filter((c) => c.id !== id);
          const activeConversationId =
            state.activeConversationId === id
              ? conversations[0]?.id ?? null
              : state.activeConversationId;
          return { conversations, activeConversationId };
        });
      },

      setActiveConversation: (id: string | null) => {
        set({ activeConversationId: id });
      },

      updateConversationMessages: (id: string, messages: UIMessage[]) => {
        set((state) => ({
          conversations: state.conversations.map((c) =>
            c.id === id
              ? {
                  ...c,
                  messages: messages.slice(
                    0,
                    appConfig.maxMessagesPerConversation
                  ),
                  updatedAt: Date.now(),
                }
              : c
          ),
        }));
      },

      updateConversationTitle: (id: string, title: string) => {
        set((state) => ({
          conversations: state.conversations.map((c) =>
            c.id === id ? { ...c, title } : c
          ),
        }));
      },

      toggleSidebar: () => {
        set((state) => ({ sidebarOpen: !state.sidebarOpen }));
      },

      setSidebarOpen: (open: boolean) => {
        set({ sidebarOpen: open });
      },
    }),
    {
      name: "chatbot-conversations",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        conversations: state.conversations,
        activeConversationId: state.activeConversationId,
      }),
    }
  )
);
