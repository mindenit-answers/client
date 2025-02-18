export const useScrollProgress = () => {
  const progress = ref(0)

  const updateProgress = () => {
    const windowHeight = window.innerHeight
    const documentHeight = document.documentElement.scrollHeight
    const scrolled = window.scrollY
    progress.value = (scrolled / (documentHeight - windowHeight)) * 100
  }

  onMounted(() => {
    window.addEventListener('scroll', updateProgress)
    updateProgress()
  })

  onUnmounted(() => {
    window.removeEventListener('scroll', updateProgress)
  })

  return {
    progress,
    updateProgress,
  }
}
