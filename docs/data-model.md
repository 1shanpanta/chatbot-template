# Data Model

## Core Types

### Conversation

```typescript
interface Conversation {
  id: string;          // crypto.randomUUID()
  title: string;       // "New Chat" initially, auto-set from first user message
  messages: UIMessage[]; // AI SDK UIMessage format (parts-based)
  createdAt: number;   // Date.now() timestamp
  updatedAt: number;   // Updated on each message persist
}
```

### UIMessage (from AI SDK)

```typescript
interface UIMessage {
  id: string;
  role: 'system' | 'user' | 'assistant';
  parts: UIMessagePart[];
  metadata?: unknown;
}

type UIMessagePart =
  | { type: 'text'; text: string; state?: 'streaming' | 'done' }
  | { type: 'reasoning'; ... }
  | { type: 'tool-invocation'; ... }
  | { type: 'file'; ... }
  | { type: 'source-url'; ... }
  | { type: 'source-document'; ... }
  | { type: 'step-start'; ... };
```

## Zustand Store Shape

```typescript
interface ChatState {
  // Persisted to localStorage
  conversations: Conversation[];
  activeConversationId: string | null;

  // Transient (not persisted)
  sidebarOpen: boolean;

  // Actions
  createConversation: () => string;
  deleteConversation: (id: string) => void;
  setActiveConversation: (id: string | null) => void;
  updateConversationMessages: (id: string, messages: UIMessage[]) => void;
  updateConversationTitle: (id: string, title: string) => void;
  toggleSidebar: () => void;
  setSidebarOpen: (open: boolean) => void;
}
```

## localStorage Schema

**Key:** `chatbot-conversations`

**Value:** JSON object with `state` and `version` fields:
```json
{
  "state": {
    "conversations": [...],
    "activeConversationId": "uuid-string"
  },
  "version": 0
}
```

## Config Schema

```typescript
const appConfig = {
  name: string;           // App display name
  description: string;    // Meta description
  ai: {
    provider: 'openai' | 'anthropic';
    model: string;        // e.g. 'gpt-4o-mini', 'claude-sonnet-4-20250514'
    systemPrompt: string;
  };
  welcomeMessage: string;
  inputPlaceholder: string;
  suggestedPrompts: string[];  // 4 suggested prompts for empty state
  theme: {
    defaultMode: 'light' | 'dark' | 'system';
  };
  maxConversations: number;
  maxMessagesPerConversation: number;
};
```

## Limits

- Max conversations: 50 (oldest dropped when exceeded)
- Max messages per conversation: 200 (truncated on persist)
- Conversation title: auto-generated from first user message, max 50 chars + "..."
