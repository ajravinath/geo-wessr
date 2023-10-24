/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_OPEN_WEATHER_KEY: string
  readonly VITE_GEO_DB_URL: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
