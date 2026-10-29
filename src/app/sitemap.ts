import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/constants";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "",
    "/restaurants",
    "/hotels",
    "/how-it-works",
    "/informax-cloud",
    "/pricing",
    "/digital-experiences",
    "/about",
    "/enquire",
    "/websites",
    "/digital-information",
    "/privacy-policy",
    "/terms-and-conditions",
    "/cookie-policy",
  ];

  const priority: Record<string, number> = {
    "": 1,
    "/restaurants": 0.95,
    "/hotels": 0.95,
    "/how-it-works": 0.85,
    "/informax-cloud": 0.9,
    "/pricing": 0.9,
    "/digital-experiences": 0.6,
    "/enquire": 0.9,
    "/about": 0.6,
    "/websites": 0.5,
    "/digital-information": 0.5,
  };

  return routes.map((route) => ({
    url: `${SITE_URL}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: priority[route] ?? 0.5,
  }));
}
