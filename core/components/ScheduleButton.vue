<template>
  <TooltipProvider>
    <Tooltip>
      <TooltipTrigger as-child>
        <NuxtLink
          to="https://sh.mindenit.org"
          target="_blank"
          class="flex items-center justify-center"
        >
          <Icon name="mindenit:schedule" class="!size-5" />
        </NuxtLink>
      </TooltipTrigger>
      <TooltipContent>
        <p>Перейти на сайт з розкладом</p>
      </TooltipContent>
    </Tooltip>
  </TooltipProvider>
</template>
