import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: "https://phimplush.com", lastModified: new Date() },
    { url: "https://phimplush.com/about", lastModified: new Date() },
  ];
}
