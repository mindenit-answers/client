interface CreateQuestionArgs {
  data: {
    name: string
    answer: string
    isVerified: boolean
    testId: number
  }
  headers: {
    authorization: string
  }
}

interface UpdateQuestionArgs {
  data: {
    id: number
    name: string
    answer: string
    isVerified: boolean
    testId: number
  }
  headers: {
    authorization: string
  }
}

interface DeleteQuestionArgs {
  id: number
  headers: {
    authorization: string
  }
}

const questionsMutations = () => {
  const { $answersKit } = useNuxtApp()

  const createQuestion = (options: CreateQuestionArgs) => {
    return $answersKit.questions.createOne(options)
  }

  const updateQuestion = (options: UpdateQuestionArgs) => {
    return $answersKit.questions.updateOne(options)
  }

  const deleteQuestion = (options: DeleteQuestionArgs) => {
    return $answersKit.questions.deleteOne(options)
  }

  return {
    createQuestion,
    updateQuestion,
    deleteQuestion,
  }
}

export { questionsMutations }
