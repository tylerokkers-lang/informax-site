export const CLOUD_PRICING = {
  introductoryMonthly: 99,
  introductoryMonths: 3,
  standardMonthly: 149,
  annual: 1188,
} as const;

const gbp = (n: number) => `£${n.toLocaleString("en-GB")}`;

/** Every price shown on the site, derived from CLOUD_PRICING so no figure can drift from another. */
export const PRICE = (() => {
  const p = CLOUD_PRICING;
  const monthlyFirstYear = p.introductoryMonthly * p.introductoryMonths + p.standardMonthly * (12 - p.introductoryMonths);
  return {
    annual: gbp(p.annual),
    annualMonthlyEquivalent: gbp(Math.round(p.annual / 12)),
    introductoryMonthly: gbp(p.introductoryMonthly),
    introductoryMonths: p.introductoryMonths,
    standardMonthly: gbp(p.standardMonthly),
    monthlyFirstYear: gbp(monthlyFirstYear),
    annualSaving: gbp(monthlyFirstYear - p.annual),
    annualVsStandard: gbp(p.standardMonthly * 12 - p.annual),
    introductoryDiscount: gbp(p.standardMonthly - p.introductoryMonthly),
    /** One line per plan, used by signup and the setup request it sends. */
    annualLabel: `Annual: ${gbp(p.annual)} upfront per year (${gbp(Math.round(p.annual / 12))}/month equivalent)`,
    monthlyLabel: `Monthly: ${gbp(p.introductoryMonthly)}/month for ${p.introductoryMonths} months, then ${gbp(p.standardMonthly)}/month`,
  };
})();

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
