/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_GEMINI_KEY: string;
  // add other env variables here if you have them
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}