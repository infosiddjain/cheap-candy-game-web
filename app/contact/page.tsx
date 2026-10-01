import { mdiBriefcaseOutline, mdiChevronRight, mdiEmailHeartOutline, mdiEmailOutline, mdiGithub, mdiLinkedin } from "@mdi/js";
import type { Metadata } from "next";
import { Icon } from "@/components/Icon";
import { PageHeader } from "@/components/ui";
import { APP_NAME, DEVELOPER, SUPPORT_EMAIL } from "@/lib/site";
import { ContactForm } from "./ContactForm";

export const metadata: Metadata = {
  title: "Contact Us",
  description: `Found a bug, have an idea or stuck on a level? Get in touch with the ${APP_NAME} team.`,
};

const CHANNELS = [
  { href: `mailto:${SUPPORT_EMAIL}`, icon: mdiEmailOutline, label: SUPPORT_EMAIL },
  { href: DEVELOPER.portfolio, icon: mdiBriefcaseOutline, label: `${DEVELOPER.name} · Portfolio` },
  { href: DEVELOPER.linkedin, icon: mdiLinkedin, label: "LinkedIn" },
  { href: DEVELOPER.github, icon: mdiGithub, label: "GitHub" },
];

export default function ContactPage() {
  return (
    <>
      <PageHeader eyebrow="CONTACT" title="We'd love to hear from you">
        Found a bug, have an idea, or stuck on a level? Send us a note.
      </PageHeader>
      <div className="mx-auto grid max-w-5xl gap-6 px-4 sm:px-6 lg:grid-cols-5">
        <section className="card p-6 sm:p-8 lg:col-span-3">
          <ContactForm />
        </section>
        <aside className="space-y-4 lg:col-span-2">
          <div className="card flex flex-col items-center p-6 text-center">
            <Icon path={mdiEmailHeartOutline} size={48} className="text-primary" />
            <h2 className="mt-2 text-xl font-black">Say hello</h2>
            <p className="mt-1 text-sm text-dim">Bug reports, ideas and kind words are all welcome.</p>
          </div>
          <ul className="card divide-y divide-line px-6 py-2">
            {CHANNELS.map((c) => (
              <li key={c.label}>
                <a
                  href={c.href}
                  target={c.href.startsWith("http") ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  className="group flex items-center gap-3 py-4"
                >
                  <Icon path={c.icon} size={22} className="shrink-0 text-gold" />
                  <span className="flex-1 truncate font-semibold">{c.label}</span>
                  <Icon path={mdiChevronRight} size={22} className="text-faint transition group-hover:translate-x-1 group-hover:text-white" />
                </a>
              </li>
            ))}
          </ul>
        </aside>
      </div>
    </>
  );
}
