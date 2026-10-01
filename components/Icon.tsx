/** Material Design Icons — the same icon set the app uses. */
export function Icon({
  path,
  size = 24,
  className,
  label,
}: {
  path: string;
  size?: number;
  className?: string;
  /** omit for decorative icons */
  label?: string;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      className={className}
      fill="currentColor"
      role={label ? "img" : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
    >
      <path d={path} />
    </svg>
  );
}
