export default defineNuxtRouteMiddleware(async () => {
  const auth = useAuth()

  if (!auth.isAuthenticated.value) {
    return navigateTo('/login')
  }

  const user = auth.user.value

  if (!user && import.meta.client && auth.isLoading.value) {
    await Promise.race([
      new Promise<void>((resolve) => {
        const unwatch = watch(auth.user, (newUser) => {
          if (newUser) {
            unwatch()
            resolve()
          }
        })
      }),
      new Promise<void>((resolve) => setTimeout(resolve, 1000)),
    ])
  }

  if (!auth.user.value) {
    if (import.meta.client) {
      auth.logout()
    }
    return navigateTo('/login')
  }

  if (!auth.isAdmin.value) {
    return navigateTo('/login')
  }
})
