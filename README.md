# Chatbot Template

A production-ready, white-label AI chatbot built with Next.js 15, Tailwind CSS, and the Vercel AI SDK. Change one config file, add an API key, and deploy.

## Features

- Multi-conversation sidebar with localStorage persistence
- Streaming AI responses (OpenAI or Anthropic)
- Markdown rendering (code blocks, tables, lists, links)
- Dark / light / system theme toggle
- Responsive design (sidebar collapses to drawer on mobile)
- Empty state with configurable suggested prompts
- Copy message text button
- Auto-generated conversation titles
- Graceful error handling for missing API keys

## Quick Start

1. **Install dependencies**

```bash
npm install
```

2. **Set up your API key**

```bash
cp .env.example .env.local
```

Edit `.env.local` and add the API key for your chosen provider:

```
OPENAI_API_KEY=sk-...
```

3. **Run the dev server**

```bash
npm run dev
```

The browser will open automatically at `http://localhost:3000`.

## Customization

All customization happens in **one file**: `src/lib/config.ts`

```typescript
export const appConfig = {
  name: "Acme AI Assistant",        // Your brand name
  description: "Your AI assistant", // Meta description

  ai: {
    provider: "openai",             // "openai" | "anthropic"
    model: "gpt-4o-mini",           // Any model from your provider
    systemPrompt: "You are...",     // Personality and behavior
  },

  welcomeMessage: "How can I help?",
  inputPlaceholder: "Type your message...",
  suggestedPrompts: [               // Empty state prompt buttons
    "What can you help me with?",
    "Tell me about your services",
  ],

  theme: {
    defaultMode: "system",          // "light" | "dark" | "system"
  },

  maxConversations: 50,
  maxMessagesPerConversation: 200,
};
```

### Switching to Anthropic

1. In `config.ts`, change `provider` to `"anthropic"` and `model` to e.g. `"claude-sonnet-4-20250514"`
2. Set `ANTHROPIC_API_KEY` in `.env.local`

### Theming

Colors use shadcn/ui's CSS variable system in `src/app/globals.css`. Edit the oklch values under `:root` (light) and `.dark` (dark) to match your brand.

## Tech Stack

- Next.js 15 (App Router, Turbopack)
- TypeScript
- Tailwind CSS v4
- shadcn/ui (base-nova)
- Vercel AI SDK v6
- zustand v5
- next-themes
- react-markdown + remark-gfm

## Project Structure

```
src/
  app/
    api/chat/route.ts   -- Streaming AI endpoint
    layout.tsx           -- Root layout with providers
    page.tsx             -- Renders ChatLayout
    globals.css          -- Theme colors
  components/
    chat-layout.tsx      -- Top-level shell
    sidebar.tsx          -- Conversation list
    chat-area.tsx        -- useChat bridge
    message-list.tsx     -- Message container
    message-bubble.tsx   -- Single message
    chat-input.tsx       -- Input textarea
    empty-state.tsx      -- Welcome screen
    ...
  lib/
    config.ts            -- Single customization file
    store.ts             -- zustand conversation store
    provider-factory.ts  -- AI provider switching
```

## Deployment

Deploy to Vercel, Netlify, or any Node.js host. Set your API key as an environment variable in your hosting dashboard.

## Docs

See `docs/` for detailed architecture, component reference, and data model documentation.
