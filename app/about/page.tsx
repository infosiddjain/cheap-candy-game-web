import {
  mdiAccountStarOutline,
  mdiBriefcaseOutline,
  mdiCandy,
  mdiCrown,
  mdiEmailOutline,
  mdiGamepadVariantOutline,
  mdiGestureSwipe,
  mdiGithub,
  mdiLinkedin,
  mdiNumeric3BoxMultipleOutline,
  mdiStarOutline,
  mdiTarget,
} from "@mdi/js";
import type { Metadata } from "next";
import Image from "next/image";
import { Icon } from "@/components/Icon";
import { PageHeader, SectionTitle } from "@/components/ui";
import { APP_NAME, DEVELOPER, LEVEL_COUNT, SUPPORT_EMAIL } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description: `About ${APP_NAME}, the match-3 puzzle game, and its developer ${DEVELOPER.name}.`,
};

const RULES = [
  { icon: mdiGestureSwipe, text: "Swipe a candy (or tap two neighbours) to swap them." },
  { icon: mdiNumeric3BoxMultipleOutline, text: "Line up 3 or more matching candies to clear them." },
  { icon: mdiTarget, text: "Reach the goal before you run out of moves: score points or collect candies." },
  { icon: mdiStarOutline, text: "Leftover moves turn into bonus points. More points, more stars." },
  { icon: mdiCrown, text: "Every 10th level is a boss level. Good luck." },
];

const LINKS = [
  { href: DEVELOPER.github, icon: mdiGithub, label: "GitHub" },
  { href: DEVELOPER.linkedin, icon: mdiLinkedin, label: "LinkedIn" },
  { href: `mailto:${SUPPORT_EMAIL}`, icon: mdiEmailOutline, label: "Email" },
];

export default function AboutPage() {
  const initials = DEVELOPER.name
    .split(" ")
    .map((w) => w[0])
    .join("");

  return (
    <>
      <PageHeader eyebrow="ABOUT" title={`The story of ${APP_NAME}`}>
        A sweet match-3 adventure, and the developer behind it.
      </PageHeader>

      <div className="mx-auto grid max-w-5xl gap-6 px-4 sm:px-6 lg:grid-cols-5">
        {/* The game */}
        <section className="card p-6 sm:p-8 lg:col-span-3">
          <div className="flex items-center gap-4">
            <Image src="/logo.png" alt={`${APP_NAME} logo`} width={88} height={88} className="animate-bob" />
            <div>
              <h2 className="text-2xl font-black tracking-wider">
                CHEAP <span className="text-gold">CANDY</span>
              </h2>
              <p className="text-dim">A sweet match-3 adventure</p>
            </div>
          </div>
          <p className="mt-6 leading-relaxed text-dim">
            {APP_NAME} is a sweet, relaxing match-3 puzzle game with {LEVEL_COUNT} handcrafted
            levels. Swap candies, build combos and chase three stars on every level. There&apos;s no
            sign-up, no internet needed, and no ads or tracking, ever. Just you, a board full of
            candy, and that satisfying <em>pop</em>.
          </p>
          <div className="mt-8">
            <SectionTitle icon={mdiGamepadVariantOutline}>How to Play</SectionTitle>
            <ul className="space-y-3">
              {RULES.map((r) => (
                <li key={r.text} className="flex gap-3">
                  <Icon path={r.icon} size={22} className="mt-0.5 shrink-0 text-gold" />
                  <span className="text-dim">{r.text}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Quick facts */}
        <aside className="card p-6 sm:p-8 lg:col-span-2">
          <SectionTitle icon={mdiCandy}>At a glance</SectionTitle>
          <dl className="grid grid-cols-2 gap-3">
            {[
              ["Genre", "Match-3 puzzle"],
              ["Levels", String(LEVEL_COUNT)],
              ["Platforms", "Android & iOS"],
              ["Ages", "Everyone"],
              ["Ads", "None"],
              ["Data collected", "None"],
            ].map(([k, v]) => (
              <div key={k} className="rounded-2xl bg-surface p-4">
                <dt className="text-xs font-bold text-dim">{k}</dt>
                <dd className="mt-1 text-lg font-black text-gold">{v}</dd>
              </div>
            ))}
          </dl>
        </aside>

        {/* Developer */}
        <section id="developer" className="card scroll-mt-24 p-6 sm:p-8 lg:col-span-5">
          <SectionTitle icon={mdiAccountStarOutline}>Meet the Developer</SectionTitle>
          <div className="grid gap-8 md:grid-cols-[auto_1fr] md:items-start">
            <div className="flex items-center gap-4 md:flex-col md:text-center">
              <div className="rounded-full bg-gold p-1">
                <div className="grid size-24 place-items-center rounded-full border-4 border-card bg-primary text-3xl font-black md:size-32 md:text-4xl">
                  {initials}
                </div>
              </div>
              <div>
                <p className="text-xs font-extrabold tracking-[0.2em] text-gold">DEVELOPED BY</p>
                <p className="text-2xl font-black">{DEVELOPER.name}</p>
                <p className="text-sm text-dim">{DEVELOPER.role}</p>
              </div>
            </div>
            <div>
              <p className="text-lg leading-relaxed text-dim">{DEVELOPER.bio}</p>
              <ul className="mt-5 flex flex-wrap gap-2" aria-label="Skills">
                {DEVELOPER.skills.map((s) => (
                  <li
                    key={s}
                    className="rounded-full border border-line bg-surface-strong px-3 py-1 text-sm font-bold"
                  >
                    {s}
                  </li>
                ))}
              </ul>
              <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:flex-wrap">
                <a
                  href={DEVELOPER.portfolio}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary"
                >
                  <Icon path={mdiBriefcaseOutline} /> View Portfolio
                </a>
                {LINKS.map((l) => (
                  <a
                    key={l.label}
                    href={l.href}
                    target={l.href.startsWith("http") ? "_blank" : undefined}
                    rel="noopener noreferrer"
                    className="btn btn-ghost"
                  >
                    <Icon path={l.icon} /> {l.label}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
