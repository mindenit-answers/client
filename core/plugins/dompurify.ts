import DOMPurify from 'dompurify'
import { sanitizeOptions } from '~/core/constants'

export default defineNuxtPlugin(async () => {
  const sanitize = ref()

  if (import.meta.server) {
    const { JSDOM } = await import('jsdom')
    sanitize.value = (dirty: string) =>
      DOMPurify(new JSDOM('').window).sanitize(dirty, sanitizeOptions)
  } else {
    sanitize.value = (dirty: string) =>
      DOMPurify.sanitize(dirty, sanitizeOptions)
  }

  return {
    provide: {
      sanitizeHTML: (dirty: string) => sanitize.value?.(dirty) ?? '',
    },
  }
})
