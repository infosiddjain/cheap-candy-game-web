import {
  mdiCandy,
  mdiCandycane,
  mdiCookie,
  mdiCupcake,
  mdiDiamondStone,
  mdiIceCream,
  mdiStarFourPoints,
} from "@mdi/js";
import { Icon } from "./Icon";

/** Candy colours and shapes, identical to the app's CANDIES table. */
export const CANDIES = [
  { icon: mdiCandy, color: "#FF4F7B", dark: "#C92553", ink: "#FFFFFF", name: "Cherry Drop" },
  { icon: mdiIceCream, color: "#39A9FF", dark: "#1976D2", ink: "#FFFFFF", name: "Blue Scoop" },
  { icon: mdiCupcake, color: "#B86BFF", dark: "#7E3BD1", ink: "#FFFFFF", name: "Grape Cake" },
  { icon: mdiCookie, color: "#FF9A2E", dark: "#D46A00", ink: "#FFFFFF", name: "Orange Crunch" },
  { icon: mdiCandycane, color: "#2BD98B", dark: "#0FA564", ink: "#FFFFFF", name: "Mint Cane" },
  { icon: mdiDiamondStone, color: "#FFD84D", dark: "#E0A800", ink: "#6B4A00", name: "Lemon Gem" },
] as const;

const RAINBOW = { icon: mdiStarFourPoints, color: "#2A1B4D", dark: "#120A26", ink: "#FFFFFF" };

export type Special = "none" | "row" | "col" | "bomb" | "rainbow";

/** Web twin of the app's CandyFace: glossy tile, darker lip, shine and icon. */
export function Candy({
  kind,
  special = "none",
  size = 64,
  className,
}: {
  kind: number;
  special?: Special;
  size?: number;
  className?: string;
}) {
  const s = special === "rainbow" || kind < 0 ? RAINBOW : CANDIES[kind];
  const r = size * 0.32;
  const stripe = special === "row" || special === "col";
  return (
    <div
      className={className}
      style={{ width: size, height: size, borderRadius: r, background: s.dark, overflow: "hidden" }}
    >
      <div
        className="relative flex items-center justify-center overflow-hidden"
        style={{
          height: size * 0.92,
          borderRadius: r,
          background: s.color,
          border: special === "bomb" ? `${size * 0.075}px solid #fff` : undefined,
        }}
      >
        {stripe && (
          <div
            className="absolute inset-0 flex items-center justify-evenly"
            style={{ flexDirection: special === "row" ? "column" : "row" }}
          >
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                style={{
                  background: "rgb(255 255 255 / 0.55)",
                  ...(special === "row"
                    ? { height: size * 0.09, width: "100%" }
                    : { width: size * 0.09, height: "100%" }),
                }}
              />
            ))}
          </div>
        )}
        {special === "rainbow" &&
          CANDIES.map((c, i) => {
            const a = (i / CANDIES.length) * Math.PI * 2;
            const d = size * 0.3;
            const dot = size * 0.15;
            return (
              <span
                key={i}
                className="absolute rounded-full"
                style={{
                  width: dot,
                  height: dot,
                  background: c.color,
                  left: size / 2 + Math.cos(a) * d - dot / 2,
                  top: (size * 0.92) / 2 + Math.sin(a) * d - dot / 2,
                }}
              />
            );
          })}
        <span
          className="absolute"
          style={{
            width: size * 0.42,
            height: size * 0.2,
            borderRadius: size,
            top: size * 0.08,
            left: size * 0.12,
            background: "rgb(255 255 255 / 0.35)",
            transform: "rotate(-18deg)",
          }}
        />
        <span className="relative flex" style={{ color: s.ink }}>
          <Icon path={s.icon} size={size * (special === "rainbow" ? 0.38 : 0.56)} />
        </span>
      </div>
    </div>
  );
}
