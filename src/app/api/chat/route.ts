import { streamText } from "ai";
import { appConfig } from "@/lib/config";
import { getModel } from "@/lib/provider-factory";

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    const model = getModel();

    const result = streamText({
      model,
      system: appConfig.ai.systemPrompt,
      messages,
    });

    return result.toUIMessageStreamResponse();
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "An unexpected error occurred";
    return Response.json({ error: message }, { status: 500 });
  }
}
