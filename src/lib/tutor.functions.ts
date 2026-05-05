import { createServerFn } from "@tanstack/react-start";

type ChatMsg = { role: "user" | "assistant" | "system"; content: string };

async function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function fetchWithRetry(
  url: string,
  options: RequestInit,
  maxRetries = 3,
): Promise<Response> {
  let lastError: Error;
  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      const response = await fetch(url, options);
      if (response.status === 429) {
        const retryAfter = response.headers.get("retry-after");
        const waitTime = retryAfter ? parseInt(retryAfter) * 1000 : Math.pow(2, attempt) * 1000; // exponential backoff
        if (attempt < maxRetries) {
          await sleep(waitTime);
          continue;
        }
      }
      return response;
    } catch (error) {
      lastError = error as Error;
      if (attempt < maxRetries) {
        await sleep(Math.pow(2, attempt) * 1000);
        continue;
      }
    }
  }
  throw lastError!;
}

async function callAnthropicAPI(messages: ChatMsg[], systemPrompt: string): Promise<string> {
  const apiKey = process.env.SSR_ANTHROPIC_API_KEY;
  if (!apiKey) throw new Error("Anthropic API key not configured");

  // Filter out system messages for Anthropic, as system is separate
  const userMessages = messages.filter((msg) => msg.role !== "system");

  const res = await fetchWithRetry("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "x-api-key": apiKey,
      "anthropic-version": "2023-06-01",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "claude-3-haiku-20240307",
      max_tokens: 300,
      system: systemPrompt,
      messages: userMessages,
    }),
  });

  if (!res.ok) {
    if (res.status === 429) throw new Error("Rate limit reached. Please try again in a moment.");
    if (res.status === 402)
      throw new Error("API credits exhausted. Please check your Anthropic billing.");
    if (res.status === 401)
      throw new Error("Invalid API key. Please check your Anthropic API key configuration.");
    const t = await res.text();
    console.error("Anthropic API error:", res.status, t);
    throw new Error("AI tutor is temporarily unavailable. Please try again later.");
  }

  const json = await res.json();
  return json.content?.[0]?.text ?? "I'm here, but I didn't catch that. Could you rephrase?";
}

async function callGeminiAPI(messages: ChatMsg[], systemPrompt: string): Promise<string> {
  const apiKey = process.env.SSR_GEMINI_API_KEY;
  if (!apiKey) throw new Error("Gemini API key not configured");

  const geminiMessages = messages.filter(m => m.role !== "system").map((msg) => ({
    role: msg.role === "assistant" ? "model" : "user",
    parts: [{ text: msg.content }],
  }));

  const res = await fetchWithRetry(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      systemInstruction: {
        parts: [{ text: systemPrompt }]
      },
      contents: geminiMessages,
      generationConfig: {
        maxOutputTokens: 300,
        temperature: 0.7,
      }
    }),
  });

  if (!res.ok) {
    if (res.status === 429)
      throw new Error(
        "Rate limit reached. Please try again in a moment.",
      );
    if (res.status === 400 || res.status === 401 || res.status === 403)
      throw new Error("Invalid API key. Please check your Gemini API key configuration.");
    const t = await res.text();
    console.error("Gemini API error:", res.status, t);
    throw new Error("AI tutor is temporarily unavailable. Please try again later.");
  }

  const json = await res.json();
  return (
    json.candidates?.[0]?.content?.parts?.[0]?.text ?? "I'm here, but I didn't catch that. Could you rephrase?"
  );
}

export const askTutor = createServerFn({ method: "POST" })
  .inputValidator((input: { messages: ChatMsg[] }) => input)
  .handler(async ({ data }) => {
    const systemPrompt = `You are Lumi, an AI tutor on a Smart Inclusive Education Platform for sensory-impaired learners (visually and hearing impaired).
- Use plain, warm language. Short paragraphs, clear structure.
- When useful, offer step-by-step lists.
- Be encouraging and patient.
- Mention accessibility tips when relevant (e.g., "I can read this aloud", "request a sign-language clip").
- Keep responses under ~180 words unless asked for depth.`;

    // Check if Anthropic key is available and valid (not placeholder)
    const hasValidAnthropicKey =
      process.env.SSR_ANTHROPIC_API_KEY && !process.env.SSR_ANTHROPIC_API_KEY.includes("your_");

    try {
      // Try Anthropic first if key is available (higher rate limits)
      if (hasValidAnthropicKey) {
        try {
          return { reply: await callAnthropicAPI(data.messages, systemPrompt) };
        } catch (error) {
          console.warn("Anthropic API failed, falling back to Gemini:", error);
        }
      }
    } catch (error) {
      console.warn("Anthropic check failed:", error);
    }

    // Use Gemini as primary
    try {
      return { reply: await callGeminiAPI(data.messages, systemPrompt) };
    } catch (error) {
      console.error("Gemini API failed:", error);
      throw error;
    }
  });
