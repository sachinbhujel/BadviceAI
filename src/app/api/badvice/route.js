import { generateText } from "ai";
import { groq } from "@ai-sdk/groq";
import { RateLimiterMemory } from "rate-limiter-flexible";

const rateLimiter = new RateLimiterMemory({
  points: 1,
  duration: 5,
});

export async function POST(request) {
  try {
    const ip =
      request.headers.get("cf-connecting-ip")?.trim() ??
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
      request.headers.get("x-real-ip")?.trim() ??
      "127.0.0.1";

    try {
      await rateLimiter.consume(ip, 1);
    } catch (error) {
      return Response.json(
        { error: "Wait 5 seconds before you send another request!" },
        { status: 429 }
      );
    }

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
