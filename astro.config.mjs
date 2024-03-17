import { defineConfig } from 'astro/config';

import tailwind from "@astrojs/tailwind";

export default defineConfig({
  integrations: [tailwind()],
  // Tentukan port yang akan digunakan
  // Jika port tidak disediakan oleh lingkungan hosting, default ke port 3000
  http: {
    port: process.env.PORT || 3000
  }
});
