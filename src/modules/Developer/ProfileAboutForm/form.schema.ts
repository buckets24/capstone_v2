import * as Yup from 'yup'

const profileAboutSchema = Yup.object().shape({
  about: Yup.string().trim().required('First Name is required.')
})

export { profileAboutSchema }
