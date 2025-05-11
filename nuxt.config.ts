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
    name: 'Відповіді на тести ХНУРЕ та інших університетів – Mindenit',
    description:
      'Шукайте відповіді на тести ХНУРЕ та інших університетів. Предмети, факультети, зручний пошук на Mindenit Answers.',
    defaultLocale: 'uk',
    indexable: true,
    trailingSlash: false,
  },
  seo: {
    canonicalLowercase: true,
    redirectToCanonicalSiteUrl: true,
    meta: {
      keywords:
        'відповіді,тести,відповідь,тест,спільнота,платформа,запитання,відповідь на запитання,онлайн тести,навчання,хнуре,харків,тести ХНУРЕ, відповіді на тести ХНУРЕ, ХНУРЕ тести, університет радіоелектроніки тести, допомога з тестами ХНУРЕ, база тестів ХНУРЕ, питання і відповіді ХНУРЕ, ХНУРЕ студентам',

      ogType: 'website',
      ogTitle: '%s | Mindenit Answers',
      ogDescription: 'Платформа запитань та відповідей для студентів ХНУРЕ',
      author: 'Mindenit Team',
      themeColor: [
        { content: '#ffffff', media: '(prefers-color-scheme: light)' },
        { content: '#090f1f', media: '(prefers-color-scheme: dark)' },
      ],
      fallbackTitle: 'Mindenit Answers',
    },
  },
  sitemap: {
    sources: ['/api/__sitemap__/urls'],
    exclude: ['/admin/**', '/faggots'],
  },
  robots: {
    sitemap: '/sitemap.xml',
    host: process.env.BASE_URL,
    disallow: ['/admin', '/admin/**', '/faggots'],
  },
  app: {
    head: {
      script: [
        {
          src: 'https://analytics.mindenit.org/api/script.js',
          'data-site-id': '2',
          defer: true,
        },
      ],
    },
  },
})
