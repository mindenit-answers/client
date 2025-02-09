import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  extends: ['./core', './layers/site'],
  modules: [
    '@mindenit/ui/nuxt',
    '@nuxt/icon',
    '@nuxt/image',
    '@vueuse/nuxt',
    '@nuxtjs/color-mode',
    '@pinia/nuxt',
    '@vee-validate/nuxt',
    '@nuxtjs/seo',
    'nuxt-gtag',
    '@nuxt/eslint',
  ],
  vite: {
    plugins: [tailwindcss()],
  },
  imports: {
    dirs: ['./core/types', './layers/**/types'],
  },
  css: ['~/core/assets/css/main.css'],
  icon: {
    provider: 'iconify',
    serverBundle: {
      collections: ['lucide'],
    },
  },
  colorMode: {
    preference: 'system',
    fallback: 'light',
    classSuffix: '',
    storageKey: 'nuxt-color-mode',
  },
  gtag: {
    id: 'G-3FX2TXSLDS',
  },
})
