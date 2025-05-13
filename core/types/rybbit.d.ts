import type { Rybbit } from '@rybbit/js'
import type { EVENT_NAMES } from '../constants/rybbitEvents'

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

export type EventProperties = Record<string, unknown>

export interface EventFunction {
  (properties?: EventProperties): void
}

export type EventName = (typeof EVENT_NAMES)[keyof typeof EVENT_NAMES]
