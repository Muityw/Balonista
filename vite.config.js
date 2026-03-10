import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// ⚠️  Troque "/balonista/" pelo nome do seu repositório no GitHub
// Exemplo: se seu repo se chama "meu-site", coloque "/meu-site/"
// Se for um domínio próprio (usuario.github.io) sem subpasta, use "/"
export default defineConfig({
  plugins: [react()],
  base: "/Balonista/",
});
