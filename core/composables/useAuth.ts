import { ref, computed } from 'vue'
import { useMutation, useQuery, useQueryClient } from '@tanstack/vue-query'

interface LoginCredentials {
  email: string
  password: string
}

interface User {
  id: number
  createdAt: string
  updatedAt: string
  username: string
  email: string
  role: 'supervisor' | 'admin' | 'user'
}

interface LoginResponse {
  access_token: string
}

export const useAuth = () => {
  const apiUrl = useRuntimeConfig().public.apiBaseUrl

  const token = ref<string | null>(null)
  const error = ref<string | null>(null)
  const queryClient = useQueryClient()

  const isClient = import.meta.client

  const initAuth = () => {
    if (!isClient) return
    try {
      const storedToken = localStorage.getItem('auth_token')
      if (storedToken) token.value = storedToken
    } catch (err) {
      console.error('Failed to restore auth token:', err)
    }
  }

  initAuth()

  const userQuery = useQuery({
    queryKey: ['user'],
    queryFn: async () => {
      if (!token.value) return null

      const response = await fetch(`${apiUrl}/me`, {
        headers: {
          Authorization: `Bearer ${token.value}`,
        },
      })

      if (!response.ok) {
        throw new Error('Failed to fetch user data')
      }

      return (await response.json()) as User
    },
    enabled: computed(() => !!token.value),
    retry: false,
    refetchOnWindowFocus: true,
  })

  const isAuthenticated = computed(() => !!token.value)

  const isAdmin = computed(() => {
    const role = userQuery.data?.value?.role
    return role === 'admin' || role === 'supervisor'
  })

  const isSupervisor = computed(() => {
    return userQuery.data?.value?.role === 'supervisor'
  })

  const user = computed(() => userQuery.data?.value)

  const loginMutation = useMutation({
    mutationFn: async (credentials: LoginCredentials) => {
      error.value = null

      const response = await fetch(`${apiUrl}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || 'Authentication failed')
      }

      return (await response.json()) as LoginResponse
    },
    onSuccess: (data) => {
      token.value = data.access_token
      if (isClient) {
        localStorage.setItem('auth_token', data.access_token)
      }

      queryClient.invalidateQueries({ queryKey: ['user'] })
    },
    onError: (err: Error) => {
      error.value = err.message
      console.error('Login error:', err)
    },
  })

  const logoutMutation = useMutation({
    mutationFn: async () => {
      if (!token.value) return { message: 'Already logged out' }

      const response = await fetch(`${apiUrl}/logout`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token.value}`,
        },
      })

      if (!response.ok) {
        throw new Error('Logout failed')
      }

      return await response.json()
    },
    onSuccess: () => {
      logout()
      navigateTo('/')
    },
    onError: (err) => {
      console.error('Logout error:', err)
      logout()
      navigateTo('/')
    },
  })

  const logout = () => {
    token.value = null
    if (isClient) {
      localStorage.removeItem('auth_token')
    }
    queryClient.invalidateQueries({ queryKey: ['user'] })
  }

  const login = (credentials: LoginCredentials) => {
    return loginMutation.mutate(credentials)
  }

  const getAuthToken = () => {
    return token.value ? `Bearer ${token.value}` : ''
  }

  return {
    user,
    login,
    logout: () => logoutMutation.mutate(),
    isAuthenticated,
    isAdmin,
    isSupervisor,
    isLoading: computed(
      () =>
        loginMutation.isPending.value ||
        logoutMutation.isPending.value ||
        userQuery.isLoading.value
    ),
    error: computed(() => error.value),
    getAuthToken,
    refreshUser: () => queryClient.invalidateQueries({ queryKey: ['user'] }),
  }
}
