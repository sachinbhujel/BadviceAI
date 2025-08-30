import { generateText } from "ai";
import { groq } from "@ai-sdk/groq";

export async function POST(request) {
  try {
    const { prompt } = await request.json();
    const result = await generateText({
      model: groq("llama-3.1-8b-instant"),
      system: `You always give the worst advice possible, in a funny,
       roasting, human-like tone. Keep it short, simple, and under 60 words. Make the advice sound
        realistic enough to be believable, but still terrible.`,
      prompt,
    });

    const cleanText = result.text.startsWith('"')
      ? JSON.parse(result.text)
      : result.text;
    return Response.json({ result: cleanText });
  } catch (error) {
    console.log("Error generating text!", error);
    return Response.json({ error: "Failed to generate text" }, { status: 500 });
  }
}
