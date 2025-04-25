import { computed } from 'vue'
import type {
  Block,
  SyntaxError,
  ValidationResult,
  EditorOptions,
} from '../types'

export const useEditor = ({ inputValue }: EditorOptions) => {
  const isQuestionStart = (line: string): boolean => {
    return line.trim().startsWith('#') || line.trim().startsWith('+#')
  }

  const isValidVerifiedFormat = (line: string): boolean => {
    const trimmed = line.trim()
    if (!trimmed.startsWith('+')) return true

    return trimmed.startsWith('+#')
  }

  const parseQuestions = (): Block[] => {
    const content = String(inputValue.value).trim()
    if (!content) return []

    const blocks: Block[] = []
    const blockTexts: string[] = []

    const lines = content.split('\n')
    let currentBlock = ''

    for (let i = 0; i < lines.length; i++) {
      const line = (lines[i] ?? '').trim()
      if (!line) continue

      if (isQuestionStart(line) && currentBlock) {
        blockTexts.push(currentBlock)
        currentBlock = line
      } else {
        if (!currentBlock && isQuestionStart(line)) {
          currentBlock = line
        } else if (currentBlock) {
          currentBlock += '\n' + line
        }
      }
    }

    if (currentBlock) {
      blockTexts.push(currentBlock)
    }

    for (const blockText of blockTexts) {
      let isVerified = false
      const trimmedFirstLine = (blockText.split('\n')[0] ?? '').trim()

      if (trimmedFirstLine.startsWith('+#')) {
        isVerified = true
      }

      const firstAnswerPos = blockText.indexOf('[')

      let questionText
      if (firstAnswerPos === -1) {
        questionText = blockText.replace(/^\+?#\s*/, '').trim()
      } else {
        questionText = blockText
          .slice(0, firstAnswerPos)
          .replace(/^\+?#\s*/, '')
          .trim()
      }

      const answers: string[] = []
      const answerPattern = /\[([^\\[\]]*)\]/g
      let answerMatch

      while ((answerMatch = answerPattern.exec(blockText)) !== null) {
        if (answerMatch[1] !== undefined) {
          answers.push(answerMatch[1].trim())
        }
      }

      blocks.push({
        name: questionText,
        answer: answers.join('\n'),
        isVerified,
      })
    }

    return blocks
  }

  const validateSyntax = (): ValidationResult => {
    const content = String(inputValue.value).trim()
    const errors: SyntaxError[] = []

    if (!content) {
      return { isValid: true, errors }
    }

    const lines = content.split('\n')
    let inQuestion = false
    let currentQuestionLine = 0
    let currentQuestion = ''
    let hasAnswer = false

    for (let i = 0; i < lines.length; i++) {
      const line = (lines[i] ?? '').trim()
      if (!line) continue

      if (line.startsWith('#') || line.startsWith('+')) {
        if (line.startsWith('+') && !line.startsWith('+#')) {
          errors.push({
            lineNumber: i + 1,
            message: `Неправильний формат верифікованого запитання. Між «+» і «#» не повинно бути пробілів`,
          })
        }

        if (isQuestionStart(line)) {
          if (inQuestion && !hasAnswer) {
            errors.push({
              lineNumber: currentQuestionLine + 1,
              message: `Питання "${currentQuestion}" не має відповідей`,
            })
          }

          inQuestion = true
          currentQuestionLine = i
          currentQuestion = line.replace(/^\+?#\s*/, '').trim()
          hasAnswer = false
        }
      } else if (line.includes('[') || line.includes(']')) {
        const validAnswerFormat = /^\[.*\]$/.test(line)

        const openBrackets = line.split('[').length - 1
        const closeBrackets = line.split(']').length - 1

        if (openBrackets !== closeBrackets) {
          errors.push({
            lineNumber: i + 1,
            message: `Незбалансовані дужки в рядку "${line}"`,
          })
        } else if (
          !validAnswerFormat &&
          (line.includes('[') || line.includes(']'))
        ) {
          errors.push({
            lineNumber: i + 1,
            message: `Неправильний формат відповіді в рядку "${line}". Відповідь має бути у форматі [текст]`,
          })
        } else if (validAnswerFormat && !inQuestion) {
          errors.push({
            lineNumber: i + 1,
            message: `Відповідь "${line}" не відноситься до жодного запитання`,
          })
        } else if (validAnswerFormat && inQuestion) {
          hasAnswer = true
        }
      }
    }

    if (inQuestion && !hasAnswer) {
      errors.push({
        lineNumber: currentQuestionLine + 1,
        message: `Питання "${currentQuestion}" не має відповідей`,
      })
    }

    return {
      isValid: errors.length === 0,
      errors,
    }
  }

  const blocksToText = (blocks: Block[]): string => {
    return blocks
      .map((block) => {
        const prefix = block.isVerified ? '+# ' : '# '
        const answers = block.answer
          .split('\n')
          .map((answer) => `[${answer}]`)
          .join('\n')
        return `${prefix}${block.name}\n${answers}`
      })
      .join('\n\n')
  }

  const blocks = computed(() => parseQuestions())

  const validation = computed(() => validateSyntax())

  const addQuestion = (): void => {
    inputValue.value += '# '
  }

  const addVerifiedQuestion = (): void => {
    inputValue.value += '+# '
  }

  const addAnswer = (): void => {
    inputValue.value += '[]'
  }

  return {
    blocks,
    validation,
    addQuestion,
    addVerifiedQuestion,
    addAnswer,
    parseQuestions,
    validateSyntax,
    blocksToText,
    isQuestionStart,
    isValidVerifiedFormat,
  }
}
