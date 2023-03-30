/// <reference types="vite/client" />
/// <reference types="vite-svg-loader" />

interface ImportMetaEnv extends Readonly<Record<string, string>> {
  readonly VITE_API_URL: string
}

interface ImportMeta {
  env: ImportMetaEnv
}
