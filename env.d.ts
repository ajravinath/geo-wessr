/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_OPEN_WEATHER_KEY: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
