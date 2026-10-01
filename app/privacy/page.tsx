import {
  mdiAccountChildOutline,
  mdiCellphoneLock,
  mdiFileDocumentEditOutline,
  mdiShieldCheckOutline,
  mdiWebOff,
} from "@mdi/js";
import type { Metadata } from "next";
import { PageHeader, SectionTitle } from "@/components/ui";
import { APP_NAME, PRIVACY_UPDATED, SUPPORT_EMAIL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `${APP_NAME} collects no personal data. Read the full privacy policy.`,
};

/* Same wording as the in-app Privacy screen. */
const SECTIONS = [
  {
    icon: mdiShieldCheckOutline,
    title: "Summary",
    body: `${APP_NAME} does not collect, store or share any personal information. There are no accounts, no ads, no analytics and no tracking.`,
  },
  {
    icon: mdiCellphoneLock,
    title: "Data Stored on Your Device",
    body: 'Your game progress (unlocked levels, stars, best scores) and settings (such as music, sound effects and vibration) are saved only on your device using local storage. This data never leaves your phone and is removed when you uninstall the app or use "Reset Progress" in Settings.',
  },
  {
    icon: mdiWebOff,
    title: "Internet and Third Parties",
    body: "The game works fully offline. We do not use third-party services that collect data. If you choose to contact us by email, your email app sends the message and we use your address only to reply.",
  },
  {
    icon: mdiAccountChildOutline,
    title: "Children",
    body: "The game is suitable for all ages. Because we collect no personal data, we do not knowingly collect information from children.",
  },
];

export default function PrivacyPage() {
  return (
    <>
      <PageHeader eyebrow="LEGAL" title="Privacy Policy">
        <p>Last updated: {PRIVACY_UPDATED}</p>
      </PageHeader>
      <div className="mx-auto max-w-3xl space-y-4 px-4 sm:px-6">
        {SECTIONS.map((s) => (
          <section key={s.title} className="card p-6 sm:p-8">
            <SectionTitle icon={s.icon}>{s.title}</SectionTitle>
            <p className="leading-relaxed text-dim">{s.body}</p>
          </section>
        ))}
        <section className="card p-6 sm:p-8">
          <SectionTitle icon={mdiFileDocumentEditOutline}>Changes</SectionTitle>
          <p className="leading-relaxed text-dim">
            If this policy changes, the new version will be published here and in an app update with
            a new &quot;Last updated&quot; date. Questions? Write to{" "}
            <a href={`mailto:${SUPPORT_EMAIL}`} className="font-bold text-primary underline-offset-4 hover:underline">
              {SUPPORT_EMAIL}
            </a>
            .
          </p>
        </section>
      </div>
    </>
  );
}
