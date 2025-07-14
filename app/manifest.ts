import type { MetadataRoute } from "next"

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Bathhouse Studio",
    short_name: "Bathhouse",
    description: "Contemporary approaches to ancient sauna and breathwork traditions",
    start_url: "/",
    display: "standalone",
    background_color: "#F2EBDE",
    theme_color: "#5A6870",
    icons: [
      {
        src: "/favicon-192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/favicon-512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  }
}
