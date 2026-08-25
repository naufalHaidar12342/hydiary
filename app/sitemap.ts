import { MetadataRoute } from "next";
import { HYDIARY_URL } from "./utilities/constants/hydiarySiteConfigs";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${HYDIARY_URL}`,
      lastModified: new Date(),
      changeFrequency: "hourly",
      priority: 1,
    },
    {
      url: `${HYDIARY_URL}/entries`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.6,
    },
    {
      url: `${HYDIARY_URL}/about`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.3,
    },
  ];
}
