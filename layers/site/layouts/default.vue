<template>
  <div class="flex flex-col w-full relative">
    <div class="flex flex-col pt-5 container mx-auto px-4 h-dvh gap-5">
      <TheNavbar />
      <div class="flex flex-col md:pb-5 pb-20 gap-5">
        <slot />
      </div>
    </div>
  </div>
</template>
