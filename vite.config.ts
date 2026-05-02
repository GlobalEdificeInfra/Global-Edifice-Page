import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import tsconfigPaths from "vite-tsconfig-paths";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [tailwindcss(), tsconfigPaths({ projects: ["./tsconfig.json"] }), react()],
  server: {
    host: "::",
    port: 8080,
  },
});
