import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  extends: ['./core', './layers/site'],
  modules: [
    '@nuxt/icon',
    '@nuxt/image',
    '@vueuse/nuxt',
    '@nuxtjs/color-mode',
    '@pinia/nuxt',
    '@vee-validate/nuxt',
    '@nuxtjs/seo',
    'nuxt-gtag',
    '@nuxt/eslint',
    'motion-v/nuxt',
    '@nuxt/fonts',
    'shadcn-nuxt',
  ],
  vite: {
    plugins: [tailwindcss()],
    json: {
      stringify: true,
    },
    build: {
      rollupOptions: {
        external: ['jsdom'],
      },
      sourcemap: false,
      cssMinify: 'lightningcss',
      ssrManifest: true,
      minify: 'terser',
    },
    css: {
      devSourcemap: true,
    },
    optimizeDeps: {
      exclude: ['jsdom'],
    },
  },
  nitro: {
    minify: true,
    compressPublicAssets: {
      brotli: true,
    },
  },
  imports: {
    dirs: ['./core/types', './layers/**/types'],
  },
  runtimeConfig: {
    public: {
      baseUrl: process.env.BASE_URL,
      apiBaseUrl: process.env.API_BASE_URL,
      supportUrl: 'https://t.me/mindenit_support',
      jarUrl: 'https://send.monobank.ua/jar/2GW9aAQNXE',
      webhook: process.env.DISCORD_WEBHOOK_URL,
    },
  },
  future: {
    compatibilityVersion: 4,
  },
  css: ['~/core/assets/css/main.css'],
  shadcn: {
    prefix: '',
  },
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
  nuxtseo: {
    enabled: true,
  },
  site: {
    name: 'Mindenit Answers',
    description:
      'Платформа запитань та відповідей, керована спільнотою. Сайт створений для студентів ХНУРЕ, щоб полегшити доступ до навчальних матеріалів і обміну знаннями.',
    defaultLocale: 'uk',
    indexable: true,
  },
  seo: {
    meta: {
      keywords:
        'відповіді,тести,відповідь,тест,спільнота,платформа,запитання,відповідь на запитання,онлайн тести,навчання,хнуре,харків',
    },
  },
  sitemap: {
    sources: ['/api/__sitemap__/urls'],
    exclude: ['/admin/**'],
  },
  robots: {
    sitemap: '/sitemap.xml',
    host: process.env.BASE_URL,
    disallow: ['/admin', '/admin/**'],
  },
})
