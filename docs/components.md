# Components

## Component Tree

```
layout.tsx (SERVER)
  ThemeProvider
    TooltipProvider
      page.tsx (SERVER)
        ChatLayout (CLIENT)
          Sidebar
            ThemeToggle
            SidebarItem[]
          ChatArea (key=conversationId)
            ErrorBanner (conditional)
            EmptyState (if no messages)
            MessageList
              MessageBubble[]
                MarkdownRenderer (assistant only)
                CopyButton (assistant only)
            ChatInput
```

## Component Reference

### ChatLayout (`chat-layout.tsx`)
Top-level shell. Manages hydration, sidebar visibility, and pending prompt state. Renders desktop sidebar, mobile Sheet sidebar, and the active ChatArea.

### Sidebar (`sidebar.tsx`)
Conversation list with "New Chat" button and ThemeToggle. Lists all conversations from zustand store.

### SidebarItem (`sidebar-item.tsx`)
Single conversation row. Shows title (truncated), active state highlight, and delete button on hover.

**Props:** `conversation: Conversation`, `isActive: boolean`, `onSelect: () => void`, `onDelete: () => void`

### ChatArea (`chat-area.tsx`)
Bridge between zustand store and AI SDK's `useChat`. Receives `key={conversationId}` to force remount on conversation switch. Handles initial prompt from EmptyState.

**Props:** `conversationId: string`, `initialMessages: UIMessage[]`, `initialPrompt?: string | null`, `onPromptConsumed?: () => void`

### MessageList (`message-list.tsx`)
Scrollable container for messages. Auto-scrolls to bottom on new messages.

**Props:** `messages: UIMessage[]`, `isStreaming: boolean`

### MessageBubble (`message-bubble.tsx`)
Single message with avatar (User/Bot icon). User messages right-aligned with primary color. Assistant messages left-aligned with muted background, rendered as markdown with copy button.

**Props:** `message: UIMessage`

### MarkdownRenderer (`markdown-renderer.tsx`)
Wrapper around react-markdown with remark-gfm. Custom renderers for code blocks, tables, links, blockquotes, and lists.

**Props:** `content: string`

### ChatInput (`chat-input.tsx`)
Textarea with send button. Enter to send, Shift+Enter for newline. Disabled during streaming.

**Props:** `onSend: (text: string) => void`, `isLoading: boolean`

### EmptyState (`empty-state.tsx`)
Welcome screen with app name, welcome message, and 2x2 grid of suggested prompts from config.

**Props:** `onPrompt: (text: string) => void`

### CopyButton (`copy-button.tsx`)
Copy message text to clipboard with visual feedback (checkmark for 2s). Appears on hover.

**Props:** `text: string`

### ErrorBanner (`error-banner.tsx`)
Dismissable error display for API key issues or streaming errors.

**Props:** `message: string`, `onDismiss: () => void`

### ThemeToggle (`theme-toggle.tsx`)
Cycles through light -> dark -> system themes. Shows corresponding icon (Sun/Moon/Monitor).
