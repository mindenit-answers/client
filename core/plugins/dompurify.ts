import DOMPurify from 'dompurify'

export default defineNuxtPlugin(async () => {
  const sanitize = ref()

  if (import.meta.server) {
    const { JSDOM } = await import('jsdom')
    sanitize.value = DOMPurify(new JSDOM('').window).sanitize
  } else {
    sanitize.value = DOMPurify.sanitize
  }

  return {
    provide: {
      sanitizeHTML: (dirty: string) => sanitize.value?.(dirty) ?? '',
    },
  }
})
