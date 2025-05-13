<template>
  <div class="flex flex-col w-full relative">
    <div class="flex flex-col pt-5 container mx-auto px-4 h-dvh gap-5">
      <div class="flex flex-col md:pb-5 pb-24 gap-5">
        <slot />
      </div>
    </div>
    <QrCode />
  </div>
</template>
