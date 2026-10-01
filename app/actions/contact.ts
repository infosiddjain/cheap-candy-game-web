"use server";

import { type ContactField, type ContactInput, type ContactResult, validateContact } from "@/lib/contact";
import { SITE_URL } from "@/lib/site";

const ENDPOINT = "https://hub-form.vercel.app/api/f/YLoPSd70-uE8";
const FIELDS: ContactField[] = ["topic", "name", "email", "message"];

/**
 * Forwards the contact form to Hub Form. Runs on the server so the
 * HUB_KEY secret never reaches the browser.
 */
export async function sendContact(input: ContactInput): Promise<ContactResult> {
  // bots fill the hidden field; pretend it worked and drop the message
  if (input._gotcha) {
    return { ok: true };
  }

  // never trust the browser's validation alone
  const errors = validateContact(input);
  const first = FIELDS.find((f) => errors[f]);
  if (first) {
    return { ok: false, error: errors[first]!, field: first };
  }

  const key = process.env.HUB_KEY;
  if (!key) {
    console.error("sendContact: HUB_KEY is not set");
    return { ok: false, error: "Messaging is temporarily unavailable. Please email us instead." };
  }

  try {
    const res = await fetch(ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${key}`,
        // Hub Form only accepts submissions from the site's own domain
        Origin: SITE_URL,
      },
      body: JSON.stringify({
        topic: input.topic,
        name: input.name.trim(),
        email: input.email.trim(),
        message: input.message.trim(),
        source: "Cheap Candy website",
      }),
      signal: AbortSignal.timeout(10_000),
    });
    const data = (await res.json().catch(() => null)) as
      | { ok: boolean; error?: string; field?: string }
      | null;

    if (data?.ok) {
      return { ok: true };
    }
    const field = FIELDS.find((f) => f === data?.field);
    return {
      ok: false,
      error: data?.error ?? "Something went wrong. Please try again.",
      field,
    };
  } catch (err) {
    console.error("sendContact failed", err);
    return { ok: false, error: "Couldn't reach the server. Check your connection and try again." };
  }
}
