import rybbit from '@rybbit/js'

export default defineNuxtPlugin(() => {
  if (import.meta.client) {
    rybbit.init({
      analyticsHost: 'https://analytics.mindenit.org/api/script.js',
      siteId: '2',
    })
  }

  return {
    provide: {
      rybbit: rybbit,
    },
  }
})
