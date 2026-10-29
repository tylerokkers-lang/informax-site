export const CLOUD_PRICING = {
  introductoryMonthly: 199,
  introductoryMonths: 6,
  standardMonthly: 249,
  annual: 1788,
} as const;

export type CloudPlan = "annual" | "monthly";
export const normalisePlan = (value: unknown): CloudPlan => value === "annual" ? "annual" : "monthly";

/** Only a deployment-configured HTTPS destination can receive signup traffic. Never use the old V1 login as a fallback. */
export function cloudSignupDestination(configured: string | undefined, plan: CloudPlan): string | null {
  if (!configured) return null;
  try {
    const target = new URL(configured);
    if (target.protocol !== "https:" || target.username || target.password) return null;
    target.searchParams.set("plan", plan);
    target.hash = "";
    return target.toString();
  } catch {
    return null;
  }
}
