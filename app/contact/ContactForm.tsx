"use client";

import {
  mdiBugOutline,
  mdiHeartOutline,
  mdiHelpCircleOutline,
  mdiLightbulbOnOutline,
  mdiLoading,
  mdiSend,
} from "@mdi/js";
import { useCallback, useState, useTransition } from "react";
import { sendContact } from "@/app/actions/contact";
import { Icon } from "@/components/Icon";
import { Toast, type ToastData } from "@/components/Toast";
import {
  type ContactErrors,
  type ContactField,
  type ContactInput,
  LIMITS,
  TOPICS,
  validateContact,
} from "@/lib/contact";

const TOPIC_ICONS = [mdiBugOutline, mdiLightbulbOnOutline, mdiHelpCircleOutline, mdiHeartOutline];

const EMPTY: ContactInput = { topic: TOPICS[0], name: "", email: "", message: "", _gotcha: "" };

const input =
  "w-full rounded-2xl border bg-surface px-4 py-3.5 text-white placeholder:text-faint outline-none transition focus:ring-2";
const ok = "border-line focus:border-primary focus:ring-primary/40";
const bad = "border-[#FF5A6E] focus:border-[#FF5A6E] focus:ring-[#FF5A6E]/40";

let toastId = 0;

/** Sends to Hub Form through a server action, with inline errors and a toast. */
export function ContactForm() {
  const [form, setForm] = useState<ContactInput>(EMPTY);
  const [errors, setErrors] = useState<ContactErrors>({});
  const [toast, setToast] = useState<ToastData | null>(null);
  const [pending, startTransition] = useTransition();
  const closeToast = useCallback(() => setToast(null), []);

  const set = (field: keyof ContactInput, value: string) => {
    setForm((f) => ({ ...f, [field]: value }));
    // clear a field's error as soon as the visitor fixes it
    if (field in errors) {
      setErrors((e) => ({ ...e, [field]: undefined }));
    }
  };

  const focusField = (field: ContactField) =>
    document.getElementById(`contact-${field}`)?.focus();

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const found = validateContact(form);
    const first = (["topic", "name", "email", "message"] as const).find((f) => found[f]);
    if (first) {
      setErrors(found);
      focusField(first);
      return;
    }

    startTransition(async () => {
      const res = await sendContact(form);
      if (res.ok) {
        setForm(EMPTY);
        setErrors({});
        setToast({
          id: ++toastId,
          type: "success",
          title: "Message sent!",
          message: "Thanks for reaching out. We'll get back to you soon.",
        });
      } else {
        if (res.field) {
          setErrors({ [res.field]: res.error });
          focusField(res.field);
        }
        setToast({ id: ++toastId, type: "error", title: "Couldn't send", message: res.error });
      }
    });
  };

  return (
    <>
      <form onSubmit={onSubmit} noValidate className="space-y-5" aria-busy={pending}>
        <fieldset>
          <legend className="mb-2 text-sm font-extrabold text-dim">Topic</legend>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
            {TOPICS.map((t, i) => (
              <label
                key={t}
                className={`flex cursor-pointer flex-col items-center gap-1 rounded-2xl border py-3 text-sm font-extrabold transition has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-white ${
                  form.topic === t
                    ? "border-white/40 bg-primary"
                    : "border-line bg-surface hover:bg-surface-strong"
                }`}
              >
                <input
                  id={i === 0 ? "contact-topic" : undefined}
                  type="radio"
                  name="topic"
                  value={t}
                  className="sr-only"
                  checked={form.topic === t}
                  onChange={() => set("topic", t)}
                />
                <Icon path={TOPIC_ICONS[i]} size={22} />
                {t}
              </label>
            ))}
          </div>
        </fieldset>

        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Your name" field="name" error={errors.name}>
            <input
              id="contact-name"
              name="name"
              autoComplete="name"
              placeholder="Name"
              maxLength={LIMITS.name}
              value={form.name}
              onChange={(e) => set("name", e.target.value)}
              aria-invalid={!!errors.name}
              aria-describedby={errors.name ? "contact-name-error" : undefined}
              className={`${input} ${errors.name ? bad : ok}`}
            />
          </Field>
          <Field label="Email" field="email" error={errors.email}>
            <input
              id="contact-email"
              name="email"
              type="email"
              inputMode="email"
              autoComplete="email"
              placeholder="you@example.com"
              value={form.email}
              onChange={(e) => set("email", e.target.value)}
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? "contact-email-error" : undefined}
              className={`${input} ${errors.email ? bad : ok}`}
            />
          </Field>
        </div>

        <Field
          label="Message"
          field="message"
          error={errors.message}
          hint={`${form.message.trim().length}/${LIMITS.message}`}
        >
          <textarea
            id="contact-message"
            name="message"
            rows={6}
            maxLength={LIMITS.message}
            placeholder="Tell us what's on your mind..."
            value={form.message}
            onChange={(e) => set("message", e.target.value)}
            aria-invalid={!!errors.message}
            aria-describedby={errors.message ? "contact-message-error" : undefined}
            className={`${input} resize-y ${errors.message ? bad : ok}`}
          />
        </Field>

        {/* spam trap: hidden from people, bots fill it in */}
        <input
          type="text"
          name="_gotcha"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden
          className="hidden"
          value={form._gotcha}
          onChange={(e) => set("_gotcha", e.target.value)}
        />

        <button type="submit" disabled={pending} className="btn btn-primary w-full disabled:cursor-wait disabled:opacity-70">
          <Icon path={pending ? mdiLoading : mdiSend} className={pending ? "animate-spin" : undefined} />
          {pending ? "Sending..." : "Send Message"}
        </button>
      </form>

      <Toast toast={toast} onClose={closeToast} />
    </>
  );
}

function Field({
  label,
  field,
  error,
  hint,
  children,
}: {
  label: string;
  field: ContactField;
  error?: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="mb-2 flex items-baseline justify-between">
        <label htmlFor={`contact-${field}`} className="text-sm font-extrabold text-dim">
          {label}
        </label>
        {hint && <span className="text-xs text-faint">{hint}</span>}
      </div>
      {children}
      {error && (
        <p id={`contact-${field}-error`} className="mt-2 text-sm font-bold text-[#FF5A6E]">
          {error}
        </p>
      )}
    </div>
  );
}
