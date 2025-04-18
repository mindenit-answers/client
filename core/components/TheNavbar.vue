<template>
  <header
    class="grid grid-cols-[auto_auto] md:grid-cols-[1fr_auto_1fr] w-full items-center relative"
  >
    <div class="flex items-center gap-2">
      <TheLogo />
      <slot />
    </div>

    <div
      class="z-[29] flex justify-center items-center md:h-14 px-2 rounded-xl gap-1 max-md:dark:bg-fiord-900 max-md:bg-fiord-100 max-md:fixed max-md:bottom-0 max-md:left-0 max-md:right-0 max-md:py-2 max-md:px-4 max-md:rounded-t-xl max-md:rounded-b-none max-sm:justify-between max-sm:w-full"
    >
      <NavbarLink to="/" title="Головна" icon="lucide:house" />
      <NavbarLink to="/search" title="Пошук" icon="lucide:search" />
      <NavbarLink to="/catalogue" title="Каталог" icon="lucide:book-copy" />
    </div>

    <div class="flex justify-end items-center">
      <ThemeSwitcher />
    </div>
  </header>
</template>
