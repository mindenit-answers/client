<template>
  <DialogContent>
    <DialogHeader>
      <DialogTitle class="flex items-center gap-2">
        <Icon name="lucide:puzzle" class="size-5 text-primary" />
        Швидкий доступ до відповідей
      </DialogTitle>
    </DialogHeader>
    <div class="flex flex-col w-full gap-4">
      <NuxtImg src="/extension.png" class="rounded-lg" />
      <div class="flex items-center gap-3">
        <div
          class="bg-muted size-10 rounded-full flex items-center justify-center max-sm:hidden"
        >
          <Icon name="lucide:zap" class="size-8 text-primary" />
        </div>
        <div>
          <p class="font-medium">Встановіть наше розширення для браузера</p>
          <p class="text-sm text-muted-foreground">
            Миттєвий доступ до відповідей без переходу на сайт
          </p>
        </div>
      </div>
      <div class="grid grid-cols-2 gap-2 w-full">
        <Button
          as="a"
          target="_blank"
          href="https://chromewebstore.google.com/detail/answers-extension/koifgahcdnbhoeabkoihigijapfnaapi"
          class="w-full"
        >
          <Icon name="logos:chrome" class="mr-2" />
          Chrome
        </Button>
        <Button
          as="a"
          target="_blank"
          href="https://addons.mozilla.org/uk/firefox/addon/mindenit-answers/"
          class="w-full"
        >
          <Icon name="logos:firefox" class="mr-2" />
          Firefox
        </Button>
      </div>
      <div class="bg-muted p-3 rounded-lg text-center border border-dashed">
        <p class="text-sm mb-2">
          <Icon
            name="lucide:heart"
            class="inline-block size-4 mr-1 text-red-500"
          />
          Подобається? Будь ласка, підтримайте нас відгуком!
        </p>
        <div class="flex justify-center gap-2">
          <Button
            as="a"
            target="_blank"
            variant="outline"
            size="icon"
            href="https://chromewebstore.google.com/detail/answers-extension/koifgahcdnbhoeabkoihigijapfnaapi/reviews"
          >
            <Icon name="logos:chrome" class="size-3" />
          </Button>
          <Button
            as="a"
            target="_blank"
            variant="outline"
            size="icon"
            href="https://addons.mozilla.org/uk/firefox/addon/mindenit-answers/reviews/"
          >
            <Icon name="logos:firefox" class="size-3" />
          </Button>
        </div>
      </div>
    </div>
  </DialogContent>
</template>
