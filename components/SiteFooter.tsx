import { mdiGithub, mdiLinkedin, mdiEmailOutline, mdiBriefcaseOutline } from "@mdi/js";
import Image from "next/image";
import Link from "next/link";
import { APP_NAME, DEVELOPER, NAV, SUPPORT_EMAIL, TAGLINE } from "@/lib/site";
import { Icon } from "./Icon";

const SOCIALS = [
  { href: DEVELOPER.portfolio, icon: mdiBriefcaseOutline, label: "Portfolio" },
  { href: DEVELOPER.github, icon: mdiGithub, label: "GitHub" },
  { href: DEVELOPER.linkedin, icon: mdiLinkedin, label: "LinkedIn" },
  { href: `mailto:${SUPPORT_EMAIL}`, icon: mdiEmailOutline, label: "Email" },
];

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-line bg-bg-deep/60">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-3">
        <div>
          <Link href="/" className="flex items-center gap-2">
            <Image src="/logo.png" alt="" width={40} height={40} />
            <span className="text-lg font-black tracking-wider">{APP_NAME.toUpperCase()}</span>
          </Link>
          <p className="mt-3 text-sm text-dim">{TAGLINE} A sweet match-3 adventure for every age.</p>
        </div>

        <nav aria-label="Footer">
          <h2 className="text-xs font-extrabold tracking-[0.2em] text-gold">EXPLORE</h2>
          <ul className="mt-3 grid grid-cols-2 gap-2 text-sm">
            {NAV.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="text-dim hover:text-white">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="text-xs font-extrabold tracking-[0.2em] text-gold">DEVELOPED BY</h2>
          <p className="mt-3 font-extrabold">{DEVELOPER.name}</p>
          <div className="mt-3 flex gap-2">
            {SOCIALS.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target={s.href.startsWith("http") ? "_blank" : undefined}
                rel="noopener noreferrer"
                aria-label={s.label}
                className="grid size-10 place-items-center rounded-2xl border border-line bg-surface-strong transition hover:-translate-y-0.5 hover:bg-accent"
              >
                <Icon path={s.icon} size={20} />
              </a>
            ))}
          </div>
        </div>
      </div>
      <p className="border-t border-line py-5 text-center text-sm text-faint">
        Crafted with <span className="text-primary">♥</span> by {DEVELOPER.name}
      </p>
    </footer>
  );
}
