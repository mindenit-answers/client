<script lang="ts" setup>
const config = useRuntimeConfig()
</script>

<template>
  <DialogContent>
    <DialogHeader>
      <DialogTitle class="flex items-center gap-2">
        <Icon name="lucide:users" class="size-5 text-primary" />
        Приєднуйтесь до нашої команди!
      </DialogTitle>
    </DialogHeader>
    <div class="flex flex-col w-full gap-4">
      <div class="flex items-center gap-3">
        <div
          class="bg-muted size-10 rounded-full flex items-center justify-center max-sm:hidden shrink-0"
        >
          <Icon name="lucide:code" class="size-8 text-primary" />
        </div>
        <div>
          <p class="font-medium">Шукаємо Backend та Frontend розробників</p>
          <p class="text-sm text-muted-foreground">
            Розширюємо команду для роботи над декількома проектами одночасно
          </p>
        </div>
      </div>
      <div class="grid grid-cols-1 gap-2 w-full">
        <Button target="_blank" class="w-full">
          <Icon name="lucide:briefcase" class="mr-2" />
          Переглянути вакансії
        </Button>
      </div>
      <div class="bg-muted p-3 rounded-lg text-center border border-dashed">
        <p class="text-sm mb-2">
          <Icon
            name="lucide:heart"
            class="inline-block size-4 mr-1 text-red-500"
          />
          Маєте питання? Звертайтеся напряму!
        </p>
        <div class="flex justify-center gap-2">
          <Button
            as="a"
            target="_blank"
            variant="outline"
            size="sm"
            :href="config.public.telegramUrl"
          >
            <Icon name="lucide:mail" class="mr-2 size-3" />
            Написати HR
          </Button>
        </div>
      </div>
    </div>
  </DialogContent>
</template>
