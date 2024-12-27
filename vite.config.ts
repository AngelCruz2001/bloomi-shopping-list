import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: "docs", // Cambia la salida a la carpeta `docs`
  },
  base: "./", // Esto asegura que los assets se carguen correctamente
});
