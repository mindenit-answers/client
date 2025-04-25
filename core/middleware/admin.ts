export default defineNuxtRouteMiddleware(async () => {
  const auth = useAuth()

  if (!auth.isAuthenticated.value) {
    return navigateTo('/login')
  }

  if (auth.isLoading.value) {
    await new Promise<void>((resolve) => {
      const unwatch = watch(auth.isLoading, (loading) => {
        if (!loading) {
          unwatch()
          resolve()
        }
      })

      setTimeout(() => {
        unwatch()
        resolve()
      }, 3000)
    })
  }

  if (!auth.isAdmin.value) {
    return navigateTo('/login')
  }
})
