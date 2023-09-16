import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import netlify from "@astrojs/netlify/functions";

// https://astro.build/config
export default defineConfig({
  image: {
    remotePatterns: [{
      protocol: "https"
    }]
  },
  output: 'server',
  adapter: netlify(),
  integrations: [react()]
});