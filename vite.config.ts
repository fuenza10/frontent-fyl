import react from '@vitejs/plugin-react-swc'
import path from 'path'
import { defineConfig, PluginOption } from 'vite'; // Import the PluginOption type

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()] as PluginOption[], // Cast the plugins array to PluginOption[]
  server: {
    port: 6001
  },
  resolve: {
    alias: {
      // Crea un alias '@' que apunta al directorio 'src'
      '@/src': path.resolve(__dirname, 'src')
    }
  },
})
