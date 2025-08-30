export interface DialogConfig {
  id: string
  version: number
  priority: number // Lower number means higher priority
  enabled: boolean
  component: 'ExtensionDialog'
  minShowInterval?: number
}
