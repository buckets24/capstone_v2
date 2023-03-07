import * as Yup from 'yup'

const questionSchema = Yup.object().shape({
  question: Yup.string().trim().required('Question is required.')
})

export { questionSchema }
