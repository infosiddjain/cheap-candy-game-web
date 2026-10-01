/** Contact form rules, shared by the browser form and the server action. */

export const TOPICS = ["Bug", "Idea", "Help", "Love it"] as const;

export interface ContactInput {
  topic: string;
  name: string;
  email: string;
  message: string;
  /** spam trap: real visitors never see or fill this */
  _gotcha?: string;
}

export type ContactField = "topic" | "name" | "email" | "message";
export type ContactErrors = Partial<Record<ContactField, string>>;

export type ContactResult = { ok: true } | { ok: false; error: string; field?: ContactField };

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export const LIMITS = { name: 80, message: 2000 };

export function validateContact(input: ContactInput): ContactErrors {
  const errors: ContactErrors = {};
  const name = input.name.trim();
  const email = input.email.trim();
  const message = input.message.trim();

  if (!TOPICS.includes(input.topic as (typeof TOPICS)[number])) {
    errors.topic = "Please pick a topic.";
  }
  if (name.length < 2) {
    errors.name = "Please enter your name.";
  } else if (name.length > LIMITS.name) {
    errors.name = `Name must be under ${LIMITS.name} characters.`;
  }
  if (!email) {
    errors.email = "Please enter your email so we can reply.";
  } else if (!EMAIL.test(email)) {
    errors.email = "That email doesn't look right.";
  }
  if (message.length < 10) {
    errors.message = "Please write at least 10 characters.";
  } else if (message.length > LIMITS.message) {
    errors.message = `Message must be under ${LIMITS.message} characters.`;
  }
  return errors;
}
