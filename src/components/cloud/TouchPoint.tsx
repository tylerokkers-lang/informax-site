import AccessPoint from "@/components/access/AccessPoint";

/**
 * Legacy name kept on purpose. The public face of every physical Informax
 * product is now the Access Point, so this renders one. The `mode` prop is
 * accepted but not shown, which keeps room for a Touch-enabled Access Point
 * later without touching the callers.
 */
export default function TouchPoint({
  label,
  size = "md",
  className = "",
}: {
  label: string;
  mode?: "touch" | "scan";
  size?: "sm" | "md" | "lg";
  active?: boolean;
  className?: string;
}) {
  return <AccessPoint place={label} size={size} colourway="navy" className={className} />;
}
