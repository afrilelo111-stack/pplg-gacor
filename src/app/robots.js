export function robots() {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin", "/private"],
    },
    sitemap: "https://pplg-gacor.vercel.app/sitemap.xml",
  };
}