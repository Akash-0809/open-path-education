import { createServerFn } from "@tanstack/react-start";

type ChatMsg = { role: "user" | "assistant" | "system"; content: string };

export const askTutor = createServerFn({ method: "POST" })
  .inputValidator((input: { messages: ChatMsg[] }) => input)
  .handler(async ({ data }) => {
    const apiKey = process.env.LOVABLE_API_KEY;
    if (!apiKey) throw new Error("LOVABLE_API_KEY not configured");

    const systemPrompt = `You are Lumi, an AI tutor on a Smart Inclusive Education Platform for sensory-impaired learners (visually and hearing impaired).
- Use plain, warm language. Short paragraphs, clear structure.
- When useful, offer step-by-step lists.
- Be encouraging and patient.
- Mention accessibility tips when relevant (e.g., "I can read this aloud", "request a sign-language clip").
- Keep responses under ~180 words unless asked for depth.`;

    const res = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [{ role: "system", content: systemPrompt }, ...data.messages],
      }),
    });

    if (!res.ok) {
      if (res.status === 429) throw new Error("Rate limit reached. Please try again in a moment.");
      if (res.status === 402) throw new Error("AI credits exhausted. Add credits in Workspace settings.");
      const t = await res.text();
      console.error("AI gateway error:", res.status, t);
      throw new Error("AI tutor is temporarily unavailable.");
    }

    const json = await res.json();
    const reply = json.choices?.[0]?.message?.content ?? "I'm here, but I didn't catch that. Could you rephrase?";
    return { reply: reply as string };
  });
