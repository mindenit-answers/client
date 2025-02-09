export const useShareQuestion = () => {
  const { copy } = useClipboard()

  const handleError = (error: unknown) => {
    console.error('Operation error:', error)
  }

  const shareUrl = async (url: string) => {
    try {
      await copy(url)
    } catch (error) {
      handleError(error)
    }
  }

  return {
    shareUrl,
  }
}
