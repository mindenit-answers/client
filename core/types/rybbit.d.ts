import type { Rybbit } from '@rybbit/js'

declare module '#app' {
  interface NuxtApp {
    $rybbit: Rybbit
  }
}

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $rybbit: Rybbit
  }
}
