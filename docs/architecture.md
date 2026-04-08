# Architecture

## Overview

A white-label chatbot template built with Next.js 15 App Router. Clients customize one config file, add an API key, and deploy.

## Stack

- **Next.js 15** — App Router, Turbopack, TypeScript
- **Tailwind CSS v4** — CSS-based config with shadcn/ui oklch color system
- **shadcn/ui (base-nova)** — button, scroll-area, sheet, tooltip, separator, textarea
- **Vercel AI SDK v6** — `ai`, `@ai-sdk/react`, `@ai-sdk/openai`, `@ai-sdk/anthropic`
- **zustand v5** — Conversation state with localStorage persistence
- **next-themes** — Dark/light/system mode
- **react-markdown + remark-gfm** — Markdown rendering in assistant messages

## Data Flow

```
User types message
  -> ChatInput calls onSend(text)
  -> ChatArea calls sendMessage({ text })
  -> useChat POSTs to /api/chat with messages
  -> API route calls streamText() with provider model
  -> Streaming response returned via toUIMessageStreamResponse()
  -> useChat updates messages reactively
  -> onFinish callback persists messages to zustand -> localStorage
```

## Key Architectural Decisions

### 1. `key={conversationId}` on ChatArea

When switching conversations, ChatArea unmounts and remounts with a fresh `useChat` instance. This avoids stale message state without manual cache invalidation.

### 2. zustand persist for conversations

Conversations are stored in localStorage via zustand's persist middleware. Only `conversations` and `activeConversationId` are persisted — transient UI state like `sidebarOpen` is not.

### 3. Provider factory pattern

`lib/provider-factory.ts` uses a switch statement on the config provider. Each case dynamically requires its SDK, so unused providers are not bundled. Adding a new provider is one `case` statement.

### 4. Single config file

`lib/config.ts` is the only file clients need to modify. It controls branding, AI provider/model, system prompt, suggested prompts, and theme settings.

### 5. Server/client boundary

Only `layout.tsx` and `page.tsx` are server components. All interactive components are `"use client"` because they depend on zustand, useChat, or browser APIs.

## Directory Structure

```
src/
  app/           — Next.js routes and layout
  components/    — All chat UI components (client-side)
  components/ui/ — shadcn/ui primitives
  lib/           — Config, store, provider factory, utilities
  types/         — TypeScript interfaces
```

## API Route

Single `POST /api/chat` endpoint. Receives UIMessage array, streams response using the configured AI provider. Returns structured JSON error for missing API keys.
