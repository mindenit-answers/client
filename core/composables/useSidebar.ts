// useSidebar.ts
import { onBeforeRouteLeave, useRoute } from 'vue-router'

export const useSidebar = () => {
  const isMobileSidebarOpen = useState('mobileSidebarOpen', () => false)
  const sidebarEnabledPaths = useState<string[]>(
    'sidebarEnabledPaths',
    () => []
  )
  const route = useRoute()

  const currentPath = computed(() => route.path)

  const isEnabledForCurrentPage = computed(() => {
    return sidebarEnabledPaths.value.some((path) => {
      if (currentPath.value === path) return true

      if (path.endsWith('/')) {
        return currentPath.value.startsWith(path)
      } else {
        return currentPath.value.startsWith(path + '/')
      }
    })
  })

  const toggleMobileSidebar = () => {
    isMobileSidebarOpen.value = !isMobileSidebarOpen.value
  }

  const closeMobileSidebar = () => {
    isMobileSidebarOpen.value = false
  }

  const enableSidebar = (basePath?: string) => {
    const path = basePath || currentPath.value

    if (!sidebarEnabledPaths.value.includes(path)) {
      sidebarEnabledPaths.value = [...sidebarEnabledPaths.value, path]
    }
  }

  const disableSidebar = (basePath?: string) => {
    const path = basePath || currentPath.value

    sidebarEnabledPaths.value = sidebarEnabledPaths.value.filter(
      (p) => p !== path
    )
  }

  onBeforeRouteLeave(() => {
    closeMobileSidebar()
  })

  return {
    isMobileSidebarOpen,
    sidebarEnabled: isEnabledForCurrentPage,
    toggleMobileSidebar,
    closeMobileSidebar,
    enableSidebar,
    disableSidebar,
  }
}
