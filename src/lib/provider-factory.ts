import "server-only";

import { createOpenAI } from "@ai-sdk/openai";
import { createAnthropic } from "@ai-sdk/anthropic";
import { appConfig } from "./config";

export function getModel() {
  const { provider, model } = appConfig.ai;

  switch (provider) {
    case "openai": {
      if (!process.env.OPENAI_API_KEY) {
        throw new Error(
          "OPENAI_API_KEY is not set. Add it to your .env.local file."
        );
      }
      const openai = createOpenAI({ apiKey: process.env.OPENAI_API_KEY });
      return openai(model);
    }
    case "anthropic": {
      if (!process.env.ANTHROPIC_API_KEY) {
        throw new Error(
          "ANTHROPIC_API_KEY is not set. Add it to your .env.local file."
        );
      }
      const anthropic = createAnthropic({
        apiKey: process.env.ANTHROPIC_API_KEY,
      });
      return anthropic(model);
    }
    default:
      throw new Error(`Unknown AI provider: ${provider}`);
  }
}
