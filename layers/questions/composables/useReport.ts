import { useMutation } from '@tanstack/vue-query'
import { toast } from 'vue-sonner'
import { useLocalStorage, useIntervalFn } from '@vueuse/core'

type ReportData = {
  id: number
  testId: number
  questionTitle: string
  description: string
  contact?: string
}

export const useReport = () => {
  const config = useRuntimeConfig()
  const REPORT_COOLDOWN_MS = 10000

  const lastReportTime = useLocalStorage('last_report_time', 0)
  const isSubmitting = ref(false)
  const remainingCooldownSeconds = ref(0)

  const canSendReport = computed(() => {
    if (remainingCooldownSeconds.value === 0 && !isSubmitting.value) {
      return true
    }

    const now = Date.now()
    const timePassedSinceLastReport = now - lastReportTime.value
    return (
      timePassedSinceLastReport >= REPORT_COOLDOWN_MS && !isSubmitting.value
    )
  })

  const updateRemainingTime = () => {
    const now = Date.now()
    const timePassedSinceLastReport = now - lastReportTime.value
    const remaining = Math.ceil(
      (REPORT_COOLDOWN_MS - timePassedSinceLastReport) / 1000
    )
    remainingCooldownSeconds.value = Math.max(0, remaining)

    if (remainingCooldownSeconds.value === 0) {
      pause()
    }
  }

  const { pause, resume } = useIntervalFn(updateRemainingTime, 1000)

  updateRemainingTime()

  watch(
    canSendReport,
    (can) => {
      if (can) {
        pause()
      } else {
        resume()
      }
    },
    { immediate: true }
  )

  const sendMutation = useMutation({
    mutationFn: async (data: ReportData) => {
      isSubmitting.value = true

      const embed = {
        title: '📢 РЕПОРТ',
        color: 6514930,
        fields: [
          {
            name: '`🔗` Посилання на питання',
            value: `[Питання ${data.id} в тесті ${
              data.testId
            }](${getQuestionLink(data.id, data.testId)})`,
            inline: false,
          },
          {
            name: '`❓` Питання',
            value: data.questionTitle,
            inline: false,
          },
          {
            name: '`📝` Опис помилки',
            value: data.description,
            inline: false,
          },
          {
            name: "`📞` Контакт для зв'язку",
            value: data.contact || 'Не вказано',
            inline: false,
          },
        ],
        timestamp: new Date().toISOString(),
      }

      try {
        await fetch(`${config.public.webhook}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ embeds: [embed] }),
        })

        lastReportTime.value = Date.now()
        updateRemainingTime()
        resume()

        toast.success('Репорт успішно надіслано! Дякуємо за вашу допомогу!')
      } catch (error) {
        toast.error('Сталася помилка при надсиланні репорту. Спробуйте ще раз.')
        console.error('Report error:', error)
        throw error
      } finally {
        isSubmitting.value = false
      }
    },
  })

  const sendReport = async (data: ReportData) => {
    updateRemainingTime()

    if (!canSendReport.value) {
      if (isSubmitting.value) {
        toast.error('Репорт вже відправляється, зачекайте')
      } else {
        toast.error(
          `Зачекайте ${remainingCooldownSeconds.value} секунд перед відправкою нового репорту`
        )
      }
      return
    }

    return sendMutation.mutateAsync(data)
  }

  const getQuestionLink = (questionId: number, testId: number) => {
    return `${config.public.baseUrl}/test/${testId}#${questionId}`
  }

  onUnmounted(() => {
    pause()
  })

  return {
    sendReport,
    getQuestionLink,
    isSubmitting,
    canSendReport,
    remainingCooldownSeconds,
  }
}
