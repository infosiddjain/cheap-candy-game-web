import { Icon } from "./Icon";

/** Top-of-page heading block used by the inner pages. */
export function PageHeader({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string;
  title: string;
  children?: React.ReactNode;
}) {
  return (
    <header className="mx-auto max-w-3xl px-4 pb-10 pt-14 text-center sm:px-6 md:pt-20">
      <p className="text-xs font-extrabold tracking-[0.25em] text-gold">{eyebrow}</p>
      <h1 className="mt-3 text-4xl font-black sm:text-5xl">{title}</h1>
      {children && <div className="mt-4 text-lg text-dim">{children}</div>}
    </header>
  );
}

export function SectionTitle({ icon, children }: { icon: string; children: React.ReactNode }) {
  return (
    <h2 className="mb-4 flex items-center gap-2 text-lg font-extrabold">
      <Icon path={icon} size={22} className="shrink-0 text-primary" />
      {children}
    </h2>
  );
}

/** Rounded icon tile, like the app's settings / tutorial icons. */
export function IconTile({
  icon,
  tone = "accent",
}: {
  icon: string;
  tone?: "accent" | "primary" | "gold";
}) {
  const bg = { accent: "bg-accent", primary: "bg-primary", gold: "bg-gold text-[#6B4A00]" }[tone];
  return (
    <span className={`grid size-12 shrink-0 place-items-center rounded-2xl ${bg}`}>
      <Icon path={icon} size={24} />
    </span>
  );
}
