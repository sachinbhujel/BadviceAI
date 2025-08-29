import { generateText } from "ai";
import { groq } from "@ai-sdk/groq";

export async function POST(request) {
  try {
    const { prompt } = await request.json();
    const result = await generateText({
      model: groq("llama-3.3-70b-versatile"),
      system: `You always give the worst advice in a funny roasting way. And keep it short and simple like a human person said. Also make it in 40 words.`,
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
