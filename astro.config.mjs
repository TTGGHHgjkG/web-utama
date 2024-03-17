import { defineConfig } from 'astro/config';

import tailwind from "@astrojs/tailwind";

export default defineConfig({
  devOptions: {
    port: process.env.PORT || 3000,
  },
  integrations: [tailwind()]
});
