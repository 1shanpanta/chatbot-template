"use client";

import { useState } from "react";
import { useTheme } from "next-themes";
import { Sun, Moon, Monitor } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const modes = ["light", "dark", "system"] as const;
const icons = { light: Sun, dark: Moon, system: Monitor };

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Sync with external system (next-themes)
  if (!mounted) {
    setTimeout(() => setMounted(true), 0);
  }

  function cycle() {
    const current = modes.indexOf(theme as (typeof modes)[number]);
    const next = modes[(current + 1) % modes.length];
    setTheme(next);
  }

  const Icon = mounted
    ? icons[(theme as keyof typeof icons) ?? "system"]
    : Monitor;

  return (
    <Tooltip>
      <TooltipTrigger
        render={
          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={cycle} />
        }
      >
        <Icon className="h-4 w-4" />
      </TooltipTrigger>
      <TooltipContent side="bottom">
        {mounted ? `Theme: ${theme}` : "Theme"}
      </TooltipContent>
    </Tooltip>
  );
}
