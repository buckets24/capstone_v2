import * as Yup from 'yup'

const profileEducationSchema = Yup.object().shape({
  school: Yup.string().trim().required('School is required.'),
  course: Yup.string().trim().required('Course is required.'),
  description: Yup.string().trim().required('Description is required.'),
  startDate: Yup.string().trim().required('Start date is required.'),
  endDate: Yup.string().trim().required('End date is required.')
})

export { profileEducationSchema }
