<template>
  <header
    class="grid grid-cols-[auto_auto] md:grid-cols-[1fr_auto_1fr] w-full items-center relative"
  >
    <div class="flex items-center">
      <TheLogo />
    </div>

    <div
      class="z-[29] flex justify-center items-center h-14 px-2 bg-fiord-50 border-fiord-300 dark:bg-fiord-900 rounded-xl border dark:border-fiord-700 gap-1 max-md:fixed max-md:bottom-4 max-md:left-1/2 max-md:transform max-md:-translate-x-1/2"
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
