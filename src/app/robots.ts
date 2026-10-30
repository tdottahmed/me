import { MetadataRoute } from "next";
import { PORTFOLIO_DATA } from "@/data/portfolio";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${PORTFOLIO_DATA.personal.portfolioUrl}/sitemap.xml`,
  };
}
