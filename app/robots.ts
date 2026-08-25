import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: ["/", "/og/*"],
    },
    sitemap: "https://hydiary.my.id/sitemap.xml",
  };
}
