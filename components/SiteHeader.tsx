"use client";

import { mdiClose, mdiMenu } from "@mdi/js";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { APP_NAME, NAV } from "@/lib/site";
import { Icon } from "./Icon";

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const [first, ...rest] = APP_NAME.toUpperCase().split(" ");

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-bg/70 backdrop-blur-xl">
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2" aria-label={`${APP_NAME} home`}>
          <Image src="/logo.png" alt="" width={44} height={44} className="animate-bob" preload />
          <span className="text-xl font-black tracking-wider">
            {first} <span className="text-gold">{rest.join(" ")}</span>
          </span>
        </Link>

        <ul className="hidden items-center gap-1 md:flex">
          {NAV.map((l) => {
            const active = pathname === l.href;
            return (
              <li key={l.href}>
                <Link
                  href={l.href}
                  aria-current={active ? "page" : undefined}
                  className={`rounded-full px-4 py-2 text-sm font-bold transition-colors ${
                    active ? "bg-primary text-white" : "text-dim hover:bg-surface-strong hover:text-white"
                  }`}
                >
                  {l.label}
                </Link>
              </li>
            );
          })}
        </ul>

        <button
          type="button"
          className="grid size-11 place-items-center rounded-2xl border border-line bg-surface-strong md:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
        >
          <Icon path={open ? mdiClose : mdiMenu} size={24} />
        </button>
      </nav>

      {open && (
        <ul className="space-y-1 border-t border-line px-4 pb-4 pt-2 md:hidden">
          {NAV.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                aria-current={pathname === l.href ? "page" : undefined}
                onClick={() => setOpen(false)}
                className={`block rounded-2xl px-4 py-3 font-bold ${
                  pathname === l.href ? "bg-primary text-white" : "text-dim hover:bg-surface-strong"
                }`}
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </header>
  );
}
