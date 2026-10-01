import Link from "next/link";
import { Candy } from "@/components/Candy";

export default function NotFound() {
  return (
    <section className="mx-auto flex max-w-md flex-col items-center px-4 py-24 text-center">
      <Candy kind={2} size={88} className="animate-float" />
      <h1 className="mt-8 text-4xl font-black">Out of moves!</h1>
      <p className="mt-3 text-dim">This page got crushed. Let&apos;s get you back to the board.</p>
      <Link href="/" className="btn btn-primary mt-8">
        Back to Home
      </Link>
    </section>
  );
}
