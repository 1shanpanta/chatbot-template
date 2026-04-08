"use client";

import { appConfig } from "@/lib/config";

export function EmptyState({ onPrompt }: { onPrompt: (text: string) => void }) {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-8 px-4">
      <div className="flex flex-col items-center gap-4">
        <div className="relative h-12 w-12">
          <div className="absolute inset-0 rounded-xl bg-foreground/[0.06] rotate-6" />
          <div className="absolute inset-0 rounded-xl bg-foreground/[0.04] -rotate-3" />
          <div className="relative flex h-full w-full items-center justify-center rounded-xl bg-foreground/[0.08]">
            <span className="text-lg font-bold text-foreground/60 select-none">
              {appConfig.name.charAt(0)}
            </span>
          </div>
        </div>
        <div className="text-center">
          <h2 className="text-2xl font-semibold tracking-tight">
            {appConfig.name}
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            {appConfig.welcomeMessage}
          </p>
        </div>
      </div>

      <div className="grid w-full max-w-lg grid-cols-2 gap-2.5">
        {appConfig.suggestedPrompts.map((prompt) => (
          <button
            key={prompt}
            onClick={() => onPrompt(prompt)}
            className="group rounded-xl border border-border/60 bg-card px-4 py-3.5 text-left text-[13px] leading-snug text-muted-foreground shadow-[0_1px_2px_0_rgba(0,0,0,0.03)] transition-all duration-200 hover:border-border hover:bg-accent hover:text-foreground hover:shadow-[0_2px_8px_0_rgba(0,0,0,0.04)]"
          >
            {prompt}
          </button>
        ))}
      </div>
    </div>
  );
}
