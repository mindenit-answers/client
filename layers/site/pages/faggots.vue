<script lang="ts" setup>
useSeoMeta({
  title: 'Виявлено підорський софт',
})

defineOgImageComponent('Mindenit')

definePageMeta({
  layout: 'without-navbar',
})
</script>

<template>
  <div
    class="container mx-auto p-2 bg-white dark:bg-fiord-950 rounded-lg shadow-md"
  >
    <Heading
      size="medium"
      class="text-red-700 dark:text-red-500 mb-6 text-center"
    >
      УВАГА! ВИЯВЛЕНО ПІДОРСЬКЕ/ШПИГУНСЬКЕ ПРОГРАМНЕ ЗАБЕЗПЕЧЕННЯ
    </Heading>
    <div class="space-y-6">
      <Text size="lead" class="font-bold text-red-700 dark:text-red-500">
        Ваш пристрій інфіковано руснявим шпигунським програмним забезпеченням
        "яндекс браузер", яке загрожує вашій безпеці та національній безпеці
        України.
      </Text>

      <div class="grid grid-cols-2 gap-2 max-md:grid-cols-1">
        <div
          class="bg-red-100 dark:bg-red-900/40 border-l-4 border-red-600 p-5 rounded"
        >
          <Heading size="tiny" class="mb-4 text-red-800 dark:text-red-400">
            КРИТИЧНІ ЗАГРОЗИ НАЦІОНАЛЬНІЙ БЕЗПЕЦІ:
          </Heading>
          <ul class="space-y-3 pl-5 list-disc">
            <li>
              <Text size="paragraph" class="font-semibold">
                яндекс безпосередньо пов'язаний з фсб та підорськими
                спецслужбами, і передає їм ВСІ ваші особисті дані, включаючи
                паролі, повідомлення і геолокацію
              </Text>
            </li>
            <li>
              <Text size="paragraph" class="font-semibold">
                Підтверджено використання яндекс як інструменту кібершпигунства
                - компанія проводить "тихі атаки" на українських користувачів,
                викрадаючи конфіденційну інформацію
              </Text>
            </li>
            <li>
              <Text size="paragraph" class="font-semibold">
                Використовуючи цей браузер, ви ставите під загрозу інформацію
                про військові дії та можете несвідомо допомагати країні-агресору
              </Text>
            </li>
          </ul>
        </div>

        <div
          class="bg-gradient-to-r from-red-700 to-red-900 text-white p-6 rounded-lg"
        >
          <Heading size="small" class="text-white text-center mb-3">
            ЧАС ДІЯТИ ЗАРАЗ!
          </Heading>
          <Text size="lead" class="font-bold text-white">
            Використання яндекс сервісів допомагає фінансувати російську
            агресію. Кожен клік, кожен запит і кожна хвилина використання яндекс
            та інших підорських сервісів — це підтримка війни проти України.
          </Text>
          <div class="mt-4 p-3 bg-white/20 rounded-md">
            <Text size="paragraph" class="text-white">
              Після видалення яндекс браузера рекомендуємо:
              <span class="block mt-2"
                >1. Змінити всі паролі до важливих сервісів</span
              >
              <span class="block">2. Перевірити пристрій антивірусом</span>
              <span class="block"
                >3. Відключити всі російські сервіси та додатки</span
              >
              <span class="block">4. Перевстановити Вашу ОС</span>
            </Text>
          </div>
        </div>
      </div>

      <div class="bg-black p-5 rounded-lg">
        <Text size="paragraph" class="text-white font-bold">
          ПОПЕРЕДЖЕННЯ СБУ: Використання російського програмного забезпечення
          громадянами України, особливо державними службовцями, військовими та
          працівниками критичної інфраструктури, може кваліфікуватися як
          сприяння ворожій розвідувальній діяльності.
        </Text>
      </div>

      <div class="mt-8">
        <Heading size="tiny" class="mb-5 text-center">
          НЕГАЙНО ВИДАЛІТЬ ШПИГУНСЬКЕ ПЗ ТА ВСТАНОВІТЬ БЕЗПЕЧНИЙ БРАУЗЕР:
        </Heading>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
          <a
            href="https://www.mozilla.org/uk/firefox/new/"
            class="flex flex-col items-center p-4 bg-white dark:bg-fiord-900 rounded-lg shadow hover:shadow-lg transition-all hover:-translate-y-1 border border-gray-100 dark:border-fiord-800"
          >
            <div class="text-4xl mb-3">🦊</div>
            <Text size="small" class="font-semibold text-center"
              >Mozilla Firefox</Text
            >
          </a>
          <a
            href="https://www.google.com/intl/uk/chrome/"
            class="flex flex-col items-center p-4 bg-white dark:bg-fiord-900 rounded-lg shadow hover:shadow-lg transition-all hover:-translate-y-1 border border-gray-100 dark:border-fiord-800"
          >
            <div class="text-4xl mb-3">🌐</div>
            <Text size="small" class="font-semibold text-center"
              >Google Chrome</Text
            >
          </a>
          <a
            href="https://brave.com/download/"
            class="flex flex-col items-center p-4 bg-white dark:bg-fiord-900 rounded-lg shadow hover:shadow-lg transition-all hover:-translate-y-1 border border-gray-100 dark:border-fiord-800"
          >
            <div class="text-4xl mb-3">🛡️</div>
            <Text size="small" class="font-semibold text-center"
              >Brave Browser</Text
            >
          </a>
          <a
            href="https://www.opera.com/uk"
            class="flex flex-col items-center p-4 bg-white dark:bg-fiord-900 rounded-lg shadow hover:shadow-lg transition-all hover:-translate-y-1 border border-gray-100 dark:border-fiord-800"
          >
            <div class="text-4xl mb-3">🔴</div>
            <Text size="small" class="font-semibold text-center">Opera</Text>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>
