import { streamText } from "ai";
import { appConfig } from "@/lib/config";
import { getModel } from "@/lib/provider-factory";

export const dynamic = "force-dynamic";

const MAX_MESSAGE_LENGTH = 10_000;
const MAX_MESSAGES = appConfig.maxMessagesPerConversation;

function isValidMessages(messages: unknown): boolean {
  if (!Array.isArray(messages)) return false;
  if (messages.length === 0 || messages.length > MAX_MESSAGES) return false;

  return messages.every(
    (m) =>
      m &&
      typeof m === "object" &&
      typeof m.role === "string" &&
      ["user", "assistant", "system"].includes(m.role) &&
      typeof m.content === "string" &&
      m.content.length <= MAX_MESSAGE_LENGTH
  );
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { messages } = body;

    if (!isValidMessages(messages)) {
      return Response.json(
        { error: "Invalid request: check message format and length." },
        { status: 400 }
      );
    }

    const model = getModel();

    const result = streamText({
      model,
      system: appConfig.ai.systemPrompt,
      messages,
      maxOutputTokens: appConfig.ai.maxOutputTokens,
    });

    return result.toUIMessageStreamResponse();
  } catch (error) {
    console.error("[chat/route] Error:", error);

    if (
      error instanceof Error &&
      error.message.includes("API key")
    ) {
      return Response.json(
        { error: "AI provider is not configured. Please set your API key." },
        { status: 503 }
      );
    }

    return Response.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
