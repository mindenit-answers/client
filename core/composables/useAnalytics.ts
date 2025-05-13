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
    trackQuestionShared: (url: string) =>
      trackEvent(EVENT_NAMES.QUESTION_SHARED, {
        questionUrl: url,
        questionId: url.split('#').pop(),
      }),
    trackQuestionReported: (properties: ReportData) =>
      trackEvent(EVENT_NAMES.QUESTION_REPORTED, {
        questionId: properties.id,
        testId: properties.testId,
        questionTitle: properties.questionTitle,
        description: properties.description,
        contact: properties.contact,
      }),
    trackJarButtonClicked: () => trackEvent(EVENT_NAMES.JAR_BUTTON_CLICKED),
    trackSupportButtonClicked: () =>
      trackEvent(EVENT_NAMES.SUPPORT_BUTTON_CLICKED),
    trackSearchStarted: (query: string) =>
      trackEvent(EVENT_NAMES.SEARCH_STARTED, { query }),
    trackFeaturedTestClicked: (testId: number, testName: string) =>
      trackEvent(EVENT_NAMES.FEATURED_TEST_CLICKED, {
        testId,
        testName,
      }),

    trackEvent,
  }
}
