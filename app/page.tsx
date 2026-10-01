import {
  mdiAccountStarOutline,
  mdiArrowRight,
  mdiCrown,
  mdiGamepadVariantOutline,
  mdiGestureSwipe,
  mdiLightningBolt,
  mdiMusic,
  mdiNumeric3BoxMultipleOutline,
  mdiShieldCheckOutline,
  mdiStar,
  mdiTarget,
  mdiWifiOff,
} from "@mdi/js";
import Image from "next/image";
import Link from "next/link";
import { Candy, CANDIES, type Special } from "@/components/Candy";
import { Icon } from "@/components/Icon";
import { IconTile } from "@/components/ui";
import { DEVELOPER, LEVEL_COUNT, TAGLINE } from "@/lib/site";

const FEATURES = [
  {
    icon: mdiGestureSwipe,
    title: "Swipe & Match",
    text: "Swap neighbouring candies to line up three or more and watch them pop.",
  },
  {
    icon: mdiLightningBolt,
    title: "Explosive Specials",
    text: "Striped, wrapped and colour-bomb candies clear rows, blasts and whole colours.",
  },
  {
    icon: mdiCrown,
    title: `${LEVEL_COUNT} Levels`,
    text: "Hand-tuned score and collection goals, with a boss stage every tenth level.",
  },
  {
    icon: mdiMusic,
    title: "Juicy Sound",
    text: "A sweet soundtrack, tasty match effects and celebrations. Mute any time.",
  },
  {
    icon: mdiWifiOff,
    title: "Play Offline",
    text: "No sign-up and no internet needed. Your progress lives on your device.",
  },
  {
    icon: mdiShieldCheckOutline,
    title: "No Ads, No Tracking",
    text: "Zero ads, zero analytics, zero personal data collected. Just the game.",
  },
];

const SPECIALS: { kind: number; special: Special; title: string; text: string }[] = [
  { kind: 0, special: "row", title: "Striped Candy", text: "Match 4 in a row. Clears a whole row or column." },
  { kind: 1, special: "bomb", title: "Wrapped Candy", text: "Match in an L or T shape. Explodes the 3×3 area around it." },
  { kind: -1, special: "rainbow", title: "Color Bomb", text: "Match 5 in a row. Swap it to clear every candy of that colour." },
];

const STEPS = [
  { icon: mdiGestureSwipe, text: "Swipe a candy, or tap two neighbours, to swap them." },
  { icon: mdiNumeric3BoxMultipleOutline, text: "Line up 3 or more of the same candy to clear them." },
  { icon: mdiTarget, text: "Hit the level goal before your moves run out." },
  { icon: mdiStar, text: "Leftover moves become bonus points. Chase all three stars!" },
];

/** a fixed little board for the phone mock-up */
const BOARD: [number, Special?][] = [
  [0], [3], [2], [0], [5], [1],
  [3], [1], [2, "row"], [4], [1], [0],
  [2], [2], [1], [3], [3], [4],
  [5], [4], [-1, "rainbow"], [0], [2], [1],
  [1], [0], [4], [3, "bomb"], [5], [2],
  [4], [5], [3], [1], [0], [3],
];

