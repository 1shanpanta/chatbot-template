"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard API can fail without HTTPS or permissions
    }
  }

  return (
    <Tooltip>
      <TooltipTrigger
        render={
          <button
            aria-label={copied ? "Copied" : "Copy message"}
            className="flex h-6 w-6 items-center justify-center rounded-md text-muted-foreground/50 opacity-0 transition-all duration-150 hover:text-muted-foreground hover:bg-muted group-hover:opacity-100 focus-visible:opacity-100"
            onClick={handleCopy}
          />
        }
      >
        {copied ? (
          <Check className="h-3 w-3 text-green-500" />
        ) : (
          <Copy className="h-3 w-3" />
        )}
      </TooltipTrigger>
      <TooltipContent side="bottom" className="text-xs">
        {copied ? "Copied!" : "Copy"}
      </TooltipContent>
    </Tooltip>
  );
}
