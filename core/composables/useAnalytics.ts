import { EVENT_NAMES } from '~/core/constants'
import type { EventProperties } from '~/core/types/rybbit'

export const useAnalytics = () => {
  const nuxtApp = useNuxtApp()
  const rybbit = nuxtApp.$rybbit

  const trackEvent = (eventName: string, properties?: EventProperties) => {
    if (import.meta.client && rybbit) {
      rybbit.event(eventName, properties)
    }
  }

  return {
    trackQrCodeClicked: (properties?: EventProperties) =>
      trackEvent(EVENT_NAMES.QR_CODE_CLICKED, properties),

    trackEvent,
  }
}
