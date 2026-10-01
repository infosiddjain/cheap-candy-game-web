import type { Metadata, Viewport } from "next";
import { Roboto } from "next/font/google";
import { Backdrop } from "@/components/Backdrop";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { APP_NAME, DEVELOPER, SITE_URL } from "@/lib/site";
import "./globals.css";

// Roboto is what the app renders with on Android, so the type matches
const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
  weight: ["400", "500", "700", "800", "900"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${APP_NAME} · Match-3 Puzzle Game`,
    template: `%s · ${APP_NAME}`,
  },
  description:
    "Cheap Candy is a sweet match-3 puzzle game with 100 levels, explosive special candies and no ads or tracking. Developed by Siddharth Jain.",
  authors: [{ name: DEVELOPER.name, url: DEVELOPER.portfolio }],
  creator: DEVELOPER.name,
  openGraph: {
    title: `${APP_NAME} · Match-3 Puzzle Game`,
    description: "Swap, match and blast your way through 100 sugary levels.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#140B2E",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${roboto.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col font-sans">
        <Backdrop />
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
