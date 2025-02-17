import { AnswersKit } from '@mindenit/answers-kit'

const answersKit = new AnswersKit()

export default defineNuxtPlugin(() => {
  return {
    provide: { answersKit },
  }
})
