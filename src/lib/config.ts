export const appConfig = {
  // ─── Branding ──────────────────────────────────────────
  name: "Acme AI Assistant",
  description: "Your intelligent assistant powered by AI",

  // ─── AI Provider ──────────────────────────────────────
  ai: {
    provider: "openai" as "openai" | "anthropic",
    model: "gpt-4o-mini",
    systemPrompt: `You are a helpful AI assistant. Be concise, friendly, and accurate. If you're unsure about something, say so. Format your responses with markdown when appropriate.`,
  },

  // ─── Chat UI ──────────────────────────────────────────
  welcomeMessage: "How can I help you today?",
  inputPlaceholder: "Type your message...",
  suggestedPrompts: [
    "What can you help me with?",
    "Tell me about your services",
    "How do I get started?",
    "What are your business hours?",
  ],

  // ─── Theme ────────────────────────────────────────────
  theme: {
    defaultMode: "system" as "light" | "dark" | "system",
  },

  // ─── Limits ───────────────────────────────────────────
  maxConversations: 50,
  maxMessagesPerConversation: 200,
} as const;
