import { useToast } from '@mindenit/ui'

export const useShareQuestion = () => {
  const { copy } = useClipboard()
  const { toast } = useToast()

  const handleError = (error: unknown) => {
    console.error('Operation error:', error)
    toast({
      title: 'Сталася невідома помилка',
      description: 'Перевірте консоль для отримання додаткової інформації.',
      variant: 'error',
      duration: 3000,
    })
  }

  const shareUrl = async (url: string) => {
    try {
      await copy(url)
      toast({
        title: 'Посилання скопійовано!',
        description: 'Тепер ви можете поділитися ним з іншими.',
        variant: 'success',
        duration: 3000,
      })
    } catch (error) {
      handleError(error)
    }
  }

  return {
    shareUrl,
  }
}
