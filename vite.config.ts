import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// perekopskyi.github.io is a user site, served at the domain root.
export default defineConfig({
  base: "/",
  plugins: [react(), tailwindcss()],
});
