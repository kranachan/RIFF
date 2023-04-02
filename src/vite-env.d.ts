/// <reference types="vite/client" />
/// <reference types="vite-svg-loader" />

interface ImportMetaEnv extends Readonly<Record<string, string>> {
  readonly VITE_API_URL: string
  readonly VITE_HASH_MODE_ENABLED: boolean
}

interface ImportMeta {
  env: ImportMetaEnv
}
