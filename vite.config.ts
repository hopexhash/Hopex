import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  // Relative so the build works both at hopexmusic.com/ and at the
  // hopexhash.github.io/Hopex/ sub-path fallback.
  base: './',
});
