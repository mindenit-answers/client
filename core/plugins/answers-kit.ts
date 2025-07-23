import { AnswersKit } from '@mindenit/answers-kit'

const answersKit = new AnswersKit({
  apiUrl: 'https://answers.pp.ua/api',
})

export default defineNuxtPlugin(() => {
  return {
    provide: { answersKit },
  }
})
