/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_DOG_API_URL: string;
  readonly VITE_DOG_API_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
