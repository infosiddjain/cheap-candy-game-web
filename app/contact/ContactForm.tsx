"use client";

import { mdiBugOutline, mdiHeartOutline, mdiHelpCircleOutline, mdiLightbulbOnOutline, mdiSend } from "@mdi/js";
import { useState } from "react";
import { Icon } from "@/components/Icon";
import { APP_NAME, SUPPORT_EMAIL } from "@/lib/site";

const TOPICS = [
  { icon: mdiBugOutline, label: "Bug" },
  { icon: mdiLightbulbOnOutline, label: "Idea" },
  { icon: mdiHelpCircleOutline, label: "Help" },
  { icon: mdiHeartOutline, label: "Love it" },
];

const input =
  "w-full rounded-2xl border border-line bg-surface px-4 py-3.5 text-white placeholder:text-faint outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/40";

/**
 * There's no backend: like the app's Contact screen, the form opens the
 * visitor's email app with the message filled in.
 */
export function ContactForm() {
  const [topic, setTopic] = useState(0);
  const [error, setError] = useState("");

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = String(data.get("name") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();
    if (!message) {
      setError("Please write a message first.");
      return;
    }
    setError("");
    const subject = `${APP_NAME} - ${TOPICS[topic].label}`;
    const body = `${message}\n\n${name ? `From: ${name}\n` : ""}Sent from the ${APP_NAME} website`;
    window.location.href = `mailto:${SUPPORT_EMAIL}?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(body)}`;
  };

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-5">
      <fieldset>
        <legend className="mb-2 text-sm font-extrabold text-dim">Topic</legend>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          {TOPICS.map((t, i) => (
            <label
              key={t.label}
              className={`flex cursor-pointer flex-col items-center gap-1 rounded-2xl border py-3 text-sm font-extrabold transition has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-white ${
                i === topic
                  ? "border-white/40 bg-primary"
                  : "border-line bg-surface hover:bg-surface-strong"
              }`}
            >
              <input
                type="radio"
                name="topic"
                className="sr-only"
                checked={i === topic}
                onChange={() => setTopic(i)}
              />
              <Icon path={t.icon} size={22} />
              {t.label}
            </label>
          ))}
        </div>
      </fieldset>

      <div>
        <label htmlFor="name" className="mb-2 block text-sm font-extrabold text-dim">
          Your name (optional)
        </label>
        <input id="name" name="name" autoComplete="name" placeholder="Name" className={input} />
      </div>

      <div>
        <label htmlFor="message" className="mb-2 block text-sm font-extrabold text-dim">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={6}
          placeholder="Tell us what's on your mind..."
          aria-invalid={!!error}
          aria-describedby={error ? "message-error" : undefined}
          className={`${input} resize-y`}
        />
        {error && (
          <p id="message-error" role="alert" className="mt-2 text-sm font-bold text-[#FF5A6E]">
            {error}
          </p>
        )}
      </div>

      <button type="submit" className="btn btn-primary w-full">
        <Icon path={mdiSend} /> Send Message
      </button>
      <p className="text-center text-xs text-faint">Opens your email app with the message ready to send.</p>
    </form>
  );
}
