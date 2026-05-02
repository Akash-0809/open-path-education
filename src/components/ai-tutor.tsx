import { useRef, useState } from "react";
import { Send, Volume2, Square, Loader2, Sparkles } from "lucide-react";
import { askTutor } from "@/lib/tutor.functions";

type Msg = { role: "user" | "assistant"; content: string };

const SUGGESTIONS = [
  "Explain photosynthesis simply",
  "Quiz me on JavaScript basics",
  "Make a 5-step study plan for math",
];

export function AITutor() {
  const [messages, setMessages] = useState<Msg[]>([
    {
      role: "assistant",
      content:
        "Hi, I'm Lumi 👋 I'm your inclusive AI tutor. Ask me anything — I can explain concepts, quiz you, or read my answers aloud. How can I help today?",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [speakingIdx, setSpeakingIdx] = useState<number | null>(null);
  const utterRef = useRef<SpeechSynthesisUtterance | null>(null);

  const send = async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || loading) return;

    const next: Msg[] = [...messages, { role: "user", content: trimmed }];
    setMessages(next);
    setInput("");
    setLoading(true);

    try {
      const { reply } = await askTutor({ data: { messages: next } });
      setMessages([...next, { role: "assistant", content: reply }]);
    } catch (e) {
      const msg = e instanceof Error ? e.message : "Something went wrong.";
      setMessages([...next, { role: "assistant", content: `⚠️ ${msg}` }]);
    } finally {
      setLoading(false);
    }
  };

  const speak = (idx: number, text: string) => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
    window.speechSynthesis.cancel();
    if (speakingIdx === idx) {
      setSpeakingIdx(null);
      return;
    }
    const u = new SpeechSynthesisUtterance(text);
    u.rate = 1;
    u.pitch = 1;
    u.onend = () => setSpeakingIdx(null);
    u.onerror = () => setSpeakingIdx(null);
    utterRef.current = u;
    setSpeakingIdx(idx);
    window.speechSynthesis.speak(u);
  };

  return (
    <section id="tutor" className="py-24">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-wider text-primary">AI Tutor · Live demo</span>
          <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight sm:text-4xl">
            Meet Lumi — your patient AI tutor
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Chat naturally and tap the speaker to hear any reply read aloud.
          </p>
        </div>

        <div className="mt-12 overflow-hidden rounded-3xl border border-border bg-card shadow-glow">
          <div className="flex items-center gap-3 border-b border-border bg-gradient-hero px-6 py-4">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-primary text-primary-foreground shadow-glow">
              <Sparkles className="h-5 w-5" aria-hidden="true" />
            </span>
            <div>
              <p className="font-display font-semibold">Lumi</p>
              <p className="text-xs text-muted-foreground">Powered by Lovable AI · TTS enabled</p>
            </div>
          </div>

          <div
            role="log"
            aria-live="polite"
            aria-label="Conversation with AI tutor"
            className="max-h-[440px] min-h-[320px] space-y-4 overflow-y-auto px-4 py-6 sm:px-6"
          >
            {messages.map((m, i) => (
              <div
                key={i}
                className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`group max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed shadow-soft sm:text-base ${
                    m.role === "user"
                      ? "bg-gradient-primary text-primary-foreground"
                      : "bg-accent/60 text-foreground"
                  }`}
                >
                  <p className="whitespace-pre-wrap">{m.content}</p>
                  {m.role === "assistant" && (
                    <button
                      type="button"
                      onClick={() => speak(i, m.content)}
                      aria-label={speakingIdx === i ? "Stop reading aloud" : "Read this answer aloud"}
                      className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-card px-2.5 py-1 text-xs font-medium text-primary shadow-soft transition-colors hover:bg-primary-soft"
                    >
                      {speakingIdx === i ? (
                        <>
                          <Square className="h-3 w-3" aria-hidden="true" /> Stop
                        </>
                      ) : (
                        <>
                          <Volume2 className="h-3 w-3" aria-hidden="true" /> Read aloud
                        </>
                      )}
                    </button>
                  )}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="flex items-center gap-2 rounded-2xl bg-accent/60 px-4 py-3 text-sm text-muted-foreground shadow-soft">
                  <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                  Lumi is thinking…
                </div>
              </div>
            )}
          </div>

          <div className="border-t border-border bg-background/60 px-4 py-4 sm:px-6">
            <div className="mb-3 flex flex-wrap gap-2">
              {SUGGESTIONS.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => send(s)}
                  disabled={loading}
                  className="rounded-full border border-border bg-card px-3 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground disabled:opacity-50"
                >
                  {s}
                </button>
              ))}
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                send(input);
              }}
              className="flex items-end gap-2"
            >
              <label htmlFor="tutor-input" className="sr-only">
                Message Lumi
              </label>
              <textarea
                id="tutor-input"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    send(input);
                  }
                }}
                rows={1}
                placeholder="Ask Lumi anything…"
                disabled={loading}
                className="min-h-[48px] flex-1 resize-none rounded-2xl border border-input bg-card px-4 py-3 text-base shadow-soft placeholder:text-muted-foreground focus:outline-none disabled:opacity-60"
              />
              <button
                type="submit"
                disabled={loading || !input.trim()}
                aria-label="Send message"
                className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-primary text-primary-foreground shadow-glow transition-transform hover:scale-[1.03] disabled:opacity-50"
              >
                <Send className="h-5 w-5" aria-hidden="true" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
