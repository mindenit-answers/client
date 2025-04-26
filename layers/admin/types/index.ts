import type { ShallowRef } from 'vue'

export interface Block {
  name: string
  answer: string
  isVerified: boolean
}

export interface SyntaxError {
  lineNumber?: number
  message: string
}

export interface ValidationResult {
  isValid: boolean
  errors: SyntaxError[]
}

export interface ErrorGroups {
  question_format: SyntaxError[]
  answer_format: SyntaxError[]
  missing_answer: SyntaxError[]
  orphaned_answer: SyntaxError[]
  other: SyntaxError[]
}

export interface EditorOptions {
  inputValue: Ref<string | number>
  inputRef?: ShallowRef<{ ref?: HTMLInputElement | HTMLTextAreaElement } | null>
}
