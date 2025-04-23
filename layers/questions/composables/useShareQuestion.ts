import { toast } from 'vue-sonner'

export const useShareQuestion = () => {
  const { copy } = useClipboard()

  const handleError = (error: unknown) => {
    console.error('Operation error:', error)
    toast.error('Сталася невідома помилка', {
      description: 'Перевірте консоль для отримання додаткової інформації.',
    })
  }

  const shareUrl = async (url: string) => {
    try {
      await copy(url)
      toast.success('Посилання скопійовано!', {
        description: 'Тепер ви можете поділитися ним з іншими.',
      })
    } catch (error) {
      handleError(error)
    }
  }

  return {
    shareUrl,
  }
}
