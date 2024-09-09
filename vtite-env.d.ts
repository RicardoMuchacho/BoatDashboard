/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_SUPABASE_URL: string;
  readonly VITE_SUPABASE_KEY: string;
  // Add more environment variables here if needed
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}