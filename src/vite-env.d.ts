/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_PAYSTACK_PUBLIC_KEY?: string;
  readonly VITE_MOMO_SUBSCRIPTION_KEY?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
