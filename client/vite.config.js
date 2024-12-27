import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { configDotenv } from 'dotenv'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // Define the environment variables that will be available in the client
  define: {
    'process.env': configDotenv().parsed
  }
})