const FLOATERS = [
  { kind: 0, className: "left-[2%] top-[6%]", size: 54, delay: "0s" },
  { kind: 1, className: "right-[4%] top-[2%]", size: 46, delay: "0.4s" },
  { kind: 2, className: "right-[0%] top-[46%]", size: 40, delay: "0.9s" },
  { kind: 3, className: "left-[0%] top-[52%]", size: 42, delay: "0.3s" },
  { kind: 4, className: "left-[10%] bottom-[4%]", size: 36, delay: "0.7s" },
  { kind: 5, className: "right-[10%] bottom-[2%]", size: 48, delay: "0.2s" },
];

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="mx-auto grid max-w-6xl items-center gap-12 px-4 pb-16 pt-12 sm:px-6 md:grid-cols-2 md:pt-20">
        <div className="text-center md:text-left">
          <span className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-4 py-1.5 text-sm font-bold text-dim">
            <span className="size-2 rounded-full bg-success" /> Coming soon to Android &amp; iOS
          </span>
          <h1 className="mt-6 text-6xl font-black leading-[0.95] tracking-wider sm:text-7xl lg:text-8xl">
            <span className="block title-shadow-pink">CHEAP</span>
            <span className="block text-gold title-shadow-gold">CANDY</span>
          </h1>
          <p className="mt-6 text-xl font-bold text-dim">{TAGLINE}</p>
          <p className="mx-auto mt-3 max-w-md text-dim md:mx-0">
            A sweet, relaxing match-3 puzzle game. Swap candies, build combos and chase three
            stars across {LEVEL_COUNT} sugary levels.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row md:justify-start">
            <a href="#features" className="btn btn-primary animate-pulse-soft">
              <Icon path={mdiGamepadVariantOutline} /> Explore the Game
            </a>
            <Link href="/about#developer" className="btn btn-accent">
              Meet the Developer <Icon path={mdiArrowRight} />
            </Link>
          </div>
        </div>

        {/* Phone mock-up */}
        <div className="relative mx-auto w-full max-w-[420px]">
          {FLOATERS.map((f, i) => (
            <div
              key={i}
              aria-hidden
              className={`absolute z-10 hidden animate-float opacity-90 sm:block ${f.className}`}
              style={{ animationDelay: f.delay }}
            >
              <Candy kind={f.kind} size={f.size} />
            </div>
          ))}
          <div className="relative mx-auto w-[300px] rounded-[2.5rem] border-[6px] border-[#2a1b4d] bg-bg p-4 shadow-[0_30px_80px_-20px_rgba(255,79,154,0.5)] sm:w-[320px]">
            <div className="mb-3 flex items-center justify-between">
              <span className="rounded-2xl border border-line bg-surface px-3 py-1 text-center">
                <span className="block text-[9px] font-extrabold tracking-[0.2em] text-dim">LEVEL</span>
                <span className="block text-lg font-black leading-none">7</span>
              </span>
              <Image src="/logo.png" alt="" width={56} height={56} className="animate-bob" />
              <span className="grid size-12 place-items-center rounded-2xl border-2 border-white/35 bg-accent text-center leading-none">
                <span>
                  <span className="block text-lg font-black">18</span>
                  <span className="block text-[8px] font-extrabold tracking-wider">MOVES</span>
                </span>
              </span>
            </div>
            <div className="grid grid-cols-6 gap-1 rounded-2xl border border-line bg-[rgba(10,4,30,0.55)] p-2">
              {BOARD.map(([kind, special], i) => (
                <div key={i} className="grid aspect-square place-items-center">
                  <Candy kind={kind} special={special} size={30} />
                </div>
              ))}
            </div>
            <div className="mt-3 h-2.5 overflow-hidden rounded-full bg-white/10">
              <div className="h-full w-2/3 rounded-full bg-primary" />
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6">
        <dl className="card grid grid-cols-2 gap-6 p-6 text-center md:grid-cols-4">
          {[
            [String(LEVEL_COUNT), "Levels"],
            ["6", "Tasty candies"],
            ["3", "Special candies"],
            ["0", "Ads or trackers"],
          ].map(([value, label]) => (
            <div key={label}>
              <dt className="sr-only">{label}</dt>
              <dd className="text-4xl font-black text-gold">{value}</dd>
              <dd className="mt-1 text-sm font-bold text-dim">{label}</dd>
            </div>
          ))}
        </dl>
      </section>

      {/* Features */}
      <section id="features" className="mx-auto max-w-6xl scroll-mt-24 px-4 pt-24 sm:px-6">
        <div className="text-center">
          <p className="text-xs font-extrabold tracking-[0.25em] text-gold">WHY YOU&apos;LL LOVE IT</p>
          <h2 className="mt-3 text-3xl font-black sm:text-4xl">Sweet on the outside, clever inside</h2>
        </div>
        <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((f, i) => (
            <li key={f.title} className="card p-6 transition hover:-translate-y-1 hover:border-primary/60">
              <IconTile icon={f.icon} tone={i % 3 === 1 ? "primary" : i % 3 === 2 ? "gold" : "accent"} />
              <h3 className="mt-4 text-lg font-extrabold">{f.title}</h3>
              <p className="mt-1 text-dim">{f.text}</p>
            </li>
          ))}
        </ul>
      </section>

      {/* Candies & specials */}
      <section className="mx-auto grid max-w-6xl gap-6 px-4 pt-24 sm:px-6 lg:grid-cols-2">
        <div className="card p-6 sm:p-8">
          <h2 className="text-2xl font-black">Meet the Candies</h2>
          <p className="mt-1 text-dim">Every candy has its own colour and shape, so it&apos;s colour-blind friendly.</p>
          <ul className="mt-6 grid grid-cols-3 gap-y-6">
            {CANDIES.map((c, i) => (
              <li key={c.name} className="flex flex-col items-center gap-2">
                <Candy kind={i} size={60} className="transition hover:-translate-y-1 hover:rotate-6" />
                <span className="text-center text-xs font-bold text-dim">{c.name}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="card p-6 sm:p-8">
          <h2 className="text-2xl font-black">Special Candies</h2>
          <p className="mt-1 text-dim">Bigger matches build power-ups. Swap two together for a massive combo.</p>
          <ul className="mt-6 space-y-5">
            {SPECIALS.map((s) => (
              <li key={s.title} className="flex items-center gap-4">
                <Candy kind={s.kind} special={s.special} size={56} className="shrink-0" />
                <div>
                  <h3 className="font-extrabold">{s.title}</h3>
                  <p className="text-sm text-dim">{s.text}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* How to play */}
      <section className="mx-auto max-w-6xl px-4 pt-24 sm:px-6">
        <div className="text-center">
          <p className="text-xs font-extrabold tracking-[0.25em] text-gold">HOW TO PLAY</p>
          <h2 className="mt-3 text-3xl font-black sm:text-4xl">Easy to learn, hard to put down</h2>
        </div>
        <ol className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((s, i) => (
            <li key={i} className="card relative p-6">
              <span className="absolute right-5 top-4 text-5xl font-black text-white/10">{i + 1}</span>
              <IconTile icon={s.icon} tone="primary" />
              <p className="mt-4 font-bold text-dim">{s.text}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* Developer CTA */}
      <section className="mx-auto max-w-6xl px-4 pt-24 sm:px-6">
        <div className="relative overflow-hidden rounded-[2rem] border border-line bg-gradient-to-br from-accent/40 via-card to-primary/30 p-8 text-center sm:p-12">
          <div className="flex justify-center">
            <IconTile icon={mdiAccountStarOutline} tone="gold" />
          </div>
          <p className="mt-6 text-xs font-extrabold tracking-[0.25em] text-gold">DEVELOPED BY</p>
          <h2 className="mt-2 text-3xl font-black sm:text-4xl">{DEVELOPER.name}</h2>
          <p className="mx-auto mt-3 max-w-xl text-dim">{DEVELOPER.role}. Building fast, polished web and mobile experiences, one sweet detail at a time.</p>
          <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
            <Link href="/about#developer" className="btn btn-primary">
              About the Developer
            </Link>
            <a href={DEVELOPER.portfolio} target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
              View Portfolio <Icon path={mdiArrowRight} />
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
