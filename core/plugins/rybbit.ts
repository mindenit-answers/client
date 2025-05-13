import rybbit from '@rybbit/js'

export default defineNuxtPlugin(() => {
  if (import.meta.client) {
    rybbit.init({
      analyticsHost: 'https://analytics.mindenit.org/api',
      siteId: '2',
      debug: process.env.NODE_ENV !== 'production',
    })
  }

  return {
    provide: {
      rybbit,
    },
  }
})
