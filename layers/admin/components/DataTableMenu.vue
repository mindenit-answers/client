<script setup lang="ts">
import { Button } from '@/core/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/core/components/ui/dropdown-menu'

defineProps<{
  item: { id: string; [key: string]: unknown }
}>()

defineEmits<{
  (e: 'edit', item: object): void
  (e: 'delete', id: string): void
}>()
</script>

<template>
  <Dialog>
    <DropdownMenu>
      <DropdownMenuTrigger as-child>
        <Button variant="ghost" class="w-8 h-8 p-0" size="icon">
          <Icon name="lucide:menu" class="!size-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DialogTrigger as-child>
          <DropdownMenuItem>
            <Icon name="lucide:pencil" class="w-4 h-4 mr-2" />
            Редагувати
          </DropdownMenuItem>
        </DialogTrigger>
        <DropdownMenuItem @click="$emit('delete', item.id)">
          <Icon name="lucide:trash-2" class="w-4 h-4 mr-2" text-destructive />
          Видалити
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Редагувати</DialogTitle>
      </DialogHeader>
      <slot name="dialog-content" :item="item"></slot>
    </DialogContent>
  </Dialog>
</template>
