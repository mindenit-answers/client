<script lang="ts" setup>
const { currentDialog, isDialogOpen, closeDialog, initializeDialogs } =
  useDialogManager()

onMounted(() => {
  initializeDialogs()
})
</script>

<template>
  <Dialog
    :open="isDialogOpen"
    @update:open="
      (val) => {
        if (!val) closeDialog()
      }
    "
  >
    <ExtensionDialog v-if="currentDialog?.component === 'ExtensionDialog'" />
  </Dialog>
</template>
