import * as Yup from 'yup'

const profileExperieneSchema = Yup.object().shape({
  company: Yup.string().trim().required('Company is required.'),
  position: Yup.string().trim().required('Job position is required.'),
  description: Yup.string().trim().required('Description is required.'),
  startDate: Yup.string().trim().required('Start date is required.')
  // endDate: Yup.string().trim().required('End date is required.')
})

export { profileExperieneSchema }
