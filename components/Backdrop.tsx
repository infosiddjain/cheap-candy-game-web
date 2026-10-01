/** The app's drifting glow blobs, fixed behind every page. */
export function Backdrop() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-bg">
      <div
        className="absolute -left-36 -top-32 size-[420px] animate-drift rounded-full bg-[#7C3AED] opacity-35 blur-3xl md:size-[620px]"
        style={{ "--dx": "40px", "--dy": "30px" } as React.CSSProperties}
      />
      <div
        className="absolute -bottom-28 -right-32 size-[380px] animate-drift rounded-full bg-[#EC4899] opacity-35 blur-3xl md:size-[560px]"
        style={{ "--dx": "-30px", "--dy": "-40px" } as React.CSSProperties}
      />
      <div
        className="absolute -right-24 top-[40%] size-[260px] animate-drift rounded-full bg-[#2563EB] opacity-25 blur-3xl md:size-[380px]"
        style={{ "--dx": "20px", "--dy": "-25px" } as React.CSSProperties}
      />
    </div>
  );
}
