"use client";

import { MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { appConfig } from "@/lib/config";

export function EmptyState({ onPrompt }: { onPrompt: (text: string) => void }) {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-6 px-4">
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10">
        <MessageSquare className="h-8 w-8 text-primary" />
      </div>
      <div className="text-center">
        <h2 className="text-xl font-semibold">{appConfig.name}</h2>
        <p className="mt-1 text-muted-foreground">{appConfig.welcomeMessage}</p>
      </div>
      <div className="grid w-full max-w-md grid-cols-2 gap-2">
        {appConfig.suggestedPrompts.map((prompt) => (
          <Button
            key={prompt}
            variant="outline"
            className="h-auto whitespace-normal py-3 text-left text-sm"
            onClick={() => onPrompt(prompt)}
          >
            {prompt}
          </Button>
        ))}
      </div>
    </div>
  );
}
