<script lang="ts" setup>
const { enableSidebar } = useSidebar()
const { logout } = useAuth()
const route = useRoute()

enableSidebar()

const adminLinks = [
  {
    name: 'Головна',
    href: '/admin',
    icon: 'lucide:home',
  },
  {
    name: 'Питання',
    href: '/admin/questions',
    icon: 'lucide:message-circle-question',
  },
  {
    name: 'Курси',
    href: '/admin/courses',
    icon: 'lucide:shapes',
  },
  {
    name: 'Тести',
    href: '/admin/tests',
    icon: 'lucide:list-todo',
  },
  {
    name: 'Предмети',
    href: '/admin/subjects',
    icon: 'lucide:book-open',
  },
  {
    name: 'Факультети',
    href: '/admin/faculties',
    icon: 'lucide:graduation-cap',
  },
  {
    name: 'Університети',
    href: '/admin/universities',
    icon: 'lucide:university',
  },
]
</script>

<template>
  <div class="flex flex-col max-h-dvh w-full relative">
    <div class="flex flex-col pt-5 container mx-auto px-4 gap-5">
      <TheNavbar />

      <div class="flex md:pb-5 pb-24 gap-4">
        <TheSidebar>
          <template #header>
            <Heading size="tiny" class="text-center">Адмін-панель</Heading>
          </template>

          <template #content>
            <SidebarLink
              v-for="link in adminLinks"
              :key="link.name"
              :active="route.path === link.href"
              :to="link.href"
            >
              <Icon v-if="link.icon" :name="link.icon" size="18px" />
              {{ link.name }}
            </SidebarLink>
          </template>

          <template #footer>
            <SidebarLink variant="subtle" icon="lucide:log-out" @click="logout">
              Вийти
            </SidebarLink>
          </template>
        </TheSidebar>

        <div class="flex w-full flex-col gap-5">
          <slot />
        </div>
      </div>
    </div>
  </div>
</template>
