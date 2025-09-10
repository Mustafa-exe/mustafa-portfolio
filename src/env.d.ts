/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_TIP_ADDRESS?: string
  readonly VITE_WC_PROJECT_ID?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
