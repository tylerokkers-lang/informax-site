import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/constants";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "",
    "/services",
    "/websites",
    "/digital-information",
    "/hospitality",
    "/pricing",
    "/about",
    "/enquire",
    "/privacy-policy",
    "/terms-and-conditions",
    "/cookie-policy",
  ];

  const priority: Record<string, number> = {
    "": 1,
    "/enquire": 0.9,
    "/services": 0.85,
    "/websites": 0.85,
    "/pricing": 0.85,
    "/digital-information": 0.75,
    "/hospitality": 0.75,
    "/about": 0.6,
  };

  return routes.map((route) => ({
    url: `${SITE_URL}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: priority[route] ?? 0.5,
  }));
}
