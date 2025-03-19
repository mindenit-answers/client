declare module '#app' {
  interface NuxtApp {
    $sanitizeHTML: (dirty: string) => string
  }
}

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $sanitizeHTML: (dirty: string) => string
  }
}

export {}
